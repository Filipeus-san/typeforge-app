import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { formatPrice } from '../../utils';

interface CheckoutPaymentProps {
  items: {
    productName: string;
    quantity: string;
    productPrice: string;
    productIcon?: string;
    productFeaturedImage?: string;
  }[];
}

const paymentStyles = `
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
  .checkout-section {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .checkout-section h5 {
    font-weight: 700;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--tf-border);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .checkout-section h5 i {
    color: var(--tf-primary);
  }
  .checkout-section .form-label {
    color: var(--tf-text);
    font-weight: 500;
    font-size: 0.85rem;
    margin-bottom: 0.35rem;
  }
  .checkout-section .form-control,
  .checkout-section .form-select {
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    color: var(--tf-text);
    border-radius: 8px;
    padding: 0.6rem 0.75rem;
    font-size: 0.9rem;
  }
  .checkout-section .form-control:focus,
  .checkout-section .form-select:focus {
    border-color: var(--tf-primary);
    box-shadow: 0 0 0 3px rgba(var(--tf-primary-rgb, 124, 58, 237), 0.15);
  }
  .checkout-section .form-control::placeholder {
    color: var(--tf-text-muted);
    opacity: 0.6;
  }
  .payment-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid var(--tf-border);
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.2s;
    margin-bottom: 0.75rem;
  }
  .payment-option:hover {
    border-color: var(--tf-text-muted);
  }
  .payment-option.selected {
    border-color: var(--tf-primary);
    background: rgba(var(--tf-primary-rgb, 124, 58, 237), 0.05);
  }
  .payment-option .option-radio {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--tf-border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .payment-option.selected .option-radio {
    border-color: var(--tf-primary);
  }
  .payment-option.selected .option-radio::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--tf-primary);
  }
  .payment-option .option-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: var(--tf-text-muted);
  }
  .payment-option .option-info {
    flex: 1;
  }
  .payment-option .option-info .name {
    font-weight: 600;
    font-size: 0.95rem;
  }
  .payment-option .option-info .desc {
    font-size: 0.8rem;
    color: var(--tf-text-muted);
  }
  .card-form {
    margin-top: 1rem;
    padding: 1.25rem;
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    border-radius: 10px;
  }
  .billing-toggle {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0;
    font-size: 0.9rem;
  }
  .billing-toggle .form-check-input:checked {
    background-color: var(--tf-primary);
    border-color: var(--tf-primary);
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
  .order-summary-sidebar .summary-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }
  .order-summary-sidebar .summary-item .item-thumb {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }
  .order-summary-sidebar .summary-item .item-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .order-summary-sidebar .summary-item .item-thumb i {
    font-size: 1.25rem;
    color: var(--tf-text-muted);
  }
  .order-summary-sidebar .summary-item .item-info {
    flex: 1;
    min-width: 0;
    font-size: 0.85rem;
  }
  .order-summary-sidebar .summary-item .item-info .name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .order-summary-sidebar .summary-item .item-info .qty {
    color: var(--tf-text-muted);
    font-size: 0.8rem;
  }
  .order-summary-sidebar .summary-item .item-price {
    font-weight: 600;
    white-space: nowrap;
    font-size: 0.9rem;
  }
  .order-summary-sidebar .summary-totals {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--tf-border);
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
    font-size: 1.1rem;
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

const paymentMethods = [
  { id: 'card', name: 'Platební karta', desc: 'Visa, Mastercard, Maestro', icon: 'credit-card' },
  { id: 'bank', name: 'Bankovní převod', desc: 'Platba převodem na účet', icon: 'bank' },
  { id: 'cod', name: 'Dobírka', desc: 'Platba při převzetí zásilky', icon: 'cash-coin' },
  { id: 'paypal', name: 'PayPal', desc: 'Platba přes PayPal účet', icon: 'paypal' },
];

export function CheckoutPaymentPage({ items }: CheckoutPaymentProps) {
  const { toggleTheme } = useTheme();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const subtotal = items.reduce((sum, item) => sum + Number(item.productPrice) * Number(item.quantity), 0);

  return (
    <div className="checkout-page">
      <style>{paymentStyles}</style>

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
            <div className="progress-step active">
              <div className="step-num">2</div>
              <span>Platba</span>
              <div className="step-line" />
            </div>
            <div className="progress-step">
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
              <form method="post" action="/checkout/review">
                {/* Payment methods */}
                <div className="checkout-section">
                  <h5><i className="bi bi-credit-card" />Způsob platby</h5>
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`payment-option${selectedPayment === method.id ? ' selected' : ''}`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="option-radio" />
                      <div className="option-icon">
                        <i className={`bi bi-${method.icon}`} />
                      </div>
                      <div className="option-info">
                        <div className="name">{method.name}</div>
                        <div className="desc">{method.desc}</div>
                      </div>
                    </div>
                  ))}
                  <input type="hidden" name="paymentMethod" value={selectedPayment} />

                  {/* Card form */}
                  {selectedPayment === 'card' && (
                    <div className="card-form">
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label" htmlFor="cardNumber">Číslo karty</label>
                          <input type="text" className="form-control" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label" htmlFor="cardExpiry">Platnost</label>
                          <input type="text" className="form-control" id="cardExpiry" name="cardExpiry" placeholder="MM/RR" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label" htmlFor="cardCvv">CVV</label>
                          <input type="text" className="form-control" id="cardCvv" name="cardCvv" placeholder="123" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label" htmlFor="cardName">Jméno na kartě</label>
                          <input type="text" className="form-control" id="cardName" name="cardName" placeholder="Jan Novák" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Billing address */}
                <div className="checkout-section">
                  <h5><i className="bi bi-receipt" />Fakturační adresa</h5>
                  <div className="billing-toggle">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="sameAsBilling"
                      checked={sameAsBilling}
                      onChange={(e) => setSameAsBilling(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="sameAsBilling" style={{ color: 'var(--tf-text)', fontSize: '0.9rem' }}>
                      Stejná jako doručovací adresa
                    </label>
                  </div>

                  {!sameAsBilling && (
                    <div className="row g-3 mt-1">
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="company">Firma (volitelné)</label>
                        <input type="text" className="form-control" id="company" name="company" placeholder="Název firmy" />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label" htmlFor="ico">ICO</label>
                        <input type="text" className="form-control" id="ico" name="ico" placeholder="12345678" />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label" htmlFor="dic">DIC</label>
                        <input type="text" className="form-control" id="dic" name="dic" placeholder="CZ12345678" />
                      </div>
                      <div className="col-12">
                        <label className="form-label" htmlFor="billingStreet">Ulice a číslo popisné</label>
                        <input type="text" className="form-control" id="billingStreet" name="billingStreet" placeholder="Hlavní 123" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="billingCity">Město</label>
                        <input type="text" className="form-control" id="billingCity" name="billingCity" placeholder="Praha" />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label" htmlFor="billingZip">PSČ</label>
                        <input type="text" className="form-control" id="billingZip" name="billingZip" placeholder="110 00" />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label" htmlFor="billingCountry">Stát</label>
                        <select className="form-select" id="billingCountry" name="billingCountry">
                          <option value="CZ">Česká republika</option>
                          <option value="SK">Slovensko</option>
                          <option value="DE">Německo</option>
                          <option value="AT">Rakousko</option>
                          <option value="PL">Polsko</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="checkout-nav">
                  <a href="/checkout" className="back-link">
                    <i className="bi bi-arrow-left" />
                    Zpět k dopravě
                  </a>
                  <button type="submit" className="btn-primary-tf" style={{ padding: '0.7rem 2rem' }}>
                    Pokračovat ke shrnutí
                    <i className="bi bi-arrow-right ms-2" />
                  </button>
                </div>
              </form>
            </div>

            {/* Order summary */}
            <div className="col-lg-4">
              <div className="order-summary-sidebar">
                <h5>Vaše objednávka</h5>
                {items.map((item, idx) => (
                  <div key={idx} className="summary-item">
                    <div className="item-thumb">
                      {item.productFeaturedImage ? (
                        <img src={item.productFeaturedImage} alt={item.productName} />
                      ) : (
                        <i className={`bi bi-${item.productIcon || 'box'}`} />
                      )}
                    </div>
                    <div className="item-info">
                      <div className="name">{item.productName}</div>
                      <div className="qty">{item.quantity}x</div>
                    </div>
                    <div className="item-price">{formatPrice(Number(item.productPrice) * Number(item.quantity))}</div>
                  </div>
                ))}
                <div className="summary-totals">
                  <div className="row-total">
                    <span className="label">Mezisoučet</span>
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
