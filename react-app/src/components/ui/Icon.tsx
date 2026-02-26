import React from 'react';
import type { Size } from '../../types';

interface IconProps {
  name: string;
  size?: Size;
  color?: string;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  xs: 'fs-6',
  sm: '',
  md: 'fs-5',
  lg: 'fs-4',
  xl: 'fs-3',
};

export function Icon({ name, size, color, className }: IconProps) {
  const iconName = name.startsWith('bi-') ? name : `bi-${name}`;
  const classes = ['bi', iconName, size ? sizeClasses[size] : '', className].filter(Boolean).join(' ');
  return <i className={classes} style={color ? { color } : undefined} />;
}
