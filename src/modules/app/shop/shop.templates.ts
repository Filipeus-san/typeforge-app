import { escapeHtml, map } from "../../../components";
import { DbProductWithCategory, DbCategory, DbProductImage, formatPrice } from "../shared";

export function getEshopPageContent(products: DbProductWithCategory[], categories: (DbCategory & { product_count: number })[]): string {
    return `
<style>
.eshop-wrapper {
    min-height: 100vh;
    padding-top: 5rem;
}
.eshop-hero {
    padding: 5rem 0;
    position: relative;
    overflow: hidden;
}
.eshop-hero::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(6,214,160,0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}
.eshop-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    background: linear-gradient(135deg, rgba(6,214,160,0.15) 0%, rgba(124,92,252,0.15) 100%);
    border: 1px solid rgba(6,214,160,0.25);
    color: var(--tf-accent);
    margin-bottom: 1.5rem;
}
.eshop-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
}
.eshop-subtitle {
    font-size: 1.2rem;
    line-height: 1.7;
    color: var(--tf-text-muted);
    max-width: 550px;
}
.product-card {
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.3s ease;
    height: 100%;
}
.product-card:hover {
    border-color: rgba(6,214,160,0.3);
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(6,214,160,0.1);
}
.product-image {
    height: 220px;
    background: linear-gradient(135deg, rgba(124,92,252,0.1) 0%, rgba(6,214,160,0.1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.product-image i {
    font-size: 4rem;
    color: var(--tf-text-muted);
}
.product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.product-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.35rem 0.85rem;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    background: var(--tf-accent);
    color: #0f0f17;
}
.product-body {
    padding: 1.5rem;
}
.product-category {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--tf-accent);
    margin-bottom: 0.5rem;
}
.product-title {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--tf-text);
}
.product-desc {
    font-size: 0.9rem;
    color: var(--tf-text-muted);
    margin-bottom: 1rem;
    line-height: 1.6;
}
.product-price {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--tf-text);
}
.product-price-old {
    font-size: 1rem;
    color: var(--tf-text-muted);
    text-decoration: line-through;
    margin-left: 0.5rem;
}
.product-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    border-top: 1px solid rgba(255,255,255,0.05);
    margin-top: 1rem;
}
.btn-cart {
    padding: 0.6rem 1.25rem;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    background: var(--tf-accent);
    color: #0f0f17;
    border: none;
    transition: all 0.2s ease;
}
.btn-cart:hover {
    background: #05c795;
    transform: scale(1.02);
}
.categories-section {
    padding: 4rem 0;
}
.category-card {
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    height: 100%;
    overflow: hidden;
}
.category-card:hover {
    border-color: rgba(124,92,252,0.3);
    transform: translateY(-4px);
}
.category-card.has-image {
    padding: 0;
}
.category-card.has-image .category-img-wrap {
    width: 100%;
    height: 160px;
    overflow: hidden;
}
.category-card.has-image .category-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}
.category-card.has-image:hover .category-img-wrap img {
    transform: scale(1.05);
}
.category-card.has-image .category-card-body {
    padding: 1rem 1.5rem 1.5rem;
}
.category-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    background: var(--tf-gradient-subtle);
    color: var(--tf-primary-light);
    margin-bottom: 1rem;
}
.category-title {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}
.category-count {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
}
.features-bar {
    background: var(--tf-surface);
    border-top: 1px solid rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding: 2rem 0;
}
.feature-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}
.feature-item i {
    font-size: 1.5rem;
    color: var(--tf-accent);
}
.feature-item span {
    font-weight: 600;
    font-size: 0.95rem;
}
.newsletter-section {
    padding: 5rem 0;
}
.newsletter-card {
    background: linear-gradient(135deg, rgba(124,92,252,0.1) 0%, rgba(6,214,160,0.1) 100%);
    border: 1px solid rgba(124,92,252,0.2);
    border-radius: 24px;
    padding: 3.5rem;
    text-align: center;
}
.newsletter-input {
    background: var(--tf-bg);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    color: var(--tf-text);
    font-size: 1rem;
    max-width: 350px;
    width: 100%;
}
.newsletter-input:focus {
    border-color: var(--tf-accent);
    box-shadow: 0 0 0 3px rgba(6,214,160,0.15);
    outline: none;
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
@media (max-width: 768px) {
    .eshop-title { font-size: 2.5rem; }
    .newsletter-card { padding: 2rem; }
    .feature-item { flex-direction: column; text-align: center; gap: 0.5rem; }
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
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                <li class="nav-item"><a class="nav-link" href="/">Domů</a></li>
                <li class="nav-item"><a class="nav-link" href="/article">Článek</a></li>
                <li class="nav-item"><a class="nav-link active" href="/eshop">E-Shop</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin"><i class="bi bi-speedometer2 me-1"></i>Admin</a></li>
                <li class="nav-item">
                    <a class="nav-link cart-badge" href="/cart">
                        <i class="bi bi-cart3"></i>
                        <span class="badge">3</span>
                    </a>
                </li>
            </ul>
            <button class="btn-theme-toggle ms-lg-3 me-2" @click="$store.theme.toggle()" title="Přepnout téma">
                <i class="bi bi-moon"></i>
                <i class="bi bi-sun"></i>
            </button>
            <a href="/login" class="btn btn-outline-tf btn-sm">
                <i class="bi bi-box-arrow-in-right me-1"></i>Login
            </a>
        </div>
    </div>
</nav>

<div class="eshop-wrapper">
    <!-- Hero Section -->
    <section class="eshop-hero">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <span class="eshop-badge">
                        <i class="bi bi-bag-check"></i>
                        Nová kolekce 2026
                    </span>
                    <h1 class="eshop-title">
                        Objevte náš<br>
                        <span class="text-gradient">prémiový výběr</span>
                    </h1>
                    <p class="eshop-subtitle mb-4">
                        Prozkoumejte naši exkluzivní kolekci produktů. Kvalita, styl a nejlepší ceny na jednom místě.
                    </p>
                    <div class="d-flex flex-wrap gap-3">
                        <a href="#products" class="btn btn-primary-tf btn-lg">
                            <i class="bi bi-bag me-2"></i>Nakupovat
                        </a>
                        <a href="#categories" class="btn btn-outline-tf btn-lg">
                            <i class="bi bi-grid me-2"></i>Kategorie
                        </a>
                    </div>
                </div>
                <div class="col-lg-6 mt-5 mt-lg-0 text-center">
                    <div style="width:300px;height:300px;margin:0 auto;background:var(--tf-gradient-subtle);border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid rgba(6,214,160,0.2);">
                        <i class="bi bi-bag-heart" style="font-size:6rem;color:var(--tf-accent);"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Bar -->
    <div class="features-bar">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-3 col-6">
                    <div class="feature-item">
                        <i class="bi bi-truck"></i>
                        <span>Doprava zdarma</span>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="feature-item">
                        <i class="bi bi-shield-check"></i>
                        <span>Záruka 2 roky</span>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="feature-item">
                        <i class="bi bi-arrow-repeat"></i>
                        <span>30 dní na vrácení</span>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="feature-item">
                        <i class="bi bi-headset"></i>
                        <span>24/7 podpora</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Categories -->
    <section id="categories" class="categories-section">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-label"><i class="bi bi-grid-3x3-gap"></i> Kategorie</span>
                <h3 class="fw-bold">Prozkoumejte naše kategorie</h3>
                <p class="text-muted-tf">Najděte přesně to, co hledáte</p>
            </div>
            <div class="row g-4">
                ${categories.length > 0 ? map(categories, (c: any) => `
                <div class="col-md-4 col-6">
                    <a href="/category?slug=${escapeHtml(c.slug)}" class="text-decoration-none">
                        ${(c.featured_image !== null && c.featured_image !== undefined && c.featured_image !== '') ? `
                        <div class="category-card has-image">
                            <div class="category-img-wrap"><img src="${storageGetUrl(c.featured_image)}" alt="${escapeHtml(c.name)}"></div>
                            <div class="category-card-body">
                                <h5 class="category-title">${escapeHtml(c.name)}</h5>
                                <p class="category-count">${c.product_count} produktů</p>
                            </div>
                        </div>
                        ` : `
                        <div class="category-card">
                            <div class="category-icon"><i class="bi bi-${escapeHtml(c.icon || 'tag')}"></i></div>
                            <h5 class="category-title">${escapeHtml(c.name)}</h5>
                            <p class="category-count">${c.product_count} produktů</p>
                        </div>
                        `}
                    </a>
                </div>
                `) : `
                <div class="col-12 text-center py-4">
                    <p class="text-muted-tf">Zatím žádné kategorie</p>
                </div>
                `}
            </div>
        </div>
    </section>

    <!-- Products -->
    <section id="products" class="py-5">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-label"><i class="bi bi-star"></i> Doporučené</span>
                <h3 class="fw-bold">Nejprodávanější produkty</h3>
                <p class="text-muted-tf">Výběr našich zákazníků</p>
            </div>
            <div class="row g-4">
                ${products.length > 0 ? map(products, (p: any) => `
                <div class="col-lg-3 col-md-6">
                    <a href="/product?slug=${escapeHtml(p.slug)}" class="text-decoration-none">
                        <div class="product-card">
                            <div class="product-image">
                                ${p.old_price ? `<span class="product-badge" style="background:#7c5cfc;color:#fff;">Sleva</span>` : ''}
                                ${(p.featured_image !== null && p.featured_image !== undefined && p.featured_image !== '') ? `<img src="${storageGetUrl(p.featured_image)}" alt="${escapeHtml(p.name)}" class="product-img">` : `<i class="bi bi-${escapeHtml(p.icon || 'box')}"></i>`}
                            </div>
                            <div class="product-body">
                                <p class="product-category">${escapeHtml(p.category_name || '')}</p>
                                <h5 class="product-title">${escapeHtml(p.name)}</h5>
                                <p class="product-desc">${escapeHtml(p.short_description || '')}</p>
                                <div class="product-footer">
                                    <div>
                                        <span class="product-price">${formatPrice(p.price)}</span>
                                        ${p.old_price ? `<span class="product-price-old">${formatPrice(p.old_price)}</span>` : ''}
                                    </div>
                                    <a href="/cart/add?product_id=${p.id}" class="btn-cart" onclick="event.stopPropagation();">
                                        <i class="bi bi-cart-plus"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                `) : `
                <div class="col-12 text-center py-4">
                    <p class="text-muted-tf">Zatím žádné produkty</p>
                </div>
                `}
            </div>
        </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section">
        <div class="container">
            <div class="newsletter-card">
                <i class="bi bi-envelope-heart" style="font-size:3rem;color:var(--tf-accent);"></i>
                <h3 class="fw-bold mt-3 mb-2">Odebírejte novinky</h3>
                <p class="text-muted-tf mb-4">Získejte 10% slevu na první nákup a buďte první, kdo se dozví o novinkách.</p>
                <div class="d-flex flex-wrap gap-3 justify-content-center">
                    <input type="email" class="newsletter-input" placeholder="Váš email...">
                    <button class="btn btn-primary-tf btn-lg">
                        <i class="bi bi-send me-2"></i>Odebírat
                    </button>
                </div>
            </div>
        </div>
    </section>
</div>

<!-- Footer -->
<footer class="py-4 text-center border-top" style="border-color:rgba(255,255,255,0.05)!important;">
    <div class="container">
        <p class="text-muted-tf small mb-0">TypeForge E-Shop &mdash; Kvalita za skvělé ceny</p>
    </div>
</footer>`;
}

