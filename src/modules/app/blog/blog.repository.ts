import { DbArticle, DbArticleWithAuthor, DbBlogCategory } from "../shared";

export function findAllArticlesWithDetails(): DbArticleWithAuthor[] {
    return sqlQuery<DbArticleWithAuthor>(
        `SELECT a.*,
                a.read_time::float as read_time, a.views::float as views,
                a.published_at::text as published_at,
                a.created_at::text as created_at, a.updated_at::text as updated_at,
                u.name as author_name,
                bc.name as category_name,
                m.url as thumbnail_url
         FROM articles a
         LEFT JOIN users u ON a.author_id = u.id
         LEFT JOIN blog_categories bc ON a.category_id = bc.id
         LEFT JOIN media m ON a.thumbnail_id = m.id
         ORDER BY a.id DESC`,
        []
    );
}

export function findArticleById(id: number): DbArticle | null {
    const rows = sqlQuery<DbArticle>(
        `SELECT *, read_time::float as read_time, views::float as views,
                published_at::text as published_at,
                created_at::text as created_at, updated_at::text as updated_at
         FROM articles WHERE id = $1`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function findArticleBySlug(slug: string): DbArticleWithAuthor | null {
    const rows = sqlQuery<DbArticleWithAuthor>(
        `SELECT a.*,
                a.read_time::float as read_time, a.views::float as views,
                a.published_at::text as published_at,
                a.created_at::text as created_at, a.updated_at::text as updated_at,
                u.name as author_name,
                bc.name as category_name,
                m.url as thumbnail_url
         FROM articles a
         LEFT JOIN users u ON a.author_id = u.id
         LEFT JOIN blog_categories bc ON a.category_id = bc.id
         LEFT JOIN media m ON a.thumbnail_id = m.id
         WHERE a.slug = $1`,
        [slug]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function findPublishedArticles(): DbArticleWithAuthor[] {
    return sqlQuery<DbArticleWithAuthor>(
        `SELECT a.*,
                a.read_time::float as read_time, a.views::float as views,
                a.published_at::text as published_at,
                a.created_at::text as created_at, a.updated_at::text as updated_at,
                u.name as author_name,
                bc.name as category_name,
                m.url as thumbnail_url
         FROM articles a
         LEFT JOIN users u ON a.author_id = u.id
         LEFT JOIN blog_categories bc ON a.category_id = bc.id
         LEFT JOIN media m ON a.thumbnail_id = m.id
         WHERE a.status = 'published' AND (a.published_at IS NULL OR a.published_at <= NOW())
         ORDER BY a.published_at DESC NULLS LAST`,
        []
    );
}

export function insertArticle(
    title: string, slug: string, excerpt: string, content: string,
    authorId: number, categoryId: number | null, status: string,
    readTime: number, metaTitle: string, metaDescription: string,
    publishedAt: string, thumbnailId: number | null
): void {
    sqlQuery(
        `INSERT INTO articles (title, slug, excerpt, content, author_id, category_id, status, read_time, meta_title, meta_description, published_at, thumbnail_id)
         VALUES ($1, $2, NULLIF($3, ''), $4, $5, NULLIF($6, 0), $7, $8, NULLIF($9, ''), NULLIF($10, ''), NULLIF($11, '')::timestamp, NULLIF($12, 0))`,
        [title, slug, excerpt, content, authorId, categoryId !== null ? categoryId : 0, status, readTime, metaTitle, metaDescription, publishedAt, thumbnailId !== null ? thumbnailId : 0]
    );
}

export function updateArticle(
    id: number, title: string, slug: string, excerpt: string, content: string,
    categoryId: number | null, status: string, readTime: number,
    metaTitle: string, metaDescription: string, publishedAt: string,
    thumbnailId: number | null
): void {
    sqlQuery(
        `UPDATE articles SET title = $1, slug = $2, excerpt = NULLIF($3, ''), content = $4,
         category_id = NULLIF($5, 0), status = $6, read_time = $7,
         meta_title = NULLIF($8, ''), meta_description = NULLIF($9, ''),
         published_at = NULLIF($10, '')::timestamp, thumbnail_id = NULLIF($11, 0), updated_at = NOW()
         WHERE id = $12`,
        [title, slug, excerpt, content, categoryId !== null ? categoryId : 0, status, readTime, metaTitle, metaDescription, publishedAt, thumbnailId !== null ? thumbnailId : 0, id]
    );
}

export function deleteArticle(id: number): void {
    sqlQuery("DELETE FROM articles WHERE id = $1", [id]);
}

export function findAllBlogCategories(): DbBlogCategory[] {
    return sqlQuery<DbBlogCategory>(
        `SELECT *, created_at::text as created_at FROM blog_categories ORDER BY sort_order, name`,
        []
    );
}

export function findBlogCategoryById(id: number): DbBlogCategory | null {
    const rows = sqlQuery<DbBlogCategory>(
        `SELECT *, created_at::text as created_at FROM blog_categories WHERE id = $1`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function insertBlogCategory(name: string, slug: string, sortOrder: number): void {
    sqlQuery(
        `INSERT INTO blog_categories (name, slug, sort_order) VALUES ($1, $2, $3)`,
        [name, slug, sortOrder]
    );
}

export function updateBlogCategory(id: number, name: string, slug: string, sortOrder: number): void {
    sqlQuery(
        `UPDATE blog_categories SET name = $1, slug = $2, sort_order = $3 WHERE id = $4`,
        [name, slug, sortOrder, id]
    );
}

export function deleteBlogCategory(id: number): void {
    sqlQuery("DELETE FROM blog_categories WHERE id = $1", [id]);
}

export function countArticles(): { total: number; published: number; drafts: number; totalViews: number } {
    const rows = sqlQuery<{ total: number; published: number; drafts: number; totalviews: number }>(
        `SELECT
            COUNT(*)::float as total,
            COUNT(*) FILTER (WHERE status = 'published')::float as published,
            COUNT(*) FILTER (WHERE status = 'draft')::float as drafts,
            COALESCE(SUM(views), 0)::float as totalviews
         FROM articles`,
        []
    );
    return { total: rows[0].total, published: rows[0].published, drafts: rows[0].drafts, totalViews: rows[0].totalviews };
}
