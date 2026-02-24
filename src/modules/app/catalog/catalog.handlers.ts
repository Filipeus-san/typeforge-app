import { getHtmlTemplate } from "../../../template";
import { AdminLayout, AdminDataList, Badge, Avatar, escapeHtml } from "../../../components";
import { getPayloudData } from "../../../utils";
import { transformValidate, ValidationError } from "../../../validator";
import { DbProduct, DbCategory, requireAdmin, formatPrice, getProductStatusLabel, getProductStatusVariant, generateSlug } from "../shared";
import { ProductForm, CategoryForm } from "./catalog.validation";
import { getProductFormContent, getCategoryFormContent } from "./catalog.templates";
import { PRODUCT_STATUS_FILTER_OPTIONS, CATEGORY_STATUS_FILTER_OPTIONS, DEFAULT_PRODUCT_ICON, DEFAULT_CATEGORY_ICON } from "./catalog.const";
import {
    findAllProductsWithCategory, findActiveCategories, findProductById, insertProduct, updateProduct, deleteProduct,
    findAllCategoriesWithProductCount, findCategoryById, insertCategory, updateCategory, deleteCategory,
    findProductImages, replaceProductImages, findLastInsertedProduct
} from "./catalog.repository";
import { CATALOG_T } from "./catalog.translation";

// =============================================================================
// Admin Products Module
// =============================================================================

export function renderAdminProducts(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const products = findAllProductsWithCategory();

    const categories = findActiveCategories();

    const statusFilter = parseUrlQuery<{ status?: string; category?: string }>(request.query)?.status ?? '';
    const categoryFilter = parseUrlQuery<{ status?: string; category?: string }>(request.query)?.category ?? '';

    let filtered = products;
    if (statusFilter !== '') {
        filtered = filtered.filter(p => p.status === statusFilter);
    }
    if (categoryFilter !== '') {
        filtered = filtered.filter(p => String(p.category_id) === categoryFilter);
    }

    const rows = filtered.map(p => ({
        id: String(p.id),
        name: p.name,
        icon: p.icon || DEFAULT_PRODUCT_ICON,
        category_name: p.category_name || '',
        price: String(p.price),
        stock: String(p.stock),
        status: p.status,
    }));

    response.content = getHtmlTemplate(CATALOG_T.titles.products, AdminLayout({
        title: CATALOG_T.headings.products,
        activePage: "products",
        children: AdminDataList({
            columns: [
                { key: 'name', label: CATALOG_T.columns.product, render: (val, row) => `<div class="d-flex align-items-center gap-2">${Avatar({ icon: row.icon || DEFAULT_PRODUCT_ICON })} <strong>${escapeHtml(val)}</strong></div>` },
                { key: 'category_name', label: CATALOG_T.columns.category, render: (val) => escapeHtml(val || '-') },
                { key: 'price', label: CATALOG_T.columns.price, render: (val) => formatPrice(Number(val)) },
                { key: 'stock', label: CATALOG_T.columns.stock },
                { key: 'status', label: CATALOG_T.columns.status, render: (val) => Badge({ children: getProductStatusLabel(val), variant: getProductStatusVariant(val) as any }) },
            ],
            rows,
            actions: [
                { icon: 'pencil', href: (row) => `/admin/products/edit?id=${row.id}`, title: CATALOG_T.actions.edit },
                { icon: 'trash', href: (row) => `/admin/products/delete?id=${row.id}`, variant: 'danger', title: CATALOG_T.actions.delete, confirm: CATALOG_T.confirm.deleteProduct },
            ],
            filters: [
                { name: 'category', options: categories.map(c => ({ value: String(c.id), label: c.name })), value: categoryFilter, placeholder: CATALOG_T.filters.allCategories },
                { name: 'status', options: PRODUCT_STATUS_FILTER_OPTIONS, value: statusFilter, placeholder: CATALOG_T.filters.allStatuses },
            ],
            addButton: { label: CATALOG_T.actions.addProduct, href: '/admin/products/create' },
            emptyMessage: CATALOG_T.empty.products,
        }),
    }));
    return response;
}

