export const seed001Users: Seed = {
    version: 1,
    name: "seed_users",
    up: "",
    run: () => {
        // Admin user
        const adminHash = hashPassword("admin123");
        sqlQuery(
            `INSERT INTO users (name, email, password_hash, role, status)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (email) DO NOTHING`,
            ["Admin", "admin@example.com", adminHash, "admin", "active"]
        );

        // Editor user
        const editorHash = hashPassword("editor123");
        sqlQuery(
            `INSERT INTO users (name, email, password_hash, role, status)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (email) DO NOTHING`,
            ["Editor", "editor@example.com", editorHash, "editor", "active"]
        );

        // Regular user
        const userHash = hashPassword("user123");
        sqlQuery(
            `INSERT INTO users (name, email, password_hash, role, status)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (email) DO NOTHING`,
            ["Jan Novák", "jan@example.com", userHash, "user", "active"]
        );
    }
};
