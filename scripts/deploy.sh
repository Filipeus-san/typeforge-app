#!/bin/bash
set -e

# Required: HOSTING_API_SECRET, HOSTING_API_URL
# Optional: HOSTING_ENV (default: production), SKIP_BUILD
#
# Usage:
#   ./scripts/deploy.sh                          # Standard deploy (Lua bundle)
#   ./scripts/deploy.sh --react                   # Deploy React dist to Cloud Storage
#   ./scripts/deploy.sh --react --react-dir=path  # Custom React dist directory

HOSTING_API_URL="${HOSTING_API_URL:-http://localhost:3005/hosting}"
HOSTING_ENV="${HOSTING_ENV:-production}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

error() { echo -e "${RED}[ERROR]${NC} $1"; }
ok() { echo -e "${GREEN}[OK]${NC} $1"; }
info() { echo -e "${BLUE}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }

# Execute curl and check HTTP status code
# Sets: API_RESPONSE (body), API_HTTP_CODE (status code)
api_call() {
    local tmpfile
    tmpfile=$(mktemp)
    local curl_exit=0
    API_HTTP_CODE=$(curl -w '%{http_code}' -o "$tmpfile" "$@") || curl_exit=$?
    API_RESPONSE=$(cat "$tmpfile")
    rm -f "$tmpfile"

    if [ "$curl_exit" -ne 0 ]; then
        error "Connection failed (curl exit code: $curl_exit)"
        return 1
    fi

    if [ "$API_HTTP_CODE" -ge 400 ] 2>/dev/null; then
        local error_msg
        error_msg=$(echo "$API_RESPONSE" | grep -o '"error":"[^"]*"' | head -1 | cut -d'"' -f4)
        if [ -n "$error_msg" ]; then
            error "HTTP $API_HTTP_CODE: $error_msg"
        else
            error "HTTP $API_HTTP_CODE: $API_RESPONSE"
        fi
        return 1
    fi
    return 0
}

mark_failed() {
    if [ -n "$DEPLOYMENT_ID" ]; then
        curl -s -X POST "${HOSTING_API_URL}/api/deploy/${DEPLOYMENT_ID}/fail" \
            -H "X-API-Secret: ${HOSTING_API_SECRET}" \
            -H "Content-Type: application/json" \
            -d "{\"error_message\": \"$1\"}" > /dev/null
    fi
}

if [ -z "$HOSTING_API_SECRET" ]; then
    error "HOSTING_API_SECRET is required"
    echo ""
    echo "Usage:"
    echo "  HOSTING_API_SECRET=your_secret ./scripts/deploy.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --react           Deploy React dist folder to Cloud Storage"
    echo "  --react-dir=PATH  Custom React dist directory (default: react-app/dist)"
    echo ""
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Parse arguments
REACT_DEPLOY=0
REACT_DIR_ARG=""
for arg in "$@"; do
    case "$arg" in
        --react)
            REACT_DEPLOY=1
            ;;
        --react-dir=*)
            REACT_DIR_ARG="${arg#--react-dir=}"
            ;;
    esac
done

