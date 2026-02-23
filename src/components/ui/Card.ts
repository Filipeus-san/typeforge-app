import { BaseProps, Size } from '../types';
import { cx, attrs, when } from '../helpers';

export interface CardProps extends BaseProps {
    children: string;
    hover?: boolean;
    padding?: Size;
}

const paddingClasses: Record<Size, string> = {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
    xl: 'p-5'
};

export function Card(props: CardProps): string {
    const {
        children,
        hover = false,
        padding = 'md',
        class: className,
        id
    } = props;

    const classes = cx(
        'card-tf',
        hover && 'card-hover',
        paddingClasses[padding],
        className
    );

    const attributes = attrs({ id, class: classes });

    return `<div ${attributes}>${children}</div>`;
}

// Card section for admin panels
export interface CardSectionProps extends BaseProps {
    children: string;
    title?: string;
    action?: string;
    headerRight?: string; // Alias for action
}

export function CardSection(props: CardSectionProps): string {
    const { children, title, action, headerRight, class: className, id } = props;
    const rightContent = headerRight || action;

    const classes = cx('card-section', className);
    const attributes = attrs({ id, class: classes });

    const header = when(!!title || !!rightContent, () => `
        <div class="card-section-header">
            ${when(!!title, () => `<h5 class="card-section-title">${title}</h5>`)}
            ${rightContent || ''}
        </div>
    `);

    return `<div ${attributes}>${header}${children}</div>`;
}

// Feature card with icon
export interface FeatureCardProps extends BaseProps {
    icon: string;
    title: string;
    description: string;
}

export function FeatureCard(props: FeatureCardProps): string {
    const { icon, title, description, class: className, id } = props;

    const classes = cx('feature-card', className);
    const attributes = attrs({ id, class: classes });

    return `
        <div ${attributes}>
            <div class="feature-icon">
                <i class="bi bi-${icon}"></i>
            </div>
            <h5 class="fw-bold mb-2">${title}</h5>
            <p class="text-muted-tf mb-0">${description}</p>
        </div>
    `;
}

// Step card with number
export interface StepCardProps extends BaseProps {
    number: number;
    title: string;
    description: string;
}

export function StepCard(props: StepCardProps): string {
    const { number, title, description, class: className, id } = props;

    const classes = cx('step-card', className);
    const attributes = attrs({ id, class: classes });

    return `
        <div ${attributes}>
            <div class="step-number">${number}</div>
            <h5 class="fw-bold mb-2">${title}</h5>
            <p class="text-muted-tf mb-0">${description}</p>
        </div>
    `;
}
