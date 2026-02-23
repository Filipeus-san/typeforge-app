# Runtime API Reference

Lua JIT hosting runtime poskytuje globální funkce pro práci se soubory, HTTP, databází, cache, kryptografií a dalšími funkcemi. Všechny funkce jsou dostupné globálně bez nutnosti importu.

> **Důležité:** Všechny globální funkce jsou deklarovány s `@noSelf` anotací v `src/global.d.ts`, což je vyžadováno TSTL pro správné generování Lua kódu.

## Souborový systém

### Čtení a zápis

```typescript
// Čtení souboru
const content: string = fileRead("path/to/file.txt");

// Zápis souboru
fileWrite("path/to/file.txt", "obsah souboru");

// Smazání souboru
fileDelete("path/to/file.txt");

// Kopírování souboru
fileCopy("source.txt", "destination.txt");

// Přesun souboru
fileMove("old-path.txt", "new-path.txt");

// Zjištění MIME typu
const contentType: string = fileContentType("image.png");
// Výsledek: "image/png"
```

### Práce s adresáři

```typescript
// Seznam souborů v adresáři
const files: Promise<string[]> = dirList("path/to/directory");

// Je to adresář?
const isDirectory: Promise<boolean> = isDir("path/to/check");

// Je to soubor?
const isAFile: Promise<boolean> = isFile("path/to/check");
```

## Cloud Storage (GCS)

Runtime poskytuje funkce pro práci s Google Cloud Storage. Soubory jsou ukládány pod cestou `{PROJECT}/{ENV}/files/{path}`.

### Upload souborů

```typescript
// Upload textového souboru
const objectPath = storageUpload("documents/report.txt", "Obsah souboru...");

// Upload s explicitním MIME typem
const imagePath = storageUpload("images/logo.png", imageData, "image/png");

// Upload binárních dat (pole bajtů)
const bytes = [0x89, 0x50, 0x4E, 0x47];  // PNG header
const path = storageUploadBytes("images/photo.png", bytes, "image/png");
```

### Download souborů

```typescript
// Stažení souboru jako string
const content = storageDownload("documents/report.txt");
```

### Správa souborů

```typescript
// Smazání souboru
storageDelete("documents/old-report.txt");

// Kontrola existence
if (storageExists("images/logo.png")) {
    // Soubor existuje
}

// Seznam souborů (s volitelným prefixem)
const allFiles = storageList();           // Všechny soubory
const images = storageList("images/");    // Pouze soubory v images/
```

### Získání URL

```typescript
// Veřejná URL (vyžaduje public bucket)
const publicUrl = storageGetUrl("images/logo.png");
// https://storage.googleapis.com/BUCKET/PROJECT/ENV/files/images/logo.png

// Podepsaná URL s časovým omezením (výchozí 1 hodina)
const signedUrl = storageGetSignedUrl("documents/private.pdf");

// Podepsaná URL s vlastní dobou platnosti (10 minut)
const shortUrl = storageGetSignedUrl("documents/private.pdf", 600);
```

## HTTP klient

### Jednoduché requesty

```typescript
// GET request
const response: string = httpGet("https://api.example.com/data");

// GET s hlavičkami
const response: string = httpGet("https://api.example.com/data", {
    "Authorization": "Bearer token123"
});

// POST request
const response: string = httpPost(
    "https://api.example.com/data",
    jsonEncode({ name: "test" }),
    { "Content-Type": "application/json" }
);
```

### Pokročilý HTTP request

```typescript
const result = httpRequest({
    url: "https://api.example.com/users",
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer token123"
    },
    body: jsonEncode({ name: "Updated Name" }),
    timeout: 5000  // ms
});

// result.status: number (HTTP status kód)
// result.headers: Record<string, string>
// result.body: string
```

## Databáze (PostgreSQL)

### SQL dotazy

```typescript
// SELECT
interface User {
    id: number;
    name: string;
    email: string;
}

const users = sqlQuery<User>(
    "SELECT id, name, email FROM users WHERE is_admin = $1",
    [true]
);

// INSERT
const result = sqlQuery<{ id: number }>(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id",
    ["Jan Novák", "jan@example.com"]
);
const newUserId = result[0].id;

// UPDATE
sqlQuery(
    "UPDATE users SET name = $1 WHERE id = $2",
    ["Nové jméno", 123]
);

// DELETE
sqlQuery("DELETE FROM users WHERE id = $1", [123]);
```

### TSTL gotchas pro SQL

