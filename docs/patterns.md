# Návrhové vzory a Best Practices

Tato sekce popisuje doporučené návrhové vzory pro vývoj s TypeForge frameworkem a jeho modulární architekturu.

## Modulární architektura

### Soubory doménového modulu

Každý modul v `src/modules/app/[module]/` má tyto soubory:

| Soubor | Odpovědnost |
|--------|------------|
| `index.ts` | Barrel export — `export * from './[module].handlers'` |
| `.handlers.ts` | HTTP handlery — zpracování requestů, volání repository, renderování |
| `.repository.ts` | SQL dotazy — všechna volání `sqlQuery()` |
| `.templates.ts` | HTML šablony — `AdminForm` a `AdminDataList` konfigurace |
| `.const.ts` | Konstanty — status labels, filter options, default values |
| `.types.ts` | TypeScript typy — domain-specific interfaces |
| `.validation.ts` | Validace — třídy s dekorátory (`@Required`, `@MinLength`) |
| `.utils.ts` | Utility — domain-specific helper funkce |

### Import pořadí v handlerech

```typescript
// 1. Framework utilities
import { getHtmlTemplate } from "../../../template";
import { AdminLayout, AdminDataList, Badge } from "../../../components";
import { getPayloudData } from "../../../utils";
import { transformValidate, ValidationError } from "../../../validator";

// 2. Sdílené typy a funkce
import { DbProduct, requireAdmin, formatPrice } from "../shared";

// 3. Lokální modul soubory
import { ProductForm } from "./catalog.validation";
import { getProductFormContent } from "./catalog.templates";
import { PRODUCT_STATUS_FILTER_OPTIONS } from "./catalog.const";
import { findAllProducts, insertProduct } from "./catalog.repository";
```

## Handler Pattern

### Seznam s AdminDataList

```typescript
// catalog.handlers.ts
export function renderAdminProducts(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery(request.url);
    const statusFilter = params["status"] ?? "";
    const products = findAllProductsWithCategory();

    const statusFilters = PRODUCT_STATUS_FILTER_OPTIONS.map(o => ({
        ...o, selected: o.value === statusFilter,
    }));

    const filtered = statusFilter
        ? products.filter(p => p.status === statusFilter)
        : products;

    const content = AdminDataList({
        columns: [
            { key: 'name', label: 'Název', width: '30%' },
            { key: 'category', label: 'Kategorie' },
            { key: 'price', label: 'Cena', align: 'right',
              render: (v) => formatPrice(Number(v)) },
            { key: 'status', label: 'Stav',
              render: (v) => Badge({
                  children: getProductStatusLabel(v),
                  variant: getProductStatusVariant(v)
              })
            },
        ],
        rows: filtered.map(p => ({
            id: String(p.id),
            name: p.name,
            category: p.category_name ?? '-',
            price: String(p.price),
            status: p.status,
        })),
        actions: [
            { icon: 'edit', href: (row) => `/admin/products/edit?id=${row.id}`, title: 'Upravit' },
            { icon: 'trash-2', href: (row) => link("/admin/products/delete", { id: row.id }, request, "action"),
              title: 'Smazat', variant: 'danger', confirm: 'Opravdu smazat?' },
        ],
        filters: statusFilters,
        addButton: { label: 'Nový produkt', href: '/admin/products/create' },
        emptyMessage: 'Žádné produkty',
    });

    response.content = getHtmlTemplate("Produkty", AdminLayout({
        children: content, request, activePath: '/admin/products'
    }));
    return response;
}
```

### Formulář s AdminForm (create)

```typescript
export function renderAdminProductCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const categories = findActiveCategories();

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        try {
            const data = transformValidate(ProductForm, raw);
            const slug = (data.slug !== '' && data.slug !== undefined)
                ? data.slug : generateSlug(data.name);
            insertProduct(data.name, slug, Number(data.price), /* ... */);
            response.status = 302;
            response.headers["Location"] = "/admin/products";
            return response;
        } catch (error) {
            if (error instanceof ValidationError) {
                const content = getProductFormContent(
                    request, categories, raw, (error as ValidationError).message
                );
                response.content = getHtmlTemplate("Nový produkt", AdminLayout({
                    children: content, request
                }));
                return response;
            }
        }
    }

    const content = getProductFormContent(request, categories);
    response.content = getHtmlTemplate("Nový produkt", AdminLayout({
        children: content, request, activePath: '/admin/products'
    }));
    return response;
}
```

### Formulář s AdminForm (edit)

