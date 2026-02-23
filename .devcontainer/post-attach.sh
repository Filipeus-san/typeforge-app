#!/bin/bash

# Show vibe-kanban URL
if [ -n "$CODESPACE_NAME" ]; then
  VK_URL="https://${CODESPACE_NAME}-3005.app.github.dev/"
  echo ""
  echo "╔══════════════════════════════════════════════════════════════════╗"
  echo "║  Vibe Kanban is ready!                                          ║"
  echo "║                                                                  ║"
  echo "║  $VK_URL"
  echo "║                                                                  ║"
  echo "╚══════════════════════════════════════════════════════════════════╝"
  echo ""
fi

# If Claude needs auth and no secret configured, start interactive session
if [ ! -f ~/.claude/.credentials.json ] && [ -z "$CLAUDE_AUTH_JSON" ]; then
  claude
fi
