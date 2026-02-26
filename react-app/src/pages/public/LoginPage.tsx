import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface LoginProps {
  error?: string;
  emailValue?: string;
}

const loginStyles = `
  .login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tf-bg);
    padding: 2rem 1rem;
  }
  .login-card {
    width: 100%;
    max-width: 440px;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 2.5rem;
  }
  .login-brand {
    text-align: center;
    margin-bottom: 2rem;
  }
  .login-brand .brand-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--tf-primary), var(--tf-accent));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .login-brand h4 {
    color: var(--tf-text);
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  .login-brand p {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    margin: 0;
  }
  .login-form .form-label {
    color: var(--tf-text);
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }
  .login-form .form-control {
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    color: var(--tf-text);
    border-radius: 8px;
    padding: 0.65rem 0.85rem;
    font-size: 0.95rem;
  }
  .login-form .form-control:focus {
    border-color: var(--tf-primary);
    box-shadow: 0 0 0 3px rgba(var(--tf-primary-rgb, 124, 58, 237), 0.15);
  }
  .login-form .form-control::placeholder {
    color: var(--tf-text-muted);
    opacity: 0.6;
  }
  .login-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
  .login-divider::before,
  .login-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--tf-border);
  }
  .login-link {
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .login-link a {
    color: var(--tf-primary);
    text-decoration: none;
    font-weight: 500;
  }
  .login-link a:hover {
    text-decoration: underline;
  }
  .login-theme-toggle {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
`;

export function LoginPage({ error, emailValue }: LoginProps) {
  const { toggleTheme } = useTheme();
  const t = useT('auth');

  return (
    <div className="login-wrapper" style={{ position: 'relative' }}>
      <style>{loginStyles}</style>

      <div className="login-theme-toggle">
        <button
          className="btn-theme-toggle"
          onClick={toggleTheme}
          title={t.nav.toggleTheme}
          style={{ width: 36, height: 36, fontSize: '1rem' }}
        >
          <i className="bi bi-moon" />
          <i className="bi bi-sun" />
        </button>
      </div>

      <div className="login-card">
        <div className="login-brand">
          <a href="/" className="text-decoration-none">
            <div className="brand-icon">
              <i className="bi bi-shield-lock" />
            </div>
            <h4>{t.headings.login}</h4>
            <p>{t.headings.loginSubtitle}</p>
          </a>
        </div>

        {error && (
          <Alert variant="danger" className="d-flex align-items-center gap-2" style={{ borderRadius: 8, fontSize: '0.9rem' }}>
            <i className="bi bi-exclamation-triangle" />
            {error}
          </Alert>
        )}

        <form method="post" action="/login" className="login-form">
          <div className="mb-3">
            <label className="form-label" htmlFor="email">{t.form.email}</label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="vas@email.cz"
              defaultValue={emailValue || ''}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">{t.form.password}</label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="Vaše heslo"
              required
            />
          </div>
          <button type="submit" className="btn-primary-tf w-100" style={{ padding: '0.65rem', fontSize: '0.95rem' }}>
            <i className="bi bi-box-arrow-in-right me-2" />
            {t.actions.login}
          </button>
        </form>

        <div className="login-divider">{t.links.or}</div>

        <div className="login-link">
          {t.links.noAccount} <a href="/register">{t.links.registerLink}</a>
        </div>
      </div>
    </div>
  );
}
