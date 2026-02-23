import { getHtmlTemplate } from "../../../template";
import { AdminLayout, AdminDataList, CardSection, Badge, Icon, Avatar, StatsGrid, map, escapeHtml } from "../../../components";
import { getPayloudData, checkCsrfToken, link } from "../../../utils";
import { transformValidate, ValidationError } from "../../../validator";
import { DbCustomer, requireAdmin, formatPrice, formatOrderDate, getOrderStatusLabel, getOrderStatusVariant, getInitials } from "../shared";
import { CustomerForm } from "./customers.validation";
import { getCustomerStatusLabel, getCustomerStatusVariant } from "./customers.utils";
import { getCustomerFormContent } from "./customers.templates";
import { CUSTOMERS_T } from "./customers.translation";
import {
    findAllCustomersWithStats, findCustomerById, findOrdersByCustomerId,
    findCustomerByEmail, findCustomerByEmailExcluding,
    insertCustomer, updateCustomer, deleteCustomer
} from "./customers.repository";

// =============================================================================
// Admin Customers — List
// =============================================================================

export function renderAdminCustomers(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const customers = findAllCustomersWithStats();

    const statusFilter = parseUrlQuery<{ status?: string }>(request.query)?.status ?? '';

    const filteredCustomers = statusFilter !== ''
        ? customers.filter(c => c.status === statusFilter)
        : customers;

    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;

    const stats = [
        { icon: 'people', iconColor: 'purple' as const, value: String(totalCustomers), label: CUSTOMERS_T.stats.totalCustomers },
        { icon: 'person-check', iconColor: 'green' as const, value: String(activeCustomers), label: CUSTOMERS_T.stats.activeCustomers },
    ];

    const rows = filteredCustomers.map(c => ({
        id: String(c.id),
        first_name: c.first_name,
        last_name: c.last_name,
        email: c.email,
        phone: c.phone || '-',
        order_count: String(Math.round(Number(c.order_count))),
        total_spent: String(c.total_spent),
        status: c.status,
    }));

    response.content = getHtmlTemplate(CUSTOMERS_T.titles.admin, AdminLayout({
        title: CUSTOMERS_T.headings.admin,
        activePage: "customers",
        children: `
            ${StatsGrid({ stats, columns: 2 })}
            ${AdminDataList({
                columns: [
                    { key: 'first_name', label: CUSTOMERS_T.columns.customer, render: (_val, row) => `<div class="d-flex align-items-center gap-2">${Avatar({ initials: getInitials(row.first_name, row.last_name) })} <strong>${escapeHtml(row.first_name + ' ' + row.last_name)}</strong></div>` },
                    { key: 'email', label: CUSTOMERS_T.columns.email, render: (val) => escapeHtml(val) },
                    { key: 'phone', label: CUSTOMERS_T.columns.phone, render: (val) => escapeHtml(val) },
                    { key: 'order_count', label: CUSTOMERS_T.columns.orderCount },
                    { key: 'total_spent', label: CUSTOMERS_T.columns.totalSpent, render: (val) => formatPrice(Number(val)) },
                    { key: 'status', label: CUSTOMERS_T.columns.status, render: (val) => Badge({ children: getCustomerStatusLabel(val), variant: getCustomerStatusVariant(val) as any }) },
                ],
                rows,
                actions: [
                    { icon: 'eye', href: (row) => `/admin/customers/detail?id=${row.id}`, title: CUSTOMERS_T.actions.detail },
                    { icon: 'pencil', href: (row) => `/admin/customers/edit?id=${row.id}`, title: CUSTOMERS_T.actions.edit },
                    { icon: 'trash', href: (row) => link('/admin/customers/delete', { id: row.id }, request, 'action'), variant: 'danger', title: CUSTOMERS_T.actions.delete, confirm: CUSTOMERS_T.confirm.deleteCustomer },
                ],
                filters: [
                    { name: 'status', options: [
                        { value: 'active', label: CUSTOMERS_T.filters.active },
                        { value: 'inactive', label: CUSTOMERS_T.filters.inactive },
                    ], value: statusFilter, placeholder: CUSTOMERS_T.filters.allStatuses },
                ],
                addButton: { label: CUSTOMERS_T.actions.newCustomer, href: '/admin/customers/create' },
                emptyMessage: CUSTOMERS_T.empty.customers,
            })}
        `
    }));
    return response;
}

// =============================================================================
// Admin Customers — Detail
// =============================================================================

