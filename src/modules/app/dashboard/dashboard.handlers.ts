import { getReactPageTemplate } from "../../../react";
import { requireAdmin, formatPrice, formatOrderDate, getOrderStatusLabel } from "../shared";
import { countOrders, sumRevenue, countCustomers, countProductsInStock, countLowStockProducts, countPendingOrders, findRecentOrders, findLowStockProducts, findRecentCustomers, avgOrderValue, findOrdersByStatus, findTopProducts, findRecentCustomersForAnalytics, findStockOverview, findMonthlyRevenue, countActiveCarts, countCartItems, sumCartValue, avgCartValue, findTopCartProducts } from "./dashboard.repository";
import { DASHBOARD_T } from "./dashboard.translation";

export function renderAdmin(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    // Fetch real stats from database
    const orderCount = countOrders();
    const totalRevenue = sumRevenue();
    const customerCount = countCustomers();
    const productStock = countProductsInStock();
    const lowStockCount = countLowStockProducts();
    const pendingOrdersCount = countPendingOrders();
    const activeCartsCount = countActiveCarts();

    const stats = [
        { icon: "cart3", iconColor: "purple" as const, value: String(orderCount), label: DASHBOARD_T.stats.totalOrders },
        { icon: "currency-dollar", iconColor: "green" as const, value: formatPrice(totalRevenue), label: DASHBOARD_T.stats.totalRevenue },
        { icon: "people", iconColor: "blue" as const, value: String(customerCount), label: DASHBOARD_T.stats.customers },
        { icon: "box-seam", iconColor: "orange" as const, value: String(productStock), label: DASHBOARD_T.stats.productsInStock }
    ];

    // Fetch recent orders from database
    const dbOrders = findRecentOrders(5);

    // Fetch low stock products
    const lowStockProducts = findLowStockProducts(5);

    // Fetch recent customers
    const recentCustomers = findRecentCustomers(5);

    // Build activity feed from recent orders and customers
    const activityItems: { color: string; text: string; time: string }[] = [];

    for (let i = 0; i < dbOrders.length && activityItems.length < 8; i++) {
        const o = dbOrders[i];
        const statusLabel = getOrderStatusLabel(o.status);
        const name = o.customer_name;
        if (o.status === 'completed') {
            activityItems.push({ color: "green", text: `${name} — ${DASHBOARD_T.activity.orderCompleted} (${formatPrice(o.total_amount)})`, time: formatOrderDate(o.created_at) });
        } else if (o.status === 'pending') {
            activityItems.push({ color: "orange", text: `${name} — ${DASHBOARD_T.activity.newOrder} (${formatPrice(o.total_amount)})`, time: formatOrderDate(o.created_at) });
        } else if (o.status === 'cancelled') {
            activityItems.push({ color: "red", text: `${name} — ${DASHBOARD_T.activity.orderCancelled}`, time: formatOrderDate(o.created_at) });
        } else {
            activityItems.push({ color: "blue", text: `${name} — ${DASHBOARD_T.activity.orderPrefix} ${statusLabel}`, time: formatOrderDate(o.created_at) });
        }
    }

    for (let i = 0; i < recentCustomers.length && activityItems.length < 8; i++) {
        const c = recentCustomers[i];
        const name = c.first_name + ' ' + c.last_name;
        activityItems.push({ color: "purple", text: `${DASHBOARD_T.activity.newCustomer} ${name}`, time: formatOrderDate(c.created_at) });
    }

    response.content = getReactPageTemplate(DASHBOARD_T.titles.admin, "AdminDashboard", {
        stats: stats.map(s => ({ icon: s.icon, iconColor: s.iconColor, value: s.value, label: s.label })),
        recentOrders: dbOrders.map(o => ({
            id: String(o.id),
            orderNumber: o.order_number,
            customerName: o.customer_name,
            products: o.products ?? '',
            totalAmount: String(o.total_amount),
            status: o.status,
            createdAt: o.created_at,
        })),
        lowStockProducts: lowStockProducts.map(p => ({
            id: String(p.id),
            name: p.name,
            price: String(p.price),
            stock: String(p.stock),
        })),
        activityItems,
        pendingOrdersCount,
        lowStockCount,
        activeCartsCount,
    });
    return response;
}


// Analytics Page
// =============================================================================
// Admin Analytics Module
// =============================================================================

function formatAnalyticsCurrency(amount: number): string {
    const rounded = Math.round(amount);
    let str = String(rounded);
    let result = '';
    let count = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        result = str.substring(i, i + 1) + result;
        count++;
        if (count === 3 && i > 0) {
            result = ' ' + result;
            count = 0;
        }
    }
    return result + ' Kč';
}

export function renderAdminAnalytics(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    // Total revenue
    const totalRevenue = sumRevenue();

    // Total orders
    const totalOrders = countOrders();

    // Total customers
    const totalCustomers = countCustomers();

    // Average order value
    const avgOrderVal = avgOrderValue();

    // Stats grid
    const stats = [
        { icon: 'currency-dollar', iconColor: 'green' as const, value: formatAnalyticsCurrency(totalRevenue), label: DASHBOARD_T.stats.totalTurnover },
        { icon: 'cart', iconColor: 'purple' as const, value: String(totalOrders), label: DASHBOARD_T.stats.totalOrdersCount },
        { icon: 'people', iconColor: 'blue' as const, value: String(totalCustomers), label: DASHBOARD_T.stats.customers },
        { icon: 'receipt', iconColor: 'orange' as const, value: formatAnalyticsCurrency(avgOrderVal), label: DASHBOARD_T.stats.averageOrder }
    ];

    // Orders by status
    const ordersByStatus = findOrdersByStatus();

    // Top selling products
    const topProducts = findTopProducts(10);

    // Recent customers
    const recentCustomers = findRecentCustomersForAnalytics(5);

    // Products stock overview
    const stockOverview = findStockOverview(10);

    // Revenue by month (last 6 months)
    const monthlyRevenue = findMonthlyRevenue();

    // Cart analytics
    const activeCarts = countActiveCarts();
    const cartItemsTotal = countCartItems();
    const totalCartValue = sumCartValue();
    const avgCart = avgCartValue();
    const topCartProducts = findTopCartProducts(10);

    response.content = getReactPageTemplate(DASHBOARD_T.titles.analytics, "AdminAnalytics", {
        stats: stats.map(s => ({ icon: s.icon, iconColor: s.iconColor, value: s.value, label: s.label })),
        ordersByStatus: ordersByStatus.map(s => ({ status: s.status, count: s.count })),
        totalOrders,
        topProducts: topProducts.map(p => ({
            productName: p.product_name,
            totalQty: String(p.total_qty),
            totalRevenue: String(p.total_revenue),
        })),
        recentCustomers: recentCustomers.map(c => ({
            firstName: c.first_name,
            lastName: c.last_name,
            email: c.email,
            createdAt: c.created_at,
        })),
        stockOverview: stockOverview.map(p => ({
            name: p.name,
            stock: p.stock,
        })),
        monthlyRevenue: monthlyRevenue.map(r => ({
            month: r.month,
            count: r.count,
            revenue: String(r.revenue),
        })),
        activeCarts,
        cartItemsTotal,
        totalCartValue: String(totalCartValue),
        avgCartValue: String(avgCart),
        topCartProducts: topCartProducts.map(p => ({
            productName: p.product_name,
            cartCount: p.cart_count,
            totalQty: String(p.total_qty),
            totalValue: String(p.total_value),
        })),
    });
    return response;
}
