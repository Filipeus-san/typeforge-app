import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface LandingProps {
  userName?: string;
}

const landingStyles = `
  .landing-navbar {
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
  .landing-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .landing-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .landing-hero {
    padding: 8rem 0 5rem;
    text-align: center;
  }
  .landing-hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }
  .landing-hero-subtitle {
    font-size: 1.25rem;
    color: var(--tf-text-muted);
    max-width: 640px;
    margin: 0 auto 2rem;
  }
  .landing-prompt-box {
    max-width: 600px;
    margin: 2.5rem auto 0;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    color: var(--tf-text-muted);
    text-align: left;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .landing-prompt-box .cursor-blink {
    display: inline-block;
    width: 2px;
    height: 1.1em;
    background: var(--tf-primary);
    animation: blink 1s step-end infinite;
    vertical-align: middle;
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
  .landing-connector {
    padding: 5rem 0;
  }
  .landing-code-block {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: var(--tf-text);
    overflow-x: auto;
  }
  .landing-code-block pre {
    margin: 0;
    white-space: pre;
  }
  .agent-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 999px;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    color: var(--tf-text);
  }
  .landing-features {
    padding: 5rem 0;
  }
  .feature-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 2rem;
    height: 100%;
    transition: border-color 0.2s, transform 0.2s;
  }
  .feature-card:hover {
    border-color: var(--tf-primary);
    transform: translateY(-2px);
  }
  .feature-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--tf-primary), var(--tf-accent));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  .feature-card h5 {
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--tf-text);
  }
  .feature-card p {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    margin: 0;
  }
  .landing-how-it-works {
    padding: 5rem 0;
  }
  .step-card {
    text-align: center;
    padding: 2rem;
  }
  .step-number {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--tf-primary), var(--tf-accent));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto 1.25rem;
  }
  .step-card h5 {
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--tf-text);
  }
  .step-card p {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .landing-cta {
    padding: 5rem 0;
    text-align: center;
    background: linear-gradient(135deg, var(--tf-primary), var(--tf-accent));
    border-radius: 24px;
    margin: 3rem 0;
    color: #fff;
  }
  .landing-cta h2 {
    font-weight: 800;
    margin-bottom: 1rem;
  }
  .landing-cta p {
    opacity: 0.9;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  .landing-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--tf-primary);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }
`;

const mcpConfigJson = `{
  "mcpServers": {
    "typeforge": {
      "command": "npx",
      "args": ["-y", "typeforge-mcp"],
      "env": {
        "TYPEFORGE_API_TOKEN": "your-api-token"
      }
    }
  }
}`;

const features = [
  { icon: 'robot', title: 'AI Asistent', desc: 'Integrovaný AI asistent pro rychlejší vývoj a automatizaci.' },
  { icon: 'code-slash', title: 'TypeScript nativně', desc: 'Plná podpora TypeScriptu s kompilací do Lua pro maximální výkon.' },
  { icon: 'cloud-arrow-up', title: 'Serverless deploy', desc: 'Nasazení jedním příkazem bez správy infrastruktury.' },
  { icon: 'database', title: 'Databáze & cache', desc: 'PostgreSQL, Redis a vestavěná cache k dispozici okamžitě.' },
  { icon: 'diagram-3', title: 'MCP Connector', desc: 'Propojte svůj projekt s AI agenty přes standardní MCP protokol.' },
  { icon: 'share', title: 'API & Integrace', desc: 'REST API, JWT autentizace, email, PDF a další služby v základu.' },
];

const steps = [
  { title: 'Vytvořte projekt', desc: 'Inicializujte nový TypeForge projekt a nakonfigurujte služby.' },
  { title: 'Napište kód', desc: 'Vyvíjejte v TypeScriptu s podporou AI asistenta a hot-reload.' },
  { title: 'Nasadte', desc: 'Jedním příkazem nasaďte na serverless infrastrukturu.' },
];

const agents = [
  { name: 'Claude Code', icon: 'terminal' },
  { name: 'Cursor', icon: 'cursor' },
  { name: 'Windsurf', icon: 'wind' },
  { name: 'Cline', icon: 'braces' },
];

