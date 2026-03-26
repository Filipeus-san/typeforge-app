export const seed007EnsureAdmin: Seed = {
    version: 7,
    name: "ensure_admin_user",
    up: "",
    run: () => {
        const existing = sqlQuery<{ id: number }>(
            "SELECT id FROM users WHERE email = $1",
            ["admin@example.com"]
        );
        if (existing.length === 0) {
            const adminHash = hashPassword("admin123");
            sqlQuery(
                `INSERT INTO users (name, email, password_hash, role, status)
                 VALUES ($1, $2, $3, $4, $5)`,
                ["Admin", "admin@example.com", adminHash, "admin", "active"]
            );
        }
    }
};