```typescript
// VŽDY castujte DECIMAL/NUMERIC sloupce na ::float (jinak vrací null)
// VŽDY castujte TIMESTAMP sloupce na ::text (jinak vrací non-string)
const products = sqlQuery<DbProduct>(
    `SELECT *,
        price::float as price,
        old_price::float as old_price,
        created_at::text as created_at,
        updated_at::text as updated_at
     FROM products WHERE id = $1`,
    [id]
);

// NIKDY nepředávejte null v parametrech (truncates array)
// Použijte NULLIF pattern:
sqlQuery(
    "INSERT INTO products (name, category_id) VALUES ($1, NULLIF($2, 0))",
    [name, categoryId !== null ? categoryId : 0]
);
```

## Cache

### AppCache

```typescript
// Uložení do cache (TTL v milisekundách)
appCacheSet("user:123", jsonEncode(userData), 3600 * 1000); // 1 hodina

// Načtení z cache
const cached = appCacheGet("user:123");
if (cached) {
    const userData = jsonDecode<User>(cached);
}

// Smazání z cache
appCacheRemove("user:123");
```

### MicroCache

```typescript
// Vymazání HTTP MicroCache (automaticky se maže při POST/PUT/DELETE)
clearMicroCache();
```

### Cache-Aside pattern

```typescript
function getProductById(id: number): DbProduct | null {
    const cacheKey = `product:${id}`;

    const cached = appCacheGet(cacheKey);
    if (cached) {
        return jsonDecode<DbProduct>(cached);
    }

    const rows = sqlQuery<DbProduct>(
        "SELECT *, price::float as price FROM products WHERE id = $1",
        [id]
    );

    if (rows.length === 0) return null;

    appCacheSet(cacheKey, jsonEncode(rows[0]), 5 * 60 * 1000); // 5 minut
    return rows[0];
}
```

## JSON

```typescript
// Serializace
const json: string = jsonEncode({ name: "test", value: 123 });
// Výsledek: '{"name":"test","value":123}'

// Deserializace
interface Data {
    name: string;
    value: number;
}
const data = jsonDecode<Data>('{"name":"test","value":123}');
```

## URL

### Encoding/Decoding

```typescript
// URL encoding
const encoded: string = urlEncode("hello world");
// Výsledek: "hello%20world"

// URL decoding
const decoded: string = urlDecode("hello%20world");
```

### Parsování URL

```typescript
const url = parseUrl("https://user:pass@example.com:8080/path?query=1#hash");
// url.scheme: "https"
// url.host: "example.com"
// url.port: 8080
// url.path: "/path"
// url.query: "query=1"
// url.fragment: "hash"
// url.userinfo: "user:pass"
```

### Query string

```typescript
// Parsování query stringu
const params = parseUrlQuery<{ page?: string; sort?: string }>("page=1&sort=name");
// params.page = "1", params.sort = "name"

// Sestavení query stringu
const queryString = buildUrlQuery({ page: 1, sort: "name", filter: "active" });
// Výsledek: "page=1&sort=name&filter=active"
```

### HTML parsování

```typescript
// Parsování HTML (CSS selector query)
const result: string = html(query);
```

## Kryptografie

### Hashování hesel

```typescript
// Hashování hesla (bcrypt)
const hash: string = hashPassword("user-password");

// Ověření hesla
const isValid: boolean = verifyPassword("user-password", hash);
```

### Hash funkce

```typescript
// SHA-256
const sha256Hash: string = sha256("data to hash");

// MD5
const md5Hash: string = md5("data to hash");

// HMAC-SHA256
const hmac: string = hmacSha256("data", "secret-key");
```

### Encoding

```typescript
// Base64 encoding
const encoded: string = base64Encode("Hello World");
// Výsledek: "SGVsbG8gV29ybGQ="

// Base64 decoding
const decoded: string = base64Decode("SGVsbG8gV29ybGQ=");

// Base64 URL-safe encoding (bez paddingu)
const urlEncoded: string = base64UrlEncode("Hello World");

// Base64 URL-safe decoding
const urlDecoded: string = base64UrlDecode("SGVsbG8gV29ybGQ");

// Náhodné bajty (hex string)
const randomHex: string = randomBytes(16);
```

## JWT (JSON Web Tokens)

