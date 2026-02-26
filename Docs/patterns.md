# Design Patterns

## Handler Patterns

### List Page Handler

Fetches data, serializes as props, renders React page:

```typescript
export function renderAdminProducts(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const products = findAllProductsWithCategory();
    const categories = findActiveCategories();
    const statusFilter = parseUrlQuery(request.query)?.status ?? '';

    response.content = getReactPageTemplate('Produkty — Administrace', "AdminProductList", {
        products: products.map(p => ({
            id: String(p.id),
            name: p.name,
            price: String(p.price),
            status: p.status,
            category_name: p.category_name ?? '-',
        })),
        categories: categories.map(c => ({ value: String(c.id), label: c.name })),
        statusFilter,
    });
    return response;
}
```

### Create/Edit Handler (Form POST)

```typescript
export function renderAdminProductCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const categories = findActiveCategories();

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        try {
            const data = transformValidate(ProductForm, raw);
            insertProduct(data.name, data.slug, Number(data.price));
            response.status = 302;
            response.headers["Location"] = "/admin/products";
            return response;
        } catch (error) {
            if (error instanceof ValidationError) {
                response.content = getReactPageTemplate('Nový produkt', "AdminProductForm", {
                    categories: categories.map(c => ({ value: String(c.id), label: c.name })),
                    values: raw,
                    error: (error as ValidationError).message,
                    isEdit: false,
                });
                return response;
            }
        }
    }

    response.content = getReactPageTemplate('Nový produkt', "AdminProductForm", {
        categories: categories.map(c => ({ value: String(c.id), label: c.name })),
        values: { status: 'active', icon: DEFAULT_PRODUCT_ICON },
        isEdit: false,
    });
    return response;
}
```

### Delete Handler

```typescript
export function renderAdminProductDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const id = Number(parseUrlQuery(request.url)?.id);
    if (id > 0) deleteProduct(id);

    response.status = 302;
    response.headers["Location"] = "/admin/products";
    return response;
}
```

## Repository Patterns

### Standard CRUD

```typescript
export function findAllProducts(): DbProduct[] {
    return sqlQuery<DbProduct>(
        `SELECT *, price::float as price, created_at::text as created_at
         FROM products ORDER BY id DESC`,
        []
    );
}

export function findProductById(id: number): DbProduct | null {
    const rows = sqlQuery<DbProduct>(
        `SELECT *, price::float as price, created_at::text as created_at
         FROM products WHERE id = $1`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function insertProduct(name: string, slug: string, price: number): void {
    sqlQuery("INSERT INTO products (name, slug, price) VALUES ($1, $2, $3)",
        [name, slug, price]);
}

export function updateProduct(id: number, name: string, slug: string, price: number): void {
    sqlQuery("UPDATE products SET name = $1, slug = $2, price = $3 WHERE id = $4",
        [name, slug, price, id]);
}

export function deleteProduct(id: number): void {
    sqlQuery("DELETE FROM products WHERE id = $1", [id]);
}
```

### With Optional Foreign Key (NULLIF pattern)

```typescript
export function insertProduct(name: string, categoryId: number | null, price: number): void {
    sqlQuery(
        "INSERT INTO products (name, category_id, price) VALUES ($1, NULLIF($2, 0), $3)",
        [name, categoryId !== null ? categoryId : 0, price]
    );
}
```

## React Component Patterns

### Page Component with i18n

```tsx
import { useT } from '../../i18n';
import { AdminLayout } from '../../components/layout';
import { AdminDataList } from '../../components/data';

interface Props {
    products: Array<{ id: string; name: string; price: string; status: string }>;
    statusFilter: string;
}

export default function ProductListPage({ products, statusFilter }: Props) {
    const t = useT('catalog');
    return (
        <AdminLayout activePath="/admin/products">
            <AdminDataList
                columns={[
                    { key: 'name', label: t.columns.name },
                    { key: 'price', label: t.columns.price },
                ]}
                rows={products}
                addButton={{ label: t.actions.addProduct, href: '/admin/products/create' }}
            />
        </AdminLayout>
    );
}
```

### Form Page Component

```tsx
import { useT } from '../../i18n';
import { AdminLayout } from '../../components/layout';
import { AdminForm } from '../../components/data';

interface Props {
    values?: Record<string, string>;
    error?: string;
    isEdit: boolean;
    categories: Array<{ value: string; label: string }>;
}

export default function ProductFormPage({ values, error, isEdit, categories }: Props) {
    const t = useT('catalog');
    const sections = [
        {
            title: t.sections.basicInfo,
            position: 'main' as const,
            fields: [
                { name: 'name', label: t.fields.name, required: true },
                { name: 'price', label: t.fields.price, type: 'number' as const, required: true },
            ],
        },
    ];
    return (
        <AdminLayout>
            <AdminForm
                sections={sections}
                values={values}
                error={error}
                submitLabel={isEdit ? t.actions.save : t.actions.create}
                backUrl="/admin/products"
            />
        </AdminLayout>
    );
}
```

## Cached Data Fetch

```typescript
function getProducts(): Product[] {
    const cached = appCacheGet("products");
    if (cached) return jsonDecode(cached);

    const products = findAllProducts();
    appCacheSet("products", jsonEncode(products), 60000); // 60s TTL
    return products;
}
```

## Session Patterns

### Login

```typescript
export function handleLogin(request: Request, response: Response): Response {
    if (request.method === "post") {
        const data = getPayloudData<LoginForm>(request);
        const user = authenticateUser(data.username, data.password);
        if (user) {
            response = setSession({ user: { id: user.id, token: uniqueKey() } }, response);
            response.status = 302;
            response.headers["Location"] = "/dashboard";
            return response;
        }
    }
    response.content = getReactPageTemplate('Přihlášení', "Login", {});
    return response;
}
```

### Logout

```typescript
export function handleLogout(request: Request, response: Response): Response {
    response = clearSession(response);
    response.status = 302;
    response.headers["Location"] = "/login";
    return response;
}
```

### Protected Route

```typescript
export function renderAdmin(request: Request, response: Response): Response {
    return withSessionRefresh<UserSession>(request, response, (req, res) => {
        const session = getSession<UserSession>(req);
        if (!session?.user?.isAdmin) {
            res.status = 302;
            res.headers["Location"] = "/login";
            return res;
        }
        // Render admin page...
        return res;
    });
}
```
