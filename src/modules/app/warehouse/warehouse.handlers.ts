import { getHtmlTemplate } from "../../../template";
import { AdminLayout, CardSection, Select, Icon, Avatar, Badge, map, escapeHtml } from "../../../components";
import { getPayloudData, checkCsrfToken, link } from "../../../utils";
import { transformValidate, ValidationError } from "../../../validator";
import { requireAdmin, DbProduct } from "../shared";
import { DbWarehouse } from "./warehouse.types";
import { WarehouseForm, StockMovementForm } from "./warehouse.validation";
import { WAREHOUSE_T } from "./warehouse.translation";
import {
    getWarehouseStatusLabel,
    getWarehouseStatusVariant,
    getMovementTypeLabel,
    getMovementTypeVariant,
    formatWarehouseDate,
    updateProductTotalStock,
    recordStockMovement,
    getWarehouseFormContent,
    getMovementFormContent
} from "./warehouse.utils";
import {
    findAllWarehousesWithStats,
    findWarehouseById,
    findWarehouseByCode,
    findWarehouseByCodeExcluding,
    insertWarehouse,
    updateWarehouse,
    findAffectedProductIds,
    deleteWarehouse,
    findWarehouseStock,
    findRecentMovements,
    findActiveWarehouses,
    findActiveProducts,
    findActiveWarehouseById,
    findProductById,
} from "./warehouse.repository";

// -----------------------------------------------------------------------------
// Warehouse — List
// -----------------------------------------------------------------------------

