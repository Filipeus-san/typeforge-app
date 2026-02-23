# Architektura TypeForge

## Struktura projektu

```
typeforge-app/
├── src/
│   ├── main.ts                    # Vstupní bod — config(), init(), main()
│   ├── global.d.ts                # Deklarace runtime API (@noSelf)
│   ├── global.types.ts            # Globální typy (Request, Response, Config)
│   ├── config.ts                  # Konfigurace (DB, Redis, sessions, migrace)
│   ├── utils.ts                   # Session management, CSRF, helpers
│   ├── validator.ts               # Decorator-based validační systém
│   ├── template.ts                # HTML šablona wrapper
│   ├── migration-runner.ts        # Runner databázových migrací
│   ├── react-build.ts             # React bundle konfigurace
│   │
│   ├── migrations/                # Databázové migrace (001–014)
│   │   ├── index.ts
│   │   ├── 001_create_users.ts
│   │   ├── ...
│   │   └── 014_create_media.ts
│   │
│   ├── components/                # Komponentová knihovna
│   │   ├── types.ts               # Typy komponent (Component<P>, BaseProps)
│   │   ├── helpers.ts             # cx, map, when, attrs, escapeHtml
│   │   ├── index.ts               # Barrel export všech komponent
│   │   ├── ui/                    # Button, Card, Badge, Icon, Form, Avatar, ThemeToggle
│   │   ├── data/                  # AdminDataList, AdminForm, DataTable, Pagination, FilterBar, StatCard
│   │   ├── layout/                # AdminLayout, AdminSidebar, Navbar, Footer, PageWrapper
│   │   ├── shop/                  # ProductCard, CategoryCard
│   │   └── blocks/                # Hero
│   │
│   └── modules/
│       ├── router.ts              # Definice rout (50+ routes)
│       ├── router.types.ts        # Union typy cest
│       ├── types.ts               # RouterPaths type s prefix support
│       └── app/                   # Doménové moduly
│           ├── index.ts           # Barrel export všech modulů
│           ├── shared.ts          # Sdílené typy, utility, auth helpers
│           ├── shared.const.ts    # Sdílené konstanty (statusy, varianty)
│           │
│           ├── auth/              # Autentizace (login, register, logout)
│           ├── dashboard/         # Admin dashboard & analytika
│           ├── catalog/           # Produkty & kategorie
│           ├── customers/         # Zákazníci
│           ├── orders/            # Objednávky
│           ├── warehouse/         # Sklad & zásoby
│           ├── blog/              # Blog příspěvky
│           ├── media/             # Média/soubory
│           ├── admin-misc/        # Nastavení, stránky, uživatelé
│           ├── shop/              # Veřejný e-shop
│           ├── cart/              # Nákupní košík
│           └── notfound/          # 404 stránka
│
├── dist/
│   └── bundle.lua                 # Kompilovaný Lua bundle
│
├── scripts/
│   └── deploy.sh                  # Deployment script
│
├── Docs/                          # Dokumentace
├── package.json
├── tsconfig.json                  # TypeScript + TSTL konfigurace
└── CLAUDE.md                      # Instrukce pro AI agenta
```

## Doménový modul — struktura souborů

Každý doménový modul v `src/modules/app/[module]/` dodržuje konzistentní konvenci:

| Soubor | Účel | Povinný |
|--------|------|---------|
| `index.ts` | Barrel export — pouze re-exportuje handlery | Ano |
| `[module].handlers.ts` | HTTP request handlery (route funkce) | Ano |
| `[module].repository.ts` | SQL dotazy (všechna volání `sqlQuery`) | Když je potřeba DB |
| `[module].templates.ts` | HTML template buildery (AdminForm/AdminDataList) | Když má formuláře |
| `[module].types.ts` | Doménové TypeScript typy | Když má vlastní typy |
| `[module].const.ts` | Konstanty (status labels, filter options, defaults) | Když má konstanty |
| `[module].utils.ts` | Doménové helper funkce | Když má util funkce |
| `[module].validation.ts` | Validační třídy s dekorátory | Když má formuláře |

**Příklad plného modulu (catalog/):**
```
catalog/
├── index.ts                   # export * from './catalog.handlers'
├── catalog.handlers.ts        # renderAdminProducts, renderAdminProductCreate, ...
├── catalog.repository.ts      # findAllProducts, findProductById, insertProduct, ...
├── catalog.templates.ts       # getProductFormContent, getCategoryFormContent
├── catalog.const.ts           # PRODUCT_STATUS_FILTER_OPTIONS, DEFAULT_PRODUCT_ICON
└── catalog.validation.ts      # ProductForm, CategoryForm třídy
```

