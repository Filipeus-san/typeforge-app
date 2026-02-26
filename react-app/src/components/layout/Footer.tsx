import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useT } from '../../i18n';
import { Icon } from '../ui/Icon';

interface FooterLink { label: string; href: string }
interface FooterSection { title: string; links: FooterLink[] }

interface FooterProps {
  brand?: { text: string; icon?: string; description?: string };
  sections?: FooterSection[];
  socialLinks?: { icon: string; href: string; label?: string }[];
  copyright?: string;
  bottomLinks?: FooterLink[];
}

export function Footer({
  brand: brandProp,
  sections = [],
  socialLinks = [],
  copyright: copyrightProp,
  bottomLinks = [],
}: FooterProps) {
  const t = useT('common');
  const brand = brandProp ?? { text: t.footer.brand, icon: 'braces-asterisk', description: t.footer.tagline };
  const copyright = copyrightProp ?? `\u00A9 ${new Date().getFullYear()} ${t.footer.copyright}`;
  return (
    <footer className="footer-tf">
      <Container>
        <Row>
          <Col lg={4} className="mb-4 mb-lg-0">
            <div className="footer-brand">
              {brand.icon && <Icon name={brand.icon} className="text-gradient" />}
              <span className="text-gradient">{brand.text}</span>
            </div>
            {brand.description && <p className="footer-desc">{brand.description}</p>}
            {socialLinks.length > 0 && (
              <div className="footer-social">
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.href} className="footer-social-link" title={link.label}>
                    <Icon name={link.icon} />
                  </a>
                ))}
              </div>
            )}
          </Col>
          {sections.map((section, i) => (
            <Col key={i} xs={6} md={3} lg={2}>
              <h6 className="footer-title">{section.title}</h6>
              <ul className="footer-links">
                {section.links.map((link, j) => (
                  <li key={j}><a href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
        <div className="footer-bottom">
          <div className="footer-copyright">{copyright}</div>
          {bottomLinks.length > 0 && (
            <div className="footer-bottom-links">
              {bottomLinks.map((link, i) => <a key={i} href={link.href}>{link.label}</a>)}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}

export function PublicFooter() {
  return (
    <Footer
      sections={[
        { title: 'Produkt', links: [{ label: 'Funkce', href: '/#features' }, { label: 'Ceník', href: '/#pricing' }, { label: 'Dokumentace', href: '/docs' }] },
        { title: 'Společnost', links: [{ label: 'O nás', href: '/about' }, { label: 'Blog', href: '/article' }, { label: 'Kontakt', href: '/contact' }] },
        { title: 'Podpora', links: [{ label: 'Nápověda', href: '/help' }, { label: 'Status', href: '/status' }, { label: 'API', href: '/api' }] },
      ]}
      socialLinks={[
        { icon: 'github', href: 'https://github.com', label: 'GitHub' },
        { icon: 'twitter-x', href: 'https://twitter.com', label: 'Twitter' },
        { icon: 'discord', href: 'https://discord.com', label: 'Discord' },
      ]}
      bottomLinks={[
        { label: 'Ochrana soukromí', href: '/privacy' },
        { label: 'Podmínky použití', href: '/terms' },
      ]}
    />
  );
}
