import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { SearchInput } from '../form/SearchInput';

interface AdminLayoutProps {
  title: string;
  activePage: string;
  children: React.ReactNode;
  subtitle?: string;
  headerActions?: React.ReactNode;
  sidebarProps?: Record<string, any>;
}

export function AdminLayout({
  title,
  activePage,
  children,
  subtitle,
  headerActions,
  sidebarProps,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const defaultActions = (
    <>
      <SearchInput />
      <Button href="/" variant="outline" size="sm" icon="box-arrow-up-right">Web</Button>
    </>
  );

  return (
    <div className="admin-wrapper">
      {sidebarOpen && <div className="sidebar-overlay open" onClick={() => setSidebarOpen(false)} />}
      <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        <AdminSidebar activePage={activePage} onClose={() => setSidebarOpen(false)} {...sidebarProps} />
      </aside>
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Icon name="list" />
            </button>
            <h1 className="admin-title">{title}</h1>
          </div>
          <div className="admin-header-actions">
            {headerActions || defaultActions}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
