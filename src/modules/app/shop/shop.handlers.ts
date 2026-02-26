import { getReactPageTemplate } from "../../../react";
import { DbProductWithCategory, DbCategory } from "../shared";
import { findFeaturedProducts, findActiveCategoriesWithCount, findProductBySlug, findProductById, findActiveCategoryBySlug, findActiveProductsByCategory, findAllActiveProducts } from "./shop.repository";
import { findProductImages } from "../catalog/catalog.repository";


export function renderEshop(request: Request, response: Response): Response {
    const products = findFeaturedProducts();
    const categories = findActiveCategoriesWithCount();
    response.content = getReactPageTemplate('E-Shop — TypeForge', "Eshop", {
        products: products.map(p => ({
            id: String(p.id),
            name: p.name,
            slug: p.slug,
            price: String(p.price),
            oldPrice: p.old_price ? String(p.old_price) : undefined,
            shortDescription: p.short_description || '',
            icon: p.icon || 'box',
            featuredImage: p.featured_image || '',
            categoryName: p.category_name || '',
        })),
        categories: categories.map(c => ({
            id: String(c.id),
            name: c.name,
            slug: c.slug,
            description: c.description || '',
            icon: c.icon || 'grid',
            productCount: String(c.product_count || 0),
            featuredImage: c.featured_image || '',
        })),
    });
    return response;
}

export function renderProduct(request: Request, response: Response): Response {
    const params = parseUrlQuery<{ slug?: string; id?: string }>(request.query);
    let product: DbProductWithCategory | null = null;

    if (params?.slug) {
        product = findProductBySlug(params.slug);
    } else if (params?.id) {
        product = findProductById(Number(params.id));
    }

    if (!product) {
        response.status = 302;
        response.headers["Location"] = "/eshop";
        return response;
    }

    const galleryImages = findProductImages(product.id);
    response.content = getReactPageTemplate(`${product.name} — TypeForge E-Shop`, "Product", {
        product: {
            id: String(product.id),
            name: product.name,
            slug: product.slug,
            description: product.description || '',
            shortDescription: product.short_description || '',
            price: String(product.price),
            oldPrice: product.old_price ? String(product.old_price) : undefined,
            stock: String(product.stock),
            icon: product.icon || 'box',
            featuredImage: product.featured_image || '',
            categoryName: product.category_name || '',
        },
        galleryImages: galleryImages.map(img => img.storage_path),
    });
    return response;
}

export function renderCategory(request: Request, response: Response): Response {
    const params = parseUrlQuery<{ slug?: string }>(request.query);
    let category: DbCategory | null = null;
    let categoryProducts: DbProductWithCategory[] = [];

    if (params?.slug) {
        category = findActiveCategoryBySlug(params.slug);
        if (category) {
            categoryProducts = findActiveProductsByCategory(category.id);
        }
    }

    if (!category) {
        // Show all products if no category slug
        categoryProducts = findAllActiveProducts();
    }

    const title = category ? category.name : undefined;
    const pageTitle = title ? `${title} — TypeForge E-Shop` : '— TypeForge E-Shop';
    response.content = getReactPageTemplate(pageTitle, "Category", {
        title,
        category: category ? {
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            icon: category.icon || 'grid',
            featuredImage: category.featured_image || '',
        } : undefined,
        products: categoryProducts.map(p => ({
            id: String(p.id),
            name: p.name,
            slug: p.slug,
            price: String(p.price),
            oldPrice: p.old_price ? String(p.old_price) : undefined,
            shortDescription: p.short_description || '',
            icon: p.icon || 'box',
            featuredImage: p.featured_image || '',
            categoryName: p.category_name || '',
        })),
    });
    return response;
}
