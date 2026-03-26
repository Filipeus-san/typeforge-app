import { getSession, setSession, FlashMessage, SessionData } from "../../utils";
import { findAllMenuItems, getSettingsMap } from "./auth/auth.repository";
import { setLanguage, Language } from "../../i18n";

// ---- Database Row Types ----

export interface DbUser {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: string;
    status: string;
    avatar_url: string | null;
    last_login_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface DbPage {
    id: number;
    title: string;
    slug: string;
    content: string;
    status: string;
    author_id: number | null;
    sort_order: number;
    meta_title: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
}

export interface DbPageWithAuthor extends DbPage {
    author_name: string | null;
}

export interface DbMedia {
    id: number;
    name: string;
    storage_path: string;
    url: string;
    mime_type: string;
    file_size: number;
    width: number | null;
    height: number | null;
    uploaded_by: number | null;
    created_at: string;
}

export interface DbBlogCategory {
    id: number;
    name: string;
    slug: string;
    sort_order: number;
    created_at: string;
}

export interface DbArticle {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    author_id: number | null;
    category_id: number | null;
    status: string;
    thumbnail_id: number | null;
    read_time: number;
    views: number;
    meta_title: string | null;
    meta_description: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface DbArticleWithAuthor extends DbArticle {
    author_name: string | null;
    category_name: string | null;
    thumbnail_url: string | null;
}

export interface DbMenuItem {
    id: number;
    label: string;
    url: string;
    target: string;
    parent_id: number | null;
    sort_order: number;
    visible: boolean;
    created_at: string;
    updated_at: string;
}

export interface DbSetting {
    id: number;
    key: string;
    value: string | null;
    updated_at: string;
}

export interface DbPageView {
    id: number;
    path: string;
    ip_hash: string | null;
    user_agent: string | null;
    referrer: string | null;
    viewed_at: string;
}

export interface DbRedirect {
    id: number;
    source_path: string;
    target_url: string;
    type: string;
    status_code: number;
    is_active: boolean;
    sort_order: number;
    note: string | null;
    created_at: string;
    updated_at: string;
}

// ---- Current User Info (for React sidebar avatar) ----

export interface CurrentUserInfo {
    name: string;
    avatarUrl: string | null;
}

let _currentUserInfo: CurrentUserInfo | null = null;

export function getCurrentUserInfo(): CurrentUserInfo | null {
    return _currentUserInfo;
}

function loadCurrentUserInfo(userId: number): void {
    const rows = sqlQuery<{ name: string; avatar_url: string | null }>(
        `SELECT name, avatar_url FROM users WHERE id = $1`,
        [userId]
    );
    if (rows.length > 0) {
        _currentUserInfo = { name: rows[0].name, avatarUrl: rows[0].avatar_url };
    } else {
        _currentUserInfo = null;
    }
}

// ---- Language Initialization ----

export function initializeLanguage(): void {
    const settings = getSettingsMap();
    const lang = settings['language'];
    if (lang === 'cs' || lang === 'en') {
        setLanguage(lang as Language);
    } else {
        setLanguage('en');
    }
}

// ---- Auth Helpers ----

export function requireAdmin(request: Request, response: Response): { userId: number; email: string; flash?: FlashMessage } | null {
    const session = getSession(request);
    if (session === null) {
        response.status = 302;
        response.headers["Location"] = "/admin/login";
        return null;
    }
    if (session.role !== 'admin' && session.role !== 'editor') {
        response.status = 302;
        response.headers["Location"] = "/admin/login";
        return null;
    }

    // Initialize language from settings
    initializeLanguage();

    // Load current user info for sidebar avatar
    loadCurrentUserInfo(session.userId);

    // Consume flash message if present
    let flash: FlashMessage | undefined;
    if (session.flash !== undefined && session.flash !== null) {
        flash = session.flash;
        const cleanSession: SessionData = {
            userId: session.userId,
            email: session.email,
            role: session.role,
            token: session.token,
        };
        setSession(cleanSession, response);
    }

    return { userId: session.userId, email: session.email, flash };
}

export function requireAuth(request: Request, response: Response): { userId: number; email: string; role: string } | null {
    const session = getSession(request);
    if (session === null) {
        response.status = 302;
        response.headers["Location"] = "/admin/login";
        return null;
    }

    // Initialize language from settings
    initializeLanguage();

    // Load current user info for sidebar avatar
    loadCurrentUserInfo(session.userId);

    return { userId: session.userId, email: session.email, role: session.role };
}

// ---- Formatters ----

export function formatDateCz(isoDateStr: string): string {
    if (isoDateStr === undefined || isoDateStr === null || isoDateStr === '') return '-';
    // Expected format: "2026-02-26 14:30:00" or "2026-02-26T14:30:00"
    const datePart = stringSplit(isoDateStr, " ")[0];
    const parts = stringSplit(datePart, "-");
    if (parts.length < 3) return isoDateStr;
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    // Remove leading zeros
    const dayNum = String(Number(day));
    const monthNum = String(Number(month));
    return dayNum + ". " + monthNum + ". " + year;
}

export function generateSlug(text: string): string {
    return slugify(text);
}

// ---- Menu Helpers ----

export function getVisibleMenuItems(): Array<{ label: string; url: string; target: string; children?: Array<{ label: string; url: string; target: string }> }> {
    const items = findAllMenuItems();
    const topLevel = items.filter(m => m.visible && m.parent_id === null);
    return topLevel.map(m => {
        const children = items.filter(c => c.visible && c.parent_id === m.id);
        const result: { label: string; url: string; target: string; children?: Array<{ label: string; url: string; target: string }> } = {
            label: m.label,
            url: m.url,
            target: m.target,
        };
        if (children.length > 0) {
            result.children = children.map(c => ({
                label: c.label,
                url: c.url,
                target: c.target,
            }));
        }
        return result;
    });
}

// ---- Site Settings Helpers ----

export interface SiteSettings {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    contactEmail: string;
}

export function getSiteSettings(): SiteSettings {
    const map = getSettingsMap();
    return {
        siteName: map['siteName'] !== undefined && map['siteName'] !== '' ? map['siteName'] : 'Lorem',
        siteDescription: map['siteDescription'] !== undefined && map['siteDescription'] !== '' ? map['siteDescription'] : '',
        siteUrl: map['siteUrl'] !== undefined && map['siteUrl'] !== '' ? map['siteUrl'] : '',
        contactEmail: map['contactEmail'] !== undefined && map['contactEmail'] !== '' ? map['contactEmail'] : '',
    };
}
