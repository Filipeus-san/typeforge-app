import React from 'react';
import type { NavItem } from '../../types';
import { useT } from '../../i18n';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';

interface NavbarProps {
  brand?: { text: string; href?: string; icon?: string };
  items?: NavItem[];
  showThemeToggle?: boolean;
  showAdminLink?: boolean;
  ctaButton?: { text: string; href: string };
  fixed?: boolean;
}

export function Navbar({
  brand = { text: 'TypeForge', href: '/', icon: 'braces-asterisk' },
  items = [],
  showThemeToggle = true,
  showAdminLink = false,
  ctaButton,
  fixed = true,
}: NavbarProps) {
  const t = useT('common');
  const classes = ['navbar navbar-expand-lg navbar-dark navbar-tf', fixed ? 'fixed-top' : ''].filter(Boolean).join(' ');

  return (
    <nav className={classes}>
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href={brand.href || '/'}>
          {brand.icon && <i className={`bi bi-${brand.icon} text-gradient`} />}
          <span className="text-gradient">{brand.text}</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            {items.map((item) => (
              <li key={item.path} className="nav-item">
                <a className={`nav-link${item.active ? ' active' : ''}`} href={item.path}>
                  {item.icon && <i className={`bi bi-${item.icon} me-1`} />}
                  {item.label}
                </a>
              </li>
            ))}
            {showAdminLink && (
              <li className="nav-item">
                <a className="nav-link" href="/admin"><i className="bi bi-speedometer2 me-1" />{t.nav.admin}</a>
              </li>
            )}
            {showThemeToggle && (
              <li className="nav-item ms-2"><ThemeToggle size="sm" /></li>
            )}
            {ctaButton && (
              <li className="nav-item ms-2">
                <Button href={ctaButton.href} variant="primary" size="sm">{ctaButton.text}</Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function PublicNavbar({ activePath }: { activePath?: string }) {
  const t = useT('common');
  const items: NavItem[] = [
    { path: '/', label: t.nav.home, active: activePath === '/' },
    { path: '/blog', label: t.sidebar.items.blog, active: activePath === '/blog' },
    { path: '/eshop', label: t.nav.eshop, active: activePath === '/eshop' },
  ];
  return <Navbar items={items} showAdminLink ctaButton={{ text: 'Vyzkoušet', href: '/login' }} />;
}
