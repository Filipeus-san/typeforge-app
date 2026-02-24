export const migration_011_create_warehouse_stock: Migration = {
    version: 11,
    name: "create_warehouse_stock",
    up: `CREATE TABLE IF NOT EXISTS warehouse_stock (
        id SERIAL PRIMARY KEY,
        warehouse_id INTEGER NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(warehouse_id, product_id)
    )`
};
