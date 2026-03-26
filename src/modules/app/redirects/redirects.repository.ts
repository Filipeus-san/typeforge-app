import { DbRedirect } from "../shared";

const CACHE_KEY = "redirects_active";
const CACHE_TTL = 60000; // 60 seconds

export function findAllRedirects(): DbRedirect[] {
    return sqlQuery<DbRedirect>(
        `SELECT *, created_at::text as created_at, updated_at::text as updated_at
         FROM redirects ORDER BY sort_order ASC, id DESC`,
        []
    );
}

export function findActiveRedirects(): DbRedirect[] {
    return sqlQuery<DbRedirect>(
        `SELECT *, created_at::text as created_at, updated_at::text as updated_at
         FROM redirects WHERE is_active = true ORDER BY sort_order ASC, id ASC`,
        []
    );
}

export function getActiveRedirectsCached(): DbRedirect[] {
    const cached = appCacheGet(CACHE_KEY);
    if (cached !== null && cached !== undefined && cached !== '') {
        return jsonDecode(cached) as DbRedirect[];
    }
    const rules = findActiveRedirects();
    appCacheSet(CACHE_KEY, jsonEncode(rules), CACHE_TTL);
    return rules;
}

export function invalidateRedirectsCache(): void {
    appCacheRemove(CACHE_KEY);
}

export function findRedirectById(id: number): DbRedirect | null {
    const rows = sqlQuery<DbRedirect>(
        `SELECT *, created_at::text as created_at, updated_at::text as updated_at
         FROM redirects WHERE id = $1`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function findRedirectBySourcePath(sourcePath: string): DbRedirect | null {
    const rows = sqlQuery<DbRedirect>(
        `SELECT *, created_at::text as created_at, updated_at::text as updated_at
         FROM redirects WHERE source_path = $1`,
        [sourcePath]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function insertRedirect(sourcePath: string, targetUrl: string, type: string, statusCode: number, isActive: boolean, sortOrder: number, note: string): void {
    sqlQuery(
        `INSERT INTO redirects (source_path, target_url, type, status_code, is_active, sort_order, note)
         VALUES ($1, $2, $3, $4, $5, $6, NULLIF($7, ''))`,
        [sourcePath, targetUrl, type, statusCode, isActive, sortOrder, note]
    );
    invalidateRedirectsCache();
}

export function updateRedirect(id: number, sourcePath: string, targetUrl: string, type: string, statusCode: number, isActive: boolean, sortOrder: number, note: string): void {
    sqlQuery(
        `UPDATE redirects SET source_path = $1, target_url = $2, type = $3, status_code = $4,
                is_active = $5, sort_order = $6, note = NULLIF($7, ''), updated_at = NOW()
         WHERE id = $8`,
        [sourcePath, targetUrl, type, statusCode, isActive, sortOrder, note, id]
    );
    invalidateRedirectsCache();
}

export function toggleRedirectActive(id: number): void {
    sqlQuery(
        `UPDATE redirects SET is_active = NOT is_active, updated_at = NOW() WHERE id = $1`,
        [id]
    );
    invalidateRedirectsCache();
}

export function deleteRedirect(id: number): void {
    sqlQuery("DELETE FROM redirects WHERE id = $1", [id]);
    invalidateRedirectsCache();
}

export function countRedirects(): { total: number; active: number; inactive: number; redirects: number; rewrites: number } {
    const rows = sqlQuery<{ total: number; active: number; inactive: number; redirects: number; rewrites: number }>(
        `SELECT
            COUNT(*)::float as total,
            COUNT(*) FILTER (WHERE is_active = true)::float as active,
            COUNT(*) FILTER (WHERE is_active = false)::float as inactive,
            COUNT(*) FILTER (WHERE type = 'redirect')::float as redirects,
            COUNT(*) FILTER (WHERE type = 'rewrite')::float as rewrites
         FROM redirects`,
        []
    );
    return rows[0];
}

export function applyRedirectRules(requestPath: string): { type: string; target: string; statusCode: number } | null {
    // Skip admin paths to avoid redirect loops
    if (stringStartsWith(requestPath, "/admin")) return null;

    const rules = getActiveRedirectsCached();
    for (const rule of rules) {
        if (rule.source_path === requestPath) {
            return {
                type: rule.type,
                target: rule.target_url,
                statusCode: rule.status_code,
            };
        }
    }
    return null;
}
