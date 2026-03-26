export const seed006MenuItems: Seed = {
    version: 6,
    name: "seed_menu_items",
    up: `
        INSERT INTO menu_items (id, label, url, target, parent_id, sort_order, visible)
        VALUES (1, 'Úvod', '/', '_self', NULL, 1, true)
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO menu_items (id, label, url, target, parent_id, sort_order, visible)
        VALUES (2, 'E-shop', '/eshop', '_self', NULL, 2, true)
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO menu_items (id, label, url, target, parent_id, sort_order, visible)
        VALUES (3, 'Blog', '/blog', '_self', NULL, 3, true)
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO menu_items (id, label, url, target, parent_id, sort_order, visible)
        VALUES (4, 'O nás', '/stranka/o-nas', '_self', NULL, 4, true)
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO menu_items (id, label, url, target, parent_id, sort_order, visible)
        VALUES (5, 'Kontakt', '/stranka/kontakt', '_self', NULL, 5, true)
        ON CONFLICT (id) DO NOTHING;

        SELECT setval('menu_items_id_seq', GREATEST((SELECT MAX(id) FROM menu_items), 5));
    `
};