**Příklad minimálního modulu (cart/):**
```
cart/
├── index.ts
├── cart.handlers.ts
└── cart.templates.ts
```

## Kompilační pipeline

### Tok dat

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   TypeScript    │────▶│  TSTL Compiler  │────▶│   Lua Bundle    │
│    (src/*.ts)   │     │                 │     │ (dist/bundle)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │  Lua JIT        │
                                               │  Hosting        │
                                               │  Runtime        │
                                               └─────────────────┘
```

### TSTL konfigurace (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "strict": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "tstl": {
    "luaTarget": "JIT",
    "luaLibImport": "require-minimal",
    "luaBundle": "./bundle.lua",
    "luaBundleEntry": "src/main.ts"
  }
}
```

## Runtime model

### Vstupní body

Hosting runtime volá tři exportované funkce z `main.ts`:

```typescript
/** @noSelf */
export function config() {
    return getAppConfig();
}

/** @noSelf */
export function init() {
    const appConfig = getAppConfig();
    if (appConfig.postgresql.enable && appConfig.migrations) {
        runMigrations(appConfig.migrations);
    }
}

/** @noSelf */
export function main(request: Request): Response {
    const routerList = getRouter();
    let response: Response = {
        headers: {},
        content: "",
        contentType: "text/html",
        status: 200
    };

    let find = routerList.find(element => element.path == request.path);
    if (find) {
        return find.route(request, response);
    }
    return renderNotFound(request, response);
}
```

### Request objekt

```typescript
interface Request {
    path: string                      // URL cesta (např. "/admin/products")
    method: HttpMethod                // "get" | "post" | "put" | "delete" | "patch"
    headers: Record<string, string>   // HTTP hlavičky
    payload?: string                  // Tělo requestu (POST data)
    query: string                     // Query string
    url: string                       // Kompletní URL
    files: Record<string, string[]>   // Nahrané soubory (cesty k temp souborům)
    clientIP: string                  // IP adresa klienta
    host: string                      // Host hlavička
    fullUrl: string                   // Plná URL včetně query
}
```

### Response objekt

```typescript
interface Response {
    content: string                   // Obsah odpovědi (HTML/JSON)
    contentType: ContentType          // MIME typ ("text/html", "application/json")
    status: HttpStatusCode            // HTTP status kód (200, 302, 404, ...)
    headers: Record<string, string>   // Response hlavičky
}
```

## Konfigurační systém

### Config objekt

```typescript
// src/config.ts
export function getAppConfig(): Config {
    return {
        microCache: {
            maxEntries: 100,       // Max položek v cache
            ttl: 25                // Time-to-live v ms
        },
        postgresql: {
            enable: true,          // Povolit PostgreSQL
            url: getConfig("DATABASE_URL") ?? ""
        },
        redis: {
            enable: false,         // Povolit Redis
            url: getConfig("REDIS_URL") ?? ""
        },
        session: {
            secret: getConfig("SESSION_SECRET") ?? "default-dev-secret",
            ttlMinutes: 15,        // Token expiruje po 15 min
            cookieName: "session_token",
            refreshThresholdMinutes: 5  // Auto-refresh < 5 min
        },
        uploadTempDir: "/tmp",
        maxUploadFileSize: 10 * 1024 * 1024,  // 10 MB
        migrations                // Pole migrací z migrations/index.ts
    }
}
```

## Vrstvy aplikace

```
┌─────────────────────────────────────────────────────────────┐
│                       Template                               │
│                  (HTML wrapper, styly)                       │
├─────────────────────────────────────────────────────────────┤
│                      Components                              │
│       (AdminDataList, AdminForm, UI, Layout, Shop)          │
├─────────────────────────────────────────────────────────────┤
│                      Handlers                                │
│           (Route handlery v .handlers.ts)                    │
├─────────────────────────────────────────────────────────────┤
│              Templates          Constants                    │
│          (.templates.ts)      (.const.ts)                   │
├─────────────────────────────────────────────────────────────┤
│             Repository          Validation                   │
│          (.repository.ts)   (.validation.ts)                │
├─────────────────────────────────────────────────────────────┤
│                        Router                                │
│              (Mapování cest na handlery)                     │
├─────────────────────────────────────────────────────────────┤
│                    Shared / Utils                             │
│         (Sdílené typy, session, CSRF, helpers)              │
├─────────────────────────────────────────────────────────────┤
│                     Runtime API                              │
│        (File I/O, HTTP, SQL, Redis, Crypto, ...)            │
└─────────────────────────────────────────────────────────────┘
```

## Životní cyklus requestu

```
1. HTTP Request příchází do Lua JIT runtime
                    │
                    ▼
2. MicroCache lookup (GET požadavky)
   ├── Cache hit → Vrátit cached response
   └── Cache miss → Pokračovat
                    │
                    ▼
3. Runtime volá main(request) funkci
                    │
                    ▼
4. Router hledá odpovídající cestu
                    │
                    ▼
5. Handler zpracovává request
   ├── requireAdmin() — autorizace
   ├── Repository — SQL dotazy
   ├── Validation — validace formulářů
   ├── Templates — sestavení HTML
   └── Components — UI rendering
                    │
                    ▼
6. Handler vrací Response objekt
                    │
                    ▼
7. Runtime odesílá HTTP response
```

## Sdílené typy (shared.ts)

Soubor `src/modules/app/shared.ts` obsahuje typy a helper funkce používané napříč moduly:

### Databázové typy

```typescript
interface UserSession {
    user: {
        id: number; email: string;
        firstName: string; lastName: string;
        isAdmin: boolean; token: string;  // CSRF token
    };
}

interface DbUser       { id, first_name, last_name, email, password_hash, is_admin, created_at }
interface DbProduct    { id, name, slug, description, short_description, category_id, price, old_price, icon, stock, status, created_at, updated_at }
interface DbCategory   { id, name, slug, description, icon, status, sort_order, created_at, updated_at }
interface DbOrder      { id, order_number, customer_id, customer_name, customer_email, status, total_amount, shipping_address, billing_address, notes, created_at, updated_at }
interface DbOrderItem  { id, order_id, product_id, product_name, quantity, unit_price, total_price }
interface DbCustomer   { id, first_name, last_name, email, phone, company, shipping_address, billing_address, notes, status, created_at, updated_at }
```

### Helper funkce

```typescript
requireAdmin(request, response)      // Ověří admin přístup, vrací { session, response } | null
generateSlug(text)                   // Generuje URL slug z textu (s českou diakritikou)
formatPrice(amount)                  // Formátuje cenu (např. "1 234,50 Kč")
formatOrderDate(dateStr)             // Formátuje datum z DB
generateOrderNumber()                // Generuje číslo objednávky
getProductStatusLabel(status)        // Vrací český label pro status
getProductStatusVariant(status)      // Vrací Badge variantu pro status
getOrderStatusLabel(status)          // Vrací český label pro status objednávky
getOrderStatusVariant(status)        // Vrací Badge variantu pro status objednávky
getCustomerInitials(fullName)        // Vrací iniciály
escapeJsString(str)                  // Escapuje string pro JS
replaceAll(str, search, replacement) // Replace all (TSTL kompatibilní)
```

## Databázové migrace

Migrace v `src/migrations/` (001–014) běží automaticky při startu aplikace přes `init()`.

```typescript
// src/migrations/001_create_users.ts
export const migration_001_create_users = {
    version: 1,
    name: "create_users",
    up: `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
    )`
};
```

**Důležité:** Migrace běží pouze při cold startu Cloud Run instance. Pro okamžité spuštění po deployi použijte `run_sql_query` MCP tool.

## Build a deployment

```bash
npm run build    # Kompilace TypeScript → Lua
npm run dev      # Watch mode s automatickou rekompilací
```

```bash
# Standardní deployment
HOSTING_API_SECRET=<secret> ./scripts/deploy.sh

# Lokální deployment (bez git metadat)
HOSTING_API_SECRET=<secret> ./scripts/deploy.sh --local

# Přeskočení buildu
SKIP_BUILD=1 HOSTING_API_SECRET=<secret> ./scripts/deploy.sh
```

### Environment variables

| Proměnná | Výchozí hodnota | Popis |
|----------|-----------------|-------|
| `HOSTING_API_SECRET` | - | API klíč (povinný) |
| `HOSTING_API_URL` | `http://localhost:3005/hosting` | URL hosting API |
| `HOSTING_ENV` | `production` | Prostředí |
| `SKIP_BUILD` | - | Přeskočí build krok |