```typescript
export function renderAdminProductEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery(request.url);
    const id = Number(params["id"]);
    const product = findProductById(id);
    if (!product) { response.status = 404; return response; }

    const categories = findActiveCategories();

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        try {
            const data = transformValidate(ProductForm, raw);
            updateProduct(id, data.name, /* ... */);
            response.status = 302;
            response.headers["Location"] = "/admin/products";
            return response;
        } catch (error) {
            if (error instanceof ValidationError) {
                const content = getProductFormContent(
                    request, categories, raw, (error as ValidationError).message, true
                );
                response.content = getHtmlTemplate("Upravit produkt", AdminLayout({
                    children: content, request
                }));
                return response;
            }
        }
    }

    // Převod DB záznamu na Record<string, string> pro formulář
    const data: Record<string, string> = {
        name: product.name,
        slug: product.slug,
        price: String(product.price),
        status: product.status,
        // ...
    };

    const content = getProductFormContent(request, categories, data, undefined, true);
    response.content = getHtmlTemplate("Upravit produkt", AdminLayout({
        children: content, request, activePath: '/admin/products'
    }));
    return response;
}
```

### Delete handler

```typescript
export function renderAdminProductDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery(request.url);
    if (!checkCsrfToken(params["token"] ?? "", request)) {
        response.status = 403;
        return response;
    }

    const id = Number(params["id"]);
    deleteProduct(id);

    response.status = 302;
    response.headers["Location"] = "/admin/products";
    return response;
}
```

## Repository Pattern

Všechny SQL dotazy patří do `.repository.ts`:

```typescript
// catalog.repository.ts

export function findAllProductsWithCategory(): DbProductWithCategory[] {
    return sqlQuery<DbProductWithCategory>(
        `SELECT p.*, p.price::float as price, p.old_price::float as old_price,
                p.created_at::text as created_at, p.updated_at::text as updated_at,
                c.name as category_name, c.slug as category_slug
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         ORDER BY p.created_at DESC`,
        []
    );
}

export function findProductById(id: number): DbProduct | null {
    const rows = sqlQuery<DbProduct>(
        `SELECT *, price::float as price, old_price::float as old_price,
                created_at::text as created_at, updated_at::text as updated_at
         FROM products WHERE id = $1`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function insertProduct(name: string, slug: string, price: number, categoryId: number | null): void {
    sqlQuery(
        `INSERT INTO products (name, slug, price, category_id)
         VALUES ($1, $2, $3, NULLIF($4, 0))`,
        [name, slug, price, categoryId !== null ? categoryId : 0]
    );
}

export function updateProduct(id: number, name: string, slug: string, price: number): void {
    sqlQuery(
        `UPDATE products SET name = $1, slug = $2, price = $3, updated_at = NOW()
         WHERE id = $4`,
        [name, slug, price, id]
    );
}

export function deleteProduct(id: number): void {
    sqlQuery("DELETE FROM products WHERE id = $1", [id]);
}
```

## Template Pattern

```typescript
// catalog.templates.ts
import { AdminForm, FormSection } from "../../../components";
import { PRODUCT_STATUS_FILTER_OPTIONS, DEFAULT_PRODUCT_ICON } from "./catalog.const";

export function getProductFormContent(
    request: Request,
    categories: DbCategory[],
    data?: Record<string, string>,
    error?: string,
    isEdit: boolean = false
): string {
    const categoryOptions = [
        { value: '', label: 'Bez kategorie' },
        ...categories.map(c => ({ value: String(c.id), label: c.name })),
    ];

    const sections: FormSection[] = [
        {
            title: "Základní informace",
            position: 'main',
            fields: [
                { name: 'name', label: 'Název', required: true, colSpan: 8 },
                { name: 'slug', label: 'Slug', colSpan: 4 },
                { name: 'description', label: 'Popis', type: 'textarea', rows: 4 },
            ],
        },
        {
            title: "Cena",
            position: 'main',
            fields: [
                { name: 'price', label: 'Cena', type: 'number', step: '0.01', required: true, colSpan: 6 },
                { name: 'old_price', label: 'Původní cena', type: 'number', step: '0.01', colSpan: 6 },
            ],
        },
        {
            title: "Kategorie a stav",
            position: 'sidebar',
            fields: [
                { name: 'category_id', label: 'Kategorie', type: 'select', options: categoryOptions },
                { name: 'status', label: 'Stav', type: 'select', options: PRODUCT_STATUS_FILTER_OPTIONS },
                { name: 'icon', label: 'Ikona', placeholder: DEFAULT_PRODUCT_ICON },
            ],
        },
    ];

    return AdminForm({
        sections,
        values: data,
        error,
        submitLabel: isEdit ? 'Uložit změny' : 'Vytvořit produkt',
        backUrl: '/admin/products',
    });
}
```

## Constants Pattern

