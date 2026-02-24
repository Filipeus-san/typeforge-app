import { escapeHtml } from "../../../components";
import { formatPrice } from "../shared";
import { DbCartItem } from "./cart.repository";

function getCartItemIcon(item: DbCartItem): string {
    if (item.product_featured_image) {
        const url = storageGetUrl(item.product_featured_image);
        return `<img src="${url}" alt="${escapeHtml(item.product_name)}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">`;
    }
    return `<i class="bi bi-${item.product_icon || 'box'}"></i>`;
}

function renderCartItems(items: DbCartItem[]): string {
    let html = '';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const lineTotal = item.product_price * item.quantity;
        html += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        ${getCartItemIcon(item)}
                    </div>
                    <div class="cart-item-details">
                        <span class="cart-item-category">${escapeHtml(item.category_name ?? '')}</span>
                        <h5 class="cart-item-name">${escapeHtml(item.product_name)}</h5>
                        <div class="cart-item-price-mobile d-lg-none">
                            <span class="price">${formatPrice(item.product_price)}</span>
                            ${item.product_old_price ? `<span class="price-old">${formatPrice(item.product_old_price)}</span>` : ''}
                        </div>
                    </div>
                    <div class="cart-item-quantity">
                        <form method="post" action="/cart/update" style="display:inline">
                            <input type="hidden" name="product_id" value="${item.product_id}">
                            <input type="hidden" name="quantity" value="${item.quantity - 1}">
                            <button type="submit" class="qty-btn"><i class="bi bi-dash"></i></button>
                        </form>
                        <span class="qty-value">${item.quantity}</span>
                        <form method="post" action="/cart/update" style="display:inline">
                            <input type="hidden" name="product_id" value="${item.product_id}">
                            <input type="hidden" name="quantity" value="${item.quantity + 1}">
                            <button type="submit" class="qty-btn"><i class="bi bi-plus"></i></button>
                        </form>
                    </div>
                    <div class="cart-item-price d-none d-lg-block">
                        <span class="price">${formatPrice(item.product_price)}</span>
                        ${item.product_old_price ? `<span class="price-old">${formatPrice(item.product_old_price)}</span>` : ''}
                    </div>
                    <div class="cart-item-total d-none d-lg-block">
                        <span class="total">${formatPrice(lineTotal)}</span>
                    </div>
                    <a href="/cart/remove?product_id=${item.product_id}" class="cart-item-remove">
                        <i class="bi bi-trash3"></i>
                    </a>
                </div>`;
    }
    return html;
}

function calculateSubtotal(items: DbCartItem[]): number {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].product_price * items[i].quantity;
    }
    return total;
}

function calculateTotalQuantity(items: DbCartItem[]): number {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].quantity;
    }
    return total;
}

export function getCartPageContent(items: DbCartItem[]): string {
    const subtotal = calculateSubtotal(items);
    const totalQty = calculateTotalQuantity(items);
    const isEmpty = items.length === 0;

    return `
<style>
.cart-wrapper {
    min-height: 100vh;
    padding-top: 6rem;
    padding-bottom: 4rem;
}
.cart-header {
    margin-bottom: 2rem;
}
.cart-title {
    font-size: 2.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
}
.cart-subtitle {
    color: var(--tf-text-muted);
    font-size: 1rem;
}
.cart-content {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 2rem;
    align-items: start;
}
@media (max-width: 992px) {
    .cart-content {
        grid-template-columns: 1fr;
    }
}
.cart-items {
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    overflow: hidden;
}
.cart-items-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr auto;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: rgba(255,255,255,0.02);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--tf-text-muted);
}
@media (max-width: 992px) {
    .cart-items-header {
        display: none;
    }
}
.cart-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr auto;
    gap: 1rem;
    padding: 1.5rem;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: background 0.2s ease;
}
.cart-item:last-child {
    border-bottom: none;
}
.cart-item:hover {
    background: rgba(255,255,255,0.02);
}
@media (max-width: 992px) {
    .cart-item {
        grid-template-columns: auto 1fr auto auto;
        gap: 1rem;
    }
}
.cart-item-image {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, rgba(124,92,252,0.1) 0%, rgba(6,214,160,0.1) 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
}
.cart-item-image i {
    font-size: 2rem;
    color: var(--tf-text-muted);
}
.cart-item-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
.cart-item-category {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--tf-accent);
}
.cart-item-name {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
    color: var(--tf-text);
}
.cart-item-price-mobile {
    margin-top: 0.5rem;
}
.cart-item-quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 0.25rem;
}
.qty-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: var(--tf-text);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}
.qty-btn:hover {
    background: var(--tf-accent);
    color: #0f0f17;
}
.qty-value {
    min-width: 2rem;
    text-align: center;
    font-weight: 700;
}
.cart-item-price .price,
.cart-item-price-mobile .price {
    font-weight: 700;
    color: var(--tf-text);
}
.cart-item-price .price-old,
.cart-item-price-mobile .price-old {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
    text-decoration: line-through;
    margin-left: 0.5rem;
}
.cart-item-total .total {
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--tf-accent);
}
.cart-item-remove {
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(239,68,68,0.1);
    color: #ef4444;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
}
.cart-item-remove:hover {
    background: #ef4444;
    color: white;
}
.cart-summary {
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    padding: 1.5rem;
    position: sticky;
    top: 6rem;
}
.summary-title {
    font-size: 1.25rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
}
.summary-row.total {
    border-top: 1px solid rgba(255,255,255,0.05);
    margin-top: 1rem;
    padding-top: 1.5rem;
}
.summary-label {
    color: var(--tf-text-muted);
}
.summary-value {
    font-weight: 700;
}
.summary-value.free {
    color: var(--tf-accent);
}
.summary-total-label {
    font-size: 1.1rem;
    font-weight: 700;
}
.summary-total-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--tf-accent);
}
.btn-checkout {
    width: 100%;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
    background: var(--tf-accent);
    color: #0f0f17;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
}
.btn-checkout:hover {
    background: #05c795;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(6,214,160,0.25);
}
.btn-continue {
    width: 100%;
    padding: 0.85rem 1.5rem;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    background: transparent;
    color: var(--tf-text);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
}
.btn-continue:hover {
    border-color: var(--tf-accent);
    color: var(--tf-accent);
}
.shipping-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(6,214,160,0.1);
    border: 1px solid rgba(6,214,160,0.2);
    border-radius: 12px;
    margin-top: 1rem;
    font-size: 0.9rem;
}
.shipping-info i {
    font-size: 1.25rem;
    color: var(--tf-accent);
}
.navbar-tf {
    background: rgba(15,15,23,0.85) !important;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.navbar-tf .navbar-brand {
    font-weight: 800;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
}
.cart-badge {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding-right: 0.5rem;
}
.cart-badge .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    font-size: 0.7rem;
    font-weight: 700;
    background: var(--tf-accent);
    color: #0f0f17;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.cart-empty {
    text-align: center;
    padding: 4rem 2rem;
}
.cart-empty i {
    font-size: 4rem;
    color: var(--tf-text-muted);
    margin-bottom: 1.5rem;
    display: block;
}
.cart-empty h3 {
    font-weight: 700;
    margin-bottom: 0.75rem;
}
.cart-empty p {
    color: var(--tf-text-muted);
    margin-bottom: 2rem;
}
.cart-empty a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.5rem;
    background: var(--tf-accent);
    color: #0f0f17;
    border-radius: 12px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease;
}
.cart-empty a:hover {
    background: #05c795;
    transform: translateY(-2px);
}
</style>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark navbar-tf fixed-top">
    <div class="container">
        <a class="navbar-brand text-gradient" href="/">
            <i class="bi bi-braces-asterisk me-2"></i>TypeForge
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMain">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center" style="list-style:none;">
                <li class="nav-item"><a class="nav-link" href="/">Domu</a></li>
                <li class="nav-item"><a class="nav-link" href="/eshop">E-Shop</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin"><i class="bi bi-speedometer2 me-1"></i>Admin</a></li>
                <li class="nav-item">
                    <a class="nav-link cart-badge active" href="/cart">
                        <i class="bi bi-cart3"></i>
                        ${totalQty > 0 ? `<span class="badge">${totalQty}</span>` : ''}
                    </a>
                </li>
            </ul>
            <button class="btn-theme-toggle ms-lg-3 me-2" @click="$store.theme.toggle()" title="Prepnout tema">
                <i class="bi bi-moon"></i>
                <i class="bi bi-sun"></i>
            </button>
            <a href="/login" class="btn btn-outline-tf btn-sm">
                <i class="bi bi-box-arrow-in-right me-1"></i>Login
            </a>
        </div>
    </div>
