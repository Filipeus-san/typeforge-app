import { getHtmlTemplate } from "../../../template";
import { AdminLayout, CardSection, Select, Badge, Avatar, Icon, map, escapeHtml } from "../../../components";
import { getPayloudData } from "../../../utils";
import { Required, MinLength, Transform, transformValidate, ValidationError } from "../../../validator";
import { UserSession, DbOrder, DbOrderItem, DbProduct, DbCustomer, requireAdmin, formatPrice, formatOrderDate, getOrderStatusLabel, getOrderStatusVariant, escapeJsString, generateOrderNumber, getCustomerInitials } from "../shared";
import { findAllOrdersWithProducts, findOrderById, findOrderItems, findActiveProductsForForm, findActiveCustomersForForm, insertOrder, insertOrderItem, updateOrder, deleteOrderItems } from "./orders.repository";
import { ORDER_STATUS_FILTER_OPTIONS, ORDER_STATUS_SELECT_OPTIONS } from "./orders.const";
import { ORDERS_T } from "./orders.translation";

// =============================================================================
// Admin Orders Module
// =============================================================================

export function renderAdminOrders(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const orders = findAllOrdersWithProducts();

    const statusFilter = parseUrlQuery<{ status?: string }>(request.query)?.status ?? '';

    const filteredOrders = statusFilter !== ''
        ? orders.filter(o => o.status === statusFilter)
        : orders;

    response.content = getHtmlTemplate(ORDERS_T.titles.admin, AdminLayout({
        title: ORDERS_T.headings.admin,
        activePage: "orders",
        children: `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="filter-bar mb-0">
                    ${Select({ filter: true, options: ORDER_STATUS_FILTER_OPTIONS.map(o => ({ ...o, selected: statusFilter === o.value })) })}
                </div>
                <a href="/admin/orders/create" class="btn-add">
                    ${Icon({ name: 'plus-lg' })} ${ORDERS_T.actions.newOrder}
                </a>
            </div>
            ${CardSection({
                children: `
                    <table class="data-table">
                        <thead>
                            <tr><th>${ORDERS_T.columns.number}</th><th>${ORDERS_T.columns.customer}</th><th>${ORDERS_T.columns.products}</th><th>${ORDERS_T.columns.amount}</th><th>${ORDERS_T.columns.status}</th><th>${ORDERS_T.columns.date}</th><th>${ORDERS_T.columns.actions}</th></tr>
                        </thead>
                        <tbody>
                            ${filteredOrders.length === 0
                                ? `<tr><td colspan="7" class="text-center text-muted-tf py-4">${ORDERS_T.empty.orders}</td></tr>`
                                : map(filteredOrders, (o: any) => `
                                <tr>
                                    <td><strong>#${escapeHtml(o.order_number)}</strong></td>
                                    <td>
                                        <div class="d-flex align-items-center gap-2">
                                            ${Avatar({ initials: getCustomerInitials(o.customer_name) })}
                                            ${escapeHtml(o.customer_name)}
                                        </div>
                                    </td>
                                    <td>${escapeHtml(o.products || '-')}</td>
                                    <td>${formatPrice(Number(o.total_amount))}</td>
                                    <td>${Badge({ children: getOrderStatusLabel(o.status), variant: getOrderStatusVariant(o.status) as any })}</td>
                                    <td>${formatOrderDate(o.created_at)}</td>
                                    <td>
                                        <a href="/admin/orders/detail?id=${o.id}" class="btn-action" title="${ORDERS_T.actions.detail}">${Icon({ name: 'eye' })}</a>
                                        <a href="/admin/orders/edit?id=${o.id}" class="btn-action" title="${ORDERS_T.actions.edit}">${Icon({ name: 'pencil' })}</a>
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
// Admin Orders \u2014 Detail
// =============================================================================

export function renderAdminOrderDetail(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const orderId = params?.id;

    if (!orderId) {
        response.status = 302;
        response.headers["Location"] = "/admin/orders";
        return response;
    }

    const order = findOrderById(Number(orderId));
    if (!order) {
        response.status = 302;
        response.headers["Location"] = "/admin/orders";
        return response;
    }

    const items = findOrderItems(order.id);

    response.content = getHtmlTemplate(`${ORDERS_T.titles.detail} #${order.order_number} \u2014 Administrace`, AdminLayout({
        title: `${ORDERS_T.titles.detail} #${order.order_number}`,
        activePage: "orders",
        children: `
            <div class="row g-4">
                <div class="col-md-8">
                    ${CardSection({
                        title: ORDERS_T.detail.sections.items,
                        children: `
                            <table class="data-table">
                                <thead>
                                    <tr><th>${ORDERS_T.columns.product}</th><th>${ORDERS_T.columns.quantity}</th><th>${ORDERS_T.columns.pricePerUnit}</th><th>${ORDERS_T.columns.total}</th></tr>
                                </thead>
                                <tbody>
                                    ${items.length === 0
                                        ? `<tr><td colspan="4" class="text-center text-muted-tf py-4">${ORDERS_T.empty.items}</td></tr>`
                                        : map(items, (item) => `
                                        <tr>
                                            <td>${escapeHtml(item.product_name)}</td>
                                            <td>${item.quantity}x</td>
                                            <td>${formatPrice(Number(item.unit_price))}</td>
                                            <td><strong>${formatPrice(Number(item.total_price))}</strong></td>
                                        </tr>
                                    `)}
                                    <tr class="table-footer">
                                        <td colspan="3" class="text-end"><strong>${ORDERS_T.columns.totalLabel}</strong></td>
                                        <td><strong>${formatPrice(Number(order.total_amount))}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                    })}
                    ${order.notes ? CardSection({
                        title: ORDERS_T.detail.sections.notes,
                        children: `<p>${escapeHtml(order.notes)}</p>`
                    }) : ''}
                </div>
                <div class="col-md-4">
                    ${CardSection({
                        title: ORDERS_T.detail.sections.info,
                        children: `
                            <dl class="order-info">
                                <dt>${ORDERS_T.detail.labels.status}</dt>
                                <dd>${Badge({ children: getOrderStatusLabel(order.status), variant: getOrderStatusVariant(order.status) as any })}</dd>
                                <dt>${ORDERS_T.detail.labels.createdAt}</dt>
                                <dd>${formatOrderDate(order.created_at)}</dd>
                                <dt>${ORDERS_T.detail.labels.updatedAt}</dt>
                                <dd>${formatOrderDate(order.updated_at)}</dd>
                            </dl>
                        `
                    })}
                    ${CardSection({
                        title: ORDERS_T.detail.sections.customer,
                        children: `
                            <dl class="order-info">
                                <dt>${ORDERS_T.detail.labels.name}</dt>
                                <dd>${order.customer_id_ref ? `<a href="/admin/customers/detail?id=${order.customer_id_ref}">${escapeHtml(order.customer_name)}</a>` : escapeHtml(order.customer_name)}</dd>
                                <dt>${ORDERS_T.detail.labels.email}</dt>
                                <dd><a href="mailto:${escapeHtml(order.customer_email)}">${escapeHtml(order.customer_email)}</a></dd>
                            </dl>
                        `
                    })}
                    ${order.shipping_address ? CardSection({
                        title: ORDERS_T.detail.sections.shippingAddress,
                        children: `<p>${escapeHtml(order.shipping_address).split('\n').join('<br>')}</p>`
                    }) : ''}
                </div>
            </div>
            <div class="d-flex gap-2 mt-4">
                <a href="/admin/orders/edit?id=${order.id}" class="btn btn-primary-tf">${Icon({ name: 'pencil' })} ${ORDERS_T.actions.edit}</a>
                <a href="/admin/orders" class="btn btn-outline-tf">${ORDERS_T.actions.backToList}</a>
            </div>
            <style>
                .order-info { margin: 0; }
                .order-info dt { font-weight: 500; color: var(--tf-text-muted); margin-top: 0.75rem; }
                .order-info dt:first-child { margin-top: 0; }
                .order-info dd { margin: 0.25rem 0 0 0; }
                .table-footer td { border-top: 2px solid var(--tf-border); background: var(--tf-bg-subtle); }
            </style>
        `
    }));
    return response;
}

// =============================================================================
// Admin Orders \u2014 Create
// =============================================================================

class OrderForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    customer_name: string = '';

    @Transform((v: string) => v?.trim()?.toLowerCase())
    @Required()
    customer_email: string = '';

    @Transform((v: string) => v?.trim())
    shipping_address: string = '';

    @Transform((v: string) => v?.trim())
    notes: string = '';

    status: string = 'pending';
}

function getOrderFormContent(request: Request, data?: Record<string, string>, error?: string, isEdit: boolean = false, orderId?: number, existingItems?: DbOrderItem[]): string {
    const availableProducts = findActiveProductsForForm();
    const availableCustomers = findActiveCustomersForForm();

    // Build products array for Alpine x-data
    let productsJs = '[';
    for (let i = 0; i < availableProducts.length; i++) {
        if (i > 0) productsJs += ',';
        const p = availableProducts[i];
        productsJs += `{id:${p.id},name:'${escapeHtml(escapeJsString(p.name))}',price:${p.price}}`;
    }
    productsJs += ']';

    // Build initial items array for Alpine x-data
    let itemsJs = '[';
    if (isEdit && existingItems && existingItems.length > 0) {
        for (let i = 0; i < existingItems.length; i++) {
            if (i > 0) itemsJs += ',';
            const item = existingItems[i];
            const pid = item.product_id ? String(item.product_id) : 'custom';
            itemsJs += `{pid:'${pid}',name:'${escapeHtml(escapeJsString(item.product_name))}',qty:${item.quantity},price:${item.unit_price}}`;
        }
    } else {
        itemsJs += "{pid:'',name:'',qty:1,price:0}";
    }
    itemsJs += ']';

    return `
        ${error ? `<div class="alert alert-danger mb-4">${escapeHtml(error)}</div>` : ''}
        <form method="post" class="admin-form" x-data="{
            items: ${itemsJs},
            products: ${productsJs},
            addItem() { this.items.push({pid:'',name:'',qty:1,price:0}); },
            removeItem(i) { this.items.splice(i,1); },
            selectProduct(i) {
                let item = this.items[i];
                if (item.pid !== '' && item.pid !== 'custom') {
                    for (let j = 0; j < this.products.length; j++) {
                        if (String(this.products[j].id) === String(item.pid)) {
                            item.name = this.products[j].name;
                            item.price = this.products[j].price;
                            break;
                        }
                    }
                }
            }
        }">
            <div class="row g-4">
                <div class="col-md-8">
                    ${CardSection({
                        title: ORDERS_T.form.sections.customer,
                        children: `
                            <div class="row g-3">
                                <div class="col-12 mb-2">
                                    <label class="form-label">${ORDERS_T.form.labels.selectCustomer}</label>
                                    <select name="customer_id_ref" class="form-select" @change="let opt=$event.target.options[$event.target.selectedIndex]; if(opt.value){$refs.custName.value=opt.getAttribute('data-name')||''; $refs.custEmail.value=opt.getAttribute('data-email')||''; $refs.custAddr.value=opt.getAttribute('data-address')||'';}">
                                        <option value="">${ORDERS_T.form.labels.noAssignment}</option>
                                        ${map(availableCustomers, (c) => `<option value="${c.id}" data-name="${escapeHtml(c.first_name + ' ' + c.last_name)}" data-email="${escapeHtml(c.email)}" data-address="${escapeHtml(c.shipping_address || '')}" ${data?.customer_id_ref === String(c.id) ? 'selected' : ''}>${escapeHtml(c.first_name + ' ' + c.last_name)} (${escapeHtml(c.email)})</option>`)}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">${ORDERS_T.form.labels.customerName}</label>
                                    <input type="text" name="customer_name" class="form-control" x-ref="custName" value="${escapeHtml(data?.customer_name ?? '')}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">${ORDERS_T.form.labels.email}</label>
                                    <input type="email" name="customer_email" class="form-control" x-ref="custEmail" value="${escapeHtml(data?.customer_email ?? '')}" required>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">${ORDERS_T.form.labels.shippingAddress}</label>
                                    <textarea name="shipping_address" class="form-control" x-ref="custAddr" rows="3">${escapeHtml(data?.shipping_address ?? '')}</textarea>
                                </div>
                            </div>
                        `
                    })}
                    ${CardSection({
                        title: ORDERS_T.form.sections.items,
                        children: `
                            <div>
                                <template x-for="(item, index) in items" :key="index">
                                    <div class="order-item-row row g-2 mb-2 align-items-end">
                                        <div class="col-md-5">
                                            <label class="form-label">${ORDERS_T.form.labels.product}</label>
                                            <select :name="'item_product_id_' + index" class="form-select" x-model="item.pid" @change="selectProduct(index)">
                                                <option value="">${ORDERS_T.form.labels.selectProduct}</option>
                                                <template x-for="p in products" :key="p.id">
                                                    <option :value="p.id" x-text="p.name + ' (' + p.price + ' Kč)'"></option>
                                                </template>
                                                <option value="custom">${ORDERS_T.form.labels.customItem}</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <label class="form-label">${ORDERS_T.form.labels.itemName}</label>
                                            <input type="text" :name="'item_name_' + index" class="form-control" x-model="item.name">
                                        </div>
                                        <div class="col-md-1">
                                            <label class="form-label">${ORDERS_T.form.labels.qty}</label>
                                            <input type="number" :name="'item_qty_' + index" class="form-control" x-model="item.qty" min="1">
                                        </div>
                                        <div class="col-md-2">
                                            <label class="form-label">${ORDERS_T.form.labels.pricePerUnit}</label>
                                            <input type="number" :name="'item_price_' + index" class="form-control" x-model="item.price" step="0.01" min="0">
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-outline-danger btn-sm" @click="removeItem(index)" title="${ORDERS_T.actions.removeItem}">${Icon({ name: 'trash' })}</button>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <input type="hidden" name="item_count" :value="items.length">
                            <button type="button" class="btn btn-outline-tf btn-sm mt-2" @click="addItem()">
                                ${Icon({ name: 'plus-lg' })} ${ORDERS_T.actions.addItem}
                            </button>
                        `
                    })}
                    ${CardSection({
                        title: ORDERS_T.form.sections.notes,
                        children: `
                            <textarea name="notes" class="form-control" rows="3" placeholder="${ORDERS_T.form.labels.notesPlaceholder}">${escapeHtml(data?.notes ?? '')}</textarea>
                        `
                    })}
                </div>
                <div class="col-md-4">
                    ${CardSection({
                        title: ORDERS_T.form.sections.orderStatus,
                        children: `
                            <select name="status" class="form-select">
                                ${map(ORDER_STATUS_SELECT_OPTIONS, o => `<option value="${o.value}" ${data?.status === o.value ? 'selected' : ''}>${o.label}</option>`)}
                            </select>
                        `
                    })}
                </div>
            </div>
            <div class="d-flex gap-2 mt-4">
                <button type="submit" class="btn btn-primary-tf">${Icon({ name: 'check-lg' })} ${isEdit ? ORDERS_T.actions.saveChanges : ORDERS_T.actions.createOrder}</button>
                <a href="/admin/orders" class="btn btn-outline-tf">${ORDERS_T.actions.cancel}</a>
            </div>
        </form>
    `;
}

export function renderAdminOrderCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        return handleOrderCreate(request, response);
    }

    response.content = getHtmlTemplate(ORDERS_T.titles.create, AdminLayout({
        title: ORDERS_T.headings.create,
        activePage: "orders",
        children: getOrderFormContent(request, { status: 'pending' })
    }));
    return response;
}

function parseOrderItems(raw: Record<string, string>): { product_id: number | null; product_name: string; quantity: number; unit_price: number }[] {
    const items: { product_id: number | null; product_name: string; quantity: number; unit_price: number }[] = [];
    // Scan for item_name_0, item_name_1, etc.
    for (let i = 0; i < 50; i++) {
        const name = raw[`item_name_${i}`];
        const qty = raw[`item_qty_${i}`];
        const price = raw[`item_price_${i}`];
        const productIdStr = raw[`item_product_id_${i}`];
        if (name && name.trim().length > 0) {
            const productId = (productIdStr && productIdStr !== 'custom' && productIdStr !== '') ? Number(productIdStr) : null;
            items.push({
                product_id: productId,
                product_name: name.trim(),
                quantity: Number(qty) || 1,
                unit_price: Number(price) || 0
            });
        }
    }
    return items;
}

function handleOrderCreate(request: Request, response: Response): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(ORDERS_T.titles.create, AdminLayout({
            title: ORDERS_T.headings.create,
            activePage: "orders",
            children: getOrderFormContent(request, undefined, ORDERS_T.errors.invalidRequest)
        }));
        return response;
    }

    try {
        const data = transformValidate(OrderForm, raw);
        const orderNumber = generateOrderNumber();
        const items = parseOrderItems(raw);
        const customerIdRef = raw.customer_id_ref && raw.customer_id_ref !== '' ? Number(raw.customer_id_ref) : null;

        // Calculate total from items
        let totalAmount = 0;
        for (let i = 0; i < items.length; i++) {
            totalAmount += items[i].unit_price * items[i].quantity;
        }

        const result = insertOrder(orderNumber, data.customer_name, data.customer_email, data.shipping_address || null, data.notes || null, data.status, totalAmount, customerIdRef !== null ? customerIdRef : 0);

        if (result.length > 0) {
            const orderId = result[0].id;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const totalPrice = item.unit_price * item.quantity;
                insertOrderItem(orderId, item.product_id !== null ? item.product_id : 0, item.product_name, item.quantity, item.unit_price, totalPrice);
            }
        }

        response.status = 302;
        response.headers["Location"] = "/admin/orders";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? ORDERS_T.errors.validationError;
            response.content = getHtmlTemplate(ORDERS_T.titles.create, AdminLayout({
                title: ORDERS_T.headings.create,
                activePage: "orders",
                children: getOrderFormContent(request, raw, firstError)
            }));
            return response;
        }
        response.content = getHtmlTemplate(ORDERS_T.titles.create, AdminLayout({
            title: ORDERS_T.headings.create,
            activePage: "orders",
            children: getOrderFormContent(request, undefined, ORDERS_T.errors.genericError)
        }));
        return response;
    }
}

// =============================================================================
// Admin Orders \u2014 Edit
// =============================================================================

export function renderAdminOrderEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const orderId = params?.id;

    if (!orderId) {
        response.status = 302;
        response.headers["Location"] = "/admin/orders";
        return response;
    }

    const order = findOrderById(Number(orderId));
    if (!order) {
        response.status = 302;
        response.headers["Location"] = "/admin/orders";
        return response;
    }

    const existingItems = findOrderItems(order.id);

    if (request.method === "post") {
        return handleOrderEdit(request, response, order);
    }

    const formData: Record<string, string> = {
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        shipping_address: order.shipping_address || '',
        notes: order.notes || '',
        status: order.status,
        customer_id_ref: order.customer_id_ref ? String(order.customer_id_ref) : ''
    };

    response.content = getHtmlTemplate(`${ORDERS_T.titles.edit} #${order.order_number} \u2014 Administrace`, AdminLayout({
        title: `${ORDERS_T.titles.edit} #${order.order_number}`,
        activePage: "orders",
        children: getOrderFormContent(request, formData, undefined, true, order.id, existingItems)
    }));
    return response;
}

