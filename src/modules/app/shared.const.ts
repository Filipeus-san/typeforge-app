import { SHARED_T } from "./shared.translation";

// =============================================================================
// Product Status Constants
// =============================================================================

export type ProductStatus = 'active' | 'inactive' | 'soldout';

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
    active: SHARED_T.statuses.product.active,
    inactive: SHARED_T.statuses.product.inactive,
    soldout: SHARED_T.statuses.product.soldout
};

export const PRODUCT_STATUS_VARIANTS: Record<ProductStatus, 'success' | 'warning' | 'danger'> = {
    active: 'success',
    inactive: 'warning',
    soldout: 'danger'
};

// =============================================================================
// Order Status Constants
// =============================================================================

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    pending: SHARED_T.statuses.order.pending,
    processing: SHARED_T.statuses.order.processing,
    shipped: SHARED_T.statuses.order.shipped,
    completed: SHARED_T.statuses.order.completed,
    cancelled: SHARED_T.statuses.order.cancelled
};

export const ORDER_STATUS_VARIANTS: Record<OrderStatus, 'warning' | 'info' | 'primary' | 'success' | 'danger'> = {
    pending: 'warning',
    processing: 'info',
    shipped: 'primary',
    completed: 'success',
    cancelled: 'danger'
};

// =============================================================================
// Czech Diacritics Replacements
// =============================================================================

export const CZECH_DIACRITICS_REPLACEMENTS: [string, string][] = [
    ['á', 'a'], ['Á', 'a'], ['č', 'c'], ['Č', 'c'], ['ď', 'd'], ['Ď', 'd'],
    ['é', 'e'], ['É', 'e'], ['ě', 'e'], ['Ě', 'e'], ['í', 'i'], ['Í', 'i'],
    ['ň', 'n'], ['Ň', 'n'], ['ó', 'o'], ['Ó', 'o'], ['ř', 'r'], ['Ř', 'r'],
    ['š', 's'], ['Š', 's'], ['ť', 't'], ['Ť', 't'], ['ú', 'u'], ['Ú', 'u'],
    ['ů', 'u'], ['Ů', 'u'], ['ý', 'y'], ['Ý', 'y'], ['ž', 'z'], ['Ž', 'z'],
];
