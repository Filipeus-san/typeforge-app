import { AdminForm, FormSection } from "../../../components";
import { CUSTOMERS_T } from "./customers.translation";

export function getCustomerFormContent(request: Request, data?: Record<string, string>, error?: string, isEdit: boolean = false): string {
    const sections: FormSection[] = [
        {
            title: CUSTOMERS_T.detail.sections.personalInfo,
            position: 'main',
            fields: [
                { name: 'first_name', label: CUSTOMERS_T.detail.labels.firstName, required: true, colSpan: 6 },
                { name: 'last_name', label: CUSTOMERS_T.detail.labels.lastName, required: true, colSpan: 6 },
                { name: 'email', label: CUSTOMERS_T.detail.labels.email, type: 'email', required: true, colSpan: 6 },
                { name: 'phone', label: CUSTOMERS_T.detail.labels.phone, colSpan: 6 },
                { name: 'company', label: CUSTOMERS_T.detail.labels.company },
            ],
        },
        {
            title: CUSTOMERS_T.detail.sections.addresses,
            position: 'main',
            fields: [
                { name: 'shipping_address', label: CUSTOMERS_T.detail.sections.shippingAddress, type: 'textarea', rows: 3, colSpan: 6 },
                { name: 'billing_address', label: CUSTOMERS_T.detail.sections.billingAddress, type: 'textarea', rows: 3, colSpan: 6 },
            ],
        },
        {
            title: CUSTOMERS_T.detail.sections.notes,
            position: 'main',
            fields: [
                { name: 'notes', label: CUSTOMERS_T.detail.sections.notes, type: 'textarea', rows: 3, placeholder: CUSTOMERS_T.detail.placeholders.notes },
            ],
        },
        {
            title: CUSTOMERS_T.detail.labels.status,
            position: 'sidebar',
            fields: [
                { name: 'status', label: CUSTOMERS_T.detail.labels.status, type: 'select', options: [
                    { value: 'active', label: CUSTOMERS_T.filters.active },
                    { value: 'inactive', label: CUSTOMERS_T.filters.inactive },
                ]},
            ],
        },
    ];

    return AdminForm({
        sections,
        values: data,
        error,
        submitLabel: isEdit ? CUSTOMERS_T.form.saveChanges : CUSTOMERS_T.form.createCustomer,
        submitIcon: isEdit ? 'check-lg' : 'plus-lg',
        backUrl: '/admin/customers',
    });
}
