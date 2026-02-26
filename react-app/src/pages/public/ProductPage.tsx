import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { formatPrice } from '../../utils';
import { useT } from '../../i18n';

interface ProductPageProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    oldPrice?: string;
    stock: string;
    description?: string;
    shortDescription?: string;
    icon?: string;
    featuredImage?: string;
    categoryName?: string;
    categorySlug?: string;
  };
  galleryImages?: { url: string }[];
}

const productStyles = `
  .product-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .product-navbar {
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
  .product-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .product-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .product-breadcrumb {
    padding: 6rem 0 1rem;
  }
  .product-breadcrumb .breadcrumb {
    margin: 0;
    font-size: 0.85rem;
  }
  .product-breadcrumb .breadcrumb-item a {
    color: var(--tf-text-muted);
    text-decoration: none;
  }
  .product-breadcrumb .breadcrumb-item a:hover {
    color: var(--tf-primary);
  }
  .product-breadcrumb .breadcrumb-item.active {
    color: var(--tf-text);
  }
  .product-gallery {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    overflow: hidden;
  }
  .product-gallery .main-image {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tf-bg);
    overflow: hidden;
  }
  .product-gallery .main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .product-gallery .main-image .placeholder-icon {
    font-size: 5rem;
    color: var(--tf-text-muted);
  }
  .product-gallery .thumbnails {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem;
    overflow-x: auto;
  }
  .product-gallery .thumb {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    border: 2px solid transparent;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.2s;
  }
  .product-gallery .thumb.active {
    border-color: var(--tf-primary);
  }
  .product-gallery .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .product-info .category-label {
    font-size: 0.8rem;
    color: var(--tf-primary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.5rem;
  }
  .product-info .category-label a {
    color: inherit;
    text-decoration: none;
  }
  .product-info h1 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  .product-info .price-row {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .product-info .price-current {
    font-size: 2rem;
    font-weight: 700;
    color: var(--tf-text);
  }
  .product-info .price-old {
    font-size: 1.1rem;
    color: var(--tf-text-muted);
    text-decoration: line-through;
  }
  .product-info .price-discount {
    background: #22c55e;
    color: #fff;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .product-info .short-desc {
    color: var(--tf-text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  .qty-selector {
    display: flex;
    align-items: center;
    gap: 0;
    border: 1px solid var(--tf-border);
    border-radius: 8px;
    overflow: hidden;
    background: var(--tf-bg);
  }
  .qty-selector button {
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    color: var(--tf-text);
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .qty-selector button:hover {
    background: var(--tf-border);
  }
  .qty-selector .qty-value {
    width: 50px;
    text-align: center;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--tf-text);
    border-left: 1px solid var(--tf-border);
    border-right: 1px solid var(--tf-border);
    padding: 0.5rem 0;
  }
  .product-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-top: 1.5rem;
  }
  .btn-wishlist {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    border: 1px solid var(--tf-border);
    background: transparent;
    color: var(--tf-text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.1rem;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-wishlist:hover {
    border-color: #ef4444;
    color: #ef4444;
  }
  .product-meta {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--tf-border);
  }
  .product-meta .meta-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    font-size: 0.9rem;
    color: var(--tf-text-muted);
  }
  .product-meta .meta-item i {
    width: 20px;
    text-align: center;
    color: var(--tf-primary);
  }
  .product-description {
    padding: 3rem 0;
  }
  .product-description .desc-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 2rem;
  }
  .product-description h3 {
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .product-description .desc-content {
    color: var(--tf-text-muted);
    line-height: 1.7;
  }
  .product-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
`;

export function ProductPage({ product, galleryImages = [] }: ProductPageProps) {
  const { toggleTheme } = useTheme();
  const t = useT('shop');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const allImages: string[] = [];
  if (product.featuredImage) allImages.push(product.featuredImage);
  galleryImages.forEach((img) => { if (img.url) allImages.push(img.url); });

  const price = Number(product.price);
  const oldPrice = product.oldPrice ? Number(product.oldPrice) : null;
  const discount = oldPrice && oldPrice > price
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : null;

  const stockNum = Number(product.stock);

  return (
    <div className="product-page">
      <style>{productStyles}</style>

      {/* Navbar */}
      <nav className="product-navbar">
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
      <div className="product-breadcrumb">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/eshop">{t.breadcrumb.eshop}</a></li>
              {product.categoryName && (
                <li className="breadcrumb-item">
                  <a href={`/category?slug=${product.categorySlug || ''}`}>{product.categoryName}</a>
                </li>
              )}
              <li className="breadcrumb-item active">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <section className="container pb-4">
        <div className="row g-4">
          {/* Gallery */}
          <div className="col-lg-6">
            <div className="product-gallery">
              <div className="main-image">
                {allImages.length > 0 ? (
                  <img src={allImages[activeImageIndex]} alt={product.name} />
                ) : (
                  <i className={`bi bi-${product.icon || 'box'} placeholder-icon`} />
                )}
              </div>
              {allImages.length > 1 && (
                <div className="thumbnails">
                  {allImages.map((url, i) => (
                    <div
                      key={i}
                      className={`thumb${i === activeImageIndex ? ' active' : ''}`}
                      onClick={() => setActiveImageIndex(i)}
                    >
                      <img src={url} alt={`${product.name} ${i + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="col-lg-6">
            <div className="product-info">
              {product.categoryName && (
                <div className="category-label">
                  <a href={`/category?slug=${product.categorySlug || ''}`}>{product.categoryName}</a>
                </div>
              )}
              <h1>{product.name}</h1>

              <div className="price-row">
                <span className="price-current">{formatPrice(price)}</span>
                {oldPrice && <span className="price-old">{formatPrice(oldPrice)}</span>}
                {discount && <span className="price-discount">-{discount}%</span>}
              </div>

              {product.shortDescription && (
                <p className="short-desc">{product.shortDescription}</p>
              )}

              {/* Quantity + Add to cart */}
              <form method="post" action={`/cart/add?productId=${product.id}&quantity=${quantity}`}>
                <div className="d-flex align-items-center gap-3">
                  <div className="qty-selector">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <i className="bi bi-dash" />
                    </button>
                    <div className="qty-value">{quantity}</div>
                    <button type="button" onClick={() => setQuantity(quantity + 1)}>
                      <i className="bi bi-plus" />
                    </button>
                  </div>
                  <input type="hidden" name="quantity" value={quantity} />
                </div>

                <div className="product-actions">
                  <button type="submit" className="btn-primary-tf" style={{ padding: '0.7rem 2rem', flex: 1 }}>
                    <i className="bi bi-cart-plus me-2" />
                    {t.product.addToCart}
                  </button>
                  <button type="button" className="btn-wishlist" title="Přidat do oblíbených">
                    <i className="bi bi-heart" />
                  </button>
                </div>
              </form>

              {/* Meta */}
              <div className="product-meta">
                <div className="meta-item">
                  <i className="bi bi-truck" />
                  <span>{t.product.freeShipping}</span>
                </div>
                <div className="meta-item">
                  <i className="bi bi-box-seam" />
                  <span>{stockNum > 0 ? `${t.product.inStock} (${product.stock} ks)` : t.product.outOfStock}</span>
                </div>
                <div className="meta-item">
                  <i className="bi bi-shield-check" />
                  <span>{t.product.warranty}</span>
                </div>
                <div className="meta-item">
                  <i className="bi bi-arrow-return-left" />
                  <span>{t.product.returnPolicy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      {product.description && (
        <section className="product-description">
          <div className="container">
            <div className="desc-card">
              <h3>{t.product.description}</h3>
              <div className="desc-content" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="product-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} TypeForge. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
