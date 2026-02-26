import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface RegisterProps {
  error?: string;
  values?: Record<string, string>;
}

const registerStyles = `
  .register-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tf-bg);
    padding: 2rem 1rem;
  }
  .register-card {
    width: 100%;
    max-width: 520px;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 2.5rem;
  }
  .register-brand {
    text-align: center;
    margin-bottom: 2rem;
  }
  .register-brand .brand-icon {
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
  .register-brand h4 {
    color: var(--tf-text);
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  .register-brand p {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    margin: 0;
  }
  .register-form .form-label {
    color: var(--tf-text);
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }
  .register-form .form-control {
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    color: var(--tf-text);
    border-radius: 8px;
    padding: 0.65rem 0.85rem;
    font-size: 0.95rem;
  }
  .register-form .form-control:focus {
    border-color: var(--tf-primary);
    box-shadow: 0 0 0 3px rgba(var(--tf-primary-rgb, 124, 58, 237), 0.15);
  }
  .register-form .form-control::placeholder {
    color: var(--tf-text-muted);
    opacity: 0.6;
  }
  .password-strength {
    display: flex;
    gap: 4px;
    margin-top: 0.5rem;
  }
  .password-strength .bar {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: var(--tf-border);
    transition: background 0.3s;
  }
  .password-strength .bar.active-1 { background: #ef4444; }
  .password-strength .bar.active-2 { background: #f59e0b; }
  .password-strength .bar.active-3 { background: #22c55e; }
  .password-strength .bar.active-4 { background: #22c55e; }
  .register-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
  .register-divider::before,
  .register-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--tf-border);
  }
  .register-link {
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .register-link a {
    color: var(--tf-primary);
    text-decoration: none;
    font-weight: 500;
  }
  .register-link a:hover {
    text-decoration: underline;
  }
  .register-theme-toggle {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
  .form-check-input:checked {
    background-color: var(--tf-primary);
    border-color: var(--tf-primary);
  }
  .form-check-label {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .form-check-label a {
    color: var(--tf-primary);
    text-decoration: none;
  }
`;

function getPasswordStrength(password: string): number {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
}

export function RegisterPage({ error, values = {} }: RegisterProps) {
  const { toggleTheme } = useTheme();
  const [password, setPassword] = useState('');
  const strength = getPasswordStrength(password);

  return (
    <div className="register-wrapper" style={{ position: 'relative' }}>
      <style>{registerStyles}</style>

      <div className="register-theme-toggle">
        <button
          className="btn-theme-toggle"
          onClick={toggleTheme}
          title="Přepnout téma"
          style={{ width: 36, height: 36, fontSize: '1rem' }}
        >
          <i className="bi bi-moon" />
          <i className="bi bi-sun" />
        </button>
      </div>

      <div className="register-card">
        <div className="register-brand">
          <a href="/" className="text-decoration-none">
            <div className="brand-icon">
              <i className="bi bi-person-plus" />
            </div>
            <h4>Registrace</h4>
            <p>Vytvořte si účet v TypeForge</p>
          </a>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2" style={{ borderRadius: 8, fontSize: '0.9rem' }}>
            <i className="bi bi-exclamation-triangle" />
            {error}
          </div>
        )}

        <form method="post" action="/register" className="register-form">
          <div className="row g-3 mb-3">
            <div className="col-6">
              <label className="form-label" htmlFor="firstName">Jméno</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Jan"
                defaultValue={values['firstName'] || ''}
                required
                autoFocus
              />
            </div>
            <div className="col-6">
              <label className="form-label" htmlFor="lastName">Příjmení</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Novák"
                defaultValue={values['lastName'] || ''}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="vas@email.cz"
              defaultValue={values['email'] || ''}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Heslo</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Min. 6 znaků"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password-strength">
              {[1, 2, 3, 4].map((level) => (
                <div key={level} className={`bar${strength >= level ? ` active-${level}` : ''}`} />
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="passwordConfirm">Potvrzení hesla</label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Zopakujte heslo"
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="terms" name="terms" required />
            <label className="form-check-label" htmlFor="terms">
              Souhlasím s <a href="/terms">podmínkami použití</a> a <a href="/privacy">ochranou soukromí</a>
            </label>
          </div>
          <button type="submit" className="btn-primary-tf w-100" style={{ padding: '0.65rem', fontSize: '0.95rem' }}>
            <i className="bi bi-person-plus me-2" />
            Zaregistrovat se
          </button>
        </form>

        <div className="register-divider">nebo</div>

        <div className="register-link">
          Již máte účet? <a href="/login">Přihlaste se</a>
        </div>
      </div>
    </div>
  );
}
