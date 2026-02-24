export const migration_015_add_blog_featured_image: Migration = {
    version: 15,
    name: "add_blog_featured_image",
    up: `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image VARCHAR(500)`
};
