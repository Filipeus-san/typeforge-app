export interface DbCartItem {
    id: number;
    session_id: string;
    product_id: number;
    quantity: number;
    product_name: string;
    product_slug: string;
    product_price: number;
    product_old_price: number | null;
    product_icon: string;
    product_featured_image: string | null;
    category_name: string | null;
}

export function findCartItems(sessionId: string): DbCartItem[] {
    return sqlQuery<DbCartItem>(
        `SELECT ci.id, ci.session_id, ci.product_id, ci.quantity,
                p.name as product_name, p.slug as product_slug,
                p.price::float as product_price, p.old_price::float as product_old_price,
                p.icon as product_icon, p.featured_image as product_featured_image,
                c.name as category_name
         FROM cart_items ci
         JOIN products p ON p.id = ci.product_id
         LEFT JOIN categories c ON c.id = p.category_id
         WHERE ci.session_id = $1
         ORDER BY ci.created_at ASC`,
        [sessionId]
    );
}

export function addCartItem(sessionId: string, productId: number, quantity: number): void {
    const qty = (quantity > 0) ? quantity : 1;
    // Check if item already exists
    const existing = sqlQuery<{ quantity: number }>(
        `SELECT quantity FROM cart_items WHERE session_id = $1 AND product_id = $2`,
        [sessionId, productId]
    );
    if (existing.length > 0) {
        // Update existing item
        const newQty = existing[0].quantity + qty;
        sqlQuery(
            `UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE session_id = $2 AND product_id = $3`,
            [newQty, sessionId, productId]
        );
    } else {
        // Insert new item
        sqlQuery(
            `INSERT INTO cart_items (session_id, product_id, quantity) VALUES ($1, $2, $3)`,
            [sessionId, productId, qty]
        );
    }
}

export function updateCartItemQuantity(sessionId: string, productId: number, quantity: number): void {
    if (quantity <= 0) {
        removeCartItem(sessionId, productId);
        return;
    }
    sqlQuery(
        `UPDATE cart_items SET quantity = $3, updated_at = CURRENT_TIMESTAMP
         WHERE session_id = $1 AND product_id = $2`,
        [sessionId, productId, quantity]
    );
}

export function removeCartItem(sessionId: string, productId: number): void {
    sqlQuery(
        `DELETE FROM cart_items WHERE session_id = $1 AND product_id = $2`,
        [sessionId, productId]
    );
}

export function clearCart(sessionId: string): void {
    sqlQuery(
        `DELETE FROM cart_items WHERE session_id = $1`,
        [sessionId]
    );
}

export function getCartItemCount(sessionId: string): number {
    const rows = sqlQuery<{ count: number }>(
        `SELECT COALESCE(SUM(quantity), 0)::int as count FROM cart_items WHERE session_id = $1`,
        [sessionId]
    );
    return rows.length > 0 ? rows[0].count : 0;
}
