/**
 * Automatic database migration system for TypeForge
 *
 * Migrations are stored in the config and tracked via _migrations table.
 * Each migration runs once and is recorded with its version number.
 */

const MIGRATIONS_TABLE = "_migrations";

interface MigrationRecord {
    version: number;
    name: string;
    applied_at: string;
}

/**
 * Ensures the migrations tracking table exists
 */
function ensureMigrationsTable(): void {
    sqlQuery(`
        CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
            version INTEGER PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `, []);
}

/**
 * Gets all applied migration versions
 */
function getAppliedMigrations(): number[] {
    const rows = sqlQuery<MigrationRecord>(
        `SELECT version FROM ${MIGRATIONS_TABLE} ORDER BY version`,
        []
    );
    return rows.map(row => row.version);
}

/**
 * Records a migration as applied
 */
function recordMigration(version: number, name: string): void {
    sqlQuery(
        `INSERT INTO ${MIGRATIONS_TABLE} (version, name) VALUES ($1, $2)`,
        [version, name]
    );
}

/**
 * Runs all pending migrations from the config
 * Should be called once at application startup (via init hook)
 *
 * @param migrations - Array of migrations from config
 * @returns Number of migrations applied
 */
export function runMigrations(migrations: Migration[] | undefined): number {
    if (!migrations || migrations.length === 0) {
        return 0;
    }

    // Ensure migrations table exists
    ensureMigrationsTable();

    // Get already applied migrations
    const appliedVersions = new Set(getAppliedMigrations());

    // Sort migrations by version
    const sortedMigrations = [...migrations].sort((a, b) => a.version - b.version);

    let appliedCount = 0;

    for (const migration of sortedMigrations) {
        if (appliedVersions.has(migration.version)) {
            continue; // Already applied
        }

        logInfo(`Running migration ${migration.version}: ${migration.name}`);

        try {
            // Execute the migration SQL
            sqlQuery(migration.up, []);

            // Record the migration
            recordMigration(migration.version, migration.name);

            appliedCount++;
            logInfo(`Migration ${migration.version} applied successfully`);
        } catch (error) {
            logError(`Migration ${migration.version} failed`, error);
            throw error; // Stop on first failure
        }
    }

    if (appliedCount > 0) {
        logInfo(`Migrations complete: ${appliedCount} applied`);
    }

    return appliedCount;
}

/**
 * Gets the current migration status
 * @returns Object with applied migrations and pending count
 */
export function getMigrationStatus(migrations: Migration[] | undefined): {
    applied: MigrationRecord[];
    pending: Migration[];
} {
    if (!migrations || migrations.length === 0) {
        return { applied: [], pending: [] };
    }

    ensureMigrationsTable();

    const applied = sqlQuery<MigrationRecord>(
        `SELECT version, name, applied_at FROM ${MIGRATIONS_TABLE} ORDER BY version`,
        []
    );

    const appliedVersions = new Set(applied.map(m => m.version));
    const pending = migrations.filter(m => !appliedVersions.has(m.version));

    return { applied, pending };
}
