import React from 'react';
import { Icon } from '../ui/Icon';

interface ProductCardProps {
  title: string;
  price: string;
  category?: string;
  description?: string;
  oldPrice?: string;
  badge?: string;
  icon?: string;
  href?: string;
  addToCartUrl?: string;
  className?: string;
}

export function ProductCard({
  title, price, category, description, oldPrice, badge, icon = 'box', href = '/product', addToCartUrl, className,
}: ProductCardProps) {
  const classes = ['product-card', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <a href={href} className="text-decoration-none">
        <div className="product-image">
          <Icon name={icon} size="xl" color="var(--tf-text-muted)" />
          {badge && <span className="product-badge">{badge}</span>}
        </div>
      </a>
      <div className="product-body">
        {category && <div className="product-category">{category}</div>}
        <a href={href} className="text-decoration-none"><h5 className="product-title">{title}</h5></a>
        {description && <p className="product-desc">{description}</p>}
        <div className="product-footer">
          <div>
            <span className="product-price">{price}</span>
            {oldPrice && <span className="product-price-old">{oldPrice}</span>}
          </div>
          {addToCartUrl ? (
            <form method="post" action={addToCartUrl} style={{ display: 'inline' }}>
              <button type="submit" className="btn-cart"><Icon name="cart-plus" /></button>
            </form>
          ) : (
            <button className="btn-cart"><Icon name="cart-plus" /></button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products, columns = 4 }: { products: ProductCardProps[]; columns?: 2 | 3 | 4 }) {
  const colClass = columns === 2 ? 'col-md-6' : columns === 3 ? 'col-md-6 col-lg-4' : 'col-md-6 col-lg-3';
  return (
    <div className="row g-4">
      {products.map((p, i) => (
        <div key={i} className={colClass}><ProductCard {...p} /></div>
      ))}
    </div>
  );
}

export function PriceDisplay({ price, oldPrice, discount, size = 'md', className }: {
  price: string; oldPrice?: string; discount?: string; size?: 'sm' | 'md' | 'lg'; className?: string;
}) {
  const sizeClasses = { sm: 'fs-5', md: 'fs-3', lg: 'fs-1' };
  return (
    <div className={['price-display', className].filter(Boolean).join(' ')}>
      <span className={`${sizeClasses[size]} fw-bold`}>{price}</span>
      {oldPrice && <span className="text-muted-tf text-decoration-line-through ms-2">{oldPrice}</span>}
      {discount && <span className="badge bg-success ms-2">{discount}</span>}
    </div>
  );
}

export function Rating({ stars, count, showCount = true, className }: {
  stars: number; count?: number; showCount?: boolean; className?: string;
}) {
  const full = Math.floor(stars);
  const half = stars % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className={['product-rating', className].filter(Boolean).join(' ')}>
      <span className="stars" style={{ color: '#fbbf24' }}>
        {Array.from({ length: full }, (_, i) => <i key={`f${i}`} className="bi bi-star-fill" />)}
        {half && <i className="bi bi-star-half" />}
        {Array.from({ length: empty }, (_, i) => <i key={`e${i}`} className="bi bi-star" />)}
      </span>
      {showCount && count !== undefined && <span className="count">({count} hodnocení)</span>}
    </div>
  );
}
