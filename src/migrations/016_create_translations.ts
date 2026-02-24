export const migration_016_create_translations: Migration = {
    version: 16,
    name: "create_translations",
    up: `CREATE TABLE IF NOT EXISTS translations (
        id SERIAL PRIMARY KEY,
        entity_type VARCHAR(50) NOT NULL,
        entity_id INTEGER NOT NULL,
        language VARCHAR(10) NOT NULL,
        field_name VARCHAR(100) NOT NULL,
        field_value TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(entity_type, entity_id, language, field_name)
    )`
};
