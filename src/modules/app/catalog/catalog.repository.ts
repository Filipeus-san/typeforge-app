import { DbProduct, DbProductWithCategory, DbCategory, DbProductImage } from "../shared";

export function findAllProductsWithCategory(): DbProductWithCategory[] {
    return sqlQuery<DbProductWithCategory>(
        `SELECT p.*, p.price::float as price, p.old_price::float as old_price, c.name as category_name, c.slug as category_slug
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         ORDER BY p.created_at DESC`,
        []
    );
}

export function findActiveCategories(): DbCategory[] {
    return sqlQuery<DbCategory>("SELECT * FROM categories WHERE status = 'active' ORDER BY sort_order, name", []);
}

export function findProductById(id: number): DbProduct | null {
    const results = sqlQuery<DbProduct>("SELECT *, price::float as price, old_price::float as old_price FROM products WHERE id = $1 LIMIT 1", [id]);
    return results.length > 0 ? results[0] : null;
}

export function insertProduct(name: string, slug: string, shortDescription: string, description: string, categoryId: number, price: number, oldPrice: number, icon: string, stock: number, status: string, featuredImage: string): void {
    sqlQuery<DbProduct>(
        `INSERT INTO products (name, slug, short_description, description, category_id, price, old_price, icon, stock, status, featured_image)
         VALUES ($1, $2, $3, $4, NULLIF($5, 0), $6, NULLIF($7, 0), $8, $9, $10, NULLIF($11, ''))`,
        [name, slug, shortDescription, description, categoryId, price, oldPrice, icon, stock, status, featuredImage]
    );
}

export function findLastInsertedProduct(): DbProduct | null {
    const results = sqlQuery<DbProduct>("SELECT *, price::float as price, old_price::float as old_price FROM products ORDER BY id DESC LIMIT 1", []);
    return results.length > 0 ? results[0] : null;
}

export function updateProduct(id: number, name: string, slug: string, shortDescription: string, description: string, categoryId: number, price: number, oldPrice: number, icon: string, stock: number, status: string, featuredImage: string): void {
    sqlQuery<DbProduct>(
        `UPDATE products SET name = $1, slug = $2, short_description = $3, description = $4, category_id = NULLIF($5, 0), price = $6, old_price = NULLIF($7, 0), icon = $8, stock = $9, status = $10, featured_image = NULLIF($11, ''), updated_at = CURRENT_TIMESTAMP WHERE id = $12`,
        [name, slug, shortDescription, description, categoryId, price, oldPrice, icon, stock, status, featuredImage, id]
    );
}

export function deleteProduct(id: number): void {
    sqlQuery("DELETE FROM products WHERE id = $1", [id]);
}

export function findAllCategoriesWithProductCount(): (DbCategory & { product_count: number })[] {
    return sqlQuery<DbCategory & { product_count: number }>(
        `SELECT c.*, COALESCE((SELECT COUNT(*) FROM products p WHERE p.category_id = c.id), 0) as product_count
         FROM categories c
         ORDER BY c.sort_order, c.name`,
        []
    );
}

export function findCategoryById(id: number): DbCategory | null {
    const results = sqlQuery<DbCategory>("SELECT * FROM categories WHERE id = $1 LIMIT 1", [id]);
    return results.length > 0 ? results[0] : null;
}

export function insertCategory(name: string, slug: string, description: string, icon: string, status: string, sortOrder: number, featuredImage: string): void {
    sqlQuery<DbCategory>(
        `INSERT INTO categories (name, slug, description, icon, status, sort_order, featured_image)
         VALUES ($1, $2, $3, $4, $5, $6, NULLIF($7, ''))`,
        [name, slug, description, icon, status, sortOrder, featuredImage]
    );
}

export function updateCategory(id: number, name: string, slug: string, description: string, icon: string, status: string, sortOrder: number, featuredImage: string): void {
    sqlQuery<DbCategory>(
        `UPDATE categories SET name = $1, slug = $2, description = $3, icon = $4, status = $5, sort_order = $6, featured_image = NULLIF($7, ''), updated_at = CURRENT_TIMESTAMP WHERE id = $8`,
        [name, slug, description, icon, status, sortOrder, featuredImage, id]
    );
}

export function deleteCategory(id: number): void {
    sqlQuery("UPDATE products SET category_id = NULL WHERE category_id = $1", [id]);
    sqlQuery("DELETE FROM categories WHERE id = $1", [id]);
}

// =============================================================================
// Product Gallery
// =============================================================================

export function findProductImages(productId: number): DbProductImage[] {
    return sqlQuery<DbProductImage>(
        `SELECT id, product_id, storage_path, sort_order, created_at::text as created_at
         FROM product_images WHERE product_id = $1 ORDER BY sort_order, id`,
        [productId]
    );
}

export function insertProductImage(productId: number, storagePath: string, sortOrder: number): void {
    sqlQuery("INSERT INTO product_images (product_id, storage_path, sort_order) VALUES ($1, $2, $3)", [productId, storagePath, sortOrder]);
}

export function deleteProductImage(id: number): void {
    sqlQuery("DELETE FROM product_images WHERE id = $1", [id]);
}

export function deleteAllProductImages(productId: number): void {
    sqlQuery("DELETE FROM product_images WHERE product_id = $1", [productId]);
}

export function replaceProductImages(productId: number, storagePaths: string[]): void {
    sqlQuery("DELETE FROM product_images WHERE product_id = $1", [productId]);
    for (let i = 0; i < storagePaths.length; i++) {
        sqlQuery("INSERT INTO product_images (product_id, storage_path, sort_order) VALUES ($1, $2, $3)", [productId, storagePaths[i], i]);
    }
}
