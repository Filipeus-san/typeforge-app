// =============================================================================
// Warehouse Constants
// =============================================================================

import { WAREHOUSE_T } from "./warehouse.translation";

export type WarehouseStatus = 'active' | 'inactive';
export type MovementType = 'receipt' | 'issue' | 'transfer' | 'adjustment';

export const WAREHOUSE_STATUS_LABELS: Record<WarehouseStatus, string> = {
    active: WAREHOUSE_T.statuses.active,
    inactive: WAREHOUSE_T.statuses.inactive
};

export const WAREHOUSE_STATUS_VARIANTS: Record<WarehouseStatus, 'success' | 'warning'> = {
    active: 'success',
    inactive: 'warning'
};

export const MOVEMENT_TYPE_LABELS: Record<MovementType, string> = {
    receipt: WAREHOUSE_T.movementTypes.receipt,
    issue: WAREHOUSE_T.movementTypes.issue,
    transfer: WAREHOUSE_T.movementTypes.transfer,
    adjustment: WAREHOUSE_T.movementTypes.adjustment
};

export const MOVEMENT_TYPE_VARIANTS: Record<MovementType, 'success' | 'danger' | 'info' | 'warning'> = {
    receipt: 'success',
    issue: 'danger',
    transfer: 'info',
    adjustment: 'warning'
};
