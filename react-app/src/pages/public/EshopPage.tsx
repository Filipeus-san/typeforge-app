import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTheme } from '../../context/ThemeContext';
import { formatPrice } from '../../utils';
import { useT } from '../../i18n';

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
  const t = useT('shop');

  return (
    <div className="eshop-page">
      <style>{eshopStyles}</style>

      {/* Navbar */}
      <nav className="shop-navbar">
        <Container className="d-flex align-items-center justify-content-between">
          <a href="/" className="text-decoration-none d-flex align-items-center gap-2">
            <i className="bi bi-braces-asterisk text-gradient" />
            <span className="text-gradient fw-bold fs-5">TypeForge</span>
          </a>
          <div className="d-flex align-items-center gap-3">
            <a href="/" className="nav-link d-none d-md-inline">{t.nav.home}</a>
            <a href="/eshop" className="nav-link d-none d-md-inline" style={{ color: 'var(--tf-text)' }}>{t.nav.eshop}</a>
            <a href="/blog" className="nav-link d-none d-md-inline">Blog</a>
            <button
              className="btn-theme-toggle"
              onClick={toggleTheme}
              title={t.nav.toggleTheme}
              style={{ width: 32, height: 32, fontSize: '0.9rem' }}
            >
              <i className="bi bi-moon" />
              <i className="bi bi-sun" />
            </button>
            <a href="/cart" className="cart-badge-link text-decoration-none">
              <i className="bi bi-cart3" />
            </a>
          </div>
        </Container>
      </nav>

      {/* Hero */}
      <section className="eshop-hero">
        <Container>
          <span className="eshop-badge">
            <i className="bi bi-stars me-1" />
            {t.hero.badge}
          </span>
          <h1>
            {t.hero.titleLine1}<br />
            <span className="text-gradient">{t.hero.titleLine2}</span>
          </h1>
          <p>{t.hero.subtitle}</p>
          <div className="d-flex gap-3 justify-content-center">
            <a href="#products" className="btn-primary-tf">
              <i className="bi bi-bag me-2" />{t.hero.shopNow}
            </a>
            <a href="#categories" className="btn-outline-tf">
              <i className="bi bi-grid me-2" />{t.hero.categories}
            </a>
          </div>
        </Container>
      </section>

      {/* Features bar */}
      <div className="features-bar">
        <Container>
          <Row className="g-3">
            <Col xs={6} lg={3}>
              <div className="feature-item">
                <i className="bi bi-truck" />
                <span>{t.features.freeShipping}</span>
              </div>
            </Col>
            <Col xs={6} lg={3}>
              <div className="feature-item">
                <i className="bi bi-shield-check" />
                <span>{t.features.warranty}</span>
              </div>
            </Col>
            <Col xs={6} lg={3}>
              <div className="feature-item">
                <i className="bi bi-arrow-return-left" />
                <span>{t.features.returnPolicy}</span>
              </div>
            </Col>
            <Col xs={6} lg={3}>
              <div className="feature-item">
                <i className="bi bi-headset" />
                <span>{t.features.support}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <Container as="section" className="mb-5" id="categories">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="fw-bold mb-0">{t.sections.categories}</h3>
          </div>
          <Row className="g-3">
            {categories.map((cat) => (
              <Col key={cat.id} xs={6} md={4} lg={3}>
                <a href={`/category?slug=${cat.slug}`} className="category-card">
                  <div className="cat-icon">
                    {cat.featuredImage ? (
                      <img src={cat.featuredImage} alt={cat.name} />
                    ) : (
                      <i className={`bi bi-${cat.icon || 'grid'}`} />
                    )}
                  </div>
                  <h6>{cat.name}</h6>
                  <div className="cat-count">{cat.productCount} {t.category.totalProducts}</div>
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* Products */}
      <Container as="section" className="pb-5" id="products">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="fw-bold mb-0">{t.headings.allProducts}</h3>
          <span className="text-muted-tf" style={{ fontSize: '0.9rem' }}>{products.length} {t.category.totalProducts}</span>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-bag-x" style={{ fontSize: '3rem', color: 'var(--tf-text-muted)' }} />
            <p className="text-muted-tf mt-3">{t.empty.noProducts}</p>
          </div>
        ) : (
          <Row className="g-4">
            {products.map((p) => (
              <Col key={p.id} md={6} lg={3}>
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
                        <button type="submit" className="btn-add-cart" title={t.product.addToCart}>
                          <i className="bi bi-cart-plus" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Newsletter */}
      <section className="newsletter-section">
        <Container>
          <div className="newsletter-box">
            <i className="bi bi-envelope" style={{ fontSize: '2rem', color: 'var(--tf-primary)', marginBottom: '0.75rem', display: 'block' }} />
            <h4>{t.newsletter.title}</h4>
            <p>{t.newsletter.subtitle}</p>
            <div className="newsletter-input-group">
              <input type="email" placeholder={t.newsletter.placeholder} />
              <button className="btn-primary-tf">{t.newsletter.subscribe}</button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="eshop-footer">
        <Container>
          <p>&copy; {new Date().getFullYear()} TypeForge. Všechna práva vyhrazena.</p>
        </Container>
      </footer>
    </div>
  );
}
