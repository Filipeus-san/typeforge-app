import { getHtmlTemplate } from "../../../template";
import { getCookie, setCookie, getPayloudData } from "../../../utils";
import {
    getCartPageContent,
    getCheckoutShippingContent,
    getCheckoutPaymentContent,
    getCheckoutReviewContent,
    getCheckoutConfirmationContent,
} from "./cart.templates";
import { findCartItems, addCartItem, updateCartItemQuantity, removeCartItem, getCartItemCount } from "./cart.repository";
import { CART_T } from "./cart.translation";

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
    response.content = getHtmlTemplate(CART_T.titles.cart, getCartPageContent(items));
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
    response.content = getHtmlTemplate(CART_T.titles.checkoutShipping, getCheckoutShippingContent(items));
    return response;
}

// CHECKOUT STEP 2: Payment
export function renderCheckoutPayment(request: Request, response: Response): Response {
    const cart = getCartSessionId(request, response);
    response = cart.response;
    const items = findCartItems(cart.sessionId);
    response.content = getHtmlTemplate(CART_T.titles.checkoutPayment, getCheckoutPaymentContent(items));
    return response;
}

// CHECKOUT STEP 3: Review
export function renderCheckoutReview(request: Request, response: Response): Response {
    const cart = getCartSessionId(request, response);
    response = cart.response;
    const items = findCartItems(cart.sessionId);
    response.content = getHtmlTemplate(CART_T.titles.checkoutReview, getCheckoutReviewContent(items));
    return response;
}

// CHECKOUT STEP 4: Confirmation
export function renderCheckoutConfirmation(request: Request, response: Response): Response {
    response.content = getHtmlTemplate(CART_T.titles.checkoutConfirmation, getCheckoutConfirmationContent());
    return response;
}
