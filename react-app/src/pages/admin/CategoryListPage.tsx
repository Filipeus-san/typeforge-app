import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminDataList } from '../../components/data/AdminDataList';
import { Badge } from '../../components/ui/Badge';
import { Icon } from '../../components/ui/Icon';
import type { DataListColumn, DataListAction, FilterDef } from '../../types';
import { getCategoryStatusLabel, getCategoryStatusVariant, CATEGORY_STATUS_FILTER_OPTIONS } from '../../utils';
import { useT } from '../../i18n';

interface CategoryListProps {
  categories: Record<string, string>[];
  statusFilter: string;
}

export function CategoryListPage({ categories, statusFilter }: CategoryListProps) {
  const t = useT('catalog');
  const columns: DataListColumn[] = [
    { key: 'name', label: t.columns.category, render: (v, row) => (
      <span className="d-flex align-items-center gap-2">
        <Icon name={row.icon || 'folder'} />
        <strong>{v}</strong>
      </span>
    )},
    { key: 'sortOrder', label: t.form.labels.sortOrder, align: 'center' },
    { key: 'status', label: t.columns.status, render: (v) => <Badge variant={getCategoryStatusVariant(v) as any}>{getCategoryStatusLabel(v)}</Badge> },
  ];

  const actions: DataListAction[] = [
    { icon: 'pencil', href: (row) => `/admin/categories/edit?id=${row.id}`, title: t.actions.edit },
    { icon: 'trash', href: (row) => `/admin/categories/delete?id=${row.id}`, title: t.actions.delete, variant: 'danger', confirm: t.confirm.deleteCategory },
  ];

  const filters: FilterDef[] = [
    { name: 'status', options: CATEGORY_STATUS_FILTER_OPTIONS, value: statusFilter, placeholder: t.filters.allStatuses },
  ];

  return (
    <AdminLayout title={t.headings.categories} activePage="categories">
      <AdminDataList columns={columns} rows={categories} actions={actions} filters={filters}
        addButton={{ label: t.actions.addCategory, href: '/admin/categories/create' }} emptyMessage={t.empty.categories} />
    </AdminLayout>
  );
}