export function getProductPageContent(product: DbProductWithCategory, galleryImages?: DbProductImage[]): string {
    const gallery = galleryImages ?? [];
    // Build list of all images: featured + gallery
    const allImages: string[] = [];
    if (product.featured_image !== null && product.featured_image !== undefined && product.featured_image !== '') {
        allImages.push(product.featured_image);
    }
    for (let i = 0; i < gallery.length; i++) {
        allImages.push(gallery[i].storage_path);
    }
    const hasGallery = allImages.length > 1;
    return `
<style>
.product-detail-wrapper {
    min-height: 100vh;
    padding-top: 6rem;
    padding-bottom: 4rem;
}
.product-gallery {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 20px;
    padding: 2rem;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.product-gallery i {
    font-size: 8rem;
    color: var(--tf-text-muted);
}
.product-gallery-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 12px;
}
.product-thumbnails {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
}
.product-thumb {
    width: 80px;
    height: 80px;
    background: var(--tf-surface);
    border: 2px solid var(--tf-border);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}
.product-thumb:hover, .product-thumb.active {
    border-color: var(--tf-primary);
}
.product-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}
.product-thumb i {
    font-size: 1.5rem;
    color: var(--tf-text-muted);
}
.product-info {
    padding-left: 2rem;
}
.product-category-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--tf-accent);
    margin-bottom: 0.75rem;
}
.product-detail-title {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: var(--tf-text);
}
.product-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}
.product-rating .stars {
    color: #fbbf24;
    font-size: 1.1rem;
}
.product-rating .count {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
}
.product-detail-price {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--tf-text);
    margin-bottom: 0.5rem;
}
.product-detail-price-old {
    font-size: 1.25rem;
    color: var(--tf-text-muted);
    text-decoration: line-through;
    margin-left: 0.75rem;
}
.product-discount-badge {
    display: inline-block;
    padding: 0.35rem 0.85rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 700;
    background: var(--tf-accent);
    color: #0f0f17;
    margin-left: 0.75rem;
}
.product-short-desc {
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--tf-text-muted);
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--tf-border);
}
.product-features {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
}
.product-features li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    color: var(--tf-text);
}
.product-features li i {
    color: var(--tf-accent);
    font-size: 1.1rem;
}
.quantity-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}
.quantity-selector label {
    font-weight: 600;
    color: var(--tf-text);
    margin-right: 0.5rem;
}
.quantity-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid var(--tf-border);
    background: var(--tf-surface);
    color: var(--tf-text);
    font-size: 1.25rem;
    cursor: pointer;
    transition: all 0.2s ease;
}
.quantity-btn:hover {
    border-color: var(--tf-primary);
    background: rgba(124,92,252,0.1);
}
.quantity-input {
    width: 60px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid var(--tf-border);
    background: var(--tf-surface);
    color: var(--tf-text);
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
}
.product-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}
.btn-add-cart {
    flex: 1;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1.1rem;
    background: var(--tf-accent);
    color: #0f0f17;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
}
.btn-add-cart:hover {
    background: #05c795;
    transform: translateY(-2px);
}
.btn-wishlist {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    border: 2px solid var(--tf-border);
    background: var(--tf-surface);
    color: var(--tf-text);
    font-size: 1.25rem;
    cursor: pointer;
    transition: all 0.2s ease;
}
.btn-wishlist:hover {
    border-color: #ef4444;
    color: #ef4444;
    background: rgba(239,68,68,0.1);
}
.product-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--tf-border);
}
.product-meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--tf-text-muted);
}
.product-meta-item i {
    color: var(--tf-primary-light);
}
.product-tabs {
    margin-top: 4rem;
}
.nav-tabs-tf {
    border-bottom: 2px solid var(--tf-border);
    gap: 0.5rem;
}
.nav-tabs-tf .nav-link {
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    padding: 1rem 1.5rem;
    font-weight: 600;
    color: var(--tf-text-muted);
    background: transparent;
    transition: all 0.2s ease;
}
.nav-tabs-tf .nav-link:hover {
    color: var(--tf-text);
    border-color: transparent;
}
.nav-tabs-tf .nav-link.active {
    color: var(--tf-primary);
    border-bottom-color: var(--tf-primary);
    background: transparent;
}
.tab-content-tf {
    padding: 2rem 0;
}
.spec-table {
    width: 100%;
}
.spec-table tr {
    border-bottom: 1px solid var(--tf-border);
}
.spec-table td {
    padding: 1rem 0;
}
.spec-table td:first-child {
    font-weight: 600;
    color: var(--tf-text);
    width: 40%;
}
.spec-table td:last-child {
    color: var(--tf-text-muted);
}
.related-products {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid var(--tf-border);
}
.navbar-tf {
    background: var(--tf-navbar-bg) !important;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--tf-border);
}
.navbar-tf .navbar-brand {
    font-weight: 800;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
}
@media (max-width: 992px) {
    .product-info { padding-left: 0; margin-top: 2rem; }
    .product-detail-title { font-size: 2rem; }
    .product-detail-price { font-size: 2rem; }
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
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                <li class="nav-item"><a class="nav-link" href="/">Domů</a></li>
                <li class="nav-item"><a class="nav-link" href="/article">Článek</a></li>
                <li class="nav-item"><a class="nav-link" href="/eshop">E-Shop</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin"><i class="bi bi-speedometer2 me-1"></i>Admin</a></li>
                <li class="nav-item">
                    <a class="nav-link cart-badge" href="/cart">
                        <i class="bi bi-cart3"></i>
                        <span class="badge">3</span>
                    </a>
                </li>
            </ul>
            <button class="btn-theme-toggle ms-lg-3 me-2" @click="$store.theme.toggle()" title="Přepnout téma">
                <i class="bi bi-moon"></i>
                <i class="bi bi-sun"></i>
            </button>
            <a href="/login" class="btn btn-outline-tf btn-sm">
                <i class="bi bi-box-arrow-in-right me-1"></i>Login
            </a>
        </div>
    </div>
</nav>

<div class="product-detail-wrapper">
    <div class="container">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/" class="text-muted-tf text-decoration-none">Domů</a></li>
                <li class="breadcrumb-item"><a href="/eshop" class="text-muted-tf text-decoration-none">E-Shop</a></li>
                <li class="breadcrumb-item"><a href="/eshop#categories" class="text-muted-tf text-decoration-none">Elektronika</a></li>
                <li class="breadcrumb-item active text-gradient" aria-current="page">${escapeHtml(product.name)}</li>
            </ol>
        </nav>

        <div class="row">
            <!-- Product Gallery -->
            <div class="col-lg-6" x-data="{ active: 0 }">
                <div class="product-gallery">
                    ${allImages.length > 0 ? `<img :src="[${allImages.map(img => `'${escapeHtml(storageGetUrl(img))}'`).join(',')}][active]" alt="${escapeHtml(product.name)}" class="product-gallery-img">` : `<i class="bi bi-${escapeHtml(product.icon || 'box')}"></i>`}
                </div>
                ${hasGallery ? `
                <div class="product-thumbnails">
                    ${map(allImages, (imgPath: string, idx: number) => `
                        <div class="product-thumb" :class="{'active': active === ${idx}}" @click="active = ${idx}">
                            <img src="${storageGetUrl(imgPath)}" alt="">
                        </div>
                    `)}
                </div>
                ` : ''}
            </div>

            <!-- Product Info -->
            <div class="col-lg-6">
                <div class="product-info">
                    ${product.category_name ? `<span class="product-category-label">
                        <i class="bi bi-tag"></i> ${escapeHtml(product.category_name)}
                    </span>` : ''}
                    <h1 class="product-detail-title">${escapeHtml(product.name)}</h1>

                    <div class="d-flex align-items-center flex-wrap">
                        <span class="product-detail-price">${formatPrice(product.price)}</span>
                        ${product.old_price ? `<span class="product-detail-price-old">${formatPrice(product.old_price)}</span>` : ''}
                    </div>

                    ${product.short_description !== undefined && product.short_description !== '' ? `<p class="product-short-desc mt-3">${escapeHtml(product.short_description)}</p>` : ''}

                    <form method="post" action="/cart/add" x-data="{ qty: 1 }">
                        <input type="hidden" name="product_id" value="${product.id}">
                        <input type="hidden" name="quantity" :value="qty">
                        <div class="quantity-selector">
                            <label>Množství:</label>
                            <button type="button" class="quantity-btn" @click="qty = Math.max(1, qty - 1)">-</button>
                            <input type="text" class="quantity-input" :value="qty" readonly>
                            <button type="button" class="quantity-btn" @click="qty = qty + 1">+</button>
                        </div>

                        <div class="product-actions">
                            <button type="submit" class="btn-add-cart">
                                <i class="bi bi-cart-plus me-2"></i>Přidat do košíku
                            </button>
                            <button type="button" class="btn-wishlist">
                                <i class="bi bi-heart"></i>
                            </button>
                        </div>
                    </form>

                    <div class="product-meta">
                        <div class="product-meta-item">
                            <i class="bi bi-truck"></i> Doprava zdarma
                        </div>
                        <div class="product-meta-item">
                            <i class="bi bi-box-seam"></i> ${product.stock > 0 ? 'Skladem (' + product.stock + ' ks)' : 'Není skladem'}
                        </div>
                        <div class="product-meta-item">
                            <i class="bi bi-shield-check"></i> Záruka 2 roky
                        </div>
                        <div class="product-meta-item">
                            <i class="bi bi-arrow-repeat"></i> 30 dní na vrácení
                        </div>
                    </div>
                </div>
            </div>
        </div>

        ${product.description !== undefined && product.description !== '' ? `
        <!-- Product Description -->
        <div class="product-tabs mt-4">
            <div class="tab-content-tf p-4">
                <div class="row">
                    <div class="col-lg-8">
                        <h4 class="fw-bold mb-3">Popis</h4>
                        <p class="text-muted-tf">${escapeHtml(product.description)}</p>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}
    </div>
