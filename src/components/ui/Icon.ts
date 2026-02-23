import { BaseProps, Size } from '../types';
import { cx, attrs } from '../helpers';

export interface IconProps extends BaseProps {
    name: string;
    size?: Size;
    color?: string;
}

const sizeClasses: Record<Size, string> = {
    xs: 'fs-6',
    sm: '',
    md: 'fs-5',
    lg: 'fs-4',
    xl: 'fs-3'
};

export function Icon(props: IconProps): string {
    const { name, size, color, class: className, id } = props;

    const iconName = name.startsWith('bi-') ? name : `bi-${name}`;
    const classes = cx('bi', iconName, size && sizeClasses[size], className);

    const attributes = attrs({
        id,
        class: classes,
        style: color ? `color: ${color}` : undefined
    });

    return `<i ${attributes}></i>`;
}