</nav>

<div class="cart-wrapper">
    <div class="container">
        <div class="cart-header">
            <h1 class="cart-title">
                <i class="bi bi-cart3 me-2 text-gradient"></i>
                Vas kosik
            </h1>
            <p class="cart-subtitle">${isEmpty ? 'Kosik je prazdny' : `Mate ${totalQty} ${totalQty === 1 ? 'polozku' : 'polozek'} v kosiku`}</p>
        </div>

        ${isEmpty ? `
        <div class="cart-items">
            <div class="cart-empty">
                <i class="bi bi-cart-x"></i>
                <h3>Kosik je prazdny</h3>
                <p>Zda se, ze jeste nemate v kosiku zadne produkty.</p>
                <a href="/eshop"><i class="bi bi-shop"></i> Prejit do e-shopu</a>
            </div>
        </div>
        ` : `
        <div class="cart-content">
            <div class="cart-items">
                <div class="cart-items-header">
                    <span>Produkt</span>
                    <span>Mnozstvi</span>
                    <span>Cena</span>
                    <span>Celkem</span>
                    <span></span>
                </div>
                ${renderCartItems(items)}
            </div>

            <div class="cart-summary">
                <h3 class="summary-title">Souhrn objednavky</h3>

                <div class="summary-row">
                    <span class="summary-label">Mezisoucet</span>
                    <span class="summary-value">${formatPrice(subtotal)}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Doprava</span>
                    <span class="summary-value free">Zdarma</span>
                </div>
                <div class="summary-row total">
                    <span class="summary-total-label">Celkem</span>
                    <span class="summary-total-value">${formatPrice(subtotal)}</span>
                </div>

                <div class="shipping-info">
                    <i class="bi bi-truck"></i>
                    <span>Mate narok na dopravu zdarma!</span>
                </div>

                <a href="/checkout" class="btn-checkout">
                    <i class="bi bi-credit-card"></i>
                    Pokracovat k platbe
                </a>
                <a href="/eshop" class="btn-continue">
                    <i class="bi bi-arrow-left"></i>
                    Pokracovat v nakupu
                </a>
            </div>
        </div>
        `}
    </div>
