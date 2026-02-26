import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminDataList } from '../../components/data/AdminDataList';
import { Badge } from '../../components/ui/Badge';
import type { DataListColumn, DataListAction, FilterDef } from '../../types';
import { formatPrice, getProductStatusLabel, getProductStatusVariant, PRODUCT_STATUS_FILTER_OPTIONS } from '../../utils';
import { useT } from '../../i18n';

interface ProductListProps {
  products: Record<string, string>[];
  categories: { value: string; label: string }[];
  statusFilter: string;
  categoryFilter: string;
}

export function ProductListPage({ products, categories, statusFilter, categoryFilter }: ProductListProps) {
  const t = useT('catalog');
  const columns: DataListColumn[] = [
    { key: 'name', label: t.columns.product, width: '30%', render: (v, row) => (
      <><strong>{v}</strong>{row.categoryName && <><br/><small className="text-muted-tf">{row.categoryName}</small></>}</>
    )},
    { key: 'price', label: t.columns.price, align: 'right', render: (v) => formatPrice(Number(v)) },
    { key: 'stock', label: t.columns.stock, align: 'center' },
    { key: 'status', label: t.columns.status, render: (v) => <Badge variant={getProductStatusVariant(v) as any}>{getProductStatusLabel(v)}</Badge> },
  ];

  const actions: DataListAction[] = [
    { icon: 'pencil', href: (row) => `/admin/products/edit?id=${row.id}`, title: t.actions.edit },
    { icon: 'trash', href: (row) => `/admin/products/delete?id=${row.id}`, title: t.actions.delete, variant: 'danger', confirm: t.confirm.deleteProduct },
  ];

  const filters: FilterDef[] = [
    { name: 'status', options: PRODUCT_STATUS_FILTER_OPTIONS, value: statusFilter, placeholder: t.filters.allStatuses },
    { name: 'category', options: categories, value: categoryFilter, placeholder: t.filters.allCategories },
  ];

  return (
    <AdminLayout title={t.headings.products} activePage="products">
      <AdminDataList
        columns={columns}
        rows={products}
        actions={actions}
        filters={filters}
        addButton={{ label: t.actions.addProduct, href: '/admin/products/create' }}
        emptyMessage={t.empty.products}
      />
    </AdminLayout>
  );
}
