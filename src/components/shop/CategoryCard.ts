import { BaseProps } from '../types';
import { cx, attrs, when } from '../helpers';
import { Icon } from '../ui/Icon';

export interface CategoryCardProps extends BaseProps {
    title: string;
    icon: string;
    count?: number;
    href?: string;
    color?: 'primary' | 'accent' | 'blue' | 'orange';
}

const colorStyles: Record<string, { bg: string; border: string }> = {
    primary: { bg: 'rgba(124,92,252,0.1)', border: 'rgba(124,92,252,0.3)' },
    accent: { bg: 'rgba(6,214,160,0.1)', border: 'rgba(6,214,160,0.3)' },
    blue: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)' },
    orange: { bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.3)' }
};

export function CategoryCard(props: CategoryCardProps): string {
    const {
        title,
        icon,
        count,
        href = '/category',
        color = 'primary',
        class: className,
        id
    } = props;

    const classes = cx('category-card', className);
    const attributes = attrs({ id, class: classes });
    const colors = colorStyles[color];

    return `
        <a href="${href}" ${attributes} style="text-decoration:none;">
            <div class="category-icon" style="background:${colors.bg};">
                ${Icon({ name: icon, size: 'lg' })}
            </div>
            <h6 class="category-title">${title}</h6>
            ${when(count !== undefined, () => `<span class="category-count">${count} produktů</span>`)}
        </a>
    `;
}

// Category grid
export interface CategoryGridProps {
    categories: CategoryCardProps[];
    columns?: 2 | 3 | 4 | 6;
}

export function CategoryGrid(props: CategoryGridProps): string {
    const { categories, columns = 6 } = props;
    const colClass = {
        2: 'col-6',
        3: 'col-6 col-md-4',
        4: 'col-6 col-md-3',
        6: 'col-6 col-md-4 col-lg-2'
    }[columns];

    return `
        <div class="row g-3">
            ${categories.map(cat => `
                <div class="${colClass}">
                    ${CategoryCard(cat)}
                </div>
            `).join('')}
        </div>
    `;
}

// Category list for sidebar
export interface CategoryListProps extends BaseProps {
    categories: { name: string; count: number; href?: string; active?: boolean }[];
}

export function CategoryList(props: CategoryListProps): string {
    const { categories, class: className, id } = props;

    const classes = cx('category-list', className);
    const attributes = attrs({ id, class: classes });

    const items = categories.map(cat => `
        <a href="${cat.href || '#'}" class="category-list-item${cat.active ? ' active' : ''}">
            <span>${cat.name}</span>
            <span class="category-list-count">${cat.count}</span>
        </a>
    `).join('');

    return `<div ${attributes}>${items}</div>`;
}
