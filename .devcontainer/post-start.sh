#!/bin/bash

# Re-apply Claude Code credentials on every start (secret may have been refreshed)
if [ -n "$CLAUDE_AUTH_JSON" ]; then
  echo "Configuring Claude Code credentials..."
  mkdir -p ~/.claude
  RAW_AUTH=$(echo "$CLAUDE_AUTH_JSON" | base64 -d)
  node -e "
    const raw = JSON.parse(process.argv[1]);
    const expiresAt = raw.expiresAt < 1e12 ? raw.expiresAt * 1000 : raw.expiresAt;
    const creds = { claudeAiOauth: {
      accessToken: raw.accessToken,
      refreshToken: raw.refreshToken,
      expiresAt: expiresAt,
      scopes: ['user:inference','user:profile','user:sessions:claude_code','user:mcp_servers','org:create_api_key']
    }};
    require('fs').writeFileSync(
      require('os').homedir() + '/.claude/.credentials.json',
      JSON.stringify(creds, null, 2)
    );
    console.log('✓ Claude credentials written, expires: ' + new Date(expiresAt).toISOString());
  " "$RAW_AUTH" && chmod 600 ~/.claude/.credentials.json
else
  echo "⚠ CLAUDE_AUTH_JSON secret not set — Claude Code won't be authenticated"
  echo "  Set the secret via TypeForge hosting or GitHub repo settings"
fi

# Start vibe-kanban directly (foreground) using pre-downloaded binary
if ! pgrep -f "vibe-kanban" > /dev/null 2>&1; then
  echo "Starting vibe-kanban..."
  VK_BIN=$(find "$HOME/.vibe-kanban/bin" -name 'vibe-kanban' -not -name '*.zip*' 2>/dev/null | head -1)
  if [ -x "$VK_BIN" ]; then
    PORT=3005 "$VK_BIN"
  else
    PORT=3005 npx vibe-kanban@0.1.8
  fi
fi
