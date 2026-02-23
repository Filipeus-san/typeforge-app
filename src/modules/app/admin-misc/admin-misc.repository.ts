import { DbUser } from "../shared";
import { DbSetting } from "./admin-misc.types";

export function findAllUsers(): DbUser[] {
    return sqlQuery<DbUser>(
        `SELECT id, first_name, last_name, email, is_admin, created_at::text as created_at
         FROM users
         ORDER BY id DESC`,
        []
    );
}

export function findUserById(id: number): DbUser | null {
    const results = sqlQuery<DbUser>("SELECT id, first_name, last_name, email, password_hash, is_admin, created_at::text as created_at FROM users WHERE id = $1 LIMIT 1", [id]);
    return results.length > 0 ? results[0] : null;
}

export function findUserByEmail(email: string): DbUser | null {
    const results = sqlQuery<DbUser>("SELECT id FROM users WHERE email = $1 LIMIT 1", [email]);
    return results.length > 0 ? results[0] : null;
}

export function findUserByEmailExcluding(email: string, excludeId: number): DbUser | null {
    const results = sqlQuery<DbUser>("SELECT id FROM users WHERE email = $1 AND id != $2 LIMIT 1", [email, excludeId]);
    return results.length > 0 ? results[0] : null;
}

export function insertUser(firstName: string, lastName: string, email: string, passwordHash: string, isAdmin: boolean): void {
    sqlQuery<DbUser>(
        `INSERT INTO users (first_name, last_name, email, password_hash, is_admin)
         VALUES ($1, $2, $3, $4, $5)`,
        [firstName, lastName, email, passwordHash, isAdmin]
    );
}

export function updateUserWithPassword(id: number, firstName: string, lastName: string, email: string, passwordHash: string, isAdmin: boolean): void {
    sqlQuery<DbUser>(
        `UPDATE users SET first_name = $1, last_name = $2, email = $3, password_hash = $4, is_admin = $5 WHERE id = $6`,
        [firstName, lastName, email, passwordHash, isAdmin, id]
    );
}

export function updateUserWithoutPassword(id: number, firstName: string, lastName: string, email: string, isAdmin: boolean): void {
    sqlQuery<DbUser>(
        `UPDATE users SET first_name = $1, last_name = $2, email = $3, is_admin = $4 WHERE id = $5`,
        [firstName, lastName, email, isAdmin, id]
    );
}

export function deleteUser(id: number): void {
    sqlQuery<DbUser>("DELETE FROM users WHERE id = $1", [id]);
}

export function findUserExists(id: number): boolean {
    const results = sqlQuery<DbUser>("SELECT id FROM users WHERE id = $1 LIMIT 1", [id]);
    return results.length > 0;
}

export function findAllSettings(): DbSetting[] {
    return sqlQuery<DbSetting>("SELECT key, value FROM settings", []);
}

export function upsertSetting(key: string, value: string): void {
    sqlQuery("INSERT INTO settings (key, value, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP", [key, value]);
}
