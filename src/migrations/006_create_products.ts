export const migration_006_create_products: Migration = {
    version: 6,
    name: "create_products",
    up: `CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(300) NOT NULL,
        slug VARCHAR(300) NOT NULL UNIQUE,
        description TEXT NOT NULL DEFAULT '',
        short_description TEXT NOT NULL DEFAULT '',
        category_id INTEGER REFERENCES categories(id),
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        old_price DECIMAL(10,2),
        icon VARCHAR(50) NOT NULL DEFAULT 'box',
        stock INTEGER NOT NULL DEFAULT 0,
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`
};
