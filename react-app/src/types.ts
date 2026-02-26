// =============================================================================
// Size & Variant types
// =============================================================================

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'accent';
export type BadgeVariant = 'default' | 'success' | 'warning' | 'info' | 'danger';
export type IconColor = 'purple' | 'green' | 'blue' | 'orange' | 'muted' | 'primary' | 'accent';

// =============================================================================
// Data types (mirror server DB types)
// =============================================================================

export interface ProductRow {
  id: string;
  name: string;
  slug: string;
  price: string;
  oldPrice?: string;
  stock: string;
  status: string;
  categoryName?: string;
  categorySlug?: string;
  icon?: string;
  featuredImage?: string;
  description?: string;
  shortDescription?: string;
}

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  status: string;
  sortOrder: string;
  featuredImage?: string;
}

export interface OrderRow {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: string;
  totalAmount: string;
  createdAt: string;
}

export interface OrderItemRow {
  id: string;
  productName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
}

export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  status: string;
  author?: string;
  createdAt: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
}

export interface MediaRow {
  id: string;
  filename: string;
  contentType: string;
  storagePath: string;
  url: string;
  createdAt: string;
}

export interface CustomerRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  createdAt: string;
}

export interface StatData {
  icon: string;
  iconColor?: IconColor;
  value: string;
  label: string;
  change?: { value: string; direction: 'up' | 'down' };
}

// =============================================================================
// Navigation types
// =============================================================================

export interface NavItem {
  path: string;
  label: string;
  icon?: string;
  badge?: string;
  active?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// =============================================================================
// Form types
// =============================================================================

export interface SelectOption {
  value: string;
  label: string;
}

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

// =============================================================================
// Table/List types
// =============================================================================

export interface DataListColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: string, row: Record<string, string>) => React.ReactNode;
}

export interface DataListAction {
  icon: string;
  href: (row: Record<string, string>) => string;
  title?: string;
  variant?: 'default' | 'danger';
  confirm?: string;
}

export interface FilterDef {
  name: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
}