export function renderAdminCustomerDetail(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const customerId = params?.id;

    if (!customerId) {
        response.status = 302;
        response.headers["Location"] = "/admin/customers";
        return response;
    }

    const customer = findCustomerById(Number(customerId));
    if (!customer) {
        response.status = 302;
        response.headers["Location"] = "/admin/customers";
        return response;
    }

    const orders = findOrdersByCustomerId(customer.id);

    let totalSpent = 0;
    for (let i = 0; i < orders.length; i++) {
        totalSpent += Number(orders[i].total_amount);
    }

    response.content = getHtmlTemplate(`${customer.first_name} ${customer.last_name} — ${CUSTOMERS_T.headings.admin}`, AdminLayout({
        title: `${customer.first_name} ${customer.last_name}`,
        activePage: "customers",
        children: `
            <div class="row g-4">
                <div class="col-md-8">
                    ${CardSection({
                        title: CUSTOMERS_T.detail.sections.customerOrders,
                        children: orders.length === 0
                            ? `<p class="text-muted-tf">${CUSTOMERS_T.empty.noOrders}</p>`
                            : `
                            <table class="data-table">
                                <thead>
                                    <tr><th>${CUSTOMERS_T.columns.number}</th><th>${CUSTOMERS_T.columns.amount}</th><th>${CUSTOMERS_T.columns.status}</th><th>${CUSTOMERS_T.columns.date}</th><th>${CUSTOMERS_T.columns.actions}</th></tr>
                                </thead>
                                <tbody>
                                    ${map(orders, (o) => `
                                    <tr>
                                        <td><strong>#${escapeHtml(o.order_number)}</strong></td>
                                        <td>${formatPrice(Number(o.total_amount))}</td>
                                        <td>${Badge({ children: getOrderStatusLabel(o.status), variant: getOrderStatusVariant(o.status) as any })}</td>
                                        <td>${formatOrderDate(o.created_at)}</td>
                                        <td>
                                            <a href="/admin/orders/detail?id=${o.id}" class="btn-action" title="${CUSTOMERS_T.actions.detail}">${Icon({ name: 'eye' })}</a>
                                        </td>
                                    </tr>
                                    `)}
                                </tbody>
                            </table>
                        `
                    })}
                    ${customer.notes !== undefined && customer.notes !== '' ? CardSection({
                        title: CUSTOMERS_T.detail.sections.notes,
                        children: `<p>${escapeHtml(customer.notes)}</p>`
                    }) : ''}
                </div>
                <div class="col-md-4">
                    ${CardSection({
                        title: CUSTOMERS_T.detail.sections.info,
                        children: `
                            <div class="text-center mb-3">
                                <div class="d-inline-flex align-items-center justify-content-center" style="width:64px;height:64px;border-radius:50%;background:var(--tf-gradient-subtle);font-size:1.5rem;font-weight:700;color:var(--tf-primary-light);">
                                    ${getInitials(customer.first_name, customer.last_name)}
                                </div>
                            </div>
                            <dl class="order-info">
                                <dt>${CUSTOMERS_T.detail.labels.status}</dt>
                                <dd>${Badge({ children: getCustomerStatusLabel(customer.status), variant: getCustomerStatusVariant(customer.status) as any })}</dd>
                                <dt>${CUSTOMERS_T.detail.labels.email}</dt>
                                <dd><a href="mailto:${escapeHtml(customer.email)}">${escapeHtml(customer.email)}</a></dd>
                                ${customer.phone !== undefined && customer.phone !== '' ? `<dt>${CUSTOMERS_T.detail.labels.phone}</dt><dd>${escapeHtml(customer.phone)}</dd>` : ''}
                                ${customer.company !== undefined && customer.company !== '' ? `<dt>${CUSTOMERS_T.detail.labels.company}</dt><dd>${escapeHtml(customer.company)}</dd>` : ''}
                                <dt>${CUSTOMERS_T.detail.labels.registered}</dt>
                                <dd>${formatOrderDate(customer.created_at)}</dd>
                                <dt>${CUSTOMERS_T.detail.labels.orderCount}</dt>
                                <dd>${orders.length}</dd>
                                <dt>${CUSTOMERS_T.detail.labels.totalSpent}</dt>
                                <dd>${formatPrice(totalSpent)}</dd>
                            </dl>
                        `
                    })}
                    ${customer.shipping_address !== undefined && customer.shipping_address !== '' ? CardSection({
                        title: CUSTOMERS_T.detail.sections.shippingAddress,
                        children: `<p>${escapeHtml(customer.shipping_address).split('\n').join('<br>')}</p>`
                    }) : ''}
                    ${customer.billing_address !== undefined && customer.billing_address !== '' ? CardSection({
                        title: CUSTOMERS_T.detail.sections.billingAddress,
                        children: `<p>${escapeHtml(customer.billing_address).split('\n').join('<br>')}</p>`
                    }) : ''}
                </div>
            </div>
            <div class="d-flex gap-2 mt-4">
                <a href="/admin/customers/edit?id=${customer.id}" class="btn btn-primary-tf">${Icon({ name: 'pencil' })} ${CUSTOMERS_T.actions.edit}</a>
                <a href="/admin/customers" class="btn btn-outline-tf">${CUSTOMERS_T.actions.backToList}</a>
            </div>
            <style>
                .order-info { margin: 0; }
                .order-info dt { font-weight: 500; color: var(--tf-text-muted); margin-top: 0.75rem; }
                .order-info dt:first-child { margin-top: 0; }
                .order-info dd { margin: 0.25rem 0 0 0; }
            </style>
        `
    }));
    return response;
}

// =============================================================================
// Admin Customers — Create
// =============================================================================

