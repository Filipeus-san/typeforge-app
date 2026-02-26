import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { formatPrice } from '../../utils';
import { useT } from '../../i18n';

interface CategoryPageProps {
  title: string;
  category?: {
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    featuredImage?: string;
  };
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
}

const categoryStyles = `
  .category-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .cat-navbar {
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
  .cat-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .cat-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .cat-breadcrumb {
    padding: 6rem 0 1rem;
  }
  .cat-breadcrumb .breadcrumb {
    margin: 0;
    font-size: 0.85rem;
  }
  .cat-breadcrumb .breadcrumb-item a {
    color: var(--tf-text-muted);
    text-decoration: none;
  }
  .cat-breadcrumb .breadcrumb-item a:hover {
    color: var(--tf-primary);
  }
  .cat-breadcrumb .breadcrumb-item.active {
    color: var(--tf-text);
  }
  .cat-header {
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--tf-border);
  }
  .cat-header .cat-icon-lg {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: var(--tf-primary);
    overflow: hidden;
    flex-shrink: 0;
  }
  .cat-header .cat-icon-lg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cat-header h1 {
    font-weight: 800;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  .cat-header p {
    color: var(--tf-text-muted);
    font-size: 0.95rem;
    margin: 0;
  }
  .cat-sort-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding: 0.75rem 1rem;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 8px;
  }
  .cat-sort-bar .product-count {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .cat-product-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .cat-product-card:hover {
    border-color: var(--tf-primary);
    transform: translateY(-2px);
  }
  .cat-product-card .img-wrap {
    height: 200px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .cat-product-card .img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cat-product-card .img-wrap i {
    font-size: 3rem;
    color: var(--tf-text-muted);
  }
  .cat-product-card .card-body {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .cat-product-card .card-body .cat-label {
    font-size: 0.75rem;
    color: var(--tf-primary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.5rem;
  }
  .cat-product-card .card-body h5 {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  .cat-product-card .card-body h5 a {
    color: var(--tf-text);
    text-decoration: none;
  }
  .cat-product-card .card-body .desc {
    color: var(--tf-text-muted);
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
    flex: 1;
  }
  .cat-product-card .price-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
  }
  .cat-product-card .price-current {
    font-weight: 700;
    font-size: 1.1rem;
  }
  .cat-product-card .price-old {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
    text-decoration: line-through;
  }
  .cat-product-card .btn-add {
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
  .cat-product-card .btn-add:hover {
    opacity: 0.85;
  }
  .cat-empty {
    text-align: center;
    padding: 4rem 2rem;
  }
  .cat-empty i {
    font-size: 3rem;
    color: var(--tf-text-muted);
    margin-bottom: 1rem;
    display: block;
  }
  .cat-empty p {
    color: var(--tf-text-muted);
    margin-bottom: 1.5rem;
  }
  .cat-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
`;

export function CategoryPage({ title, category, products }: CategoryPageProps) {
  const { toggleTheme } = useTheme();
  const t = useT('shop');

  return (
    <div className="category-page">
      <style>{categoryStyles}</style>

      {/* Navbar */}
      <nav className="cat-navbar">
        <div className="container d-flex align-items-center justify-content-between">
          <a href="/" className="text-decoration-none d-flex align-items-center gap-2">
            <i className="bi bi-braces-asterisk text-gradient" />
            <span className="text-gradient fw-bold fs-5">TypeForge</span>
          </a>
          <div className="d-flex align-items-center gap-3">
            <a href="/eshop" className="nav-link d-none d-md-inline">{t.nav.eshop}</a>
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
            <a href="/cart" className="text-decoration-none" style={{ color: 'var(--tf-text)', fontSize: '1.2rem' }}>
              <i className="bi bi-cart3" />
            </a>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="cat-breadcrumb">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/eshop">{t.breadcrumb.eshop}</a></li>
              <li className="breadcrumb-item active">{category?.name || title}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Category header */}
      <section className="container">
        <div className="cat-header">
          <div className="d-flex align-items-center gap-3">
            {(category?.icon || category?.featuredImage) && (
              <div className="cat-icon-lg">
                {category?.featuredImage ? (
                  <img src={category.featuredImage} alt={category?.name || title} />
                ) : (
                  <i className={`bi bi-${category?.icon || 'grid'}`} />
                )}
              </div>
            )}
            <div>
              <h1>{category?.name || title}</h1>
              {category?.description && <p>{category.description}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Sort bar */}
      <section className="container">
        <div className="cat-sort-bar">
          <span className="product-count">{products.length} {t.category.totalProducts}</span>
        </div>
      </section>

      {/* Products */}
      <section className="container pb-5">
        {products.length === 0 ? (
          <div className="cat-empty">
            <i className="bi bi-inbox" />
            <p>{t.category.noProducts}</p>
            <a href="/eshop" className="btn-primary-tf">
              <i className="bi bi-arrow-left me-2" />{t.category.backToEshop}
            </a>
          </div>
        ) : (
          <div className="row g-4">
            {products.map((p) => (
              <div key={p.id} className="col-md-6 col-lg-4">
                <div className="cat-product-card">
                  <a href={`/product?slug=${p.slug}`} className="text-decoration-none">
                    <div className="img-wrap">
                      {p.featuredImage ? (
                        <img src={p.featuredImage} alt={p.name} />
                      ) : (
                        <i className={`bi bi-${p.icon || 'box'}`} />
                      )}
                    </div>
                  </a>
                  <div className="card-body">
                    {p.categoryName && <div className="cat-label">{p.categoryName}</div>}
                    <h5><a href={`/product?slug=${p.slug}`}>{p.name}</a></h5>
                    {p.shortDescription && <p className="desc">{p.shortDescription}</p>}
                    <div className="price-row">
                      <span className="price-current">{formatPrice(Number(p.price))}</span>
                      {p.oldPrice && <span className="price-old">{formatPrice(Number(p.oldPrice))}</span>}
                      <form method="post" action={`/cart/add?productId=${p.id}&quantity=1`} style={{ display: 'inline', marginLeft: 'auto' }}>
                        <button type="submit" className="btn-add" title={t.product.addToCart}>
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

      {/* Footer */}
      <footer className="cat-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} TypeForge. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
