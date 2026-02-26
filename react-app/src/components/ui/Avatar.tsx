import React from 'react';
import type { Size } from '../../types';
import { Icon } from './Icon';

const sizeStyles: Record<Size, React.CSSProperties> = {
  xs: { width: 24, height: 24, fontSize: '0.7rem' },
  sm: { width: 32, height: 32, fontSize: '0.8rem' },
  md: { width: 36, height: 36, fontSize: '0.85rem' },
  lg: { width: 44, height: 44, fontSize: '1rem' },
  xl: { width: 56, height: 56, fontSize: '1.2rem' },
};

export function Avatar({
  initials,
  icon,
  size = 'md',
  src,
  className,
}: {
  initials?: string;
  icon?: string;
  size?: Size;
  src?: string;
  className?: string;
}) {
  const classes = ['avatar', className].filter(Boolean).join(' ');
  const style = sizeStyles[size];

  if (src) {
    return <img className={classes} style={style} src={src} alt="" />;
  }

  return (
    <div className={classes} style={style}>
      {icon ? <Icon name={icon} /> : initials || ''}
    </div>
  );
}

export function UserDisplay({
  initials,
  name,
  subtitle,
  size = 'md',
}: {
  initials: string;
  name: string;
  subtitle?: string;
  size?: Size;
}) {
  return (
    <div className="d-flex align-items-center gap-2">
      <Avatar initials={initials} size={size} />
      <div>
        <strong>{name}</strong>
        {subtitle && <div className="text-muted-tf small">{subtitle}</div>}
      </div>
    </div>
  );
}