function handleOrderEdit(request: Request, response: Response, order: DbOrder): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(`Upravit objedn\u00e1vku #${order.order_number} \u2014 Administrace`, AdminLayout({
            title: `Upravit objedn\u00e1vku #${order.order_number}`,
            activePage: "orders",
            children: getOrderFormContent(request, undefined, "Neplatn\u00fd po\u017eadavek", true, order.id)
        }));
        return response;
    }

    try {
        const data = transformValidate(OrderForm, raw);
        const items = parseOrderItems(raw);
        const customerIdRef = raw.customer_id_ref && raw.customer_id_ref !== '' ? Number(raw.customer_id_ref) : null;

        // Calculate total from items
        let totalAmount = 0;
        for (let i = 0; i < items.length; i++) {
            totalAmount += items[i].unit_price * items[i].quantity;
        }

        updateOrder(order.id, data.customer_name, data.customer_email, data.shipping_address || null, data.notes || null, data.status, totalAmount, customerIdRef !== null ? customerIdRef : 0);

        // Delete old items and insert new
        deleteOrderItems(order.id);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const totalPrice = item.unit_price * item.quantity;
            insertOrderItem(order.id, item.product_id !== null ? item.product_id : 0, item.product_name, item.quantity, item.unit_price, totalPrice);
        }

        response.status = 302;
        response.headers["Location"] = "/admin/orders";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? "Chyba validace";
            response.content = getHtmlTemplate(`Upravit objedn\u00e1vku #${order.order_number} \u2014 Administrace`, AdminLayout({
                title: `Upravit objedn\u00e1vku #${order.order_number}`,
                activePage: "orders",
                children: getOrderFormContent(request, raw, firstError, true, order.id)
            }));
            return response;
        }
        response.content = getHtmlTemplate(`Upravit objedn\u00e1vku #${order.order_number} \u2014 Administrace`, AdminLayout({
            title: `Upravit objedn\u00e1vku #${order.order_number}`,
            activePage: "orders",
            children: getOrderFormContent(request, undefined, "Do\u0161lo k chyb\u011b, zkuste to znovu", true, order.id)
        }));
        return response;
    }
}
