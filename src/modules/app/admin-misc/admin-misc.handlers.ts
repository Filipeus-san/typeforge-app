import { getHtmlTemplate } from "../../../template";
import { AdminLayout, CardSection, Select, Badge, Avatar, Icon, ButtonAdd, ButtonAction, map, escapeHtml } from "../../../components";
import { getPayloudData, checkCsrfToken, link } from "../../../utils";
import { transformValidate, ValidationError } from "../../../validator";
import { UserSession, DbUser, requireAdmin, getInitials } from "../shared";
import { DbSetting, SETTINGS_DEFAULTS } from "./admin-misc.types";
import { CURRENCY_OPTIONS, STATIC_PAGES, STATIC_ARTICLES, USER_ROLE_FILTER_OPTIONS } from "./admin-misc.const";
import { AdminUserForm } from "./admin-misc.validation";
import { ADMIN_MISC_T } from "./admin-misc.translation";
import { getAllSettings, saveSetting, settingsCheckbox, formatUserDate } from "./admin-misc.utils";
import { findAllUsers, findUserById, findUserByEmail, findUserByEmailExcluding, insertUser, updateUserWithPassword, updateUserWithoutPassword, deleteUser, findUserExists } from "./admin-misc.repository";

// =============================================================================
// Pages Admin Page
// =============================================================================

export function renderAdminPages(request: Request, response: Response): Response {
    response.content = getHtmlTemplate(ADMIN_MISC_T.titles.pages, AdminLayout({
        title: ADMIN_MISC_T.headings.pages,
        activePage: "pages",
        children: `
            <div class="d-flex justify-content-end mb-4">
                ${ButtonAdd({ children: ADMIN_MISC_T.actions.addPage })}
            </div>
            ${CardSection({
                children: `
                    <table class="data-table">
                        <thead><tr><th>${ADMIN_MISC_T.pageColumns.name}</th><th>${ADMIN_MISC_T.pageColumns.url}</th><th>${ADMIN_MISC_T.pageColumns.status}</th><th>${ADMIN_MISC_T.pageColumns.lastEdit}</th><th>${ADMIN_MISC_T.pageColumns.actions}</th></tr></thead>
                        <tbody>
                            ${map(STATIC_PAGES, (p) => `
                                <tr>
                                    <td><strong>${p.name}</strong></td>
                                    <td><code>${p.url}</code></td>
                                    <td>${Badge({ children: p.statusText, variant: p.status as any })}</td>
                                    <td>${p.date}</td>
                                    <td>${ButtonAction({ icon: 'pencil' })}${ButtonAction({ icon: 'eye' })}</td>
                                </tr>
                            `)}
                        </tbody>
                    </table>
                `
            })}
        `
    }));
    return response;
}

// =============================================================================
// Articles Admin Page
// =============================================================================

export function renderAdminArticles(request: Request, response: Response): Response {
    response.content = getHtmlTemplate(ADMIN_MISC_T.titles.articles, AdminLayout({
        title: ADMIN_MISC_T.headings.articles,
        activePage: "articles",
        children: `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="filter-bar mb-0">
                    ${Select({ filter: true, options: [
                        { value: '', label: ADMIN_MISC_T.filters.allStatuses },
                        { value: 'published', label: ADMIN_MISC_T.filters.published },
                        { value: 'draft', label: ADMIN_MISC_T.filters.drafts }
                    ]})}
                </div>
                ${ButtonAdd({ children: ADMIN_MISC_T.actions.addArticle })}
            </div>
            ${CardSection({
                children: `
                    <table class="data-table">
                        <thead><tr><th>${ADMIN_MISC_T.articleColumns.name}</th><th>${ADMIN_MISC_T.articleColumns.author}</th><th>${ADMIN_MISC_T.articleColumns.category}</th><th>${ADMIN_MISC_T.articleColumns.status}</th><th>${ADMIN_MISC_T.articleColumns.date}</th><th>${ADMIN_MISC_T.articleColumns.actions}</th></tr></thead>
                        <tbody>
                            ${map(STATIC_ARTICLES, (a) => `
                                <tr>
                                    <td><strong>${a.title}</strong></td>
                                    <td>${a.author}</td>
                                    <td>${a.category}</td>
                                    <td>${Badge({ children: a.statusText, variant: a.status as any })}</td>
                                    <td>${a.date}</td>
                                    <td>${ButtonAction({ icon: 'pencil' })}${ButtonAction({ icon: 'eye' })}${ButtonAction({ icon: 'trash', variant: 'danger' })}</td>
                                </tr>
                            `)}
                        </tbody>
                    </table>
                `
            })}
        `
    }));
    return response;
}

