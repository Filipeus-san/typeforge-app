// Format price in Czech format: "1 234,56 Kč"
export function formatPrice(amount: number): string {
  if (isNaN(amount)) return '0,00 Kč';
  const rounded = Math.round(amount * 100) / 100;
  const str = rounded.toFixed(2);
  const [intPart, decPart] = str.split('.');
  let formatted = '';
  for (let i = 0; i < intPart.length; i++) {
    if (i > 0 && (intPart.length - i) % 3 === 0) formatted += ' ';
    formatted += intPart[i];
  }
  return formatted + ',' + decPart + ' Kč';
}

// Format date: "8. 2. 2026"
export function formatDate(dateStr: string): string {
  if (!dateStr || dateStr.length < 10) return '-';
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(5, 7);
  const day = dateStr.substring(8, 10);
  const d = Number(day);
  const m = Number(month);
  if (d > 0 && m > 0) return `${d}. ${m}. ${year}`;
  return '-';
}

// Product status
const PRODUCT_STATUS_LABELS: Record<string, string> = {
  active: 'Aktivní', inactive: 'Neaktivní', soldout: 'Vyprodáno',
};
const PRODUCT_STATUS_VARIANTS: Record<string, string> = {
  active: 'success', inactive: 'warning', soldout: 'danger',
};

export function getProductStatusLabel(status: string): string {
  return PRODUCT_STATUS_LABELS[status] ?? status;
}
export function getProductStatusVariant(status: string): 'success' | 'warning' | 'danger' | 'default' {
  return (PRODUCT_STATUS_VARIANTS[status] as any) ?? 'default';
}

// Order status
const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Čekající', processing: 'Zpracování', shipped: 'Odesláno', completed: 'Dokončeno', cancelled: 'Zrušeno',
};
const ORDER_STATUS_VARIANTS: Record<string, string> = {
  pending: 'warning', processing: 'info', shipped: 'info', completed: 'success', cancelled: 'danger',
};

export function getOrderStatusLabel(status: string): string {
  return ORDER_STATUS_LABELS[status] ?? status;
}
export function getOrderStatusVariant(status: string): 'warning' | 'info' | 'success' | 'danger' | 'default' {
  return (ORDER_STATUS_VARIANTS[status] as any) ?? 'default';
}

// Blog status
const BLOG_STATUS_LABELS: Record<string, string> = {
  published: 'Publikováno', draft: 'Koncept', archived: 'Archivováno',
};
const BLOG_STATUS_VARIANTS: Record<string, string> = {
  published: 'success', draft: 'warning', archived: 'default',
};

export function getBlogStatusLabel(status: string): string {
  return BLOG_STATUS_LABELS[status] ?? status;
}
export function getBlogStatusVariant(status: string): 'success' | 'warning' | 'default' {
  return (BLOG_STATUS_VARIANTS[status] as any) ?? 'default';
}

// Category status
export function getCategoryStatusLabel(status: string): string {
  return status === 'active' ? 'Aktivní' : 'Neaktivní';
}
export function getCategoryStatusVariant(status: string): 'success' | 'warning' | 'default' {
  return status === 'active' ? 'success' : 'warning';
}

// Customer initials
export function getInitials(fullName: string): string {
  if (!fullName) return '??';
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0]?.toUpperCase() ?? '';
  const last = parts[1]?.[0]?.toUpperCase() ?? '';
  return first + last || first || '??';
}

// Product status filter options
export const PRODUCT_STATUS_FILTER_OPTIONS = [
  { value: 'active', label: 'Aktivní' },
  { value: 'inactive', label: 'Neaktivní' },
  { value: 'soldout', label: 'Vyprodáno' },
];

export const ORDER_STATUS_FILTER_OPTIONS = [
  { value: 'pending', label: 'Čekající' },
  { value: 'processing', label: 'Zpracování' },
  { value: 'shipped', label: 'Odesláno' },
  { value: 'completed', label: 'Dokončeno' },
  { value: 'cancelled', label: 'Zrušeno' },
];

export const BLOG_STATUS_FILTER_OPTIONS = [
  { value: 'published', label: 'Publikováno' },
  { value: 'draft', label: 'Koncept' },
  { value: 'archived', label: 'Archivováno' },
];

export const CATEGORY_STATUS_FILTER_OPTIONS = [
  { value: 'active', label: 'Aktivní' },
  { value: 'inactive', label: 'Neaktivní' },
];
