# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeForge is a serverless web framework that compiles TypeScript to Lua using TypeScript-to-Lua (TSTL). The compiled Lua bundle runs on a Lua JIT hosting runtime that provides built-in APIs for HTTP, database, file I/O, crypto, and more.

## Documentation

Detailed documentation is available in the `Docs/` folder:

- `Docs/README.md` - Documentation index
- `Docs/architecture.md` - Project structure and compilation pipeline
- `Docs/runtime.md` - App Runtime overview (Lua VM pool, caching, lifecycle)
- `Docs/routing.md` - Type-safe routing system
- `Docs/components.md` - UI component system with examples
- `Docs/validation.md` - Decorator-based validation system
- `Docs/runtime-api.md` - Complete runtime API reference
- `Docs/patterns.md` - Design patterns and best practices

## Build & Development Commands

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript to Lua (output: dist/bundle.lua)
npm run dev          # Watch mode — recompiles on file changes
```

There is no test framework or linter configured.

### Deployment

```bash
HOSTING_API_SECRET=<secret> ./scripts/deploy.sh              # Standard deploy (includes git metadata)
HOSTING_API_SECRET=<secret> ./scripts/deploy.sh --local      # Local deploy (no git metadata)
```

Optional env vars: `HOSTING_API_URL` (default: `http://localhost:3005/hosting`), `HOSTING_ENV` (default: `production`), `SKIP_BUILD=1` to skip build step.

### Local Deploy (Test Environment)

If `/home/vscode/Test/deploy-local.sh` exists, copy it to the current directory and run it after committing changes. This deploys changes to the test environment.

```bash
cp /home/vscode/Test/deploy-local.sh . && ./deploy-local.sh
```

### Testing After Deploy

After each deploy, test the changes in the browser:

1. **Get the test environment URL** using TypeForge MCP:
   - Use `list_projects` to find the project (name: "Test")
   - Use `list_environments` with the project_id to find the environment (name: "test")
   - Use `get_environment` to get the Cloud Run `service_url`