// =============================================================================
// Admin Settings
// =============================================================================

export function renderAdminSettings(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    let successMsg = '';
    let errorMsg = '';

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        if (raw) {
            saveSetting("site_name", raw.site_name ?? SETTINGS_DEFAULTS.site_name);
            saveSetting("site_description", raw.site_description ?? SETTINGS_DEFAULTS.site_description);
            saveSetting("contact_email", raw.contact_email ?? SETTINGS_DEFAULTS.contact_email);
            saveSetting("currency", raw.currency ?? SETTINGS_DEFAULTS.currency);

            saveSetting("allow_registration", raw.allow_registration !== undefined && raw.allow_registration !== null ? "1" : "0");
            saveSetting("allow_guest_checkout", raw.allow_guest_checkout !== undefined && raw.allow_guest_checkout !== null ? "1" : "0");
            saveSetting("require_email_verification", raw.require_email_verification !== undefined && raw.require_email_verification !== null ? "1" : "0");
            saveSetting("show_product_ratings", raw.show_product_ratings !== undefined && raw.show_product_ratings !== null ? "1" : "0");

            saveSetting("free_shipping_threshold", raw.free_shipping_threshold ?? SETTINGS_DEFAULTS.free_shipping_threshold);
            saveSetting("default_shipping_cost", raw.default_shipping_cost ?? SETTINGS_DEFAULTS.default_shipping_cost);

            saveSetting("payment_card", raw.payment_card !== undefined && raw.payment_card !== null ? "1" : "0");
            saveSetting("payment_cod", raw.payment_cod !== undefined && raw.payment_cod !== null ? "1" : "0");
            saveSetting("payment_bank_transfer", raw.payment_bank_transfer !== undefined && raw.payment_bank_transfer !== null ? "1" : "0");

            successMsg = ADMIN_MISC_T.settings.success;
        } else {
            errorMsg = ADMIN_MISC_T.settings.invalidRequest;
        }
    }

    const s = getAllSettings();

    response.content = getHtmlTemplate(ADMIN_MISC_T.titles.settings, AdminLayout({
        title: ADMIN_MISC_T.headings.settings,
        activePage: "settings",
        children: `
            ${successMsg !== '' ? `<div class="alert alert-success mb-4">${Icon({ name: 'check-circle' })} ${escapeHtml(successMsg)}</div>` : ''}
            ${errorMsg !== '' ? `<div class="alert alert-danger mb-4">${escapeHtml(errorMsg)}</div>` : ''}
            <form method="post" class="admin-form">
                <div class="row g-4">
                    <div class="col-lg-8">
                        ${CardSection({
                            title: ADMIN_MISC_T.settings.sections.general,
                            children: `
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label">${ADMIN_MISC_T.settings.labels.siteName}</label>
                                        <input type="text" name="site_name" class="form-control" value="${escapeHtml(s.site_name)}">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">${ADMIN_MISC_T.settings.labels.contactEmail}</label>
                                        <input type="email" name="contact_email" class="form-control" value="${escapeHtml(s.contact_email)}">
                                    </div>
                                    <div class="col-12">
                                        <label class="form-label">${ADMIN_MISC_T.settings.labels.siteDescription}</label>
                                        <textarea name="site_description" class="form-control" rows="3">${escapeHtml(s.site_description)}</textarea>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">${ADMIN_MISC_T.settings.labels.currency}</label>
                                        <select name="currency" class="form-control">
                                            ${map(CURRENCY_OPTIONS, o => `<option value="${o.value}" ${o.value === s.currency ? 'selected' : ''}>${o.label}</option>`)}
                                        </select>
                                    </div>
                                </div>
                            `
                        })}
                        ${CardSection({
                            title: ADMIN_MISC_T.settings.sections.eshop,
                            children: `
                                ${settingsCheckbox("allow_registration", ADMIN_MISC_T.settings.labels.allowRegistration, s.allow_registration === "1")}
                                ${settingsCheckbox("allow_guest_checkout", ADMIN_MISC_T.settings.labels.allowGuestCheckout, s.allow_guest_checkout === "1")}
                                ${settingsCheckbox("require_email_verification", ADMIN_MISC_T.settings.labels.requireEmailVerification, s.require_email_verification === "1")}
                                ${settingsCheckbox("show_product_ratings", ADMIN_MISC_T.settings.labels.showProductRatings, s.show_product_ratings === "1")}
                            `
                        })}
                    </div>
                    <div class="col-lg-4">
                        ${CardSection({
                            title: ADMIN_MISC_T.settings.sections.shipping,
                            children: `
                                <div class="mb-3">
                                    <label class="form-label">${ADMIN_MISC_T.settings.labels.freeShippingThreshold}</label>
                                    <input type="number" name="free_shipping_threshold" class="form-control" value="${escapeHtml(s.free_shipping_threshold)}" min="0">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">${ADMIN_MISC_T.settings.labels.defaultShippingCost}</label>
                                    <input type="number" name="default_shipping_cost" class="form-control" value="${escapeHtml(s.default_shipping_cost)}" min="0">
                                </div>
                            `
                        })}
                        ${CardSection({
                            title: ADMIN_MISC_T.settings.sections.payments,
                            children: `
                                ${settingsCheckbox("payment_card", ADMIN_MISC_T.settings.labels.paymentCard, s.payment_card === "1")}
                                ${settingsCheckbox("payment_cod", ADMIN_MISC_T.settings.labels.paymentCod, s.payment_cod === "1")}
                                ${settingsCheckbox("payment_bank_transfer", ADMIN_MISC_T.settings.labels.paymentBankTransfer, s.payment_bank_transfer === "1")}
                            `
                        })}
                        ${CardSection({
                            children: `
                                <div class="d-grid">
                                    <button type="submit" class="btn-add w-100 justify-content-center">
                                        ${Icon({ name: 'check-lg' })}
                                        ${ADMIN_MISC_T.actions.saveChanges}
                                    </button>
                                </div>
                            `
                        })}
                    </div>
                </div>
            </form>
        `
    }));
    return response;
}

