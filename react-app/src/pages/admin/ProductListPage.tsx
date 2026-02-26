import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminDataList } from '../../components/data/AdminDataList';
import { Badge } from '../../components/ui/Badge';
import type { DataListColumn, DataListAction, FilterDef } from '../../types';
import { formatPrice, getProductStatusLabel, getProductStatusVariant, PRODUCT_STATUS_FILTER_OPTIONS } from '../../utils';

interface ProductListProps {
  products: Record<string, string>[];
  categories: { value: string; label: string }[];
  statusFilter: string;
  categoryFilter: string;
}

export function ProductListPage({ products, categories, statusFilter, categoryFilter }: ProductListProps) {
  const columns: DataListColumn[] = [
    { key: 'name', label: 'Produkt', width: '30%', render: (v, row) => (
      <><strong>{v}</strong>{row.categoryName && <><br/><small className="text-muted-tf">{row.categoryName}</small></>}</>
    )},
    { key: 'price', label: 'Cena', align: 'right', render: (v) => formatPrice(Number(v)) },
    { key: 'stock', label: 'Sklad', align: 'center' },
    { key: 'status', label: 'Stav', render: (v) => <Badge variant={getProductStatusVariant(v) as any}>{getProductStatusLabel(v)}</Badge> },
  ];

  const actions: DataListAction[] = [
    { icon: 'pencil', href: (row) => `/admin/products/edit?id=${row.id}`, title: 'Upravit' },
    { icon: 'trash', href: (row) => `/admin/products/delete?id=${row.id}`, title: 'Smazat', variant: 'danger', confirm: 'Opravdu smazat tento produkt?' },
  ];

  const filters: FilterDef[] = [
    { name: 'status', options: PRODUCT_STATUS_FILTER_OPTIONS, value: statusFilter, placeholder: 'Všechny stavy' },
    { name: 'category', options: categories, value: categoryFilter, placeholder: 'Všechny kategorie' },
  ];

  return (
    <AdminLayout title="Produkty" activePage="products">
      <AdminDataList
        columns={columns}
        rows={products}
        actions={actions}
        filters={filters}
        addButton={{ label: 'Nový produkt', href: '/admin/products/create' }}
        emptyMessage="Žádné produkty"
      />
    </AdminLayout>
  );
}
