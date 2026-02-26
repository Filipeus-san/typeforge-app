import React from 'react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  name?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({
  placeholder = 'Hledat...',
  value,
  name,
  className,
  onChange,
}: SearchInputProps) {
  const classes = ['admin-search', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <i className="bi bi-search" />
      <input type="text" placeholder={placeholder} defaultValue={value} name={name} onChange={onChange} />
    </div>
  );
}
