import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminDataList } from '../../components/data/AdminDataList';
import { Badge } from '../../components/ui/Badge';
import type { DataListColumn, DataListAction, FilterDef } from '../../types';
import { formatDate, getBlogStatusLabel, getBlogStatusVariant, BLOG_STATUS_FILTER_OPTIONS } from '../../utils';
import { useT } from '../../i18n';

interface BlogListProps {
  posts: { id: string; title: string; slug: string; status: string; author: string; category: string; createdAt: string }[];
  statusFilter: string;
}

export function BlogListPage({ posts, statusFilter }: BlogListProps) {
  const t = useT('blog');

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
      label: t.columns.name,
      width: '35%',
      render: (v, row) => (
        <>
          <strong>{v}</strong>
          <br />
          <small className="text-muted-tf">{row.slug}</small>
        </>
      ),
    },
    { key: 'author', label: t.columns.author },
    { key: 'category', label: t.columns.category },
    {
      key: 'status',
      label: t.columns.status,
      render: (v) => (
        <Badge variant={getBlogStatusVariant(v) as any}>{getBlogStatusLabel(v)}</Badge>
      ),
    },
    {
      key: 'createdAt',
      label: t.columns.date,
      render: (v) => formatDate(v),
    },
  ];

  const actions: DataListAction[] = [
    { icon: 'pencil', href: (row) => `/admin/blog/edit?id=${row.id}`, title: t.actions.edit },
    { icon: 'eye', href: (row) => `/article?slug=${row.slug}`, title: t.actions.view },
    { icon: 'trash', href: (row) => `/admin/blog/delete?id=${row.id}`, title: t.actions.delete, variant: 'danger', confirm: t.confirm.deleteArticle },
  ];

  const filters: FilterDef[] = [
    { name: 'status', options: BLOG_STATUS_FILTER_OPTIONS, value: statusFilter, placeholder: t.filters.allStatuses },
  ];

  return (
    <AdminLayout title={t.headings.admin} activePage="blog">
      <AdminDataList
        columns={columns}
        rows={rows}
        actions={actions}
        filters={filters}
        addButton={{ label: t.actions.newArticle, href: '/admin/blog/create' }}
        emptyMessage={t.empty.articles}
      />
    </AdminLayout>
  );
}
