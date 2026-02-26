import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { formatPrice } from '../../utils';

interface CartProps {
  items: {
    productId: string;
    productName: string;
    productPrice: string;
    productOldPrice?: string;
    quantity: string;
    productIcon?: string;
    productFeaturedImage?: string;
    categoryName?: string;
  }[];
}

const cartStyles = `
  .cart-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .cart-navbar {
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
  .cart-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .cart-count-badge {
    position: absolute;
    top: -6px;
    right: -8px;
    background: var(--tf-primary);
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-content {
    padding: 6rem 0 3rem;
  }
  .cart-header {
    margin-bottom: 2rem;
  }
  .cart-header h1 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }
  .cart-header .item-count {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .cart-empty {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
  }
  .cart-empty i {
    font-size: 4rem;
    color: var(--tf-text-muted);
    margin-bottom: 1rem;
    display: block;
  }
  .cart-empty h4 {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .cart-empty p {
    color: var(--tf-text-muted);
    margin-bottom: 1.5rem;
  }
  .cart-item {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.25rem;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .cart-item .item-img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }
  .cart-item .item-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cart-item .item-img i {
    font-size: 2rem;
    color: var(--tf-text-muted);
  }
  .cart-item .item-details {
    flex: 1;
    min-width: 0;
  }
  .cart-item .item-details .category-sm {
    font-size: 0.75rem;
    color: var(--tf-primary);
    font-weight: 600;
    text-transform: uppercase;
  }
  .cart-item .item-details h6 {
    font-weight: 600;
    margin: 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cart-item .item-details .unit-price {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
  }
  .cart-item .item-qty {
    display: flex;
    align-items: center;
    gap: 0;
    border: 1px solid var(--tf-border);
    border-radius: 8px;
    overflow: hidden;
    background: var(--tf-bg);
  }
  .cart-item .item-qty button {
    width: 34px;
    height: 34px;
    background: transparent;
    border: none;
    color: var(--tf-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-item .item-qty button:hover {
    background: var(--tf-border);
  }
  .cart-item .item-qty .qty-val {
    width: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
    border-left: 1px solid var(--tf-border);
    border-right: 1px solid var(--tf-border);
    padding: 0.4rem 0;
    color: var(--tf-text);
  }
  .cart-item .item-total {
    font-weight: 700;
    font-size: 1rem;
    white-space: nowrap;
    min-width: 100px;
    text-align: right;
  }
  .cart-item .item-remove {
    color: var(--tf-text-muted);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.25rem;
    transition: color 0.2s;
  }
  .cart-item .item-remove:hover {
    color: #ef4444;
  }
  .cart-summary {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 1.5rem;
    position: sticky;
    top: 5rem;
  }
  .cart-summary h5 {
    font-weight: 700;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--tf-border);
  }
  .cart-summary .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    font-size: 0.95rem;
  }
  .cart-summary .summary-row .label {
    color: var(--tf-text-muted);
  }
  .cart-summary .summary-total {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0 0;
    margin-top: 0.75rem;
    border-top: 1px solid var(--tf-border);
    font-weight: 700;
    font-size: 1.15rem;
  }
  .cart-summary .summary-actions {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .cart-summary .continue-link {
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    text-decoration: none;
    display: block;
  }
  .cart-summary .continue-link:hover {
    color: var(--tf-primary);
  }
  .cart-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
`;

export function CartPage({ items }: CartProps) {
  const { toggleTheme } = useTheme();

  const totalItems = items.reduce((sum, item) => sum + Number(item.quantity), 0);
  const subtotal = items.reduce((sum, item) => sum + Number(item.productPrice) * Number(item.quantity), 0);

  return (
    <div className="cart-page">
      <style>{cartStyles}</style>

      {/* Navbar */}
      <nav className="cart-navbar">
        <div className="container d-flex align-items-center justify-content-between">
          <a href="/" className="text-decoration-none d-flex align-items-center gap-2">
            <i className="bi bi-braces-asterisk text-gradient" />
            <span className="text-gradient fw-bold fs-5">TypeForge</span>
          </a>
          <div className="d-flex align-items-center gap-3">
            <a href="/eshop" className="nav-link d-none d-md-inline">E-Shop</a>
            <button
              className="btn-theme-toggle"
              onClick={toggleTheme}
              title="Přepnout téma"
              style={{ width: 32, height: 32, fontSize: '0.9rem' }}
            >
              <i className="bi bi-moon" />
              <i className="bi bi-sun" />
            </button>
            <a href="/cart" className="text-decoration-none" style={{ color: 'var(--tf-text)', fontSize: '1.2rem', position: 'relative' }}>
              <i className="bi bi-cart3" />
              {totalItems > 0 && <span className="cart-count-badge">{totalItems}</span>}
            </a>
          </div>
        </div>
      </nav>

      {/* Cart content */}
      <div className="cart-content">
        <div className="container">
          <div className="cart-header">
            <h1><i className="bi bi-cart3 me-3" />Nákupní košík</h1>
            <span className="item-count">{totalItems} položek</span>
          </div>

          {items.length === 0 ? (
            <div className="cart-empty">
              <i className="bi bi-cart-x" />
              <h4>Váš košík je prázdný</h4>
              <p>Podívejte se na naše produkty a začněte nakupovat.</p>
              <a href="/eshop" className="btn-primary-tf">
                <i className="bi bi-bag me-2" />Přejít na E-Shop
              </a>
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-lg-8">
                {items.map((item, idx) => {
                  const price = Number(item.productPrice);
                  const qty = Number(item.quantity);
                  const total = price * qty;

                  return (
                    <div key={idx} className="cart-item">
                      <div className="item-img">
                        {item.productFeaturedImage ? (
                          <img src={item.productFeaturedImage} alt={item.productName} />
                        ) : (
                          <i className={`bi bi-${item.productIcon || 'box'}`} />
                        )}
                      </div>
                      <div className="item-details">
                        {item.categoryName && <div className="category-sm">{item.categoryName}</div>}
                        <h6>{item.productName}</h6>
                        <div className="unit-price">{formatPrice(price)} / ks</div>
                      </div>
                      <div className="item-qty">
                        <form method="post" action={`/cart/update?productId=${item.productId}&quantity=${Math.max(1, qty - 1)}`} style={{ display: 'inline' }}>
                          <button type="submit"><i className="bi bi-dash" /></button>
                        </form>
                        <div className="qty-val">{qty}</div>
                        <form method="post" action={`/cart/update?productId=${item.productId}&quantity=${qty + 1}`} style={{ display: 'inline' }}>
                          <button type="submit"><i className="bi bi-plus" /></button>
                        </form>
                      </div>
                      <div className="item-total">{formatPrice(total)}</div>
                      <a href={`/cart/remove?productId=${item.productId}`} className="item-remove" title="Odebrat">
                        <i className="bi bi-trash3" />
                      </a>
                    </div>
                  );
                })}
              </div>

              <div className="col-lg-4">
                <div className="cart-summary">
                  <h5>Souhrn objednávky</h5>
                  <div className="summary-row">
                    <span className="label">Mezisoučet</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Doprava</span>
                    <span style={{ color: '#22c55e' }}>Zdarma</span>
                  </div>
                  <div className="summary-total">
                    <span>Celkem</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="summary-actions">
                    <a href="/checkout" className="btn-primary-tf w-100 text-center" style={{ padding: '0.7rem' }}>
                      <i className="bi bi-lock me-2" />Pokračovat k objednávce
                    </a>
                    <a href="/eshop" className="continue-link">
                      <i className="bi bi-arrow-left me-1" />Pokračovat v nákupu
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="cart-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} TypeForge. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
