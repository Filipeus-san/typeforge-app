export const migration_017_add_product_featured_image: Migration = {
    version: 17,
    name: "add_product_featured_image",
    up: `ALTER TABLE products ADD COLUMN IF NOT EXISTS featured_image VARCHAR(500) DEFAULT NULL`
};
