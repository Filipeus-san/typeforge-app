# Komponentový systém

TypeForge používá funkcionální komponenty, které vracejí HTML stringy. Tento přístup umožňuje snadnou kompozici a typovou bezpečnost.

## Základní koncept

### Component type

```typescript
// src/components/types.ts

export type Component<P = {}> = (props: P) => string;

export interface BaseProps {
    class?: string;
    id?: string;
}
```

### Struktura komponenty

```typescript
export interface MyComponentProps extends BaseProps {
    title: string;
    children?: string;
}

export function MyComponent(props: MyComponentProps): string {
    const { title, children, class: className, id } = props;

    return `
        <div id="${id}" class="my-component ${className || ''}">
            <h2>${title}</h2>
            ${children || ''}
        </div>
    `;
}
```

## Helper funkce

### `cx` - Class names

Spojuje CSS třídy a filtruje falsy hodnoty:

```typescript
import { cx } from './helpers';

// Základní použití
cx('btn', 'btn-primary');
// Výsledek: "btn btn-primary"

// Podmíněné třídy
cx('btn', isActive && 'btn-active', disabled && 'btn-disabled');
// Výsledek: "btn btn-active" (pokud isActive=true, disabled=false)

// S undefined/null
cx('card', undefined, null, 'card-shadow');
// Výsledek: "card card-shadow"
```

### `map` - Iterace

Mapuje pole na HTML string:

```typescript
import { map } from './helpers';

const items = ['Položka 1', 'Položka 2', 'Položka 3'];

const listHtml = map(items, (item, index) => `
    <li data-index="${index}">${item}</li>
`);
```

### `when` - Podmíněné renderování

Renderuje obsah na základě podmínky:

```typescript
import { when } from './helpers';

// Základní podmínka
when(isLoggedIn, '<span>Přihlášen</span>');

// S fallbackem
when(isLoggedIn, '<span>Přihlášen</span>', '<span>Nepřihlášen</span>');

// S lazy evaluací (funkce)
when(hasItems, () => renderExpensiveContent(), () => '<p>Žádné položky</p>');
```

### `attrs` - HTML atributy

Generuje HTML atributy z objektu:

```typescript
import { attrs } from './helpers';

const attributes = attrs({
    id: 'my-input',
    class: 'form-control',
    disabled: true,
    readonly: false,      // Vynechá false
    placeholder: undefined // Vynechá undefined
});
// Výsledek: "id=\"my-input\" class=\"form-control\" disabled"
```

### `escapeHtml` - Escapování

Escapuje HTML speciální znaky:

```typescript
import { escapeHtml } from './helpers';

escapeHtml('<script>alert("XSS")</script>');
// Výsledek: "&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;"
```

## AdminDataList — Reusable admin seznam

Hlavní komponenta pro všechny admin seznamové stránky (produkty, zákazníci, objednávky, blog, média, sklad, uživatelé).

### Interface

```typescript
export interface DataListColumn {
    key: string;                                              // Klíč v row objektu
    label: string;                                            // Popisek sloupce
    width?: string;                                           // CSS šířka (např. '30%')
    align?: 'left' | 'center' | 'right';                     // Zarovnání
    render?: (value: string, row: Record<string, string>) => string;  // Custom renderování
}

export interface DataListAction {
    icon: string;                                             // Lucide icon název
    href: (row: Record<string, string>) => string;           // URL generátor
    title?: string;                                           // Tooltip
    variant?: 'default' | 'danger';                           // Styl (danger = červená)
    confirm?: string;                                         // Potvrzovací dialog
}

export interface AdminDataListProps extends BaseProps {
    columns: DataListColumn[];                                // Definice sloupců
    rows: Record<string, string>[];                           // Data (všechny hodnoty jako string)
    actions?: DataListAction[];                                // Akční tlačítka na řádek
    filters?: Filter[];                                        // Filter lišta (status, typ)
    addButton?: { label: string; href: string };              // Tlačítko "Přidat nový"
    emptyMessage?: string;                                     // Zpráva při prázdném seznamu
}
```

### Použití

