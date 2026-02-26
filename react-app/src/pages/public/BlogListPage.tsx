import React from 'react';
import Container from 'react-bootstrap/Container';
import { useTheme } from '../../context/ThemeContext';
import { formatDate } from '../../utils';
import { useT } from '../../i18n';

interface PublicBlogListProps {
  posts: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    category?: string;
    author?: string;
    readTime?: string;
    createdAt: string;
    featuredImage?: string;
  }[];
}

const blogListStyles = `
  .blog-list-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .blog-navbar {
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
  .blog-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .blog-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .blog-header {
    padding: 8rem 0 3rem;
    text-align: center;
  }
  .blog-header h1 {
    font-size: 2.75rem;
    font-weight: 800;
    margin-bottom: 0.75rem;
  }
  .blog-header p {
    color: var(--tf-text-muted);
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
  }
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    padding-bottom: 3rem;
  }
  .blog-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
    display: flex;
    flex-direction: column;
  }
  .blog-card:hover {
    border-color: var(--tf-primary);
    transform: translateY(-2px);
  }
  .blog-card .card-img {
    height: 200px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .blog-card .card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .blog-card .card-img .placeholder {
    font-size: 3rem;
    color: var(--tf-text-muted);
  }
  .blog-card .card-body {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .blog-card .card-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }
  .blog-card .card-meta .category-badge {
    background: rgba(var(--tf-primary-rgb, 124, 58, 237), 0.1);
    color: var(--tf-primary);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .blog-card .card-meta .date {
    font-size: 0.8rem;
    color: var(--tf-text-muted);
  }
  .blog-card h5 {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  .blog-card h5 a {
    color: var(--tf-text);
    text-decoration: none;
  }
  .blog-card h5 a:hover {
    color: var(--tf-primary);
  }
  .blog-card .excerpt {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .blog-card .card-footer-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    border-top: 1px solid var(--tf-border);
    font-size: 0.8rem;
    color: var(--tf-text-muted);
  }
  .blog-card .card-footer-meta .author {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .blog-card .card-footer-meta .read-time {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .blog-empty {
    text-align: center;
    padding: 4rem 2rem;
  }
  .blog-empty i {
    font-size: 3rem;
    color: var(--tf-text-muted);
    margin-bottom: 1rem;
    display: block;
  }
  .blog-empty p {
    color: var(--tf-text-muted);
  }
  .blog-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
`;

export function BlogListPage({ posts }: PublicBlogListProps) {
  const { toggleTheme } = useTheme();
  const t = useT('blog');

  return (
    <div className="blog-list-page">
      <style>{blogListStyles}</style>

      {/* Navbar */}
      <nav className="blog-navbar">
        <Container className="d-flex align-items-center justify-content-between">
          <a href="/" className="text-decoration-none d-flex align-items-center gap-2">
            <i className="bi bi-braces-asterisk text-gradient" />
            <span className="text-gradient fw-bold fs-5">TypeForge</span>
          </a>
          <div className="d-flex align-items-center gap-3">
            <a href="/" className="nav-link d-none d-md-inline">{t.public.nav.home}</a>
            <a href="/eshop" className="nav-link d-none d-md-inline">E-Shop</a>
            <a href="/blog" className="nav-link d-none d-md-inline" style={{ color: 'var(--tf-text)' }}>Blog</a>
            <button
              className="btn-theme-toggle"
              onClick={toggleTheme}
              title={t.public.nav.toggleTheme}
              style={{ width: 32, height: 32, fontSize: '0.9rem' }}
            >
              <i className="bi bi-moon" />
              <i className="bi bi-sun" />
            </button>
          </div>
        </Container>
      </nav>

      {/* Header */}
      <section className="blog-header">
        <Container>
          <span className="hero-badge">
            <i className="bi bi-newspaper me-1" />
            Blog
          </span>
          <h1>
            {t.public.newsAndArticles} <span className="text-gradient">{t.public.articles}</span>
          </h1>
          <p>{t.public.subtitle}</p>
        </Container>
      </section>

      {/* Blog grid */}
      <Container as="section">
        {posts.length === 0 ? (
          <div className="blog-empty">
            <i className="bi bi-journal-x" />
            <p>{t.empty.noArticlesYet}</p>
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <div key={post.id} className="blog-card">
                <a href={`/article?slug=${post.slug}`} className="text-decoration-none">
                  <div className="card-img">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.title} />
                    ) : (
                      <i className="bi bi-file-earmark-text placeholder" />
                    )}
                  </div>
                </a>
                <div className="card-body">
                  <div className="card-meta">
                    {post.category && <span className="category-badge">{post.category}</span>}
                    <span className="date">{formatDate(post.createdAt)}</span>
                  </div>
                  <h5><a href={`/article?slug=${post.slug}`}>{post.title}</a></h5>
                  {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
                  <div className="card-footer-meta">
                    {post.author ? (
                      <span className="author">
                        <i className="bi bi-person" />
                        {post.author}
                      </span>
                    ) : <span />}
                    {post.readTime ? (
                      <span className="read-time">
                        <i className="bi bi-clock" />
                        {post.readTime}
                      </span>
                    ) : <span />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* Footer */}
      <footer className="blog-footer">
        <Container>
          <p>&copy; {new Date().getFullYear()} TypeForge. Všechna práva vyhrazena.</p>
        </Container>
      </footer>
    </div>
  );
}
