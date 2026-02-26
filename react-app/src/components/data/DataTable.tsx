import React from 'react';
import { ButtonAction } from '../ui/Button';

interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface TableAction {
  icon: string;
  onclick?: () => void;
  href?: string;
  variant?: 'default' | 'danger';
  title?: string;
}

interface DataTableProps {
  columns: TableColumn[];
  rows: Record<string, string>[];
  actions?: (row: Record<string, string>, index: number) => TableAction[];
  emptyMessage?: string;
  className?: string;
}

export function DataTable({
  columns,
  rows,
  actions,
  emptyMessage = 'Žádná data k zobrazení',
  className,
}: DataTableProps) {
  const classes = ['data-table', className].filter(Boolean).join(' ');
  const totalCols = columns.length + (actions ? 1 : 0);

  return (
    <table className={classes}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={{ width: col.width, textAlign: col.align }}>{col.label}</th>
          ))}
          {actions && <th>Akce</th>}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={totalCols} className="text-center text-muted-tf py-4">{emptyMessage}</td>
          </tr>
        ) : (
          rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key} style={{ textAlign: col.align }}>{row[col.key] || ''}</td>
              ))}
              {actions && (
                <td>
                  {actions(row, idx).map((a, i) => (
                    <ButtonAction key={i} icon={a.icon} href={a.href} variant={a.variant} title={a.title} onClick={a.onclick ? () => a.onclick!() : undefined} />
                  ))}
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
