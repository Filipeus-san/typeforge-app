import { BaseProps, FilterOption } from '../types';
import { cx, attrs, map } from '../helpers';
import { Select } from '../ui/Form';

export interface Filter {
    name: string;
    options: FilterOption[];
    value?: string;
    placeholder?: string;
}

export interface FilterBarProps extends BaseProps {
    filters: Filter[];
    onchange?: string; // JavaScript function to call on change
}

export function FilterBar(props: FilterBarProps): string {
    const { filters, onchange, class: className, id } = props;

    const classes = cx('filter-bar', className);
    const attributes = attrs({ id, class: classes });

    const filterSelects = map(filters, (filter) => {
        const options = filter.options.map(opt => ({
            value: opt.value,
            label: opt.label,
            selected: opt.value === filter.value
        }));

        // Add placeholder as first option if provided
        if (filter.placeholder) {
            options.unshift({
                value: '',
                label: filter.placeholder,
                selected: !filter.value
            });
        }

        return Select({
            name: filter.name,
            options,
            filter: true,
            onchange: onchange ? `${onchange}($event.target)` : undefined
        });
    });

    return `<div ${attributes}>${filterSelects}</div>`;
}

// Predefined filter sets
export function OrderStatusFilter(value?: string): string {
    return Select({
        filter: true,
        options: [
            { value: '', label: 'Všechny stavy' },
            { value: 'completed', label: 'Dokončené' },
            { value: 'processing', label: 'Zpracování' },
            { value: 'pending', label: 'Čekající' },
            { value: 'cancelled', label: 'Zrušené' }
        ],
        value
    });
}

export function DateRangeFilter(value?: string): string {
    return Select({
        filter: true,
        options: [
            { value: '7', label: 'Poslední 7 dní' },
            { value: '30', label: 'Poslední 30 dní' },
            { value: '365', label: 'Poslední rok' },
            { value: 'all', label: 'Vše' }
        ],
        value
    });
}

export function CategoryFilter(categories: string[], value?: string): string {
    const options = [
        { value: '', label: 'Všechny kategorie' },
        ...categories.map(c => ({ value: c.toLowerCase(), label: c }))
    ];

    return Select({ filter: true, options, value });
}

export function StatusFilter(value?: string): string {
    return Select({
        filter: true,
        options: [
            { value: '', label: 'Všechny stavy' },
            { value: 'active', label: 'Aktivní' },
            { value: 'inactive', label: 'Neaktivní' },
            { value: 'soldout', label: 'Vyprodáno' }
        ],
        value
    });
}
