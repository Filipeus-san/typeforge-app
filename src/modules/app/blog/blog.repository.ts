import { DbBlogPost, DbBlogPostWithAuthor } from "./blog.types";

export function findPostBySlugWithAuthor(slug: string): DbBlogPostWithAuthor | null {
    const results = sqlQuery<DbBlogPostWithAuthor>(
        `SELECT bp.*, bp.created_at::text as created_at, bp.updated_at::text as updated_at,
             u.first_name as author_first_name, u.last_name as author_last_name, u.email as author_email
         FROM blog_posts bp
         LEFT JOIN users u ON bp.author_id = u.id
         WHERE bp.slug = $1 LIMIT 1`,
        [slug]
    );
    return results.length > 0 ? results[0] : null;
}

export function findAllPostsWithAuthor(): DbBlogPostWithAuthor[] {
    return sqlQuery<DbBlogPostWithAuthor>(
        `SELECT bp.*, bp.created_at::text as created_at, bp.updated_at::text as updated_at,
             u.first_name as author_first_name, u.last_name as author_last_name, u.email as author_email
         FROM blog_posts bp
         LEFT JOIN users u ON bp.author_id = u.id
         ORDER BY bp.created_at DESC`,
        []
    );
}

export function findPublishedPostsWithAuthor(): DbBlogPostWithAuthor[] {
    return sqlQuery<DbBlogPostWithAuthor>(
        `SELECT bp.*, bp.created_at::text as created_at, bp.updated_at::text as updated_at,
             u.first_name as author_first_name, u.last_name as author_last_name, u.email as author_email
         FROM blog_posts bp
         LEFT JOIN users u ON bp.author_id = u.id
         WHERE bp.status = 'published'
         ORDER BY bp.created_at DESC`,
        []
    );
}

export function findPostById(id: number): DbBlogPost | null {
    const results = sqlQuery<DbBlogPost>("SELECT *, created_at::text as created_at, updated_at::text as updated_at FROM blog_posts WHERE id = $1 LIMIT 1", [id]);
    return results.length > 0 ? results[0] : null;
}

export function findPostBySlug(slug: string): DbBlogPost | null {
    const results = sqlQuery<DbBlogPost>("SELECT id FROM blog_posts WHERE slug = $1 LIMIT 1", [slug]);
    return results.length > 0 ? results[0] : null;
}

export function findPostBySlugExcluding(slug: string, excludeId: number): DbBlogPost | null {
    const results = sqlQuery<DbBlogPost>("SELECT id FROM blog_posts WHERE slug = $1 AND id != $2 LIMIT 1", [slug, excludeId]);
    return results.length > 0 ? results[0] : null;
}

export function insertPost(title: string, slug: string, excerpt: string, content: string, authorId: number, category: string, status: string, readTime: number, featuredImage: string): void {
    sqlQuery<DbBlogPost>(
        `INSERT INTO blog_posts (title, slug, excerpt, content, author_id, category, status, read_time, featured_image)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NULLIF($9, ''))`,
        [title, slug, excerpt, content, authorId, category, status, readTime, featuredImage]
    );
}

export function updatePost(id: number, title: string, slug: string, excerpt: string, content: string, category: string, status: string, readTime: number, featuredImage: string): void {
    sqlQuery<DbBlogPost>(
        `UPDATE blog_posts SET title = $1, slug = $2, excerpt = $3, content = $4, category = $5, status = $6, read_time = $7, featured_image = NULLIF($8, ''), updated_at = CURRENT_TIMESTAMP
         WHERE id = $9`,
        [title, slug, excerpt, content, category, status, readTime, featuredImage, id]
    );
}

export function deletePost(id: number): void {
    sqlQuery("DELETE FROM blog_posts WHERE id = $1", [id]);
}
