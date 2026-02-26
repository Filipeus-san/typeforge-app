import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { StatsGrid } from '../../components/data/StatCard';
import { CardSection } from '../../components/ui/Card';
import type { StatData } from '../../types';

interface AnalyticsProps {
  stats: StatData[];
}

export function AnalyticsPage({ stats }: AnalyticsProps) {
  return (
    <AdminLayout title="Analytika" activePage="analytics">
      <StatsGrid stats={stats} />
      <div className="row g-4">
        <div className="col-md-8">
          <CardSection title="Přehled tržeb">
            <div className="chart-placeholder"><i className="bi bi-bar-chart" /></div>
          </CardSection>
        </div>
        <div className="col-md-4">
          <CardSection title="Top produkty">
            <div className="chart-placeholder"><i className="bi bi-pie-chart" /></div>
          </CardSection>
        </div>
      </div>
    </AdminLayout>
  );
}
