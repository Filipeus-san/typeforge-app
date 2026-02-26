import React from 'react';
import { Icon } from '../ui/Icon';

interface PaginationProps {
  current: number;
  total: number;
  baseUrl?: string;
  onPage?: (page: number) => void;
  className?: string;
}

export function Pagination({ current, total, baseUrl, onPage, className }: PaginationProps) {
  if (total <= 1) return null;

  const classes = ['pagination', className].filter(Boolean).join(' ');
  const maxVisible = 5;

  const visiblePages: (number | 'ellipsis')[] = [];
  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) visiblePages.push(i);
  } else {
    visiblePages.push(1);
    if (current > 3) visiblePages.push('ellipsis');
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) visiblePages.push(i);
    if (current < total - 2) visiblePages.push('ellipsis');
    visiblePages.push(total);
  }

  const goTo = (page: number) => {
    if (onPage) onPage(page);
    else if (baseUrl) window.location.href = `${baseUrl}?page=${page}`;
  };

  return (
    <div className={classes}>
      <button className="page-btn" disabled={current === 1} onClick={() => goTo(current - 1)}>
        <Icon name="chevron-left" />
      </button>
      {visiblePages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e${i}`} className="page-ellipsis">...</span>
        ) : (
          <button key={p} className={`page-btn${p === current ? ' active' : ''}`} onClick={() => goTo(p)}>
            {p}
          </button>
        )
      )}
      <button className="page-btn" disabled={current === total} onClick={() => goTo(current + 1)}>
        <Icon name="chevron-right" />
      </button>
    </div>
  );
}
