#!/bin/bash
#
# Deploy Lua bundle to hosting API
#
# Usage:
#   ./scripts/deploy.sh
#
# Environment variables:
#   HOSTING_API_URL    - Base URL of the hosting API (default: http://localhost:3006/hosting)
#   HOSTING_API_SECRET - API secret for the project (required)
#   HOSTING_ENV        - Environment name (default: production)
#   SKIP_BUILD         - Set to "1" to skip the build step
#   LOCAL_DEPLOY       - Set to "1" to use local deploy (no commit, single request)
#

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SERVER_DIR="$PROJECT_ROOT"
DIST_DIR="$SERVER_DIR/dist"

# Default values
HOSTING_API_URL="${HOSTING_API_URL:-http://localhost:3005/hosting}"
HOSTING_ENV="${HOSTING_ENV:-production}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[OK]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check required environment variables
if [ -z "$HOSTING_API_SECRET" ]; then
    log_error "HOSTING_API_SECRET environment variable is required"
    echo ""
    echo "Usage:"
    echo "  HOSTING_API_SECRET=your_secret ./scripts/deploy.sh"
    echo ""
    echo "Environment variables:"
    echo "  HOSTING_API_SECRET  - API secret for the project (required)"
    echo "  HOSTING_API_URL     - Base URL of the hosting API (default: http://localhost:3006/hosting)"
    echo "  HOSTING_ENV         - Environment name (default: production)"
    echo "  SKIP_BUILD          - Set to '1' to skip the build step"
    exit 1
fi

