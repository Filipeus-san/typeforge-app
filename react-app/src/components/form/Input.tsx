import React from 'react';
import Form from 'react-bootstrap/Form';
import { FormGroup } from './FormGroup';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  label?: string;
  step?: string;
  min?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type = 'text',
  name,
  value,
  placeholder,
  disabled,
  readOnly,
  required,
  label,
  step,
  min,
  className,
  onChange,
}: InputProps) {
  const input = (
    <Form.Control
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      step={step}
      min={min}
      className={className}
      onChange={onChange as any}
    />
  );

  if (label) {
    return <FormGroup label={label} required={required}>{input}</FormGroup>;
  }
  return input;
}