</div>

<!-- Footer -->
<footer class="py-4 text-center border-top" style="border-color:var(--tf-border)!important;">
    <div class="container">
        <p class="text-muted-tf small mb-0">TypeForge E-Shop &mdash; Kvalita za skvělé ceny</p>
    </div>
</footer>`;
}

export function getCategoryPageContent(title: string, category: DbCategory | null, products: DbProductWithCategory[]): string {
    return `
<style>
.category-wrapper {
    min-height: 100vh;
    padding-top: 6rem;
    padding-bottom: 4rem;
}
.category-header {
    padding: 3rem 0;
    position: relative;
    overflow: hidden;
}
.category-header::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(124,92,252,0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}
.category-title {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 0.5rem;
}
.category-desc {
    font-size: 1.1rem;
    color: var(--tf-text-muted);
    max-width: 600px;
}
.filter-sidebar {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 1.5rem;
    position: sticky;
    top: 6rem;
}
.filter-section {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--tf-border);
}
.filter-section:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
}
.filter-title {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1rem;
    color: var(--tf-text);
}
.filter-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    cursor: pointer;
    transition: color 0.2s ease;
}
.filter-option:hover {
    color: var(--tf-primary-light);
}
.filter-checkbox {
    width: 18px;
    height: 18px;
    border: 2px solid var(--tf-border);
    border-radius: 4px;
    background: var(--tf-bg);
    position: relative;
    transition: all 0.2s ease;
}
.filter-option:hover .filter-checkbox {
    border-color: var(--tf-primary);
}
.filter-checkbox.checked {
    background: var(--tf-primary);
    border-color: var(--tf-primary);
}
.filter-checkbox.checked::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 5px;
    width: 5px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}
