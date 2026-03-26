export const migration002CreatePages: Migration = {
    version: 2,
    name: "create_pages",
    up: `
        CREATE TABLE IF NOT EXISTS pages (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            content TEXT NOT NULL DEFAULT '',
            status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'archived')),
            author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            sort_order INTEGER NOT NULL DEFAULT 0,
            meta_title VARCHAR(255),
            meta_description TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages (slug);
        CREATE INDEX IF NOT EXISTS idx_pages_status ON pages (status);
    `
};
