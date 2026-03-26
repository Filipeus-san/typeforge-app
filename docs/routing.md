# Routing

## Overview

Routes are defined in `src/modules/router.ts` and map URL paths to handler functions. Route paths are type-safe via union types.

## Route Definition

`src/modules/router.ts` returns an array of `{ path, route, type }` objects:

```typescript
import { renderAdminProducts, renderAdminProductCreate } from "./app";

export function getRoutes() {
    return [
        { path: "/admin/products", route: renderAdminProducts, type: "web" },
        { path: "/admin/products/create", route: renderAdminProductCreate, type: "web" },
        // ...
    ];
}
```

## Type Safety

Route paths are defined as union types in `src/modules/router.types.ts`:

```typescript
export type WebRouterPaths =
    | "/admin/products"
    | "/admin/products/create"
    | "/admin/products/edit/:id"
    // ...
```

The `RouterPaths` type in `src/modules/types.ts` combines web and API paths with prefix support.

## Adding a New Route

1. Add path to union type in `router.types.ts`
2. Create handler function in the appropriate module's `.handlers.ts`
3. Register route in `router.ts`

## Handler Signature

Every route handler receives `(request: Request, response: Response)` and returns `Response`:

```typescript
export function renderAdminProducts(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    // Fetch data, render React page
    response.content = getReactPageTemplate('Title', "ComponentName", { ...props });
    return response;
}
```

## Request/Response Model

The Lua hosting runtime calls three exported functions from `main.ts`:

- `config()` — returns app configuration
- `init()` — called once at startup (runs migrations)
- `main(request: Request): Response` — HTTP entry point

The `Request` and `Response` interfaces are defined in `src/global.types.ts`.
