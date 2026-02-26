import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
  const colProps = columns === 2 ? { md: 6 } : columns === 3 ? { md: 4 } : { md: 6, lg: 3 };
  return (
    <Row className="g-4 mb-4">
      {stats.map((stat, i) => (
        <Col key={i} {...colProps}>
          <StatCard {...stat} />
        </Col>
      ))}
    </Row>
  );
}
