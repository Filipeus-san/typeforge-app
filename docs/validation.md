# Validační systém

TypeForge poskytuje decorator-based validační systém pro validaci a transformaci vstupních dat. Validační třídy jsou definovány v `.validation.ts` souborech jednotlivých modulů.

## Základní použití

### Import

```typescript
import {
    transformValidate,
    ValidationError,
    Required,
    MinLength,
    MaxLength,
    Range,
    Custom,
    Transform,
    Type
} from '../../../validator';
```

### Definice validační třídy

Validační třídy se umisťují do `[module].validation.ts`:

```typescript
// src/modules/app/auth/auth.validation.ts
export class LoginForm {
    @Transform((v: string) => v?.trim()?.toLowerCase())
    @Required()
    email: string = '';

    @Required()
    @MinLength(6)
    password: string = '';
}
```

### Validace dat v handleru

Validace probíhá v handler funkci (`[module].handlers.ts`) při zpracování POST requestu:

```typescript
// src/modules/app/catalog/catalog.handlers.ts
export function renderAdminProductCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        try {
            const data = transformValidate(ProductForm, raw);

            // Validace prošla — uložení do DB
            const slug = (data.slug !== '' && data.slug !== undefined)
                ? data.slug
                : generateSlug(data.name);
            insertProduct(data.name, slug, Number(data.price));

            // Redirect po úspěchu (Post/Redirect/Get)
            response.status = 302;
            response.headers["Location"] = "/admin/products";
            return response;
        } catch (error) {
            if (error instanceof ValidationError) {
                // Znovu zobrazit formulář s chybami
                const content = getProductFormContent(
                    request, categories, raw,
                    (error as ValidationError).message
                );
                response.content = getHtmlTemplate("Nový produkt",
                    AdminLayout({ children: content, request, activePath: '/admin/products' })
                );
                return response;
            }
        }
    }

    // GET — prázdný formulář
    const content = getProductFormContent(request, categories);
    response.content = getHtmlTemplate("Nový produkt",
        AdminLayout({ children: content, request, activePath: '/admin/products' })
    );
    return response;
}
```

## Dostupné dekorátory

### @Required()

Pole musí být vyplněno (ne null, undefined, prázdný string).

```typescript
class Form {
    @Required()
    name: string = '';
}
```

**Chybová zpráva:** `"This field is required"`

### @MinLength(n)

Minimální délka stringu.

```typescript
class Form {
    @MinLength(3)
    username: string = '';

    @MinLength(8)
    password: string = '';
}
```

**Chybová zpráva:** `"Must have at least {n} characters"`

### @MaxLength(n)

Maximální délka stringu.

```typescript
class Form {
    @MaxLength(100)
    title: string = '';

    @MaxLength(1000)
    description: string = '';
}
```

**Chybová zpráva:** `"Must have at most {n} characters"`

### @Range(min, max)

Číselná hodnota musí být v rozsahu.

```typescript
class Form {
    @Range(1, 100)
    quantity: number = 1;

    @Range(0, 5)
    rating: number = 0;
}
```

**Chybová zpráva:** `"Must be between {min} and {max}"`

### @Custom(fn)

Vlastní validační funkce. Vrací chybovou zprávu (string) nebo null pokud je validní.

```typescript
class RegisterForm {
    @Custom((value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return null;
    })
    email: string = '';
}
```

### @Transform(fn)

Transformace hodnoty **před** validací. Používá se pro trimování, normalizaci, parsování.

```typescript
class Form {
    // Trim whitespace
    @Transform((v: string) => v?.trim())
    @Required()
    name: string = '';

    // Normalize email
    @Transform((v: string) => v?.trim()?.toLowerCase())
    @Required()
    email: string = '';
}
```

### @Type(typeFn)

Validace vnořených objektů.

```typescript
class Address {
    @Required()
    street: string = '';

    @Required()
    city: string = '';
}

class OrderForm {
    @Type(() => Address)
    shippingAddress: Address = new Address();
}
```

## ValidationError

### Struktura

```typescript
class ValidationError extends Error {
    errors: Record<string, string[]>;  // Pole chyb pro každé pole
    values: Record<string, any>;       // Původní hodnoty
}
```

### Příklad errors objektu

```typescript
{
    "name": ["This field is required", "Must have at least 2 characters"],
    "email": ["Please enter a valid email address"],
    "password": ["Must have at least 6 characters"]
}
```

## Reálné validační třídy v projektu

### ProductForm (catalog.validation.ts)

```typescript
export class ProductForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    @MaxLength(300)
    name: string = '';

    @Transform((v: string) => v?.trim())
    slug: string = '';

    @Transform((v: string) => v?.trim())
    short_description: string = '';

    @Transform((v: string) => v?.trim())
    description: string = '';

    category_id: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    price: string = '0';

    @Transform((v: string) => v?.trim())
    old_price: string = '';

    @Transform((v: string) => v?.trim())
    icon: string = 'box';

    @Transform((v: string) => v?.trim())
    stock: string = '0';

    status: string = 'active';
}
```

### CustomerForm (customers.validation.ts)

```typescript
export class CustomerForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    @MaxLength(100)
    first_name: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    @MaxLength(100)
    last_name: string = '';

    @Transform((v: string) => v?.trim()?.toLowerCase())
    @Required()
    email: string = '';

    @Transform((v: string) => v?.trim())
    phone: string = '';

    @Transform((v: string) => v?.trim())
    company: string = '';

    @Transform((v: string) => v?.trim())
    shipping_address: string = '';

    @Transform((v: string) => v?.trim())
    billing_address: string = '';

    @Transform((v: string) => v?.trim())
    notes: string = '';

    status: string = 'active';
}
```

### BlogPostForm (blog.validation.ts)

```typescript
export class BlogPostForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(3)
    @MaxLength(500)
    title: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(3)
    @MaxLength(500)
    slug: string = '';

    @Transform((v: string) => v?.trim())
    excerpt: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    content: string = '';

    @Transform((v: string) => v?.trim())
    category: string = '';

    @Transform((v: string) => v?.trim())
    status: string = 'draft';

    @Transform((v: string) => v?.trim())
    read_time: string = '5';
}
```

## Kombinování validátorů

Validátory se vyhodnocují v pořadí, v jakém jsou definovány:

```typescript
class Form {
    @Transform((v: string) => v?.trim())  // 1. Transformace
    @Required()                            // 2. Validace - povinné
    @MinLength(3)                          // 3. Validace - min délka
    @MaxLength(50)                         // 4. Validace - max délka
    @Custom((v) => customCheck(v))        // 5. Vlastní validace
    field: string = '';
}
```

## Konvence a best practices

1. **Vždy trimujte stringy** — `@Transform((v: string) => v?.trim())` na všechna textová pole
2. **Normalizujte emaily** — `@Transform((v: string) => v?.trim()?.toLowerCase())`
3. **Výchozí hodnoty** — Nastavujte přes class property: `status: string = 'active'`
4. **Typ parametru** — Vždy typujte `v: string` v Transform a Custom funkcích
5. **Umístění** — Validační třídy patří do `[module].validation.ts`
6. **Pojmenování** — `[Entity]Form` (např. `ProductForm`, `CustomerForm`, `BlogPostForm`)
7. **Zachycení chyb** — V handleru vždy `catch` s `instanceof ValidationError`
8. **Zobrazení chyby** — Předejte `(error as ValidationError).message` do template funkce, AdminForm ji zobrazí jako alert
9. **Čísla jako stringy** — Formulářová data přicházejí jako stringy, parsujte až při ukládání: `Number(data.price)`
