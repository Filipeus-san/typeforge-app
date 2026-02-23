export const migration_002_create_blog_posts: Migration = {
    version: 2,
    name: "create_blog_posts",
    up: `CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) NOT NULL UNIQUE,
        excerpt TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        author_id INTEGER NOT NULL REFERENCES users(id),
        category VARCHAR(100) NOT NULL DEFAULT '',
        status VARCHAR(20) NOT NULL DEFAULT 'draft',
        read_time INTEGER NOT NULL DEFAULT 5,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`
};
