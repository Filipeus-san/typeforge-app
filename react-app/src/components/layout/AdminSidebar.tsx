import React from 'react';
import type { NavSection } from '../../types';
import { Icon } from '../ui/Icon';
import { NavBadge } from '../ui/Badge';
import { ThemeToggle } from '../ui/ThemeToggle';

const defaultSections: NavSection[] = [
  {
    title: 'Hlavní',
    items: [
      { path: '/admin', icon: 'grid-1x2', label: 'Dashboard' },
      { path: '/admin/analytics', icon: 'bar-chart', label: 'Analytika' },
    ],
  },
  {
    title: 'E-Shop',
    items: [
      { path: '/admin/orders', icon: 'cart3', label: 'Objednávky', badge: '12' },
      { path: '/admin/products', icon: 'box-seam', label: 'Produkty' },
      { path: '/admin/categories', icon: 'folder', label: 'Kategorie' },
    ],
  },
  {
    title: 'Obsah',
    items: [
      { path: '/admin/blog', icon: 'journal-richtext', label: 'Blog' },
      { path: '/admin/media', icon: 'images', label: 'Média' },
    ],
  },
];

interface AdminSidebarProps {
  activePage: string;
  sections?: NavSection[];
  user?: { name: string; initials: string; role: string };
  onClose?: () => void;
}

function getActiveId(path: string): string {
  const parts = path.split('/').filter(Boolean);
  return parts.length > 1 ? parts[parts.length - 1] : 'dashboard';
}

export function AdminSidebar({
  activePage,
  sections = defaultSections,
  user = { name: 'Jan Novák', initials: 'JN', role: 'Administrátor' },
  onClose,
}: AdminSidebarProps) {
  return (
    <>
      <button className="sidebar-close" onClick={onClose}><Icon name="x-lg" /></button>
      <a href="/admin" className="admin-logo">
        <Icon name="braces-asterisk" className="text-gradient" />
        <span className="text-gradient">TypeForge</span>
      </a>
      <nav className="admin-nav">
        {sections.map((section, si) => (
          <div key={si} className="admin-nav-section">
            <div className="admin-nav-label">{section.title}</div>
            {section.items.map((item) => {
              const itemId = getActiveId(item.path);
              const isActive = itemId === activePage;
              return (
                <a key={item.path} href={item.path} className={`admin-nav-item${isActive ? ' active' : ''}`}>
                  <Icon name={item.icon || 'circle'} />
                  <span>{item.label}</span>
                  {item.badge && <NavBadge>{item.badge}</NavBadge>}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="admin-user">
        <div className="admin-user-avatar">{user.initials}</div>
        <div className="admin-user-info">
          <div className="admin-user-name">{user.name}</div>
          <div className="admin-user-role">{user.role}</div>
        </div>
        <ThemeToggle size="sm" />
      </div>
    </>
  );
}
