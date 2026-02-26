import React from 'react';
import type { BadgeVariant } from '../../types';
import { Icon } from './Icon';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  icon?: string;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: '',
  success: 'success',
  warning: 'warning',
  info: 'info',
  danger: 'danger',
};

export function Badge({ children, variant = 'default', icon, className }: BadgeProps) {
  const classes = ['status-badge', variantClasses[variant], className].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      {icon && <Icon name={icon} className="me-1" />}
      {children}
    </span>
  );
}

export function HeroBadge({
  children,
  icon,
  color = 'primary',
  className,
}: {
  children: React.ReactNode;
  icon?: string;
  color?: 'primary' | 'accent';
  className?: string;
}) {
  const colorClass = color === 'accent' ? 'eshop-badge' : 'hero-badge';
  const classes = [colorClass, className].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      {icon && <Icon name={icon} className="me-1" />}
      {children}
    </span>
  );
}

export function NavBadge({ children }: { children: React.ReactNode }) {
  return <span className="admin-nav-badge">{children}</span>;
}