</div>

<!-- Footer -->
<footer class="py-4 text-center border-top" style="border-color:rgba(255,255,255,0.05)!important;">
    <div class="container">
        <p class="text-muted-tf small mb-0">TypeForge &mdash; Lorem ipsum dolor sit amet</p>
    </div>
</footer>

`;
}

// ============================================
// CHECKOUT PAGES
// ============================================

export function getCheckoutNavbar(): string {
    return `
<nav class="navbar navbar-expand-lg navbar-dark navbar-tf fixed-top">
    <div class="container">
        <a class="navbar-brand text-gradient" href="/">
            <i class="bi bi-braces-asterisk me-2"></i>TypeForge
        </a>
        <div class="ms-auto d-flex align-items-center">
            <span class="text-muted-tf me-3 d-none d-md-inline">
                <i class="bi bi-lock-fill me-1"></i>Zabezpeceny checkout
            </span>
            <a href="/cart" class="btn btn-outline-tf btn-sm">
                <i class="bi bi-arrow-left me-1"></i>Zpet do kosiku
            </a>
        </div>
    </div>
</nav>`;
}

export function getCheckoutStyles(): string {
    return `
<style>
.checkout-wrapper {
    min-height: 100vh;
    padding-top: 6rem;
    padding-bottom: 4rem;
}
.checkout-header {
    margin-bottom: 2rem;
}
.checkout-title {
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
}
.checkout-subtitle {
    color: var(--tf-text-muted);
    font-size: 1rem;
}
.checkout-content {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 2rem;
    align-items: start;
}
@media (max-width: 992px) {
    .checkout-content {
        grid-template-columns: 1fr;
    }
}
.checkout-progress {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    padding: 0;
    list-style: none;
}
.progress-step {
    display: flex;
    align-items: center;
    position: relative;
}
.progress-step:not(:last-child)::after {
    content: '';
    width: 60px;
    height: 2px;
    background: rgba(255,255,255,0.1);
    margin: 0 1rem;
}
.progress-step.active:not(:last-child)::after {
    background: var(--tf-accent);
}
.progress-step.completed:not(:last-child)::after {
    background: var(--tf-accent);
}
.step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    background: rgba(255,255,255,0.05);
    border: 2px solid rgba(255,255,255,0.1);
    color: var(--tf-text-muted);
    transition: all 0.3s ease;
}
.progress-step.active .step-number {
    background: var(--tf-accent);
    border-color: var(--tf-accent);
    color: #0f0f17;
}
.progress-step.completed .step-number {
    background: var(--tf-accent);
    border-color: var(--tf-accent);
    color: #0f0f17;
}
.step-label {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--tf-text-muted);
    white-space: nowrap;
}
.progress-step.active .step-label,
.progress-step.completed .step-label {
    color: var(--tf-text);
}
.checkout-form-card {
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    padding: 2rem;
}
.form-section-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.form-section-title i {
    color: var(--tf-accent);
}
.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}
@media (max-width: 576px) {
    .form-row {
        grid-template-columns: 1fr;
    }
}
.form-group {
    margin-bottom: 1.25rem;
}
.form-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--tf-text);
}
.form-input {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    background: var(--tf-bg);
    color: var(--tf-text);
    font-size: 0.95rem;
    transition: all 0.2s ease;
}
.form-input:focus {
    outline: none;
    border-color: var(--tf-accent);
    box-shadow: 0 0 0 3px rgba(6,214,160,0.1);
}
.form-input::placeholder {
    color: var(--tf-text-muted);
}
.form-select {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    background: var(--tf-bg);
    color: var(--tf-text);
    font-size: 0.95rem;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
}
.form-select:focus {
    outline: none;
    border-color: var(--tf-accent);
}
.delivery-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.delivery-option {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
}
.delivery-option:hover {
    border-color: rgba(255,255,255,0.2);
}
.delivery-option.selected {
    border-color: var(--tf-accent);
    background: rgba(6,214,160,0.05);
}
.delivery-option input {
    display: none;
}
.delivery-radio {
    width: 22px;
    height: 22px;
    border: 2px solid rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
}
.delivery-option.selected .delivery-radio {
    border-color: var(--tf-accent);
}
.delivery-option.selected .delivery-radio::after {
    content: '';
    width: 10px;
    height: 10px;
    background: var(--tf-accent);
    border-radius: 50%;
}
.delivery-info {
    flex: 1;
}
.delivery-title {
    font-weight: 700;
    margin-bottom: 0.25rem;
}
.delivery-desc {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
}
.delivery-price {
    font-weight: 700;
    color: var(--tf-accent);
    white-space: nowrap;
}
.payment-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.payment-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
}
.payment-option:hover {
    border-color: rgba(255,255,255,0.2);
}
.payment-option.selected {
    border-color: var(--tf-accent);
    background: rgba(6,214,160,0.05);
}
.payment-option input {
    display: none;
}
.payment-icon {
    width: 48px;
    height: 48px;
    background: rgba(255,255,255,0.05);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}
