import React from 'react';
import Form from 'react-bootstrap/Form';

interface FormGroupProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
}

export function FormGroup({ children, label, required, error, hint, className }: FormGroupProps) {
  const classes = ['form-group', error ? 'has-error' : '', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      {label && (
        <Form.Label>
          {label}{required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
      )}
      {children}
      {error && <div className="form-error text-danger small mt-1">{error}</div>}
      {!error && hint && <div className="form-hint text-muted-tf small mt-1">{hint}</div>}
    </div>
  );
}
