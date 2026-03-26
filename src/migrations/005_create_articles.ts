export const migration005CreateArticles: Migration = {
    version: 5,
    name: "create_articles",
    up: `
        CREATE TABLE IF NOT EXISTS articles (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            excerpt TEXT,
            content TEXT NOT NULL DEFAULT '',
            author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            category_id INTEGER REFERENCES blog_categories(id) ON DELETE SET NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'scheduled')),
            thumbnail_id INTEGER REFERENCES media(id) ON DELETE SET NULL,
            read_time INTEGER NOT NULL DEFAULT 5,
            views INTEGER NOT NULL DEFAULT 0,
            meta_title VARCHAR(255),
            meta_description TEXT,
            published_at TIMESTAMP,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles (slug);
        CREATE INDEX IF NOT EXISTS idx_articles_status ON articles (status);
        CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles (category_id);
        CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles (published_at);
    `
};
