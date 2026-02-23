import { DbOrder, DbProduct, DbCustomer } from "../shared";

export function countOrders(): number {
    const result = sqlQuery<{ count: number }>("SELECT COUNT(*)::int as count FROM orders", []);
    return result.length > 0 ? result[0].count : 0;
}

export function sumRevenue(): number {
    const result = sqlQuery<{ total: number }>("SELECT COALESCE(SUM(total_amount), 0)::float as total FROM orders WHERE status != 'cancelled'", []);
    return result.length > 0 ? result[0].total : 0;
}

export function countCustomers(): number {
    const result = sqlQuery<{ count: number }>("SELECT COUNT(*)::int as count FROM customers", []);
    return result.length > 0 ? result[0].count : 0;
}

export function countProductsInStock(): number {
    const result = sqlQuery<{ count: number }>("SELECT COUNT(*)::int as count FROM products WHERE status = 'active' AND stock > 0", []);
    return result.length > 0 ? result[0].count : 0;
}

export function countLowStockProducts(): number {
    const result = sqlQuery<{ count: number }>("SELECT COUNT(*)::int as count FROM products WHERE status = 'active' AND stock > 0 AND stock <= 5", []);
    return result.length > 0 ? result[0].count : 0;
}

export function countPendingOrders(): number {
    const result = sqlQuery<{ count: number }>("SELECT COUNT(*)::int as count FROM orders WHERE status = 'pending'", []);
    return result.length > 0 ? result[0].count : 0;
}

export function findRecentOrders(limit: number): (DbOrder & { products: string })[] {
    return sqlQuery<DbOrder & { products: string }>(
        `SELECT o.id, o.order_number, o.customer_id, o.customer_id_ref, o.customer_name, o.customer_email,
            o.status, o.total_amount::float as total_amount, o.shipping_address, o.billing_address, o.notes,
            o.created_at::text as created_at, o.updated_at::text as updated_at,
            (SELECT string_agg(oi.product_name, ', ') FROM order_items oi WHERE oi.order_id = o.id) as products
         FROM orders o
         ORDER BY o.id DESC
         LIMIT ${limit}`,
        []
    );
}

export function findLowStockProducts(limit: number): DbProduct[] {
    return sqlQuery<DbProduct>(
        `SELECT id, name, slug, description, short_description, category_id,
            price::float as price, old_price::float as old_price,
            icon, stock, status,
            created_at::text as created_at, updated_at::text as updated_at
         FROM products
         WHERE status = 'active' AND stock > 0 AND stock <= 5
         ORDER BY stock ASC
         LIMIT ${limit}`,
        []
    );
}

export function findRecentCustomers(limit: number): DbCustomer[] {
    return sqlQuery<DbCustomer>(
        `SELECT id, first_name, last_name, email, phone, company, shipping_address, billing_address, notes, status,
            created_at::text as created_at, updated_at::text as updated_at
         FROM customers
         ORDER BY id DESC
         LIMIT ${limit}`,
        []
    );
}

export function avgOrderValue(): number {
    const result = sqlQuery<{ avg: number }>("SELECT COALESCE(AVG(total_amount), 0)::float as avg FROM orders WHERE status != 'cancelled'", []);
    return result.length > 0 ? result[0].avg : 0;
}

export function findOrdersByStatus(): { status: string; count: number; total: number }[] {
    return sqlQuery<{ status: string; count: number; total: number }>(
        "SELECT status, COUNT(*)::int as count, COALESCE(SUM(total_amount), 0)::float as total FROM orders GROUP BY status ORDER BY count DESC", []
    );
}

export function findTopProducts(limit: number): { product_name: string; total_qty: number; total_revenue: number }[] {
    return sqlQuery<{ product_name: string; total_qty: number; total_revenue: number }>(
        `SELECT oi.product_name, SUM(oi.quantity)::int as total_qty, SUM(oi.total_price)::float as total_revenue
         FROM order_items oi
         JOIN orders o ON o.id = oi.order_id
         WHERE o.status != 'cancelled'
         GROUP BY oi.product_name
         ORDER BY total_qty DESC
         LIMIT ${limit}`, []
    );
}

export function findRecentCustomersForAnalytics(limit: number): { id: number; first_name: string; last_name: string; email: string; created_at: string }[] {
    return sqlQuery<{ id: number; first_name: string; last_name: string; email: string; created_at: string }>(
        `SELECT id, first_name, last_name, email, created_at::text as created_at FROM customers ORDER BY id DESC LIMIT ${limit}`, []
    );
}

export function findStockOverview(limit: number): { name: string; stock: number; status: string }[] {
    return sqlQuery<{ name: string; stock: number; status: string }>(
        `SELECT name, stock, status FROM products ORDER BY stock ASC LIMIT ${limit}`, []
    );
}

export function findMonthlyRevenue(): { month: string; count: number; revenue: number }[] {
    return sqlQuery<{ month: string; count: number; revenue: number }>(
        `SELECT TO_CHAR(created_at, 'YYYY-MM') as month,
                COUNT(*)::int as count,
                COALESCE(SUM(total_amount), 0)::float as revenue
         FROM orders
         WHERE status != 'cancelled'
           AND created_at >= CURRENT_DATE - INTERVAL '6 months'
         GROUP BY TO_CHAR(created_at, 'YYYY-MM')
         ORDER BY month DESC`, []
    );
}
