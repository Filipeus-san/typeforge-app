import React from 'react';
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
  const classes = [filter ? 'filter-select' : 'form-control', className].filter(Boolean).join(' ');
  const select = (
    <select name={name} disabled={disabled} required={required} className={classes} onChange={onChange} defaultValue={value ?? ''}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );

  if (label && !filter) {
    return <FormGroup label={label} required={required}>{select}</FormGroup>;
  }
  return select;
}
