import { CustomerStatus, CUSTOMER_STATUS_LABELS, CUSTOMER_STATUS_VARIANTS } from "./customers.types";

export function getCustomerStatusLabel(status: string): string {
    return CUSTOMER_STATUS_LABELS[status as CustomerStatus] ?? status;
}

export function getCustomerStatusVariant(status: string): 'success' | 'warning' | 'default' {
    return CUSTOMER_STATUS_VARIANTS[status as CustomerStatus] ?? 'default';
}
