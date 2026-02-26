import React from 'react';
import { Icon } from '../ui/Icon';

const colorStyles: Record<string, { bg: string; border: string }> = {
  primary: { bg: 'rgba(124,92,252,0.1)', border: 'rgba(124,92,252,0.3)' },
  accent: { bg: 'rgba(6,214,160,0.1)', border: 'rgba(6,214,160,0.3)' },
  blue: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)' },
  orange: { bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.3)' },
};

interface CategoryCardProps {
  title: string;
  icon: string;
  count?: number;
  href?: string;
  color?: 'primary' | 'accent' | 'blue' | 'orange';
  className?: string;
}

export function CategoryCard({ title, icon, count, href = '/category', color = 'primary', className }: CategoryCardProps) {
  const classes = ['category-card', className].filter(Boolean).join(' ');
  const colors = colorStyles[color];
  return (
    <a href={href} className={classes} style={{ textDecoration: 'none' }}>
      <div className="category-icon" style={{ background: colors.bg }}>
        <Icon name={icon} size="lg" />
      </div>
      <h6 className="category-title">{title}</h6>
      {count !== undefined && <span className="category-count">{count} produktů</span>}
    </a>
  );
}

export function CategoryGrid({ categories, columns = 6 }: { categories: CategoryCardProps[]; columns?: 2 | 3 | 4 | 6 }) {
  const colMap: Record<number, string> = { 2: 'col-6', 3: 'col-6 col-md-4', 4: 'col-6 col-md-3', 6: 'col-6 col-md-4 col-lg-2' };
  const colClass = colMap[columns];
  return (
    <div className="row g-3">
      {categories.map((cat, i) => (
        <div key={i} className={colClass}><CategoryCard {...cat} /></div>
      ))}
    </div>
  );
}

export function CategoryList({ categories, className }: {
  categories: { name: string; count: number; href?: string; active?: boolean }[];
  className?: string;
}) {
  return (
    <div className={['category-list', className].filter(Boolean).join(' ')}>
      {categories.map((cat, i) => (
        <a key={i} href={cat.href || '#'} className={`category-list-item${cat.active ? ' active' : ''}`}>
          <span>{cat.name}</span>
          <span className="category-list-count">{cat.count}</span>
        </a>
      ))}
    </div>
  );
}
