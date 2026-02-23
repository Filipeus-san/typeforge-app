import { renderIndex, renderLogin, renderRegister, handleLogout, renderArticle, renderBlog, renderEshop, renderProduct, renderCategory, renderCart, handleCartAdd, handleCartUpdate, handleCartRemove, renderCheckout, renderCheckoutPayment, renderCheckoutReview, renderCheckoutConfirmation, renderAdmin, renderAdminAnalytics, renderAdminOrders, renderAdminOrderDetail, renderAdminOrderCreate, renderAdminOrderEdit, renderAdminProducts, renderAdminProductCreate, renderAdminProductEdit, handleAdminProductDelete, renderAdminCategories, renderAdminCategoryCreate, renderAdminCategoryEdit, handleAdminCategoryDelete, renderAdminCustomers, renderAdminCustomerDetail, renderAdminCustomerCreate, renderAdminCustomerEdit, handleAdminCustomerDelete, renderAdminPages, renderAdminArticles, renderAdminMedia, handleAdminMediaUpload, handleAdminMediaDelete, renderAdminSettings, renderAdminUsers, renderAdminUserCreate, renderAdminUserEdit, handleAdminUserDelete, renderAdminBlog, renderAdminBlogCreate, renderAdminBlogEdit, handleAdminBlogDelete, renderAdminWarehouse, renderAdminWarehouseCreate, renderAdminWarehouseEdit, handleAdminWarehouseDelete, renderAdminWarehouseStock, renderAdminWarehouseMovement, renderAdminTranslations, renderAdminTranslationCreate, renderAdminTranslationEdit, handleAdminTranslationDelete } from "./app";
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
            path: "/article",
            route: renderArticle,
            type: "render"
        },
        {
            path: "/blog",
            route: renderBlog,
            type: "render"
        },
        {
            path: "/eshop",
            route: renderEshop,
            type: "render"
        },
        {
            path: "/product",
            route: renderProduct,
            type: "render"
        },
        {
            path: "/category",
            route: renderCategory,
            type: "render"
        },
        {
            path: "/cart",
            route: renderCart,
            type: "render"
        },
        {
            path: "/cart/add",
            route: handleCartAdd,
            type: "action"
        },
        {
            path: "/cart/update",
            route: handleCartUpdate,
            type: "action"
        },
        {
            path: "/cart/remove",
            route: handleCartRemove,
            type: "action"
        },
        {
            path: "/checkout",
            route: renderCheckout,
            type: "render"
        },
        {
            path: "/checkout/payment",
            route: renderCheckoutPayment,
            type: "render"
        },
        {
            path: "/checkout/review",
            route: renderCheckoutReview,
            type: "render"
        },
        {
            path: "/checkout/confirmation",
            route: renderCheckoutConfirmation,
            type: "render"
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
            path: "/admin/orders",
            route: renderAdminOrders,
            type: "render"
        },
        {
            path: "/admin/orders/detail",
            route: renderAdminOrderDetail,
            type: "render"
        },
        {
            path: "/admin/orders/create",
            route: renderAdminOrderCreate,
            type: "action"
        },
        {
            path: "/admin/orders/edit",
            route: renderAdminOrderEdit,
            type: "action"
        },
        {
            path: "/admin/products",
            route: renderAdminProducts,
            type: "render"
        },
        {
            path: "/admin/products/create",
            route: renderAdminProductCreate,
            type: "action"
        },
        {
            path: "/admin/products/edit",
            route: renderAdminProductEdit,
            type: "action"
        },
        {
            path: "/admin/products/delete",
            route: handleAdminProductDelete,
            type: "action"
        },
        {
            path: "/admin/categories",
            route: renderAdminCategories,
            type: "render"
        },
        {
            path: "/admin/categories/create",
            route: renderAdminCategoryCreate,
            type: "action"
        },
        {
            path: "/admin/categories/edit",
            route: renderAdminCategoryEdit,
            type: "action"
        },
        {
            path: "/admin/categories/delete",
            route: handleAdminCategoryDelete,
            type: "action"
        },
        {
            path: "/admin/customers",
            route: renderAdminCustomers,
            type: "render"
        },
        {
            path: "/admin/customers/detail",
            route: renderAdminCustomerDetail,
            type: "render"
        },
        {
            path: "/admin/customers/create",
            route: renderAdminCustomerCreate,
            type: "action"
        },
        {
            path: "/admin/customers/edit",
            route: renderAdminCustomerEdit,
            type: "action"
        },
        {
            path: "/admin/customers/delete",
            route: handleAdminCustomerDelete,
            type: "action"
        },
        {
            path: "/admin/pages",
            route: renderAdminPages,
            type: "render"
        },
        {
            path: "/admin/articles",
            route: renderAdminArticles,
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
        {
            path: "/admin/blog",
            route: renderAdminBlog,
            type: "render"
        },
        {
            path: "/admin/blog/create",
            route: renderAdminBlogCreate,
            type: "action"
        },
        {
            path: "/admin/blog/edit",
            route: renderAdminBlogEdit,
            type: "action"
        },
        {
            path: "/admin/blog/delete",
            route: handleAdminBlogDelete,
            type: "action"
        },
        {
            path: "/admin/warehouse",
            route: renderAdminWarehouse,
            type: "render"
        },
        {
            path: "/admin/warehouse/create",
            route: renderAdminWarehouseCreate,
            type: "action"
        },
        {
            path: "/admin/warehouse/edit",
            route: renderAdminWarehouseEdit,
            type: "action"
        },
        {
            path: "/admin/warehouse/delete",
            route: handleAdminWarehouseDelete,
            type: "action"
        },
        {
            path: "/admin/warehouse/stock",
            route: renderAdminWarehouseStock,
            type: "render"
        },
        {
            path: "/admin/warehouse/movement",
            route: renderAdminWarehouseMovement,
            type: "action"
        },
        {
            path: "/admin/translations",
            route: renderAdminTranslations,
            type: "render"
        },
        {
            path: "/admin/translations/create",
            route: renderAdminTranslationCreate,
            type: "action"
        },
        {
            path: "/admin/translations/edit",
            route: renderAdminTranslationEdit,
            type: "action"
        },
        {
            path: "/admin/translations/delete",
            route: handleAdminTranslationDelete,
            type: "action"
        },
    ];
}
