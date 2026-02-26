import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { formatPrice } from '../../utils';

interface CheckoutReviewProps {
  items: {
    productName: string;
    quantity: string;
    productPrice: string;
    productIcon?: string;
    productFeaturedImage?: string;
  }[];
}

const reviewStyles = `
  .checkout-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .checkout-navbar {
    background: var(--tf-surface);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .checkout-navbar .secure-label {
    color: var(--tf-text-muted);
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .checkout-navbar .secure-label i {
    color: #22c55e;
  }
  .checkout-progress {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--tf-border);
    margin-bottom: 2rem;
  }
  .progress-steps {
    display: flex;
    justify-content: center;
    gap: 0;
    max-width: 600px;
    margin: 0 auto;
  }
  .progress-step {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    font-size: 0.85rem;
    color: var(--tf-text-muted);
  }
  .progress-step.active {
    color: var(--tf-primary);
    font-weight: 600;
  }
  .progress-step.completed {
    color: #22c55e;
  }
  .progress-step .step-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  .progress-step.active .step-num {
    background: var(--tf-primary);
    border-color: var(--tf-primary);
    color: #fff;
  }
  .progress-step.completed .step-num {
    background: #22c55e;
    border-color: #22c55e;
    color: #fff;
  }
  .progress-step .step-line {
    width: 40px;
    height: 2px;
    background: var(--tf-border);
    margin-left: 0.5rem;
  }
  .progress-step.completed .step-line {
    background: #22c55e;
  }
  .checkout-content {
    padding-bottom: 3rem;
  }
  .review-section {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .review-section .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--tf-border);
  }
  .review-section .section-header h5 {
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .review-section .section-header h5 i {
    color: var(--tf-primary);
  }
  .review-section .section-header .edit-link {
    color: var(--tf-primary);
    text-decoration: none;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .review-section .section-header .edit-link:hover {
    text-decoration: underline;
  }
  .review-section .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  .review-section .info-item .label {
    font-size: 0.8rem;
    color: var(--tf-text-muted);
    margin-bottom: 0.15rem;
  }
  .review-section .info-item .value {
    font-size: 0.95rem;
    font-weight: 500;
  }
  .review-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--tf-border);
  }
  .review-item:last-child {
    border-bottom: none;
  }
  .review-item .item-thumb {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }
  .review-item .item-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .review-item .item-thumb i {
    font-size: 1.5rem;
    color: var(--tf-text-muted);
  }
  .review-item .item-info {
    flex: 1;
    min-width: 0;
  }
  .review-item .item-info .name {
    font-weight: 600;
    font-size: 0.95rem;
  }
  .review-item .item-info .qty {
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
  .review-item .item-price {
    font-weight: 700;
    white-space: nowrap;
  }
  .order-summary-sidebar {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    position: sticky;
    top: 5rem;
  }
  .order-summary-sidebar h5 {
    font-weight: 700;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--tf-border);
  }
  .order-summary-sidebar .summary-totals .row-total {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0;
    font-size: 0.9rem;
  }
  .order-summary-sidebar .summary-totals .row-total .label {
    color: var(--tf-text-muted);
  }
  .order-summary-sidebar .summary-totals .grand-total {
    display: flex;
    justify-content: space-between;
    padding-top: 0.75rem;
    margin-top: 0.5rem;
    border-top: 1px solid var(--tf-border);
    font-weight: 700;
    font-size: 1.15rem;
  }
  .order-summary-sidebar .submit-actions {
    margin-top: 1.5rem;
  }
  .security-notice {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--tf-text-muted);
    font-size: 0.8rem;
    margin-top: 1rem;
    text-align: center;
    justify-content: center;
  }
  .security-notice i {
    color: #22c55e;
  }
  .checkout-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
  }
  .checkout-nav .back-link {
    color: var(--tf-text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .checkout-nav .back-link:hover {
    color: var(--tf-primary);
  }
`;