export function LandingPage({ userName }: LandingProps) {
  const { toggleTheme } = useTheme();
  const t = useT('shop');

  return (
    <div style={{ background: 'var(--tf-bg)', color: 'var(--tf-text)', minHeight: '100vh' }}>
      <style>{landingStyles}</style>

      {/* Navbar */}
      <nav className="landing-navbar">
        <Container className="d-flex align-items-center justify-content-between">
          <a href="/" className="text-decoration-none d-flex align-items-center gap-2">
            <i className="bi bi-braces-asterisk text-gradient" />
            <span className="text-gradient fw-bold fs-5">TypeForge</span>
          </a>
          <div className="d-flex align-items-center gap-3">
            <a href="/#connector" className="nav-link d-none d-md-inline">MCP Connector</a>
            <a href="/#features" className="nav-link d-none d-md-inline">Features</a>
            <a href="/#how-it-works" className="nav-link d-none d-md-inline">Jak to funguje</a>
            <a href="/blog" className="nav-link d-none d-md-inline">Blog</a>
            <a href="/eshop" className="nav-link d-none d-md-inline">{t.nav.eshop}</a>
            <a href="/admin" className="nav-link d-none d-md-inline">{t.nav.admin}</a>
            <button
              className="btn-theme-toggle"
              onClick={toggleTheme}
              title={t.nav.toggleTheme}
              style={{ width: 32, height: 32, fontSize: '0.9rem' }}
            >
              <i className="bi bi-moon" />
              <i className="bi bi-sun" />
            </button>
            {userName ? (
              <a href="/logout" className="btn-outline-tf btn-sm">Odhlásit</a>
            ) : (
              <a href="/login" className="btn-primary-tf btn-sm">Přihlásit</a>
            )}
          </div>
        </Container>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <Container>
          <span className="hero-badge">
            <i className="bi bi-stars me-1" />
            Lorem ipsum dolor sit amet
          </span>
          <h1 className="landing-hero-title">
            Vytvářejte webové aplikace<br />
            <span className="text-gradient">rychleji než kdy dříve</span>
          </h1>
          <p className="landing-hero-subtitle">
            TypeForge je moderní serverless framework pro TypeScript vývojáře.
            Kompilujte do Lua, nasazujte jedním příkazem a integrujte AI agenty.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <a href="/register" className="btn-primary-tf">
              <i className="bi bi-rocket-takeoff me-2" />Začít zdarma
            </a>
            <a href="/#features" className="btn-outline-tf">
              <i className="bi bi-play-circle me-2" />Zjistit více
            </a>
          </div>
          <div className="landing-prompt-box">
            <i className="bi bi-chevron-right" style={{ color: 'var(--tf-primary)' }} />
            <span>npx create-typeforge-app my-project</span>
            <span className="cursor-blink" />
          </div>
        </Container>
      </section>

      {/* Connector */}
      <section className="landing-connector" id="connector">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div className="section-label">
                <i className="bi bi-plug" />
                MCP Connector
              </div>
              <h2 className="fw-bold mb-3">Propojte svůj projekt s AI agenty</h2>
              <p className="text-muted-tf mb-4">
                Standardní Model Context Protocol umožňuje AI agentům pracovat s vaším projektem,
                spravovat databázi, nasazovat změny a mnohem více.
              </p>
              <div className="d-flex flex-wrap gap-2">
                {agents.map((a) => (
                  <span key={a.name} className="agent-badge">
                    <i className={`bi bi-${a.icon}`} />
                    {a.name}
                  </span>
                ))}
              </div>
            </Col>
            <Col lg={6}>
              <div className="landing-code-block">
                <pre>{mcpConfigJson}</pre>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section className="landing-features" id="features">
        <Container>
          <div className="text-center mb-5">
            <div className="section-label justify-content-center">
              <i className="bi bi-grid" />
              Features
            </div>
            <h2 className="fw-bold">Vše co potřebujete</h2>
            <p className="text-muted-tf">Kompletní sada nástrojů pro moderní webový vývoj.</p>
          </div>
          <Row className="g-4">
            {features.map((f) => (
              <Col key={f.icon} md={6} lg={4}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className={`bi bi-${f.icon}`} />
                  </div>
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How it works */}
      <section className="landing-how-it-works" id="how-it-works">
        <Container>
          <div className="text-center mb-5">
            <div className="section-label justify-content-center">
              <i className="bi bi-list-ol" />
              Jak to funguje
            </div>
            <h2 className="fw-bold">Tři jednoduché kroky</h2>
          </div>
          <Row className="g-4">
            {steps.map((s, i) => (
              <Col key={i} md={4}>
                <div className="step-card">
                  <div className="step-number">{i + 1}</div>
                  <h5>{s.title}</h5>
                  <p>{s.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <Container as="section">
        <div className="landing-cta">
          <h2>Připraveni začít?</h2>
          <p>Vytvořte si účet zdarma a začněte stavět během pár minut.</p>
          <div className="d-flex gap-3 justify-content-center">
            <a href="/register" className="btn-primary-tf" style={{ background: '#fff', color: 'var(--tf-primary)' }}>
              <i className="bi bi-rocket-takeoff me-2" />Začít zdarma
            </a>
            <a href="/blog" className="btn-outline-tf" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
              Přečíst blog
            </a>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <footer className="landing-footer">
        <Container>
          <p>&copy; {new Date().getFullYear()} TypeForge. Všechna práva vyhrazena.</p>
        </Container>
      </footer>
    </div>
  );
}
