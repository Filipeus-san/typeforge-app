import { BaseProps } from '../types';
import { cx, attrs, when, map } from '../helpers';
import { HeroBadge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface HeroAction {
    text: string;
    href: string;
    variant?: 'primary' | 'outline';
    icon?: string;
}

export interface HeroProps extends BaseProps {
    badge?: {
        icon?: string;
        text: string;
    };
    title: string;
    subtitle?: string;
    actions?: HeroAction[];
    align?: 'left' | 'center';
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: { title: 'fs-1', subtitle: 'fs-5', section: 'py-4' },
    md: { title: 'hero-title', subtitle: 'hero-subtitle', section: 'py-5' },
    lg: { title: 'display-3 fw-bold', subtitle: 'lead', section: 'py-6' }
};

export function Hero(props: HeroProps): string {
    const {
        badge,
        title,
        subtitle,
        actions = [],
        align = 'left',
        size = 'md',
        class: className,
        id
    } = props;

    const classes = cx(
        'hero-section',
        sizeClasses[size].section,
        align === 'center' && 'text-center',
        className
    );
    const attributes = attrs({ id, class: classes });

    const badgeHtml = when(!!badge, () => HeroBadge({
        children: badge!.text,
        icon: badge?.icon
    }));

    const actionsHtml = when(actions.length > 0, () => `
        <div class="d-flex gap-3 ${align === 'center' ? 'justify-content-center' : ''} mt-4">
            ${map(actions, (action) => Button({
                children: action.text,
                href: action.href,
                variant: action.variant || 'primary',
                icon: action.icon
            }))}
        </div>
    `);

    return `
        <section ${attributes}>
            <div class="container">
                ${badgeHtml}
                <h1 class="${sizeClasses[size].title}">${title}</h1>
                ${when(!!subtitle, () => `<p class="${sizeClasses[size].subtitle}">${subtitle}</p>`)}
                ${actionsHtml}
            </div>
        </section>
    `;
}

// Section label/header
export interface SectionHeaderProps extends BaseProps {
    icon?: string;
    label?: string;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
}

export function SectionHeader(props: SectionHeaderProps): string {
    const { icon, label, title, subtitle, align = 'left', class: className, id } = props;

    const classes = cx(align === 'center' && 'text-center', 'mb-4', className);
    const attributes = attrs({ id, class: classes });

    return `
        <div ${attributes}>
            ${when(!!label, () => `
                <div class="section-label">
                    ${when(!!icon, () => `<i class="bi bi-${icon}"></i>`)}
                    ${label}
                </div>
            `)}
            <h2 class="fw-bold mb-2">${title}</h2>
            ${when(!!subtitle, () => `<p class="text-muted-tf">${subtitle}</p>`)}
        </div>
    `;
}

// CTA Section
export interface CTASectionProps extends BaseProps {
    title: string;
    subtitle?: string;
    actions?: HeroAction[];
}

export function CTASection(props: CTASectionProps): string {
    const { title, subtitle, actions = [], class: className, id } = props;

    const classes = cx('cta-section', 'text-center', className);
    const attributes = attrs({ id, class: classes });

    const actionsHtml = when(actions.length > 0, () => `
        <div class="d-flex gap-3 justify-content-center mt-4">
            ${map(actions, (action) => Button({
                children: action.text,
                href: action.href,
                variant: action.variant || 'primary',
                icon: action.icon
            }))}
        </div>
    `);

    return `
        <section ${attributes}>
            <h2 class="fw-bold mb-3">${title}</h2>
            ${when(!!subtitle, () => `<p class="text-muted-tf mb-4">${subtitle}</p>`)}
            ${actionsHtml}
        </section>
    `;
}
