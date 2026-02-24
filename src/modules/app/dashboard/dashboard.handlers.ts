import { getHtmlTemplate } from "../../../template";
import { AdminLayout, StatsGrid, CardSection, Badge, map, when, escapeHtml } from "../../../components";
import { requireAdmin, formatPrice, formatOrderDate, getOrderStatusLabel, getOrderStatusVariant, getCustomerInitials } from "../shared";
import { countOrders, sumRevenue, countCustomers, countProductsInStock, countLowStockProducts, countPendingOrders, findRecentOrders, findLowStockProducts, findRecentCustomers, avgOrderValue, findOrdersByStatus, findTopProducts, findRecentCustomersForAnalytics, findStockOverview, findMonthlyRevenue, countActiveCarts, countCartItems, sumCartValue, avgCartValue, findTopCartProducts } from "./dashboard.repository";
import { QUICK_ACTIONS, ANALYTICS_STATUS_LABELS, ANALYTICS_STATUS_COLORS, MONTH_NAMES } from "./dashboard.const";
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
        const name = escapeHtml(o.customer_name);
        if (o.status === 'completed') {
            activityItems.push({ color: "green", text: `<strong>${name}</strong> — ${DASHBOARD_T.activity.orderCompleted} (${formatPrice(o.total_amount)})`, time: formatOrderDate(o.created_at) });
        } else if (o.status === 'pending') {
            activityItems.push({ color: "orange", text: `<strong>${name}</strong> — ${DASHBOARD_T.activity.newOrder} (${formatPrice(o.total_amount)})`, time: formatOrderDate(o.created_at) });
        } else if (o.status === 'cancelled') {
            activityItems.push({ color: "red", text: `<strong>${name}</strong> — ${DASHBOARD_T.activity.orderCancelled}`, time: formatOrderDate(o.created_at) });
        } else {
            activityItems.push({ color: "blue", text: `<strong>${name}</strong> — ${DASHBOARD_T.activity.orderPrefix} ${statusLabel}`, time: formatOrderDate(o.created_at) });
        }
    }

    for (let i = 0; i < recentCustomers.length && activityItems.length < 8; i++) {
        const c = recentCustomers[i];
        const name = escapeHtml(c.first_name + ' ' + c.last_name);
        activityItems.push({ color: "purple", text: `${DASHBOARD_T.activity.newCustomer} <strong>${name}</strong>`, time: formatOrderDate(c.created_at) });
    }

    // Info badges for header
    const infoBadges: string[] = [];
    if (pendingOrdersCount > 0) {
        infoBadges.push(`<span class="badge bg-warning text-dark me-2"><i class="bi bi-clock me-1"></i>${pendingOrdersCount} ${DASHBOARD_T.badges.pendingOrders}</span>`);
    }
    if (lowStockCount > 0) {
        infoBadges.push(`<span class="badge bg-danger me-2"><i class="bi bi-exclamation-triangle me-1"></i>${lowStockCount} ${DASHBOARD_T.badges.lowStock}</span>`);
    }
    if (activeCartsCount > 0) {
        infoBadges.push(`<span class="badge bg-info me-2"><i class="bi bi-cart me-1"></i>${activeCartsCount} ${DASHBOARD_T.badges.activeCarts}</span>`);
    }

    response.content = getHtmlTemplate(DASHBOARD_T.titles.admin, AdminLayout({
        title: DASHBOARD_T.headings.dashboard,
        activePage: "dashboard",
        children: `
            ${when(infoBadges.length > 0, `<div class="mb-3">${infoBadges.join('')}</div>`)}

            ${StatsGrid({ stats })}

            <div class="row g-4">
                <div class="col-lg-8">
                    ${CardSection({
                        title: DASHBOARD_T.sections.recentOrders,
                        headerRight: `<a href="/admin/orders" class="btn-view-all">${DASHBOARD_T.actions.viewAll} <i class="bi bi-arrow-right"></i></a>`,
                        children: dbOrders.length > 0 ? `
                            <table class="data-table">
                                <thead>
                                    <tr><th>${DASHBOARD_T.columns.number}</th><th>${DASHBOARD_T.columns.customer}</th><th>${DASHBOARD_T.columns.products}</th><th>${DASHBOARD_T.columns.amount}</th><th>${DASHBOARD_T.columns.status}</th><th>${DASHBOARD_T.columns.date}</th></tr>
                                </thead>
                                <tbody>
                                    ${map(dbOrders, o => {
                                        const initials = getCustomerInitials(o.customer_name);
                                        const statusLabel = getOrderStatusLabel(o.status);
                                        const sv = getOrderStatusVariant(o.status);
                                        const badgeVariant = sv === 'primary' ? 'info' : sv;
                                        const productsText = (o.products !== undefined && o.products !== '') ? escapeHtml(o.products) : '-';
                                        return `
                                        <tr>
                                            <td><a href="/admin/orders/detail?id=${o.id}" class="order-id">${escapeHtml(o.order_number)}</a></td>
                                            <td><div class="order-customer"><div class="order-avatar">${initials}</div><span>${escapeHtml(o.customer_name)}</span></div></td>
                                            <td class="text-truncate" style="max-width:200px">${productsText}</td>
                                            <td>${formatPrice(o.total_amount)}</td>
                                            <td>${Badge({ children: statusLabel, variant: badgeVariant as 'default' | 'success' | 'warning' | 'info' | 'danger' })}</td>
                                            <td class="text-muted-tf">${formatOrderDate(o.created_at)}</td>
                                        </tr>
                                        `;
                                    })}
                                </tbody>
                            </table>
                        ` : `<p class="text-muted-tf text-center py-4">${DASHBOARD_T.empty.orders}</p>`
                    })}

                    ${when(lowStockProducts.length > 0, CardSection({
                        title: DASHBOARD_T.sections.lowStock,
                        headerRight: `<a href="/admin/products" class="btn-view-all">${DASHBOARD_T.actions.allProducts} <i class="bi bi-arrow-right"></i></a>`,
                        children: `
                            <table class="data-table">
                                <thead>
                                    <tr><th>${DASHBOARD_T.columns.product}</th><th>${DASHBOARD_T.columns.price}</th><th>${DASHBOARD_T.columns.stock}</th></tr>
                                </thead>
                                <tbody>
                                    ${map(lowStockProducts, p => `
                                        <tr>
                                            <td><a href="/admin/products/edit?id=${p.id}">${escapeHtml(p.name)}</a></td>
                                            <td>${formatPrice(p.price)}</td>
                                            <td><span class="badge bg-danger">${p.stock} ks</span></td>
                                        </tr>
                                    `)}
                                </tbody>
                            </table>
                        `
                    }))}
                </div>

                <div class="col-lg-4">
                    ${CardSection({
                        title: DASHBOARD_T.sections.quickActions,
                        children: map(QUICK_ACTIONS, a => `
                            <a href="${a.href}" class="quick-action" style="text-decoration:none;color:inherit;">
                                <div class="quick-action-icon"><i class="bi bi-${a.icon}"></i></div>
                                <div class="quick-action-text"><h6>${a.title}</h6><p>${a.desc}</p></div>
                            </a>
                        `)
                    })}

                    ${CardSection({
                        title: DASHBOARD_T.sections.recentActivity,
                        children: activityItems.length > 0 ? map(activityItems, a => `
                            <div class="activity-item">
                                <div class="activity-dot ${a.color}"></div>
                                <div class="activity-content"><p>${a.text}</p><span class="activity-time">${a.time}</span></div>
                            </div>
                        `) : `<p class="text-muted-tf text-center py-3">${DASHBOARD_T.empty.activity}</p>`
                    })}
                </div>
            </div>
        `
    }));
    return response;
}