```typescript
// Vytvoření JWT tokenu (HS256)
const token: string = jwtSign(
    jsonEncode({ userId: 123, role: "admin" }),  // payload (JSON string)
    "my-secret-key",                              // secret
    900                                           // TTL v sekundách (15 minut)
);

// Ověření a dekódování JWT
const result = jwtVerify(token, "my-secret-key");
if (result && result.valid) {
    const payload = jsonDecode<{ userId: number; role: string }>(result.data);
    // payload.userId = 123
    // result.exp = Unix timestamp expirace
    // result.iat = Unix timestamp vytvoření
    // result.remainingSeconds = kolik sekund zbývá do expirace
}

// Pokud token expiroval
if (result && result.expired) {
    // Token je platný, ale expiroval
}

// Pokud je token neplatný (špatný podpis)
if (result === null) {
    // Neplatný token
}

// Dekódování JWT BEZ ověření podpisu (pouze pro debugging)
const decoded = jwtDecode(token);
```

**Návratová hodnota `jwtVerify`:**

| Pole | Typ | Popis |
|------|-----|-------|
| `data` | `string` | JSON string s payload daty |
| `exp` | `number` | Unix timestamp expirace |
| `iat` | `number` | Unix timestamp vytvoření |
| `valid` | `boolean` | `true` pokud token není expirovaný |
| `expired` | `boolean` | `true` pokud token expiroval |
| `remainingSeconds` | `number` | Sekund do expirace (0 pokud expired) |

## Datum a čas

### Aktuální čas

```typescript
// Unix timestamp (sekundy)
const timestamp: number = now();

// Unix timestamp (milisekundy)
const timestampMs: number = nowMillis();
```

### Formátování a parsování

```typescript
// Formátování timestampu
const formatted: string = dateFormat(timestamp, "YYYY-MM-DD HH:mm:ss");
// Výsledek: "2024-01-15 14:30:00"

// Parsování data
const ts: number = dateParse("2024-01-15 14:30:00", "YYYY-MM-DD HH:mm:ss");
```

### Aritmetika s datem

```typescript
// Přidání času k timestampu
const tomorrow: number = dateAdd(now(), 1, "days");
const inTwoHours: number = dateAdd(now(), 2, "hours");
// Jednotky: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months"

// Rozdíl mezi dvěma timestampy
const diffDays: number = dateDiff(ts1, ts2, "days");
// Jednotky: "seconds" | "minutes" | "hours" | "days" | "weeks"
```

### ISO formát

```typescript
// Převod na ISO 8601 string
const iso: string = dateToISO(timestamp);
// Výsledek: "2024-01-15T14:30:00Z"

// Parsování ISO 8601
const ts: number = dateFromISO("2024-01-15T14:30:00Z");
```

### Formátovací značky

| Značka | Popis | Příklad |
|--------|-------|---------|
| YYYY | Rok (4 číslice) | 2024 |
| MM | Měsíc (2 číslice) | 01-12 |
| DD | Den (2 číslice) | 01-31 |
| HH | Hodina (24h, 2 číslice) | 00-23 |
| mm | Minuta (2 číslice) | 00-59 |
| ss | Sekunda (2 číslice) | 00-59 |

