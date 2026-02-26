import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminDataList } from '../../components/data/AdminDataList';
import { Badge } from '../../components/ui/Badge';
import type { DataListColumn, DataListAction, FilterDef } from '../../types';
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusVariant, getInitials, ORDER_STATUS_FILTER_OPTIONS } from '../../utils';
import { useT } from '../../i18n';

interface OrderListProps {
  orders: Record<string, string>[];
  statusFilter: string;
}

export function OrderListPage({ orders, statusFilter }: OrderListProps) {
  const t = useT('orders');
  const columns: DataListColumn[] = [
    { key: 'orderNumber', label: t.columns.number, render: (v, row) => <span className="order-id">{v}</span> },
    { key: 'customerName', label: t.columns.customer, render: (v) => (
      <div className="order-customer"><div className="order-avatar">{getInitials(v)}</div>{v}</div>
    )},
    { key: 'totalAmount', label: t.columns.amount, align: 'right', render: (v) => formatPrice(Number(v)) },
    { key: 'status', label: t.columns.status, render: (v) => <Badge variant={getOrderStatusVariant(v) as any}>{getOrderStatusLabel(v)}</Badge> },
    { key: 'createdAt', label: t.columns.date, render: (v) => formatDate(v) },
  ];

  const actions: DataListAction[] = [
    { icon: 'eye', href: (row) => `/admin/orders/detail?id=${row.id}`, title: t.actions.detail },
    { icon: 'pencil', href: (row) => `/admin/orders/edit?id=${row.id}`, title: t.actions.edit },
  ];

  const filters: FilterDef[] = [
    { name: 'status', options: ORDER_STATUS_FILTER_OPTIONS, value: statusFilter, placeholder: t.statuses.filterAll },
  ];

  return (
    <AdminLayout title={t.headings.admin} activePage="orders">
      <AdminDataList columns={columns} rows={orders} actions={actions} filters={filters}
        addButton={{ label: t.actions.newOrder, href: '/admin/orders/create' }} emptyMessage={t.empty.orders} />
    </AdminLayout>
  );
}
