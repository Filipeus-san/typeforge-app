import React from 'react';
import type { Size } from '../../types';
import { useTheme } from '../../context/ThemeContext';

const sizeStyles: Record<Size, React.CSSProperties> = {
  xs: { width: 28, height: 28, fontSize: '0.8rem' },
  sm: { width: 32, height: 32, fontSize: '0.9rem' },
  md: { width: 40, height: 40, fontSize: '1.1rem' },
  lg: { width: 48, height: 48, fontSize: '1.25rem' },
  xl: { width: 56, height: 56, fontSize: '1.4rem' },
};

export function ThemeToggle({ size = 'md', className }: { size?: Size; className?: string }) {
  const { toggleTheme } = useTheme();
  const classes = ['btn-theme-toggle', className].filter(Boolean).join(' ');
  return (
    <button className={classes} style={sizeStyles[size]} onClick={toggleTheme} title="Přepnout téma">
      <i className="bi bi-moon" />
      <i className="bi bi-sun" />
    </button>
  );
}
