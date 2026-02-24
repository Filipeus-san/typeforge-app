// =============================================================================
// Admin Misc — Constants
// =============================================================================

import { ADMIN_MISC_T } from "./admin-misc.translation";

export const SETTINGS_DEFAULTS: Record<string, string> = {
    site_name: "TypeForge E-Shop",
    site_description: "Kvalitní produkty za skvělé ceny. Elektronika, móda a další.",
    contact_email: "info@typeforge.cz",
    currency: "czk",
    allow_registration: "1",
    allow_guest_checkout: "1",
    require_email_verification: "0",
    show_product_ratings: "1",
    free_shipping_threshold: "1500",
    default_shipping_cost: "99",
    payment_card: "1",
    payment_cod: "1",
    payment_bank_transfer: "1",
};

export const CURRENCY_OPTIONS = [
    { value: "czk", label: ADMIN_MISC_T.currency.czk },
    { value: "eur", label: ADMIN_MISC_T.currency.eur },
    { value: "usd", label: ADMIN_MISC_T.currency.usd },
];

export const STATIC_PAGES = [
    { name: ADMIN_MISC_T.staticPages.home, url: '/', status: 'success', statusText: ADMIN_MISC_T.statuses.published, date: '3. 2. 2026' },
    { name: ADMIN_MISC_T.staticPages.eshop, url: '/eshop', status: 'success', statusText: ADMIN_MISC_T.statuses.published, date: '3. 2. 2026' },
    { name: ADMIN_MISC_T.staticPages.login, url: '/login', status: 'success', statusText: ADMIN_MISC_T.statuses.published, date: '2. 2. 2026' },
    { name: ADMIN_MISC_T.staticPages.about, url: '/about', status: 'warning', statusText: ADMIN_MISC_T.statuses.draft, date: '1. 2. 2026' },
    { name: ADMIN_MISC_T.staticPages.contact, url: '/contact', status: 'warning', statusText: ADMIN_MISC_T.statuses.draft, date: '28. 1. 2026' }
];

export const STATIC_ARTICLES = [
    { title: 'Lorem Ipsum Dolor Sit Amet Consectetur', author: 'TypeForge Team', category: 'Novinky', status: 'success', statusText: ADMIN_MISC_T.statuses.published, date: '3. 2. 2026' },
    { title: 'Nová kolekce elektroniky 2026', author: 'Jan Novák', category: 'E-Shop', status: 'success', statusText: ADMIN_MISC_T.statuses.published, date: '1. 2. 2026' },
    { title: 'Jak vybrat správné chytré hodinky', author: 'Marie Nová', category: 'Návody', status: 'warning', statusText: ADMIN_MISC_T.statuses.draft, date: '28. 1. 2026' }
];

export const USER_ROLE_FILTER_OPTIONS = [
    { value: '', label: ADMIN_MISC_T.roleFilters.allRoles },
    { value: 'admin', label: ADMIN_MISC_T.roleFilters.admins },
    { value: 'user', label: ADMIN_MISC_T.roleFilters.users }
];
