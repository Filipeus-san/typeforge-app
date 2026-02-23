import { BaseProps } from '../types';
import { cx, map, when } from '../helpers';
import { CardSection } from '../ui/Card';
import { Select } from '../ui/Form';
import { Icon } from '../ui/Icon';
import type { Filter } from './FilterBar';
import { ADMIN_DATA_LIST_T } from "./AdminDataList.translation";

// =============================================================================
// AdminDataList — Declarative admin data table builder
// =============================================================================

export interface DataListColumn {
    key: string;
    label: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    render?: (value: string, row: Record<string, string>) => string;
}

export interface DataListAction {
    icon: string;
    href: (row: Record<string, string>) => string;
    title?: string;
    variant?: 'default' | 'danger';
    confirm?: string;
}

export interface AdminDataListProps extends BaseProps {
    columns: DataListColumn[];
    rows: Record<string, string>[];
    actions?: DataListAction[];
    filters?: Filter[];
    addButton?: { label: string; href: string };
    emptyMessage?: string;
}

export function AdminDataList(props: AdminDataListProps): string {
    const {
        columns,
        rows,
        actions,
        filters,
        addButton,
        emptyMessage = ADMIN_DATA_LIST_T.defaults.emptyMessage,
        class: className,
        id,
    } = props;

    // Toolbar
    const hasFilters = filters !== undefined && filters.length > 0;
    const hasAddButton = addButton !== undefined;
    const hasToolbar = hasFilters || hasAddButton;

    const toolbarHtml = hasToolbar ? `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="filter-bar mb-0">
                ${hasFilters ? map(filters!, (filter) => {
                    const opts = filter.options.map(opt => ({
                        value: opt.value,
                        label: opt.label,
                        selected: opt.value === (filter.value ?? ''),
                    }));
                    if (filter.placeholder) {
                        opts.unshift({
                            value: '',
                            label: filter.placeholder,
                            selected: !filter.value || filter.value === '',
                        });
                    }
                    return Select({ filter: true, options: opts, name: filter.name });
                }) : ''}
            </div>
            ${hasAddButton ? `
                <a href="${addButton!.href}" class="btn-add">
                    ${Icon({ name: 'plus-lg' })} ${addButton!.label}
                </a>
            ` : ''}
        </div>
    ` : '';

    // Table header
    const hasActions = actions !== undefined && actions.length > 0;
    const headerCells = map(columns, (col) => {
        const styles: string[] = [];
        if (col.width) styles.push(`width:${col.width}`);
        if (col.align) styles.push(`text-align:${col.align}`);
        const styleAttr = styles.length > 0 ? ` style="${styles.join(';')}"` : '';
        return `<th${styleAttr}>${col.label}</th>`;
    });
    const actionsHeader = hasActions ? `<th>${ADMIN_DATA_LIST_T.defaults.actionsHeader}</th>` : '';

    // Table body
    const totalCols = columns.length + (hasActions ? 1 : 0);

    const bodyHtml = rows.length === 0
        ? `<tr><td colspan="${totalCols}" class="text-center text-muted-tf py-4">${emptyMessage}</td></tr>`
        : map(rows, (row) => {
            const cells = map(columns, (col) => {
                const rawValue = row[col.key] ?? '';
                const cellContent = col.render
                    ? col.render(rawValue, row)
                    : rawValue;
                const align = col.align ? ` style="text-align:${col.align}"` : '';
                return `<td${align}>${cellContent}</td>`;
            });

            const actionCells = hasActions ? `<td>${map(actions!, (action) => {
                const href = action.href(row);
                const classes = cx('btn-action', action.variant === 'danger' && 'danger');
                const confirmAttr = action.confirm
                    ? ` x-data @click.prevent="if(confirm('${action.confirm}')) window.location.href=$el.href"`
                    : '';
                const title = action.title ? ` title="${action.title}"` : '';
                return `<a href="${href}" class="${classes}"${title}${confirmAttr}>${Icon({ name: action.icon })}</a>`;
            })}</td>` : '';

            return `<tr>${cells}${actionCells}</tr>`;
        });

    const tableHtml = CardSection({
        class: className,
        id,
        children: `
            <table class="data-table">
                <thead><tr>${headerCells}${actionsHeader}</tr></thead>
                <tbody>${bodyHtml}</tbody>
            </table>
        `,
    });

    return `${toolbarHtml}${tableHtml}`;
}
