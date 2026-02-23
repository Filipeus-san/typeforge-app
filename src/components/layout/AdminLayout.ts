import { BaseProps } from '../types';
import { cx, attrs, when } from '../helpers';
import { AdminSidebar, AdminSidebarProps } from './AdminSidebar';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { SearchInput } from '../ui/Form';

export interface AdminLayoutProps extends BaseProps {
    title: string;
    activePage: string;
    children: string;
    subtitle?: string;
    headerActions?: string;
    sidebarProps?: Partial<AdminSidebarProps>;
}

export function AdminLayout(props: AdminLayoutProps): string {
    const {
        title,
        activePage,
        children,
        subtitle,
        headerActions,
        sidebarProps,
        class: className,
        id
    } = props;

    const classes = cx('admin-wrapper', className);
    const attributes = attrs({ id, class: classes });

    const defaultHeaderActions = `
        ${SearchInput({})}
        ${Button({ children: 'Web', href: '/', variant: 'outline', size: 'sm', icon: 'box-arrow-up-right' })}
    `;

    return `
        ${adminStyles()}
        <div ${attributes}>
            <div class="sidebar-overlay" :class="{'open': $store.sidebar.open}" @click="$store.sidebar.close()"></div>
            <aside class="admin-sidebar" :class="{'open': $store.sidebar.open}">
                ${AdminSidebar({ activePage, ...sidebarProps })}
            </aside>
            <main class="admin-main">
                <div class="admin-header">
                    <div>
                        <button class="mobile-menu-btn" @click="$store.sidebar.toggle()">
                            ${Icon({ name: 'list' })}
                        </button>
                        <h1 class="admin-title">${title}</h1>
                    </div>
                    <div class="admin-header-actions">
                        ${headerActions || defaultHeaderActions}
                    </div>
                </div>
                ${children}
            </main>
        </div>
    `;
}

