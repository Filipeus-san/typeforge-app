import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminForm } from '../../components/data/AdminForm';
import type { FormSection } from '../../types';
import { useT } from '../../i18n';

interface ProductFormProps {
  categories: { value: string; label: string }[];
  values?: Record<string, string>;
  error?: string;
  isEdit?: boolean;
}

export function ProductFormPage({ categories, values, error, isEdit = false }: ProductFormProps) {
  const t = useT('catalog');
  const statusOptions = [
    { value: 'active', label: t.statuses.active },
    { value: 'inactive', label: t.statuses.inactive },
    { value: 'soldout', label: t.statuses.soldout },
  ];

  const sections: FormSection[] = [
    {
      title: t.form.sections.basicInfo,
      position: 'main',
      fields: [
        { name: 'name', label: t.form.labels.productName, required: true, colSpan: 8 },
        { name: 'slug', label: t.form.labels.slug, colSpan: 4, placeholder: t.form.placeholders.autoFromName },
        { name: 'short_description', label: t.form.labels.shortDescription, type: 'textarea', rows: 2 },
        { name: 'description', label: t.form.labels.description, type: 'textarea', rows: 5 },
      ],
    },
    {
      title: t.form.sections.priceStock,
      position: 'main',
      fields: [
        { name: 'price', label: t.form.labels.price, type: 'number', step: '0.01', min: '0', required: true, colSpan: 4 },
        { name: 'old_price', label: t.form.labels.oldPrice, type: 'number', step: '0.01', min: '0', colSpan: 4, placeholder: t.form.placeholders.discountHint },
        { name: 'stock', label: t.form.labels.stock, type: 'number', min: '0', colSpan: 4 },
      ],
    },
    {
      title: t.form.labels.category,
      position: 'sidebar',
      fields: [
        { name: 'category_id', label: t.form.labels.category, type: 'select', options: categories, placeholder: t.form.labels.noCategory },
      ],
    },
    {
      title: t.form.labels.status,
      position: 'sidebar',
      fields: [
        { name: 'status', label: t.form.labels.status, type: 'select', options: statusOptions },
      ],
    },
    {
      title: t.form.labels.icon,
      position: 'sidebar',
      fields: [
        { name: 'icon', label: t.form.labels.icon, placeholder: t.form.placeholders.iconExamples },
      ],
    },
  ];

  return (
    <AdminLayout title={isEdit ? t.headings.productEdit : t.headings.productCreate} activePage="products">
      <AdminForm
        sections={sections}
        values={values}
        error={error}
        submitLabel={isEdit ? t.actions.saveChanges : t.actions.createProduct}
        backUrl="/admin/products"
      />
    </AdminLayout>
  );
}