export function renderAdminProductCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const categories = findActiveCategories();

    if (request.method === "post") {
        return handleProductCreate(request, response, categories);
    }

    response.content = getHtmlTemplate(CATALOG_T.titles.productCreate, AdminLayout({
        title: CATALOG_T.headings.productCreate,
        activePage: "products",
        children: getProductFormContent(request, categories, { status: 'active', icon: DEFAULT_PRODUCT_ICON, stock: '0', price: '0' })
    }));
    return response;
}

function handleProductCreate(request: Request, response: Response, categories: DbCategory[]): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(CATALOG_T.titles.productCreate, AdminLayout({
            title: CATALOG_T.headings.productCreate,
            activePage: "products",
            children: getProductFormContent(request, categories, undefined, CATALOG_T.errors.invalidRequest)
        }));
        return response;
    }

    try {
        const data = transformValidate(ProductForm, raw);
        const slug = (data.slug !== '' && data.slug !== undefined) ? data.slug : generateSlug(data.name);
        const categoryId = (data.category_id !== '' && data.category_id !== undefined) ? Number(data.category_id) : null;
        const stock = Number(data.stock) || 0;

        const featuredImage = (data.featured_image !== '' && data.featured_image !== undefined) ? data.featured_image : '';
        insertProduct(data.name, slug, data.short_description, data.description, categoryId !== null ? categoryId : 0, Number(data.price) || 0, (data.old_price !== '' && data.old_price !== undefined) ? Number(data.old_price) : 0, data.icon, stock, data.status, featuredImage);

        // Save gallery images
        const galleryStr = (data.gallery_images !== '' && data.gallery_images !== undefined) ? data.gallery_images : '';
        if (galleryStr !== '') {
            const lastProduct = findLastInsertedProduct();
            if (lastProduct) {
                const paths = stringSplit(galleryStr, ',');
                replaceProductImages(lastProduct.id, paths);
            }
        }

        response.status = 302;
        response.headers["Location"] = "/admin/products";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? CATALOG_T.errors.validationError;
            response.content = getHtmlTemplate(CATALOG_T.titles.productCreate, AdminLayout({
                title: CATALOG_T.headings.productCreate,
                activePage: "products",
                children: getProductFormContent(request, categories, raw, firstError)
            }));
            return response;
        }
        response.content = getHtmlTemplate(CATALOG_T.titles.productCreate, AdminLayout({
            title: CATALOG_T.headings.productCreate,
            activePage: "products",
            children: getProductFormContent(request, categories, raw, CATALOG_T.errors.genericError)
        }));
        return response;
    }
}

export function renderAdminProductEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const productId = params?.id;

    if (!productId) {
        response.status = 302;
        response.headers["Location"] = "/admin/products";
        return response;
    }

    const product = findProductById(Number(productId));
    if (!product) {
        response.status = 302;
        response.headers["Location"] = "/admin/products";
        return response;
    }

    const categories = findActiveCategories();
    const galleryImages = findProductImages(product.id);

    if (request.method === "post") {
        return handleProductEdit(request, response, product, categories);
    }

    const formData: Record<string, string> = {
        name: product.name,
        slug: product.slug,
        short_description: product.short_description || '',
        description: product.description || '',
        category_id: product.category_id ? String(product.category_id) : '',
        price: String(product.price),
        old_price: product.old_price ? String(product.old_price) : '',
        icon: product.icon || DEFAULT_PRODUCT_ICON,
        stock: String(product.stock),
        status: product.status,
        featured_image: product.featured_image || ''
    };

    response.content = getHtmlTemplate(CATALOG_T.titles.productEdit, AdminLayout({
        title: CATALOG_T.headings.productEdit,
        activePage: "products",
        children: getProductFormContent(request, categories, formData, undefined, true, galleryImages)
    }));
    return response;
}

