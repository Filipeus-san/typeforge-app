// =============================================================================
// Catalog Constants
// =============================================================================

import { CATALOG_T } from "./catalog.translation";

export const PRODUCT_STATUS_FILTER_OPTIONS = [
    { value: 'active', label: CATALOG_T.statuses.active },
    { value: 'inactive', label: CATALOG_T.statuses.inactive },
    { value: 'soldout', label: CATALOG_T.statuses.soldout },
];

export const CATEGORY_STATUS_FILTER_OPTIONS = [
    { value: 'active', label: CATALOG_T.statuses.active },
    { value: 'hidden', label: CATALOG_T.statuses.hidden },
];

export const DEFAULT_PRODUCT_ICON = 'box';
export const DEFAULT_CATEGORY_ICON = 'tag';