// Analytics Page
// =============================================================================
// Admin Analytics Module
// =============================================================================

function formatAnalyticsNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + ' M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + ' K';
    }
    return String(Math.round(num));
}

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

function formatAnalyticsDate(dateStr: string): string {
    if (!dateStr || dateStr.length < 10) return '-';
    const day = Number(dateStr.substring(8, 10));
    const month = Number(dateStr.substring(5, 7));
    const year = dateStr.substring(0, 4);
    if (day > 0 && month > 0) return `${day}. ${month}. ${year}`;
    return '-';
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

    response.content = getHtmlTemplate(DASHBOARD_T.titles.analytics, AdminLayout({
        title: DASHBOARD_T.headings.analytics,
        activePage: "analytics",
        children: `
            ${StatsGrid({ stats })}
            <div class="row g-4">
                <div class="col-lg-8">
                    ${CardSection({
                        title: DASHBOARD_T.sections.monthlyRevenue,
                        children: monthlyRevenue.length > 0 ? `
                            <table class="data-table">
                                <thead><tr>
                                    <th>${DASHBOARD_T.columns.month}</th>
                                    <th class="text-end">${DASHBOARD_T.columns.orderCount}</th>
                                    <th class="text-end">${DASHBOARD_T.columns.revenue}</th>
                                </tr></thead>
                                <tbody>
                                    ${map(monthlyRevenue, (row) => {
                                        const monthNum = row.month.substring(5, 7);
                                        const year = row.month.substring(0, 4);
                                        const monthName = MONTH_NAMES[monthNum] !== undefined ? MONTH_NAMES[monthNum] : monthNum;
                                        return `<tr>
                                            <td>${monthName} ${year}</td>
                                            <td class="text-end">${row.count}</td>
                                            <td class="text-end"><strong>${formatAnalyticsCurrency(row.revenue)}</strong></td>
                                        </tr>`;
                                    })}
                                </tbody>
                            </table>
                        ` : `<p class="text-muted-tf">${DASHBOARD_T.empty.noOrdersInMonths}</p>`
                    })}
                    ${CardSection({
                        title: DASHBOARD_T.sections.topProducts,
                        children: topProducts.length > 0 ? `
                            <table class="data-table">
                                <thead><tr>
                                    <th>${DASHBOARD_T.columns.product}</th>
                                    <th class="text-end">${DASHBOARD_T.columns.soldQty}</th>
                                    <th class="text-end">${DASHBOARD_T.columns.revenue}</th>
                                </tr></thead>
                                <tbody>
                                    ${map(topProducts, (p) => `<tr>
                                        <td>${escapeHtml(p.product_name)}</td>
                                        <td class="text-end">${p.total_qty} ks</td>
                                        <td class="text-end"><strong>${formatAnalyticsCurrency(p.total_revenue)}</strong></td>
                                    </tr>`)}
                                </tbody>
                            </table>
                        ` : `<p class="text-muted-tf">${DASHBOARD_T.empty.noSales}</p>`
                    })}
                    ${CardSection({
                        title: DASHBOARD_T.sections.topCartProducts,
                        children: topCartProducts.length > 0 ? `
                            <table class="data-table">
                                <thead><tr>
                                    <th>${DASHBOARD_T.columns.product}</th>
                                    <th class="text-end">${DASHBOARD_T.columns.inCarts}</th>
                                    <th class="text-end">${DASHBOARD_T.columns.qty}</th>
                                    <th class="text-end">${DASHBOARD_T.columns.value}</th>
                                </tr></thead>
                                <tbody>
                                    ${map(topCartProducts, (p) => `<tr>
                                        <td>${escapeHtml(p.product_name)}</td>
                                        <td class="text-end">${p.cart_count}</td>
                                        <td class="text-end">${p.total_qty} ks</td>
                                        <td class="text-end"><strong>${formatAnalyticsCurrency(p.total_value)}</strong></td>
                                    </tr>`)}
                                </tbody>
                            </table>
                        ` : `<p class="text-muted-tf">${DASHBOARD_T.empty.noCarts}</p>`
                    })}
                </div>
                <div class="col-lg-4">
                    ${CardSection({
                        title: DASHBOARD_T.sections.cartOverview,
                        children: `
                            <div class="d-flex flex-column gap-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-muted-tf"><i class="bi bi-cart me-2"></i>${DASHBOARD_T.stats.activeCarts}</span>
                                    <strong>${activeCarts}</strong>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-muted-tf"><i class="bi bi-box me-2"></i>${DASHBOARD_T.stats.cartItems}</span>
                                    <strong>${cartItemsTotal} ks</strong>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-muted-tf"><i class="bi bi-currency-dollar me-2"></i>${DASHBOARD_T.stats.cartValue}</span>
                                    <strong>${formatAnalyticsCurrency(totalCartValue)}</strong>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-muted-tf"><i class="bi bi-receipt me-2"></i>${DASHBOARD_T.stats.avgCartValue}</span>
                                    <strong>${formatAnalyticsCurrency(avgCart)}</strong>
                                </div>
                            </div>
                        `
                    })}
                    ${CardSection({
                        title: DASHBOARD_T.sections.ordersByStatus,
                        children: ordersByStatus.length > 0 ? `
                            <div class="d-flex flex-column gap-3">
                                ${map(ordersByStatus, (s) => {
                                    const label = ANALYTICS_STATUS_LABELS[s.status] !== undefined ? ANALYTICS_STATUS_LABELS[s.status] : s.status;
                                    const color = ANALYTICS_STATUS_COLORS[s.status] !== undefined ? ANALYTICS_STATUS_COLORS[s.status] : 'secondary';
                                    const pct = totalOrders > 0 ? Math.round((s.count / totalOrders) * 100) : 0;
                                    return `<div>
                                        <div class="d-flex justify-content-between mb-1">
                                            <span><span class="badge bg-${color}">${label}</span></span>
                                            <span class="text-muted-tf">${s.count} (${pct}%)</span>
                                        </div>
                                        <div class="progress" style="height: 6px;">
                                            <div class="progress-bar bg-${color}" style="width: ${pct}%"></div>
                                        </div>
                                    </div>`;
                                })}
                            </div>
                        ` : `<p class="text-muted-tf">${DASHBOARD_T.empty.noOrders}</p>`
                    })}
                    ${CardSection({
                        title: DASHBOARD_T.sections.stockOverview,
                        children: stockOverview.length > 0 ? `
                            <table class="data-table">
                                <tbody>
                                    ${map(stockOverview, (p) => {
                                        const stockClass = p.stock <= 0 ? 'text-danger' : p.stock < 10 ? 'text-warning' : '';
                                        return `<tr>
                                            <td>${escapeHtml(p.name)}</td>
                                            <td class="text-end ${stockClass}"><strong>${p.stock} ks</strong></td>
                                        </tr>`;
                                    })}
                                </tbody>
                            </table>
                        ` : `<p class="text-muted-tf">${DASHBOARD_T.empty.noProducts}</p>`
                    })}
                    ${CardSection({
                        title: DASHBOARD_T.sections.newCustomers,
                        children: recentCustomers.length > 0 ? `
                            <div class="d-flex flex-column gap-2">
                                ${map(recentCustomers, (c) => `
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>${escapeHtml(c.first_name)} ${escapeHtml(c.last_name)}</strong>
                                            <div class="text-muted-tf small">${escapeHtml(c.email)}</div>
                                        </div>
                                        <small class="text-muted-tf">${formatAnalyticsDate(c.created_at)}</small>
                                    </div>
                                `)}
                            </div>
                        ` : `<p class="text-muted-tf">${DASHBOARD_T.empty.noCustomers}</p>`
                    })}
                </div>
            </div>
        `
    }));
    return response;
}
