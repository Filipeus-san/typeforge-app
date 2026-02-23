export const migration_012_create_stock_movements: Migration = {
    version: 12,
    name: "create_stock_movements",
    up: `CREATE TABLE IF NOT EXISTS stock_movements (
        id SERIAL PRIMARY KEY,
        warehouse_id INTEGER NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL,
        type VARCHAR(20) NOT NULL,
        note TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`
};
