export const migration_009_add_customer_id_to_orders: Migration = {
    version: 9,
    name: "add_customer_id_to_orders",
    up: `DO $$ BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name = 'orders' AND column_name = 'customer_id_ref'
        ) THEN
            ALTER TABLE orders ADD COLUMN customer_id_ref INTEGER REFERENCES customers(id);
        END IF;
    END $$`
};
