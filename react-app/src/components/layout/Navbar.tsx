import React from 'react';
import type { NavItem } from '../../types';
import { useT } from '../../i18n';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import BsNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

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

  return (
    <BsNavbar expand="lg" variant="dark" className="navbar-tf" fixed={fixed ? 'top' : undefined}>
      <Container>
        <BsNavbar.Brand href={brand.href || '/'} className="d-flex align-items-center gap-2">
          {brand.icon && <i className={`bi bi-${brand.icon} text-gradient`} />}
          <span className="text-gradient">{brand.text}</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="navbarNav" />
        <BsNavbar.Collapse id="navbarNav">
          <Nav className="ms-auto align-items-center gap-1">
            {items.map((item) => (
              <Nav.Link key={item.path} href={item.path} active={item.active}>
                {item.icon && <i className={`bi bi-${item.icon} me-1`} />}
                {item.label}
              </Nav.Link>
            ))}
            {showAdminLink && (
              <Nav.Link href="/admin"><i className="bi bi-speedometer2 me-1" />{t.nav.admin}</Nav.Link>
            )}
            {showThemeToggle && (
              <Nav.Item className="ms-2"><ThemeToggle size="sm" /></Nav.Item>
            )}
            {ctaButton && (
              <Nav.Item className="ms-2">
                <Button href={ctaButton.href} variant="primary" size="sm">{ctaButton.text}</Button>
              </Nav.Item>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
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
