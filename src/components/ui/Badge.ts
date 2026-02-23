import { BaseProps, BadgeVariant } from '../types';
import { cx, attrs, when } from '../helpers';
import { Icon } from './Icon';

export interface BadgeProps extends BaseProps {
    children?: string;
    label?: string; // Alias for children
    variant?: BadgeVariant;
    icon?: string;
    pill?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
    default: '',
    success: 'success',
    warning: 'warning',
    info: 'info',
    danger: 'danger'
};

export function Badge(props: BadgeProps): string {
    const {
        children,
        label,
        variant = 'default',
        icon,
        pill = true,
        class: className,
        id
    } = props;
    const content = label || children || '';

    const classes = cx(
        'status-badge',
        variantClasses[variant],
        className
    );

    const attributes = attrs({ id, class: classes });
    const iconHtml = when(!!icon, () => Icon({ name: icon!, class: 'me-1' }));

    return `<span ${attributes}>${iconHtml}${content}</span>`;
}

// Hero/section badge with gradient background
export interface HeroBadgeProps extends BaseProps {
    children: string;
    icon?: string;
    color?: 'primary' | 'accent';
}

export function HeroBadge(props: HeroBadgeProps): string {
    const { children, icon, color = 'primary', class: className, id } = props;

    const colorClass = color === 'accent' ? 'eshop-badge' : 'hero-badge';
    const classes = cx(colorClass, className);
    const attributes = attrs({ id, class: classes });
    const iconHtml = when(!!icon, () => Icon({ name: icon!, class: 'me-1' }));

    return `<span ${attributes}>${iconHtml}${children}</span>`;
}

// Small nav badge (for counts in sidebar)
export function NavBadge(props: { children: string }): string {
    return `<span class="admin-nav-badge">${props.children}</span>`;
}