```typescript
import { AdminDataList, Badge } from "../../../components";
import { formatPrice, getProductStatusLabel, getProductStatusVariant } from "../shared";
import { PRODUCT_STATUS_FILTER_OPTIONS } from "./catalog.const";
import { findAllProducts } from "./catalog.repository";

const products = findAllProducts();
const params = parseUrlQuery(request.url);
const statusFilter = params["status"] ?? "";

// Filtry s selected stavem
const statusFilters = PRODUCT_STATUS_FILTER_OPTIONS.map(o => ({
    ...o, selected: o.value === statusFilter,
}));

const filtered = statusFilter
    ? products.filter(p => p.status === statusFilter)
    : products;

const content = AdminDataList({
    columns: [
        { key: 'name', label: 'Název', width: '30%' },
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
        price: String(p.price),
        status: p.status
    })),
    actions: [
        { icon: 'edit', href: (row) => `/admin/products/edit/${row.id}`, title: 'Upravit' },
        { icon: 'trash-2', href: (row) => `/admin/products/delete/${row.id}`,
          title: 'Smazat', variant: 'danger', confirm: 'Opravdu smazat?' },
    ],
    filters: statusFilters,
    addButton: { label: 'Nový produkt', href: '/admin/products/create' },
    emptyMessage: 'Žádné produkty',
});
```

## AdminForm — Reusable admin formulář

Hlavní komponenta pro všechny admin formuláře (create/edit). Renderuje multi-section layout s main/sidebar rozložením.

### Interface

```typescript
export interface FormField {
    name: string;                                    // Název pole (HTML name atribut)
    label: string;                                   // Popisek pole
    type?: 'text' | 'email' | 'number' | 'password' // Typ inputu
        | 'textarea' | 'select' | 'hidden'
        | 'tel' | 'url';
    required?: boolean;                              // Povinné pole
    placeholder?: string;                            // Placeholder text
    options?: SelectOption[];                         // Pro type='select'
    rows?: number;                                   // Pro type='textarea'
    hint?: string;                                   // Nápověda pod polem
    colSpan?: number;                                // Šířka v grid (1-12)
    step?: string;                                   // Pro type='number' (např. '0.01')
    min?: string;                                    // Minimum pro number
}

export interface FormSection {
    title?: string;                                  // Nadpis sekce
    fields: FormField[];                             // Pole v sekci
    position?: 'main' | 'sidebar';                   // Pozice (main=levý, sidebar=pravý)
}

export interface AdminFormProps extends BaseProps {
    sections: FormSection[];                          // Sekce formuláře
    values?: Record<string, string>;                 // Aktuální hodnoty polí
    error?: string;                                  // Chybová zpráva
    submitLabel?: string;                            // Text submit tlačítka
    submitIcon?: string;                             // Ikona submit tlačítka
    backUrl?: string;                                // URL pro tlačítko "Zpět"
    backLabel?: string;                              // Text tlačítka "Zpět"
    action?: string;                                 // Form action URL
}
```

### Použití

```typescript
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
                { name: 'name', label: 'Název produktu', required: true, colSpan: 8 },
                { name: 'slug', label: 'Slug', colSpan: 4, placeholder: 'auto-generated' },
                { name: 'short_description', label: 'Krátký popis', type: 'textarea', rows: 2 },
                { name: 'description', label: 'Popis', type: 'textarea', rows: 6 },
            ],
        },
        {
            title: "Cena a sklad",
            position: 'main',
            fields: [
                { name: 'price', label: 'Cena', type: 'number', step: '0.01', required: true, colSpan: 4 },
                { name: 'old_price', label: 'Původní cena', type: 'number', step: '0.01', colSpan: 4 },
                { name: 'stock', label: 'Skladem', type: 'number', colSpan: 4 },
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

## UI Komponenty

### Button

```typescript
import { Button } from './components/ui';

// Základní tlačítko
Button({
    children: 'Klikni',
    variant: 'primary',  // 'primary' | 'outline' | 'ghost' | 'accent'
    size: 'md',          // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    icon: 'plus-lg',
    onclick: 'handleClick()'
});

