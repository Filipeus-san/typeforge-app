import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { formatDate } from '../../utils';

interface ArticleProps {
  title: string;
  content: string;
  category?: string;
  date?: string;
  author?: string;
  readTime?: string;
  featuredImageUrl?: string;
}

const articleStyles = `
  .article-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .article-navbar {
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
  .article-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .article-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .article-header {
    padding: 7rem 0 2rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  .article-header .category-badge {
    display: inline-block;
    background: rgba(var(--tf-primary-rgb, 124, 58, 237), 0.1);
    color: var(--tf-primary);
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.3rem 0.75rem;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 1rem;
  }
  .article-header h1 {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.25rem;
  }
  .article-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .article-meta .meta-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .article-meta .meta-item i {
    font-size: 0.95rem;
  }
  .article-featured-image {
    max-width: 900px;
    margin: 2rem auto;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--tf-border);
  }
  .article-featured-image img {
    width: 100%;
    height: auto;
    display: block;
  }
  .article-content-card {
    max-width: 800px;
    margin: 0 auto;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 2.5rem;
    margin-bottom: 3rem;
  }
  .article-content-card .article-body {
    color: var(--tf-text);
    line-height: 1.8;
    font-size: 1rem;
  }
  .article-content-card .article-body h1,
  .article-content-card .article-body h2,
  .article-content-card .article-body h3,
  .article-content-card .article-body h4 {
    color: var(--tf-text);
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }
  .article-content-card .article-body h2 {
    font-size: 1.5rem;
  }
  .article-content-card .article-body h3 {
    font-size: 1.25rem;
  }
  .article-content-card .article-body p {
    margin-bottom: 1rem;
    color: var(--tf-text-muted);
  }
  .article-content-card .article-body a {
    color: var(--tf-primary);
    text-decoration: none;
  }
  .article-content-card .article-body a:hover {
    text-decoration: underline;
  }
  .article-content-card .article-body ul,
  .article-content-card .article-body ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    color: var(--tf-text-muted);
  }
  .article-content-card .article-body li {
    margin-bottom: 0.35rem;
  }
  .article-content-card .article-body blockquote {
    border-left: 3px solid var(--tf-primary);
    padding: 0.75rem 1.25rem;
    margin: 1.5rem 0;
    background: var(--tf-bg);
    border-radius: 0 8px 8px 0;
    color: var(--tf-text-muted);
    font-style: italic;
  }
  .article-content-card .article-body pre {
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    font-size: 0.85rem;
    margin: 1.5rem 0;
  }
  .article-content-card .article-body code {
    background: var(--tf-bg);
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    font-size: 0.9em;
    color: var(--tf-primary);
  }
  .article-content-card .article-body pre code {
    background: none;
    padding: 0;
    color: var(--tf-text);
  }
  .article-content-card .article-body img {
    max-width: 100%;
    border-radius: 8px;
    margin: 1rem 0;
  }
  .article-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
`;

export function ArticlePage({ title, content, category, date, author, readTime, featuredImageUrl }: ArticleProps) {
  const { toggleTheme } = useTheme();

  return (
    <div className="article-page">
      <style>{articleStyles}</style>

      {/* Navbar */}
      <nav className="article-navbar">
        <div className="container d-flex align-items-center justify-content-between">
          <a href="/" className="text-decoration-none d-flex align-items-center gap-2">
            <i className="bi bi-braces-asterisk text-gradient" />
            <span className="text-gradient fw-bold fs-5">TypeForge</span>
          </a>
          <div className="d-flex align-items-center gap-3">
            <a href="/" className="nav-link d-none d-md-inline">Domů</a>
            <a href="/blog" className="nav-link d-none d-md-inline">Blog</a>
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
          </div>
        </div>
      </nav>

      {/* Article header */}
      <header className="article-header">
        <div className="container">
          {category && <span className="category-badge">{category}</span>}
          <h1>
            <span className="text-gradient">{title}</span>
          </h1>
          <div className="article-meta">
            {date && (
              <span className="meta-item">
                <i className="bi bi-calendar3" />
                {formatDate(date)}
              </span>
            )}
            {author && (
              <span className="meta-item">
                <i className="bi bi-person" />
                {author}
              </span>
            )}
            {readTime && (
              <span className="meta-item">
                <i className="bi bi-clock" />
                {readTime}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Featured image */}
      {featuredImageUrl && (
        <div className="article-featured-image">
          <img src={featuredImageUrl} alt={title} />
        </div>
      )}

      {/* Content */}
      <section className="container">
        <div className="article-content-card">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>

      {/* Back link */}
      <div className="container text-center mb-4">
        <a href="/blog" className="btn-outline-tf">
          <i className="bi bi-arrow-left me-2" />Zpět na blog
        </a>
      </div>

      {/* Footer */}
      <footer className="article-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} TypeForge. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
