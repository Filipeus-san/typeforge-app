export const migration008CreatePageViews: Migration = {
    version: 8,
    name: "create_page_views",
    up: `
        CREATE TABLE IF NOT EXISTS page_views (
            id SERIAL PRIMARY KEY,
            path VARCHAR(500) NOT NULL,
            ip_hash VARCHAR(64),
            user_agent TEXT,
            referrer TEXT,
            viewed_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views (path);
        CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views (viewed_at);
    `
};
