import { BaseProps } from '../types';
import { map, when, escapeHtml } from '../helpers';
import { CardSection } from '../ui/Card';
import { Textarea, Select, FormGroup } from '../ui/Form';
import { Icon } from '../ui/Icon';
import type { SelectOption } from '../ui/Form';
import { ADMIN_FORM_T } from "./AdminForm.translation";

// =============================================================================
// AdminForm — Declarative admin form builder
// =============================================================================

export interface FormField {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'number' | 'password' | 'textarea' | 'select' | 'hidden' | 'tel' | 'url';
    required?: boolean;
    placeholder?: string;
    options?: SelectOption[];
    rows?: number;
    hint?: string;
    colSpan?: number;
    step?: string;
    min?: string;
}

export interface FormSection {
    title?: string;
    fields: FormField[];
    position?: 'main' | 'sidebar';
}

export interface AdminFormProps extends BaseProps {
    sections: FormSection[];
    values?: Record<string, string>;
    error?: string;
    submitLabel?: string;
    submitIcon?: string;
    backUrl?: string;
    backLabel?: string;
    action?: string;
}

export function AdminForm(props: AdminFormProps): string {
    const {
        sections,
        values = {},
        error,
        submitLabel = ADMIN_FORM_T.defaults.submitLabel,
        submitIcon = 'check-lg',
        backUrl,
        backLabel = ADMIN_FORM_T.defaults.backLabel,
        action,
    } = props;

    const mainSections = sections.filter(s => (s.position ?? 'main') === 'main');
    const sidebarSections = sections.filter(s => s.position === 'sidebar');

    const errorHtml = (error !== undefined && error !== '')
        ? `<div class="alert alert-danger mb-4">${escapeHtml(error!)}</div>`
        : '';

    function renderField(field: FormField): string {
        const val = values[field.name] ?? '';
        const escapedVal = escapeHtml(val);

        const fieldType = field.type ?? 'text';

        if (fieldType === 'hidden') {
            return `<input type="hidden" name="${field.name}" value="${escapedVal}">`;
        }

        if (fieldType === 'textarea') {
            return FormGroup({
                label: field.label,
                required: field.required,
                hint: field.hint,
                children: Textarea({
                    name: field.name,
                    value: escapedVal,
                    placeholder: field.placeholder,
                    rows: field.rows ?? 3,
                    required: field.required,
                }),
            });
        }

        if (fieldType === 'select') {
            const opts = (field.options ?? []).map(o => ({
                value: o.value,
                label: o.label,
                selected: o.value === val,
            }));
            return FormGroup({
                label: field.label,
                required: field.required,
                hint: field.hint,
                children: Select({
                    name: field.name,
                    options: opts,
                    placeholder: field.placeholder,
                    required: field.required,
                }),
            });
        }

        // text, email, number, password, tel, url
        const inputAttrs: string[] = [
            `type="${fieldType}"`,
            `name="${field.name}"`,
            `class="form-control"`,
            `value="${escapedVal}"`,
        ];
        if (field.placeholder) inputAttrs.push(`placeholder="${escapeHtml(field.placeholder)}"`);
        if (field.required) inputAttrs.push('required');
        if (field.step) inputAttrs.push(`step="${field.step}"`);
        if (field.min) inputAttrs.push(`min="${field.min}"`);

        const inputHtml = `<input ${inputAttrs.join(' ')}>`;

        return FormGroup({
            label: field.label,
            required: field.required,
            hint: field.hint,
            children: inputHtml,
        });
    }

    function renderSectionFields(fields: FormField[]): string {
        const hasGrid = fields.some(f => (f.colSpan ?? 12) < 12);
        if (hasGrid) {
            return `<div class="row g-3">${map(fields, (f) => {
                const col = f.colSpan ?? 12;
                if ((f.type ?? 'text') === 'hidden') return renderField(f);
                return `<div class="col-md-${col}">${renderField(f)}</div>`;
            })}</div>`;
        }
        return map(fields, (f) => {
            if ((f.type ?? 'text') === 'hidden') return renderField(f);
            return `<div class="mb-3">${renderField(f)}</div>`;
        });
    }

    function renderSections(sects: FormSection[]): string {
        return map(sects, (section) => CardSection({
            title: section.title,
            children: renderSectionFields(section.fields),
        }));
    }

    const submitSection = CardSection({
        children: `
            <div class="d-grid gap-2">
                <button type="submit" class="btn-add w-100 justify-content-center">
                    ${Icon({ name: submitIcon })}
                    ${submitLabel}
                </button>
                ${(backUrl !== undefined && backUrl !== '')
                    ? `<a href="${backUrl}" class="btn btn-outline-tf btn-sm text-center">${backLabel}</a>`
                    : ''}
            </div>
        `,
    });

    const formAction = action ? ` action="${action}"` : '';

    return `
        ${errorHtml}
        <form method="post"${formAction} class="admin-form">
            <div class="row g-4">
                <div class="col-md-8">
                    ${renderSections(mainSections)}
                </div>
                <div class="col-md-4">
                    ${renderSections(sidebarSections)}
                    ${submitSection}
                </div>
            </div>
        </form>
    `;
}
