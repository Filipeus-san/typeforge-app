import { DbOrder, DbOrderItem, DbProduct, DbCustomer } from "../shared";

export function findAllOrdersWithProducts(): (DbOrder & { products: string })[] {
    return sqlQuery<DbOrder & { products: string }>(
        `SELECT o.*, o.total_amount::float as total_amount,
            o.created_at::text as created_at, o.updated_at::text as updated_at,
            (SELECT string_agg(oi.product_name, ', ') FROM order_items oi WHERE oi.order_id = o.id) as products
         FROM orders o
         ORDER BY o.created_at DESC`,
        []
    );
}

export function findOrderById(id: number): DbOrder | null {
    const results = sqlQuery<DbOrder>("SELECT *, total_amount::float as total_amount, created_at::text as created_at, updated_at::text as updated_at FROM orders WHERE id = $1 LIMIT 1", [id]);
    return results.length > 0 ? results[0] : null;
}

export function findOrderItems(orderId: number): DbOrderItem[] {
    return sqlQuery<DbOrderItem>("SELECT *, unit_price::float as unit_price, total_price::float as total_price FROM order_items WHERE order_id = $1 ORDER BY id", [orderId]);
}

export function findActiveProductsForForm(): DbProduct[] {
    return sqlQuery<DbProduct>("SELECT *, price::float as price, old_price::float as old_price FROM products WHERE status = 'active' ORDER BY name", []);
}

export function findActiveCustomersForForm(): DbCustomer[] {
    return sqlQuery<DbCustomer>("SELECT *, created_at::text as created_at, updated_at::text as updated_at FROM customers WHERE status = 'active' ORDER BY last_name, first_name", []);
}

export function insertOrder(orderNumber: string, customerName: string, customerEmail: string, shippingAddress: string | null, notes: string | null, status: string, totalAmount: number, customerIdRef: number): { id: number }[] {
    return sqlQuery<{ id: number }>(
        `INSERT INTO orders (order_number, customer_name, customer_email, shipping_address, notes, status, total_amount, customer_id_ref)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NULLIF($8, 0)) RETURNING id`,
        [orderNumber, customerName, customerEmail, shippingAddress, notes, status, totalAmount, customerIdRef]
    );
}

export function insertOrderItem(orderId: number, productId: number, productName: string, quantity: number, unitPrice: number, totalPrice: number): void {
    sqlQuery(
        `INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price) VALUES ($1, NULLIF($2, 0), $3, $4, $5, $6)`,
        [orderId, productId, productName, quantity, unitPrice, totalPrice]
    );
}

export function updateOrder(id: number, customerName: string, customerEmail: string, shippingAddress: string | null, notes: string | null, status: string, totalAmount: number, customerIdRef: number): void {
    sqlQuery<DbOrder>(
        `UPDATE orders SET customer_name = $1, customer_email = $2, shipping_address = $3, notes = $4, status = $5, total_amount = $6, customer_id_ref = NULLIF($7, 0), updated_at = CURRENT_TIMESTAMP WHERE id = $8`,
        [customerName, customerEmail, shippingAddress, notes, status, totalAmount, customerIdRef, id]
    );
}

export function deleteOrderItems(orderId: number): void {
    sqlQuery("DELETE FROM order_items WHERE order_id = $1", [orderId]);
}
