import { BaseProps, TableColumn, TableAction } from '../types';
import { cx, attrs, map, when } from '../helpers';
import { ButtonAction } from '../ui/Button';

export interface DataTableProps extends BaseProps {
    columns: TableColumn[];
    rows: Record<string, string>[];
    actions?: (row: Record<string, string>, index: number) => TableAction[];
    emptyMessage?: string;
}

export function DataTable(props: DataTableProps): string {
    const {
        columns,
        rows,
        actions,
        emptyMessage = 'Žádná data k zobrazení',
        class: className,
        id
    } = props;

    const classes = cx('data-table', className);
    const attributes = attrs({ id, class: classes });

    const headerCells = map(columns, (col) => {
        const style = col.width ? `width:${col.width}` : '';
        const align = col.align ? `text-align:${col.align}` : '';
        const styleAttr = (style !== '' || align !== '') ? `style="${style}${style !== '' && align !== '' ? ';' : ''}${align}"` : '';
        return `<th ${styleAttr}>${col.label}</th>`;
    });

    const actionsHeader = actions ? '<th>Akce</th>' : '';

    if (rows.length === 0) {
        return `
            <table ${attributes}>
                <thead><tr>${headerCells}${actionsHeader}</tr></thead>
                <tbody>
                    <tr>
                        <td colspan="${columns.length + (actions ? 1 : 0)}" class="text-center text-muted-tf py-4">
                            ${emptyMessage}
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    const bodyRows = map(rows, (row, index) => {
        const cells = map(columns, (col) => {
            const value = row[col.key] || '';
            const align = col.align ? `style="text-align:${col.align}"` : '';
            return `<td ${align}>${value}</td>`;
        });

        const actionCell = actions
            ? `<td>${map(actions(row, index), (action) => ButtonAction(action))}</td>`
            : '';

        return `<tr>${cells}${actionCell}</tr>`;
    });

    return `
        <table ${attributes}>
            <thead>
                <tr>${headerCells}${actionsHeader}</tr>
            </thead>
            <tbody>
                ${bodyRows}
            </tbody>
        </table>
    `;
}

// Simple table with string arrays
export interface SimpleTableProps extends BaseProps {
    headers: string[];
    rows: string[][];
}

export function SimpleTable(props: SimpleTableProps): string {
    const { headers, rows, class: className, id } = props;

    const classes = cx('data-table', className);
    const attributes = attrs({ id, class: classes });

    const headerCells = map(headers, (h) => `<th>${h}</th>`);
    const bodyRows = map(rows, (row) => `<tr>${map(row, (cell) => `<td>${cell}</td>`)}</tr>`);

    return `
        <table ${attributes}>
            <thead><tr>${headerCells}</tr></thead>
            <tbody>${bodyRows}</tbody>
        </table>
    `;
}
