import { BaseProps, NavItem } from '../types';
import { cx, attrs, map, when } from '../helpers';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';

export interface NavbarProps extends BaseProps {
    brand?: {
        text: string;
        href?: string;
        icon?: string;
    };
    items?: NavItem[];
    showThemeToggle?: boolean;
    showAdminLink?: boolean;
    ctaButton?: {
        text: string;
        href: string;
    };
    fixed?: boolean;
}

export function Navbar(props: NavbarProps): string {
    const {
        brand = { text: 'TypeForge', href: '/', icon: 'braces-asterisk' },
        items = [],
        showThemeToggle = true,
        showAdminLink = false,
        ctaButton,
        fixed = true,
        class: className,
        id
    } = props;

    const classes = cx(
        'navbar navbar-expand-lg navbar-dark navbar-tf',
        fixed && 'fixed-top',
        className
    );
    const attributes = attrs({ id, class: classes });

    const brandHtml = `
        <a class="navbar-brand d-flex align-items-center gap-2" href="${brand.href || '/'}">
            ${when(!!brand.icon, () => `<i class="bi bi-${brand.icon} text-gradient"></i>`)}
            <span class="text-gradient">${brand.text}</span>
        </a>
    `;

    const navItems = map(items, (item) => {
        const activeClass = item.active ? ' active' : '';
        return `
            <li class="nav-item">
                <a class="nav-link${activeClass}" href="${item.path}">
                    ${when(!!item.icon, () => `<i class="bi bi-${item.icon} me-1"></i>`)}
                    ${item.label}
                </a>
            </li>
        `;
    });

    const adminLink = when(showAdminLink, () => `
        <li class="nav-item">
            <a class="nav-link" href="/admin">
                <i class="bi bi-speedometer2 me-1"></i>Admin
            </a>
        </li>
    `);

    const ctaHtml = when(!!ctaButton, () => Button({
        children: ctaButton!.text,
        href: ctaButton!.href,
        variant: 'primary',
        size: 'sm'
    }));

    return `
        <nav ${attributes}>
            <div class="container">
                ${brandHtml}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto align-items-center gap-1">
                        ${navItems}
                        ${adminLink}
                        <li class="nav-item ms-2">
                            ${when(showThemeToggle, () => ThemeToggle({ size: 'sm' }))}
                        </li>
                        ${when(!!ctaButton, () => `<li class="nav-item ms-2">${ctaHtml}</li>`)}
                    </ul>
                </div>
            </div>
        </nav>
    `;
}

// Default navbar for public pages
export function PublicNavbar(activePath?: string): string {
    const items: NavItem[] = [
        { path: '/', label: 'Domů', active: activePath === '/' },
        { path: '/blog', label: 'Blog', active: activePath === '/blog' },
        { path: '/eshop', label: 'E-Shop', active: activePath === '/eshop' }
    ];

    return Navbar({
        items,
        showAdminLink: true,
        ctaButton: { text: 'Vyzkoušet', href: '/login' }
    });
}
