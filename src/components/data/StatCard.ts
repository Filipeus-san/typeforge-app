import { BaseProps, IconColor } from '../types';
import { cx, attrs, when } from '../helpers';
import { Icon } from '../ui/Icon';

export interface StatCardProps extends BaseProps {
    icon: string;
    iconColor?: IconColor;
    value: string;
    label: string;
    change?: {
        value: string;
        direction: 'up' | 'down';
    };
}

const iconColorClasses: Record<IconColor, string> = {
    purple: 'purple',
    green: 'green',
    blue: 'blue',
    orange: 'orange',
    muted: '',
    primary: 'purple',
    accent: 'green'
};

export function StatCard(props: StatCardProps): string {
    const {
        icon,
        iconColor = 'purple',
        value,
        label,
        change,
        class: className,
        id
    } = props;

    const classes = cx('stat-card', className);
    const attributes = attrs({ id, class: classes });

    const changeHtml = when(!!change, () => `
        <div class="stat-change ${change!.direction}">
            ${Icon({ name: `arrow-${change!.direction}` })} ${change!.value}
        </div>
    `);

    return `
        <div ${attributes}>
            <div class="stat-header">
                <div class="stat-icon ${iconColorClasses[iconColor]}">
                    ${Icon({ name: icon })}
                </div>
                ${changeHtml}
            </div>
            <div class="stat-value">${value}</div>
            <div class="stat-label">${label}</div>
        </div>
    `;
}

// Grid of stat cards
export interface StatsGridProps {
    stats: StatCardProps[];
    columns?: 2 | 3 | 4;
}

export function StatsGrid(props: StatsGridProps): string {
    const { stats, columns = 4 } = props;
    const colClass = columns === 2 ? 'col-md-6' : columns === 3 ? 'col-md-4' : 'col-md-6 col-lg-3';

    return `
        <div class="row g-4 mb-4">
            ${stats.map(stat => `
                <div class="${colClass}">
                    ${StatCard(stat)}
                </div>
            `).join('')}
        </div>
    `;
}
