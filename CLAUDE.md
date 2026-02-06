# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeForge is a serverless web framework that compiles TypeScript to Lua using TypeScript-to-Lua (TSTL). The compiled Lua bundle runs on a Lua JIT hosting runtime that provides built-in APIs for HTTP, database, file I/O, crypto, and more.

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

## Architecture

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

### Runtime Globals

`src/global.d.ts` declares all functions provided by the Lua hosting runtime. These are globally available (no imports needed) and cover: file I/O, HTTP client, SQL queries, JSON, URL handling, crypto, email, date/time, logging, string/number utils, Redis, image processing, PDF generation, and environment config via `getConfig()`.

All global declarations use `@noSelf` annotation — this is required by TSTL to generate correct Lua function calls without implicit `self` parameter.

### Validation System

`src/validator.ts` provides decorator-based validation using experimental decorators. Use `transformValidate(ClassName, plainObject)` to map plain objects to class instances with automatic transformation and validation. Available decorators: `@Required()`, `@MinLength(n)`, `@MaxLength(n)`, `@Range(min, max)`, `@Custom(fn)`, `@Transform(fn)`, `@Type(typeFn)` for nested objects.

### Configuration

`src/config.ts` returns the `Config` object controlling: MicroCache (in-memory TTL cache), PostgreSQL connection, Redis connection, upload temp directory, max upload file size, and database migrations. DB and Redis are disabled by default; connection URLs come from `getConfig()`.

### Database Migrations

`src/migrations.ts` provides automatic database migration support. Migrations are defined in `config.ts` and run automatically at application startup via the `init()` hook.

**How it works:**
1. Migrations are tracked in a `_migrations` table (created automatically)
2. Each migration has a version number, name, and SQL statement
3. Migrations run in order by version number
4. Already-applied migrations are skipped

**Example configuration:**
```typescript
export function getAppConfig(): Config {
    return {
        postgresql: { enable: true, url: getConfig("DATABASE_URL") ?? "" },
        migrations: [
            { version: 1, name: "create_users", up: "CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL)" },
            { version: 2, name: "add_name", up: "ALTER TABLE users ADD COLUMN name VARCHAR(255)" },
        ],
        // ... other config
    }
}
```

**Available functions:**
- `runMigrations(migrations)` — runs all pending migrations (called automatically by `init()`)
- `getMigrationStatus(migrations)` — returns `{ applied, pending }` for debugging

## Key Conventions

- **`@noSelf` annotation**: Required on all exported functions that the Lua runtime calls directly. Without it, TSTL generates Lua methods with an implicit `self` parameter that breaks the runtime contract.
- **Route handlers** follow the pattern: `function handler(request: Request, response: Response): Response`.
- **New routes** require: adding a path to the union type in `router.types.ts`, adding the route entry in `router.ts`, and creating the handler function.
- **Global types** (`Request`, `Response`, `Config`, `RouteFunction`, etc.) are declared in `src/global.types.ts` and available project-wide without imports.