export function CheckoutReviewPage({ items }: CheckoutReviewProps) {
  const { toggleTheme } = useTheme();

  const subtotal = items.reduce((sum, item) => sum + Number(item.productPrice) * Number(item.quantity), 0);

  return (
    <div className="checkout-page">
      <style>{reviewStyles}</style>

      {/* Navbar */}
      <nav className="checkout-navbar">
        <div className="container d-flex align-items-center justify-content-between">
          <a href="/" className="text-decoration-none d-flex align-items-center gap-2">
            <i className="bi bi-braces-asterisk text-gradient" />
            <span className="text-gradient fw-bold fs-5">TypeForge</span>
          </a>
          <div className="d-flex align-items-center gap-3">
            <span className="secure-label">
              <i className="bi bi-shield-lock-fill" />
              Bezpečná platba
            </span>
            <button
              className="btn-theme-toggle"
              onClick={toggleTheme}
              title="Přepnout téma"
              style={{ width: 32, height: 32, fontSize: '0.9rem' }}
            >
              <i className="bi bi-moon" />
              <i className="bi bi-sun" />
            </button>
          </div>
        </div>
      </nav>

      {/* Progress */}
      <div className="checkout-progress">
        <div className="container">
          <div className="progress-steps">
            <div className="progress-step completed">
              <div className="step-num"><i className="bi bi-check" /></div>
              <span>Doprava</span>
              <div className="step-line" />
            </div>
            <div className="progress-step completed">
              <div className="step-num"><i className="bi bi-check" /></div>
              <span>Platba</span>
              <div className="step-line" />
            </div>
            <div className="progress-step active">
              <div className="step-num">3</div>
              <span>Shrnutí</span>
              <div className="step-line" />
            </div>
            <div className="progress-step">
              <div className="step-num">4</div>
              <span>Hotovo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="checkout-content">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              {/* Order items */}
              <div className="review-section">
                <div className="section-header">
                  <h5><i className="bi bi-bag" />Položky objednávky</h5>
                  <a href="/cart" className="edit-link"><i className="bi bi-pencil" />Upravit</a>
                </div>
                {items.map((item, idx) => (
                  <div key={idx} className="review-item">
                    <div className="item-thumb">
                      {item.productFeaturedImage ? (
                        <img src={item.productFeaturedImage} alt={item.productName} />
                      ) : (
                        <i className={`bi bi-${item.productIcon || 'box'}`} />
                      )}
                    </div>
                    <div className="item-info">
                      <div className="name">{item.productName}</div>
                      <div className="qty">{item.quantity}x {formatPrice(Number(item.productPrice))}</div>
                    </div>
                    <div className="item-price">{formatPrice(Number(item.productPrice) * Number(item.quantity))}</div>
                  </div>
                ))}
              </div>

              {/* Contact info */}
              <div className="review-section">
                <div className="section-header">
                  <h5><i className="bi bi-person" />Kontaktní údaje</h5>
                  <a href="/checkout" className="edit-link"><i className="bi bi-pencil" />Upravit</a>
                </div>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="label">Jméno</div>
                    <div className="value">Jan Novák</div>
                  </div>
                  <div className="info-item">
                    <div className="label">E-mail</div>
                    <div className="value">jan@email.cz</div>
                  </div>
                  <div className="info-item">
                    <div className="label">Telefon</div>
                    <div className="value">+420 123 456 789</div>
                  </div>
                  <div className="info-item">
                    <div className="label">Adresa</div>
                    <div className="value">Hlavní 123, Praha 110 00</div>
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div className="review-section">
                <div className="section-header">
                  <h5><i className="bi bi-truck" />Způsob dopravy</h5>
                  <a href="/checkout" className="edit-link"><i className="bi bi-pencil" />Upravit</a>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-truck" style={{ color: 'var(--tf-primary)' }} />
                  <span>Standardní doprava (3-5 pracovních dní)</span>
                  <span className="ms-auto fw-bold" style={{ color: '#22c55e' }}>Zdarma</span>
                </div>
              </div>

              {/* Payment */}
              <div className="review-section">
                <div className="section-header">
                  <h5><i className="bi bi-credit-card" />Způsob platby</h5>
                  <a href="/checkout/payment" className="edit-link"><i className="bi bi-pencil" />Upravit</a>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-credit-card" style={{ color: 'var(--tf-primary)' }} />
                  <span>Platební karta (**** 3456)</span>
                </div>
              </div>

              {/* Navigation */}
              <div className="checkout-nav">
                <a href="/checkout/payment" className="back-link">
                  <i className="bi bi-arrow-left" />
                  Zpět k platbě
                </a>
                <form method="post" action="/checkout/confirm" style={{ display: 'inline' }}>
                  <button type="submit" className="btn-primary-tf" style={{ padding: '0.7rem 2rem' }}>
                    <i className="bi bi-check-circle me-2" />
                    Odeslat objednávku
                  </button>
                </form>
              </div>

              <div className="security-notice">
                <i className="bi bi-shield-lock-fill" />
                Vaše data jsou chráněna šifrováním SSL a zpracovávána bezpečně.
              </div>
            </div>

            {/* Order summary */}
            <div className="col-lg-4">
              <div className="order-summary-sidebar">
                <h5>Souhrn objednávky</h5>
                <div className="summary-totals">
                  <div className="row-total">
                    <span className="label">Mezisoučet ({items.length} položek)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="row-total">
                    <span className="label">Doprava</span>
                    <span style={{ color: '#22c55e' }}>Zdarma</span>
                  </div>
                  <div className="grand-total">
                    <span>Celkem</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
