import { getReactPageTemplate } from "../../../react";
import { getPayloudData } from "../../../utils";
import { transformValidate, ValidationError } from "../../../validator";
import { DbProduct, DbCategory, requireAdmin, formatPrice, getProductStatusLabel, getProductStatusVariant, generateSlug } from "../shared";
import { ProductForm, CategoryForm } from "./catalog.validation";
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

    response.content = getReactPageTemplate(CATALOG_T.titles.products, "AdminProductList", {
        products: rows,
        categories: categories.map(c => ({ value: String(c.id), label: c.name })),
        statusFilter,
        categoryFilter,
    });
    return response;
}

export function renderAdminProductCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const categories = findActiveCategories();

    if (request.method === "post") {
        return handleProductCreate(request, response, categories);
    }

    response.content = getReactPageTemplate(CATALOG_T.titles.productCreate, "AdminProductForm", {
        categories: categories.map(c => ({ value: String(c.id), label: c.name })),
        values: { status: 'active', icon: DEFAULT_PRODUCT_ICON, stock: '0', price: '0' },
        isEdit: false,
    });
    return response;
}

function handleProductCreate(request: Request, response: Response, categories: DbCategory[]): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getReactPageTemplate(CATALOG_T.titles.productCreate, "AdminProductForm", {
            categories: categories.map(c => ({ value: String(c.id), label: c.name })),
            error: CATALOG_T.errors.invalidRequest,
            isEdit: false,
        });
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
            response.content = getReactPageTemplate(CATALOG_T.titles.productCreate, "AdminProductForm", {
                categories: categories.map(c => ({ value: String(c.id), label: c.name })),
                values: raw,
                error: firstError,
                isEdit: false,
            });
            return response;
        }
        response.content = getReactPageTemplate(CATALOG_T.titles.productCreate, "AdminProductForm", {
            categories: categories.map(c => ({ value: String(c.id), label: c.name })),
            values: raw,
            error: CATALOG_T.errors.genericError,
            isEdit: false,
        });
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

    response.content = getReactPageTemplate(CATALOG_T.titles.productEdit, "AdminProductForm", {
        categories: categories.map(c => ({ value: String(c.id), label: c.name })),
        values: formData,
        isEdit: true,
        galleryImages: galleryImages.map(img => img.storage_path),
    });
    return response;
}

function handleProductEdit(request: Request, response: Response, product: DbProduct, categories: DbCategory[]): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getReactPageTemplate(CATALOG_T.titles.productEdit, "AdminProductForm", {
            categories: categories.map(c => ({ value: String(c.id), label: c.name })),
            error: CATALOG_T.errors.invalidRequest,
            isEdit: true,
        });
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
            response.content = getReactPageTemplate(CATALOG_T.titles.productEdit, "AdminProductForm", {
                categories: categories.map(c => ({ value: String(c.id), label: c.name })),
                values: raw,
                error: firstError,
                isEdit: true,
            });
            return response;
        }
        response.content = getReactPageTemplate(CATALOG_T.titles.productEdit, "AdminProductForm", {
            categories: categories.map(c => ({ value: String(c.id), label: c.name })),
            values: raw,
            error: CATALOG_T.errors.genericError,
            isEdit: true,
        });
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

    response.content = getReactPageTemplate(CATALOG_T.titles.categories, "AdminCategoryList", {
        categories: rows,
        statusFilter,
    });
    return response;
}

export function renderAdminCategoryCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        return handleCategoryCreate(request, response);
    }

    response.content = getReactPageTemplate(CATALOG_T.titles.categoryCreate, "AdminCategoryForm", {
        values: { status: 'active', icon: DEFAULT_CATEGORY_ICON, sort_order: '0' },
        isEdit: false,
    });
    return response;
}

function handleCategoryCreate(request: Request, response: Response): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getReactPageTemplate(CATALOG_T.titles.categoryCreate, "AdminCategoryForm", {
            error: CATALOG_T.errors.invalidRequest,
            isEdit: false,
        });
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
            response.content = getReactPageTemplate(CATALOG_T.titles.categoryCreate, "AdminCategoryForm", {
                values: raw,
                error: firstError,
                isEdit: false,
            });
            return response;
        }
        response.content = getReactPageTemplate(CATALOG_T.titles.categoryCreate, "AdminCategoryForm", {
            values: raw,
            error: CATALOG_T.errors.genericError,
            isEdit: false,
        });
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

    response.content = getReactPageTemplate(CATALOG_T.titles.categoryEdit, "AdminCategoryForm", {
        values: formData,
        isEdit: true,
    });
    return response;
}

function handleCategoryEdit(request: Request, response: Response, category: DbCategory): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getReactPageTemplate(CATALOG_T.titles.categoryEdit, "AdminCategoryForm", {
            error: CATALOG_T.errors.invalidRequest,
            isEdit: true,
        });
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
            response.content = getReactPageTemplate(CATALOG_T.titles.categoryEdit, "AdminCategoryForm", {
                values: raw,
                error: firstError,
                isEdit: true,
            });
            return response;
        }
        response.content = getReactPageTemplate(CATALOG_T.titles.categoryEdit, "AdminCategoryForm", {
            values: raw,
            error: CATALOG_T.errors.genericError,
            isEdit: true,
        });
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
