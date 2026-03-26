export const migration003CreateMedia: Migration = {
    version: 3,
    name: "create_media",
    up: `
        CREATE TABLE IF NOT EXISTS media (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            storage_path TEXT NOT NULL,
            url TEXT NOT NULL,
            mime_type VARCHAR(100) NOT NULL,
            file_size BIGINT NOT NULL DEFAULT 0,
            width INTEGER,
            height INTEGER,
            uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_media_mime_type ON media (mime_type);
    `
};