# Get git info for deployment metadata
get_git_info() {
    COMMIT_SHA=$(git -C "$PROJECT_ROOT" rev-parse --short HEAD 2>/dev/null || echo "unknown")
    COMMIT_MESSAGE=$(git -C "$PROJECT_ROOT" log -1 --pretty=%B 2>/dev/null | head -1 || echo "")
    BRANCH=$(git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
    TRIGGERED_BY="${USER:-local}"
}

# Build TypeScript to Lua
build_bundle() {
    if [ "$SKIP_BUILD" = "1" ]; then
        log_warn "Skipping build (SKIP_BUILD=1)"
        return
    fi

    log_info "Building TypeScript to Lua..."
    cd "$SERVER_DIR"

    if [ ! -d "node_modules" ]; then
        log_info "Installing dependencies..."
        npm install
    fi

    npm run build
    log_success "Build completed"
}

# Local deploy (single request, no commit info)
deploy_local() {
    log_info "Local deploy to $HOSTING_ENV..."

    if [ ! -f "$DIST_DIR/bundle.lua" ]; then
        log_error "bundle.lua not found in $DIST_DIR"
        exit 1
    fi

    # Build curl command
    CURL_ARGS=(-s -X POST "${HOSTING_API_URL}/api/deploy/local" \
        -F "api_secret=${HOSTING_API_SECRET}" \
        -F "environment=${HOSTING_ENV}" \
        -F "bundle_lua=@${DIST_DIR}/bundle.lua")

    if [ -f "$DIST_DIR/bundle.lua.map" ]; then
        CURL_ARGS+=(-F "bundle_map=@${DIST_DIR}/bundle.lua.map")
        log_info "Including source map"
    fi

    RESPONSE=$(curl "${CURL_ARGS[@]}")

    # Check for error
    if echo "$RESPONSE" | grep -q '"error"'; then
        ERROR_MSG=$(echo "$RESPONSE" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
        log_error "Deploy failed: $ERROR_MSG"
        exit 1
    fi

    DEPLOYMENT_ID=$(echo "$RESPONSE" | grep -o '"deployment_id":[0-9]*' | cut -d':' -f2)
    log_success "Deploy completed (ID: $DEPLOYMENT_ID)"
}

# Start deployment (two-step: start + upload)
start_deployment() {
    log_info "Starting deployment to $HOSTING_ENV..."

    RESPONSE=$(curl -s -X POST "${HOSTING_API_URL}/api/deploy" \
        -H "Content-Type: application/json" \
        -d "{
            \"api_secret\": \"${HOSTING_API_SECRET}\",
            \"environment\": \"${HOSTING_ENV}\",
            \"commit_sha\": \"${COMMIT_SHA}\",
            \"commit_message\": \"${COMMIT_MESSAGE}\",
            \"branch\": \"${BRANCH}\",
            \"triggered_by\": \"${TRIGGERED_BY}\"
        }")

    # Check for error
    if echo "$RESPONSE" | grep -q '"error"'; then
        ERROR_MSG=$(echo "$RESPONSE" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
        log_error "Failed to start deployment: $ERROR_MSG"
        exit 1
    fi

    # Extract deployment ID
    DEPLOYMENT_ID=$(echo "$RESPONSE" | grep -o '"deployment_id":[0-9]*' | cut -d':' -f2)

    if [ -z "$DEPLOYMENT_ID" ]; then
        log_error "Failed to get deployment ID from response: $RESPONSE"
        exit 1
    fi

    log_success "Deployment started with ID: $DEPLOYMENT_ID"
}

# Upload bundle files
upload_bundle() {
    log_info "Uploading bundle files..."

    if [ ! -f "$DIST_DIR/bundle.lua" ]; then
        log_error "bundle.lua not found in $DIST_DIR"
        mark_failed "bundle.lua not found"
        exit 1
    fi

    # Build curl command with optional source map
    CURL_ARGS=(-s -X POST "${HOSTING_API_URL}/api/deploy/${DEPLOYMENT_ID}/upload" \
        -H "X-API-Secret: ${HOSTING_API_SECRET}" \
        -F "bundle_lua=@${DIST_DIR}/bundle.lua")

    if [ -f "$DIST_DIR/bundle.lua.map" ]; then
        CURL_ARGS+=(-F "bundle_map=@${DIST_DIR}/bundle.lua.map")
        log_info "Including source map"
    fi

    RESPONSE=$(curl "${CURL_ARGS[@]}")

    # Check for error
    if echo "$RESPONSE" | grep -q '"error"'; then
        ERROR_MSG=$(echo "$RESPONSE" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
        log_error "Failed to upload bundle: $ERROR_MSG"
        exit 1
    fi

    log_success "Bundle uploaded successfully"
}

# Mark deployment as failed
mark_failed() {
    local error_message="$1"

    if [ -n "$DEPLOYMENT_ID" ]; then
        curl -s -X POST "${HOSTING_API_URL}/api/deploy/${DEPLOYMENT_ID}/fail" \
            -H "X-API-Secret: ${HOSTING_API_SECRET}" \
            -H "Content-Type: application/json" \
            -d "{\"error_message\": \"${error_message}\"}" > /dev/null
    fi
}

# Check deployment status
check_status() {
    log_info "Checking deployment status..."

    RESPONSE=$(curl -s -X GET "${HOSTING_API_URL}/api/deploy/${DEPLOYMENT_ID}/status" \
        -H "X-API-Secret: ${HOSTING_API_SECRET}")

    STATUS=$(echo "$RESPONSE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

    if [ "$STATUS" = "success" ]; then
        log_success "Deployment completed successfully!"
    elif [ "$STATUS" = "failed" ]; then
        ERROR_MSG=$(echo "$RESPONSE" | grep -o '"error_message":"[^"]*"' | cut -d'"' -f4)
        log_error "Deployment failed: $ERROR_MSG"
        exit 1
    else
        log_warn "Deployment status: $STATUS"
    fi
}

# Parse arguments
parse_args() {
    LOCAL_DEPLOY="${LOCAL_DEPLOY:-0}"
    for arg in "$@"; do
        case "$arg" in
            --local)
                LOCAL_DEPLOY="1"
                ;;
        esac
    done
}

# Main execution
main() {
    parse_args "$@"

    echo ""
    echo "=========================================="
    echo "  TypeForge Lua Bundle Deploy"
    echo "=========================================="
    echo ""
    echo "  API URL:     $HOSTING_API_URL"
    echo "  Environment: $HOSTING_ENV"

    if [ "$LOCAL_DEPLOY" = "1" ]; then
        echo "  Mode:        local (no commit)"
        echo ""
        echo "=========================================="
        echo ""

        build_bundle
        deploy_local
    else
        echo "  Mode:        standard (with commit)"
        echo ""

        get_git_info
        echo "  Commit:      $COMMIT_SHA"
        echo "  Branch:      $BRANCH"
        echo "  Message:     $COMMIT_MESSAGE"
        echo "  Triggered:   $TRIGGERED_BY"
        echo ""
        echo "=========================================="
        echo ""

        build_bundle
        start_deployment
        upload_bundle
        check_status
    fi

    echo ""
    log_success "Deploy completed!"
    echo ""
}

# Run main function
main "$@"
