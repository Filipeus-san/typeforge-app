import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { AdminForm } from '../../components/data/AdminForm';
import type { FormSection } from '../../types';

interface ProductFormProps {
  categories: { value: string; label: string }[];
  values?: Record<string, string>;
  error?: string;
  isEdit?: boolean;
}

export function ProductFormPage({ categories, values, error, isEdit = false }: ProductFormProps) {
  const statusOptions = [
    { value: 'active', label: 'Aktivní' },
    { value: 'inactive', label: 'Neaktivní' },
    { value: 'soldout', label: 'Vyprodáno' },
  ];

  const sections: FormSection[] = [
    {
      title: 'Základní informace',
      position: 'main',
      fields: [
        { name: 'name', label: 'Název produktu', required: true, colSpan: 8 },
        { name: 'slug', label: 'Slug', colSpan: 4 },
        { name: 'short_description', label: 'Krátký popis', type: 'textarea', rows: 2 },
        { name: 'description', label: 'Popis', type: 'textarea', rows: 5 },
      ],
    },
    {
      title: 'Cena a sklad',
      position: 'main',
      fields: [
        { name: 'price', label: 'Cena (Kč)', type: 'number', step: '0.01', min: '0', required: true, colSpan: 4 },
        { name: 'old_price', label: 'Původní cena', type: 'number', step: '0.01', min: '0', colSpan: 4 },
        { name: 'stock', label: 'Sklad (ks)', type: 'number', min: '0', colSpan: 4 },
      ],
    },
    {
      title: 'Kategorie',
      position: 'sidebar',
      fields: [
        { name: 'category_id', label: 'Kategorie', type: 'select', options: categories, placeholder: 'Bez kategorie' },
      ],
    },
    {
      title: 'Stav',
      position: 'sidebar',
      fields: [
        { name: 'status', label: 'Stav', type: 'select', options: statusOptions },
      ],
    },
    {
      title: 'Ikona',
      position: 'sidebar',
      fields: [
        { name: 'icon', label: 'Bootstrap ikona', placeholder: 'box' },
      ],
    },
  ];

  return (
    <AdminLayout title={isEdit ? 'Upravit produkt' : 'Nový produkt'} activePage="products">
      <AdminForm
        sections={sections}
        values={values}
        error={error}
        submitLabel={isEdit ? 'Uložit změny' : 'Vytvořit produkt'}
        backUrl="/admin/products"
      />
    </AdminLayout>
  );
}
