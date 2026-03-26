export const migration007CreateSettings: Migration = {
    version: 7,
    name: "create_settings",
    up: `
        CREATE TABLE IF NOT EXISTS settings (
            id SERIAL PRIMARY KEY,
            key VARCHAR(255) NOT NULL UNIQUE,
            value TEXT,
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_settings_key ON settings (key);
    `
};
