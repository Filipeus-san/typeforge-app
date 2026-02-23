import { BaseProps, ButtonVariant, Size } from '../types';
import { cx, attrs, when } from '../helpers';
import { Icon } from './Icon';

export interface ButtonProps extends BaseProps {
    children: string;
    variant?: ButtonVariant;
    size?: Size;
    icon?: string;
    iconRight?: string;
    href?: string;
    onclick?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'btn-primary-tf',
    outline: 'btn-outline-tf',
    ghost: 'btn-ghost-tf',
    accent: 'btn-accent-tf'
};

const sizeClasses: Record<Size, string> = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    xl: 'btn-xl'
};

export function Button(props: ButtonProps): string {
    const {
        children,
        variant = 'primary',
        size = 'md',
        icon,
        iconRight,
        href,
        onclick,
        type = 'button',
        disabled = false,
        fullWidth = false,
        class: className,
        id
    } = props;

    const tag = href ? 'a' : 'button';
    const classes = cx(
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-100',
        className
    );

    const attributes = attrs({
        id,
        class: classes,
        href: href,
        '@click': onclick,
        type: !href ? type : undefined,
        disabled: disabled
    });

    const iconLeft = when(!!icon, () => Icon({ name: icon!, class: iconRight ? '' : 'me-2' }));
    const iconRightHtml = when(!!iconRight, () => Icon({ name: iconRight!, class: 'ms-2' }));

    return `<${tag} ${attributes}>${iconLeft}${children}${iconRightHtml}</${tag}>`;
}

// Predefined button styles
export interface ButtonAddProps extends Omit<ButtonProps, 'variant' | 'children'> {
    children?: string;
    label?: string; // Alias for children
}

export function ButtonAdd(props: ButtonAddProps): string {
    const { label, children, icon = 'plus-lg', ...rest } = props;
    const content = label || children || '';
    return Button({ ...rest, children: content, variant: 'primary', icon, class: cx('btn-add', props.class) });
}

export function ButtonAction(props: { icon: string; onclick?: string; href?: string; variant?: 'default' | 'danger'; title?: string }): string {
    const { icon, onclick, href, variant = 'default', title } = props;
    const classes = cx('btn-action', variant === 'danger' && 'danger');
    const tag = href ? 'a' : 'button';

    const attributes = attrs({
        class: classes,
        href,
        '@click': onclick,
        title
    });

    return `<${tag} ${attributes}>${Icon({ name: icon })}</${tag}>`;
}