.payment-option.selected .payment-icon {
    background: rgba(6,214,160,0.1);
    color: var(--tf-accent);
}
.payment-info {
    flex: 1;
}
.payment-title {
    font-weight: 700;
    margin-bottom: 0.25rem;
}
.payment-desc {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
}
.card-form {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: rgba(255,255,255,0.02);
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.05);
}
.order-summary {
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    padding: 1.5rem;
    position: sticky;
    top: 6rem;
}
.summary-title {
    font-size: 1.25rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.summary-items {
    margin-bottom: 1.5rem;
}
.summary-item {
    display: flex;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.03);
}
.summary-item:last-child {
    border-bottom: none;
}
.summary-item-image {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, rgba(124,92,252,0.1) 0%, rgba(6,214,160,0.1) 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
}
.summary-item-image i {
    font-size: 1.25rem;
    color: var(--tf-text-muted);
}
.summary-item-details {
    flex: 1;
    min-width: 0;
}
.summary-item-name {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.summary-item-qty {
    font-size: 0.8rem;
    color: var(--tf-text-muted);
}
.summary-item-price {
    font-weight: 700;
    font-size: 0.9rem;
    white-space: nowrap;
}
.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
}
.summary-row.total {
    border-top: 1px solid rgba(255,255,255,0.05);
    margin-top: 0.5rem;
    padding-top: 1rem;
}
.summary-label {
    color: var(--tf-text-muted);
}
.summary-value {
    font-weight: 700;
}
.summary-value.free {
    color: var(--tf-accent);
}
.summary-total-label {
    font-size: 1.1rem;
    font-weight: 700;
}
.summary-total-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--tf-accent);
}
.btn-checkout-next {
    width: 100%;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
    background: var(--tf-accent);
    color: #0f0f17;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
}
.btn-checkout-next:hover {
    background: #05c795;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(6,214,160,0.25);
    color: #0f0f17;
}
.btn-checkout-back {
    width: 100%;
    padding: 0.85rem 1.5rem;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    background: transparent;
    color: var(--tf-text);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
}
.btn-checkout-back:hover {
    border-color: var(--tf-accent);
    color: var(--tf-accent);
}
.review-section {
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}
.review-section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.review-section-title {
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.review-section-title i {
    color: var(--tf-accent);
}
.review-edit-link {
    font-size: 0.85rem;
    color: var(--tf-primary-light);
    text-decoration: none;
}
.review-edit-link:hover {
    text-decoration: underline;
}
.review-content p {
    margin: 0.5rem 0;
    color: var(--tf-text-muted);
}
.review-content strong {
    color: var(--tf-text);
}
.confirmation-card {
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    padding: 3rem;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
}
.confirmation-icon {
    width: 80px;
    height: 80px;
    background: rgba(6,214,160,0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
}
.confirmation-icon i {
    font-size: 2.5rem;
    color: var(--tf-accent);
}
.confirmation-title {
    font-size: 1.75rem;
    font-weight: 800;
    margin-bottom: 0.75rem;
}
.confirmation-subtitle {
    color: var(--tf-text-muted);
    margin-bottom: 2rem;
}
.confirmation-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
}
@media (max-width: 576px) {
    .confirmation-actions {
        flex-direction: column;
    }
}
.btn-confirmation {
    padding: 0.85rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
}
.btn-confirmation-primary {
    background: var(--tf-accent);
    color: #0f0f17;
    border: none;
}
.btn-confirmation-primary:hover {
    background: #05c795;
    transform: translateY(-2px);
}
.btn-confirmation-secondary {
    background: transparent;
    color: var(--tf-text);
    border: 1px solid rgba(255,255,255,0.1);
}
.btn-confirmation-secondary:hover {
    border-color: var(--tf-accent);
    color: var(--tf-accent);
}
.navbar-tf {
    background: rgba(15,15,23,0.85) !important;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.navbar-tf .navbar-brand {
    font-weight: 800;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
}
</style>`;
}

export function getCheckoutProgressHtml(currentStep: number): string {
    const steps = [
        { num: 1, label: "Doruceni" },
        { num: 2, label: "Platba" },
        { num: 3, label: "Prehled" },
        { num: 4, label: "Hotovo" }
    ];

    let html = '<ul class="checkout-progress">';
    for (const step of steps) {
        let className = "progress-step";
        if (step.num < currentStep) {
            className += " completed";
        } else if (step.num === currentStep) {
            className += " active";
        }
        html += `
            <li class="${className}">
                <span class="step-number">${step.num < currentStep ? '<i class="bi bi-check"></i>' : step.num}</span>
                <span class="step-label">${step.label}</span>
            </li>`;
    }
    html += '</ul>';
    return html;
}

function getSummaryItemIcon(item: DbCartItem): string {
    if (item.product_featured_image) {
        const url = storageGetUrl(item.product_featured_image);
        return `<img src="${url}" alt="${escapeHtml(item.product_name)}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
    }
    return `<i class="bi bi-${item.product_icon || 'box'}"></i>`;
}

