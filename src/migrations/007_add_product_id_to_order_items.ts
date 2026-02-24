export const migration_007_add_product_id_to_order_items: Migration = {
    version: 7,
    name: "add_product_id_to_order_items",
    up: `ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_id INTEGER REFERENCES products(id)`
};
