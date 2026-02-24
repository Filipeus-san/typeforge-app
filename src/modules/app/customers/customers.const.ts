// =============================================================================
// Customer Constants
// =============================================================================

import { CUSTOMERS_T } from "./customers.translation";

export type CustomerStatus = 'active' | 'inactive';

export const CUSTOMER_STATUS_LABELS: Record<CustomerStatus, string> = {
    active: CUSTOMERS_T.filters.active,
    inactive: CUSTOMERS_T.filters.inactive
};

export const CUSTOMER_STATUS_VARIANTS: Record<CustomerStatus, 'success' | 'warning'> = {
    active: 'success',
    inactive: 'warning'
};