export function renderAdminWarehouse(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const warehouses = findAllWarehousesWithStats();

    const statusFilter = parseUrlQuery<{ status?: string }>(request.query)?.status ?? '';
    const filtered = statusFilter !== ''
        ? warehouses.filter(w => w.status === statusFilter)
        : warehouses;

    response.content = getHtmlTemplate(WAREHOUSE_T.titles.admin, AdminLayout({
        title: WAREHOUSE_T.headings.admin,
        activePage: "warehouse",
        children: `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="filter-bar mb-0">
                    ${Select({ filter: true, options: [
                        { value: '', label: WAREHOUSE_T.filters.allStatuses, selected: statusFilter === '' },
                        { value: 'active', label: WAREHOUSE_T.filters.active, selected: statusFilter === 'active' },
                        { value: 'inactive', label: WAREHOUSE_T.filters.inactive, selected: statusFilter === 'inactive' }
                    ]})}
                </div>
                <a href="/admin/warehouse/create" class="btn-add">
                    ${Icon({ name: 'plus-lg' })} ${WAREHOUSE_T.actions.addWarehouse}
                </a>
            </div>
            ${CardSection({
                children: `
                    <table class="data-table">
                        <thead>
                            <tr><th>${WAREHOUSE_T.columns.warehouse}</th><th>${WAREHOUSE_T.columns.code}</th><th>${WAREHOUSE_T.columns.address}</th><th>${WAREHOUSE_T.columns.productCount}</th><th>${WAREHOUSE_T.columns.totalStock}</th><th>${WAREHOUSE_T.columns.status}</th><th>${WAREHOUSE_T.columns.actions}</th></tr>
                        </thead>
                        <tbody>
                            ${filtered.length === 0
                                ? `<tr><td colspan="7" class="text-center text-muted-tf py-4">${WAREHOUSE_T.empty.warehouses}</td></tr>`
                                : map(filtered, (w) => `
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center gap-2">
                                            ${Avatar({ icon: 'building' })}
                                            <strong>${escapeHtml(w.name)}</strong>
                                        </div>
                                    </td>
                                    <td><code>${escapeHtml(w.code)}</code></td>
                                    <td>${w.address !== '' && w.address !== undefined ? escapeHtml(w.address) : '-'}</td>
                                    <td>${w.product_count}</td>
                                    <td><strong>${w.total_stock}</strong> ks</td>
                                    <td>${Badge({ children: getWarehouseStatusLabel(w.status), variant: getWarehouseStatusVariant(w.status) })}</td>
                                    <td>
                                        <a href="/admin/warehouse/stock?id=${w.id}" class="btn-action" title="${WAREHOUSE_T.actions.stock}">${Icon({ name: 'box-seam' })}</a>
                                        <a href="/admin/warehouse/edit?id=${w.id}" class="btn-action" title="${WAREHOUSE_T.actions.edit}">${Icon({ name: 'pencil' })}</a>
                                        <a href="${link('/admin/warehouse/delete', { id: String(w.id) }, request, 'action')}" class="btn-action danger" title="${WAREHOUSE_T.actions.delete}" x-data @click.prevent="if(confirm('${WAREHOUSE_T.confirm.deleteWarehouse}')) window.location.href=$el.href">${Icon({ name: 'trash' })}</a>
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

// -----------------------------------------------------------------------------
// Warehouse — Create / Edit form
// -----------------------------------------------------------------------------

export function renderAdminWarehouseCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        return handleWarehouseCreate(request, response);
    }

    response.content = getHtmlTemplate(WAREHOUSE_T.titles.create, AdminLayout({
        title: WAREHOUSE_T.headings.create,
        activePage: "warehouse",
        children: getWarehouseFormContent(request, { status: 'active' })
    }));
    return response;
}

function handleWarehouseCreate(request: Request, response: Response): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(WAREHOUSE_T.titles.create, AdminLayout({
            title: WAREHOUSE_T.headings.create,
            activePage: "warehouse",
            children: getWarehouseFormContent(request, undefined, WAREHOUSE_T.errors.invalidRequest)
        }));
        return response;
    }

    try {
        const data = transformValidate(WarehouseForm, raw);

        const existing = findWarehouseByCode(data.code);
        if (existing) {
            response.content = getHtmlTemplate(WAREHOUSE_T.titles.create, AdminLayout({
                title: WAREHOUSE_T.headings.create,
                activePage: "warehouse",
                children: getWarehouseFormContent(request, raw, WAREHOUSE_T.errors.codeExists)
            }));
            return response;
        }

        insertWarehouse(data.name, data.code, data.address, data.status);

        response.status = 302;
        response.headers["Location"] = "/admin/warehouse";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? WAREHOUSE_T.errors.validationError;
            response.content = getHtmlTemplate(WAREHOUSE_T.titles.create, AdminLayout({
                title: WAREHOUSE_T.headings.create,
                activePage: "warehouse",
                children: getWarehouseFormContent(request, raw, firstError)
            }));
            return response;
        }
        response.content = getHtmlTemplate(WAREHOUSE_T.titles.create, AdminLayout({
            title: WAREHOUSE_T.headings.create,
            activePage: "warehouse",
            children: getWarehouseFormContent(request, raw, WAREHOUSE_T.errors.genericError)
        }));
        return response;
    }
}

// -----------------------------------------------------------------------------
// Warehouse — Edit
// -----------------------------------------------------------------------------

export function renderAdminWarehouseEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const warehouseId = params?.id;

    if (!warehouseId) {
        response.status = 302;
        response.headers["Location"] = "/admin/warehouse";
        return response;
    }

    const warehouse = findWarehouseById(Number(warehouseId));

    if (!warehouse) {
        response.status = 302;
        response.headers["Location"] = "/admin/warehouse";
        return response;
    }

    if (request.method === "post") {
        return handleWarehouseEdit(request, response, warehouse);
    }

    const formData: Record<string, string> = {
        name: warehouse.name,
        code: warehouse.code,
        address: warehouse.address,
        status: warehouse.status
    };

    response.content = getHtmlTemplate(WAREHOUSE_T.titles.edit, AdminLayout({
        title: WAREHOUSE_T.headings.edit,
        activePage: "warehouse",
        children: getWarehouseFormContent(request, formData, undefined, true)
    }));
    return response;
}

function handleWarehouseEdit(request: Request, response: Response, warehouse: DbWarehouse): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(WAREHOUSE_T.titles.edit, AdminLayout({
            title: WAREHOUSE_T.headings.edit,
            activePage: "warehouse",
            children: getWarehouseFormContent(request, undefined, WAREHOUSE_T.errors.invalidRequest, true)
        }));
        return response;
    }

    try {
        const data = transformValidate(WarehouseForm, raw);

        const existing = findWarehouseByCodeExcluding(data.code, warehouse.id);
        if (existing) {
            response.content = getHtmlTemplate(WAREHOUSE_T.titles.edit, AdminLayout({
                title: WAREHOUSE_T.headings.edit,
                activePage: "warehouse",
                children: getWarehouseFormContent(request, raw, WAREHOUSE_T.errors.codeExists, true)
            }));
            return response;
        }

        updateWarehouse(warehouse.id, data.name, data.code, data.address, data.status);

        response.status = 302;
        response.headers["Location"] = "/admin/warehouse";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? WAREHOUSE_T.errors.validationError;
            response.content = getHtmlTemplate(WAREHOUSE_T.titles.edit, AdminLayout({
                title: WAREHOUSE_T.headings.edit,
                activePage: "warehouse",
                children: getWarehouseFormContent(request, raw, firstError, true)
            }));
            return response;
        }
        response.content = getHtmlTemplate(WAREHOUSE_T.titles.edit, AdminLayout({
            title: WAREHOUSE_T.headings.edit,
            activePage: "warehouse",
            children: getWarehouseFormContent(request, raw, WAREHOUSE_T.errors.genericError, true)
        }));
        return response;
    }
}

// -----------------------------------------------------------------------------
// Warehouse — Delete
// -----------------------------------------------------------------------------

export function handleAdminWarehouseDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string; token?: string }>(request.query);
    const warehouseId = params?.id;
    const token = params?.token;

    if (!warehouseId || !token) {
        response.status = 302;
        response.headers["Location"] = "/admin/warehouse";
        return response;
    }

    if (!checkCsrfToken(token, request)) {
        response.status = 302;
        response.headers["Location"] = "/admin/warehouse";
        return response;
    }

    const numericId = Number(warehouseId);

    // Get affected products before deleting (to recalculate their stock)
    const affectedProducts = findAffectedProductIds(numericId);

    // Delete warehouse (CASCADE deletes warehouse_stock and stock_movements)
    deleteWarehouse(numericId);

    // Recalculate stock for affected products
    for (let i = 0; i < affectedProducts.length; i++) {
        updateProductTotalStock(affectedProducts[i].product_id);
    }

    response.status = 302;
    response.headers["Location"] = "/admin/warehouse";
    return response;
}

// -----------------------------------------------------------------------------
// Warehouse — Stock view
// -----------------------------------------------------------------------------

export function renderAdminWarehouseStock(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const warehouseId = params?.id;

    if (!warehouseId) {
        response.status = 302;
        response.headers["Location"] = "/admin/warehouse";
        return response;
    }

    const warehouse = findWarehouseById(Number(warehouseId));

    if (!warehouse) {
        response.status = 302;
        response.headers["Location"] = "/admin/warehouse";
        return response;
    }

    const stockItems = findWarehouseStock(Number(warehouseId));

    // Recent movements for this warehouse
    const movements = findRecentMovements(Number(warehouseId));

    let totalStock = 0;
    for (let i = 0; i < stockItems.length; i++) {
        totalStock += stockItems[i].quantity;
    }

    response.content = getHtmlTemplate(`${WAREHOUSE_T.headings.stock} \u2014 ${escapeHtml(warehouse.name)} \u2014 Administrace`, AdminLayout({
        title: `${WAREHOUSE_T.headings.stock}: ${escapeHtml(warehouse.name)}`,
        activePage: "warehouse",
        children: `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <span class="text-muted-tf">${escapeHtml(warehouse.code)}</span>
                    ${warehouse.address !== '' && warehouse.address !== undefined ? ` \u00b7 <span class="text-muted-tf">${escapeHtml(warehouse.address)}</span>` : ''}
                    \u00b7 <strong>${totalStock} ks</strong> celkem
                </div>
                <div class="d-flex gap-2">
                    <a href="/admin/warehouse/movement?warehouse_id=${warehouse.id}" class="btn btn-primary-tf">
                        ${Icon({ name: 'arrow-left-right' })} ${WAREHOUSE_T.actions.stockMovement}
                    </a>
                    <a href="/admin/warehouse" class="btn btn-outline-tf">
                        ${Icon({ name: 'arrow-left' })} ${WAREHOUSE_T.actions.backToWarehouses}
                    </a>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-lg-7">
                    ${CardSection({
                        title: WAREHOUSE_T.headings.stock,
                        children: `
                            <table class="data-table">
                                <thead>
                                    <tr><th>${WAREHOUSE_T.columns.product}</th><th>${WAREHOUSE_T.columns.quantity}</th><th>${WAREHOUSE_T.columns.updated}</th></tr>
                                </thead>
                                <tbody>
                                    ${stockItems.length === 0
                                        ? `<tr><td colspan="3" class="text-center text-muted-tf py-4">${WAREHOUSE_T.empty.stock}</td></tr>`
                                        : map(stockItems, (item) => `
                                        <tr>
                                            <td>
                                                <div class="d-flex align-items-center gap-2">
                                                    ${Avatar({ icon: 'box' })}
                                                    <strong>${escapeHtml(item.product_name)}</strong>
                                                </div>
                                            </td>
                                            <td><strong>${item.quantity} ks</strong></td>
                                            <td class="text-muted-tf">${formatWarehouseDate(item.updated_at)}</td>
                                        </tr>
                                    `)}
                                </tbody>
                            </table>
                        `
                    })}
                </div>
                <div class="col-lg-5">
                    ${CardSection({
                        title: WAREHOUSE_T.detail.recentMovements,
                        children: movements.length === 0
                            ? `<p class="text-muted-tf text-center py-3">${WAREHOUSE_T.empty.movements}</p>`
                            : map(movements, (m) => {
                                const isPositive = m.quantity > 0;
                                const sign = isPositive ? '+' : '';
                                const colorClass = isPositive ? 'text-success' : 'text-danger';
                                return `
                                <div class="activity-item">
                                    <div class="activity-dot ${isPositive ? 'green' : 'red'}"></div>
                                    <div class="activity-content">
                                        <p>
                                            ${Badge({ children: getMovementTypeLabel(m.type), variant: getMovementTypeVariant(m.type) })}
                                            <strong>${escapeHtml(m.product_name)}</strong>
                                            <span class="${colorClass}">${sign}${m.quantity} ks</span>
                                        </p>
                                        ${m.note !== '' && m.note !== undefined ? `<small class="text-muted-tf">${escapeHtml(m.note)}</small><br>` : ''}
                                        <span class="activity-time">${formatWarehouseDate(m.created_at)}</span>
                                    </div>
                                </div>
                            `;
                            })
                    })}
                </div>
            </div>
        `
    }));
    return response;
}

// -----------------------------------------------------------------------------
// Warehouse — Movement (stock in/out)
// -----------------------------------------------------------------------------

export function renderAdminWarehouseMovement(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const warehouses = findActiveWarehouses();

    const products = findActiveProducts();

    if (request.method === "post") {
        return handleStockMovement(request, response, warehouses, products);
    }

    response.content = getHtmlTemplate(WAREHOUSE_T.titles.movement, AdminLayout({
        title: WAREHOUSE_T.headings.movement,
        activePage: "warehouse",
        children: getMovementFormContent(request, warehouses, products)
    }));
    return response;
}

function handleStockMovement(
    request: Request,
    response: Response,
    warehouses: DbWarehouse[],
    products: DbProduct[]
): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(WAREHOUSE_T.titles.movement, AdminLayout({
            title: WAREHOUSE_T.headings.movement,
            activePage: "warehouse",
            children: getMovementFormContent(request, warehouses, products, undefined, WAREHOUSE_T.errors.invalidRequest)
        }));
        return response;
    }

    try {
        const data = transformValidate(StockMovementForm, raw);
        const warehouseId = Number(data.warehouse_id);
        const productId = Number(data.product_id);
        const quantity = Number(data.quantity);

        if (quantity === 0 || isNaN(quantity)) {
            response.content = getHtmlTemplate(WAREHOUSE_T.titles.movement, AdminLayout({
                title: WAREHOUSE_T.headings.movement,
                activePage: "warehouse",
                children: getMovementFormContent(request, warehouses, products, raw, WAREHOUSE_T.errors.zeroQuantity)
            }));
            return response;
        }

        if (isNaN(warehouseId) || warehouseId <= 0) {
            response.content = getHtmlTemplate(WAREHOUSE_T.titles.movement, AdminLayout({
                title: WAREHOUSE_T.headings.movement,
                activePage: "warehouse",
                children: getMovementFormContent(request, warehouses, products, raw, WAREHOUSE_T.errors.selectWarehouse)
            }));
            return response;
        }

        if (isNaN(productId) || productId <= 0) {
            response.content = getHtmlTemplate(WAREHOUSE_T.titles.movement, AdminLayout({
                title: WAREHOUSE_T.headings.movement,
                activePage: "warehouse",
                children: getMovementFormContent(request, warehouses, products, raw, WAREHOUSE_T.errors.selectProduct)
            }));
            return response;
        }

        // Validate warehouse exists and is active
        const warehouseCheck = findActiveWarehouseById(warehouseId);
        if (!warehouseCheck) {
            response.content = getHtmlTemplate(WAREHOUSE_T.titles.movement, AdminLayout({
                title: WAREHOUSE_T.headings.movement,
                activePage: "warehouse",
                children: getMovementFormContent(request, warehouses, products, raw, WAREHOUSE_T.errors.warehouseNotFound)
            }));
            return response;
        }

        // Validate product exists
        const productCheck = findProductById(productId);
        if (!productCheck) {
            response.content = getHtmlTemplate(WAREHOUSE_T.titles.movement, AdminLayout({
                title: WAREHOUSE_T.headings.movement,
                activePage: "warehouse",
                children: getMovementFormContent(request, warehouses, products, raw, WAREHOUSE_T.errors.productNotFound)
            }));
            return response;
        }

        recordStockMovement(warehouseId, productId, quantity, data.type, data.note);

        response.status = 302;
        response.headers["Location"] = `/admin/warehouse/stock?id=${warehouseId}`;
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? WAREHOUSE_T.errors.validationError;
            response.content = getHtmlTemplate(WAREHOUSE_T.titles.movement, AdminLayout({
                title: WAREHOUSE_T.headings.movement,
                activePage: "warehouse",
                children: getMovementFormContent(request, warehouses, products, raw, firstError)
            }));
            return response;
        }
        response.content = getHtmlTemplate(WAREHOUSE_T.titles.movement, AdminLayout({
            title: WAREHOUSE_T.headings.movement,
            activePage: "warehouse",
            children: getMovementFormContent(request, warehouses, products, raw, WAREHOUSE_T.errors.genericError)
        }));
        return response;
    }
}
