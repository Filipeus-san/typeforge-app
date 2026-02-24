import { DbCustomer, DbOrder } from "../shared";
import { DbCustomerWithStats } from "./customers.types";

export function findAllCustomersWithStats(): DbCustomerWithStats[] {
    return sqlQuery<DbCustomerWithStats>(
        `SELECT c.*,
            c.created_at::text as created_at, c.updated_at::text as updated_at,
            COALESCE(stats.order_count, 0)::float as order_count,
            COALESCE(stats.total_spent, 0)::float as total_spent
         FROM customers c
         LEFT JOIN (
            SELECT customer_id_ref,
                COUNT(*)::float as order_count,
                COALESCE(SUM(total_amount), 0)::float as total_spent
            FROM orders
            WHERE customer_id_ref IS NOT NULL
            GROUP BY customer_id_ref
         ) stats ON stats.customer_id_ref = c.id
         ORDER BY c.created_at DESC`,
        []
    );
}

export function findCustomerById(id: number): DbCustomer | null {
    const results = sqlQuery<DbCustomer>(
        "SELECT *, created_at::text as created_at, updated_at::text as updated_at FROM customers WHERE id = $1 LIMIT 1",
        [id]
    );
    return results.length > 0 ? results[0] : null;
}

export function findOrdersByCustomerId(customerId: number): DbOrder[] {
    return sqlQuery<DbOrder>(
        `SELECT *, total_amount::float as total_amount,
            orders.created_at::text as created_at, orders.updated_at::text as updated_at
         FROM orders
         WHERE customer_id_ref = $1
         ORDER BY orders.created_at DESC`,
        [customerId]
    );
}

export function findCustomerByEmail(email: string): DbCustomer | null {
    const results = sqlQuery<DbCustomer>("SELECT id FROM customers WHERE email = $1 LIMIT 1", [email]);
    return results.length > 0 ? results[0] : null;
}

export function findCustomerByEmailExcluding(email: string, excludeId: number): DbCustomer | null {
    const results = sqlQuery<DbCustomer>("SELECT id FROM customers WHERE email = $1 AND id != $2 LIMIT 1", [email, excludeId]);
    return results.length > 0 ? results[0] : null;
}

export function insertCustomer(firstName: string, lastName: string, email: string, phone: string, company: string, shippingAddress: string, billingAddress: string, notes: string, status: string): void {
    sqlQuery(
        `INSERT INTO customers (first_name, last_name, email, phone, company, shipping_address, billing_address, notes, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [firstName, lastName, email, phone, company, shippingAddress, billingAddress, notes, status]
    );
}

export function updateCustomer(id: number, firstName: string, lastName: string, email: string, phone: string, company: string, shippingAddress: string, billingAddress: string, notes: string, status: string): void {
    sqlQuery(
        `UPDATE customers SET first_name = $1, last_name = $2, email = $3, phone = $4, company = $5, shipping_address = $6, billing_address = $7, notes = $8, status = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10`,
        [firstName, lastName, email, phone, company, shippingAddress, billingAddress, notes, status, id]
    );
}

export function deleteCustomer(id: number): void {
    sqlQuery("UPDATE orders SET customer_id_ref = NULL WHERE customer_id_ref = $1", [id]);
    sqlQuery("DELETE FROM customers WHERE id = $1", [id]);
}