export function renderAdminCustomerCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        return handleCustomerCreate(request, response);
    }

    response.content = getHtmlTemplate(CUSTOMERS_T.titles.create, AdminLayout({
        title: CUSTOMERS_T.headings.create,
        activePage: "customers",
        children: getCustomerFormContent(request)
    }));
    return response;
}

function handleCustomerCreate(request: Request, response: Response): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(CUSTOMERS_T.titles.create, AdminLayout({
            title: CUSTOMERS_T.headings.create,
            activePage: "customers",
            children: getCustomerFormContent(request, undefined, CUSTOMERS_T.errors.invalidRequest)
        }));
        return response;
    }

    try {
        const data = transformValidate(CustomerForm, raw);

        const existing = findCustomerByEmail(data.email);
        if (existing) {
            response.content = getHtmlTemplate(CUSTOMERS_T.titles.create, AdminLayout({
                title: CUSTOMERS_T.headings.create,
                activePage: "customers",
                children: getCustomerFormContent(request, raw, CUSTOMERS_T.errors.emailExists)
            }));
            return response;
        }

        insertCustomer(data.first_name, data.last_name, data.email, data.phone, data.company, data.shipping_address, data.billing_address, data.notes, data.status);

        response.status = 302;
        response.headers["Location"] = "/admin/customers";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? CUSTOMERS_T.errors.validationError;
            response.content = getHtmlTemplate(CUSTOMERS_T.titles.create, AdminLayout({
                title: CUSTOMERS_T.headings.create,
                activePage: "customers",
                children: getCustomerFormContent(request, raw, firstError)
            }));
            return response;
        }
        response.content = getHtmlTemplate(CUSTOMERS_T.titles.create, AdminLayout({
            title: CUSTOMERS_T.headings.create,
            activePage: "customers",
            children: getCustomerFormContent(request, undefined, CUSTOMERS_T.errors.genericError)
        }));
        return response;
    }
}

// =============================================================================
// Admin Customers — Edit
// =============================================================================

export function renderAdminCustomerEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const customerId = params?.id;

    if (!customerId) {
        response.status = 302;
        response.headers["Location"] = "/admin/customers";
        return response;
    }

    const customer = findCustomerById(Number(customerId));
    if (!customer) {
        response.status = 302;
        response.headers["Location"] = "/admin/customers";
        return response;
    }

    if (request.method === "post") {
        return handleCustomerEdit(request, response, customer);
    }

    const formData: Record<string, string> = {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        company: customer.company,
        shipping_address: customer.shipping_address,
        billing_address: customer.billing_address,
        notes: customer.notes,
        status: customer.status
    };

    response.content = getHtmlTemplate(CUSTOMERS_T.titles.edit, AdminLayout({
        title: CUSTOMERS_T.headings.edit,
        activePage: "customers",
        children: getCustomerFormContent(request, formData, undefined, true)
    }));
    return response;
}

function handleCustomerEdit(request: Request, response: Response, customer: DbCustomer): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(CUSTOMERS_T.titles.edit, AdminLayout({
            title: CUSTOMERS_T.headings.edit,
            activePage: "customers",
            children: getCustomerFormContent(request, undefined, CUSTOMERS_T.errors.invalidRequest, true)
        }));
        return response;
    }

    try {
        const data = transformValidate(CustomerForm, raw);

        const existingWithEmail = findCustomerByEmailExcluding(data.email, customer.id);
        if (existingWithEmail) {
            response.content = getHtmlTemplate(CUSTOMERS_T.titles.edit, AdminLayout({
                title: CUSTOMERS_T.headings.edit,
                activePage: "customers",
                children: getCustomerFormContent(request, raw, CUSTOMERS_T.errors.emailExists, true)
            }));
            return response;
        }

        updateCustomer(customer.id, data.first_name, data.last_name, data.email, data.phone, data.company, data.shipping_address, data.billing_address, data.notes, data.status);

        response.status = 302;
        response.headers["Location"] = "/admin/customers";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? CUSTOMERS_T.errors.validationError;
            response.content = getHtmlTemplate(CUSTOMERS_T.titles.edit, AdminLayout({
                title: CUSTOMERS_T.headings.edit,
                activePage: "customers",
                children: getCustomerFormContent(request, raw, firstError, true)
            }));
            return response;
        }
        response.content = getHtmlTemplate(CUSTOMERS_T.titles.edit, AdminLayout({
            title: CUSTOMERS_T.headings.edit,
            activePage: "customers",
            children: getCustomerFormContent(request, undefined, CUSTOMERS_T.errors.genericError, true)
        }));
        return response;
    }
}

// =============================================================================
// Admin Customers — Delete
// =============================================================================

export function handleAdminCustomerDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string; token?: string }>(request.query);
    const customerId = params?.id;
    const token = params?.token;

    if (!customerId || !token) {
        response.status = 302;
        response.headers["Location"] = "/admin/customers";
        return response;
    }

    if (!checkCsrfToken(token, request)) {
        response.status = 302;
        response.headers["Location"] = "/admin/customers";
        return response;
    }

    deleteCustomer(Number(customerId));

    response.status = 302;
    response.headers["Location"] = "/admin/customers";
    return response;
}
