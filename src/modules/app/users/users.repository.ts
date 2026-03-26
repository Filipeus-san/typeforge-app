import { DbUser } from "../shared";

export function findAllUsers(): DbUser[] {
    return sqlQuery<DbUser>(
        `SELECT *, last_login_at::text as last_login_at, created_at::text as created_at, updated_at::text as updated_at
         FROM users ORDER BY id DESC`,
        []
    );
}

export function findUserById(id: number): DbUser | null {
    const rows = sqlQuery<DbUser>(
        `SELECT *, last_login_at::text as last_login_at, created_at::text as created_at, updated_at::text as updated_at
         FROM users WHERE id = $1`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function findUserByEmail(email: string): DbUser | null {
    const rows = sqlQuery<DbUser>(
        `SELECT *, last_login_at::text as last_login_at, created_at::text as created_at, updated_at::text as updated_at
         FROM users WHERE email = $1`,
        [email]
    );
    return rows.length > 0 ? rows[0] : null;
}

export function insertUser(name: string, email: string, passwordHash: string, role: string, status: string): void {
    sqlQuery(
        `INSERT INTO users (name, email, password_hash, role, status) VALUES ($1, $2, $3, $4, $5)`,
        [name, email, passwordHash, role, status]
    );
}

export function updateUser(id: number, name: string, email: string, role: string, status: string): void {
    sqlQuery(
        `UPDATE users SET name = $1, email = $2, role = $3, status = $4, updated_at = NOW() WHERE id = $5`,
        [name, email, role, status, id]
    );
}

export function updateUserPassword(id: number, passwordHash: string): void {
    sqlQuery(
        `UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
        [passwordHash, id]
    );
}

export function deleteUser(id: number): void {
    sqlQuery("DELETE FROM users WHERE id = $1", [id]);
}

export function updateUserProfile(id: number, name: string, email: string): void {
    sqlQuery(
        `UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3`,
        [name, email, id]
    );
}

export function updateUserAvatar(id: number, avatarUrl: string | null): void {
    sqlQuery(
        `UPDATE users SET avatar_url = NULLIF($1, ''), updated_at = NOW() WHERE id = $2`,
        [avatarUrl !== null ? avatarUrl : '', id]
    );
}

export function countUsers(): { total: number; active: number; inactive: number; admins: number } {
    const rows = sqlQuery<{ total: number; active: number; inactive: number; admins: number }>(
        `SELECT
            COUNT(*)::float as total,
            COUNT(*) FILTER (WHERE status = 'active')::float as active,
            COUNT(*) FILTER (WHERE status = 'inactive')::float as inactive,
            COUNT(*) FILTER (WHERE role = 'admin')::float as admins
         FROM users`,
        []
    );
    return rows[0];
}