// Link jako tlačítko
Button({ children: 'Přejít', href: '/dashboard', variant: 'outline' });
```

**Důležité:** Používejte `btn-outline-tf` a `btn-primary-tf` pro styling. Nikdy `btn-outline-secondary`.

### Card

```typescript
Card({
    title: 'Název karty',
    subtitle: 'Podnázev',
    children: '<p>Obsah karty...</p>',
    footer: '<button>Akce</button>',
});
```

### Badge

```typescript
Badge({
    children: 'Aktivní',
    variant: 'success'  // 'default' | 'success' | 'warning' | 'info' | 'danger'
});
```

### Icon

```typescript
Icon({
    name: 'house',      // Lucide Icons název
    size: 'md',         // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
});
```

### Avatar

```typescript
Avatar({
    name: 'Jan Novák',  // Zobrazí iniciály
    src: '/avatar.jpg', // Nebo obrázek
    size: 'md'
});
```

## Formulářové komponenty

### Input, Textarea, Select

```typescript
Input({ type: 'email', name: 'email', label: 'E-mail', required: true });
Textarea({ name: 'description', label: 'Popis', rows: 4 });
Select({
    name: 'category',
    label: 'Kategorie',
    options: [
        { value: '', label: 'Vyberte...' },
        { value: 'electronics', label: 'Elektronika' },
    ],
    value: 'electronics',
});
```

## Datové komponenty

### StatCard

```typescript
StatCard({
    title: 'Celkové tržby',
    value: '125 000 Kč',
    icon: 'currency-dollar',
    trend: { value: '+12%', positive: true },
    subtitle: 'oproti minulému měsíci'
});
```

### DataTable

Nižší úroveň tabulky (pro případy kdy AdminDataList nestačí):

```typescript
DataTable({
    columns: [
        { key: 'name', label: 'Název', width: '200px' },
        { key: 'price', label: 'Cena', align: 'right' },
    ],
    rows: [
        { name: 'Produkt A', price: '100 Kč' },
    ],
    emptyMessage: 'Žádné produkty'
});
```

### Pagination

```typescript
Pagination({
    currentPage: 2,
    totalPages: 10,
    baseUrl: '/products',
});
```

### FilterBar

```typescript
FilterBar({
    filters: [
        { type: 'search', name: 'q', placeholder: 'Hledat...' },
        { type: 'select', name: 'status', label: 'Stav', options: [...] },
    ],
    action: '/products'
});
```

## Layout komponenty

### AdminLayout

Hlavní layout pro admin stránky. Obsahuje sidebar navigaci, breadcrumbs, header.

```typescript
AdminLayout({
    children: content,           // HTML obsah stránky
    request: request,            // Request objekt (pro session/active stav)
    activePath: '/admin/products' // Aktivní položka v navigaci
});
```

### Použití v handleru

```typescript
response.content = getHtmlTemplate(
    "Produkty",
    AdminLayout({
        children: AdminDataList({ ... }),
        request,
        activePath: '/admin/products'
    })
);
```

## Shop komponenty

### ProductCard

```typescript
ProductCard({
    title: 'iPhone 15 Pro',
    price: '29 990 Kč',
    oldPrice: '32 990 Kč',
    category: 'Elektronika',
    description: 'Nejnovější iPhone',
    badge: 'Sleva',
    icon: 'phone',
    href: '/product?id=123',
    onAddToCart: 'addToCart(123)'
});
```

### CategoryCard

```typescript
CategoryCard({
    title: 'Elektronika',
    description: '150 produktů',
    icon: 'laptop',
    href: '/category?id=electronics'
});
```

## Block komponenty

### Hero

```typescript
Hero({
    title: 'Vítejte v našem obchodě',
    subtitle: 'Nejlepší produkty za skvělé ceny',
    primaryAction: { label: 'Nakupovat', href: '/eshop' },
    secondaryAction: { label: 'Více info', href: '/about' },
});
```

## Vytvoření vlastní komponenty

### Krok 1: Definice props a implementace

```typescript
// src/components/custom/MyComponent.ts
import { BaseProps } from '../types';
import { cx, when } from '../helpers';

export interface MyComponentProps extends BaseProps {
    title: string;
    variant?: 'default' | 'highlighted';
    children?: string;
}

export function MyComponent(props: MyComponentProps): string {
    const { title, variant = 'default', children, class: className, id } = props;

    const classes = cx(
        'my-component',
        variant === 'highlighted' && 'my-component--highlighted',
        className
    );

    return `
        <div id="${id || ''}" class="${classes}">
            <h3 class="my-component__title">${title}</h3>
            ${when(!!children, () => `
                <div class="my-component__content">${children}</div>
            `)}
        </div>
    `;
}
```

### Krok 2: Export

```typescript
// src/components/custom/index.ts
export * from './MyComponent';

// src/components/index.ts
export * from './custom';
```

## Best practices

1. **Používejte BaseProps** — Všechny komponenty rozšiřují BaseProps
2. **Destructuring s defaults** — Výchozí hodnoty v destructuringu
3. **cx pro třídy** — Vždy cx pro spojování CSS tříd
4. **escapeHtml pro user data** — Escapujte uživatelský vstup
5. **AdminDataList pro seznamy** — Vždy pro admin list stránky
6. **AdminForm pro formuláře** — Vždy pro admin create/edit stránky
7. **btn-outline-tf / btn-primary-tf** — Pro styling tlačítek (nikdy Bootstrap varianty)
