import { renderIndex, renderLogin, renderRegister, handleLogout, renderAdmin, renderAdminAnalytics, renderAdminMedia, handleAdminMediaUpload, handleAdminMediaDelete, renderAdminSettings, renderAdminUsers, renderAdminUserCreate, renderAdminUserEdit, handleAdminUserDelete } from "./app";
import { RouterPaths } from "./types";

// Router
export function getRouter(): { path: RouterPaths; route: RouteFunction, type: "action" | "render" }[] {
    return [
        {
            path: "/",
            route: renderIndex,
            type: "render"
        },
        {
            path: "/login",
            route: renderLogin,
            type: "action"
        },
        {
            path: "/register",
            route: renderRegister,
            type: "action"
        },
        {
            path: "/logout",
            route: handleLogout,
            type: "action"
        },
        {
            path: "/admin",
            route: renderAdmin,
            type: "render"
        },
        {
            path: "/admin/analytics",
            route: renderAdminAnalytics,
            type: "render"
        },
        {
            path: "/admin/media",
            route: renderAdminMedia,
            type: "render"
        },
        {
            path: "/admin/media/upload",
            route: handleAdminMediaUpload,
            type: "action"
        },
        {
            path: "/admin/media/delete",
            route: handleAdminMediaDelete,
            type: "action"
        },
        {
            path: "/admin/settings",
            route: renderAdminSettings,
            type: "action"
        },
        {
            path: "/admin/users",
            route: renderAdminUsers,
            type: "render"
        },
        {
            path: "/admin/users/create",
            route: renderAdminUserCreate,
            type: "action"
        },
        {
            path: "/admin/users/edit",
            route: renderAdminUserEdit,
            type: "action"
        },
        {
            path: "/admin/users/delete",
            route: handleAdminUserDelete,
            type: "action"
        },
    ];
}
