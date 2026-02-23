import { BaseProps } from '../types';
import { cx, attrs, when } from '../helpers';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

export interface ProductCardProps extends BaseProps {
    title: string;
    price: string;
    category?: string;
    description?: string;
    oldPrice?: string;
    badge?: string;
    icon?: string;
    href?: string;
    onAddToCart?: string;
}

export function ProductCard(props: ProductCardProps): string {
    const {
        title,
        price,
        category,
        description,
        oldPrice,
        badge,
        icon = 'box',
        href = '/product',
        onAddToCart,
        class: className,
        id
    } = props;

    const classes = cx('product-card', className);
    const attributes = attrs({ id, class: classes });

    return `
        <div ${attributes}>
            <a href="${href}" class="text-decoration-none">
                <div class="product-image">
                    ${Icon({ name: icon, size: 'xl', color: 'var(--tf-text-muted)' })}
                    ${when(!!badge, () => `<span class="product-badge">${badge}</span>`)}
                </div>
            </a>
            <div class="product-body">
                ${when(!!category, () => `<div class="product-category">${category}</div>`)}
                <a href="${href}" class="text-decoration-none">
                    <h5 class="product-title">${title}</h5>
                </a>
                ${when(!!description, () => `<p class="product-desc">${description}</p>`)}
                <div class="product-footer">
                    <div>
                        <span class="product-price">${price}</span>
                        ${when(!!oldPrice, () => `<span class="product-price-old">${oldPrice}</span>`)}
                    </div>
                    <button class="btn-cart" ${onAddToCart ? `@click="${onAddToCart}"` : ''}>
                        ${Icon({ name: 'cart-plus' })}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Product grid
export interface ProductGridProps {
    products: ProductCardProps[];
    columns?: 2 | 3 | 4;
}

export function ProductGrid(props: ProductGridProps): string {
    const { products, columns = 4 } = props;
    const colClass = columns === 2 ? 'col-md-6'
        : columns === 3 ? 'col-md-6 col-lg-4'
        : 'col-md-6 col-lg-3';

    return `
        <div class="row g-4">
            ${products.map(product => `
                <div class="${colClass}">
                    ${ProductCard(product)}
                </div>
            `).join('')}
        </div>
    `;
}

// Price display component
export interface PriceDisplayProps extends BaseProps {
    price: string;
    oldPrice?: string;
    discount?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay(props: PriceDisplayProps): string {
    const { price, oldPrice, discount, size = 'md', class: className, id } = props;

    const sizeClasses = {
        sm: 'fs-5',
        md: 'fs-3',
        lg: 'fs-1'
    };

    const classes = cx('price-display', className);
    const attributes = attrs({ id, class: classes });

    return `
        <div ${attributes}>
            <span class="${sizeClasses[size]} fw-bold">${price}</span>
            ${when(!!oldPrice, () => `<span class="text-muted-tf text-decoration-line-through ms-2">${oldPrice}</span>`)}
            ${when(!!discount, () => `<span class="badge bg-success ms-2">${discount}</span>`)}
        </div>
    `;
}

// Rating stars
export interface RatingProps extends BaseProps {
    stars: number;
    count?: number;
    showCount?: boolean;
}

export function Rating(props: RatingProps): string {
    const { stars, count, showCount = true, class: className, id } = props;

    const classes = cx('product-rating', className);
    const attributes = attrs({ id, class: classes });

    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const starsHtml =
        Icon({ name: 'star-fill' }).repeat(fullStars) +
        (hasHalfStar ? Icon({ name: 'star-half' }) : '') +
        Icon({ name: 'star' }).repeat(emptyStars);

    return `
        <div ${attributes}>
            <span class="stars" style="color:#fbbf24">${starsHtml}</span>
            ${when(showCount && !!count, () => `<span class="count">(${count} hodnocení)</span>`)}
        </div>
    `;
}