.price-range {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.price-input {
    width: 100%;
    padding: 0.6rem 0.75rem;
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    border-radius: 8px;
    color: var(--tf-text);
    font-size: 0.9rem;
}
.price-input:focus {
    border-color: var(--tf-primary);
    outline: none;
}
.sort-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    margin-bottom: 1.5rem;
}
.sort-info {
    font-size: 0.95rem;
    color: var(--tf-text-muted);
}
.sort-info strong {
    color: var(--tf-text);
}
.sort-select {
    padding: 0.5rem 1rem;
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    border-radius: 8px;
    color: var(--tf-text);
    font-size: 0.9rem;
    cursor: pointer;
}
.sort-select:focus {
    border-color: var(--tf-primary);
    outline: none;
}
.view-toggle {
    display: flex;
    gap: 0.5rem;
}
.view-btn {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid var(--tf-border);
    background: var(--tf-surface);
    color: var(--tf-text-muted);
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s ease;
}
.view-btn:hover, .view-btn.active {
    border-color: var(--tf-primary);
    color: var(--tf-primary);
    background: rgba(124,92,252,0.1);
}
.product-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    height: 100%;
}
.product-card:hover {
    border-color: rgba(124,92,252,0.3);
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(124,92,252,0.1);
}
.product-image {
    height: 180px;
    background: linear-gradient(135deg, rgba(124,92,252,0.08) 0%, rgba(6,214,160,0.08) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.product-image i {
    font-size: 3.5rem;
    color: var(--tf-text-muted);
}
.product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.product-badge {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    padding: 0.3rem 0.7rem;
    border-radius: 50px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    background: var(--tf-accent);
    color: #0f0f17;
}
.product-body {
    padding: 1.25rem;
}
.product-category {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--tf-accent);
    margin-bottom: 0.4rem;
}
.product-title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
    color: var(--tf-text);
}
.product-desc {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
    margin-bottom: 0.75rem;
    line-height: 1.5;
}
.product-rating {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
}
.product-rating .stars {
    color: #fbbf24;
    font-size: 0.85rem;
}
.product-rating .count {
    color: var(--tf-text-muted);
    font-size: 0.8rem;
}
.product-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    border-top: 1px solid var(--tf-border);
}
.product-price {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--tf-text);
}
.product-price-old {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
    text-decoration: line-through;
    margin-left: 0.4rem;
}
.btn-cart {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.85rem;
    background: var(--tf-accent);
    color: #0f0f17;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
}
.btn-cart:hover {
    background: #05c795;
    transform: scale(1.02);
}
.pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}
.pagination-btn {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid var(--tf-border);
    background: var(--tf-surface);
    color: var(--tf-text);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin: 0 0.25rem;
}
.pagination-btn:hover, .pagination-btn.active {
    border-color: var(--tf-primary);
    background: var(--tf-primary);
    color: #fff;
}
.navbar-tf {
    background: var(--tf-navbar-bg) !important;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--tf-border);
}
.navbar-tf .navbar-brand {
    font-weight: 800;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
}
.btn-apply-filter {
    width: 100%;
    padding: 0.75rem;
    border-radius: 10px;
    font-weight: 600;
    background: var(--tf-primary);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 1rem;
}
.btn-apply-filter:hover {
    background: var(--tf-primary-dark);
}
@media (max-width: 992px) {
    .filter-sidebar {
        position: static;
        margin-bottom: 1.5rem;
    }
    .category-title { font-size: 2rem; }
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
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                <li class="nav-item"><a class="nav-link" href="/">Domů</a></li>
                <li class="nav-item"><a class="nav-link" href="/article">Článek</a></li>
                <li class="nav-item"><a class="nav-link" href="/eshop">E-Shop</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin"><i class="bi bi-speedometer2 me-1"></i>Admin</a></li>
                <li class="nav-item">
                    <a class="nav-link cart-badge" href="/cart">
                        <i class="bi bi-cart3"></i>
                        <span class="badge">3</span>
                    </a>
                </li>
            </ul>
            <button class="btn-theme-toggle ms-lg-3 me-2" @click="$store.theme.toggle()" title="Přepnout téma">
                <i class="bi bi-moon"></i>
                <i class="bi bi-sun"></i>
            </button>
            <a href="/login" class="btn btn-outline-tf btn-sm">
                <i class="bi bi-box-arrow-in-right me-1"></i>Login
            </a>
        </div>
    </div>
</nav>

<div class="category-wrapper">
    <div class="container">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="mb-3">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/" class="text-muted-tf text-decoration-none">Domů</a></li>
                <li class="breadcrumb-item"><a href="/eshop" class="text-muted-tf text-decoration-none">E-Shop</a></li>
                <li class="breadcrumb-item active text-gradient" aria-current="page">${escapeHtml(title)}</li>
            </ol>
        </nav>

        <!-- Category Header -->
        <div class="category-header">
            <div class="d-flex align-items-center gap-3 mb-3">
                ${(category?.featured_image !== null && category?.featured_image !== undefined && category?.featured_image !== '') ? `
                <div style="width:60px;height:60px;border-radius:12px;overflow:hidden;flex-shrink:0;">
                    <img src="${storageGetUrl(category!.featured_image!)}" alt="${escapeHtml(title)}" style="width:100%;height:100%;object-fit:cover;">
                </div>
                ` : `
                <div style="width:60px;height:60px;border-radius:50%;background:var(--tf-gradient-subtle);display:flex;align-items:center;justify-content:center;">
                    <i class="bi bi-${category ? escapeHtml(category.icon || 'tag') : 'grid'}" style="font-size:1.5rem;color:var(--tf-primary-light);"></i>
                </div>
                `}
                <div>
                    <h1 class="category-title">${escapeHtml(title)}</h1>
                    ${category?.description ? `<p class="category-desc mb-0">${escapeHtml(category.description)}</p>` : ''}
                </div>
            </div>
        </div>

        <div class="row">
            <!-- Products Grid -->
            <div class="col-lg-12">
                <!-- Sort Bar -->
                <div class="sort-bar">
                    <div class="sort-info">
                        Celkem <strong>${products.length}</strong> produktů
                    </div>
                </div>

                <!-- Products -->
                <div class="row g-4">
                    ${products.length > 0 ? map(products, (p: any) => `
                    <div class="col-md-6 col-lg-4">
                        <a href="/product?slug=${escapeHtml(p.slug)}" class="text-decoration-none">
                            <div class="product-card">
                                <div class="product-image">
                                    ${p.old_price ? `<span class="product-badge" style="background:#7c5cfc;color:#fff;">Sleva</span>` : ''}
                                    ${(p.featured_image !== null && p.featured_image !== undefined && p.featured_image !== '') ? `<img src="${storageGetUrl(p.featured_image)}" alt="${escapeHtml(p.name)}" class="product-img">` : `<i class="bi bi-${escapeHtml(p.icon || 'box')}"></i>`}
                                </div>
                                <div class="product-body">
                                    <p class="product-category">${escapeHtml(p.category_name || '')}</p>
                                    <h5 class="product-title">${escapeHtml(p.name)}</h5>
                                    <p class="product-desc">${escapeHtml(p.short_description || '')}</p>
                                    <div class="product-footer">
                                        <div>
                                            <span class="product-price">${formatPrice(p.price)}</span>
                                            ${p.old_price ? `<span class="product-price-old">${formatPrice(p.old_price)}</span>` : ''}
                                        </div>
                                        <button class="btn-cart">
                                            <i class="bi bi-cart-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    `) : `
                    <div class="col-12 text-center py-5">
                        <i class="bi bi-box-seam" style="font-size:3rem;color:var(--tf-text-muted);"></i>
                        <p class="text-muted-tf mt-3">V této kategorii zatím nejsou žádné produkty.</p>
                        <a href="/eshop" class="btn btn-outline-tf">Zpět na E-Shop</a>
                    </div>
                    `}
                </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Footer -->
<footer class="py-4 text-center border-top" style="border-color:var(--tf-border)!important;">
    <div class="container">
        <p class="text-muted-tf small mb-0">TypeForge E-Shop — Kvalita za skvělé ceny</p>
    </div>
</footer>`;
}