// Admin-specific styles
function adminStyles(): string {
    return `
<style>
.admin-wrapper {
    min-height: 100vh;
    display: flex;
    max-width: 100vw;
    overflow-x: hidden;
}
.admin-sidebar {
    width: 260px;
    flex-shrink: 0;
    background: var(--tf-surface);
    border-right: 1px solid var(--tf-border);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    z-index: 1000;
}
.admin-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0 1.5rem;
    border-bottom: 1px solid var(--tf-border);
    margin-bottom: 1.5rem;
    text-decoration: none;
}
.admin-logo i { font-size: 1.5rem; }
.admin-logo span { font-weight: 800; font-size: 1.2rem; }
.admin-nav { flex: 1; overflow-y: auto; }
.admin-nav-section { margin-bottom: 1.5rem; }
.admin-nav-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--tf-text-muted);
    padding: 0 0.75rem;
    margin-bottom: 0.5rem;
}
.admin-nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 10px;
    color: var(--tf-text);
    text-decoration: none;
    transition: all 0.2s ease;
    margin-bottom: 0.25rem;
}
.admin-nav-item:hover {
    background: rgba(124,92,252,0.1);
    color: var(--tf-primary-light);
}
.admin-nav-item.active {
    background: var(--tf-gradient);
    color: #fff;
}
.admin-nav-item i { font-size: 1.1rem; width: 24px; text-align: center; }
.admin-nav-item span { font-weight: 500; font-size: 0.95rem; }
.admin-nav-badge {
    margin-left: auto;
    padding: 0.2rem 0.5rem;
    border-radius: 50px;
    font-size: 0.7rem;
    font-weight: 700;
    background: var(--tf-accent);
    color: #0f0f17;
}
.admin-user {
    padding-top: 1rem;
    border-top: 1px solid var(--tf-border);
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.admin-user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--tf-gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
}
.admin-user-info { flex: 1; }
.admin-user-name { font-weight: 600; font-size: 0.9rem; }
.admin-user-role { font-size: 0.75rem; color: var(--tf-text-muted); }
.admin-main {
    flex: 1;
    min-width: 0;
    margin-left: 260px;
    padding: 2rem;
    background: var(--tf-bg);
    overflow-x: hidden;
}
.admin-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
}
.admin-title { font-size: 1.75rem; font-weight: 800; }
.admin-header-actions { display: flex; align-items: center; gap: 1rem; }
.admin-search { position: relative; }
.admin-search input {
    width: 280px;
    padding: 0.6rem 1rem 0.6rem 2.5rem;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 10px;
    color: var(--tf-text);
    font-size: 0.9rem;
}
.admin-search input:focus { border-color: var(--tf-primary); outline: none; }
.admin-search i {
    position: absolute;
    left: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--tf-text-muted);
}
.card-section {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}
.card-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
}
.card-section-title { font-size: 1.1rem; font-weight: 700; }
.data-table { width: 100%; }
.data-table th {
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--tf-text-muted);
    border-bottom: 1px solid var(--tf-border);
}
.data-table td {
    padding: 1rem;
    font-size: 0.9rem;
    border-bottom: 1px solid var(--tf-border);
    vertical-align: middle;
}
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: rgba(124,92,252,0.03); }
.status-badge {
    display: inline-flex;
    padding: 0.3rem 0.75rem;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 600;
}
.status-badge.success { background: rgba(6,214,160,0.15); color: var(--tf-accent); }
.status-badge.warning { background: rgba(251,191,36,0.15); color: #fbbf24; }
.status-badge.info { background: rgba(59,130,246,0.15); color: #60a5fa; }
.status-badge.danger { background: rgba(239,68,68,0.15); color: #ef4444; }
.btn-action {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid var(--tf-border);
    background: transparent;
    color: var(--tf-text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.25rem;
}
.btn-action:hover {
    border-color: var(--tf-primary);
    color: var(--tf-primary);
    background: rgba(124,92,252,0.1);
}
.btn-action.danger:hover {
    border-color: #ef4444;
    color: #ef4444;
    background: rgba(239,68,68,0.1);
}
.btn-add {
    padding: 0.6rem 1.25rem;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    background: var(--tf-gradient);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}
.btn-add:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(124,92,252,0.3); }
.stat-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
}
.stat-card:hover { border-color: rgba(124,92,252,0.3); transform: translateY(-2px); }
.stat-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
}
.stat-icon.purple { background: rgba(124,92,252,0.15); color: var(--tf-primary-light); }
.stat-icon.green { background: rgba(6,214,160,0.15); color: var(--tf-accent); }
.stat-icon.blue { background: rgba(59,130,246,0.15); color: #60a5fa; }
.stat-icon.orange { background: rgba(251,146,60,0.15); color: #fb923c; }
.stat-value { font-size: 2rem; font-weight: 800; margin-bottom: 0.25rem; }
.stat-label { font-size: 0.9rem; color: var(--tf-text-muted); }
.stat-change { font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 0.25rem; }
.stat-change.up { color: var(--tf-accent); }
.stat-change.down { color: #ef4444; }
.avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--tf-gradient-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--tf-primary-light);
}
.order-customer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.order-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--tf-gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    color: #fff;
    flex-shrink: 0;
}
.order-id {
    font-weight: 600;
    color: var(--tf-primary-light);
}
.order-status {
    display: inline-flex;
    padding: 0.3rem 0.75rem;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 600;
}
.order-status.completed { background: rgba(6,214,160,0.15); color: var(--tf-accent); }
.order-status.processing { background: rgba(59,130,246,0.15); color: #60a5fa; }
.order-status.pending { background: rgba(251,191,36,0.15); color: #fbbf24; }
.order-status.cancelled { background: rgba(239,68,68,0.15); color: #ef4444; }
.filter-bar { display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.filter-select {
    padding: 0.5rem 1rem;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 8px;
    color: var(--tf-text);
    font-size: 0.9rem;
}
.filter-select:focus { border-color: var(--tf-primary); outline: none; }
.pagination { display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.5rem; }
.page-btn {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid var(--tf-border);
    background: var(--tf-surface);
    color: var(--tf-text);
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.page-btn:hover, .page-btn.active {
    border-color: var(--tf-primary);
    background: var(--tf-primary);
    color: #fff;
}
.form-group { margin-bottom: 1.25rem; }
.form-label { display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--tf-text); }
.form-control {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    border-radius: 10px;
    color: var(--tf-text);
    font-size: 0.95rem;
}
.form-control:focus { border-color: var(--tf-primary); outline: none; box-shadow: 0 0 0 3px rgba(124,92,252,0.15); }
.form-switch { display: flex; align-items: center; gap: 0.75rem; }
.toggle-switch {
    width: 48px;
    height: 26px;
    background: var(--tf-border);
    border-radius: 13px;
    position: relative;
    cursor: pointer;
    transition: background 0.2s ease;
}
.toggle-switch.active { background: var(--tf-accent); }
.toggle-switch::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: transform 0.2s ease;
}
.toggle-switch.active::after { transform: translateX(22px); }
.media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; }
.media-item {
    aspect-ratio: 1;
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}
.media-item:hover { border-color: var(--tf-primary); transform: scale(1.02); }
.media-item i { font-size: 2.5rem; color: var(--tf-text-muted); }
.chart-placeholder {
    height: 300px;
    background: var(--tf-bg);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed var(--tf-border);
}
.chart-placeholder i { font-size: 3rem; color: var(--tf-text-muted); }
.mobile-menu-btn {
    display: none;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    border: 1px solid var(--tf-border);
    background: var(--tf-surface);
    color: var(--tf-text);
    font-size: 1.25rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
}
.sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
}
.sidebar-close {
    display: none;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: none;
    background: var(--tf-bg);
    color: var(--tf-text);
    font-size: 1.25rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
}
@media (max-width: 992px) {
    .mobile-menu-btn { display: flex; }
    .sidebar-close { display: flex; }
    .admin-sidebar { transform: translateX(-100%); transition: transform 0.3s ease; }
    .admin-sidebar.open { transform: translateX(0); }
    .sidebar-overlay.open { display: block; }
    .admin-main { margin-left: 0; padding: 1rem; }
    .admin-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
    .admin-header > div:first-child { display: flex; align-items: center; gap: 1rem; width: 100%; }
    .admin-title { font-size: 1.35rem; }
    .admin-header-actions { width: 100%; }
    .admin-search { flex: 1; }
    .admin-search input { width: 100%; }
    .stat-value { font-size: 1.5rem; }
    .data-table { display: block; overflow-x: auto; }
    .filter-bar { flex-direction: column; }
    .filter-select { width: 100%; }
    .card-section { padding: 1rem; }
    .card-section-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
}
@media (max-width: 576px) {
    .admin-main { padding: 0.75rem; }
    .stat-card { padding: 1rem; }
    .stat-icon { width: 40px; height: 40px; font-size: 1rem; }
    .stat-value { font-size: 1.25rem; }
    .btn-add { width: 100%; justify-content: center; }
    .media-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); }
}
</style>
    `;
}
