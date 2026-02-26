import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { formatPrice } from '../../utils';

interface EshopProps {
  products: {
    id: string;
    name: string;
    slug: string;
    price: string;
    oldPrice?: string;
    shortDescription?: string;
    icon?: string;
    featuredImage?: string;
    categoryName?: string;
  }[];
  categories: {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    featuredImage?: string;
    productCount: string;
  }[];
}

const eshopStyles = `
  .eshop-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .shop-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background: rgba(var(--tf-surface-rgb, 30, 30, 46), 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .shop-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .shop-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .cart-badge-link {
    position: relative;
    color: var(--tf-text);
    font-size: 1.2rem;
  }
  .eshop-hero {
    padding: 8rem 0 4rem;
    text-align: center;
  }
  .eshop-hero h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  .eshop-hero p {
    color: var(--tf-text-muted);
    font-size: 1.15rem;
    max-width: 560px;
    margin: 0 auto 2rem;
  }
  .features-bar {
    padding: 1.5rem 0;
    border-top: 1px solid var(--tf-border);
    border-bottom: 1px solid var(--tf-border);
    margin-bottom: 3rem;
  }
  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    justify-content: center;
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .feature-item i {
    color: var(--tf-primary);
    font-size: 1.25rem;
  }
  .category-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: border-color 0.2s, transform 0.2s;
    text-decoration: none;
    display: block;
    color: var(--tf-text);
    height: 100%;
  }
  .category-card:hover {
    border-color: var(--tf-primary);
    transform: translateY(-2px);
    color: var(--tf-text);
  }
  .category-card .cat-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background: var(--tf-bg);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--tf-primary);
    margin-bottom: 0.75rem;
  }
  .category-card .cat-icon img {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    object-fit: cover;
  }
  .category-card h6 {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  .category-card .cat-count {
    color: var(--tf-text-muted);
    font-size: 0.8rem;
  }
  .eshop-product-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .eshop-product-card:hover {
    border-color: var(--tf-primary);
    transform: translateY(-2px);
  }
  .eshop-product-card .product-img {
    height: 200px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .eshop-product-card .product-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .eshop-product-card .product-img i {
    font-size: 3rem;
    color: var(--tf-text-muted);
  }
  .eshop-product-card .product-body {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .eshop-product-card .product-category-label {
    font-size: 0.75rem;
    color: var(--tf-primary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.5rem;
  }
  .eshop-product-card .product-title {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: var(--tf-text);
  }
  .eshop-product-card .product-title a {
    color: inherit;
    text-decoration: none;
  }
  .eshop-product-card .product-price-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 0.75rem;
  }
  .eshop-product-card .price-current {
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--tf-text);
  }
  .eshop-product-card .price-old {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
    text-decoration: line-through;
  }
  .eshop-product-card .btn-add-cart {
    margin-left: auto;
    background: var(--tf-primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .eshop-product-card .btn-add-cart:hover {
    opacity: 0.85;
  }
  .newsletter-section {
    padding: 4rem 0;
    text-align: center;
  }
  .newsletter-section .newsletter-box {
    max-width: 500px;
    margin: 0 auto;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 2.5rem;
  }
  .newsletter-section h4 {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .newsletter-section p {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  .newsletter-input-group {
    display: flex;
    gap: 0.5rem;
  }
  .newsletter-input-group input {
    flex: 1;
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    color: var(--tf-text);
    border-radius: 8px;
    padding: 0.6rem 0.85rem;
    font-size: 0.9rem;
  }
  .newsletter-input-group input::placeholder {
    color: var(--tf-text-muted);
    opacity: 0.6;
  }
  .eshop-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
`;

