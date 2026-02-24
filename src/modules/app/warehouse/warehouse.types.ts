// =============================================================================
// Admin Warehouse Module
// =============================================================================

export interface DbWarehouse {
    id: number;
    name: string;
    code: string;
    address: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface DbWarehouseWithStats extends DbWarehouse {
    product_count: number;
    total_stock: number;
}

export interface DbWarehouseStock {
    id: number;
    warehouse_id: number;
    product_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
}

export interface DbWarehouseStockWithProduct extends DbWarehouseStock {
    product_name: string;
    product_slug: string;
}

export interface DbStockMovement {
    id: number;
    warehouse_id: number;
    product_id: number;
    quantity: number;
    type: string;
    note: string;
    created_at: string;
}

export interface DbStockMovementWithDetails extends DbStockMovement {
    product_name: string;
    warehouse_name: string;
    warehouse_code: string;
}

export { WarehouseStatus, MovementType, WAREHOUSE_STATUS_LABELS, WAREHOUSE_STATUS_VARIANTS, MOVEMENT_TYPE_LABELS, MOVEMENT_TYPE_VARIANTS } from "./warehouse.const";
