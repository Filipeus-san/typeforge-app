import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminDataList } from '../../components/data/AdminDataList';
import { Badge } from '../../components/ui/Badge';
import type { DataListColumn, DataListAction, FilterDef } from '../../types';
import { formatDate, getInitials } from '../../utils';
import { useT } from '../../i18n';

interface CustomerListProps {
  customers: { id: string; firstName: string; lastName: string; email: string; phone?: string; company?: string; status: string; createdAt: string }[];
  statusFilter: string;
}

const CUSTOMER_STATUS_FILTER_OPTIONS = [
  { value: 'active', label: 'Aktivni' },
  { value: 'inactive', label: 'Neaktivni' },
];

function getCustomerStatusLabel(status: string): string {
  return status === 'active' ? 'Aktivni' : 'Neaktivni';
}

function getCustomerStatusVariant(status: string): 'success' | 'warning' | 'default' {
  return status === 'active' ? 'success' : 'warning';
}

export function CustomerListPage({ customers, statusFilter }: CustomerListProps) {
  const t = useT('common');

  const rows = customers.map((c) => ({
    id: c.id,
    fullName: `${c.firstName} ${c.lastName}`,
    firstName: c.firstName,
    lastName: c.lastName,
    email: c.email,
    phone: c.phone ?? '',
    company: c.company ?? '',
    status: c.status,
    createdAt: c.createdAt,
  }));

  const columns: DataListColumn[] = [
    {
      key: 'fullName',
      label: t.customers.columns.name,
      width: '25%',
      render: (v, row) => (
        <div className="d-flex align-items-center gap-2">
          <div className="avatar" style={{ width: 36, height: 36, fontSize: '0.85rem', flexShrink: 0 }}>
            {getInitials(v)}
          </div>
          <div>
            <strong>{v}</strong>
          </div>
        </div>
      ),
    },
    { key: 'email', label: t.customers.columns.email },
    { key: 'phone', label: 'Telefon', render: (v) => v || '-' },
    { key: 'company', label: 'Spolecnost', render: (v) => v || '-' },
    {
      key: 'status',
      label: 'Stav',
      render: (v) => (
        <Badge variant={getCustomerStatusVariant(v) as any}>{getCustomerStatusLabel(v)}</Badge>
      ),
    },
    {
      key: 'createdAt',
      label: t.customers.columns.registered,
      render: (v) => formatDate(v),
    },
  ];

  const actions: DataListAction[] = [
    { icon: 'eye', href: (row) => `/admin/customers/detail?id=${row.id}`, title: 'Detail' },
  ];

  const filters: FilterDef[] = [
    { name: 'status', options: CUSTOMER_STATUS_FILTER_OPTIONS, value: statusFilter, placeholder: 'Vsechny stavy' },
  ];

  return (
    <AdminLayout title={t.customers.heading} activePage="customers">
      <AdminDataList
        columns={columns}
        rows={rows}
        actions={actions}
        filters={filters}
        emptyMessage={t.customers.empty}
      />
    </AdminLayout>
  );
}