// =============================================================================
// Admin Users
// =============================================================================

export function renderAdminUsers(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const users = findAllUsers();

    const roleFilter = parseUrlQuery<{ role?: string }>(request.query)?.role ?? '';

    const filteredUsers = roleFilter !== ''
        ? users.filter(u => (roleFilter === 'admin' && u.is_admin) || (roleFilter === 'user' && !u.is_admin))
        : users;

    response.content = getHtmlTemplate(ADMIN_MISC_T.titles.users, AdminLayout({
        title: ADMIN_MISC_T.headings.users,
        activePage: "users",
        children: `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="filter-bar mb-0">
                    ${Select({ filter: true, options: USER_ROLE_FILTER_OPTIONS.map(o => ({ ...o, selected: o.value === roleFilter })) })}
                </div>
                <a href="/admin/users/create" class="btn-add">
                    ${Icon({ name: 'plus-lg' })} ${ADMIN_MISC_T.actions.addUser}
                </a>
            </div>
            ${CardSection({
                children: `
                    <table class="data-table">
                        <thead><tr><th>${ADMIN_MISC_T.users.columns.user}</th><th>${ADMIN_MISC_T.users.columns.email}</th><th>${ADMIN_MISC_T.users.columns.role}</th><th>${ADMIN_MISC_T.users.columns.registered}</th><th>${ADMIN_MISC_T.users.columns.actions}</th></tr></thead>
                        <tbody>
                            ${filteredUsers.length === 0
                                ? `<tr><td colspan="5" class="text-center text-muted-tf py-4">${ADMIN_MISC_T.empty.users}</td></tr>`
                                : map(filteredUsers, (u) => `
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center gap-2">
                                            ${Avatar({ initials: getInitials(u.first_name, u.last_name) })}
                                            <strong>${escapeHtml(u.first_name + ' ' + u.last_name)}</strong>
                                        </div>
                                    </td>
                                    <td>${escapeHtml(u.email)}</td>
                                    <td>${Badge({ children: u.is_admin ? ADMIN_MISC_T.users.roles.admin : ADMIN_MISC_T.users.roles.user, variant: u.is_admin ? 'info' : 'default' })}</td>
                                    <td>${formatUserDate(u.created_at)}</td>
                                    <td>
                                        <a href="/admin/users/edit?id=${u.id}" class="btn-action" title="${ADMIN_MISC_T.actions.editUser}">${Icon({ name: 'pencil' })}</a>
                                        ${u.id !== auth.session.user.id ? `<a href="${link('/admin/users/delete', { id: String(u.id) }, request, 'action')}" class="btn-action danger" title="${ADMIN_MISC_T.actions.deleteUser}" x-data @click.prevent="if(confirm('${ADMIN_MISC_T.confirm.deleteUser}')) window.location.href=$el.href">${Icon({ name: 'trash' })}</a>` : ''}
                                    </td>
                                </tr>
                            `)}
                        </tbody>
                    </table>
                `
            })}
        `
    }));
    return response;
}

