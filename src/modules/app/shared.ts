import { getSession } from "../../utils";
import { CZECH_DIACRITICS_REPLACEMENTS, PRODUCT_STATUS_LABELS, PRODUCT_STATUS_VARIANTS, ORDER_STATUS_LABELS, ORDER_STATUS_VARIANTS, ProductStatus, OrderStatus } from "./shared.const";
export { ProductStatus, PRODUCT_STATUS_LABELS, PRODUCT_STATUS_VARIANTS, OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_VARIANTS, CZECH_DIACRITICS_REPLACEMENTS } from "./shared.const";

// =============================================================================
// Auth Types
// =============================================================================

export interface UserSession {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        isAdmin: boolean;
        token: string;
    };
}

export interface DbUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    is_admin: boolean;
    created_at: string;
}

// =============================================================================
// Product & Category Types
// =============================================================================

export interface DbCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    status: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface DbProduct {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    category_id: number | null;
    price: number;
    old_price: number | null;
    icon: string;
    stock: number;
    status: string;
    featured_image: string | null;
    created_at: string;
    updated_at: string;
}

export interface DbProductWithCategory extends DbProduct {
    category_name: string | null;
    category_slug: string | null;
}

export interface DbProductImage {
    id: number;
    product_id: number;
    storage_path: string;
    sort_order: number;
    created_at: string;
}

export function getProductStatusLabel(status: string): string {
    return PRODUCT_STATUS_LABELS[status as ProductStatus] ?? status;
}

export function getProductStatusVariant(status: string): 'success' | 'warning' | 'danger' | 'default' {
    return PRODUCT_STATUS_VARIANTS[status as ProductStatus] ?? 'default';
}

// =============================================================================
// Order Types
// =============================================================================

export interface DbOrder {
    id: number;
    order_number: string;
    customer_id: number | null;
    customer_id_ref: number | null;
    customer_name: string;
    customer_email: string;
    status: string;
    total_amount: number;
    shipping_address: string | null;
    billing_address: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface DbOrderItem {
    id: number;
    order_id: number;
    product_id: number | null;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    created_at: string;
}

export interface DbOrderWithItems extends DbOrder {
    items: DbOrderItem[];
}

// =============================================================================
// Shared Helpers
// =============================================================================

export function escapeJsString(str: string): string {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const c = str.charAt(i);
        if (c === "'") {
            result += "\\'";
        } else if (c === "\\") {
            result += "\\\\";
        } else if (c === "\n") {
            result += "\\n";
        } else if (c === "\r") {
            result += "\\r";
        } else {
            result += c;
        }
    }
    return result;
}

export function replaceAll(str: string, search: string, replacement: string): string {
    let result = str;
    while (result.indexOf(search) !== -1) {
        const idx = result.indexOf(search);
        result = result.substring(0, idx) + replacement + result.substring(idx + search.length);
    }
    return result;
}

export function generateSlug(text: string): string {
    let s = text.toLowerCase();
    // Czech diacritics - both lower and uppercase (toLowerCase may not work for non-ASCII in Lua)
    const replacements = CZECH_DIACRITICS_REPLACEMENTS;
    for (let i = 0; i < replacements.length; i++) {
        s = replaceAll(s, replacements[i][0], replacements[i][1]);
    }
    // Replace spaces and underscores with dashes
    s = replaceAll(s, ' ', '-');
    s = replaceAll(s, '_', '-');
    // Keep only a-z, 0-9, dash
    let slug = '';
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c === '-') {
            slug += c;
        }
    }
    // Remove consecutive dashes
    let cleaned = '';
    let lastDash = false;
    for (let i = 0; i < slug.length; i++) {
        if (slug.charAt(i) === '-') {
            if (!lastDash && cleaned.length > 0) {
                cleaned += '-';
                lastDash = true;
            }
        } else {
            cleaned += slug.charAt(i);
            lastDash = false;
        }
    }
    // Remove trailing dash
    if (cleaned.length > 0 && cleaned.charAt(cleaned.length - 1) === '-') {
        cleaned = cleaned.substring(0, cleaned.length - 1);
    }
    return cleaned;
}

export function formatOrderDate(dateStr: string): string {
    if (!dateStr) return '-';

    // PostgreSQL format: "2026-02-08 13:03:31.235111"
    // Extract date parts manually via substring
    if (dateStr.length >= 10) {
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(5, 7);
        const day = dateStr.substring(8, 10);
        const d = Number(day);
        const m = Number(month);
        if (d > 0 && m > 0) {
            return `${d}. ${m}. ${year}`;
        }
    }

    return '-';
}

export function formatPrice(amount: number | string): string {
    // Handle string input from PostgreSQL DECIMAL
    let num: number;
    if (typeof amount === 'string') {
        num = Number(amount);
    } else {
        num = amount;
    }

    // Handle NaN or undefined
    if (isNaN(num) || num === null || num === undefined) {
        num = 0;
    }

    const rounded = Math.round(num * 100) / 100;
    const str = String(rounded);

    // Manually split by decimal point without using split()
    let intPart = '';
    let decPart = '';
    let foundDot = false;
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        if (char === '.') {
            foundDot = true;
        } else if (foundDot) {
            decPart += char;
        } else {
            intPart += char;
        }
    }

    // Pad decimal part
    while (decPart.length < 2) {
        decPart += '0';
    }

    // Format integer part with spaces
    let formatted = '';
    for (let i = 0; i < intPart.length; i++) {
        if (i > 0 && (intPart.length - i) % 3 === 0) {
            formatted += ' ';
        }
        formatted += intPart.charAt(i);
    }
    return formatted + ',' + decPart + ' Kč';
}

export function getOrderStatusLabel(status: string): string {
    return ORDER_STATUS_LABELS[status as OrderStatus] ?? status;
}

export function getOrderStatusVariant(status: string): 'warning' | 'info' | 'primary' | 'success' | 'danger' | 'default' {
    return ORDER_STATUS_VARIANTS[status as OrderStatus] ?? 'default';
}

export function generateOrderNumber(): string {
    return 'ORD-' + uniqueKey().substring(0, 8).toUpperCase();
}

export function getCustomerInitials(fullName: string): string {
    if (!fullName) return '??';
    const parts: string[] = [];
    let current = '';
    for (let i = 0; i < fullName.length; i++) {
        const char = fullName[i];
        if (char === ' ') {
            if (current.length > 0) {
                parts.push(current);
                current = '';
            }
        } else {
            current += char;
        }
    }
    if (current.length > 0) {
        parts.push(current);
    }
    const first = parts[0]?.charAt(0)?.toUpperCase() ?? '';
    const last = parts[1]?.charAt(0)?.toUpperCase() ?? '';
    return first + last || first || '??';
}

// =============================================================================
// Customer Types
// =============================================================================

export interface DbCustomer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company: string;
    shipping_address: string;
    billing_address: string;
    notes: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export function getInitials(firstName: string, lastName: string): string {
    const f = firstName?.charAt(0)?.toUpperCase() ?? '';
    const l = lastName?.charAt(0)?.toUpperCase() ?? '';
    return f + l;
}

// =============================================================================
// Auth Helper
// =============================================================================

export function requireAdmin(request: Request, response: Response): { session: UserSession; response: Response } | null {
    const session = getSession<UserSession>(request);
    if (!session?.user) {
        response.status = 302;
        response.headers["Location"] = "/login";
        return null;
    }
    return { session, response };
}
