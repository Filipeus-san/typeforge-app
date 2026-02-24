import { getHtmlTemplate } from "../../../template";
import { DbProductWithCategory, DbCategory } from "../shared";
import { getEshopPageContent, getProductPageContent, getCategoryPageContent } from "./shop.templates";
import { findFeaturedProducts, findActiveCategoriesWithCount, findProductBySlug, findProductById, findActiveCategoryBySlug, findActiveProductsByCategory, findAllActiveProducts } from "./shop.repository";
import { findProductImages } from "../catalog/catalog.repository";
import { SHOP_T } from "./shop.translation";

export function renderEshop(request: Request, response: Response): Response {
    const products = findFeaturedProducts();
    const categories = findActiveCategoriesWithCount();
    response.content = getHtmlTemplate(SHOP_T.titles.eshop, getEshopPageContent(products, categories));
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
    response.content = getHtmlTemplate(`${product.name} ${SHOP_T.titles.product}`, getProductPageContent(product, galleryImages));
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

    const title = category ? category.name : SHOP_T.headings.allProducts;
    response.content = getHtmlTemplate(`${title} ${SHOP_T.titles.category}`, getCategoryPageContent(title, category, categoryProducts));
    return response;
}
