# Analýza šablony TypeForge - Plán první úpravy

## Stav projektu

Projekt je **plně funkční e-commerce šablona** s admin panelem, veřejným e-shopem, blogem, skladovým hospodářstvím a vícejazyčnou podporou. Obsahuje:

- **14 doménových modulů** v `src/modules/app/`
- **56 rout** (10 veřejných, 6 košík, 40 admin)
- **19 databázových migrací** (16 tabulek)
- **25+ UI komponent**
- **~12 400 řádků** kódu v modulech
- **16 překladových souborů**

---

## Cíl úpravy

Ořezat šablonu na **čistý základ pro nový projekt** — ponechat jen jádro (auth, admin layout, uživatelé, nastavení, media) a odstranit veškerou e-commerce logiku, která je specifická pro e-shop.

---

## Co PONECHAT (jádro šablony)

### Moduly
| Modul | Důvod |
|-------|-------|
| `auth/` | Přihlášení, registrace, odhlášení — základ každé aplikace |
| `dashboard/` | Admin dashboard — nutné zjednodušit (odstranit e-shop statistiky) |
| `admin-misc/` | Uživatelé, nastavení — základ admin panelu |
| `media/` | Knihovna médií — obecně užitečná |
| `notfound/` | 404 stránka |

### Komponenty
| Složka | Obsah |
|--------|-------|
| `components/ui/` | Button, Card, Badge, Icon, Form, Avatar, ThemeToggle |
| `components/data/` | AdminDataList, AdminForm, DataTable, FilterBar, Pagination, StatCard |
| `components/layout/` | AdminLayout, AdminSidebar, Navbar, Footer, PageWrapper |
| `components/blocks/` | Hero (volitelně) |

### Základní soubory
- `main.ts` — vstupní bod
- `config.ts` — konfigurace (zjednodušit migrace)
- `global.d.ts` — deklarace runtime API
- `global.types.ts` — globální typy
- `template.ts` — HTML šablona
- `utils.ts` — session management, CSRF, pomocné funkce
- `validator.ts` — validace
- `migration-runner.ts` — runner migrací
- `shared.ts` — sdílené typy a helpery (vyčistit od e-shop typů)

### Migrace
- `001_create_users` — tabulka uživatelů
- `013_create_settings` — tabulka nastavení
- `014_create_media` — tabulka médií

---

## Co ODSTRANIT

### Moduly (kompletně smazat složku)
| Modul | Důvod odstranění |
|-------|------------------|
| `catalog/` | Produkty a kategorie — e-shop specifické |
| `customers/` | Zákazníci — e-shop specifické |
| `orders/` | Objednávky — e-shop specifické |
| `warehouse/` | Sklady a pohyby zásob — e-shop specifické |
| `cart/` | Nákupní košík — e-shop specifické |
| `shop/` | Veřejný e-shop — e-shop specifické |
| `blog/` | Blog — volitelný, pro čistou šablonu odstranit |
| `translations/` | Překlady entit — závisí na odstraněných entitách |

### Komponenty
| Složka | Důvod |
|--------|-------|
| `components/shop/` | ProductCard, CategoryCard — e-shop specifické |

### Migrace (smazat soubory)
- `002_create_blog_posts`
- `003_create_orders`
- `004_create_order_items`
- `005_create_categories`
- `006_create_products`
- `007_add_product_id_to_order_items`
- `008_create_customers`
- `009_add_customer_id_to_orders`
- `010_create_warehouses`
- `011_create_warehouse_stock`
- `012_create_stock_movements`
- `015_add_blog_featured_image`
- `016_create_translations`
- `017_add_product_featured_image`
- `018_create_product_images`
- `019_create_cart_items`

---

## Kroky implementace

### Krok 1: Odstranění e-shop modulů
Smazat složky:
```
src/modules/app/catalog/
src/modules/app/customers/
src/modules/app/orders/
src/modules/app/warehouse/
src/modules/app/cart/
src/modules/app/shop/
src/modules/app/blog/
src/modules/app/translations/
```

### Krok 2: Odstranění shop komponent
Smazat složku:
```
src/components/shop/
```
Upravit `src/components/index.ts` — odstranit exporty shop komponent.

### Krok 3: Vyčištění routeru
Upravit `src/modules/router.ts`:
- Odstranit všechny importy odstraněných modulů
- Odstranit routy pro: products, categories, orders, customers, warehouse, cart, checkout, shop, eshop, product, category, blog, article, translations

Upravit `src/modules/router.types.ts`:
- Odstranit cesty odstraněných rout z union typů

### Krok 4: Vyčištění barrel exportu
Upravit `src/modules/app/index.ts`:
- Odstranit exporty odstraněných modulů (catalog, customers, orders, warehouse, cart, shop, blog, translations)

