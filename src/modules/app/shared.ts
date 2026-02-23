import { getSession } from "../../utils";
import { CZECH_DIACRITICS_REPLACEMENTS } from "./shared.const";
export { CZECH_DIACRITICS_REPLACEMENTS } from "./shared.const";

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
    const replacements = CZECH_DIACRITICS_REPLACEMENTS;
    for (let i = 0; i < replacements.length; i++) {
        s = replaceAll(s, replacements[i][0], replacements[i][1]);
    }
    s = replaceAll(s, ' ', '-');
    s = replaceAll(s, '_', '-');
    let slug = '';
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c === '-') {
            slug += c;
        }
    }
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
    if (cleaned.length > 0 && cleaned.charAt(cleaned.length - 1) === '-') {
        cleaned = cleaned.substring(0, cleaned.length - 1);
    }
    return cleaned;
}

export function formatDate(dateStr: string): string {
    if (!dateStr) return '-';
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
