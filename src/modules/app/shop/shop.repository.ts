import { DbProductWithCategory, DbCategory } from "../shared";

export function findFeaturedProducts(): DbProductWithCategory[] {
    return sqlQuery<DbProductWithCategory>(
        `SELECT p.*, p.price::float as price, p.old_price::float as old_price, c.name as category_name, c.slug as category_slug
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.status = 'active'
         ORDER BY p.created_at DESC
         LIMIT 8`,
        []
    );
}

export function findActiveCategoriesWithCount(): (DbCategory & { product_count: number })[] {
    return sqlQuery<DbCategory & { product_count: number }>(
        `SELECT c.*, COALESCE((SELECT COUNT(*) FROM products p WHERE p.category_id = c.id AND p.status = 'active'), 0) as product_count
         FROM categories c
         WHERE c.status = 'active'
         ORDER BY c.sort_order, c.name`,
        []
    );
}

export function findProductBySlug(slug: string): DbProductWithCategory | null {
    const results = sqlQuery<DbProductWithCategory>(
        `SELECT p.*, p.price::float as price, p.old_price::float as old_price, c.name as category_name, c.slug as category_slug
         FROM products p LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.slug = $1 LIMIT 1`,
        [slug]
    );
    return results.length > 0 ? results[0] : null;
}

export function findProductById(id: number): DbProductWithCategory | null {
    const results = sqlQuery<DbProductWithCategory>(
        `SELECT p.*, p.price::float as price, p.old_price::float as old_price, c.name as category_name, c.slug as category_slug
         FROM products p LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.id = $1 LIMIT 1`,
        [id]
    );
    return results.length > 0 ? results[0] : null;
}

export function findActiveCategoryBySlug(slug: string): DbCategory | null {
    const results = sqlQuery<DbCategory>("SELECT * FROM categories WHERE slug = $1 AND status = 'active' LIMIT 1", [slug]);
    return results.length > 0 ? results[0] : null;
}

export function findActiveProductsByCategory(categoryId: number): DbProductWithCategory[] {
    return sqlQuery<DbProductWithCategory>(
        `SELECT p.*, p.price::float as price, p.old_price::float as old_price, c.name as category_name, c.slug as category_slug
         FROM products p LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.category_id = $1 AND p.status = 'active'
         ORDER BY p.created_at DESC`,
        [categoryId]
    );
}

export function findAllActiveProducts(): DbProductWithCategory[] {
    return sqlQuery<DbProductWithCategory>(
        `SELECT p.*, p.price::float as price, p.old_price::float as old_price, c.name as category_name, c.slug as category_slug
         FROM products p LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.status = 'active'
         ORDER BY p.created_at DESC`,
        []
    );
}
