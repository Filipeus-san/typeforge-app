export const migration_003_create_orders: Migration = {
    version: 3,
    name: "create_orders",
    up: `CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(20) NOT NULL UNIQUE,
        customer_id INTEGER REFERENCES users(id),
        customer_name VARCHAR(200) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
        shipping_address TEXT,
        billing_address TEXT,
        notes TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`
};
