# TypeForge Framework - Dokumentace

Vítejte v oficiální dokumentaci TypeForge frameworku. TypeForge je serverless web framework, který kompiluje TypeScript do Lua pomocí TypeScript-to-Lua (TSTL).

## Obsah dokumentace

| Dokument | Popis |
|----------|-------|
| [Architektura](./architecture.md) | Struktura projektu, modulární architektura, kompilační pipeline |
| [App Runtime](./runtime.md) | Přehled hostingového prostředí (Lua VM pool, caching, životní cyklus) |
| [Routing](./routing.md) | Typově bezpečný routovací systém |
| [Komponenty](./components.md) | Komponentový systém — UI, AdminDataList, AdminForm |
| [Validace](./validation.md) | Decorator-based validační systém |
| [Runtime API](./runtime-api.md) | Reference všech runtime funkcí |
| [Návrhové vzory](./patterns.md) | Doporučené vzory a best practices |

## Rychlý start

### Instalace

```bash
npm install
```

### Vývoj

```bash
npm run dev          # Watch mode - automatická rekompilace
npm run build        # Jednorázová kompilace
```

### Deployment

```bash
HOSTING_API_SECRET=<secret> ./scripts/deploy.sh
```

## Základní koncepty

### Kompilační pipeline

```
TypeScript (src/) → TSTL Compiler → Lua Bundle (dist/bundle.lua) → Lua JIT Runtime
```

### Request/Response model

Framework používá jednoduchý request/response model:

```typescript
// Vstupní bod aplikace
export function main(request: Request): Response {
    // Zpracování requestu
    return response;
}

// Konfigurace aplikace
export function config(): Config {
    return getAppConfig();
}

// Inicializace (migrace apod.)
export function init(): void {
    // Běží jednou při startu
}
```

### Modulární architektura

Aplikace je organizována do doménových modulů v `src/modules/app/`:

```
src/modules/app/
├── shared.ts / shared.const.ts     # Sdílené typy a konstanty
├── auth/                            # Autentizace
├── dashboard/                       # Dashboard & analytika
├── catalog/                         # Produkty & kategorie
├── customers/                       # Zákazníci
├── orders/                          # Objednávky
├── warehouse/                       # Sklad
├── blog/                            # Blog
├── media/                           # Média/soubory
├── admin-misc/                      # Nastavení, stránky, uživatelé
├── shop/                            # E-shop (veřejný)
├── cart/                            # Košík
└── notfound/                        # 404
```

Každý modul má konzistentní strukturu souborů:

| Soubor | Účel |
|--------|------|
| `index.ts` | Barrel export handlerů |
| `[module].handlers.ts` | HTTP handlery (route funkce) |
| `[module].repository.ts` | SQL dotazy (databázová vrstva) |
| `[module].templates.ts` | HTML šablony (AdminForm/AdminDataList) |
| `[module].const.ts` | Konstanty (statusy, filtry, defaults) |
| `[module].types.ts` | Doménové TypeScript typy |
| `[module].validation.ts` | Validační třídy s dekorátory |
| `[module].utils.ts` | Pomocné funkce |

### Struktura handleru

Každý route handler přijímá `Request` a `Response` a vrací modifikovaný `Response`:

```typescript
export function renderAdminProducts(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const products = findAllProducts();   // z .repository.ts
    const content = AdminDataList({...}); // z components
    response.content = getHtmlTemplate("Produkty", AdminLayout({ children: content, request }));
    return response;
}
```

## Klíčové soubory

| Soubor | Účel |
|--------|------|
| `src/main.ts` | Vstupní bod — `config()`, `init()`, `main()` |
| `src/global.d.ts` | Deklarace runtime API (`@noSelf`) |
| `src/global.types.ts` | Globální typy (Request, Response, Config) |
| `src/config.ts` | Konfigurace aplikace (DB, Redis, sessions, migrace) |
| `src/utils.ts` | Session management, CSRF, cookie helpers |
| `src/validator.ts` | Decorator-based validace |
| `src/template.ts` | HTML šablona wrapper |
| `src/migration-runner.ts` | Runner databázových migrací |
| `src/modules/router.ts` | Definice rout |
| `src/modules/router.types.ts` | Union typy cest |
| `src/modules/app/shared.ts` | Sdílené typy a helper funkce |
| `src/modules/app/shared.const.ts` | Sdílené konstanty (statusy, varianty) |
| `src/components/` | UI komponentová knihovna |

## Důležité konvence

1. **`@noSelf` anotace** — Povinná na `config()`, `init()`, `main()` v `main.ts`
2. **Route handlery** — Vždy vracejí `Response` objekt
3. **Repository pattern** — Všechny SQL dotazy v `.repository.ts` souborech
4. **Konstanty** — Všechny konstanty v `.const.ts` souborech
5. **Komponenty** — Funkce vracející HTML string
6. **TSTL gotchas** — Viz [Návrhové vzory](./patterns.md#tstl--lua-gotchas)

## Další zdroje

- [Příklady kódu](./patterns.md#kompletní-crud-modul)
- [TSTL / Lua Gotchas](./patterns.md#tstl--lua-gotchas)
- [Checklist pro nové funkce](./patterns.md#checklist-pro-nové-funkce)
