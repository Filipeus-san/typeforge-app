import React from 'react';
import { Select } from '../form/Select';
import type { FilterDef } from '../../types';

interface FilterBarProps {
  filters: FilterDef[];
  onChange?: (name: string, value: string) => void;
  className?: string;
}

export function FilterBar({ filters, onChange, className }: FilterBarProps) {
  const classes = ['filter-bar', className].filter(Boolean).join(' ');

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (onChange) {
      onChange(name, value);
    } else {
      const params = new URLSearchParams(window.location.search);
      if (value) params.set(name, value);
      else params.delete(name);
      window.location.search = params.toString();
    }
  };

  return (
    <div className={classes}>
      {filters.map((f) => {
        const opts = f.placeholder
          ? [{ value: '', label: f.placeholder }, ...f.options]
          : f.options;
        return (
          <Select key={f.name} filter options={opts} name={f.name} value={f.value} onChange={handleChange(f.name)} />
        );
      })}
    </div>
  );
}