export function getOrderSummaryHtml(items: DbCartItem[]): string {
    const subtotal = calculateSubtotal(items);

    let itemsHtml = '';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const lineTotal = item.product_price * item.quantity;
        itemsHtml += `
        <div class="summary-item">
            <div class="summary-item-image">
                ${getSummaryItemIcon(item)}
            </div>
            <div class="summary-item-details">
                <div class="summary-item-name">${escapeHtml(item.product_name)}</div>
                <div class="summary-item-qty">${item.quantity}x</div>
            </div>
            <div class="summary-item-price">${formatPrice(lineTotal)}</div>
        </div>`;
    }

    return `
<div class="order-summary">
    <h3 class="summary-title">Vase objednavka</h3>

    <div class="summary-items">
        ${itemsHtml}
    </div>

    <div class="summary-row">
        <span class="summary-label">Mezisoucet</span>
        <span class="summary-value">${formatPrice(subtotal)}</span>
    </div>
    <div class="summary-row">
        <span class="summary-label">Doprava</span>
        <span class="summary-value free">Zdarma</span>
    </div>
    <div class="summary-row total">
        <span class="summary-total-label">Celkem</span>
        <span class="summary-total-value">${formatPrice(subtotal)}</span>
    </div>
</div>`;
}

export function getCheckoutShippingContent(items: DbCartItem[]): string {
    return `
${getCheckoutStyles()}

${getCheckoutNavbar()}

<div class="checkout-wrapper">
    <div class="container">
        ${getCheckoutProgressHtml(1)}

        <div class="checkout-header text-center">
            <h1 class="checkout-title">Dodaci udaje</h1>
            <p class="checkout-subtitle">Vyplnte adresu pro doruceni vasi objednavky</p>
        </div>

        <div class="checkout-content">
            <div class="checkout-form-card">
                <h3 class="form-section-title">
                    <i class="bi bi-person"></i>
                    Kontaktni udaje
                </h3>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Jmeno *</label>
                        <input type="text" class="form-input" placeholder="Jan" id="firstName">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Prijmeni *</label>
                        <input type="text" class="form-input" placeholder="Novak" id="lastName">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">E-mail *</label>
                        <input type="email" class="form-input" placeholder="jan.novak@email.cz" id="email">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Telefon *</label>
                        <input type="tel" class="form-input" placeholder="+420 123 456 789" id="phone">
                    </div>
                </div>

                <h3 class="form-section-title" style="margin-top: 2rem;">
                    <i class="bi bi-geo-alt"></i>
                    Dodaci adresa
                </h3>

                <div class="form-group">
                    <label class="form-label">Ulice a cislo popisne *</label>
                    <input type="text" class="form-input" placeholder="Vaclavske namesti 1" id="street">
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Mesto *</label>
                        <input type="text" class="form-input" placeholder="Praha" id="city">
                    </div>
                    <div class="form-group">
                        <label class="form-label">PSC *</label>
                        <input type="text" class="form-input" placeholder="110 00" id="zip">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Zeme</label>
                    <select class="form-select" id="country">
                        <option value="CZ" selected>Ceska republika</option>
                        <option value="SK">Slovensko</option>
                    </select>
                </div>

                <h3 class="form-section-title" style="margin-top: 2rem;">
                    <i class="bi bi-truck"></i>
                    Zpusob doruceni
                </h3>

                <div class="delivery-options" x-data="{ delivery: 'standard' }">
                    <label class="delivery-option" :class="{'selected': delivery === 'standard'}" @click="delivery = 'standard'">
                        <input type="radio" name="delivery" value="standard" :checked="delivery === 'standard'">
                        <span class="delivery-radio"></span>
                        <div class="delivery-info">
                            <div class="delivery-title">Standardni doruceni</div>
                            <div class="delivery-desc">Doruceni do 3-5 pracovnich dnu</div>
                        </div>
                        <span class="delivery-price">Zdarma</span>
                    </label>

                    <label class="delivery-option" :class="{'selected': delivery === 'express'}" @click="delivery = 'express'">
                        <input type="radio" name="delivery" value="express" :checked="delivery === 'express'">
                        <span class="delivery-radio"></span>
                        <div class="delivery-info">
                            <div class="delivery-title">Expresni doruceni</div>
                            <div class="delivery-desc">Doruceni do 1-2 pracovnich dnu</div>
                        </div>
                        <span class="delivery-price">99 Kc</span>
                    </label>

                    <label class="delivery-option" :class="{'selected': delivery === 'pickup'}" @click="delivery = 'pickup'">
                        <input type="radio" name="delivery" value="pickup" :checked="delivery === 'pickup'">
                        <span class="delivery-radio"></span>
                        <div class="delivery-info">
                            <div class="delivery-title">Osobni odber</div>
                            <div class="delivery-desc">Vyzvednete na nasi prodejne v Praze</div>
                        </div>
                        <span class="delivery-price">Zdarma</span>
                    </label>
                </div>
            </div>

            ${getOrderSummaryHtml(items)}
        </div>

        <div class="text-center mt-4" style="max-width: 500px; margin-left: auto; margin-right: auto;">
            <a href="/checkout/payment" class="btn-checkout-next">
                Pokracovat k platbe
                <i class="bi bi-arrow-right"></i>
            </a>
            <a href="/cart" class="btn-checkout-back">
                <i class="bi bi-arrow-left"></i>
                Zpet do kosiku
            </a>
        </div>
    </div>
</div>`;

}

