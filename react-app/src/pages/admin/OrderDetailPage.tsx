import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { CardSection } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusVariant } from '../../utils';
import { useT } from '../../i18n';

interface OrderDetailProps {
  order: {
    id: string; orderNumber: string; customerName: string; customerEmail: string;
    status: string; totalAmount: string; shippingAddress?: string; billingAddress?: string;
    notes?: string; createdAt: string;
  };
  items: { id: string; productName: string; quantity: string; unitPrice: string; totalPrice: string }[];
}

export function OrderDetailPage({ order, items }: OrderDetailProps) {
  const t = useT('orders');
  return (
    <AdminLayout title={`${t.headings.admin} ${order.orderNumber}`} activePage="orders"
      headerActions={<Button href={`/admin/orders/edit?id=${order.id}`} variant="outline" size="sm" icon="pencil">{t.actions.edit}</Button>}>
      <Row className="g-4">
        <Col md={8}>
          <CardSection title={t.detail.sections.items}>
            <table className="data-table">
              <thead><tr><th>{t.columns.product}</th><th style={{textAlign:'center'}}>{t.columns.quantity}</th><th style={{textAlign:'right'}}>{t.columns.pricePerUnit}</th><th style={{textAlign:'right'}}>{t.columns.total}</th></tr></thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td style={{textAlign:'center'}}>{item.quantity}</td>
                    <td style={{textAlign:'right'}}>{formatPrice(Number(item.unitPrice))}</td>
                    <td style={{textAlign:'right'}}><strong>{formatPrice(Number(item.totalPrice))}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-end mt-3">
              <div style={{fontSize:'1.25rem',fontWeight:800}}>{t.columns.totalLabel} {formatPrice(Number(order.totalAmount))}</div>
            </div>
          </CardSection>
          {order.notes && <CardSection title={t.detail.sections.notes}><p>{order.notes}</p></CardSection>}
        </Col>
        <Col md={4}>
          <CardSection title={t.detail.sections.info}>
            <div className="mb-3"><strong>{t.detail.labels.status}:</strong> <Badge variant={getOrderStatusVariant(order.status) as any}>{getOrderStatusLabel(order.status)}</Badge></div>
            <div className="mb-3"><strong>{t.detail.labels.createdAt}:</strong> {formatDate(order.createdAt)}</div>
            <div className="mb-3"><strong>{t.detail.labels.name}:</strong> {order.customerName}</div>
            <div className="mb-3"><strong>{t.detail.labels.email}:</strong> {order.customerEmail}</div>
          </CardSection>
          {order.shippingAddress && <CardSection title={t.detail.sections.shippingAddress}><p>{order.shippingAddress}</p></CardSection>}
          {order.billingAddress && <CardSection title="Fakturacni adresa"><p>{order.billingAddress}</p></CardSection>}
        </Col>
      </Row>
    </AdminLayout>
  );
}
