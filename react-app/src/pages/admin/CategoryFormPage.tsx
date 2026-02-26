import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminForm } from '../../components/data/AdminForm';
import type { FormSection } from '../../types';
import { useT } from '../../i18n';

interface CategoryFormProps {
  values?: Record<string, string>;
  error?: string;
  isEdit?: boolean;
}

export function CategoryFormPage({ values, error, isEdit = false }: CategoryFormProps) {
  const t = useT('catalog');
  const sections: FormSection[] = [
    {
      title: t.form.sections.categoryInfo,
      position: 'main',
      fields: [
        { name: 'name', label: t.form.labels.categoryName, required: true, colSpan: 8 },
        { name: 'slug', label: t.form.labels.slug, colSpan: 4, placeholder: t.form.placeholders.autoFromName },
        { name: 'description', label: t.form.labels.description, type: 'textarea', rows: 3 },
      ],
    },
    {
      title: t.form.sections.settings,
      position: 'sidebar',
      fields: [
        { name: 'status', label: t.form.labels.status, type: 'select', options: [{ value: 'active', label: t.statuses.active }, { value: 'hidden', label: t.statuses.hidden }] },
        { name: 'sort_order', label: t.form.labels.sortOrder, type: 'number', min: '0' },
        { name: 'icon', label: t.form.labels.icon, placeholder: t.form.placeholders.categoryIconExamples },
      ],
    },
  ];

  return (
    <AdminLayout title={isEdit ? t.headings.categoryEdit : t.headings.categoryCreate} activePage="categories">
      <AdminForm sections={sections} values={values} error={error}
        submitLabel={isEdit ? t.actions.saveChanges : t.actions.createCategory} backUrl="/admin/categories" />
    </AdminLayout>
  );
}
