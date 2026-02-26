import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { StatsGrid } from '../../components/data/StatCard';
import { CardSection } from '../../components/ui/Card';
import type { StatData } from '../../types';
import { useT } from '../../i18n';

interface AnalyticsProps {
  stats: StatData[];
}

export function AnalyticsPage({ stats }: AnalyticsProps) {
  const t = useT('dashboard');
  return (
    <AdminLayout title={t.headings.analytics} activePage="analytics">
      <StatsGrid stats={stats} />
      <div className="row g-4">
        <div className="col-md-8">
          <CardSection title={t.sections.monthlyRevenue}>
            <div className="chart-placeholder"><i className="bi bi-bar-chart" /></div>
          </CardSection>
        </div>
        <div className="col-md-4">
          <CardSection title={t.sections.topProducts}>
            <div className="chart-placeholder"><i className="bi bi-pie-chart" /></div>
          </CardSection>
        </div>
      </div>
    </AdminLayout>
  );
}