export function EshopPage({ products, categories }: EshopProps) {
  const { toggleTheme } = useTheme();

  return (
    <div className="eshop-page">
      <style>{eshopStyles}</style>

      {/* Navbar */}
      <nav className="shop-navbar">
        <div className="container d-flex align-items-center justify-content-between">
          <a href="/" className="text-decoration-none d-flex align-items-center gap-2">
            <i className="bi bi-braces-asterisk text-gradient" />
            <span className="text-gradient fw-bold fs-5">TypeForge</span>
          </a>
          <div className="d-flex align-items-center gap-3">
            <a href="/" className="nav-link d-none d-md-inline">Domů</a>
            <a href="/eshop" className="nav-link d-none d-md-inline" style={{ color: 'var(--tf-text)' }}>E-Shop</a>
            <a href="/blog" className="nav-link d-none d-md-inline">Blog</a>
            <button
              className="btn-theme-toggle"
              onClick={toggleTheme}
              title="Přepnout téma"
              style={{ width: 32, height: 32, fontSize: '0.9rem' }}
            >
              <i className="bi bi-moon" />
              <i className="bi bi-sun" />
            </button>
            <a href="/cart" className="cart-badge-link text-decoration-none">
              <i className="bi bi-cart3" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="eshop-hero">
        <div className="container">
          <span className="eshop-badge">
            <i className="bi bi-stars me-1" />
            Nová kolekce 2026
          </span>
          <h1>
            Objevte náš<br />
            <span className="text-gradient">prémiový výběr</span>
          </h1>
          <p>Kvalitní produkty za skvělé ceny. Doprava zdarma nad 1 000 Kč.</p>
          <div className="d-flex gap-3 justify-content-center">
            <a href="#products" className="btn-primary-tf">
              <i className="bi bi-bag me-2" />Prohlédnout produkty
            </a>
            <a href="#categories" className="btn-outline-tf">
              <i className="bi bi-grid me-2" />Kategorie
            </a>
          </div>
        </div>
      </section>

      {/* Features bar */}
      <div className="features-bar">
        <div className="container">
          <div className="row g-3">
            <div className="col-6 col-lg-3">
              <div className="feature-item">
                <i className="bi bi-truck" />
                <span>Doprava zdarma</span>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="feature-item">
                <i className="bi bi-shield-check" />
                <span>Záruka 2 roky</span>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="feature-item">
                <i className="bi bi-arrow-return-left" />
                <span>30 dní na vrácení</span>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="feature-item">
                <i className="bi bi-headset" />
                <span>24/7 podpora</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container mb-5" id="categories">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="fw-bold mb-0">Kategorie</h3>
          </div>
          <div className="row g-3">
            {categories.map((cat) => (
              <div key={cat.id} className="col-6 col-md-4 col-lg-3">
                <a href={`/category?slug=${cat.slug}`} className="category-card">
                  <div className="cat-icon">
                    {cat.featuredImage ? (
                      <img src={cat.featuredImage} alt={cat.name} />
                    ) : (
                      <i className={`bi bi-${cat.icon || 'grid'}`} />
                    )}
                  </div>
                  <h6>{cat.name}</h6>
                  <div className="cat-count">{cat.productCount} produktů</div>
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Products */}
      <section className="container pb-5" id="products">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="fw-bold mb-0">Produkty</h3>
          <span className="text-muted-tf" style={{ fontSize: '0.9rem' }}>{products.length} produktů</span>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-bag-x" style={{ fontSize: '3rem', color: 'var(--tf-text-muted)' }} />
            <p className="text-muted-tf mt-3">Zatím nemáme žádné produkty.</p>
          </div>
        ) : (
          <div className="row g-4">
            {products.map((p) => (
              <div key={p.id} className="col-md-6 col-lg-3">
                <div className="eshop-product-card">
                  <a href={`/product?slug=${p.slug}`} className="text-decoration-none">
                    <div className="product-img">
                      {p.featuredImage ? (
                        <img src={p.featuredImage} alt={p.name} />
                      ) : (
                        <i className={`bi bi-${p.icon || 'box'}`} />
                      )}
                    </div>
                  </a>
                  <div className="product-body">
                    {p.categoryName && (
                      <div className="product-category-label">{p.categoryName}</div>
                    )}
                    <div className="product-title">
                      <a href={`/product?slug=${p.slug}`}>{p.name}</a>
                    </div>
                    <div className="product-price-row">
                      <span className="price-current">{formatPrice(Number(p.price))}</span>
                      {p.oldPrice && (
                        <span className="price-old">{formatPrice(Number(p.oldPrice))}</span>
                      )}
                      <form method="post" action={`/cart/add?productId=${p.id}&quantity=1`} style={{ display: 'inline', marginLeft: 'auto' }}>
                        <button type="submit" className="btn-add-cart" title="Přidat do košíku">
                          <i className="bi bi-cart-plus" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <i className="bi bi-envelope" style={{ fontSize: '2rem', color: 'var(--tf-primary)', marginBottom: '0.75rem', display: 'block' }} />
            <h4>Odebírejte novinky</h4>
            <p>Buďte první, kdo se dozví o nových produktech a slevách.</p>
            <div className="newsletter-input-group">
              <input type="email" placeholder="Váš e-mail" />
              <button className="btn-primary-tf">Odebírat</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="eshop-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} TypeForge. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
