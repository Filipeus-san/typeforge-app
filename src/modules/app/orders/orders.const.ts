// =============================================================================
// Orders Module — Constants
// =============================================================================

import { ORDERS_T } from "./orders.translation";

export const ORDER_STATUS_FILTER_OPTIONS = [
    { value: '', label: ORDERS_T.statuses.filterAll },
    { value: 'pending', label: ORDERS_T.statuses.filterPending },
    { value: 'processing', label: ORDERS_T.statuses.filterProcessing },
    { value: 'shipped', label: ORDERS_T.statuses.filterShipped },
    { value: 'completed', label: ORDERS_T.statuses.filterCompleted },
    { value: 'cancelled', label: ORDERS_T.statuses.filterCancelled }
];

export const ORDER_STATUS_SELECT_OPTIONS = [
    { value: 'pending', label: ORDERS_T.statuses.pending },
    { value: 'processing', label: ORDERS_T.statuses.processing },
    { value: 'shipped', label: ORDERS_T.statuses.shipped },
    { value: 'completed', label: ORDERS_T.statuses.completed },
    { value: 'cancelled', label: ORDERS_T.statuses.cancelled }
];
