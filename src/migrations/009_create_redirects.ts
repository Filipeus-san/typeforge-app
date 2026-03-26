export const migration009CreateRedirects: Migration = {
    version: 9,
    name: "create_redirects",
    up: `
        CREATE TABLE IF NOT EXISTS redirects (
            id SERIAL PRIMARY KEY,
            source_path VARCHAR(500) NOT NULL,
            target_url VARCHAR(500) NOT NULL,
            type VARCHAR(10) NOT NULL DEFAULT 'redirect' CHECK (type IN ('redirect', 'rewrite')),
            status_code INTEGER NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302)),
            is_active BOOLEAN NOT NULL DEFAULT true,
            sort_order INTEGER NOT NULL DEFAULT 0,
            note VARCHAR(255),
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        CREATE UNIQUE INDEX IF NOT EXISTS idx_redirects_source ON redirects (source_path);
    `
};
