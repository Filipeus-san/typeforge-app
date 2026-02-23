import { DbTranslation, DbTranslationRow } from "./translations.types";

export function findAllTranslationsGrouped(): DbTranslationRow[] {
    return sqlQuery<DbTranslationRow>(
        `SELECT DISTINCT ON (t.entity_type, t.entity_id, t.language)
            t.id, t.entity_type, t.entity_id, t.language,
            t.field_name, t.field_value,
            t.created_at::text as created_at, t.updated_at::text as updated_at,
            CASE
                WHEN t.entity_type = 'product' THEN p.name
                WHEN t.entity_type = 'blog_post' THEN b.title
                WHEN t.entity_type = 'category' THEN c.name
                ELSE 'Neznámé'
            END as entity_name
         FROM translations t
         LEFT JOIN products p ON t.entity_type = 'product' AND t.entity_id = p.id
         LEFT JOIN blog_posts b ON t.entity_type = 'blog_post' AND t.entity_id = b.id
         LEFT JOIN categories c ON t.entity_type = 'category' AND t.entity_id = c.id
         ORDER BY t.entity_type, t.entity_id, t.language, t.updated_at DESC`,
        []
    );
}

export function findTranslationsByEntityAndLanguage(entityType: string, entityId: number, language: string): DbTranslation[] {
    return sqlQuery<DbTranslation>(
        `SELECT *, created_at::text as created_at, updated_at::text as updated_at
         FROM translations
         WHERE entity_type = $1 AND entity_id = $2 AND language = $3
         ORDER BY field_name`,
        [entityType, entityId, language]
    );
}

export function upsertTranslation(entityType: string, entityId: number, language: string, fieldName: string, fieldValue: string): void {
    sqlQuery(
        `INSERT INTO translations (entity_type, entity_id, language, field_name, field_value)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (entity_type, entity_id, language, field_name)
         DO UPDATE SET field_value = $5, updated_at = CURRENT_TIMESTAMP`,
        [entityType, entityId, language, fieldName, fieldValue]
    );
}

export function deleteTranslationsByEntityAndLanguage(entityType: string, entityId: number, language: string): void {
    sqlQuery("DELETE FROM translations WHERE entity_type = $1 AND entity_id = $2 AND language = $3", [entityType, entityId, language]);
}

export function getEntitiesByType(entityType: string): Array<{ id: number; name: string }> {
    if (entityType === 'product') {
        return sqlQuery<{ id: number; name: string }>(
            "SELECT id, name FROM products ORDER BY name", []
        );
    } else if (entityType === 'blog_post') {
        return sqlQuery<{ id: number; name: string }>(
            "SELECT id, title as name FROM blog_posts ORDER BY title", []
        );
    } else if (entityType === 'category') {
        return sqlQuery<{ id: number; name: string }>(
            "SELECT id, name FROM categories ORDER BY name", []
        );
    }
    return [];
}

export function countTranslationFields(entityType: string, entityId: number, language: string): number {
    const result = sqlQuery<{ cnt: number }>(
        "SELECT COUNT(*)::int as cnt FROM translations WHERE entity_type = $1 AND entity_id = $2 AND language = $3",
        [entityType, entityId, language]
    );
    return result.length > 0 ? result[0].cnt : 0;
}

export function getEntityOriginalFields(entityType: string, entityId: number): Record<string, string> {
    if (entityType === 'product') {
        const rows = sqlQuery<{ name: string; short_description: string; description: string }>(
            "SELECT name, short_description, description FROM products WHERE id = $1 LIMIT 1", [entityId]
        );
        if (rows.length > 0) {
            return { name: rows[0].name, short_description: rows[0].short_description, description: rows[0].description };
        }
    } else if (entityType === 'blog_post') {
        const rows = sqlQuery<{ title: string; excerpt: string; content: string }>(
            "SELECT title, excerpt, content FROM blog_posts WHERE id = $1 LIMIT 1", [entityId]
        );
        if (rows.length > 0) {
            return { title: rows[0].title, excerpt: rows[0].excerpt, content: rows[0].content };
        }
    } else if (entityType === 'category') {
        const rows = sqlQuery<{ name: string; description: string }>(
            "SELECT name, description FROM categories WHERE id = $1 LIMIT 1", [entityId]
        );
        if (rows.length > 0) {
            return { name: rows[0].name, description: rows[0].description };
        }
    }
    return {};
}
