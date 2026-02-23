export const migration_003_create_media: Migration = {
    version: 3,
    name: "create_media",
    up: `CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        storage_path VARCHAR(500) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        file_size INTEGER NOT NULL DEFAULT 0,
        width INTEGER,
        height INTEGER,
        alt_text VARCHAR(255),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`
};
