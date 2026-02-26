import React from 'react';
import Form from 'react-bootstrap/Form';
import { FormGroup } from './FormGroup';
import type { SelectOption } from '../../types';

interface SelectProps {
  options: SelectOption[];
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  filter?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({
  options,
  name,
  value,
  placeholder,
  disabled,
  required,
  label,
  filter = false,
  className,
  onChange,
}: SelectProps) {
  if (filter) {
    const classes = ['filter-select', className].filter(Boolean).join(' ');
    return (
      <select name={name} disabled={disabled} required={required} className={classes} onChange={onChange} defaultValue={value ?? ''}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  }

  const select = (
    <Form.Select name={name} disabled={disabled} required={required} className={className} onChange={onChange as any} defaultValue={value ?? ''}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </Form.Select>
  );

  if (label) {
    return <FormGroup label={label} required={required}>{select}</FormGroup>;
  }
  return select;
}
