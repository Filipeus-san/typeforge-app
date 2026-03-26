import { DbPage, DbPageWithAuthor } from "../shared";

export function findAllPages(): DbPageWithAuthor[] {
    return sqlQuery<DbPageWithAuthor>(
        `SELECT p.*, p.created_at::text as created_at, p.updated_at::text as updated_at,
                u.name as author_name
         FROM pages p
         LEFT JOIN users u ON p.author_id = u.id
         ORDER BY p.sort_order, p.id DESC`,
        []
    );
}

export function findPublishedPageBySlug(slug: string): DbPage | null {
    const rows = sqlQuery<DbPage>(
        `SELECT *, created_at::text as created_at, updated_at::text as updated_at
         FROM pages WHERE slug = $1 AND status = 'published'`,
        [slug]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function findPageById(id: number): DbPage | null {
    const rows = sqlQuery<DbPage>(
        `SELECT *, created_at::text as created_at, updated_at::text as updated_at
         FROM pages WHERE id = $1`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function insertPage(title: string, slug: string, content: string, status: string, authorId: number, metaTitle: string, metaDescription: string): void {
    sqlQuery(
        `INSERT INTO pages (title, slug, content, status, author_id, meta_title, meta_description)
         VALUES ($1, $2, $3, $4, $5, NULLIF($6, ''), NULLIF($7, ''))`,
        [title, slug, content, status, authorId, metaTitle, metaDescription]
    );
}

export function updatePage(id: number, title: string, slug: string, content: string, status: string, metaTitle: string, metaDescription: string): void {
    sqlQuery(
        `UPDATE pages SET title = $1, slug = $2, content = $3, status = $4,
         meta_title = NULLIF($5, ''), meta_description = NULLIF($6, ''), updated_at = NOW()
         WHERE id = $7`,
        [title, slug, content, status, metaTitle, metaDescription, id]
    );
}

export function deletePage(id: number): void {
    sqlQuery("DELETE FROM pages WHERE id = $1", [id]);
}

export function findAllPublishedPages(): DbPage[] {
    return sqlQuery<DbPage>(
        `SELECT *, created_at::text as created_at, updated_at::text as updated_at
         FROM pages WHERE status = 'published' ORDER BY title`,
        []
    );
}

export function countPages(): number {
    const rows = sqlQuery<{ count: number }>("SELECT COUNT(*)::float as count FROM pages", []);
    return rows.length > 0 ? rows[0].count : 0;
}

export function findRecentPages(limit: number): DbPageWithAuthor[] {
    return sqlQuery<DbPageWithAuthor>(
        `SELECT p.*, p.created_at::text as created_at, p.updated_at::text as updated_at,
                u.name as author_name
         FROM pages p
         LEFT JOIN users u ON p.author_id = u.id
         ORDER BY p.updated_at DESC LIMIT $1`,
        [limit]
    );
}