export function getCheckoutPaymentContent(items: DbCartItem[]): string {
    return `
${getCheckoutStyles()}

${getCheckoutNavbar()}

<div class="checkout-wrapper">
    <div class="container">
        ${getCheckoutProgressHtml(2)}

        <div class="checkout-header text-center">
            <h1 class="checkout-title">Zpusob platby</h1>
            <p class="checkout-subtitle">Vyberte, jak chcete zaplatit</p>
        </div>

        <div class="checkout-content" x-data="{ payment: 'card', billingDifferent: false }">
            <div class="checkout-form-card">
                <h3 class="form-section-title">
                    <i class="bi bi-credit-card"></i>
                    Vyberte platebni metodu
                </h3>

                <div class="payment-options">
                    <label class="payment-option" :class="{'selected': payment === 'card'}" @click="payment = 'card'">
                        <input type="radio" name="payment" value="card" :checked="payment === 'card'">
                        <div class="payment-icon">
                            <i class="bi bi-credit-card-2-front"></i>
                        </div>
                        <div class="payment-info">
                            <div class="payment-title">Platebni karta</div>
                            <div class="payment-desc">Visa, Mastercard, Maestro</div>
                        </div>
                    </label>

                    <label class="payment-option" :class="{'selected': payment === 'bank'}" @click="payment = 'bank'">
                        <input type="radio" name="payment" value="bank" :checked="payment === 'bank'">
                        <div class="payment-icon">
                            <i class="bi bi-bank"></i>
                        </div>
                        <div class="payment-info">
                            <div class="payment-title">Bankovni prevod</div>
                            <div class="payment-desc">Platba na ucet pred odeslanim</div>
                        </div>
                    </label>

                    <label class="payment-option" :class="{'selected': payment === 'cod'}" @click="payment = 'cod'">
                        <input type="radio" name="payment" value="cod" :checked="payment === 'cod'">
                        <div class="payment-icon">
                            <i class="bi bi-cash-stack"></i>
                        </div>
                        <div class="payment-info">
                            <div class="payment-title">Dobirka</div>
                            <div class="payment-desc">Platba pri prevzeti + 39 Kc</div>
                        </div>
                    </label>

                    <label class="payment-option" :class="{'selected': payment === 'paypal'}" @click="payment = 'paypal'">
                        <input type="radio" name="payment" value="paypal" :checked="payment === 'paypal'">
                        <div class="payment-icon">
                            <i class="bi bi-paypal"></i>
                        </div>
                        <div class="payment-info">
                            <div class="payment-title">PayPal</div>
                            <div class="payment-desc">Rychla a bezpecna platba</div>
                        </div>
                    </label>
                </div>

                <div class="card-form" x-show="payment === 'card'" x-cloak>
                    <div style="display:flex;gap:0.5rem;margin-bottom:1rem;">
                        <i class="bi bi-credit-card-2-front" style="font-size: 1.5rem; color: var(--tf-text-muted);"></i>
                        <span style="color: var(--tf-text-muted); font-size: 0.85rem;">Podporujeme Visa, Mastercard, Maestro</span>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Cislo karty *</label>
                        <input type="text" class="form-input" placeholder="1234 5678 9012 3456" id="cardNumber" maxlength="19">
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Platnost *</label>
                            <input type="text" class="form-input" placeholder="MM/RR" id="cardExpiry" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label class="form-label">CVV/CVC *</label>
                            <input type="text" class="form-input" placeholder="123" id="cardCvv" maxlength="4">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Jmeno na karte *</label>
                        <input type="text" class="form-input" placeholder="JAN NOVAK" id="cardName">
                    </div>
                </div>

                <h3 class="form-section-title" style="margin-top: 2rem;">
                    <i class="bi bi-receipt"></i>
                    Fakturacni udaje
                </h3>

                <div class="form-group">
                    <label class="delivery-option" :class="{'selected': !billingDifferent}" style="margin-bottom: 0;" @click="billingDifferent = false">
                        <input type="radio" name="billing" value="same" :checked="!billingDifferent">
                        <span class="delivery-radio"></span>
                        <div class="delivery-info">
                            <div class="delivery-title">Stejna jako dodaci adresa</div>
                        </div>
                    </label>
                </div>

                <div class="form-group" style="margin-top: 1rem;">
                    <label class="delivery-option" :class="{'selected': billingDifferent}" @click="billingDifferent = true">
                        <input type="radio" name="billing" value="different" :checked="billingDifferent">
                        <span class="delivery-radio"></span>
                        <div class="delivery-info">
                            <div class="delivery-title">Jina fakturacni adresa</div>
                        </div>
                    </label>
                </div>

                <div x-show="billingDifferent" x-cloak style="margin-top: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Nazev firmy</label>
                        <input type="text" class="form-input" placeholder="Nazev spolecnosti" id="companyName">
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">ICO</label>
                            <input type="text" class="form-input" placeholder="12345678" id="ico">
                        </div>
                        <div class="form-group">
                            <label class="form-label">DIC</label>
                            <input type="text" class="form-input" placeholder="CZ12345678" id="dic">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Ulice a cislo popisne</label>
                        <input type="text" class="form-input" placeholder="Firemni 123" id="billingStreet">
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Mesto</label>
                            <input type="text" class="form-input" placeholder="Praha" id="billingCity">
                        </div>
                        <div class="form-group">
                            <label class="form-label">PSC</label>
                            <input type="text" class="form-input" placeholder="110 00" id="billingZip">
                        </div>
                    </div>
                </div>
            </div>

            ${getOrderSummaryHtml(items)}
        </div>

        <div class="text-center mt-4" style="max-width: 500px; margin-left: auto; margin-right: auto;">
            <a href="/checkout/review" class="btn-checkout-next">
                Zkontrolovat objednavku
                <i class="bi bi-arrow-right"></i>
            </a>
            <a href="/checkout" class="btn-checkout-back">
                <i class="bi bi-arrow-left"></i>
                Zpet na doruceni
            </a>
        </div>
    </div>
</div>`;

}

