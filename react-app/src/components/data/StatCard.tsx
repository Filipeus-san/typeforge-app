import React from 'react';
import type { IconColor } from '../../types';
import { Icon } from '../ui/Icon';

interface StatCardProps {
  icon: string;
  iconColor?: IconColor;
  value: string;
  label: string;
  change?: { value: string; direction: 'up' | 'down' };
  className?: string;
}

const iconColorClasses: Record<IconColor, string> = {
  purple: 'purple',
  green: 'green',
  blue: 'blue',
  orange: 'orange',
  muted: '',
  primary: 'purple',
  accent: 'green',
};

export function StatCard({ icon, iconColor = 'purple', value, label, change, className }: StatCardProps) {
  const classes = ['stat-card', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <div className="stat-header">
        <div className={`stat-icon ${iconColorClasses[iconColor]}`}>
          <Icon name={icon} />
        </div>
        {change && (
          <div className={`stat-change ${change.direction}`}>
            <Icon name={`arrow-${change.direction}`} /> {change.value}
          </div>
        )}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export function StatsGrid({ stats, columns = 4 }: { stats: StatCardProps[]; columns?: 2 | 3 | 4 }) {
  const colClass = columns === 2 ? 'col-md-6' : columns === 3 ? 'col-md-4' : 'col-md-6 col-lg-3';
  return (
    <div className="row g-4 mb-4">
      {stats.map((stat, i) => (
        <div key={i} className={colClass}>
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
}
