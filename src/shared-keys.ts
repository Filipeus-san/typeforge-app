// =============================================================================
// Shared Keys — single source of truth for both TypeForge (TSTL) and React
// =============================================================================

// -----------------------------------------------------------------------------
// Product Status
// -----------------------------------------------------------------------------

export type ProductStatus = 'active' | 'inactive' | 'soldout';

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
    active: 'Aktivní',
    inactive: 'Neaktivní',
    soldout: 'Vyprodáno',
};

export const PRODUCT_STATUS_VARIANTS: Record<ProductStatus, 'success' | 'warning' | 'danger'> = {
    active: 'success',
    inactive: 'warning',
    soldout: 'danger',
};

export const PRODUCT_STATUS_FILTER_OPTIONS: { value: ProductStatus; label: string }[] = [
    { value: 'active', label: 'Aktivní' },
    { value: 'inactive', label: 'Neaktivní' },
    { value: 'soldout', label: 'Vyprodáno' },
];

// -----------------------------------------------------------------------------
// Order Status
// -----------------------------------------------------------------------------

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    pending: 'Čekající',
    processing: 'Zpracování',
    shipped: 'Odesláno',
    completed: 'Dokončeno',
    cancelled: 'Zrušeno',
};

export const ORDER_STATUS_VARIANTS: Record<OrderStatus, 'warning' | 'info' | 'primary' | 'success' | 'danger'> = {
    pending: 'warning',
    processing: 'info',
    shipped: 'primary',
    completed: 'success',
    cancelled: 'danger',
};

export const ORDER_STATUS_FILTER_OPTIONS: { value: OrderStatus; label: string }[] = [
    { value: 'pending', label: 'Čekající' },
    { value: 'processing', label: 'Zpracování' },
    { value: 'shipped', label: 'Odesláno' },
    { value: 'completed', label: 'Dokončeno' },
    { value: 'cancelled', label: 'Zrušeno' },
];

// -----------------------------------------------------------------------------
// Blog Status
// -----------------------------------------------------------------------------

export type BlogStatus = 'published' | 'draft' | 'archived';

export const BLOG_STATUS_LABELS: Record<BlogStatus, string> = {
    published: 'Publikováno',
    draft: 'Koncept',
    archived: 'Archivováno',
};

export const BLOG_STATUS_VARIANTS: Record<BlogStatus, 'success' | 'warning' | 'default'> = {
    published: 'success',
    draft: 'warning',
    archived: 'default',
};

export const BLOG_STATUS_FILTER_OPTIONS: { value: string; label: string }[] = [
    { value: '', label: 'Všechny stavy' },
    { value: 'published', label: 'Publikováno' },
    { value: 'draft', label: 'Koncept' },
];

// -----------------------------------------------------------------------------
// Category Status
// -----------------------------------------------------------------------------

export type CategoryStatus = 'active' | 'hidden';

export const CATEGORY_STATUS_LABELS: Record<CategoryStatus, string> = {
    active: 'Aktivní',
    hidden: 'Skrytá',
};

export const CATEGORY_STATUS_VARIANTS: Record<CategoryStatus, 'success' | 'warning'> = {
    active: 'success',
    hidden: 'warning',
};

export const CATEGORY_STATUS_FILTER_OPTIONS: { value: CategoryStatus; label: string }[] = [
    { value: 'active', label: 'Aktivní' },
    { value: 'hidden', label: 'Skrytá' },
];

// -----------------------------------------------------------------------------
// Default Icons & Constants
// -----------------------------------------------------------------------------

export const DEFAULT_PRODUCT_ICON = 'box';
export const DEFAULT_CATEGORY_ICON = 'tag';
export const DEFAULT_READ_TIME = 5;

// -----------------------------------------------------------------------------
// Czech Diacritics Replacements
// -----------------------------------------------------------------------------

export const CZECH_DIACRITICS_REPLACEMENTS: [string, string][] = [
    ['á', 'a'], ['Á', 'a'], ['č', 'c'], ['Č', 'c'], ['ď', 'd'], ['Ď', 'd'],
    ['é', 'e'], ['É', 'e'], ['ě', 'e'], ['Ě', 'e'], ['í', 'i'], ['Í', 'i'],
    ['ň', 'n'], ['Ň', 'n'], ['ó', 'o'], ['Ó', 'o'], ['ř', 'r'], ['Ř', 'r'],
    ['š', 's'], ['Š', 's'], ['ť', 't'], ['Ť', 't'], ['ú', 'u'], ['Ú', 'u'],
    ['ů', 'u'], ['Ů', 'u'], ['ý', 'y'], ['Ý', 'y'], ['ž', 'z'], ['Ž', 'z'],
];