# Set REACT_DIR
if [ -n "$REACT_DIR_ARG" ]; then
    if [[ "$REACT_DIR_ARG" != /* ]]; then
        REACT_DIR="$PROJECT_ROOT/$REACT_DIR_ARG"
    else
        REACT_DIR="$REACT_DIR_ARG"
    fi
else
    REACT_DIR="$PROJECT_ROOT/react-app/dist"
fi

# ===== React deploy mode =====
if [ "$REACT_DEPLOY" = "1" ]; then
    echo ""
    echo "=========================================="
    echo "  TypeForge React Assets Deploy"
    echo "=========================================="
    echo ""
    echo "  API URL:     $HOSTING_API_URL"
    echo "  Environment: $HOSTING_ENV"
    echo "  Dist dir:    $REACT_DIR"
    echo ""
    echo "=========================================="
    echo ""

    # Build React if not skipped
    if [ "$SKIP_BUILD" != "1" ]; then
        info "Building React..."
        cd "$PROJECT_ROOT/react-app"
        [ ! -d "node_modules" ] && npm install
        npm run build
        cd "$PROJECT_ROOT"
        ok "React build completed"
    else
        warn "Skipping React build (SKIP_BUILD=1)"
    fi

    if [ ! -d "$REACT_DIR" ]; then
        error "React dist directory not found: $REACT_DIR"
        exit 1
    fi

    FILE_COUNT=$(find "$REACT_DIR" -type f | wc -l | tr -d ' ')
    if [ "$FILE_COUNT" -eq 0 ]; then
        error "No files found in $REACT_DIR"
        exit 1
    fi

    info "Found $FILE_COUNT files to upload"

    # Build curl command with all files
    CURL_ARGS=(-s -X POST "${HOSTING_API_URL}/api/deploy/react" \
        -F "api_secret=${HOSTING_API_SECRET}" \
        -F "environment=${HOSTING_ENV}")

    while IFS= read -r -d '' file; do
        REL_PATH="${file#$REACT_DIR/}"
        CURL_ARGS+=(-F "files=@${file};filename=${REL_PATH}")
    done < <(find "$REACT_DIR" -type f -print0)

    if ! api_call "${CURL_ARGS[@]}"; then
        error "React deploy failed"
        exit 1
    fi

    STATUS=$(echo "$API_RESPONSE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
    BASE_URL=$(echo "$API_RESPONSE" | grep -o '"base_url":"[^"]*"' | cut -d'"' -f4)
    FILES_UPLOADED=$(echo "$API_RESPONSE" | grep -o '"files_uploaded":[0-9]*' | cut -d':' -f2)

    echo ""
    ok "React deploy completed (status: $STATUS, files: $FILES_UPLOADED)"
    ok "Base URL: $BASE_URL"
    echo ""
    exit 0
fi

# ===== Standard Lua bundle deploy =====

# Detect project structure: server/ subdirectory or root-level
if [ -d "$PROJECT_ROOT/server" ]; then
    BUILD_DIR="$PROJECT_ROOT/server"
else
    BUILD_DIR="$PROJECT_ROOT"
fi
DIST_DIR="$BUILD_DIR/dist"

# Build
if [ "$SKIP_BUILD" != "1" ]; then
    info "Building..."
    cd "$BUILD_DIR"
    [ ! -d "node_modules" ] && npm install
    npm run build
    cd "$PROJECT_ROOT"
fi

# Git info
COMMIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
COMMIT_MESSAGE=$(git log -1 --pretty=%B 2>/dev/null | head -1 || echo "")
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
TRIGGERED_BY="${GITHUB_ACTOR:-${USER:-local}}"

COMMIT_MESSAGE_JSON=$(echo "$COMMIT_MESSAGE" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().strip()))' 2>/dev/null || echo "\"${COMMIT_MESSAGE}\"")

# Start deployment
if ! api_call -s -X POST "${HOSTING_API_URL}/api/deploy" \
    -H "Content-Type: application/json" \
    -d "{
        \"api_secret\": \"${HOSTING_API_SECRET}\",
        \"environment\": \"${HOSTING_ENV}\",
        \"commit_sha\": \"${COMMIT_SHA}\",
        \"commit_message\": ${COMMIT_MESSAGE_JSON},
        \"branch\": \"${BRANCH}\",
        \"triggered_by\": \"${TRIGGERED_BY}\"
    }"; then
    error "Failed to start deployment"
    exit 1
fi

DEPLOYMENT_ID=$(echo "$API_RESPONSE" | grep -o '"deployment_id":[0-9]*' | cut -d':' -f2)

if [ -z "$DEPLOYMENT_ID" ]; then
    error "Failed to get deployment ID from response: $API_RESPONSE"
    exit 1
fi

ok "Deployment started: $DEPLOYMENT_ID"

# Upload bundle
BUNDLE="$DIST_DIR/bundle.lua"
BUNDLE_MAP="$DIST_DIR/bundle.lua.map"

if [ ! -f "$BUNDLE" ]; then
    error "bundle.lua not found"
    mark_failed "bundle.lua not found"
    exit 1
fi

CURL_ARGS=(-s -X POST "${HOSTING_API_URL}/api/deploy/${DEPLOYMENT_ID}/upload" \
    -H "X-API-Secret: ${HOSTING_API_SECRET}" \
    -F "bundle_lua=@${BUNDLE}")

[ -f "$BUNDLE_MAP" ] && CURL_ARGS+=(-F "bundle_map=@${BUNDLE_MAP}")

if ! api_call "${CURL_ARGS[@]}"; then
    error "Failed to upload bundle"
    mark_failed "Bundle upload failed"
    exit 1
fi

# Check deployment status
if ! api_call -s -X GET "${HOSTING_API_URL}/api/deploy/${DEPLOYMENT_ID}/status" \
    -H "X-API-Secret: ${HOSTING_API_SECRET}"; then
    error "Failed to check deployment status"
    exit 1
fi

STATUS=$(echo "$API_RESPONSE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
DEPLOY_URL=$(echo "$API_RESPONSE" | grep -o '"url":"[^"]*"' | cut -d'"' -f4)

if [ "$STATUS" = "success" ]; then
    ok "Deploy completed successfully (ID: $DEPLOYMENT_ID)"
    if [ -n "$DEPLOY_URL" ]; then
        ok "URL: $DEPLOY_URL"
    fi
elif [ "$STATUS" = "failed" ]; then
    ERROR_MSG=$(echo "$API_RESPONSE" | grep -o '"error_message":"[^"]*"' | cut -d'"' -f4)
    error "Deployment failed: $ERROR_MSG"
    exit 1
else
    warn "Deployment status: $STATUS (ID: $DEPLOYMENT_ID)"
fi
