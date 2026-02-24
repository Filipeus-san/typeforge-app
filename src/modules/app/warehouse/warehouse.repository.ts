import { DbProduct } from "../shared";
import {
    DbWarehouse,
    DbWarehouseWithStats,
    DbWarehouseStockWithProduct,
    DbStockMovementWithDetails,
} from "./warehouse.types";

export function findAllWarehousesWithStats(): DbWarehouseWithStats[] {
    return sqlQuery<DbWarehouseWithStats>(
        `SELECT w.id, w.name, w.code, w.address, w.status,
                w.created_at::text as created_at,
                w.updated_at::text as updated_at,
                COALESCE((SELECT COUNT(DISTINCT ws.product_id)::int FROM warehouse_stock ws WHERE ws.warehouse_id = w.id AND ws.quantity > 0), 0) as product_count,
                COALESCE((SELECT SUM(ws.quantity)::int FROM warehouse_stock ws WHERE ws.warehouse_id = w.id), 0) as total_stock
         FROM warehouses w
         ORDER BY w.name`,
        []
    );
}

export function findWarehouseById(id: number): DbWarehouse | null {
    const results = sqlQuery<DbWarehouse>(
        "SELECT id, name, code, address, status, created_at::text as created_at, updated_at::text as updated_at FROM warehouses WHERE id = $1 LIMIT 1",
        [id]
    );
    return results.length > 0 ? results[0] : null;
}

export function findWarehouseByCode(code: string): DbWarehouse | null {
    const results = sqlQuery<DbWarehouse>("SELECT id FROM warehouses WHERE code = $1 LIMIT 1", [code]);
    return results.length > 0 ? results[0] : null;
}

export function findWarehouseByCodeExcluding(code: string, excludeId: number): DbWarehouse | null {
    const results = sqlQuery<DbWarehouse>("SELECT id FROM warehouses WHERE code = $1 AND id != $2 LIMIT 1", [code, excludeId]);
    return results.length > 0 ? results[0] : null;
}

export function insertWarehouse(name: string, code: string, address: string, status: string): void {
    sqlQuery(
        `INSERT INTO warehouses (name, code, address, status)
         VALUES ($1, $2, $3, $4)`,
        [name, code, address, status]
    );
}

export function updateWarehouse(id: number, name: string, code: string, address: string, status: string): void {
    sqlQuery(
        `UPDATE warehouses
         SET name = $1, code = $2, address = $3, status = $4, updated_at = CURRENT_TIMESTAMP
         WHERE id = $5`,
        [name, code, address, status, id]
    );
}

export function findAffectedProductIds(warehouseId: number): { product_id: number }[] {
    return sqlQuery<{ product_id: number }>(
        "SELECT DISTINCT product_id FROM warehouse_stock WHERE warehouse_id = $1",
        [warehouseId]
    );
}

export function deleteWarehouse(id: number): void {
    sqlQuery("DELETE FROM warehouses WHERE id = $1", [id]);
}

export function findWarehouseStock(warehouseId: number): DbWarehouseStockWithProduct[] {
    return sqlQuery<DbWarehouseStockWithProduct>(
        `SELECT ws.id, ws.warehouse_id, ws.product_id, ws.quantity,
                ws.created_at::text as created_at,
                ws.updated_at::text as updated_at,
                p.name as product_name,
                p.slug as product_slug
         FROM warehouse_stock ws
         JOIN products p ON ws.product_id = p.id
         WHERE ws.warehouse_id = $1
         ORDER BY p.name`,
        [warehouseId]
    );
}

export function findRecentMovements(warehouseId: number): DbStockMovementWithDetails[] {
    return sqlQuery<DbStockMovementWithDetails>(
        `SELECT sm.id, sm.warehouse_id, sm.product_id, sm.quantity, sm.type, sm.note,
                sm.created_at::text as created_at,
                p.name as product_name,
                w.name as warehouse_name,
                w.code as warehouse_code
         FROM stock_movements sm
         JOIN products p ON sm.product_id = p.id
         JOIN warehouses w ON sm.warehouse_id = w.id
         WHERE sm.warehouse_id = $1
         ORDER BY sm.id DESC
         LIMIT 20`,
        [warehouseId]
    );
}

export function findActiveWarehouses(): DbWarehouse[] {
    return sqlQuery<DbWarehouse>(
        "SELECT id, name, code, address, status, created_at::text as created_at, updated_at::text as updated_at FROM warehouses WHERE status = 'active' ORDER BY name",
        []
    );
}

export function findActiveProducts(): DbProduct[] {
    return sqlQuery<DbProduct>(
        "SELECT id, name, slug, description, short_description, category_id, price::float as price, old_price::float as old_price, icon, stock, status, created_at::text as created_at, updated_at::text as updated_at FROM products WHERE status = 'active' ORDER BY name",
        []
    );
}

export function findActiveWarehouseById(id: number): DbWarehouse | null {
    const results = sqlQuery<DbWarehouse>("SELECT id FROM warehouses WHERE id = $1 AND status = 'active' LIMIT 1", [id]);
    return results.length > 0 ? results[0] : null;
}

export function findProductById(id: number): DbProduct | null {
    const results = sqlQuery<DbProduct>("SELECT id FROM products WHERE id = $1 LIMIT 1", [id]);
    return results.length > 0 ? results[0] : null;
}

export function updateProductTotalStock(productId: number): void {
    sqlQuery(
        `UPDATE products
         SET stock = COALESCE((SELECT SUM(quantity) FROM warehouse_stock WHERE product_id = $1), 0),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [productId]
    );
}

export function insertStockMovement(warehouseId: number, productId: number, quantity: number, type: string, note: string): void {
    sqlQuery(
        `INSERT INTO stock_movements (warehouse_id, product_id, quantity, type, note)
         VALUES ($1, $2, $3, $4, $5)`,
        [warehouseId, productId, quantity, type, note]
    );
}

export function upsertWarehouseStock(warehouseId: number, productId: number, quantity: number): void {
    sqlQuery(
        `INSERT INTO warehouse_stock (warehouse_id, product_id, quantity, updated_at)
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
         ON CONFLICT (warehouse_id, product_id)
         DO UPDATE SET
            quantity = warehouse_stock.quantity + $3,
            updated_at = CURRENT_TIMESTAMP`,
        [warehouseId, productId, quantity]
    );
}
