# App Runtime

TypeForge aplikace běží na specializovaném **App Runtime** — serverovém prostředí optimalizovaném pro spouštění Lua kódu zkompilovaného z TypeScriptu.

## Přehled

App Runtime je hostingová platforma, která:

- Přijímá HTTP požadavky a předává je Lua kódu
- Poskytuje globální API funkce (databáze, soubory, cache, kryptografie, ...)
- Spravuje pool Lua instancí pro paralelní zpracování požadavků
- Zajišťuje caching, session management a další infrastrukturu

```
┌─────────────────────────────────────────────────────────────────┐
│                        App Runtime                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  HTTP       │    │  Lua VM     │    │  Runtime    │         │
│  │  Server     │───▶│  Pool       │───▶│  API        │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│         │                 │                   │                 │
│         ▼                 ▼                   ▼                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  MicroCache │    │  AppCache   │    │  PostgreSQL │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                              │                  │
│                                        ┌─────────────┐         │
│                                        │    Redis    │         │
│                                        └─────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

## Jak to funguje

### 1. Deployment

Při deployi se Lua bundle (`dist/bundle.lua`) nahraje na hosting platformu. Runtime načte bundle a připraví pool Lua instancí.

### 2. Vstupní body aplikace

Runtime volá tři exportované funkce z `src/main.ts`:

```typescript
/** @noSelf */
export function config(): Config {
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

| Funkce | Kdy se volá | Účel |
|--------|-------------|------|
| `config()` | Při startu runtime | Vrací konfiguraci (DB, cache, sessions, upload limity) |
| `init()` | Jednou při cold startu | Spouští databázové migrace |
| `main(request)` | Při každém HTTP requestu | Zpracování požadavku, vrací Response |

### 3. Zpracování požadavku

Když přijde HTTP požadavek:

1. Runtime vybere dostupnou Lua instanci z poolu
2. Zavolá funkci `main(request)` z vašeho kódu
3. Předá Request objekt s informacemi o požadavku
4. Přijme Response objekt s odpovědí
5. Odešle HTTP response klientovi

## Lua VM Pool

Runtime vytváří **pool Lua instancí** (typicky jedna instance na CPU jádro). Každý požadavek je zpracován jednou instancí, což umožňuje paralelní zpracování více požadavků současně.

Výhody:
- **Paralelizace** — více požadavků současně
- **Izolace** — chyba v jednom požadavku neovlivní ostatní
- **Výkon** — předem inicializované instance, žádný cold start per-request

## Konfigurace

Při startu runtime volá funkci `config()` definovanou v `src/config.ts`:

```typescript
export function getAppConfig(): Config {
    return {
        microCache: {
            maxEntries: 100,       // Max položek v HTTP cache
            ttl: 25                // Time-to-live v ms
        },
        postgresql: {
            enable: true,
            url: getConfig("DATABASE_URL") ?? ""
        },
        redis: {
            enable: false,
            url: getConfig("REDIS_URL") ?? ""
        },
        session: {
            secret: getConfig("SESSION_SECRET") ?? "default-dev-secret",
            ttlMinutes: 15,
            cookieName: "session_token",
            refreshThresholdMinutes: 5
        },
        uploadTempDir: "/tmp",
        maxUploadFileSize: 10 * 1024 * 1024,  // 10 MB
        migrations                              // Pole migrací z migrations/index.ts
    }
}
```

## Caching

Runtime poskytuje dva typy cache:

### MicroCache

HTTP-level cache pro rychlé odpovědi na opakované GET požadavky.

- **TTL**: Konfigurovatelný (výchozí 25 ms)
- **Kapacita**: Max počet položek (výchozí 100)
- **Automatické čištění**: Při POST/PUT/DELETE požadavcích
- **Invalidace z kódu**: `clearMicroCache()`

### AppCache

Aplikační cache pro sdílená data mezi požadavky. Sdílena napříč Lua instancemi.

- **Použití**: Dočasné úložiště, cache DB výsledků
- **API**: `appCacheGet`, `appCacheSet`, `appCacheRemove`

```typescript
// Uložení do cache (TTL v milisekundách)
appCacheSet("products:all", jsonEncode(products), 60000);  // 1 minuta

// Načtení z cache
const cached = appCacheGet("products:all");
if (cached) {
    const products = jsonDecode<DbProduct[]>(cached);
}

// Smazání z cache
appCacheRemove("products:all");
```

## Databázové připojení

Runtime spravuje connection pool pro PostgreSQL. Připojení je sdíleno mezi všemi Lua instancemi a automaticky se obnovuje při výpadku.

```typescript
// Konfigurace
postgresql: {
    enable: true,
    url: getConfig("DATABASE_URL") ?? ""
}

// Použití v kódu (repository pattern)
const users = sqlQuery<DbUser>(
    "SELECT *, created_at::text as created_at FROM users WHERE is_admin = $1",
    [true]
);
```

**Důležité TSTL gotchas pro SQL:**
- `DECIMAL/NUMERIC` sloupce → vždy cast `::float` (jinak vrací null)
- `TIMESTAMP` sloupce → vždy cast `::text` (jinak vrací non-string)
- `null` v parametrech → nikdy (truncates array), použijte `NULLIF($n, 0)` pattern

## Redis připojení

Volitelné Redis připojení pro cache, pub/sub a další use cases.

```typescript
redis: {
    enable: true,
    url: getConfig("REDIS_URL") ?? ""
}
```

## File Upload

Runtime zpracovává multipart/form-data uploady a ukládá soubory do dočasného adresáře.

```typescript
// Konfigurace
uploadTempDir: "/tmp",
maxUploadFileSize: 10 * 1024 * 1024  // 10 MB

// Přístup k nahraným souborům v handleru
const uploadedFiles = request.files["file"];  // string[] — cesty k temp souborům
```

## Session Management

Sessions používají **podepsané JWT tokeny v cookies**. Konfigurace v `config()`:

```typescript
session: {
    secret: getConfig("SESSION_SECRET") ?? "default-dev-secret",
    ttlMinutes: 15,              // Token expiruje po 15 minutách
    cookieName: "session_token",
    refreshThresholdMinutes: 5   // Auto-refresh když zbývá < 5 minut
}
```

Klíčové funkce z `src/utils.ts`:

| Funkce | Účel |
|--------|------|
| `getSession<T>(request)` | Načtení session dat z cookie |
| `setSession<T>(data, response)` | Vytvoření JWT a nastavení cookie |
| `clearSession(response)` | Smazání session cookie |
| `refreshSessionIfNeeded<T>(request, response)` | Auto-refresh pokud blízko expirace |
| `withSessionRefresh<T>(request, response, handler)` | Middleware wrapper |

## Error Handling

Runtime zachycuje chyby v Lua kódu a:

1. Loguje chybu s kontextem (stack trace)
2. Mapuje Lua řádky zpět na TypeScript (pomocí source map)
3. Vrací HTTP 500 response

V development módu je chybová zpráva součástí response. V production módu je zobrazena generická chybová stránka.

## Životní cyklus požadavku

```
1. Příchozí HTTP request
        │
        ▼
2. MicroCache lookup (GET požadavky)
   ├── Cache hit → Vrátit cached response
   └── Cache miss → Pokračovat
        │
        ▼
3. Výběr Lua instance z poolu
        │
        ▼
4. Vytvoření Request objektu
        │
        ▼
5. Volání main(request)
        │
        ▼
6. Zpracování v aplikačním kódu
   ├── Router matching (router.ts)
   ├── Handler logika ([module].handlers.ts)
   │   ├── requireAdmin() — autorizace
   │   ├── Repository — SQL dotazy ([module].repository.ts)
   │   ├── Validation — validace formulářů ([module].validation.ts)
   │   └── Templates — sestavení HTML ([module].templates.ts)
   └── Components — UI rendering (components/)
        │
        ▼
7. Vrácení Response objektu
        │
        ▼
8. MicroCache update (pokud je povoleno)
        │
        ▼
9. HTTP response klientovi
```

## Environment Variables

Runtime čte konfiguraci z environment variables. Přístup v kódu přes `getConfig()`:

```typescript
// Jedna hodnota
const dbUrl = getConfig("DATABASE_URL");

// Všechny hodnoty jako Record<string, string>
const allConfig = getConfig();
```

Běžné proměnné:

| Proměnná | Popis |
|----------|-------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `SESSION_SECRET` | Secret pro JWT signing |
| `SMTP_*` | Konfigurace emailového serveru |

## Globální funkce

Runtime poskytuje sadu globálních funkcí dostupných bez importu. Kompletní seznam viz [Runtime API Reference](./runtime-api.md).

Kategorie:
- **Souborový systém**: `fileRead`, `fileWrite`, `fileCopy`, `fileMove`, `fileDelete`, `dirList`
- **Cloud Storage**: `storageUpload`, `storageDownload`, `storageDelete`, `storageGetUrl`, `storageGetSignedUrl`, `storageList`, `storageExists`
- **HTTP klient**: `httpGet`, `httpPost`, `httpRequest`
- **Databáze**: `sqlQuery<T>(query, params)`
- **Cache**: `appCacheGet`, `appCacheSet`, `appCacheRemove`, `clearMicroCache`
- **JSON**: `jsonEncode`, `jsonDecode`
- **URL**: `urlEncode`, `urlDecode`, `parseUrl`, `parseUrlQuery`, `buildUrlQuery`
- **Kryptografie**: `hashPassword`, `verifyPassword`, `sha256`, `md5`, `hmacSha256`, `base64Encode`, `base64Decode`, `randomBytes`
- **JWT**: `jwtSign`, `jwtVerify`, `jwtDecode`
- **Datum/čas**: `now`, `nowMillis`, `dateFormat`, `dateParse`, `dateAdd`, `dateDiff`, `dateToISO`, `dateFromISO`
- **Logování**: `logInfo`, `logWarn`, `logError`, `logDebug`
- **String**: `trim`, `toLower`, `toUpper`, `slugify`, `stringSplit`, `stringContains`, `stringStartsWith`, `stringEndsWith`, `stringReplace`, `stringPad`
- **Regex**: `regexTest`, `regexMatch`, `regexMatchAll`, `regexReplace`
- **Math**: `round`, `ceil`, `floor`, `abs`, `mathMin`, `mathMax`, `clamp`, `formatNumber`, `formatCurrency`
- **Redis**: `redisGet`, `redisSet`, `redisDel`, `redisHset`, `redisHget`, ...
- **Email**: `sendEmail`
- **Obrázky**: `imageResize`, `imageThumbnail`, `imageInfo`
- **PDF**: `generatePdf`

## @noSelf anotace

Všechny funkce volané z runtime (`config`, `init`, `main`) musí mít `@noSelf` anotaci. Toto je vyžadováno TSTL kompilátorem pro správné generování Lua kódu.

```typescript
/** @noSelf */
export function config(): Config { ... }

/** @noSelf */
export function init() { ... }

/** @noSelf */
export function main(request: Request): Response { ... }
```

Bez této anotace by TSTL vygeneroval Lua metody s implicitním `self` parametrem, což by způsobilo chybu při volání z runtime.

## Databázové migrace

Migrace v `src/migrations/` (číslované 001–014) běží automaticky při cold startu přes `init()`.

### Jak to funguje

1. Migrace jsou sledovány v tabulce `_migrations` (vytvořena automaticky)
2. Každá migrace má version number, name a SQL statement
3. Migrace běží v pořadí podle version number
4. Již aplikované migrace jsou přeskočeny
5. Thread-safe: `init()` běží pouze jednou při startu

### Definice migrace

```typescript
// src/migrations/014_create_media.ts
export const migration_014_create_media = {
    version: 14,
    name: "create_media",
    up: `CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(500) NOT NULL,
        original_name VARCHAR(500) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        size INTEGER NOT NULL DEFAULT 0,
        storage_path VARCHAR(1000),
        alt_text VARCHAR(500),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )`
};
```

### Registrace v konfiguraci

```typescript
// src/migrations/index.ts
export const migrations = [
    migration_001_create_users,
    migration_002_create_categories,
    // ...
    migration_014_create_media,
];
```

**Důležité:** Migrace běží pouze při cold startu Cloud Run instance. Po deployi se instance nemusí okamžitě restartovat. Pro ověření nebo manuální spuštění použijte `run_sql_query` MCP tool.

## Deployment

Deploy probíhá přes hosting API:

```bash
HOSTING_API_SECRET=<secret> ./scripts/deploy.sh
```

Proces:
1. Kompilace TypeScript → Lua (`npm run build`)
2. Upload bundle.lua na hosting
3. Runtime načte nový bundle
4. Nové požadavky používají aktualizovaný kód

Volitelné parametry:
- `--local`: Deploy bez git metadat
- `SKIP_BUILD=1`: Přeskočí build krok
- `HOSTING_ENV`: Cílové prostředí (default: production)
