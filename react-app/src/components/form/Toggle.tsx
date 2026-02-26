import React from 'react';

interface ToggleProps {
  label: string;
  checked?: boolean;
  name?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function Toggle({ label, checked = false, name, onChange, className }: ToggleProps) {
  const classes = ['form-switch', className].filter(Boolean).join(' ');
  const toggleClasses = ['toggle-switch', checked ? 'active' : ''].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <div
        className={toggleClasses}
        data-name={name}
        onClick={() => onChange?.(!checked)}
      />
      <span>{label}</span>
    </div>
  );
}
