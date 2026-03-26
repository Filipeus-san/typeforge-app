export const seed004BlogCategories: Seed = {
    version: 4,
    name: "seed_blog_categories",
    up: `
        INSERT INTO blog_categories (name, slug, sort_order) VALUES ('Novinky', 'novinky', 1) ON CONFLICT (slug) DO NOTHING;
        INSERT INTO blog_categories (name, slug, sort_order) VALUES ('Návody', 'navody', 2) ON CONFLICT (slug) DO NOTHING;
        INSERT INTO blog_categories (name, slug, sort_order) VALUES ('Recenze', 'recenze', 3) ON CONFLICT (slug) DO NOTHING;
    `
};
