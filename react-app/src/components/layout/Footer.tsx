import React from 'react';
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
  brand = { text: 'TypeForge', icon: 'braces-asterisk', description: 'Moderní serverless web framework pro TypeScript vývojáře.' },
  sections = [],
  socialLinks = [],
  copyright = `© ${new Date().getFullYear()} TypeForge. Všechna práva vyhrazena.`,
  bottomLinks = [],
}: FooterProps) {
  return (
    <footer className="footer-tf">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
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
          </div>
          {sections.map((section, i) => (
            <div key={i} className="col-6 col-md-3 col-lg-2">
              <h6 className="footer-title">{section.title}</h6>
              <ul className="footer-links">
                {section.links.map((link, j) => (
                  <li key={j}><a href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">{copyright}</div>
          {bottomLinks.length > 0 && (
            <div className="footer-bottom-links">
              {bottomLinks.map((link, i) => <a key={i} href={link.href}>{link.label}</a>)}
            </div>
          )}
        </div>
      </div>
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
