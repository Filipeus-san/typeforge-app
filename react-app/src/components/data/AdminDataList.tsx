import React, { useState } from 'react';
import type { DataListColumn, DataListAction, FilterDef } from '../../types';
import { CardSection } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { Select } from '../form/Select';
import { ConfirmDialog } from './ConfirmDialog';

interface AdminDataListProps {
  columns: DataListColumn[];
  rows: Record<string, string>[];
  actions?: DataListAction[];
  filters?: FilterDef[];
  addButton?: { label: string; href: string };
  emptyMessage?: string;
  className?: string;
}

export function AdminDataList({
  columns,
  rows,
  actions,
  filters,
  addButton,
  emptyMessage = 'Žádné záznamy',
  className,
}: AdminDataListProps) {
  const [confirmState, setConfirmState] = useState<{ url: string; message: string } | null>(null);

  const hasFilters = filters && filters.length > 0;
  const hasActions = actions && actions.length > 0;
  const hasToolbar = hasFilters || !!addButton;
  const totalCols = columns.length + (hasActions ? 1 : 0);

  const handleFilterChange = (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(window.location.search);
    const val = e.target.value;
    if (val) params.set(name, val);
    else params.delete(name);
    window.location.search = params.toString();
  };

  const handleActionClick = (action: DataListAction, row: Record<string, string>) => (e: React.MouseEvent) => {
    if (action.confirm) {
      e.preventDefault();
      setConfirmState({ url: action.href(row), message: action.confirm });
    }
  };

  return (
    <>
      {hasToolbar && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="filter-bar mb-0">
            {hasFilters && filters!.map((f) => {
              const opts = f.placeholder
                ? [{ value: '', label: f.placeholder }, ...f.options]
                : f.options;
              return <Select key={f.name} filter options={opts} name={f.name} value={f.value} onChange={handleFilterChange(f.name)} />;
            })}
          </div>
          {addButton && (
            <a href={addButton.href} className="btn-add">
              <Icon name="plus-lg" /> {addButton.label}
            </a>
          )}
        </div>
      )}

      <CardSection className={className}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={{ width: col.width, textAlign: col.align }}>{col.label}</th>
              ))}
              {hasActions && <th>Akce</th>}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={totalCols} className="text-center text-muted-tf py-4">{emptyMessage}</td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={row.id || idx}>
                  {columns.map((col) => {
                    const raw = row[col.key] ?? '';
                    const content = col.render ? col.render(raw, row) : raw;
                    return <td key={col.key} style={{ textAlign: col.align }}>{content}</td>;
                  })}
                  {hasActions && (
                    <td>
                      {actions!.map((action, ai) => {
                        const href = action.href(row);
                        const classes = ['btn-action', action.variant === 'danger' ? 'danger' : ''].filter(Boolean).join(' ');
                        return (
                          <a
                            key={ai}
                            href={href}
                            className={classes}
                            title={action.title}
                            onClick={action.confirm ? handleActionClick(action, row) : undefined}
                          >
                            <Icon name={action.icon} />
                          </a>
                        );
                      })}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardSection>

      <ConfirmDialog
        open={!!confirmState}
        message={confirmState?.message || ''}
        onConfirm={() => { if (confirmState) window.location.href = confirmState.url; }}
        onCancel={() => setConfirmState(null)}
      />
    </>
  );
}