```typescript
// catalog.const.ts

export const PRODUCT_STATUS_FILTER_OPTIONS = [
    { value: 'active', label: 'Aktivní' },
    { value: 'inactive', label: 'Neaktivní' },
    { value: 'soldout', label: 'Vyprodáno' },
];

export const CATEGORY_STATUS_FILTER_OPTIONS = [
    { value: 'active', label: 'Aktivní' },
    { value: 'inactive', label: 'Neaktivní' },
];

export const DEFAULT_PRODUCT_ICON = 'box';
export const DEFAULT_CATEGORY_ICON = 'tag';
```

## Validation Pattern

```typescript
// catalog.validation.ts
import { Transform, Required, MinLength, MaxLength } from "../../../validator";

export class ProductForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    @MaxLength(300)
    name: string = '';

    @Transform((v: string) => v?.trim())
    slug: string = '';

    price: string = '0';
    old_price: string = '';
    stock: string = '0';
    status: string = 'active';
    icon: string = '';
    category_id: string = '';
}
```

## Session Management

JWT-based sessions — bez server-side storage:

```typescript
import { getSession, setSession, clearSession, withSessionRefresh } from "./utils";

// Login — vytvoří JWT token v cookie
response = setSession<UserSession>({
    user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        isAdmin: user.is_admin,
        token: uniqueKey()  // CSRF token
    }
}, response);

// Čtení session
const session = getSession<UserSession>(request);

// Protected route s auto-refresh
return withSessionRefresh<UserSession>(request, response, (req, res) => {
    const session = getSession<UserSession>(req);
    if (!session?.user) {
        res.status = 302;
        res.headers["Location"] = "/login";
        return res;
    }
    // Render page...
    return res;
});

// Logout
response = clearSession(response);
```

## Cache-Aside Pattern

```typescript
function getProducts(): DbProduct[] {
    const cached = appCacheGet("products");
    if (cached) return jsonDecode(cached);

    const products = findAllProducts();
    appCacheSet("products", jsonEncode(products), 60000);
    return products;
}
```

## Kompletní CRUD modul

Krok za krokem pro nový modul `invoices`:

### 1. Vytvoření souborů

```
src/modules/app/invoices/
├── index.ts
├── invoices.handlers.ts
├── invoices.repository.ts
├── invoices.templates.ts
├── invoices.const.ts
└── invoices.validation.ts
```

### 2. index.ts

```typescript
export * from './invoices.handlers';
```

### 3. invoices.const.ts

```typescript
export const INVOICE_STATUS_FILTER_OPTIONS = [
    { value: 'draft', label: 'Návrh' },
    { value: 'sent', label: 'Odesláno' },
    { value: 'paid', label: 'Zaplaceno' },
];
```

### 4. invoices.validation.ts

```typescript
import { Transform, Required, MinLength } from "../../../validator";

export class InvoiceForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    number: string = '';

    @Required()
    amount: string = '0';

    status: string = 'draft';
}
```

### 5. invoices.repository.ts

```typescript
export function findAllInvoices(): DbInvoice[] {
    return sqlQuery<DbInvoice>(
        `SELECT *, amount::float as amount, created_at::text as created_at
         FROM invoices ORDER BY id DESC`,
        []
    );
}

export function findInvoiceById(id: number): DbInvoice | null {
    const rows = sqlQuery<DbInvoice>(
        `SELECT *, amount::float as amount, created_at::text as created_at
         FROM invoices WHERE id = $1`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function insertInvoice(number: string, amount: number, status: string): void {
    sqlQuery("INSERT INTO invoices (number, amount, status) VALUES ($1, $2, $3)",
        [number, amount, status]);
}

export function deleteInvoice(id: number): void {
    sqlQuery("DELETE FROM invoices WHERE id = $1", [id]);
}
```

### 6. invoices.templates.ts

```typescript
import { AdminForm, FormSection } from "../../../components";
import { INVOICE_STATUS_FILTER_OPTIONS } from "./invoices.const";

export function getInvoiceFormContent(
    request: Request,
    data?: Record<string, string>,
    error?: string,
    isEdit: boolean = false
): string {
    const sections: FormSection[] = [
        {
            title: "Faktura",
            position: 'main',
            fields: [
                { name: 'number', label: 'Číslo faktury', required: true },
                { name: 'amount', label: 'Částka', type: 'number', step: '0.01', required: true },
            ],
        },
        {
            title: "Stav",
            position: 'sidebar',
            fields: [
                { name: 'status', label: 'Stav', type: 'select', options: INVOICE_STATUS_FILTER_OPTIONS },
            ],
        },
    ];

    return AdminForm({
        sections, values: data, error,
        submitLabel: isEdit ? 'Uložit změny' : 'Vytvořit fakturu',
        backUrl: '/admin/invoices',
    });
}
```

### 7. invoices.handlers.ts

