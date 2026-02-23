import { DASHBOARD_T } from "./dashboard.translation";

export const QUICK_ACTIONS = [
    { icon: "person-plus", title: DASHBOARD_T.quickActions.addUser, desc: DASHBOARD_T.quickActions.addUserDesc, href: "/admin/users/create" },
    { icon: "images", title: DASHBOARD_T.quickActions.media, desc: DASHBOARD_T.quickActions.mediaDesc, href: "/admin/media" },
    { icon: "gear", title: DASHBOARD_T.quickActions.settings, desc: DASHBOARD_T.quickActions.settingsDesc, href: "/admin/settings" },
];
