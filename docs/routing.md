# Routing systém

TypeForge používá typově bezpečný routovací systém s compile-time validací cest.

## Základní koncepty

### Definice rout

Routy jsou definovány ve dvou souborech:

1. **`router.types.ts`** — Definice union typů cest
2. **`router.ts`** — Mapování cest na handlery z doménových modulů

### Union typy pro cesty

```typescript
// src/modules/router.types.ts

export type WebRouterPaths =
    | "/"
    | "/login"
    | "/register"
    | "/logout"
    | "/article"
    | "/blog"
    | "/eshop"
    | "/product"
    | "/category"
    | "/cart"
    | "/checkout"
    | "/checkout/payment"
    | "/checkout/review"
    | "/checkout/confirmation"
    | "/admin"
    | "/admin/analytics"
    | "/admin/orders"
    | "/admin/orders/detail"
    | "/admin/orders/create"
    | "/admin/orders/edit"
    | "/admin/products"
    | "/admin/products/create"
    | "/admin/products/edit"
    | "/admin/products/delete"
    | "/admin/categories"
    | "/admin/categories/create"
    // ... a další
    ;

export type ApiRouterPaths = "";
```

### Kombinované typy s prefixy

```typescript
// src/modules/types.ts

type WithPrefix<T extends string, P extends string> = `${P}${T}`;

export type RouterPaths = WithPrefix<ApiRouterPaths, "/api"> | WebRouterPaths;
```

## Router implementace

### Struktura routeru

```typescript
// src/modules/router.ts
import { RouterPaths } from "./types";
import {
    renderLogin, renderRegister, handleLogout
} from "./app/auth";
import {
    renderAdminDashboard, renderAdminAnalytics
} from "./app/dashboard";
import {
    renderAdminProducts, renderAdminProductCreate, renderAdminProductEdit, renderAdminProductDelete,
    renderAdminCategories, renderAdminCategoryCreate, renderAdminCategoryEdit, renderAdminCategoryDelete
} from "./app/catalog";
// ... importy z dalších modulů

interface Route {
    path: RouterPaths;
    route: RouteFunction;
    type: "action" | "render";
}

export function getRouter(): Route[] {
    return [
        // Veřejné stránky
        { path: "/", route: renderIndex, type: "render" },
        { path: "/login", route: renderLogin, type: "render" },
        { path: "/register", route: renderRegister, type: "render" },
        { path: "/logout", route: handleLogout, type: "action" },

        // E-shop
        { path: "/eshop", route: renderShop, type: "render" },
        { path: "/product", route: renderProduct, type: "render" },
        { path: "/category", route: renderCategory, type: "render" },
        { path: "/cart", route: renderCart, type: "render" },

        // Admin — Dashboard
        { path: "/admin", route: renderAdminDashboard, type: "render" },
        { path: "/admin/analytics", route: renderAdminAnalytics, type: "render" },

        // Admin — Produkty (CRUD)
        { path: "/admin/products", route: renderAdminProducts, type: "render" },
        { path: "/admin/products/create", route: renderAdminProductCreate, type: "render" },
        { path: "/admin/products/edit", route: renderAdminProductEdit, type: "render" },
        { path: "/admin/products/delete", route: renderAdminProductDelete, type: "action" },

        // Admin — další moduly...
    ];
}
```

### Typy rout

| Typ | Účel | Příklad |
|-----|------|---------|
| `render` | Vykreslení HTML stránky | `/`, `/login`, `/admin/products` |
| `action` | POST akce, redirect | `/logout`, `/admin/products/delete` |

## Přidání nové routy

### Krok 1: Definice typu cesty

```typescript
// src/modules/router.types.ts
export type WebRouterPaths =
    | "/"
    | "/login"
    | "/nova-stranka"  // ← Nová routa
    ;
```

### Krok 2: Vytvoření handleru v modulu

```typescript
// src/modules/app/[module]/[module].handlers.ts
export function renderNovaStranka(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const content = "...";
    response.content = getHtmlTemplate("Nová stránka", AdminLayout({
        children: content, request, activePath: '/nova-stranka'
    }));
    return response;
}
```

### Krok 3: Registrace routy

```typescript
// src/modules/router.ts
import { renderNovaStranka } from "./app/[module]";

export function getRouter(): Route[] {
    return [
        // ...
        { path: "/nova-stranka", route: renderNovaStranka, type: "render" },
    ];
}
```

## Práce s query parametry

### Parsování query stringu

```typescript
export function renderProduct(request: Request, response: Response): Response {
    // URL: /product?id=123
    const params = parseUrlQuery(request.url);
    const productId = params["id"];

    if (!productId) {
        response.status = 404;
        return renderNotFound(request, response);
    }

    const product = findProductById(Number(productId));
    // ...
    return response;
}
```

### Filtrování v seznamech

```typescript
export function renderAdminProducts(request: Request, response: Response): Response {
    const params = parseUrlQuery(request.url);
    const statusFilter = params["status"] ?? "";

    const products = findAllProducts();

    // Přidání selected stavu k filtrům
    const statusFilters = PRODUCT_STATUS_FILTER_OPTIONS.map(o => ({
        ...o, selected: o.value === statusFilter,
    }));

    // Filtrování
    const filtered = statusFilter
        ? products.filter(p => p.status === statusFilter)
        : products;

    // AdminDataList s filtry
    const content = AdminDataList({
        filters: statusFilters,
        rows: filtered.map(...),
        // ...
    });

    return response;
}
```

## Link helper s CSRF tokenem

```typescript
// src/utils.ts
export function link(
    path: RouterPaths,
    queryParams: Record<string, string>,
    request: Request,
    type: "action" | "render" = "render"
): string;
```

Při `type: "action"` automaticky přidá CSRF token z session:

```typescript
// V šabloně
const deleteUrl = link("/admin/products/delete", { id: String(product.id) }, request, "action");
// Výsledek: "/admin/products/delete?id=123&token=abc..."
```

## Best practices

1. **Používejte union typy** — Compile-time kontrola cest
2. **Handlery v modulech** — Každý handler ve svém `.handlers.ts`
3. **Pojmenování handlerů** — `render[Module][Action]` pro GET, `handle[Module][Action]` pro POST
4. **CSRF tokeny** — Pro všechny destruktivní operace (delete, logout)
5. **Admin autorizace** — `requireAdmin()` na začátku každého admin handleru
6. **Redirect po POST** — Pattern Post/Redirect/Get pro formuláře