export function getCheckoutReviewContent(items: DbCartItem[]): string {
    const subtotal = calculateSubtotal(items);

    let reviewItemsHtml = '';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const lineTotal = item.product_price * item.quantity;
        reviewItemsHtml += `
                        <div class="summary-item">
                            <div class="summary-item-image">
                                ${getSummaryItemIcon(item)}
                            </div>
                            <div class="summary-item-details">
                                <div class="summary-item-name">${escapeHtml(item.product_name)}</div>
                                <div class="summary-item-qty">${item.quantity}x @ ${formatPrice(item.product_price)}</div>
                            </div>
                            <div class="summary-item-price">${formatPrice(lineTotal)}</div>
                        </div>`;
    }

    return `
${getCheckoutStyles()}

${getCheckoutNavbar()}

<div class="checkout-wrapper">
    <div class="container">
        ${getCheckoutProgressHtml(3)}

        <div class="checkout-header text-center">
            <h1 class="checkout-title">Prehled objednavky</h1>
            <p class="checkout-subtitle">Zkontrolujte vsechny udaje pred odeslanim</p>
        </div>

        <div class="checkout-content">
            <div>
                <div class="review-section">
                    <div class="review-section-header">
                        <h4 class="review-section-title">
                            <i class="bi bi-bag"></i>
                            Polozky objednavky (${items.length})
                        </h4>
                        <a href="/cart" class="review-edit-link">Upravit</a>
                    </div>
                    <div class="summary-items" style="padding: 0;">
                        ${reviewItemsHtml}
                    </div>
                </div>

                <div class="review-section">
                    <div class="review-section-header">
                        <h4 class="review-section-title">
                            <i class="bi bi-person"></i>
                            Kontaktni udaje
                        </h4>
                        <a href="/checkout" class="review-edit-link">Upravit</a>
                    </div>
                    <div class="review-content">
                        <p style="color: var(--tf-text-muted);">Vyplnte v predchozich krocich</p>
                    </div>
                </div>

                <div class="review-section">
                    <div class="review-section-header">
                        <h4 class="review-section-title">
                            <i class="bi bi-truck"></i>
                            Zpusob doruceni
                        </h4>
                        <a href="/checkout" class="review-edit-link">Upravit</a>
                    </div>
                    <div class="review-content">
                        <p><strong>Standardni doruceni</strong></p>
                        <p>Doruceni do 3-5 pracovnich dnu</p>
                        <p style="color: var(--tf-accent);">Zdarma</p>
                    </div>
                </div>

                <div class="review-section">
                    <div class="review-section-header">
                        <h4 class="review-section-title">
                            <i class="bi bi-credit-card"></i>
                            Platebni metoda
                        </h4>
                        <a href="/checkout/payment" class="review-edit-link">Upravit</a>
                    </div>
                    <div class="review-content">
                        <p style="color: var(--tf-text-muted);">Vyplnte v predchozich krocich</p>
                    </div>
                </div>
            </div>

            ${getOrderSummaryHtml(items)}
        </div>

        <div class="text-center mt-4" style="max-width: 500px; margin-left: auto; margin-right: auto;">
            <a href="/checkout/confirmation" class="btn-checkout-next">
                <i class="bi bi-lock-fill"></i>
                Odeslat objednavku
            </a>
            <a href="/checkout/payment" class="btn-checkout-back">
                <i class="bi bi-arrow-left"></i>
                Zpet na platbu
            </a>
            <p class="text-muted-tf small mt-3">
                <i class="bi bi-shield-check me-1"></i>
                Kliknutim na "Odeslat objednavku" souhlasim s obchodnimi podminkami
            </p>
        </div>
    </div>
</div>`;
}