### Krok 5: Vyčištění shared.ts
Upravit `src/modules/app/shared.ts`:
- Odstranit typy: `DbCategory`, `DbProduct`, `DbProductWithCategory`, `DbProductImage`, `DbOrder`, `DbOrderItem`, `DbOrderWithItems`, `DbCustomer`
- Odstranit funkce: `getProductStatusLabel`, `getProductStatusVariant`, `getOrderStatusLabel`, `getOrderStatusVariant`, `formatPrice`, `generateOrderNumber`, `getCustomerInitials`
- Ponechat: `UserSession`, `DbUser`, `requireAdmin`, `generateSlug`, `escapeJsString`, `replaceAll`, `getInitials`, `formatOrderDate` (přejmenovat na `formatDate`)

### Krok 6: Vyčištění shared.const.ts
Upravit `src/modules/app/shared.const.ts`:
- Odstranit konstanty specifické pro e-shop (status labels, varianty pro produkty/objednávky)

### Krok 7: Odstranění nepotřebných migrací
Smazat migrační soubory 002-012, 015-019. Ponechat:
- `001_create_users.ts`
- `013_create_settings.ts`
- `014_create_media.ts`

Přečíslovat migrace:
- `001_create_users` (beze změny)
- `002_create_settings` (bylo 013)
- `003_create_media` (bylo 014)

Upravit `src/migrations/index.ts` — odstranit reference na smazané migrace.

### Krok 8: Aktualizace config.ts
Upravit `src/config.ts`:
- Odstranit reference na smazané migrace z pole migrací

### Krok 9: Zjednodušení dashboard modulu
Upravit `src/modules/app/dashboard/`:
- `dashboard.handlers.ts` — odstranit e-shop statistiky (objednávky, tržby, low stock), ponechat jen základní dashboard s uvítací zprávou a počtem uživatelů
- `dashboard.repository.ts` — odstranit dotazy na objednávky, produkty, tržby; ponechat jen `countUsers` nebo podobné
- `dashboard.const.ts` — odstranit `QUICK_ACTIONS` odkazující na e-shop entity, upravit na obecné akce

### Krok 10: Vyčištění admin-misc modulu
Upravit `src/modules/app/admin-misc/`:
- `admin-misc.handlers.ts` — odstranit `renderAdminPages` a `renderAdminArticles` (placeholder stránky)
- Odstranit routy `/admin/pages` a `/admin/articles` z routeru
- `admin-misc.const.ts` — odstranit `STATIC_PAGES`, `STATIC_ARTICLES`

### Krok 11: Aktualizace AdminSidebar
Upravit `src/components/layout/AdminSidebar.ts`:
- Odstranit menu položky pro: Produkty, Kategorie, Objednávky, Zákazníci, Sklady, Blog, Překlady, Stránky, Články
- Ponechat: Dashboard, Analytika (zjednodušená), Média, Uživatelé, Nastavení

### Krok 12: Aktualizace landing page
Upravit `src/modules/app/auth/auth.templates.ts`:
- Zjednodušit landing page — odstranit e-shop reference, ponechat obecný uvítací obsah

### Krok 13: Build a ověření
```bash
npm run build
```
Opravit případné chyby kompilace způsobené odstraněnými referencemi.

---

## Výsledný stav po úpravě

### Struktura modulů
```
src/modules/app/
├── auth/              # Přihlášení, registrace, odhlášení
├── dashboard/         # Zjednodušený admin dashboard
├── admin-misc/        # Uživatelé + nastavení
├── media/             # Knihovna médií
├── notfound/          # 404 stránka
├── shared.ts          # Sdílené typy a helpery
├── shared.const.ts    # Sdílené konstanty
├── shared.translation.ts  # Sdílené překlady
└── index.ts           # Barrel export
```

### Databáze (3 tabulky + _migrations)
- `users` — uživatelé
- `settings` — nastavení
- `media` — média

### Routy (~20)
- `/` — Landing page
- `/login`, `/register`, `/logout` — Auth
- `/admin` — Dashboard
- `/admin/analytics` — Analytika
- `/admin/media`, `/admin/media/upload`, `/admin/media/delete` — Média
- `/admin/users`, `/admin/users/create`, `/admin/users/edit`, `/admin/users/delete` — Uživatelé
- `/admin/settings` — Nastavení

### Odhadovaný objem kódu po ořezání
- **~3 000–4 000 řádků** modulového kódu (z původních ~12 400)
- **3 migrace** (z původních 19)
- **~20 rout** (z původních 56)
- **~20 komponent** (z původních 25+)

---

## Rizika a poznámky

1. **Závislosti v shared.ts** — při odstraňování typů a funkcí je nutné zkontrolovat, že zbývající moduly na ně neodkazují.
2. **Sidebar navigace** — po odstranění modulů je nutné aktualizovat sidebar, jinak budou mrtvé odkazy.
3. **Dashboard repository** — dotazy odkazují na tabulky, které budou smazány (orders, products, customers). Je nutné kompletně přepsat.
4. **Překladové soubory** — každý modul má `.translation.ts`, při smazání modulu se smaže i překlad. Zkontrolovat, že žádný zbývající kód neimportuje překlady smazaných modulů.
5. **Build ověření** — po každém kroku je vhodné spustit `npm run build` pro včasné zachycení chyb.
6. **Přečíslování migrací** — změna čísel migrací je důležitá pro čistotu, ale vyžaduje aktualizaci referencí v `config.ts` a `migrations/index.ts`.
