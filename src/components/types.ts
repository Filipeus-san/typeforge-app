// Component type - a function that returns HTML string
export type Component<P = {}> = (props: P) => string;

// Base props available to all components
export interface BaseProps {
    class?: string;
    id?: string;
}

// Size variants
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Color variants
export type ColorVariant = 'primary' | 'accent' | 'success' | 'warning' | 'info' | 'danger';

// Button variants
export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'accent';

// Badge/Status variants
export type BadgeVariant = 'default' | 'success' | 'warning' | 'info' | 'danger';

// Icon colors
export type IconColor = 'purple' | 'green' | 'blue' | 'orange' | 'muted' | 'primary' | 'accent';

// Table column definition
export interface TableColumn {
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
}

// Table row action
export interface TableAction {
    icon: string;
    onclick?: string;
    href?: string;
    variant?: 'default' | 'danger';
    title?: string;
}

// Filter option
export interface FilterOption {
    value: string;
    label: string;
}

// Nav item
export interface NavItem {
    path: string;
    label: string;
    icon?: string;
    badge?: string;
    active?: boolean;
}

// Nav section (for admin sidebar)
export interface NavSection {
    title: string;
    items: NavItem[];
}
