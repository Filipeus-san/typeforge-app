import { DASHBOARD_T } from "./dashboard.translation";

export const QUICK_ACTIONS = [
    { icon: "plus-lg", title: DASHBOARD_T.quickActions.addProduct, desc: DASHBOARD_T.quickActions.addProductDesc, href: "/admin/products/create" },
    { icon: "receipt", title: DASHBOARD_T.quickActions.newOrder, desc: DASHBOARD_T.quickActions.newOrderDesc, href: "/admin/orders/create" },
    { icon: "people", title: DASHBOARD_T.quickActions.newCustomer, desc: DASHBOARD_T.quickActions.newCustomerDesc, href: "/admin/customers/create" },
    { icon: "journal-richtext", title: DASHBOARD_T.quickActions.newArticle, desc: DASHBOARD_T.quickActions.newArticleDesc, href: "/admin/blog/create" }
];

export const ANALYTICS_STATUS_LABELS: Record<string, string> = {
    'pending': DASHBOARD_T.analyticsStatuses.pending,
    'processing': DASHBOARD_T.analyticsStatuses.processing,
    'shipped': DASHBOARD_T.analyticsStatuses.shipped,
    'delivered': DASHBOARD_T.analyticsStatuses.delivered,
    'cancelled': DASHBOARD_T.analyticsStatuses.cancelled,
};

export const ANALYTICS_STATUS_COLORS: Record<string, string> = {
    'pending': 'warning',
    'processing': 'info',
    'shipped': 'primary',
    'delivered': 'success',
    'cancelled': 'danger',
};

export const MONTH_NAMES: Record<string, string> = DASHBOARD_T.months as Record<string, string>;
