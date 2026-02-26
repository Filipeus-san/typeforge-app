import { getReactPageTemplate } from "../../../react";
import { getCookie, setCookie, getPayloudData } from "../../../utils";
import { findCartItems, addCartItem, updateCartItemQuantity, removeCartItem, getCartItemCount } from "./cart.repository";


function getCartSessionId(request: Request, response: Response): { sessionId: string; response: Response } {
    let sessionId = getCookie("cart_session", request);
    if (!sessionId || sessionId.length === 0) {
        sessionId = uniqueKey();
        response = setCookie(
            { cart_session: sessionId },
            response,
            { path: "/", maxAge: 60 * 60 * 24 * 30, httpOnly: true, sameSite: "Lax" }
        );
    }
    return { sessionId, response };
}

export function renderCart(request: Request, response: Response): Response {
    const cart = getCartSessionId(request, response);
    response = cart.response;
    const items = findCartItems(cart.sessionId);
    response.content = getReactPageTemplate('Košík — TypeForge', "Cart", {
        items: items.map(item => ({
            productId: String(item.product_id),
            productName: item.product_name,
            productPrice: String(item.product_price),
            productOldPrice: item.product_old_price ? String(item.product_old_price) : undefined,
            quantity: String(item.quantity),
            productIcon: item.product_icon || '',
            productFeaturedImage: item.product_featured_image || '',
            categoryName: item.category_name || '',
        })),
    });
    return response;
}

export function handleCartAdd(request: Request, response: Response): Response {
    const cart = getCartSessionId(request, response);
    response = cart.response;

    if (request.method === "post") {
        const data = getPayloudData<Record<string, string>>(request);
        if (data) {
            const productId = Number(data.product_id);
            const rawQty = Number(data.quantity);
            const quantity = (rawQty > 0) ? rawQty : 1;
            logInfo("[Cart] POST add: productId=" + productId + " rawQty=" + rawQty + " quantity=" + quantity);
            if (productId > 0) {
                addCartItem(cart.sessionId, productId, quantity);
            }
        }
    } else {
        const params = parseUrlQuery<Record<string, string>>(request.query ?? '');
        const productId = Number(params.product_id);
        const rawQty = Number(params.quantity);
        const quantity = (rawQty > 0) ? rawQty : 1;
        logInfo("[Cart] GET add: productId=" + productId + " rawQty=" + rawQty + " quantity=" + quantity);
        if (productId > 0) {
            addCartItem(cart.sessionId, productId, quantity);
        }
    }

    response.status = 302;
    response.headers["Location"] = "/cart";
    return response;
}

export function handleCartUpdate(request: Request, response: Response): Response {
    const cart = getCartSessionId(request, response);
    response = cart.response;

    if (request.method === "post") {
        const data = getPayloudData<Record<string, string>>(request);
        if (data) {
            const productId = Number(data.product_id);
            const rawQty = Number(data.quantity);
            const quantity = (rawQty >= 0) ? rawQty : 0;
            if (productId > 0) {
                updateCartItemQuantity(cart.sessionId, productId, quantity);
            }
        }
    }

    response.status = 302;
    response.headers["Location"] = "/cart";
    return response;
}

export function handleCartRemove(request: Request, response: Response): Response {
    const cart = getCartSessionId(request, response);
    response = cart.response;

    const params = parseUrlQuery<Record<string, string>>(request.query ?? '');
    const productId = Number(params.product_id);
    if (productId > 0) {
        removeCartItem(cart.sessionId, productId);
    }

    response.status = 302;
    response.headers["Location"] = "/cart";
    return response;
}

// CHECKOUT STEP 1: Shipping/Delivery
export function renderCheckout(request: Request, response: Response): Response {
    const cart = getCartSessionId(request, response);
    response = cart.response;
    const items = findCartItems(cart.sessionId);
    response.content = getReactPageTemplate('Checkout - Doručení | TypeForge', "CheckoutShipping", {
        items: items.map(item => ({
            productName: item.product_name,
            quantity: String(item.quantity),
            productPrice: String(item.product_price),
            productIcon: item.product_icon || '',
            productFeaturedImage: item.product_featured_image || '',
        })),
    });
    return response;
}

// CHECKOUT STEP 2: Payment
export function renderCheckoutPayment(request: Request, response: Response): Response {
    const cart = getCartSessionId(request, response);
    response = cart.response;
    const items = findCartItems(cart.sessionId);
    response.content = getReactPageTemplate('Checkout - Platba | TypeForge', "CheckoutPayment", {
        items: items.map(item => ({
            productName: item.product_name,
            quantity: String(item.quantity),
            productPrice: String(item.product_price),
            productIcon: item.product_icon || '',
            productFeaturedImage: item.product_featured_image || '',
        })),
    });
    return response;
}

// CHECKOUT STEP 3: Review
export function renderCheckoutReview(request: Request, response: Response): Response {
    const cart = getCartSessionId(request, response);
    response = cart.response;
    const items = findCartItems(cart.sessionId);
    response.content = getReactPageTemplate('Checkout - Přehled | TypeForge', "CheckoutReview", {
        items: items.map(item => ({
            productName: item.product_name,
            quantity: String(item.quantity),
            productPrice: String(item.product_price),
            productIcon: item.product_icon || '',
            productFeaturedImage: item.product_featured_image || '',
        })),
    });
    return response;
}

// CHECKOUT STEP 4: Confirmation
export function renderCheckoutConfirmation(request: Request, response: Response): Response {
    response.content = getReactPageTemplate('Objednávka dokončena | TypeForge', "CheckoutConfirmation", {});
    return response;
}
