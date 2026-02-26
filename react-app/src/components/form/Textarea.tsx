import React from 'react';
import { FormGroup } from './FormGroup';

interface TextareaProps {
  name?: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Textarea({
  name,
  value = '',
  placeholder,
  rows = 3,
  disabled,
  required,
  label,
  className,
  onChange,
}: TextareaProps) {
  const classes = ['form-control', className].filter(Boolean).join(' ');
  const textarea = (
    <textarea
      name={name}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      required={required}
      className={classes}
      onChange={onChange}
      defaultValue={value}
    />
  );

  if (label) {
    return <FormGroup label={label} required={required}>{textarea}</FormGroup>;
  }
  return textarea;
}