```typescript
import { getHtmlTemplate } from "../../../template";
import { AdminLayout, AdminDataList, Badge } from "../../../components";
import { getPayloudData } from "../../../utils";
import { transformValidate, ValidationError } from "../../../validator";
import { requireAdmin } from "../shared";
import { InvoiceForm } from "./invoices.validation";
import { getInvoiceFormContent } from "./invoices.templates";
import { INVOICE_STATUS_FILTER_OPTIONS } from "./invoices.const";
import { findAllInvoices, insertInvoice } from "./invoices.repository";

export function renderAdminInvoices(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;
    // ... AdminDataList rendering
    return response;
}

export function renderAdminInvoiceCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        try {
            const data = transformValidate(InvoiceForm, raw);
            insertInvoice(data.number, Number(data.amount), data.status);
            response.status = 302;
            response.headers["Location"] = "/admin/invoices";
            return response;
        } catch (error) {
            if (error instanceof ValidationError) {
                const content = getInvoiceFormContent(request, raw, (error as ValidationError).message);
                response.content = getHtmlTemplate("Nová faktura", AdminLayout({ children: content, request }));
                return response;
            }
        }
    }

    const content = getInvoiceFormContent(request);
    response.content = getHtmlTemplate("Nová faktura", AdminLayout({
        children: content, request, activePath: '/admin/invoices'
    }));
    return response;
}
```

### 8. Registrace

1. Přidat cestu do `router.types.ts`
2. Registrovat route v `router.ts`
3. Export z `src/modules/app/index.ts`: `export * from './invoices';`
4. Vytvořit migraci v `src/migrations/`

## TSTL / Lua Gotchas

Kritické rozdíly mezi TypeScript a Lua runtime. **Každý vývojář musí dodržovat tato pravidla.**

### 1. Prázdný string je v Lua truthy

```typescript
// ŠPATNĚ — nikdy nezavolá generateSlug() když slug je ""
const slug = data.slug || generateSlug(data.name);

// SPRÁVNĚ — explicitní kontrola
const slug = (data.slug !== '' && data.slug !== undefined) ? data.slug : generateSlug(data.name);
```

### 2. DECIMAL/NUMERIC sloupce vrací null

```typescript
// ŠPATNĚ — price bude null
sqlQuery("SELECT * FROM products", []);

// SPRÁVNĚ — cast na ::float
sqlQuery("SELECT *, price::float as price FROM products", []);
```

### 3. TIMESTAMP sloupce vrací non-string

```typescript
// ŠPATNĚ — created_at nebude string
sqlQuery("SELECT * FROM orders", []);

// SPRÁVNĚ — cast na ::text
sqlQuery("SELECT *, created_at::text as created_at FROM orders", []);
```

### 4. Null v polích zkracuje parametry

```typescript
// ŠPATNĚ — pokud categoryId je null, pole se ořízne
sqlQuery("INSERT INTO products (name, category_id, price) VALUES ($1, $2, $3)",
    [name, categoryId, price]);

// SPRÁVNĚ — NULLIF pattern
sqlQuery("INSERT INTO products (name, category_id, price) VALUES ($1, NULLIF($2, 0), $3)",
    [name, categoryId !== null ? categoryId : 0, price]);
```

### 5. charAt() pracuje s byty, ne UTF-8

```typescript
// ŠPATNĚ — rozbije multi-byte znaky (á, č, ř, ž)
for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
}

// SPRÁVNĚ — replaceAll pro substituce
s = replaceAll(s, 'á', 'a');
s = replaceAll(s, 'č', 'c');
```

### 6. CSS konzistence

Vždy `btn-outline-tf` a `btn-primary-tf`. Nikdy Bootstrap varianty.

### SQL SELECT šablona

```typescript
sqlQuery<T>(
    `SELECT *,
        price::float as price,           -- DECIMAL sloupce
        old_price::float as old_price,
        created_at::text as created_at,  -- TIMESTAMP sloupce
        updated_at::text as updated_at
     FROM table_name WHERE ...`,
    [params]
);
```

## Checklist pro nové funkce

- [ ] Vytvořeny soubory modulu (handlers, repository, templates, const, validation)
- [ ] Přidány routy do `router.types.ts`
- [ ] Registrovány routy v `router.ts`
- [ ] Export z `src/modules/app/index.ts`
- [ ] Implementována validace (`@Required`, `@MinLength`, etc.)
- [ ] SQL dotazy v `.repository.ts` s `::float` a `::text` casty
- [ ] Konstanty v `.const.ts`
- [ ] Ošetřeny chybové stavy (`ValidationError`)
- [ ] Escapovány uživatelské vstupy (`escapeHtml`)
- [ ] CSRF tokeny pro delete/action operace
- [ ] `requireAdmin()` na admin handlerech
- [ ] Otestováno v prohlížeči po deployi
