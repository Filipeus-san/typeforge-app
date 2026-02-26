import React from 'react';
import type { NavSection } from '../../types';
import { useT } from '../../i18n';
import { Icon } from '../ui/Icon';
import { NavBadge } from '../ui/Badge';
import { ThemeToggle } from '../ui/ThemeToggle';

function getDefaultSections(t: ReturnType<typeof useT<'common'>>): NavSection[] {
  return [
    {
      title: t.sidebar.sections.main,
      items: [
        { path: '/admin', icon: 'grid-1x2', label: t.sidebar.items.dashboard },
        { path: '/admin/analytics', icon: 'bar-chart', label: t.sidebar.items.analytics },
      ],
    },
    {
      title: t.sidebar.sections.eshop,
      items: [
        { path: '/admin/orders', icon: 'cart3', label: t.sidebar.items.orders, badge: '12' },
        { path: '/admin/products', icon: 'box-seam', label: t.sidebar.items.products },
        { path: '/admin/categories', icon: 'folder', label: t.sidebar.items.categories },
      ],
    },
    {
      title: t.sidebar.sections.content,
      items: [
        { path: '/admin/blog', icon: 'journal-richtext', label: t.sidebar.items.blog },
        { path: '/admin/media', icon: 'images', label: t.sidebar.items.media },
      ],
    },
  ];
}

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
  sections,
  user = { name: 'Jan Novák', initials: 'JN', role: 'Administrátor' },
  onClose,
}: AdminSidebarProps) {
  const t = useT('common');
  const resolvedSections = sections ?? getDefaultSections(t);
  return (
    <>
      <button className="sidebar-close" onClick={onClose}><Icon name="x-lg" /></button>
      <a href="/admin" className="admin-logo">
        <Icon name="braces-asterisk" className="text-gradient" />
        <span className="text-gradient">TypeForge</span>
      </a>
      <nav className="admin-nav">
        {resolvedSections.map((section, si) => (
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
