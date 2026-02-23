# Project Instructions

This file ensures Claude Code (including the web version at claude.ai/code) loads project context automatically.

**IMPORTANT: Read and follow the main `CLAUDE.md` file in the project root (`../CLAUDE.md`) for all project conventions, architecture details, TSTL/Lua gotchas, and coding patterns.**

## Quick Reference

- **Project**: TypeForge — serverless web framework compiling TypeScript to Lua (TSTL)
- **Build**: `npm run build` (output: `dist/bundle.lua`)
- **Dev**: `npm run dev` (watch mode)
- **No tests/linter configured**

## Critical TSTL/Lua Rules

1. **Empty string is truthy in Lua** — never use `||` for string fallbacks, use explicit checks
2. **DECIMAL columns return null** — always cast `::float` in SQL SELECTs
3. **TIMESTAMP columns need cast** — always cast `::text` in SQL SELECTs
4. **Null in arrays truncates** — never pass null as SQL param, use NULLIF pattern
5. **charAt() breaks UTF-8** — use string-level operations for non-ASCII text
6. **Use `btn-outline-tf` / `btn-primary-tf`** — not Bootstrap variants
7. **`@noSelf` annotation required** on all exported functions called by Lua runtime

## Module Structure

Each domain module in `src/modules/app/[module]/` follows: `index.ts`, `[module].handlers.ts`, `[module].repository.ts`, `[module].templates.ts`, `[module].const.ts`, `[module].validation.ts`

## Key Files

- `src/main.ts` — Entry point (config, init, main)
- `src/global.d.ts` — Runtime API declarations
- `src/global.types.ts` — Global types (Request, Response, Config)
- `src/modules/router.ts` — Route definitions
- `src/modules/router.types.ts` — Route path union types
- `src/modules/app/shared.ts` — Shared types and helpers
- `src/components/` — UI component library
- `src/utils.ts` — Session management, CSRF, helpers
- `src/validator.ts` — Decorator-based validation

## Deploy

```bash
cp /home/vscode/Test/deploy-local.sh . && ./deploy-local.sh
```
