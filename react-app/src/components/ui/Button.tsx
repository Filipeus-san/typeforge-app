import React from 'react';
import type { ButtonVariant, Size } from '../../types';
import { Icon } from './Icon';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: Size;
  icon?: string;
  iconRight?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary-tf',
  outline: 'btn-outline-tf',
  ghost: 'btn-ghost-tf',
  accent: 'btn-accent-tf',
};

const sizeClasses: Record<Size, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  href,
  type = 'button',
  disabled = false,
  fullWidth = false,
  onClick,
  className,
}: ButtonProps) {
  const classes = [variantClasses[variant], sizeClasses[size], fullWidth ? 'w-100' : '', className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {icon && <Icon name={icon} className={iconRight ? '' : 'me-2'} />}
        {children}
        {iconRight && <Icon name={iconRight} className="ms-2" />}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {icon && <Icon name={icon} className={iconRight ? '' : 'me-2'} />}
      {children}
      {iconRight && <Icon name={iconRight} className="ms-2" />}
    </button>
  );
}

export function ButtonAction({
  icon,
  href,
  variant = 'default',
  title,
  onClick,
}: {
  icon: string;
  href?: string;
  variant?: 'default' | 'danger';
  title?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const classes = ['btn-action', variant === 'danger' ? 'danger' : ''].filter(Boolean).join(' ');
  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} className={classes} title={title} onClick={onClick}>
      <Icon name={icon} />
    </Tag>
  );
}
