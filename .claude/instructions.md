Vždy po commitnutí a pusnutí nasad projekt na testovací prostředí (typeforge-mcp.js, scripts/deploy.sh) a potom ho otestuj v prohlížeři pomocí nástroje browse.js, který používá Playwright

### Deployment

```bash
./scripts/deploy.sh              # Standard deploy (includes git metadata)
./scripts/deploy.sh --local      # Local deploy (no git metadata)
```

Optional env vars: `HOSTING_API_URL` (default: `http://localhost:3005/hosting`), `HOSTING_ENV` (default: `production`), `SKIP_BUILD=1` to skip build step.

### Local Deploy (Test Environment)

If `/home/vscode/Test/deploy-local.sh` exists, copy it to the current directory and run it after committing changes. This deploys changes to the test environment.

```bash
cp /home/vscode/Test/deploy-local.sh . && ./deploy-local.sh
```

### Testing After Deploy

After each deploy, test the changes in the browser using `browse.js`:

1. **Get the test environment URL** using `typeforge-mcp.js`:
   ```bash
   node typeforge-mcp.js list_projects
   node typeforge-mcp.js list_environments project_id=5
   node typeforge-mcp.js get_environment project_id=5 environment_id=7
   ```
   The `get_environment` output contains the Cloud Run `service_url`.

2. **Test the changes** using `browse.js` (Playwright CLI):
   ```bash
   # Simple page load + screenshot + content extraction
   node browse.js https://your-test-url.run.app

   # Screenshot specific page, skip content
   node browse.js https://your-test-url.run.app/admin/products --no-content

   # Login flow with inline script
   node browse.js https://your-test-url.run.app/login --script "await page.fill('input[name=\"email\"]','test@test.cz'); await page.fill('input[name=\"password\"]','Heslo_123456'); await page.click('button[type=\"submit\"]'); await page.waitForTimeout(2000);"

   # Multi-step flow with actions JSON file
   node browse.js https://your-test-url.run.app --actions test-flow.json
   ```

   The script saves a screenshot to `screenshot.png` (customizable with `--screenshot <path>`), outputs page title and text content to stdout. Read the screenshot to visually verify.

   **Test account**: `test@test.cz` / `Heslo_123456` (register if it doesn't exist)

   **Actions JSON** (`--actions file.json`) — array of steps:
   ```json
   [
     { "action": "fill", "selector": "input[name=email]", "value": "test@test.cz" },
     { "action": "fill", "selector": "input[name=password]", "value": "Heslo_123456" },
     { "action": "click", "selector": "button[type=submit]" },
     { "action": "wait", "ms": 2000 },
     { "action": "screenshot", "path": "after-login.png" },
     { "action": "goto", "url": "https://your-test-url.run.app/admin/products" },
     { "action": "content" }
   ]
   ```

   Run `node browse.js --help` for all options.

   **Important:** The script auto-configures proxy from environment variables and ignores SSL errors — do not remove these settings.

   **Chromium path:** `browse.js` uses the `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` environment variable to locate the Chromium binary. If the variable is not set, it falls back to `/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome`. Set this variable if Chromium is installed at a different path.

3. **Check logs for errors** using `typeforge-mcp.js`:
   ```bash
   node typeforge-mcp.js get_cloudrun_logs project_id=5 environment_id=7 severity=ERROR limit=50
   ```

4. **Fix any errors** found in logs or during testing

5. **Repeat** the deploy-test-fix cycle until all errors are resolved

### TypeForge MCP CLI (`typeforge-mcp.js`)

Wrapper script for the TypeForge MCP API. Replaces direct MCP tool calls. Requires `TYPEFORGE_MCP_API_TOKEN` environment variable.

```bash
node typeforge-mcp.js <command> [key=value ...]
```

**Commonly used commands:**
```bash
node typeforge-mcp.js list_projects
node typeforge-mcp.js list_environments project_id=5
node typeforge-mcp.js get_environment project_id=5 environment_id=7
node typeforge-mcp.js get_cloudrun_logs project_id=5 environment_id=7 severity=ERROR limit=50
node typeforge-mcp.js run_sql_query project_id=5 environment_id=7 query="SELECT * FROM users LIMIT 5"
node typeforge-mcp.js list_deployments project_id=5 environment_id=7
```

Run `node typeforge-mcp.js --help` for the full list of commands.

### Database Access

Use `typeforge-mcp.js` for direct database access (useful for debugging and data inspection):

```bash
# SQL (PostgreSQL)
node typeforge-mcp.js run_sql_query project_id=5 environment_id=7 query="SELECT * FROM _migrations"
```
