import { BaseProps } from '../types';
import { cx, attrs, when, map } from '../helpers';
import { Icon } from '../ui/Icon';

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterSection {
    title: string;
    links: FooterLink[];
}

export interface FooterProps extends BaseProps {
    brand?: {
        text: string;
        icon?: string;
        description?: string;
    };
    sections?: FooterSection[];
    socialLinks?: { icon: string; href: string; label?: string }[];
    copyright?: string;
    bottomLinks?: FooterLink[];
}

export function Footer(props: FooterProps): string {
    const {
        brand = { text: 'TypeForge', icon: 'braces-asterisk', description: 'Serverless web framework' },
        sections = [],
        socialLinks = [],
        copyright = `© ${new Date().getFullYear()} TypeForge. Všechna práva vyhrazena.`,
        bottomLinks = [],
        class: className,
        id
    } = props;

    const classes = cx('footer-tf', className);
    const attributes = attrs({ id, class: classes });

    const brandSection = `
        <div class="col-lg-4 mb-4 mb-lg-0">
            <div class="footer-brand">
                ${when(!!brand.icon, () => Icon({ name: brand.icon!, class: 'text-gradient' }))}
                <span class="text-gradient">${brand.text}</span>
            </div>
            ${when(!!brand.description, () => `<p class="footer-desc">${brand.description}</p>`)}
            ${when(socialLinks.length > 0, () => `
                <div class="footer-social">
                    ${map(socialLinks, (link) => `
                        <a href="${link.href}" class="footer-social-link" ${link.label ? `title="${link.label}"` : ''}>
                            ${Icon({ name: link.icon })}
                        </a>
                    `)}
                </div>
            `)}
        </div>
    `;

    const linkSections = when(sections.length > 0, () => `
        ${map(sections, (section) => `
            <div class="col-6 col-md-3 col-lg-2">
                <h6 class="footer-title">${section.title}</h6>
                <ul class="footer-links">
                    ${map(section.links, (link) => `
                        <li><a href="${link.href}">${link.label}</a></li>
                    `)}
                </ul>
            </div>
        `)}
    `);

    const bottomSection = `
        <div class="footer-bottom">
            <div class="footer-copyright">${copyright}</div>
            ${when(bottomLinks.length > 0, () => `
                <div class="footer-bottom-links">
                    ${map(bottomLinks, (link) => `<a href="${link.href}">${link.label}</a>`)}
                </div>
            `)}
        </div>
    `;

    return `
        <footer ${attributes}>
            <div class="container">
                <div class="row">
                    ${brandSection}
                    ${linkSections}
                </div>
                ${bottomSection}
            </div>
        </footer>
    `;
}

// Default footer for public pages
export function PublicFooter(): string {
    return Footer({
        brand: {
            text: 'TypeForge',
            icon: 'braces-asterisk',
            description: 'Moderní serverless web framework pro TypeScript vývojáře.'
        },
        sections: [
            {
                title: 'Produkt',
                links: [
                    { label: 'Funkce', href: '/#features' },
                    { label: 'Ceník', href: '/#pricing' },
                    { label: 'Dokumentace', href: '/docs' }
                ]
            },
            {
                title: 'Společnost',
                links: [
                    { label: 'O nás', href: '/about' },
                    { label: 'Blog', href: '/article' },
                    { label: 'Kontakt', href: '/contact' }
                ]
            },
            {
                title: 'Podpora',
                links: [
                    { label: 'Nápověda', href: '/help' },
                    { label: 'Status', href: '/status' },
                    { label: 'API', href: '/api' }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', href: 'https://github.com', label: 'GitHub' },
            { icon: 'twitter-x', href: 'https://twitter.com', label: 'Twitter' },
            { icon: 'discord', href: 'https://discord.com', label: 'Discord' }
        ],
        bottomLinks: [
            { label: 'Ochrana soukromí', href: '/privacy' },
            { label: 'Podmínky použití', href: '/terms' }
        ]
    });
}

// Footer styles
export function footerStyles(): string {
    return `
        .footer-tf {
            background: var(--tf-surface);
            border-top: 1px solid var(--tf-border);
            padding: 4rem 0 2rem;
            margin-top: auto;
        }
        .footer-brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
        }
        .footer-brand i {
            font-size: 1.75rem;
        }
        .footer-desc {
            color: var(--tf-text-muted);
            font-size: 0.95rem;
            line-height: 1.7;
            margin-bottom: 1.5rem;
            max-width: 300px;
        }
        .footer-social {
            display: flex;
            gap: 0.75rem;
        }
        .footer-social-link {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: var(--tf-bg);
            border: 1px solid var(--tf-border);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--tf-text-muted);
            transition: all 0.2s ease;
        }
        .footer-social-link:hover {
            border-color: var(--tf-primary);
            color: var(--tf-primary);
            transform: translateY(-2px);
        }
        .footer-title {
            font-weight: 700;
            font-size: 0.9rem;
            margin-bottom: 1.25rem;
            color: var(--tf-text);
        }
        .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .footer-links li {
            margin-bottom: 0.75rem;
        }
        .footer-links a {
            color: var(--tf-text-muted);
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.2s ease;
        }
        .footer-links a:hover {
            color: var(--tf-primary-light);
        }
        .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 2rem;
            margin-top: 3rem;
            border-top: 1px solid var(--tf-border);
        }
        .footer-copyright {
            color: var(--tf-text-muted);
            font-size: 0.85rem;
        }
        .footer-bottom-links {
            display: flex;
            gap: 1.5rem;
        }
        .footer-bottom-links a {
            color: var(--tf-text-muted);
            text-decoration: none;
            font-size: 0.85rem;
            transition: color 0.2s ease;
        }
        .footer-bottom-links a:hover {
            color: var(--tf-primary-light);
        }
        @media (max-width: 768px) {
            .footer-bottom {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
        }
    `;
}
