import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { StatsGrid } from '../../components/data/StatCard';
import { CardSection } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { StatData } from '../../types';
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusVariant, getInitials } from '../../utils';
import { useT } from '../../i18n';

interface DashboardProps {
  stats: StatData[];
  recentOrders: { id: string; orderNumber: string; customerName: string; totalAmount: string; status: string; createdAt: string }[];
  lowStockProducts: { id: string; name: string; stock: string; status: string }[];
}

export function DashboardPage({ stats, recentOrders, lowStockProducts }: DashboardProps) {
  const t = useT('dashboard');
  return (
    <AdminLayout title={t.headings.dashboard} activePage="dashboard">
      <StatsGrid stats={stats} />
      <Row className="g-4">
        <Col md={8}>
          <CardSection title={t.sections.recentOrders}>
            <table className="data-table">
              <thead>
                <tr><th>{t.columns.number}</th><th>{t.columns.customer}</th><th style={{textAlign:'right'}}>{t.columns.amount}</th><th>{t.columns.status}</th><th>{t.columns.date}</th></tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-muted-tf py-4">{t.empty.orders}</td></tr>
                ) : recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td><a href={`/admin/orders/detail?id=${o.id}`} className="order-id">{o.orderNumber}</a></td>
                    <td>
                      <div className="order-customer">
                        <div className="order-avatar">{getInitials(o.customerName)}</div>
                        {o.customerName}
                      </div>
                    </td>
                    <td style={{textAlign:'right'}}>{formatPrice(Number(o.totalAmount))}</td>
                    <td><Badge variant={getOrderStatusVariant(o.status) as any}>{getOrderStatusLabel(o.status)}</Badge></td>
                    <td>{formatDate(o.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardSection>
        </Col>
        <Col md={4}>
          <CardSection title={t.sections.lowStock}>
            {lowStockProducts.length === 0 ? (
              <p className="text-muted-tf">{t.empty.noProducts}</p>
            ) : lowStockProducts.map((p) => (
              <div key={p.id} className="d-flex justify-content-between align-items-center py-2" style={{borderBottom:'1px solid var(--tf-border)'}}>
                <a href={`/admin/products/edit?id=${p.id}`} style={{color:'var(--tf-text)', textDecoration:'none'}}>{p.name}</a>
                <Badge variant="danger">{p.stock} ks</Badge>
              </div>
            ))}
          </CardSection>
        </Col>
      </Row>
    </AdminLayout>
  );
}
