# Architecture

## Hybrid React Model

TypeForge uses a hybrid server-rendered React architecture:

1. **Server (TSTL/Lua)** handles HTTP requests, routing, authentication, database queries, validation
2. **React (client-side)** handles all UI rendering

The server does **not** return HTML templates — it serializes data as JSON props and generates a minimal HTML page that loads React from CDN + an embedded app bundle.

### Request Flow

```
Browser → HTTP Request → Lua Runtime → Route Handler
  → Handler fetches data from DB (repository functions)
  → Handler calls getReactPageTemplate(title, componentName, props)
  → Returns full HTML page with:
      - React 18 from CDN (unpkg)
      - App CSS bundle
      - App JS bundle (embedded IIFE)
      - <script>window.__REACT_RENDER__(componentName, props, containerId)</script>
  → Browser loads React, mounts component with props
  → Component renders UI using translations from i18n
```

### Key Characteristics

- **No client-side routing** — every page navigation is a full HTTP request
- **No client-side data fetching** — all data arrives as serialized props
- **Forms submit via HTTP POST** — standard form submission, no SPA behavior
- **React is for rendering only** — business logic stays on the server

## Compilation Pipeline

```
src/                    → TSTL compiler → dist/bundle.lua → Lua JIT runtime (Cloud Run)
react-app/src/          → Vite build    → dist/index-[hash].js
dist/index-[hash].js    → embed script  → src/react-bundle-content.ts → included in TSTL build
```

### Build Steps

1. `cd react-app && npm run build` — Vite builds React app as IIFE with external React/ReactDOM
2. Embed script reads `react-app/dist/` output and writes `src/react-bundle-content.ts`
3. `npm run build` (or `npx tstl`) — compiles all TypeScript (including embedded bundle) to `dist/bundle.lua`
4. Deploy `dist/bundle.lua` to Cloud Run

## Project Structure

### Server-side (`src/`)

```
src/
├── main.ts                    # Entry point — config(), init(), main()
├── global.d.ts                # Runtime API declarations (@noSelf)
├── global.types.ts            # Global types (Request, Response, Config)
├── config.ts                  # App configuration
├── utils.ts                   # Sessions, CSRF, helpers
├── validator.ts               # Decorator-based validation
├── template.ts                # HTML template + theme detection
├── react.ts                   # getReactPageTemplate(), renderReactComponent()
├── react-build.ts             # Asset paths config
├── react-bundle-content.ts    # Auto-generated embedded React bundle
├── shared-keys.ts             # Shared constants (TSTL + React)
├── migration-runner.ts        # Database migration runner
├── migrations/                # SQL migrations (001–019)
└── modules/
    ├── router.ts              # Route definitions
    ├── router.types.ts        # Route path union types
    ├── types.ts               # RouterPaths type
    └── app/                   # Domain modules
        ├── shared.ts          # DB types, auth helpers
        ├── shared.const.ts    # Re-exports from shared-keys
        ├── assets/            # Static asset serving
        ├── auth/              # Login, register, logout
        ├── dashboard/         # Admin dashboard
        ├── catalog/           # Products & categories
        ├── orders/            # Order management
        ├── blog/              # Blog posts
        ├── media/             # File management
        ├── shop/              # Public storefront
        └── cart/              # Shopping cart & checkout
```

### Client-side (`react-app/src/`)

```
react-app/src/
├── main.tsx               # Entry point (window.__REACT_RENDER__)
├── registry.ts            # Component name → React component map (26 components)
├── types.ts               # TypeScript types
├── utils.ts               # Formatters, status helpers
├── context/ThemeContext.tsx
├── i18n/                  # Czech translations (useT hook)
├── components/            # Reusable UI components
│   ├── ui/                # Button, Badge, Card, Icon, Avatar, ThemeToggle
│   ├── form/              # Input, Textarea, Select, FormGroup, SearchInput, Toggle
│   ├── data/              # AdminDataList, AdminForm, DataTable, FilterBar, Pagination
│   ├── layout/            # AdminLayout, AdminSidebar, Navbar, Footer
│   ├── shop/              # ProductCard, CategoryCard
│   └── blocks/            # Hero
├── pages/admin/           # 13 admin page components
├── pages/public/          # 13 public page components
└── styles/admin.css       # App styles
```

## Domain Module Convention

Each module in `src/modules/app/[module]/`:

| File | Purpose |
|------|---------|
| `index.ts` | Barrel export (handlers only) |
| `[module].handlers.ts` | HTTP request handlers |
| `[module].repository.ts` | Database queries |
| `[module].validation.ts` | Form validation classes |
| `[module].types.ts` | Domain-specific types |
| `[module].const.ts` | Constants (re-exports from shared-keys) |
| `[module].utils.ts` | Utility functions |

## Shared Constants Bridge (`src/shared-keys.ts`)

Single source of truth for status types, labels, badge variants, and filter options. Imported by both TSTL (`import from "../../shared-keys"`) and React (`import from '@shared'` via Vite alias).

```typescript
export type ProductStatus = 'active' | 'inactive' | 'soldout';
export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = { ... };
export const PRODUCT_STATUS_VARIANTS: Record<ProductStatus, 'success' | 'warning' | 'danger'> = { ... };
export const PRODUCT_STATUS_FILTER_OPTIONS: { value: ProductStatus; label: string }[] = [ ... ];
```
