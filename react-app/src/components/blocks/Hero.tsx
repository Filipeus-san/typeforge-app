import React from 'react';
import Container from 'react-bootstrap/Container';
import { HeroBadge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface HeroAction {
  text: string;
  href: string;
  variant?: 'primary' | 'outline';
  icon?: string;
}

interface HeroProps {
  badge?: { icon?: string; text: string };
  title: string;
  subtitle?: string;
  actions?: HeroAction[];
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: { title: 'fs-1', subtitle: 'fs-5', section: 'py-4' },
  md: { title: 'hero-title', subtitle: 'hero-subtitle', section: 'py-5' },
  lg: { title: 'display-3 fw-bold', subtitle: 'lead', section: 'py-6' },
};

export function Hero({ badge, title, subtitle, actions = [], align = 'left', size = 'md' }: HeroProps) {
  const sc = sizeClasses[size];
  const classes = ['hero-section', sc.section, align === 'center' ? 'text-center' : ''].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      <Container>
        {badge && <HeroBadge icon={badge.icon}>{badge.text}</HeroBadge>}
        <h1 className={sc.title}>{title}</h1>
        {subtitle && <p className={sc.subtitle}>{subtitle}</p>}
        {actions.length > 0 && (
          <div className={`d-flex gap-3 ${align === 'center' ? 'justify-content-center' : ''} mt-4`}>
            {actions.map((a, i) => (
              <Button key={i} href={a.href} variant={a.variant || 'primary'} icon={a.icon}>{a.text}</Button>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export function SectionHeader({ icon, label, title, subtitle, align = 'left', className }: {
  icon?: string; label?: string; title: string; subtitle?: string; align?: 'left' | 'center'; className?: string;
}) {
  const classes = [align === 'center' ? 'text-center' : '', 'mb-4', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      {label && (
        <div className="section-label">
          {icon && <i className={`bi bi-${icon}`} />}
          {label}
        </div>
      )}
      <h2 className="fw-bold mb-2">{title}</h2>
      {subtitle && <p className="text-muted-tf">{subtitle}</p>}
    </div>
  );
}

export function CTASection({ title, subtitle, actions = [], className }: {
  title: string; subtitle?: string; actions?: HeroAction[]; className?: string;
}) {
  const classes = ['cta-section', 'text-center', className].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      <h2 className="fw-bold mb-3">{title}</h2>
      {subtitle && <p className="text-muted-tf mb-4">{subtitle}</p>}
      {actions.length > 0 && (
        <div className="d-flex gap-3 justify-content-center mt-4">
          {actions.map((a, i) => (
            <Button key={i} href={a.href} variant={a.variant || 'primary'} icon={a.icon}>{a.text}</Button>
          ))}
        </div>
      )}
    </section>
  );
}
