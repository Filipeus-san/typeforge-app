export const migration006CreateMenuItems: Migration = {
    version: 6,
    name: "create_menu_items",
    up: `
        CREATE TABLE IF NOT EXISTS menu_items (
            id SERIAL PRIMARY KEY,
            label VARCHAR(255) NOT NULL,
            url VARCHAR(500) NOT NULL,
            target VARCHAR(10) NOT NULL DEFAULT '_self' CHECK (target IN ('_self', '_blank')),
            parent_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
            sort_order INTEGER NOT NULL DEFAULT 0,
            visible BOOLEAN NOT NULL DEFAULT true,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_menu_items_parent_id ON menu_items (parent_id);
        CREATE INDEX IF NOT EXISTS idx_menu_items_sort_order ON menu_items (sort_order);
    `
};
