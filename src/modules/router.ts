import { renderIndex, renderArticle, renderPage, renderAdminLogin, handleAdminLogout, renderForgotPassword, renderResetPassword, renderAdminDashboard, renderAdminPages, renderAdminPageCreate, renderAdminPageEdit, handleAdminPageDuplicate, handleAdminPageDelete, renderAdminUsers, renderAdminUserCreate, renderAdminUserEdit, handleAdminUserToggleBlock, handleAdminUserSendResetEmail, handleAdminUserDelete, renderAdminSettings, renderAdminMenu, renderAdminMedia, handleAdminMediaUpload, handleAdminMediaDelete, renderBlogList, renderRssFeed, renderAdminBlog, renderAdminBlogCreate, renderAdminBlogEdit, handleAdminBlogDuplicate, handleAdminBlogDelete, renderAdminBlogSettings, renderAdminRedirects, renderAdminRedirectCreate, renderAdminRedirectEdit, handleAdminRedirectDelete, handleAdminRedirectToggle, renderAdminProfile, apiBootstrap, apiAuthLogin, apiDashboard, apiPages, apiPagesById, apiArticles, apiArticlesById, apiBlogCategories, apiBlogCategoriesById, apiUsers, apiUsersById, apiMedia, apiMediaById, apiMenu, apiSettings, apiSettingsByKey, apiRedirects, apiRedirectsById, apiRedirectsToggle } from "./app";
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
            path: "/article/:slug",
            route: renderArticle,
            type: "render"
        },
        {
            path: "/blog",
            route: renderBlogList,
            type: "render"
        },
        {
            path: "/blog/rss",
            route: renderRssFeed,
            type: "render"
        },
        {
            path: "/admin/login",
            route: renderAdminLogin,
            type: "render"
        },
        {
            path: "/admin/logout",
            route: handleAdminLogout,
            type: "action"
        },
        {
            path: "/admin/forgot-password",
            route: renderForgotPassword,
            type: "render"
        },
        {
            path: "/admin/reset-password",
            route: renderResetPassword,
            type: "render"
        },
        {
            path: "/admin",
            route: renderAdminDashboard,
            type: "render"
        },
        {
            path: "/admin/pages",
            route: renderAdminPages,
            type: "render"
        },
        {
            path: "/admin/pages/create",
            route: renderAdminPageCreate,
            type: "render"
        },
        {
            path: "/admin/pages/edit/:id",
            route: renderAdminPageEdit,
            type: "render"
        },
        {
            path: "/admin/pages/duplicate/:id",
            route: handleAdminPageDuplicate,
            type: "action"
        },
        {
            path: "/admin/pages/delete/:id",
            route: handleAdminPageDelete,
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
            type: "render"
        },
        {
            path: "/admin/users/edit/:id",
            route: renderAdminUserEdit,
            type: "render"
        },
        {
            path: "/admin/users/reset-password/:id",
            route: handleAdminUserSendResetEmail,
            type: "action"
        },
        {
            path: "/admin/users/block/:id",
            route: handleAdminUserToggleBlock,
            type: "action"
        },
        {
            path: "/admin/users/delete/:id",
            route: handleAdminUserDelete,
            type: "action"
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
            path: "/admin/media/delete/:id",
            route: handleAdminMediaDelete,
            type: "action"
        },
        {
            path: "/admin/blog",
            route: renderAdminBlog,
            type: "render"
        },
        {
            path: "/admin/blog/create",
            route: renderAdminBlogCreate,
            type: "render"
        },
        {
            path: "/admin/blog/edit/:id",
            route: renderAdminBlogEdit,
            type: "render"
        },
        {
            path: "/admin/blog/duplicate/:id",
            route: handleAdminBlogDuplicate,
            type: "action"
        },
        {
            path: "/admin/blog/delete/:id",
            route: handleAdminBlogDelete,
            type: "action"
        },
        {
            path: "/admin/blog/settings",
            route: renderAdminBlogSettings,
            type: "render"
        },
        {
            path: "/admin/menu",
            route: renderAdminMenu,
            type: "render"
        },
        {
            path: "/admin/settings",
            route: renderAdminSettings,
            type: "render"
        },
        {
            path: "/admin/redirects",
            route: renderAdminRedirects,
            type: "render"
        },
        {
            path: "/admin/redirects/create",
            route: renderAdminRedirectCreate,
            type: "render"
        },
        {
            path: "/admin/redirects/edit/:id",
            route: renderAdminRedirectEdit,
            type: "render"
        },
        {
            path: "/admin/redirects/delete/:id",
            route: handleAdminRedirectDelete,
            type: "action"
        },
        {
            path: "/admin/redirects/toggle/:id",
            route: handleAdminRedirectToggle,
            type: "action"
        },
        {
            path: "/admin/profile",
            route: renderAdminProfile,
            type: "render"
        },
        // ---- API Routes ----
        { path: "/api/bootstrap", route: apiBootstrap, type: "action" },
        { path: "/api/auth/login", route: apiAuthLogin, type: "action" },
        { path: "/api/dashboard", route: apiDashboard, type: "render" },
        { path: "/api/pages", route: apiPages, type: "render" },
        { path: "/api/pages/:id", route: apiPagesById, type: "render" },
        { path: "/api/articles", route: apiArticles, type: "render" },
        { path: "/api/articles/:id", route: apiArticlesById, type: "render" },
        { path: "/api/blog-categories", route: apiBlogCategories, type: "render" },
        { path: "/api/blog-categories/:id", route: apiBlogCategoriesById, type: "render" },
        { path: "/api/users", route: apiUsers, type: "render" },
        { path: "/api/users/:id", route: apiUsersById, type: "render" },
        { path: "/api/media", route: apiMedia, type: "render" },
        { path: "/api/media/:id", route: apiMediaById, type: "render" },
        { path: "/api/menu", route: apiMenu, type: "render" },
        { path: "/api/settings", route: apiSettings, type: "render" },
        { path: "/api/settings/:key", route: apiSettingsByKey, type: "render" },
        { path: "/api/redirects", route: apiRedirects, type: "render" },
        { path: "/api/redirects/:id", route: apiRedirectsById, type: "render" },
        { path: "/api/redirects/toggle/:id", route: apiRedirectsToggle, type: "action" },
        {
            path: "/:slug",
            route: renderPage,
            type: "render"
        },
    ];
}
