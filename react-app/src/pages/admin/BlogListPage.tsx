import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminDataList } from '../../components/data/AdminDataList';
import { Badge } from '../../components/ui/Badge';
import type { DataListColumn, DataListAction, FilterDef } from '../../types';
import { formatDate, getBlogStatusLabel, getBlogStatusVariant, BLOG_STATUS_FILTER_OPTIONS } from '../../utils';

interface BlogListProps {
  posts: { id: string; title: string; slug: string; status: string; author: string; category: string; createdAt: string }[];
  statusFilter: string;
}

export function BlogListPage({ posts, statusFilter }: BlogListProps) {
  const rows = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    author: p.author,
    category: p.category,
    status: p.status,
    createdAt: p.createdAt,
  }));

  const columns: DataListColumn[] = [
    {
      key: 'title',
      label: 'Nazev',
      width: '35%',
      render: (v, row) => (
        <>
          <strong>{v}</strong>
          <br />
          <small className="text-muted-tf">{row.slug}</small>
        </>
      ),
    },
    { key: 'author', label: 'Autor' },
    { key: 'category', label: 'Kategorie' },
    {
      key: 'status',
      label: 'Stav',
      render: (v) => (
        <Badge variant={getBlogStatusVariant(v) as any}>{getBlogStatusLabel(v)}</Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Datum',
      render: (v) => formatDate(v),
    },
  ];

  const actions: DataListAction[] = [
    { icon: 'pencil', href: (row) => `/admin/blog/edit?id=${row.id}`, title: 'Upravit' },
    { icon: 'eye', href: (row) => `/article?slug=${row.slug}`, title: 'Zobrazit' },
    { icon: 'trash', href: (row) => `/admin/blog/delete?id=${row.id}`, title: 'Smazat', variant: 'danger', confirm: 'Opravdu smazat tento clanek?' },
  ];

  const filters: FilterDef[] = [
    { name: 'status', options: BLOG_STATUS_FILTER_OPTIONS, value: statusFilter, placeholder: 'Vsechny stavy' },
  ];

  return (
    <AdminLayout title="Blog" activePage="blog">
      <AdminDataList
        columns={columns}
        rows={rows}
        actions={actions}
        filters={filters}
        addButton={{ label: 'Novy clanek', href: '/admin/blog/create' }}
        emptyMessage="Zadne clanky"
      />
    </AdminLayout>
  );
}
