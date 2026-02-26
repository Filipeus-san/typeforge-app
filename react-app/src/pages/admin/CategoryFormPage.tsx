import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminForm } from '../../components/data/AdminForm';
import type { FormSection } from '../../types';

interface CategoryFormProps {
  values?: Record<string, string>;
  error?: string;
  isEdit?: boolean;
}

export function CategoryFormPage({ values, error, isEdit = false }: CategoryFormProps) {
  const sections: FormSection[] = [
    {
      title: 'Základní informace',
      position: 'main',
      fields: [
        { name: 'name', label: 'Název', required: true, colSpan: 8 },
        { name: 'slug', label: 'Slug', colSpan: 4 },
        { name: 'description', label: 'Popis', type: 'textarea', rows: 3 },
      ],
    },
    {
      title: 'Nastavení',
      position: 'sidebar',
      fields: [
        { name: 'status', label: 'Stav', type: 'select', options: [{ value: 'active', label: 'Aktivní' }, { value: 'inactive', label: 'Neaktivní' }] },
        { name: 'sort_order', label: 'Pořadí', type: 'number', min: '0' },
        { name: 'icon', label: 'Ikona', placeholder: 'folder' },
      ],
    },
  ];

  return (
    <AdminLayout title={isEdit ? 'Upravit kategorii' : 'Nová kategorie'} activePage="categories">
      <AdminForm sections={sections} values={values} error={error}
        submitLabel={isEdit ? 'Uložit změny' : 'Vytvořit kategorii'} backUrl="/admin/categories" />
    </AdminLayout>
  );
}
