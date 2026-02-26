import React from 'react';
import Container from 'react-bootstrap/Container';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

const confirmationStyles = `
  .confirmation-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .confirmation-navbar {
    background: var(--tf-surface);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .checkout-progress {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--tf-border);
    margin-bottom: 3rem;
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
  .confirmation-content {
    padding-bottom: 4rem;
  }
  .confirmation-card {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 20px;
    padding: 3rem 2rem;
  }
  .confirmation-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(34, 197, 94, 0.1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  .confirmation-icon i {
    font-size: 2.5rem;
    color: #22c55e;
  }
  .confirmation-card h2 {
    font-weight: 800;
    margin-bottom: 0.75rem;
  }
  .confirmation-card .subtitle {
    color: var(--tf-text-muted);
    font-size: 1rem;
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
  .confirmation-card .order-ref {
    display: inline-block;
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-family: monospace;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--tf-primary);
    margin: 1rem 0 1.5rem;
  }
  .confirmation-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 2rem;
  }
  .confirmation-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
`;

export function CheckoutConfirmationPage() {
  const { toggleTheme } = useTheme();
  const t = useT('cart');

  return (
    <div className="confirmation-page">
      <style>{confirmationStyles}</style>

      {/* Navbar */}
      <nav className="confirmation-navbar">
        <Container className="d-flex align-items-center justify-content-between">
          <a href="/" className="text-decoration-none d-flex align-items-center gap-2">
            <i className="bi bi-braces-asterisk text-gradient" />
            <span className="text-gradient fw-bold fs-5">TypeForge</span>
          </a>
          <button
            className="btn-theme-toggle"
            onClick={toggleTheme}
            title={t.nav.toggleTheme}
            style={{ width: 32, height: 32, fontSize: '0.9rem' }}
          >
            <i className="bi bi-moon" />
            <i className="bi bi-sun" />
          </button>
        </Container>
      </nav>

      {/* Progress - all completed */}
      <div className="checkout-progress">
        <Container>
          <div className="progress-steps">
            <div className="progress-step completed">
              <div className="step-num"><i className="bi bi-check" /></div>
              <span>{t.checkout.steps.shipping}</span>
              <div className="step-line" />
            </div>
            <div className="progress-step completed">
              <div className="step-num"><i className="bi bi-check" /></div>
              <span>{t.checkout.steps.payment}</span>
              <div className="step-line" />
            </div>
            <div className="progress-step completed">
              <div className="step-num"><i className="bi bi-check" /></div>
              <span>{t.checkout.steps.review}</span>
              <div className="step-line" />
            </div>
            <div className="progress-step completed">
              <div className="step-num"><i className="bi bi-check" /></div>
              <span>{t.checkout.steps.done}</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Confirmation card */}
      <div className="confirmation-content">
        <Container>
          <div className="confirmation-card">
            <div className="confirmation-icon">
              <i className="bi bi-check-circle-fill" />
            </div>
            <h2>{t.headings.thankYou}</h2>
            <p className="subtitle">
              {t.checkout.confirmation.subtitle}
            </p>
            <div className="confirmation-actions">
              <a href="/eshop" className="btn-primary-tf">
                <i className="bi bi-bag me-2" />{t.actions.continueShopping2}
              </a>
              <a href="/" className="btn-outline-tf">
                <i className="bi bi-house me-2" />{t.actions.goHome}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Footer */}
      <footer className="confirmation-footer">
        <Container>
          <p>&copy; {new Date().getFullYear()} TypeForge. Všechna práva vyhrazena.</p>
        </Container>
      </footer>
    </div>
  );
}
