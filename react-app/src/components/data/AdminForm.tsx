import React, { useState } from 'react';
import type { FormSection, FormField } from '../../types';
import { CardSection } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { FormGroup } from '../form/FormGroup';
import { Textarea } from '../form/Textarea';
import { Select } from '../form/Select';

interface AdminFormProps {
  sections: FormSection[];
  values?: Record<string, string>;
  error?: string;
  submitLabel?: string;
  submitIcon?: string;
  backUrl?: string;
  backLabel?: string;
  action?: string;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function AdminForm({
  sections,
  values: initialValues = {},
  error,
  submitLabel = 'Uložit',
  submitIcon = 'check-lg',
  backUrl,
  backLabel = 'Zpět',
  action,
}: AdminFormProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>(initialValues);

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const mainSections = sections.filter((s) => (s.position ?? 'main') === 'main');
  const sidebarSections = sections.filter((s) => s.position === 'sidebar');

  function renderField(field: FormField) {
    const val = formValues[field.name] ?? '';
    const fieldType = field.type ?? 'text';

    if (fieldType === 'hidden') {
      return <input key={field.name} type="hidden" name={field.name} value={val} />;
    }

    if (fieldType === 'textarea') {
      return (
        <FormGroup key={field.name} label={field.label} required={field.required} hint={field.hint}>
          <textarea
            name={field.name}
            className="form-control"
            rows={field.rows ?? 3}
            placeholder={field.placeholder}
            required={field.required}
            value={val}
            onChange={handleChange(field.name)}
          />
        </FormGroup>
      );
    }

    if (fieldType === 'select') {
      const opts = (field.options ?? []).map((o) => ({ value: o.value, label: o.label }));
      return (
        <FormGroup key={field.name} label={field.label} required={field.required} hint={field.hint}>
          <Select
            name={field.name}
            options={opts}
            value={val}
            placeholder={field.placeholder}
            required={field.required}
            onChange={handleChange(field.name)}
          />
        </FormGroup>
      );
    }

    return (
      <FormGroup key={field.name} label={field.label} required={field.required} hint={field.hint}>
        <input
          type={fieldType}
          name={field.name}
          className="form-control"
          value={val}
          placeholder={field.placeholder}
          required={field.required}
          step={field.step}
          min={field.min}
          onChange={handleChange(field.name)}
        />
      </FormGroup>
    );
  }

  function renderSectionFields(fields: FormField[]) {
    const hasGrid = fields.some((f) => (f.colSpan ?? 12) < 12);
    if (hasGrid) {
      return (
        <div className="row g-3">
          {fields.map((f) => {
            const col = f.colSpan ?? 12;
            if ((f.type ?? 'text') === 'hidden') return renderField(f);
            return <div key={f.name} className={`col-md-${col}`}>{renderField(f)}</div>;
          })}
        </div>
      );
    }
    return <>{fields.map((f) => {
      if ((f.type ?? 'text') === 'hidden') return renderField(f);
      return <div key={f.name} className="mb-3">{renderField(f)}</div>;
    })}</>;
  }

  function renderSections(sects: FormSection[]) {
    return sects.map((section, i) => (
      <CardSection key={i} title={section.title}>
        {renderSectionFields(section.fields)}
      </CardSection>
    ));
  }

  return (
    <>
      {error && <div className="alert alert-danger mb-4">{error}</div>}
      <form method="post" action={action} className="admin-form">
        <div className="row g-4">
          <div className="col-md-8">{renderSections(mainSections)}</div>
          <div className="col-md-4">
            {renderSections(sidebarSections)}
            <CardSection>
              <div className="d-grid gap-2">
                <button type="submit" className="btn-add w-100 justify-content-center">
                  <Icon name={submitIcon} /> {submitLabel}
                </button>
                {backUrl && (
                  <a href={backUrl} className="btn btn-outline-tf btn-sm text-center">{backLabel}</a>
                )}
              </div>
            </CardSection>
          </div>
        </div>
      </form>
    </>
  );
}
