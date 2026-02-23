// =============================================================================
// Admin Misc — Constants
// =============================================================================

import { ADMIN_MISC_T } from "./admin-misc.translation";

export const SETTINGS_DEFAULTS: Record<string, string> = {
    site_name: "TypeForge App",
    site_description: "",
    contact_email: "info@typeforge.cz",
    currency: "czk",
    allow_registration: "1",
};

export const CURRENCY_OPTIONS = [
    { value: "czk", label: ADMIN_MISC_T.currency.czk },
    { value: "eur", label: ADMIN_MISC_T.currency.eur },
    { value: "usd", label: ADMIN_MISC_T.currency.usd },
];

export const USER_ROLE_FILTER_OPTIONS = [
    { value: '', label: ADMIN_MISC_T.roleFilters.allRoles },
    { value: 'admin', label: ADMIN_MISC_T.roleFilters.admins },
    { value: 'user', label: ADMIN_MISC_T.roleFilters.users }
];
