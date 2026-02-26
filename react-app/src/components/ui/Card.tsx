import React from 'react';
import type { Size } from '../../types';

const paddingClasses: Record<Size, string> = {
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
  xl: 'p-5',
};

export function Card({
  children,
  hover = false,
  padding = 'md',
  className,
}: {
  children: React.ReactNode;
  hover?: boolean;
  padding?: Size;
  className?: string;
}) {
  const classes = ['card-tf', hover ? 'card-hover' : '', paddingClasses[padding], className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}

export function CardSection({
  children,
  title,
  headerRight,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  headerRight?: React.ReactNode;
  className?: string;
}) {
  const classes = ['card-section', className].filter(Boolean).join(' ');
  const showHeader = title || headerRight;
  return (
    <div className={classes}>
      {showHeader && (
        <div className="card-section-header">
          {title && <h5 className="card-section-title">{title}</h5>}
          {headerRight}
        </div>
      )}
      {children}
    </div>
  );
}

export function FeatureCard({ icon, title, description, className }: {
  icon: string;
  title: string;
  description: string;
  className?: string;
}) {
  const classes = ['feature-card', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <div className="feature-icon"><i className={`bi bi-${icon}`} /></div>
      <h5 className="fw-bold mb-2">{title}</h5>
      <p className="text-muted-tf mb-0">{description}</p>
    </div>
  );
}

export function StepCard({ number, title, description, className }: {
  number: number;
  title: string;
  description: string;
  className?: string;
}) {
  const classes = ['step-card', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <div className="step-number">{number}</div>
      <h5 className="fw-bold mb-2">{title}</h5>
      <p className="text-muted-tf mb-0">{description}</p>
    </div>
  );
}
