export const migration_005_create_categories: Migration = {
    version: 5,
    name: "create_categories",
    up: `CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        slug VARCHAR(200) NOT NULL UNIQUE,
        description TEXT NOT NULL DEFAULT '',
        icon VARCHAR(50) NOT NULL DEFAULT 'tag',
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`
};
