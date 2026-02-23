import { DbUser } from "../shared";

export function findUserByEmail(email: string): DbUser | null {
    const results = sqlQuery<DbUser>("SELECT * FROM users WHERE email = $1 LIMIT 1", [email]);
    return results.length > 0 ? results[0] : null;
}

export function findUserIdByEmail(email: string): boolean {
    const results = sqlQuery<DbUser>("SELECT id FROM users WHERE email = $1 LIMIT 1", [email]);
    return results.length > 0;
}

export function insertUser(firstName: string, lastName: string, email: string, passwordHash: string): DbUser | null {
    const results = sqlQuery<DbUser>(
        "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
        [firstName, lastName, email, passwordHash]
    );
    return results.length > 0 ? results[0] : null;
}
