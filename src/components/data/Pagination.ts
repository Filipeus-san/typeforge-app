import { BaseProps } from '../types';
import { cx, attrs, map, when } from '../helpers';
import { Icon } from '../ui/Icon';

export interface PaginationProps extends BaseProps {
    current: number;
    total: number;
    baseUrl?: string;
    onPage?: string; // JavaScript function name to call
}

export function Pagination(props: PaginationProps): string {
    const {
        current,
        total,
        baseUrl,
        onPage,
        class: className,
        id
    } = props;

    if (total <= 1) return '';

    const classes = cx('pagination', className);
    const attributes = attrs({ id, class: classes });

    const getPageAttr = (page: number) => {
        if (baseUrl) return `href="${baseUrl}?page=${page}"`;
        if (onPage) return `@click="${onPage}(${page})"`;
        return '';
    };

    // Calculate visible pages
    const visiblePages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (total <= maxVisible) {
        for (let i = 1; i <= total; i++) {
            visiblePages.push(i);
        }
    } else {
        visiblePages.push(1);

        if (current > 3) {
            visiblePages.push('ellipsis');
        }

        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);

        for (let i = start; i <= end; i++) {
            visiblePages.push(i);
        }

        if (current < total - 2) {
            visiblePages.push('ellipsis');
        }

        visiblePages.push(total);
    }

    const prevDisabled = current === 1;
    const nextDisabled = current === total;

    const prevButton = `
        <button class="page-btn" ${prevDisabled ? 'disabled' : getPageAttr(current - 1)}>
            ${Icon({ name: 'chevron-left' })}
        </button>
    `;

    const nextButton = `
        <button class="page-btn" ${nextDisabled ? 'disabled' : getPageAttr(current + 1)}>
            ${Icon({ name: 'chevron-right' })}
        </button>
    `;

    const pageButtons = map(visiblePages, (page) => {
        if (page === 'ellipsis') {
            return '<span class="page-ellipsis">...</span>';
        }
        const active = page === current ? ' active' : '';
        return `<button class="page-btn${active}" ${getPageAttr(page)}>${page}</button>`;
    });

    return `<div ${attributes}>${prevButton}${pageButtons}${nextButton}</div>`;
}

// Simple pagination with just numbers
export interface SimplePaginationProps extends BaseProps {
    pages: number[];
    current?: number;
}

export function SimplePagination(props: SimplePaginationProps): string {
    const { pages, current = 1, class: className, id } = props;

    const classes = cx('pagination', className);
    const attributes = attrs({ id, class: classes });

    const buttons = `
        <button class="page-btn">${Icon({ name: 'chevron-left' })}</button>
        ${map(pages, (page) => `<button class="page-btn${page === current ? ' active' : ''}">${page}</button>`)}
        <button class="page-btn">${Icon({ name: 'chevron-right' })}</button>
    `;

    return `<div ${attributes}>${buttons}</div>`;
}
