import { DbUser, DbSetting, DbMenuItem, DbMedia } from "../shared";

// ---- Authentication ----

export function findUserByEmail(email: string): DbUser | null {
    const rows = sqlQuery<DbUser>(
        `SELECT *, last_login_at::text as last_login_at, created_at::text as created_at, updated_at::text as updated_at
         FROM users WHERE email = $1`,
        [email]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function authenticateUser(email: string, password: string): DbUser | null {
    const user = findUserByEmail(email);
    if (user === null) return null;
    if (user.status !== 'active') return null;
    if (!verifyPassword(password, user.password_hash)) return null;
    sqlQuery("UPDATE users SET last_login_at = NOW() WHERE id = $1", [user.id]);
    return user;
}

// ---- Settings ----

export function findAllSettings(): DbSetting[] {
    return sqlQuery<DbSetting>(
        `SELECT *, updated_at::text as updated_at FROM settings ORDER BY key`,
        []
    );
}

export function getSettingsMap(): Record<string, string> {
    const settings = findAllSettings();
    const map: Record<string, string> = {};
    for (const s of settings) {
        map[s.key] = s.value ?? '';
    }
    return map;
}

export function upsertSetting(key: string, value: string): void {
    sqlQuery(
        `INSERT INTO settings (key, value, updated_at) VALUES ($1, $2, NOW())
         ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
        [key, value]
    );
}

// ---- Menu ----

export function findAllMenuItems(): DbMenuItem[] {
    return sqlQuery<DbMenuItem>(
        `SELECT *, created_at::text as created_at, updated_at::text as updated_at
         FROM menu_items ORDER BY sort_order, id`,
        []
    );
}

export function deleteAllMenuItems(): void {
    sqlQuery("DELETE FROM menu_items", []);
}

export function insertMenuItem(label: string, url: string, target: string, parentId: number | null, sortOrder: number, visible: boolean): number {
    const rows = sqlQuery<{ id: number }>(
        `INSERT INTO menu_items (label, url, target, parent_id, sort_order, visible)
         VALUES ($1, $2, $3, NULLIF($4, 0), $5, $6) RETURNING id`,
        [label, url, target, parentId !== null ? parentId : 0, sortOrder, visible]
    );
    return rows.length > 0 ? rows[0].id : 0;
}

// ---- Media ----

export function findAllMedia(): DbMedia[] {
    return sqlQuery<DbMedia>(
        `SELECT *, file_size::float as file_size, created_at::text as created_at
         FROM media ORDER BY id DESC`,
        []
    );
}

export function findMediaByUrl(url: string): DbMedia | null {
    const rows = sqlQuery<DbMedia>(
        `SELECT *, file_size::float as file_size, created_at::text as created_at FROM media WHERE url = $1`,
        [url]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function findMediaById(id: number): DbMedia | null {
    const rows = sqlQuery<DbMedia>(
        `SELECT *, file_size::float as file_size, created_at::text as created_at FROM media WHERE id = $1`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function insertMedia(name: string, storagePath: string, url: string, mimeType: string, fileSize: number, width: number | null, height: number | null, uploadedBy: number | null): number {
    const rows = sqlQuery<{ id: number }>(
        `INSERT INTO media (name, storage_path, url, mime_type, file_size, width, height, uploaded_by)
         VALUES ($1, $2, $3, $4, $5, NULLIF($6, 0), NULLIF($7, 0), NULLIF($8, 0)) RETURNING id`,
        [name, storagePath, url, mimeType, fileSize, width !== null ? width : 0, height !== null ? height : 0, uploadedBy !== null ? uploadedBy : 0]
    );
    return rows.length > 0 ? rows[0].id : 0;
}

export function deleteMedia(id: number): void {
    sqlQuery("DELETE FROM media WHERE id = $1", [id]);
}

// ---- Password Reset Tokens ----

export function createPasswordResetToken(userId: number, token: string): void {
    // Invalidate any existing unused tokens for this user
    sqlQuery("UPDATE password_reset_tokens SET used = TRUE WHERE user_id = $1 AND used = FALSE", [userId]);
    // Create new token (expires in 1 hour)
    sqlQuery(
        `INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '1 hour')`,
        [userId, token]
    );
}

export function findValidResetToken(token: string): { id: number; user_id: number } | null {
    const rows = sqlQuery<{ id: number; user_id: number }>(
        `SELECT id, user_id FROM password_reset_tokens WHERE token = $1 AND used = FALSE AND expires_at > NOW()`,
        [token]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function markResetTokenUsed(tokenId: number): void {
    sqlQuery("UPDATE password_reset_tokens SET used = TRUE WHERE id = $1", [tokenId]);
}

// ---- Dashboard / Page Views ----

export function countTotalPageViews(): number {
    const rows = sqlQuery<{ count: number }>("SELECT COUNT(*)::float as count FROM page_views", []);
    return rows.length > 0 ? rows[0].count : 0;
}

export function countUniqueVisitors(): number {
    const rows = sqlQuery<{ count: number }>("SELECT COUNT(DISTINCT ip_hash)::float as count FROM page_views", []);
    return rows.length > 0 ? rows[0].count : 0;
}

export function countPageViewsLast7Days(): number {
    const rows = sqlQuery<{ count: number }>(
        "SELECT COUNT(*)::float as count FROM page_views WHERE viewed_at > NOW() - INTERVAL '7 days'",
        []
    );
    return rows.length > 0 ? rows[0].count : 0;
}

export function countPageViewsPrevious7Days(): number {
    const rows = sqlQuery<{ count: number }>(
        "SELECT COUNT(*)::float as count FROM page_views WHERE viewed_at > NOW() - INTERVAL '14 days' AND viewed_at <= NOW() - INTERVAL '7 days'",
        []
    );
    return rows.length > 0 ? rows[0].count : 0;
}
