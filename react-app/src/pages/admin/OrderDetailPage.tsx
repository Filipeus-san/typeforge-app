import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { CardSection } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusVariant } from '../../utils';

interface OrderDetailProps {
  order: {
    id: string; orderNumber: string; customerName: string; customerEmail: string;
    status: string; totalAmount: string; shippingAddress?: string; billingAddress?: string;
    notes?: string; createdAt: string;
  };
  items: { id: string; productName: string; quantity: string; unitPrice: string; totalPrice: string }[];
}

export function OrderDetailPage({ order, items }: OrderDetailProps) {
  return (
    <AdminLayout title={`Objednávka ${order.orderNumber}`} activePage="orders"
      headerActions={<Button href={`/admin/orders/edit?id=${order.id}`} variant="outline" size="sm" icon="pencil">Upravit</Button>}>
      <div className="row g-4">
        <div className="col-md-8">
          <CardSection title="Položky objednávky">
            <table className="data-table">
              <thead><tr><th>Produkt</th><th style={{textAlign:'center'}}>Množství</th><th style={{textAlign:'right'}}>Cena/ks</th><th style={{textAlign:'right'}}>Celkem</th></tr></thead>
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
              <div style={{fontSize:'1.25rem',fontWeight:800}}>Celkem: {formatPrice(Number(order.totalAmount))}</div>
            </div>
          </CardSection>
          {order.notes && <CardSection title="Poznámky"><p>{order.notes}</p></CardSection>}
        </div>
        <div className="col-md-4">
          <CardSection title="Info">
            <div className="mb-3"><strong>Stav:</strong> <Badge variant={getOrderStatusVariant(order.status) as any}>{getOrderStatusLabel(order.status)}</Badge></div>
            <div className="mb-3"><strong>Datum:</strong> {formatDate(order.createdAt)}</div>
            <div className="mb-3"><strong>Zákazník:</strong> {order.customerName}</div>
            <div className="mb-3"><strong>Email:</strong> {order.customerEmail}</div>
          </CardSection>
          {order.shippingAddress && <CardSection title="Doručovací adresa"><p>{order.shippingAddress}</p></CardSection>}
          {order.billingAddress && <CardSection title="Fakturační adresa"><p>{order.billingAddress}</p></CardSection>}
        </div>
      </div>
    </AdminLayout>
  );
}
