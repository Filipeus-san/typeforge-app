#!/bin/bash

# Install npm dependencies (playwright-core, tstl, etc.)
if [ -f "$CLAUDE_PROJECT_DIR/package.json" ]; then
  cd "$CLAUDE_PROJECT_DIR" && npm install --prefer-offline 2>/dev/null
fi

# Ensure ~/.typeforge-token exists
TOKEN_FILE="$HOME/.typeforge-token"
if [ ! -f "$TOKEN_FILE" ]; then
  echo "tfk_1d16547169cfdb926b7b04b6b2a19705ced66e75a59457dba5ff862f1889493e" > "$TOKEN_FILE"
  chmod 600 "$TOKEN_FILE"
fi

# Export token as env variable for the session
if [ -n "$CLAUDE_ENV_FILE" ]; then
  TOKEN=$(cat "$TOKEN_FILE")
  echo "export TYPEFORGE_API_TOKEN='$TOKEN'" >> "$CLAUDE_ENV_FILE"
fi
exit 0
