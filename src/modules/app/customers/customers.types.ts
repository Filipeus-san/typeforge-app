import { DbCustomer } from "../shared";

// =============================================================================
// Customer Types
// =============================================================================

export interface DbCustomerWithStats extends DbCustomer {
    order_count: number;
    total_spent: number;
}

export { CustomerStatus, CUSTOMER_STATUS_LABELS, CUSTOMER_STATUS_VARIANTS } from "./customers.const";
