# React Integration

## Overview

All UI rendering is done by React components. The server generates HTML pages that load React from CDN and mount components with serialized props.

## Key Files

| File | Purpose |
|------|---------|
| `src/react.ts` | `getReactPageTemplate()`, `renderReactComponent()` |
| `src/react-build.ts` | Asset paths (bundle URL, CSS URL) |
| `src/react-bundle-content.ts` | Embedded React bundle (auto-generated) |
| `react-app/src/main.tsx` | Entry point, `window.__REACT_RENDER__` |
| `react-app/src/registry.ts` | Component name → React component map |

## How It Works

### Server-side (TSTL handler)

```typescript
import { getReactPageTemplate } from "../../../react";

export function renderAdminProducts(request: Request, response: Response): Response {
    const products = findAllProducts();

    response.content = getReactPageTemplate('Produkty', "AdminProductList", {
        products: products.map(p => ({
            id: String(p.id),
            name: p.name,
            price: String(p.price),
            status: p.status,
        })),
        statusFilter: '',
    });
    return response;
}
```

### Generated HTML

`getReactPageTemplate()` produces:

```html
<!DOCTYPE html>
<html lang="cs" data-bs-theme="dark">
<head>
    <title>Produkty</title>
    <link href="bootstrap.css" rel="stylesheet">
    <link href="/assets/react-bundle.css" rel="stylesheet">
</head>
<body>
    <div id="react-root"></div>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="/assets/react-bundle.js"></script>
    <script>window.__REACT_RENDER__("AdminProductList", {...props}, "react-root");</script>
</body>
</html>
```

### Client-side bootstrap

`react-app/src/main.tsx`:

```typescript
window.__REACT_RENDER__ = (name, props, containerId) => {
    const Component = registry[name];
    const container = document.getElementById(containerId);
    createRoot(container).render(
        <ThemeProvider>
            <Component {...props} />
        </ThemeProvider>
    );
};
```

## Component Registry

`react-app/src/registry.ts` maps 26 component names to React components:

**Admin (13):** AdminDashboard, AdminAnalytics, AdminProductList, AdminProductForm, AdminCategoryList, AdminCategoryForm, AdminOrderList, AdminOrderDetail, AdminOrderForm, AdminBlogList, AdminBlogForm, AdminMedia, AdminCustomerList

**Public (13):** Landing, Login, Register, Eshop, Product, Category, Cart, CheckoutShipping, CheckoutPayment, CheckoutReview, CheckoutConfirmation, BlogList, Article

## Adding a New React Component

1. Create page in `react-app/src/pages/admin/NewPage.tsx` (or `public/`)
2. Add to registry: `react-app/src/registry.ts`
3. Add translations: `react-app/src/i18n/cs/newmodule.ts`
4. Use in handler: `getReactPageTemplate('Title', "NewPage", { ...props })`
5. Rebuild: `cd react-app && npm run build` → embed → `npx tstl`

## i18n System

Custom zero-dependency i18n. Czech translations only.

### Setup (`react-app/src/i18n/index.ts`)

```typescript
import * as cs from './cs';
type Namespace = keyof typeof cs;
export function useT<N extends Namespace>(namespace: N) { return cs[namespace]; }
export function getT<N extends Namespace>(namespace: N) { return cs[namespace]; }
```

### Usage in components

```tsx
import { useT } from '../../i18n';

export default function ProductListPage({ products }: Props) {
    const t = useT('catalog');
    return (
        <h1>{t.headings.products}</h1>
        <AdminDataList
            columns={[{ key: 'name', label: t.columns.name }]}
            ...
        />
    );
}
```

### Namespaces

Located in `react-app/src/i18n/cs/`:

| File | Namespace | Content |
|------|-----------|---------|
| `common.ts` | common | Buttons, pagination, generic labels |
| `shared.ts` | shared | Status labels (imports from @shared) |
| `auth.ts` | auth | Login, register forms |
| `catalog.ts` | catalog | Products, categories |
| `orders.ts` | orders | Order management |
| `blog.ts` | blog | Blog posts |
| `media.ts` | media | File management |
| `dashboard.ts` | dashboard | Dashboard stats |
| `shop.ts` | shop | Public storefront |
| `cart.ts` | cart | Cart, checkout |

## Vite Build Configuration

`react-app/vite.config.ts`:

- **Format**: IIFE (not ESM) — loaded via `<script>` tag
- **External**: `react`, `react-dom` — loaded from CDN at runtime
- **Alias**: `@shared` → `../src/shared-keys.ts` (shared constants)
- **CSS**: Single file output (`cssCodeSplit: false`)

## Theme Support

`ThemeContext.tsx` provides dark/light theme toggle. The server includes theme detection scripts in the HTML `<head>` to prevent flash of wrong theme.