function handleProductEdit(request: Request, response: Response, product: DbProduct, categories: DbCategory[]): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(CATALOG_T.titles.productEdit, AdminLayout({
            title: CATALOG_T.headings.productEdit,
            activePage: "products",
            children: getProductFormContent(request, categories, undefined, CATALOG_T.errors.invalidRequest, true)
        }));
        return response;
    }

    try {
        const data = transformValidate(ProductForm, raw);
        const slug = (data.slug !== '' && data.slug !== undefined) ? data.slug : generateSlug(data.name);
        const categoryId = (data.category_id !== '' && data.category_id !== undefined) ? Number(data.category_id) : null;
        const stock = Number(data.stock) || 0;

        const featuredImage = (data.featured_image !== '' && data.featured_image !== undefined) ? data.featured_image : '';
        updateProduct(product.id, data.name, slug, data.short_description, data.description, categoryId !== null ? categoryId : 0, Number(data.price) || 0, (data.old_price !== '' && data.old_price !== undefined) ? Number(data.old_price) : 0, data.icon, stock, data.status, featuredImage);

        // Save gallery images
        const galleryStr = (data.gallery_images !== '' && data.gallery_images !== undefined) ? data.gallery_images : '';
        if (galleryStr !== '') {
            const paths = stringSplit(galleryStr, ',');
            replaceProductImages(product.id, paths);
        } else {
            replaceProductImages(product.id, []);
        }

        response.status = 302;
        response.headers["Location"] = "/admin/products";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? CATALOG_T.errors.validationError;
            response.content = getHtmlTemplate(CATALOG_T.titles.productEdit, AdminLayout({
                title: CATALOG_T.headings.productEdit,
                activePage: "products",
                children: getProductFormContent(request, categories, raw, firstError, true)
            }));
            return response;
        }
        response.content = getHtmlTemplate(CATALOG_T.titles.productEdit, AdminLayout({
            title: CATALOG_T.headings.productEdit,
            activePage: "products",
            children: getProductFormContent(request, categories, raw, CATALOG_T.errors.genericError, true)
        }));
        return response;
    }
}

export function handleAdminProductDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const productId = params?.id;

    if (productId) {
        deleteProduct(Number(productId));
    }

    response.status = 302;
    response.headers["Location"] = "/admin/products";
    return response;
}

// =============================================================================
// Admin Categories Module
// =============================================================================

export function renderAdminCategories(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const categories = findAllCategoriesWithProductCount();

    const statusFilter = parseUrlQuery<{ status?: string }>(request.query)?.status ?? '';
    const filtered = statusFilter !== ''
        ? categories.filter(c => c.status === statusFilter)
        : categories;

    const rows = filtered.map((c: any) => ({
        id: String(c.id),
        name: c.name,
        icon: c.icon || DEFAULT_CATEGORY_ICON,
        description: c.description || '',
        product_count: String(c.product_count),
        status: c.status,
    }));

    response.content = getHtmlTemplate(CATALOG_T.titles.categories, AdminLayout({
        title: CATALOG_T.headings.categories,
        activePage: "categories",
        children: AdminDataList({
            columns: [
                { key: 'name', label: CATALOG_T.columns.category, render: (val, row) => `<div class="d-flex align-items-center gap-2">${Avatar({ icon: row.icon || DEFAULT_CATEGORY_ICON })} <strong>${escapeHtml(val)}</strong></div>` },
                { key: 'description', label: CATALOG_T.columns.description, render: (val) => escapeHtml(val || '-') },
                { key: 'product_count', label: CATALOG_T.columns.productCount },
                { key: 'status', label: CATALOG_T.columns.status, render: (val) => Badge({ children: val === 'active' ? CATALOG_T.statuses.active : CATALOG_T.statuses.hidden, variant: val === 'active' ? 'success' : 'warning' }) },
            ],
            rows,
            actions: [
                { icon: 'pencil', href: (row) => `/admin/categories/edit?id=${row.id}`, title: CATALOG_T.actions.edit },
                { icon: 'trash', href: (row) => `/admin/categories/delete?id=${row.id}`, variant: 'danger', title: CATALOG_T.actions.delete, confirm: CATALOG_T.confirm.deleteCategory },
            ],
            filters: [
                { name: 'status', options: CATEGORY_STATUS_FILTER_OPTIONS, value: statusFilter, placeholder: CATALOG_T.filters.allStatuses },
            ],
            addButton: { label: CATALOG_T.actions.addCategory, href: '/admin/categories/create' },
            emptyMessage: CATALOG_T.empty.categories,
        }),
    }));
    return response;
}

export function renderAdminCategoryCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        return handleCategoryCreate(request, response);
    }

    response.content = getHtmlTemplate(CATALOG_T.titles.categoryCreate, AdminLayout({
        title: CATALOG_T.headings.categoryCreate,
        activePage: "categories",
        children: getCategoryFormContent(request, { status: 'active', icon: DEFAULT_CATEGORY_ICON, sort_order: '0' })
    }));
    return response;
}