// =============================================================================
// Admin Users — Create
// =============================================================================

function getUserFormContent(request: Request, data?: Record<string, string>, error?: string, isEdit: boolean = false): string {
    return `
        ${error ? `<div class="alert alert-danger mb-4">${escapeHtml(error)}</div>` : ''}
        <form method="post" class="admin-form">
            ${CardSection({
                children: `
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">${ADMIN_MISC_T.users.form.firstName}</label>
                            <input type="text" name="first_name" class="form-control" value="${escapeHtml(data?.first_name ?? '')}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">${ADMIN_MISC_T.users.form.lastName}</label>
                            <input type="text" name="last_name" class="form-control" value="${escapeHtml(data?.last_name ?? '')}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">${ADMIN_MISC_T.users.form.email}</label>
                            <input type="email" name="email" class="form-control" value="${escapeHtml(data?.email ?? '')}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">${isEdit ? ADMIN_MISC_T.users.form.passwordEdit : ADMIN_MISC_T.users.form.password}</label>
                            <input type="password" name="password" class="form-control" ${isEdit ? '' : 'required'} minlength="6">
                        </div>
                        <div class="col-12">
                            <div class="form-check">
                                <input type="checkbox" name="is_admin" value="1" class="form-check-input" id="is_admin" ${data?.is_admin === '1' || data?.is_admin === 'true' ? 'checked' : ''}>
                                <label class="form-check-label" for="is_admin">${ADMIN_MISC_T.users.form.isAdmin}</label>
                            </div>
                        </div>
                    </div>
                `
            })}
            <div class="d-flex gap-2 mt-4">
                <button type="submit" class="btn btn-primary-tf">${Icon({ name: 'check-lg' })} ${isEdit ? ADMIN_MISC_T.actions.saveChanges : ADMIN_MISC_T.actions.createUser}</button>
                <a href="/admin/users" class="btn btn-outline-tf">${ADMIN_MISC_T.actions.cancel}</a>
            </div>
        </form>
    `;
}

export function renderAdminUserCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        return handleUserCreate(request, response);
    }

    response.content = getHtmlTemplate(ADMIN_MISC_T.titles.userCreate, AdminLayout({
        title: ADMIN_MISC_T.headings.userCreate,
        activePage: "users",
        children: getUserFormContent(request)
    }));
    return response;
}

function handleUserCreate(request: Request, response: Response): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(ADMIN_MISC_T.titles.userCreate, AdminLayout({
            title: ADMIN_MISC_T.headings.userCreate,
            activePage: "users",
            children: getUserFormContent(request, undefined, ADMIN_MISC_T.errors.invalidRequest)
        }));
        return response;
    }

    try {
        const data = transformValidate(AdminUserForm, raw);

        if (!data.password || data.password.length < 6) {
            response.content = getHtmlTemplate(ADMIN_MISC_T.titles.userCreate, AdminLayout({
                title: ADMIN_MISC_T.headings.userCreate,
                activePage: "users",
                children: getUserFormContent(request, raw, ADMIN_MISC_T.errors.passwordRequired)
            }));
            return response;
        }

        const existing = findUserByEmail(data.email);
        if (existing) {
            response.content = getHtmlTemplate(ADMIN_MISC_T.titles.userCreate, AdminLayout({
                title: ADMIN_MISC_T.headings.userCreate,
                activePage: "users",
                children: getUserFormContent(request, raw, ADMIN_MISC_T.errors.emailExists)
            }));
            return response;
        }

        const passwordHash = hashPassword(data.password);
        const isAdmin = data.is_admin === '1';

        insertUser(data.first_name, data.last_name, data.email, passwordHash, isAdmin);

        response.status = 302;
        response.headers["Location"] = "/admin/users";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? ADMIN_MISC_T.errors.validationError;
            response.content = getHtmlTemplate(ADMIN_MISC_T.titles.userCreate, AdminLayout({
                title: ADMIN_MISC_T.headings.userCreate,
                activePage: "users",
                children: getUserFormContent(request, raw, firstError)
            }));
            return response;
        }
        response.content = getHtmlTemplate(ADMIN_MISC_T.titles.userCreate, AdminLayout({
            title: ADMIN_MISC_T.headings.userCreate,
            activePage: "users",
            children: getUserFormContent(request, undefined, ADMIN_MISC_T.errors.genericError)
        }));
        return response;
    }
}

