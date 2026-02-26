import {
  PRODUCT_STATUS_LABELS, PRODUCT_STATUS_VARIANTS,
  ORDER_STATUS_LABELS, ORDER_STATUS_VARIANTS,
  BLOG_STATUS_LABELS, BLOG_STATUS_VARIANTS,
  CATEGORY_STATUS_LABELS, CATEGORY_STATUS_VARIANTS,
  PRODUCT_STATUS_FILTER_OPTIONS,
  ORDER_STATUS_FILTER_OPTIONS,
  BLOG_STATUS_FILTER_OPTIONS,
  CATEGORY_STATUS_FILTER_OPTIONS,
} from '@shared';

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
export function getProductStatusLabel(status: string): string {
  return (PRODUCT_STATUS_LABELS as Record<string, string>)[status] ?? status;
}
export function getProductStatusVariant(status: string): string {
  return (PRODUCT_STATUS_VARIANTS as Record<string, string>)[status] ?? 'default';
}

// Order status
export function getOrderStatusLabel(status: string): string {
  return (ORDER_STATUS_LABELS as Record<string, string>)[status] ?? status;
}
export function getOrderStatusVariant(status: string): string {
  return (ORDER_STATUS_VARIANTS as Record<string, string>)[status] ?? 'default';
}

// Blog status
export function getBlogStatusLabel(status: string): string {
  return (BLOG_STATUS_LABELS as Record<string, string>)[status] ?? status;
}
export function getBlogStatusVariant(status: string): string {
  return (BLOG_STATUS_VARIANTS as Record<string, string>)[status] ?? 'default';
}

// Category status
export function getCategoryStatusLabel(status: string): string {
  return (CATEGORY_STATUS_LABELS as Record<string, string>)[status] ?? status;
}
export function getCategoryStatusVariant(status: string): string {
  return (CATEGORY_STATUS_VARIANTS as Record<string, string>)[status] ?? 'default';
}

// Customer initials
export function getInitials(fullName: string): string {
  if (!fullName) return '??';
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0]?.toUpperCase() ?? '';
  const last = parts[1]?.[0]?.toUpperCase() ?? '';
  return first + last || first || '??';
}

// Re-export filter options from shared-keys
export { PRODUCT_STATUS_FILTER_OPTIONS, ORDER_STATUS_FILTER_OPTIONS, BLOG_STATUS_FILTER_OPTIONS, CATEGORY_STATUS_FILTER_OPTIONS };
