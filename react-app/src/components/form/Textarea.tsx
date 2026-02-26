import React from 'react';
import Form from 'react-bootstrap/Form';
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
  const textarea = (
    <Form.Control
      as="textarea"
      name={name}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      required={required}
      className={className}
      onChange={onChange as any}
      defaultValue={value}
    />
  );

  if (label) {
    return <FormGroup label={label} required={required}>{textarea}</FormGroup>;
  }
  return textarea;
}
