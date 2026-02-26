import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminDataList } from '../../components/data/AdminDataList';
import { Badge } from '../../components/ui/Badge';
import { Icon } from '../../components/ui/Icon';
import type { DataListColumn, DataListAction, FilterDef } from '../../types';
import { getCategoryStatusLabel, getCategoryStatusVariant, CATEGORY_STATUS_FILTER_OPTIONS } from '../../utils';

interface CategoryListProps {
  categories: Record<string, string>[];
  statusFilter: string;
}

export function CategoryListPage({ categories, statusFilter }: CategoryListProps) {
  const columns: DataListColumn[] = [
    { key: 'name', label: 'Kategorie', render: (v, row) => (
      <span className="d-flex align-items-center gap-2">
        <Icon name={row.icon || 'folder'} />
        <strong>{v}</strong>
      </span>
    )},
    { key: 'sortOrder', label: 'Pořadí', align: 'center' },
    { key: 'status', label: 'Stav', render: (v) => <Badge variant={getCategoryStatusVariant(v) as any}>{getCategoryStatusLabel(v)}</Badge> },
  ];

  const actions: DataListAction[] = [
    { icon: 'pencil', href: (row) => `/admin/categories/edit?id=${row.id}`, title: 'Upravit' },
    { icon: 'trash', href: (row) => `/admin/categories/delete?id=${row.id}`, title: 'Smazat', variant: 'danger', confirm: 'Opravdu smazat tuto kategorii?' },
  ];

  const filters: FilterDef[] = [
    { name: 'status', options: CATEGORY_STATUS_FILTER_OPTIONS, value: statusFilter, placeholder: 'Všechny stavy' },
  ];

  return (
    <AdminLayout title="Kategorie" activePage="categories">
      <AdminDataList columns={columns} rows={categories} actions={actions} filters={filters}
        addButton={{ label: 'Nová kategorie', href: '/admin/categories/create' }} emptyMessage="Žádné kategorie" />
    </AdminLayout>
  );
}
