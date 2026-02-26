import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminDataList } from '../../components/data/AdminDataList';
import { Badge } from '../../components/ui/Badge';
import type { DataListColumn, DataListAction, FilterDef } from '../../types';
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusVariant, getInitials, ORDER_STATUS_FILTER_OPTIONS } from '../../utils';

interface OrderListProps {
  orders: Record<string, string>[];
  statusFilter: string;
}

export function OrderListPage({ orders, statusFilter }: OrderListProps) {
  const columns: DataListColumn[] = [
    { key: 'orderNumber', label: 'Objednávka', render: (v, row) => <span className="order-id">{v}</span> },
    { key: 'customerName', label: 'Zákazník', render: (v) => (
      <div className="order-customer"><div className="order-avatar">{getInitials(v)}</div>{v}</div>
    )},
    { key: 'totalAmount', label: 'Částka', align: 'right', render: (v) => formatPrice(Number(v)) },
    { key: 'status', label: 'Stav', render: (v) => <Badge variant={getOrderStatusVariant(v) as any}>{getOrderStatusLabel(v)}</Badge> },
    { key: 'createdAt', label: 'Datum', render: (v) => formatDate(v) },
  ];

  const actions: DataListAction[] = [
    { icon: 'eye', href: (row) => `/admin/orders/detail?id=${row.id}`, title: 'Detail' },
    { icon: 'pencil', href: (row) => `/admin/orders/edit?id=${row.id}`, title: 'Upravit' },
  ];

  const filters: FilterDef[] = [
    { name: 'status', options: ORDER_STATUS_FILTER_OPTIONS, value: statusFilter, placeholder: 'Všechny stavy' },
  ];

  return (
    <AdminLayout title="Objednávky" activePage="orders">
      <AdminDataList columns={columns} rows={orders} actions={actions} filters={filters}
        addButton={{ label: 'Nová objednávka', href: '/admin/orders/create' }} emptyMessage="Žádné objednávky" />
    </AdminLayout>
  );
}
