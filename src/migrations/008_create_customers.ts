export const migration_008_create_customers: Migration = {
    version: 8,
    name: "create_customers",
    up: `CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50) NOT NULL DEFAULT '',
        company VARCHAR(200) NOT NULL DEFAULT '',
        shipping_address TEXT NOT NULL DEFAULT '',
        billing_address TEXT NOT NULL DEFAULT '',
        notes TEXT NOT NULL DEFAULT '',
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`
};