2. **Test the changes** using Playwright MCP (`browser_navigate`, `browser_snapshot`, `browser_click`, etc.)
   - **Test account**: `test@test.cz` / `Heslo_123456` (register if it doesn't exist)

3. **Check logs for errors** using TypeForge MCP `get_cloudrun_logs` with the project_id and environment_id from step 1

4. **Fix any errors** found in logs or during testing

5. **Repeat** the deploy-test-fix cycle until all errors are resolved

### Database Access via MCP

TypeForge MCP provides tools for direct database access (useful for debugging and data inspection):

- **SQL (PostgreSQL)**: Use `run_sql_query` with project_id, environment_id, and SQL query
- **Redis**: Use `run_redis_command` with project_id, environment_id, command, and args

## Architecture

### Project Structure

```
src/
├── main.ts                    # Entry point — config(), init(), main()
├── global.d.ts                # Runtime API declarations (@noSelf)
├── global.types.ts            # Global types (Request, Response, Config)
├── config.ts                  # App configuration (DB, Redis, sessions, migrations)
├── utils.ts                   # Shared utilities (sessions, CSRF, helpers)
├── validator.ts               # Decorator-based validation
├── template.ts                # HTML template wrapper
├── migration-runner.ts        # Database migration runner
├── react-build.ts             # React build utilities
│
├── migrations/                # Database migrations (numbered 001–014)
│   ├── index.ts
│   ├── 001_create_users.ts
│   ├── ...
│   └── 014_create_media.ts
│
├── components/                # Reusable UI component library
│   ├── index.ts               # Barrel export
│   ├── types.ts               # Component types (Component<P>, BaseProps)
│   ├── helpers.ts             # cx, map, when, attrs, escapeHtml
│   ├── ui/                    # Button, Card, Badge, Icon, Form, Avatar, ThemeToggle
│   ├── data/                  # AdminDataList, AdminForm, DataTable, FilterBar, Pagination, StatCard
│   ├── layout/                # AdminLayout, AdminSidebar, Navbar, Footer, PageWrapper
│   ├── shop/                  # ProductCard, CategoryCard
│   └── blocks/                # Hero
│
└── modules/
    ├── router.ts              # Route definitions
    ├── router.types.ts        # Route path union types
    ├── types.ts               # RouterPaths type with prefix support
    └── app/                   # Domain modules
        ├── index.ts           # Barrel export for all modules
        ├── shared.ts          # Shared types, utilities, auth helpers
        ├── shared.const.ts    # Shared constants (status labels, variants)
        │
        ├── auth/              # Authentication (login, register, logout)
        ├── dashboard/         # Admin dashboard & analytics
        ├── catalog/           # Products & categories management
        ├── customers/         # Customer management
        ├── orders/            # Order management
        ├── warehouse/         # Warehouse & stock management
        ├── blog/              # Blog posts management
        ├── media/             # Media/file management
        ├── admin-misc/        # Settings, pages, users
        ├── shop/              # Public e-shop storefront
        ├── cart/              # Shopping cart
        └── notfound/          # 404 page
```

### Domain Module Structure

Each domain module in `src/modules/app/[module]/` follows a consistent file convention:

| File | Purpose | Required |
|------|---------|----------|
| `index.ts` | Barrel export — only re-exports handlers | Yes |
| `[module].handlers.ts` | HTTP request handlers (route functions) | Yes |
| `[module].repository.ts` | Database queries (all `sqlQuery` calls) | When DB needed |
| `[module].templates.ts` | HTML template builders (form/page content) | When forms needed |
| `[module].types.ts` | Domain-specific TypeScript types | When domain types needed |
| `[module].const.ts` | Constants (status labels, filter options, defaults) | When constants needed |
| `[module].utils.ts` | Domain-specific utility functions | When utils needed |
| `[module].validation.ts` | Validation classes with decorators | When forms needed |

**Full module example (catalog/):**
```
catalog/
├── index.ts                   # export * from './catalog.handlers'
├── catalog.handlers.ts        # renderAdminProducts, renderAdminProductCreate, etc.
├── catalog.repository.ts      # findAllProducts, findProductById, insertProduct, etc.
├── catalog.templates.ts       # getProductFormContent, getCategoryFormContent
├── catalog.const.ts           # PRODUCT_STATUS_FILTER_OPTIONS, DEFAULT_PRODUCT_ICON
└── catalog.validation.ts      # ProductForm, CategoryForm classes
```

**Minimal module example (cart/):**
```
cart/
├── index.ts
├── cart.handlers.ts
└── cart.templates.ts
```

### Compilation Pipeline

TypeScript source (`src/`) → TSTL compiler → single Lua bundle (`dist/bundle.lua`) targeting Lua JIT.

### Request/Response Model

The hosting runtime calls three exported functions from `main.ts`:
- `config()` — returns app configuration (caching, DB connections, upload limits, migrations)
- `init()` — (optional) called once at startup, runs database migrations if enabled
- `main(request: Request): Response` — HTTP request handler entry point

Every route handler receives `(request: Request, response: Response)` and returns a modified `Response`. The `Request` and `Response` interfaces are defined in `src/global.types.ts`.

### Routing

`src/modules/router.ts` returns an array of `{ path, route, type }` objects. Route paths are type-safe via union types defined in `src/modules/router.types.ts`. The `RouterPaths` type in `src/modules/types.ts` combines web and API paths with prefix support (`WithPrefix<ApiRouterPaths, "/api"> | WebRouterPaths`).

**Adding a new route:**
1. Add path to union type in `router.types.ts`
2. Create handler function in the appropriate module's `.handlers.ts`
3. Register route in `router.ts`

### Component System

Components are functions returning HTML strings:

```typescript
interface ButtonProps extends BaseProps {
    children: string;
    variant?: 'primary' | 'outline';
}

function Button(props: ButtonProps): string {
    const { children, variant = 'primary', class: className } = props;
    const classes = cx('btn', `btn-${variant}`, className);
    return `<button class="${classes}">${children}</button>`;
}
```

**Component helpers** (from `src/components/helpers.ts`):
- `cx(...classes)` - Join class names, filter falsy
- `map(items, fn)` - Map array to HTML string
- `when(condition, content, fallback?)` - Conditional rendering
- `attrs(obj)` - Generate HTML attributes
- `escapeHtml(text)` - Escape HTML special characters

### AdminDataList Component

Reusable admin list/table component (`src/components/data/AdminDataList.ts`). Used for all admin list pages (products, customers, orders, etc.).

```typescript
import { AdminDataList } from "../../../components";

AdminDataList({
    columns: [
        { key: 'name', label: 'Název', width: '30%' },
        { key: 'price', label: 'Cena', align: 'right', render: (v) => formatPrice(Number(v)) },
        { key: 'status', label: 'Stav', render: (v) => Badge({ children: getLabel(v), variant: getVariant(v) }) },
    ],
    rows: products.map(p => ({ id: String(p.id), name: p.name, price: String(p.price), status: p.status })),
    actions: [
        { icon: 'edit', href: (row) => `/admin/products/edit/${row.id}`, title: 'Upravit' },
        { icon: 'trash-2', href: (row) => `/admin/products/delete/${row.id}`, title: 'Smazat', variant: 'danger', confirm: 'Opravdu smazat?' },
    ],
    filters: statusFilters,
    addButton: { label: 'Nový produkt', href: '/admin/products/create' },
    emptyMessage: 'Žádné produkty',
});
```

### AdminForm Component

Reusable admin form component (`src/components/data/AdminForm.ts`). Renders multi-section forms with main/sidebar layout.

```typescript
import { AdminForm, FormSection } from "../../../components";

const sections: FormSection[] = [
    {
        title: "Základní informace",
        position: 'main',
        fields: [
            { name: 'name', label: 'Název', required: true, colSpan: 8 },
            { name: 'slug', label: 'Slug', colSpan: 4 },
            { name: 'description', label: 'Popis', type: 'textarea', rows: 4 },
        ],
    },
    {
        title: "Stav",
        position: 'sidebar',
        fields: [
            { name: 'status', label: 'Stav', type: 'select', options: statusOptions },
        ],
    },
];

AdminForm({
    sections,
    values: data,               // Record<string, string> from form POST or DB
    error,                      // Error message string (optional)
    submitLabel: 'Vytvořit',
    backUrl: '/admin/products',
});
```

### Runtime Globals

`src/global.d.ts` declares all functions provided by the Lua hosting runtime. These are globally available (no imports needed) and cover:

- **File I/O**: `fileRead`, `fileWrite`, `fileDelete`, `fileCopy`, `fileMove`, `dirList`
- **Cloud Storage**: `storageUpload`, `storageUploadBytes`, `storageDownload`, `storageDelete`, `storageGetUrl`, `storageGetSignedUrl`, `storageList`, `storageExists`
- **HTTP Client**: `httpGet`, `httpPost`, `httpRequest`
- **Database**: `sqlQuery<T>(query, params)`
- **Cache**: `appCacheGet`, `appCacheSet`, `appCacheRemove`, `clearMicroCache`
- **JSON**: `jsonEncode`, `jsonDecode`
- **URL**: `urlEncode`, `urlDecode`, `parseUrl`, `parseUrlQuery`, `buildUrlQuery`
- **Crypto**: `hashPassword`, `verifyPassword`, `sha256`, `md5`, `hmacSha256`, `base64Encode`, `base64Decode`, `base64UrlEncode`, `base64UrlDecode`, `randomBytes`
- **JWT**: `jwtSign`, `jwtVerify`, `jwtDecode`
- **Date/Time**: `now`, `nowMillis`, `dateFormat`, `dateParse`, `dateAdd`, `dateDiff`, `dateToISO`, `dateFromISO`
- **Logging**: `logInfo`, `logWarn`, `logError`, `logDebug`
- **String**: `trim`, `toLower`, `toUpper`, `slugify`, `stringSplit`, `stringContains`, `stringStartsWith`, `stringEndsWith`, `stringReplace`, `stringPad`
- **Regex**: `regexTest`, `regexMatch`, `regexMatchAll`, `regexReplace`
- **Math**: `round`, `ceil`, `floor`, `abs`, `mathMin`, `mathMax`, `clamp`, `formatNumber`, `formatCurrency`
- **Redis**: Full Redis support (strings, hashes, lists, sets, sorted sets, pub/sub)
- **Email**: `sendEmail`
- **Images**: `imageResize`, `imageThumbnail`, `imageInfo`
- **PDF**: `generatePdf`
- **Config**: `getConfig(key?)`, `uniqueKey()`

All global declarations use `@noSelf` annotation — this is required by TSTL to generate correct Lua function calls without implicit `self` parameter.

### Validation System

`src/validator.ts` provides decorator-based validation using experimental decorators:

```typescript
class LoginForm {
    @Transform((v) => v?.trim())
    @Required()
    @MinLength(3)
    username: string = '';

    @Required()
    @MinLength(6)
    password: string = '';
}

// Usage
const validated = transformValidate(LoginForm, formData);
```

Available decorators: `@Required()`, `@MinLength(n)`, `@MaxLength(n)`, `@Range(min, max)`, `@Custom(fn)`, `@Transform(fn)`, `@Type(typeFn)` for nested objects.

### Configuration

`src/config.ts` returns the `Config` object controlling: MicroCache (in-memory TTL cache), PostgreSQL connection, Redis connection, **session settings**, upload temp directory, max upload file size, and **database migrations**. DB and Redis are disabled by default; connection URLs come from `getConfig()`.

### Database Migrations

`src/migrations/` contains numbered migration files (001–014). Migrations are defined in `config.ts` and run automatically at application startup via the `init()` hook.

**How it works:**
1. Migrations are tracked in a `_migrations` table (created automatically)
2. Each migration has a version number, name, and SQL statement
3. Migrations run in order by version number
4. Already-applied migrations are skipped
5. **Thread-safe:** `init()` runs only once at startup before HTTP server starts

**IMPORTANT - After adding new migrations:**
- Migrations run only when Cloud Run instance starts (cold start)
- After deploy, the instance may not restart immediately if it's still warm
- **To verify migration ran:** Check logs for SQL migration statements or use `run_sql_query` via TypeForge MCP to check if table exists
- **If migration didn't run:** Either wait for cold start, or manually run the migration SQL using `run_sql_query` MCP tool, then insert record into `_migrations` table:
  ```sql
  INSERT INTO _migrations (version, name, applied_at) VALUES (<version>, '<name>', NOW())
  ```

**Session configuration:**
```typescript
session: {
    secret: getConfig("SESSION_SECRET") ?? "default-dev-secret",
    ttlMinutes: 15,              // Token expires after 15 minutes
    cookieName: "session_token", // Cookie name
    refreshThresholdMinutes: 5   // Auto-refresh when < 5 min remaining
}
```

### Session Management (JWT-based)

Sessions use **signed JWT tokens stored in cookies** — no server-side storage needed. Tokens auto-refresh when close to expiration.

**Key functions** (from `src/utils.ts`):
- `getSession<T>(request)` — Get session data from request cookie
- `setSession<T>(data, response)` — Create JWT token and set cookie
- `clearSession(response)` — Delete session cookie
- `refreshSessionIfNeeded<T>(request, response)` — Auto-refresh if expiring soon
- `withSessionRefresh<T>(request, response, handler)` — Middleware wrapper

**Important:** `setSession` signature is `(data, response)` — it returns the modified response with the cookie set.

## TSTL Limitations

TypeScript-to-Lua (TSTL) doesn't support all JavaScript/TypeScript methods. Use runtime globals instead:

| Unsupported JS Method | Use Instead |
|-----------------------|-------------|
| `string.lastIndexOf()` | `stringSplit(text, '.')` then get last element |
| `string.includes()` | `stringContains(text, search)` |
| `string.startsWith()` | `stringStartsWith(text, prefix)` |
| `string.endsWith()` | `stringEndsWith(text, suffix)` |
| `string.split()` | `stringSplit(text, delimiter)` |
| `string.replace()` | `stringReplace(text, search, replacement)` |
| `string.trim()` | `trim(text)` |
| `string.toLowerCase()` | `toLower(text)` |
| `string.toUpperCase()` | `toUpper(text)` |

**Example - Getting file extension:**
```typescript
// WRONG - TSTL error
const ext = filename.substring(filename.lastIndexOf('.'));

// CORRECT - Use stringSplit
const parts = stringSplit(filename, '.');
const ext = parts.length > 1 ? '.' + parts[parts.length - 1] : '';
```

## Key Conventions

- **`@noSelf` annotation**: Required on all exported functions that the Lua runtime calls directly. Without it, TSTL generates Lua methods with an implicit `self` parameter that breaks the runtime contract.

- **Route handlers** follow the pattern:
  ```typescript
  export function renderPageName(request: Request, response: Response): Response {
      const auth = requireAdmin(request, response);
      if (!auth) return response;
      // ... fetch data from repository, render template
      response.content = getHtmlTemplate("Title", AdminLayout({ ... }));
      return response;
  }
  ```

- **Repository functions** follow the pattern:
  ```typescript
  export function findAllProducts(): DbProduct[] {
      return sqlQuery<DbProduct>(
          `SELECT *, price::float as price, created_at::text as created_at FROM products ORDER BY id DESC`,
          []
      );
  }
  export function insertProduct(name: string, slug: string, price: number): void {
      sqlQuery("INSERT INTO products (name, slug, price) VALUES ($1, $2, $3)", [name, slug, price]);
  }
  ```

- **Template functions** follow the pattern:
  ```typescript
  export function getProductFormContent(request: Request, categories: DbCategory[], data?: Record<string, string>, error?: string, isEdit: boolean = false): string {
      const sections: FormSection[] = [ /* ... */ ];
      return AdminForm({ sections, values: data, error, submitLabel: isEdit ? 'Uložit' : 'Vytvořit', backUrl: '/admin/products' });
  }
  ```

- **Constants** follow the pattern:
  ```typescript
  // [module].const.ts
  export const STATUS_FILTER_OPTIONS = [
      { value: 'active', label: 'Aktivní' },
      { value: 'inactive', label: 'Neaktivní' },
  ];
  export const DEFAULT_ICON = 'box';
  ```

- **Validation classes** follow the pattern:
  ```typescript
  // [module].validation.ts
  export class ProductForm {
      @Transform((v: string) => v?.trim())
      @Required()
      @MinLength(2)
      name: string = '';
      status: string = 'active';
  }
  ```

- **Index exports** — each module's `index.ts` only exports handlers:
  ```typescript
  export * from './catalog.handlers';
  ```

- **Import order in handlers:**
  ```typescript
  import { getHtmlTemplate } from "../../../template";
  import { AdminLayout, AdminDataList, Badge } from "../../../components";
  import { getPayloudData } from "../../../utils";
  import { transformValidate, ValidationError } from "../../../validator";
  import { DbProduct, requireAdmin, formatPrice } from "../shared";
  import { ProductForm } from "./catalog.validation";
  import { getProductFormContent } from "./catalog.templates";
  import { PRODUCT_STATUS_FILTER_OPTIONS } from "./catalog.const";
  import { findAllProducts, insertProduct } from "./catalog.repository";
  ```

- **Global types** (`Request`, `Response`, `Config`, `SessionConfig`, `RouteFunction`, etc.) are declared in `src/global.types.ts` and available project-wide without imports.

- **Shared types and helpers** (`DbUser`, `DbProduct`, `DbCategory`, `UserSession`, `requireAdmin`, `formatPrice`, `generateSlug`, etc.) are in `src/modules/app/shared.ts`.

- **Session management**: Use JWT-based sessions from `src/utils.ts`:
  - `getSession<T>(request)` — read session data
  - `setSession<T>(data, response)` — create session (returns modified response)
  - `clearSession(response)` — logout
  - `refreshSessionIfNeeded<T>(request, response)` — auto-refresh expiring tokens

- **CSRF protection**: Use `link()` helper with `type: "action"` for forms, validate with `checkCsrfToken()`.

## Adding a New Module

To add a new domain module (e.g., `invoices`):

1. **Create the module directory** `src/modules/app/invoices/`

2. **Create files** following the naming convention:
   ```
   invoices/
   ├── index.ts                    # export * from './invoices.handlers'
   ├── invoices.handlers.ts        # Route handlers
   ├── invoices.repository.ts      # SQL queries
   ├── invoices.templates.ts       # AdminForm/AdminDataList templates
   ├── invoices.const.ts           # Status labels, filter options
   └── invoices.validation.ts      # Form validation classes
   ```

3. **Add types** to `src/modules/app/shared.ts` if they're used across modules, or create `invoices.types.ts` for domain-specific types.

4. **Create migration** in `src/migrations/` (e.g., `015_create_invoices.ts`) and register in `config.ts`.

5. **Add route paths** to `src/modules/router.types.ts`.

6. **Register routes** in `src/modules/router.ts` importing from the module.

7. **Export module** from `src/modules/app/index.ts`:
   ```typescript
   export * from './invoices';
   ```

## Common Patterns

### Handler with AdminDataList (list page)
```typescript
export function renderAdminInvoices(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery(request.url);
    const statusFilter = params["status"] ?? "";
    const invoices = findAllInvoices();

    const statusFilters = INVOICE_STATUS_FILTER_OPTIONS.map(o => ({
        ...o, selected: o.value === statusFilter,
    }));

    const filtered = statusFilter
        ? invoices.filter(i => i.status === statusFilter)
        : invoices;

    const content = AdminDataList({
        columns: [
            { key: 'number', label: 'Číslo' },
            { key: 'amount', label: 'Částka', align: 'right', render: (v) => formatPrice(Number(v)) },
            { key: 'status', label: 'Stav', render: (v) => Badge({ children: getStatusLabel(v), variant: getStatusVariant(v) }) },
        ],
        rows: filtered.map(i => ({ id: String(i.id), number: i.number, amount: String(i.amount), status: i.status })),
        actions: [
            { icon: 'edit', href: (row) => `/admin/invoices/edit/${row.id}`, title: 'Upravit' },
        ],
        filters: statusFilters,
        addButton: { label: 'Nová faktura', href: '/admin/invoices/create' },
    });

    response.content = getHtmlTemplate("Faktury", AdminLayout({ children: content, request, activePath: '/admin/invoices' }));
    return response;
}
```

### Handler with AdminForm (create/edit page)
```typescript
export function renderAdminInvoiceCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        try {
            const data = transformValidate(InvoiceForm, raw);
            insertInvoice(data.number, Number(data.amount));
            response.status = 302;
            response.headers["Location"] = "/admin/invoices";
            return response;
        } catch (error) {
            if (error instanceof ValidationError) {
                const content = getInvoiceFormContent(request, raw, (error as ValidationError).message);
                response.content = getHtmlTemplate("Nová faktura", AdminLayout({ children: content, request }));
                return response;
            }
        }
    }

    const content = getInvoiceFormContent(request);
    response.content = getHtmlTemplate("Nová faktura", AdminLayout({ children: content, request, activePath: '/admin/invoices' }));
    return response;
}
```

### Repository functions
```typescript
// invoices.repository.ts
export function findAllInvoices(): DbInvoice[] {
    return sqlQuery<DbInvoice>(
        `SELECT *, amount::float as amount, created_at::text as created_at FROM invoices ORDER BY id DESC`,
        []
    );
}

export function findInvoiceById(id: number): DbInvoice | null {
    const rows = sqlQuery<DbInvoice>(
        `SELECT *, amount::float as amount, created_at::text as created_at FROM invoices WHERE id = $1`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function insertInvoice(number: string, amount: number): void {
    sqlQuery("INSERT INTO invoices (number, amount) VALUES ($1, $2)", [number, amount]);
}

export function updateInvoice(id: number, number: string, amount: number): void {
    sqlQuery("UPDATE invoices SET number = $1, amount = $2 WHERE id = $3", [number, amount, id]);
}

export function deleteInvoice(id: number): void {
    sqlQuery("DELETE FROM invoices WHERE id = $1", [id]);
}
```

### Template with AdminForm
```typescript
// invoices.templates.ts
export function getInvoiceFormContent(request: Request, data?: Record<string, string>, error?: string, isEdit: boolean = false): string {
    const sections: FormSection[] = [
        {
            title: "Faktura",
            position: 'main',
            fields: [
                { name: 'number', label: 'Číslo faktury', required: true },
                { name: 'amount', label: 'Částka', type: 'number', step: '0.01', required: true },
            ],
        },
        {
            title: "Stav",
            position: 'sidebar',
            fields: [
                { name: 'status', label: 'Stav', type: 'select', options: INVOICE_STATUS_OPTIONS },
            ],
        },
    ];

    return AdminForm({
        sections,
        values: data,
        error,
        submitLabel: isEdit ? 'Uložit změny' : 'Vytvořit fakturu',
        backUrl: '/admin/invoices',
    });
}
```

### Cached data fetch
```typescript
function getProducts(): Product[] {
    const cached = appCacheGet("products");
    if (cached) return jsonDecode(cached);

    const products = findAllProducts();
    appCacheSet("products", jsonEncode(products), 60000);
    return products;
}
```

### Protected route with auto-refresh
```typescript
export function renderAdmin(request: Request, response: Response): Response {
    return withSessionRefresh<UserSession>(request, response, (req, res) => {
        const session = getSession<UserSession>(req);
        if (!session?.user?.isAdmin) {
            res.status = 302;
            res.headers["Location"] = "/login";
            return res;
        }
        // Render admin page...
        return res;
    });
}
```

### Login handler
```typescript
export function handleLogin(request: Request, response: Response): Response {
    if (request.method === "post") {
        const data = getPayloudData<LoginForm>(request);
        const user = authenticateUser(data.username, data.password);

        if (user) {
            response = setSession({ user: { id: user.id, token: uniqueKey() } }, response);
            response.status = 302;
            response.headers["Location"] = "/dashboard";
            return response;
        }
    }
    // Render login form...
    return response;
}
```

### Logout handler
```typescript
export function handleLogout(request: Request, response: Response): Response {
    response = clearSession(response);
    response.status = 302;
    response.headers["Location"] = "/login";
    return response;
}
```

## TSTL / Lua Gotchas (IMPORTANT)

These are critical differences between TypeScript and the compiled Lua runtime. **Every developer (and AI agent) must follow these rules** to avoid bugs that are hard to debug.

### 1. Empty string is truthy in Lua

In JavaScript `""` is falsy, but in Lua `""` is **truthy**. This means `||` fallback patterns silently fail:

```typescript
// BAD — will never call generateSlug() when slug is ""
const slug = data.slug || generateSlug(data.name);

// GOOD — explicit check
const slug = (data.slug !== '' && data.slug !== undefined) ? data.slug : generateSlug(data.name);
```

### 2. DECIMAL/NUMERIC columns return null in Lua

The Lua SQL driver **cannot read PostgreSQL DECIMAL/NUMERIC type columns** — it returns `null`. Always cast to `::float` in SELECT queries:

```typescript
// BAD — price will be null
sqlQuery("SELECT * FROM products", []);

// GOOD — cast DECIMAL columns to float
sqlQuery("SELECT *, price::float as price, old_price::float as old_price FROM products", []);
```

### 3. TIMESTAMP columns return non-string in Lua

The Lua SQL driver returns TIMESTAMP values as a non-string type that breaks string operations. Always cast to `::text`:

```typescript
// BAD — created_at won't be a usable string
sqlQuery("SELECT * FROM orders", []);

// GOOD — cast TIMESTAMP columns to text
sqlQuery("SELECT *, created_at::text as created_at, updated_at::text as updated_at FROM orders", []);
```

### 4. Null/nil in arrays truncates parameters

Lua `nil` in arrays causes the array to be truncated at that point. This leads to "bind message supplies N parameters, but prepared statement requires M" errors. **Never pass null/nil as a SQL parameter.** Use the NULLIF pattern instead:

```typescript
// BAD — if categoryId is null, the array gets truncated
sqlQuery("INSERT INTO products (name, category_id, price) VALUES ($1, $2, $3)",
    [name, categoryId, price]);

// GOOD — pass 0 instead of null, let SQL convert back
sqlQuery("INSERT INTO products (name, category_id, price) VALUES ($1, NULLIF($2, 0), $3)",
    [name, categoryId !== null ? categoryId : 0, price]);
```

### 5. charAt() works on bytes, not UTF-8 characters

`String.charAt()` in TSTL operates on raw bytes. Multi-byte UTF-8 characters (like Czech `á`, `č`, `ř`, `ž`) are 2 bytes, so iterating with `charAt()` will split them and produce garbage. **Always use string-level operations** (`indexOf`, `substring`, `replaceAll`) for text with potential non-ASCII characters:

```typescript
// BAD — breaks multi-byte characters
for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i); // splits "á" into two garbage bytes
}

// GOOD — use replaceAll for substitutions, only use charAt after ensuring ASCII-only content
s = replaceAll(s, 'á', 'a');  // string-level operation, handles multi-byte correctly
s = replaceAll(s, 'č', 'c');
// Now safe to iterate with charAt() since all non-ASCII chars are replaced
```

### 6. dateParse format tokens

The runtime uses `YYYY-MM-DD HH:mm:ss` format tokens (NOT Go-style `2006-01-02 15:04:05`). However, for reliability prefer manual substring parsing for dates from PostgreSQL:

```typescript
// RELIABLE — manual parsing of PostgreSQL date string "2026-02-08 13:03:31.235111"
function formatDate(dateStr: string): string {
    if (!dateStr || dateStr.length < 10) return '-';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(5, 7);
    const day = dateStr.substring(8, 10);
    const d = Number(day);
    const m = Number(month);
    if (d > 0 && m > 0) return `${d}. ${m}. ${year}`;
    return '-';
}
```

### 7. CSS class consistency

Always use `btn-outline-tf` and `btn-primary-tf` for button styling. Never use Bootstrap-style `btn-outline-secondary` or other non-tf variants — they don't match the app's dark theme.

### Summary: SQL SELECT template

When selecting from any table with DECIMAL or TIMESTAMP columns, always use casts:

```typescript
sqlQuery<T>(
    `SELECT *,
        price::float as price,           -- for every DECIMAL column
        old_price::float as old_price,
        total_amount::float as total_amount,
        created_at::text as created_at,  -- for every TIMESTAMP column
        updated_at::text as updated_at
     FROM table_name WHERE ...`,
    [params]
);
```