> **Poznámka:** Pro spolehlivé parsování PostgreSQL datumů preferujte manuální substring parsování — viz [TSTL Gotchas](./patterns.md#tstl--lua-gotchas).

## String utility

```typescript
// Trim
const trimmed: string = trim("  hello  ");
// Výsledek: "hello"

// Převod na malá/velká písmena
const lower: string = toLower("HELLO");
const upper: string = toUpper("hello");

// Slugifikace textu (s podporou diakritiky)
const slug: string = slugify("Český produkt s háčky");
// Výsledek: "cesky-produkt-s-hacky"

// Rozdělení
const parts: string[] = stringSplit("a,b,c", ",");
// Výsledek: ["a", "b", "c"]

// Nahrazení (první výskyt)
const replaced: string = stringReplace("hello world", "world", "universe");
// Výsledek: "hello universe"

// Obsahuje?
const contains: boolean = stringContains("hello world", "world");
// Výsledek: true

// Začíná/končí na?
const starts: boolean = stringStartsWith("hello", "hel");
const ends: boolean = stringEndsWith("hello", "llo");

// Padding
const padded: string = stringPad("42", 5, "0", "left");
// Výsledek: "00042"
```

**Důležité:** Tyto funkce nahrazují JavaScript metody, které TSTL nepodporuje:

| JS metoda | Runtime funkce |
|-----------|---------------|
| `str.trim()` | `trim(str)` |
| `str.toLowerCase()` | `toLower(str)` |
| `str.toUpperCase()` | `toUpper(str)` |
| `str.split(',')` | `stringSplit(str, ',')` |
| `str.includes('x')` | `stringContains(str, 'x')` |
| `str.startsWith('x')` | `stringStartsWith(str, 'x')` |
| `str.endsWith('x')` | `stringEndsWith(str, 'x')` |
| `str.replace('a', 'b')` | `stringReplace(str, 'a', 'b')` |

## Regex utility

```typescript
// Test — vrací true/false
const matches: boolean = regexTest("hello123", "\\d+");
// true

// Match — vrací pole matchů nebo null
const match: string[] | null = regexMatch("hello 123 world 456", "\\d+");
// ["123"]

// Match All — vrací všechny matche
const allMatches: string[][] = regexMatchAll("hello 123 world 456", "\\d+");
// [["123"], ["456"]]

// Replace — nahradí pattern
const result: string = regexReplace("hello 123", "\\d+", "XXX");
// "hello XXX"
```

## Number utility

```typescript
// Zaokrouhlení
const rounded: number = round(3.7);         // 4
const precise: number = round(3.14159, 2);  // 3.14

// Floor / Ceil
const floored: number = floor(3.7);   // 3
const ceiled: number = ceil(3.2);     // 4

// Absolutní hodnota
const absolute: number = abs(-5);     // 5

// Min / Max
const minimum: number = mathMin(5, 3);  // 3
const maximum: number = mathMax(5, 3);  // 5

// Clamp (omezení na rozsah)
const clamped: number = clamp(15, 0, 10);  // 10

// Formátování čísla
const formatted: string = formatNumber(1234.56, 2, ",", " ");
// Výsledek: "1 234,56"

// Formátování měny
const price: string = formatCurrency(1234.56, "CZK", "cs-CZ");
```

## Logování

```typescript
// Informační log
logInfo("User logged in", { userId: 123 });

// Varování
logWarn("Rate limit approaching", { current: 90, max: 100 });

// Chyba
logError("Database connection failed", { error: errorMessage });

// Debug (pouze v dev módu)
logDebug("Request details", { path: request.path, method: request.method });
```

## Redis

### Key-Value operace

```typescript
// SET
redisSet("key", "value");
redisSet("key", "value", 3600); // s TTL (sekundy)

// GET
const value: string | null = redisGet("key");

// DELETE
redisDel("key");

// EXISTS
const exists: boolean = redisExists("key");

// EXPIRE
redisExpire("key", 3600);

// TTL
const ttl: number = redisTtl("key");

// KEYS (pattern matching)
const keys: string[] = redisKeys("user:*");

// INCR/DECR
const newValue: number = redisIncr("counter");
const incremented: number = redisIncrBy("counter", 5);
const decremented: number = redisDecr("counter");

// MGET/MSET
const values: (string | null)[] = redisMget(["key1", "key2"]);
redisMset({ key1: "value1", key2: "value2" });
```

### Hash operace

```typescript
// HSET / HGET
redisHset("user:123", "name", "Jan");
const name: string | null = redisHget("user:123", "name");

// HGETALL
const user: Record<string, string> = redisHgetAll("user:123");

// HDEL
redisHdel("user:123", "name");

// HEXISTS
const exists: boolean = redisHexists("user:123", "name");

// HKEYS / HVALS / HLEN
const keys: string[] = redisHkeys("user:123");
const vals: string[] = redisHvals("user:123");
const len: number = redisHlen("user:123");

// HMSET (multiple fields)
redisHmset("user:123", { name: "Jan", email: "jan@example.com" });

// HINCRBY
const newAge: number = redisHincrBy("user:123", "age", 1);
```

### List operace

```typescript
// LPUSH/RPUSH
redisLpush("queue", "item1");
redisRpush("queue", "item2");

// LPOP/RPOP
const item: string | null = redisLpop("queue");
const lastItem: string | null = redisRpop("queue");

// LRANGE
const items: string[] = redisLrange("queue", 0, -1);

// LLEN
const length: number = redisLlen("queue");

// LINDEX / LSET
const atIndex: string | null = redisLindex("queue", 0);
redisLset("queue", 0, "new-value");
```

### Set operace

```typescript
// SADD / SREM
redisSadd("tags", "tag1");
redisSrem("tags", "tag1");

// SMEMBERS
const members: string[] = redisSmembers("tags");

// SISMEMBER
const isMember: boolean = redisSismember("tags", "tag1");

// SCARD (počet členů)
const count: number = redisScard("tags");
```

### Sorted Set operace

```typescript
// ZADD
redisZadd("leaderboard", 100, "player1");

// ZRANGE / ZREVRANGE
const top10: string[] = redisZrange("leaderboard", 0, 9);
const bottom10: string[] = redisZrevrange("leaderboard", 0, 9);

// ZRANGE s scores
const withScores = redisZrangeWithScores("leaderboard", 0, 9);
// [{ member: "player1", score: 100 }, ...]

// ZSCORE
const score: number | null = redisZscore("leaderboard", "player1");

// ZRANK
const rank: number | null = redisZrank("leaderboard", "player1");

// ZREM / ZCARD
redisZrem("leaderboard", "player1");
const total: number = redisZcard("leaderboard");

// ZINCRBY
const newScore: number = redisZincrBy("leaderboard", 10, "player1");
```

### Pub/Sub a správa

```typescript
// Publikování zprávy
redisPublish("channel", "message");

// Správa databáze
const size: number = redisDbSize();
const pong: string = redisPing();
redisFlushDb();  // POZOR: smaže všechna data
```

## E-mail

```typescript
sendEmail({
    to: "recipient@example.com",
    subject: "Předmět e-mailu",
    body: "<h1>HTML obsah</h1><p>Text e-mailu...</p>",
    from: "sender@example.com",       // Volitelné
    replyTo: "reply@example.com",     // Volitelné
    cc: "cc@example.com",             // Volitelné
    bcc: "bcc@example.com"            // Volitelné
});
```

## Obrázky

```typescript
// Změna velikosti (height je volitelné — zachová poměr stran)
imageResize("input.jpg", "output.jpg", 800, 600);
imageResize("input.jpg", "output.jpg", 800);  // auto height

// Thumbnail (čtverec)
imageThumbnail("input.jpg", "thumb.jpg", 200);

// Informace o obrázku
const info = imageInfo("image.jpg");
// info.width, info.height, info.format
```

## PDF

```typescript
// Generování PDF z HTML
generatePdf("<h1>Title</h1><p>Content...</p>", "output.pdf");
```

## Konfigurace

```typescript
// Načtení jedné hodnoty
const dbUrl: string | null = getConfig("DATABASE_URL");

// Načtení všech hodnot
const allConfig: Record<string, string> = getConfig();
```

## Unikátní identifikátory

```typescript
// Generování UUID
const id: string = uniqueKey();
// Výsledek: např. "550e8400-e29b-41d4-a716-446655440000"
```

## Debugging

```typescript
// Print do konzole (pro debugging)
print("debug value");
```

## Session Management (JWT-based)

Sessions používají **podepsané JWT tokeny uložené v cookies** — bez nutnosti server-side storage. Tokeny se automaticky obnovují před expirací.

### Konfigurace

V `src/config.ts`:

```typescript
session: {
    secret: getConfig("SESSION_SECRET") ?? "default-dev-secret",
    ttlMinutes: 15,              // Token expiruje po 15 minutách
    cookieName: "session_token", // Název cookie
    refreshThresholdMinutes: 5   // Auto-refresh když zbývá < 5 minut
}
```

### Základní operace

```typescript
import { getSession, setSession, clearSession } from "./utils";

// Vytvoření session (při loginu)
interface UserSession {
    user: { id: number; email: string; token: string };
}

response = setSession<UserSession>(
    { user: { id: 123, email: "user@example.com", token: uniqueKey() } },
    response
);

// Čtení session
const session = getSession<UserSession>(request);
if (session?.user) {
    const userId = session.user.id;
}

// Smazání session (logout)
response = clearSession(response);
```

### Auto-refresh

```typescript
import { refreshSessionIfNeeded, withSessionRefresh } from "./utils";

// Manuální refresh
response = refreshSessionIfNeeded<UserSession>(request, response);

// Middleware wrapper (doporučeno)
export function renderDashboard(request: Request, response: Response): Response {
    return withSessionRefresh<UserSession>(request, response, (req, res) => {
        const session = getSession<UserSession>(req);
        if (!session?.user) {
            res.status = 302;
            res.headers["Location"] = "/login";
            return res;
        }

        // Render dashboard...
        return res;
    });
}
```

### Session s metadaty

```typescript
import { getSessionWithMeta } from "./utils";

const sessionMeta = getSessionWithMeta<UserSession>(request);
if (sessionMeta) {
    const user = sessionMeta.data.user;
    const secondsRemaining = sessionMeta.remainingSeconds;

    if (secondsRemaining < 60) {
        // "Vaše session brzy vyprší..."
    }
}
```
