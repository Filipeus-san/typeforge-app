import { BaseProps } from '../types';
import { cx, attrs, when, map } from '../helpers';

// Form Group wrapper
export interface FormGroupProps extends BaseProps {
    children: string;
    label?: string;
    required?: boolean;
    error?: string;
    hint?: string;
}

export function FormGroup(props: FormGroupProps): string {
    const { children, label, required, error, hint, class: className, id } = props;

    const classes = cx('form-group', error && 'has-error', className);
    const attributes = attrs({ id, class: classes });

    return `
        <div ${attributes}>
            ${when(!!label, () => `
                <label class="form-label">
                    ${label}${when(!!required, () => '<span class="text-danger ms-1">*</span>')}
                </label>
            `)}
            ${children}
            ${when(!!error, () => `<div class="form-error text-danger small mt-1">${error}</div>`)}
            ${when(!!hint && !error, () => `<div class="form-hint text-muted-tf small mt-1">${hint}</div>`)}
        </div>
    `;
}

// Text Input
export interface InputProps extends BaseProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    name?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    label?: string;
}

export function Input(props: InputProps): string {
    const {
        type = 'text',
        name,
        value,
        placeholder,
        disabled,
        readonly,
        required,
        label,
        class: className,
        id
    } = props;

    const classes = cx('form-control', className);
    const attributes = attrs({
        id,
        class: classes,
        type,
        name,
        value,
        placeholder,
        disabled,
        readonly,
        required
    });

    const input = `<input ${attributes}>`;

    if (label) {
        return FormGroup({ label, required, children: input });
    }

    return input;
}

// Textarea
export interface TextareaProps extends BaseProps {
    name?: string;
    value?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    label?: string;
}

export function Textarea(props: TextareaProps): string {
    const {
        name,
        value = '',
        placeholder,
        rows = 3,
        disabled,
        readonly,
        required,
        label,
        class: className,
        id
    } = props;

    const classes = cx('form-control', className);
    const attributes = attrs({
        id,
        class: classes,
        name,
        placeholder,
        rows: rows.toString(),
        disabled,
        readonly,
        required
    });

    const textarea = `<textarea ${attributes}>${value}</textarea>`;

    if (label) {
        return FormGroup({ label, required, children: textarea });
    }

    return textarea;
}

// Select dropdown
export interface SelectOption {
    value: string;
    label: string;
    selected?: boolean;
}

export interface SelectProps extends BaseProps {
    options: SelectOption[];
    name?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    filter?: boolean; // Use filter-select style
    onchange?: string; // Alpine @change expression
}

export function Select(props: SelectProps): string {
    const {
        options,
        name,
        value,
        placeholder,
        disabled,
        required,
        label,
        filter = false,
        class: className,
        id
    } = props;

    const { onchange } = props;
    const classes = cx(filter ? 'filter-select' : 'form-control', className);
    const attributes = attrs({
        id,
        class: classes,
        name,
        disabled,
        required,
        '@change': onchange
    });

    const optionsHtml = map(options, (opt) => {
        const selected = opt.selected || opt.value === value ? ' selected' : '';
        return `<option value="${opt.value}"${selected}>${opt.label}</option>`;
    });

    const placeholderOption = placeholder
        ? `<option value="" disabled${!value ? ' selected' : ''}>${placeholder}</option>`
        : '';

    const select = `<select ${attributes}>${placeholderOption}${optionsHtml}</select>`;

    if (label && !filter) {
        return FormGroup({ label, required, children: select });
    }

    return select;
}

// Toggle switch
export interface ToggleProps extends BaseProps {
    label: string;
    active?: boolean;
    checked?: boolean; // Alias for active
    name?: string;
    onclick?: string;
}

export function Toggle(props: ToggleProps): string {
    const { label, active = false, checked, name, onclick, class: className, id } = props;
    const isActive = checked !== undefined ? checked : active;

    const classes = cx('form-switch', className);
    const toggleClasses = cx('toggle-switch', isActive && 'active');
    const attributes = attrs({ id, class: classes });

    return `
        <div ${attributes}>
            <div class="${toggleClasses}" ${name ? `data-name="${name}"` : ''} ${onclick ? `@click="${onclick}"` : ''}></div>
            <span>${label}</span>
        </div>
    `;
}

// Search input with icon
export interface SearchInputProps extends BaseProps {
    placeholder?: string;
    value?: string;
    name?: string;
}

export function SearchInput(props: SearchInputProps): string {
    const { placeholder = 'Hledat...', value, name, class: className, id } = props;

    const classes = cx('admin-search', className);
    const attributes = attrs({ id, class: classes });

    return `
        <div ${attributes}>
            <i class="bi bi-search"></i>
            <input type="text" placeholder="${placeholder}" ${value ? `value="${value}"` : ''} ${name ? `name="${name}"` : ''}>
        </div>
    `;
}
