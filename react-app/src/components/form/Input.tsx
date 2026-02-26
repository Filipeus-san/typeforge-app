import React from 'react';
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
  const classes = ['form-control', className].filter(Boolean).join(' ');
  const input = (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      step={step}
      min={min}
      className={classes}
      onChange={onChange}
    />
  );

  if (label) {
    return <FormGroup label={label} required={required}>{input}</FormGroup>;
  }
  return input;
}