function handleCategoryCreate(request: Request, response: Response): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(CATALOG_T.titles.categoryCreate, AdminLayout({
            title: CATALOG_T.headings.categoryCreate,
            activePage: "categories",
            children: getCategoryFormContent(request, undefined, CATALOG_T.errors.invalidRequest)
        }));
        return response;
    }

    try {
        const data = transformValidate(CategoryForm, raw);
        const slug = (data.slug !== '' && data.slug !== undefined) ? data.slug : generateSlug(data.name);
        const sortOrder = Number(data.sort_order) || 0;

        const featuredImage = (data.featured_image !== '' && data.featured_image !== undefined) ? data.featured_image : '';
        insertCategory(data.name, slug, data.description, data.icon, data.status, sortOrder, featuredImage);

        response.status = 302;
        response.headers["Location"] = "/admin/categories";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? CATALOG_T.errors.validationError;
            response.content = getHtmlTemplate(CATALOG_T.titles.categoryCreate, AdminLayout({
                title: CATALOG_T.headings.categoryCreate,
                activePage: "categories",
                children: getCategoryFormContent(request, raw, firstError)
            }));
            return response;
        }
        response.content = getHtmlTemplate(CATALOG_T.titles.categoryCreate, AdminLayout({
            title: CATALOG_T.headings.categoryCreate,
            activePage: "categories",
            children: getCategoryFormContent(request, raw, CATALOG_T.errors.genericError)
        }));
        return response;
    }
}

export function renderAdminCategoryEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const categoryId = params?.id;

    if (!categoryId) {
        response.status = 302;
        response.headers["Location"] = "/admin/categories";
        return response;
    }

    const category = findCategoryById(Number(categoryId));
    if (!category) {
        response.status = 302;
        response.headers["Location"] = "/admin/categories";
        return response;
    }

    if (request.method === "post") {
        return handleCategoryEdit(request, response, category);
    }

    const formData: Record<string, string> = {
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        icon: category.icon || DEFAULT_CATEGORY_ICON,
        status: category.status,
        sort_order: String(category.sort_order),
        featured_image: category.featured_image || ''
    };

    response.content = getHtmlTemplate(CATALOG_T.titles.categoryEdit, AdminLayout({
        title: CATALOG_T.headings.categoryEdit,
        activePage: "categories",
        children: getCategoryFormContent(request, formData, undefined, true)
    }));
    return response;
}

function handleCategoryEdit(request: Request, response: Response, category: DbCategory): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(CATALOG_T.titles.categoryEdit, AdminLayout({
            title: CATALOG_T.headings.categoryEdit,
            activePage: "categories",
            children: getCategoryFormContent(request, undefined, CATALOG_T.errors.invalidRequest, true)
        }));
        return response;
    }

    try {
        const data = transformValidate(CategoryForm, raw);
        const slug = (data.slug !== '' && data.slug !== undefined) ? data.slug : generateSlug(data.name);
        const sortOrder = Number(data.sort_order) || 0;

        const featuredImage = (data.featured_image !== '' && data.featured_image !== undefined) ? data.featured_image : '';
        updateCategory(category.id, data.name, slug, data.description, data.icon, data.status, sortOrder, featuredImage);

        response.status = 302;
        response.headers["Location"] = "/admin/categories";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? CATALOG_T.errors.validationError;
            response.content = getHtmlTemplate(CATALOG_T.titles.categoryEdit, AdminLayout({
                title: CATALOG_T.headings.categoryEdit,
                activePage: "categories",
                children: getCategoryFormContent(request, raw, firstError, true)
            }));
            return response;
        }
        response.content = getHtmlTemplate(CATALOG_T.titles.categoryEdit, AdminLayout({
            title: CATALOG_T.headings.categoryEdit,
            activePage: "categories",
            children: getCategoryFormContent(request, raw, CATALOG_T.errors.genericError, true)
        }));
        return response;
    }
}

export function handleAdminCategoryDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const categoryId = params?.id;

    if (categoryId) {
        deleteCategory(Number(categoryId));
    }

    response.status = 302;
    response.headers["Location"] = "/admin/categories";
    return response;
}
