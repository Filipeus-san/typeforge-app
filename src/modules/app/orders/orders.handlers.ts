import { getReactPageTemplate } from "../../../react";
import { getPayloudData } from "../../../utils";
import { Required, MinLength, Transform, transformValidate, ValidationError } from "../../../validator";
import { DbOrder, DbOrderItem, requireAdmin, generateOrderNumber } from "../shared";
import { findAllOrdersWithProducts, findOrderById, findOrderItems, findActiveProductsForForm, findActiveCustomersForForm, insertOrder, insertOrderItem, updateOrder, deleteOrderItems } from "./orders.repository";
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

    response.content = getReactPageTemplate(ORDERS_T.titles.admin, "AdminOrderList", {
        orders: filteredOrders.map((o: any) => ({
            id: String(o.id),
            orderNumber: o.order_number,
            customerName: o.customer_name,
            products: o.products || '',
            totalAmount: String(o.total_amount),
            status: o.status,
            createdAt: o.created_at,
        })),
        statusFilter,
    });
    return response;
}

// =============================================================================
// Admin Orders — Detail
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

    response.content = getReactPageTemplate(
        `${ORDERS_T.titles.detail} #${order.order_number}`,
        "AdminOrderDetail",
        {
            order: {
                id: String(order.id),
                orderNumber: order.order_number,
                customerName: order.customer_name,
                customerEmail: order.customer_email,
                status: order.status,
                totalAmount: String(order.total_amount),
                shippingAddress: order.shipping_address || '',
                billingAddress: '',
                notes: order.notes || '',
                createdAt: order.created_at,
            },
            items: items.map(item => ({
                id: String(item.id),
                productName: item.product_name,
                quantity: String(item.quantity),
                unitPrice: String(item.unit_price),
                totalPrice: String(item.total_price),
            })),
        }
    );
    return response;
}

// =============================================================================
// Admin Orders — Create
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

export function renderAdminOrderCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        return handleOrderCreate(request, response);
    }

    const availableProducts = findActiveProductsForForm();
    const availableCustomers = findActiveCustomersForForm();
    response.content = getReactPageTemplate(ORDERS_T.titles.create, "AdminOrderForm", {
        values: { status: 'pending' },
        isEdit: false,
        availableProducts: availableProducts.map(p => ({ id: String(p.id), name: p.name, price: String(p.price) })),
        availableCustomers: availableCustomers.map(c => ({
            id: String(c.id),
            name: c.first_name + ' ' + c.last_name,
            email: c.email,
            address: c.shipping_address || '',
        })),
    });
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
        const availableProducts = findActiveProductsForForm();
        const availableCustomers = findActiveCustomersForForm();
        response.content = getReactPageTemplate(ORDERS_T.titles.create, "AdminOrderForm", {
            values: { status: 'pending' },
            error: ORDERS_T.errors.invalidRequest,
            isEdit: false,
            availableProducts: availableProducts.map(p => ({ id: String(p.id), name: p.name, price: String(p.price) })),
            availableCustomers: availableCustomers.map(c => ({
                id: String(c.id),
                name: c.first_name + ' ' + c.last_name,
                email: c.email,
                address: c.shipping_address || '',
            })),
        });
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
            const availableProducts = findActiveProductsForForm();
            const availableCustomers = findActiveCustomersForForm();
            response.content = getReactPageTemplate(ORDERS_T.titles.create, "AdminOrderForm", {
                values: raw,
                error: firstError,
                isEdit: false,
                availableProducts: availableProducts.map(p => ({ id: String(p.id), name: p.name, price: String(p.price) })),
                availableCustomers: availableCustomers.map(c => ({
                    id: String(c.id),
                    name: c.first_name + ' ' + c.last_name,
                    email: c.email,
                    address: c.shipping_address || '',
                })),
            });
            return response;
        }
        const availableProducts = findActiveProductsForForm();
        const availableCustomers = findActiveCustomersForForm();
        response.content = getReactPageTemplate(ORDERS_T.titles.create, "AdminOrderForm", {
            values: { status: 'pending' },
            error: ORDERS_T.errors.genericError,
            isEdit: false,
            availableProducts: availableProducts.map(p => ({ id: String(p.id), name: p.name, price: String(p.price) })),
            availableCustomers: availableCustomers.map(c => ({
                id: String(c.id),
                name: c.first_name + ' ' + c.last_name,
                email: c.email,
                address: c.shipping_address || '',
            })),
        });
        return response;
    }
}

// =============================================================================
// Admin Orders — Edit
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

    const availableProducts = findActiveProductsForForm();
    const availableCustomers = findActiveCustomersForForm();
    response.content = getReactPageTemplate(
        `${ORDERS_T.titles.edit} #${order.order_number}`,
        "AdminOrderForm",
        {
            values: formData,
            isEdit: true,
            orderId: String(order.id),
            existingItems: existingItems.map(item => ({
                productId: item.product_id ? String(item.product_id) : '',
                productName: item.product_name,
                quantity: String(item.quantity),
                unitPrice: String(item.unit_price),
            })),
            availableProducts: availableProducts.map(p => ({ id: String(p.id), name: p.name, price: String(p.price) })),
            availableCustomers: availableCustomers.map(c => ({
                id: String(c.id),
                name: c.first_name + ' ' + c.last_name,
                email: c.email,
                address: c.shipping_address || '',
            })),
        }
    );
    return response;
}

function handleOrderEdit(request: Request, response: Response, order: DbOrder): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        const availableProducts = findActiveProductsForForm();
        const availableCustomers = findActiveCustomersForForm();
        response.content = getReactPageTemplate(
            `${ORDERS_T.titles.edit} #${order.order_number}`,
            "AdminOrderForm",
            {
                values: { status: order.status },
                error: "Neplatn\u00fd po\u017eadavek",
                isEdit: true,
                orderId: String(order.id),
                availableProducts: availableProducts.map(p => ({ id: String(p.id), name: p.name, price: String(p.price) })),
                availableCustomers: availableCustomers.map(c => ({
                    id: String(c.id),
                    name: c.first_name + ' ' + c.last_name,
                    email: c.email,
                    address: c.shipping_address || '',
                })),
            }
        );
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
            const availableProducts = findActiveProductsForForm();
            const availableCustomers = findActiveCustomersForForm();
            response.content = getReactPageTemplate(
                `${ORDERS_T.titles.edit} #${order.order_number}`,
                "AdminOrderForm",
                {
                    values: raw,
                    error: firstError,
                    isEdit: true,
                    orderId: String(order.id),
                    availableProducts: availableProducts.map(p => ({ id: String(p.id), name: p.name, price: String(p.price) })),
                    availableCustomers: availableCustomers.map(c => ({
                        id: String(c.id),
                        name: c.first_name + ' ' + c.last_name,
                        email: c.email,
                        address: c.shipping_address || '',
                    })),
                }
            );
            return response;
        }
        const availableProducts = findActiveProductsForForm();
        const availableCustomers = findActiveCustomersForForm();
        response.content = getReactPageTemplate(
            `${ORDERS_T.titles.edit} #${order.order_number}`,
            "AdminOrderForm",
            {
                values: { status: order.status },
                error: "Do\u0161lo k chyb\u011b, zkuste to znovu",
                isEdit: true,
                orderId: String(order.id),
                availableProducts: availableProducts.map(p => ({ id: String(p.id), name: p.name, price: String(p.price) })),
                availableCustomers: availableCustomers.map(c => ({
                    id: String(c.id),
                    name: c.first_name + ' ' + c.last_name,
                    email: c.email,
                    address: c.shipping_address || '',
                })),
            }
        );
        return response;
    }
}