export function getCheckoutConfirmationContent(): string {
    return `
${getCheckoutStyles()}

<nav class="navbar navbar-expand-lg navbar-dark navbar-tf fixed-top">
    <div class="container">
        <a class="navbar-brand text-gradient" href="/">
            <i class="bi bi-braces-asterisk me-2"></i>TypeForge
        </a>
        <div class="ms-auto">
            <a href="/eshop" class="btn btn-outline-tf btn-sm">
                <i class="bi bi-shop me-1"></i>Pokracovat v nakupu
            </a>
        </div>
    </div>
</nav>

<div class="checkout-wrapper">
    <div class="container">
        ${getCheckoutProgressHtml(4)}

        <div class="confirmation-card">
            <div class="confirmation-icon">
                <i class="bi bi-check-lg"></i>
            </div>

            <h1 class="confirmation-title">Dekujeme za objednavku!</h1>
            <p class="confirmation-subtitle">Vase objednavka byla uspesne prijata a bude brzy zpracovana.</p>

            <div class="confirmation-actions">
                <a href="/eshop" class="btn-confirmation btn-confirmation-primary">
                    <i class="bi bi-shop"></i>
                    Pokracovat v nakupu
                </a>
                <a href="/" class="btn-confirmation btn-confirmation-secondary">
                    <i class="bi bi-house"></i>
                    Na hlavni stranku
                </a>
            </div>
        </div>
    </div>
</div>

<footer class="py-4 text-center border-top" style="border-color:rgba(255,255,255,0.05)!important;">
    <div class="container">
        <p class="text-muted-tf small mb-0">TypeForge &mdash; Lorem ipsum dolor sit amet</p>
    </div>
</footer>`;
}