// =============================================================================
// Admin Users — Edit
// =============================================================================

export function renderAdminUserEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const userId = params?.id;

    if (!userId) {
        response.status = 302;
        response.headers["Location"] = "/admin/users";
        return response;
    }

    const user = findUserById(Number(userId));
    if (!user) {
        response.status = 302;
        response.headers["Location"] = "/admin/users";
        return response;
    }

    if (request.method === "post") {
        return handleUserEdit(request, response, user);
    }

    const formData: Record<string, string> = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: user.is_admin ? '1' : ''
    };

    response.content = getHtmlTemplate(ADMIN_MISC_T.titles.userEdit, AdminLayout({
        title: ADMIN_MISC_T.headings.userEdit,
        activePage: "users",
        children: getUserFormContent(request, formData, undefined, true)
    }));
    return response;
}

function handleUserEdit(request: Request, response: Response, user: DbUser): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(ADMIN_MISC_T.titles.userEdit, AdminLayout({
            title: ADMIN_MISC_T.headings.userEdit,
            activePage: "users",
            children: getUserFormContent(request, undefined, ADMIN_MISC_T.errors.invalidRequest, true)
        }));
        return response;
    }

    try {
        const data = transformValidate(AdminUserForm, raw);

        const existingWithEmail = findUserByEmailExcluding(data.email, user.id);
        if (existingWithEmail) {
            response.content = getHtmlTemplate(ADMIN_MISC_T.titles.userEdit, AdminLayout({
                title: ADMIN_MISC_T.headings.userEdit,
                activePage: "users",
                children: getUserFormContent(request, raw, ADMIN_MISC_T.errors.emailExists, true)
            }));
            return response;
        }

        const isAdmin = data.is_admin === '1';

        if (data.password && data.password.length >= 6) {
            const passwordHash = hashPassword(data.password);
            updateUserWithPassword(user.id, data.first_name, data.last_name, data.email, passwordHash, isAdmin);
        } else {
            updateUserWithoutPassword(user.id, data.first_name, data.last_name, data.email, isAdmin);
        }

        response.status = 302;
        response.headers["Location"] = "/admin/users";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? ADMIN_MISC_T.errors.validationError;
            response.content = getHtmlTemplate(ADMIN_MISC_T.titles.userEdit, AdminLayout({
                title: ADMIN_MISC_T.headings.userEdit,
                activePage: "users",
                children: getUserFormContent(request, raw, firstError, true)
            }));
            return response;
        }
        response.content = getHtmlTemplate(ADMIN_MISC_T.titles.userEdit, AdminLayout({
            title: ADMIN_MISC_T.headings.userEdit,
            activePage: "users",
            children: getUserFormContent(request, undefined, ADMIN_MISC_T.errors.genericError, true)
        }));
        return response;
    }
}

// =============================================================================
// Admin Users — Delete
// =============================================================================

export function handleAdminUserDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string; token?: string }>(request.query);
    const userId = params?.id;
    const token = params?.token;

    if (!userId || !token) {
        response.status = 302;
        response.headers["Location"] = "/admin/users";
        return response;
    }

    if (!checkCsrfToken(token, request)) {
        response.status = 302;
        response.headers["Location"] = "/admin/users";
        return response;
    }

    const numericUserId = Number(userId);

    if (numericUserId === auth.session.user.id) {
        response.status = 302;
        response.headers["Location"] = "/admin/users";
        return response;
    }

    if (!findUserExists(numericUserId)) {
        response.status = 302;
        response.headers["Location"] = "/admin/users";
        return response;
    }

    deleteUser(numericUserId);

    response.status = 302;
    response.headers["Location"] = "/admin/users";
    return response;
}
