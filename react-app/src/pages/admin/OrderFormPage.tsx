import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { CardSection } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { FormGroup } from '../../components/form/FormGroup';
import { Select } from '../../components/form/Select';
import { formatPrice } from '../../utils';
import { useT } from '../../i18n';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: string;
  unitPrice: string;
}

interface OrderFormProps {
  isEdit: boolean;
  orderId?: string;
  data?: Record<string, string>;
  availableProducts: { id: string; name: string; price: string }[];
  availableCustomers: { id: string; firstName: string; lastName: string; email: string }[];
  existingItems?: { productId: string; productName: string; quantity: string; unitPrice: string }[];
  error?: string;
}

export function OrderFormPage({
  isEdit,
  orderId,
  data,
  availableProducts,
  availableCustomers,
  existingItems,
  error,
}: OrderFormProps) {
  const t = useT('orders');

  const [items, setItems] = useState<OrderItem[]>(
    existingItems && existingItems.length > 0
      ? existingItems
      : [{ productId: '', productName: '', quantity: '1', unitPrice: '0' }]
  );

  const [formValues, setFormValues] = useState<Record<string, string>>(data ?? {});

  const statusOptions = [
    { value: 'pending', label: t.statuses.pending },
    { value: 'processing', label: t.statuses.processing },
    { value: 'completed', label: t.statuses.completed },
    { value: 'cancelled', label: t.statuses.cancelled },
    { value: 'returned', label: 'Vraceno' },
  ];

  const handleFieldChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleCustomerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const customerId = e.target.value;
    if (!customerId) return;
    const customer = availableCustomers.find((c) => c.id === customerId);
    if (customer) {
      setFormValues((prev) => ({
        ...prev,
        customer_id: customer.id,
        customer_name: `${customer.firstName} ${customer.lastName}`,
        customer_email: customer.email,
      }));
    }
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleProductSelect = (index: number, productId: string) => {
    const product = availableProducts.find((p) => p.id === productId);
    if (product) {
      setItems((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          productId: product.id,
          productName: product.name,
          unitPrice: product.price,
        };
        return updated;
      });
    } else {
      handleItemChange(index, 'productId', productId);
    }
  };

  const addItem = () => {
    setItems((prev) => [...prev, { productId: '', productName: '', quantity: '1', unitPrice: '0' }]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const totalAmount = items.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    return sum + qty * price;
  }, 0);

  const customerOptions = availableCustomers.map((c) => ({
    value: c.id,
    label: `${c.firstName} ${c.lastName} (${c.email})`,
  }));

  const productOptions = availableProducts.map((p) => ({
    value: p.id,
    label: `${p.name} - ${formatPrice(Number(p.price))}`,
  }));

  return (
    <AdminLayout title={isEdit ? t.actions.edit : t.headings.create} activePage="orders">
      {error && <div className="alert alert-danger mb-4">{error}</div>}
      <form method="post">
        {orderId && <input type="hidden" name="id" value={orderId} />}

        <div className="row g-4">
          <div className="col-lg-8">
            {/* Customer Section */}
            <CardSection title={t.form.sections.customer}>
              <div className="mb-3">
                <FormGroup label={t.form.labels.selectCustomer}>
                  <select
                    className="form-control"
                    onChange={handleCustomerSelect}
                    defaultValue=""
                  >
                    <option value="">{t.form.labels.noAssignment}</option>
                    {customerOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </FormGroup>
              </div>
              <input type="hidden" name="customer_id" value={formValues.customer_id ?? ''} />
              <div className="row g-3">
                <div className="col-md-6">
                  <FormGroup label={t.form.labels.customerName} required>
                    <input
                      type="text"
                      name="customer_name"
                      className="form-control"
                      required
                      value={formValues.customer_name ?? ''}
                      onChange={handleFieldChange('customer_name')}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup label={t.form.labels.email} required>
                    <input
                      type="email"
                      name="customer_email"
                      className="form-control"
                      required
                      value={formValues.customer_email ?? ''}
                      onChange={handleFieldChange('customer_email')}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="row g-3 mt-1">
                <div className="col-md-6">
                  <FormGroup label={t.form.labels.shippingAddress}>
                    <textarea
                      name="shipping_address"
                      className="form-control"
                      rows={2}
                      value={formValues.shipping_address ?? ''}
                      onChange={handleFieldChange('shipping_address')}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup label="Fakturacni adresa">
                    <textarea
                      name="billing_address"
                      className="form-control"
                      rows={2}
                      value={formValues.billing_address ?? ''}
                      onChange={handleFieldChange('billing_address')}
                    />
                  </FormGroup>
                </div>
              </div>
            </CardSection>

            {/* Items Section */}
            <CardSection title={t.form.sections.items}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '35%' }}>{t.columns.product}</th>
                    <th style={{ width: '25%' }}>{t.form.labels.itemName}</th>
                    <th style={{ width: '10%', textAlign: 'center' }}>{t.columns.quantity}</th>
                    <th style={{ width: '15%', textAlign: 'right' }}>{t.columns.pricePerUnit}</th>
                    <th style={{ width: '10%', textAlign: 'right' }}>{t.columns.total}</th>
                    <th style={{ width: '5%' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => {
                    const lineTotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
                    return (
                      <tr key={idx}>
                        <td>
                          <select
                            className="form-control"
                            value={item.productId}
                            onChange={(e) => handleProductSelect(idx, e.target.value)}
                          >
                            <option value="">{t.form.labels.customItem}</option>
                            {productOptions.map((o) => (
                              <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                          </select>
                          <input type="hidden" name={`item_product_id_${idx}`} value={item.productId} />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t.form.labels.itemName}
                            value={item.productName}
                            onChange={(e) => handleItemChange(idx, 'productName', e.target.value)}
                          />
                          <input type="hidden" name={`item_name_${idx}`} value={item.productName} />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            min="1"
                            style={{ textAlign: 'center' }}
                            value={item.quantity}
                            onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                          />
                          <input type="hidden" name={`item_qty_${idx}`} value={item.quantity} />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            step="0.01"
                            min="0"
                            style={{ textAlign: 'right' }}
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                          />
                          <input type="hidden" name={`item_price_${idx}`} value={item.unitPrice} />
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>
                          {formatPrice(lineTotal)}
                        </td>
                        <td>
                          {items.length > 1 && (
                            <button
                              type="button"
                              className="btn-action danger"
                              title={t.actions.removeItem}
                              onClick={() => removeItem(idx)}
                            >
                              <Icon name="x-lg" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <input type="hidden" name="item_count" value={String(items.length)} />

              <div className="d-flex justify-content-between align-items-center mt-3">
                <button type="button" className="btn-outline-tf btn-sm" onClick={addItem}>
                  <Icon name="plus-lg" /> {t.actions.addItem}
                </button>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  {t.columns.totalLabel} {formatPrice(totalAmount)}
                </div>
              </div>
            </CardSection>

            {/* Notes Section */}
            <CardSection title={t.form.sections.notes}>
              <FormGroup label={t.form.labels.notesPlaceholder}>
                <textarea
                  name="notes"
                  className="form-control"
                  rows={3}
                  value={formValues.notes ?? ''}
                  onChange={handleFieldChange('notes')}
                />
              </FormGroup>
            </CardSection>
          </div>

          <div className="col-lg-4">
            <CardSection title={t.columns.status}>
              <FormGroup label={t.form.sections.orderStatus}>
                <Select
                  name="status"
                  options={statusOptions}
                  value={formValues.status ?? 'pending'}
                  onChange={handleFieldChange('status')}
                />
              </FormGroup>
            </CardSection>

            <CardSection>
              <div className="d-grid gap-2">
                <button type="submit" className="btn-add w-100 justify-content-center">
                  <Icon name="check-lg" /> {isEdit ? t.actions.saveChanges : t.actions.createOrder}
                </button>
                <a href="/admin/orders" className="btn btn-outline-tf btn-sm text-center">{t.actions.backToList}</a>
              </div>
            </CardSection>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
