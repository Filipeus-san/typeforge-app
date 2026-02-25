import { NavSection, NavItem } from '../types';
import { cx, map, when } from '../helpers';
import { Icon } from '../ui/Icon';
import { NavBadge } from '../ui/Badge';
import { ThemeToggle } from '../ui/ThemeToggle';
import { SIDEBAR_T } from "./AdminSidebar.translation";

// Default admin navigation structure
export const adminNavSections: NavSection[] = [
    {
        title: SIDEBAR_T.sections.main,
        items: [
            { path: '/admin', icon: 'grid-1x2', label: SIDEBAR_T.items.dashboard },
            { path: '/admin/analytics', icon: 'bar-chart', label: SIDEBAR_T.items.analytics }
        ]
    },
    {
        title: SIDEBAR_T.sections.eshop,
        items: [
            { path: '/admin/orders', icon: 'cart3', label: SIDEBAR_T.items.orders, badge: '12' },
            { path: '/admin/products', icon: 'box-seam', label: SIDEBAR_T.items.products },
            { path: '/admin/categories', icon: 'folder', label: SIDEBAR_T.items.categories }
        ]
    },
    {
        title: SIDEBAR_T.sections.content,
        items: [
            { path: '/admin/blog', icon: 'journal-richtext', label: SIDEBAR_T.items.blog },
            { path: '/admin/media', icon: 'images', label: SIDEBAR_T.items.media }
        ]
    }
];

export interface AdminSidebarProps {
    activePage: string;
    sections?: NavSection[];
    user?: {
        name: string;
        initials: string;
        role: string;
    };
}

function getActiveId(path: string): string {
    const parts = path.split('/').filter(p => !!p);
    return parts.length > 1 ? parts[parts.length - 1] : 'dashboard';
}

export function AdminSidebar(props: AdminSidebarProps): string {
    const {
        activePage,
        sections = adminNavSections,
        user = { name: SIDEBAR_T.defaults.userName, initials: 'JN', role: SIDEBAR_T.defaults.userRole }
    } = props;

    const navSections = map(sections, (section) => {
        const items = map(section.items, (item) => {
            const itemId = getActiveId(item.path);
            const isActive = itemId === activePage;
            const activeClass = isActive ? ' active' : '';
            const badge = when(!!item.badge, () => NavBadge({ children: item.badge! }));

            return `
                <a href="${item.path}" class="admin-nav-item${activeClass}">
                    ${Icon({ name: item.icon || 'circle' })}
                    <span>${item.label}</span>
                    ${badge}
                </a>
            `;
        });

        return `
            <div class="admin-nav-section">
                <div class="admin-nav-label">${section.title}</div>
                ${items}
            </div>
        `;
    });

    return `
        <button class="sidebar-close" @click="$store.sidebar.close()">
            ${Icon({ name: 'x-lg' })}
        </button>
        <a href="/admin" class="admin-logo">
            ${Icon({ name: 'braces-asterisk', class: 'text-gradient' })}
            <span class="text-gradient">TypeForge</span>
        </a>
        <nav class="admin-nav">
            ${navSections}
        </nav>
        <div class="admin-user">
            <div class="admin-user-avatar">${user.initials}</div>
            <div class="admin-user-info">
                <div class="admin-user-name">${user.name}</div>
                <div class="admin-user-role">${user.role}</div>
            </div>
            ${ThemeToggle({ size: 'sm' })}
        </div>
    `;
}
