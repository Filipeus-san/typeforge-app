import { BaseProps, Size } from '../types';
import { cx, attrs, when } from '../helpers';
import { Icon } from './Icon';

export interface AvatarProps extends BaseProps {
    initials?: string;
    icon?: string;
    size?: Size;
    src?: string;
}

const sizeStyles: Record<Size, string> = {
    xs: 'width:24px;height:24px;font-size:0.7rem;',
    sm: 'width:32px;height:32px;font-size:0.8rem;',
    md: 'width:36px;height:36px;font-size:0.85rem;',
    lg: 'width:44px;height:44px;font-size:1rem;',
    xl: 'width:56px;height:56px;font-size:1.2rem;'
};

export function Avatar(props: AvatarProps): string {
    const {
        initials,
        icon,
        size = 'md',
        src,
        class: className,
        id
    } = props;

    const classes = cx('avatar', className);
    const style = sizeStyles[size];
    const attributes = attrs({ id, class: classes, style });

    if (src) {
        return `<img ${attributes} src="${src}" alt="">`;
    }

    const content = icon
        ? Icon({ name: icon })
        : (initials || '');

    return `<div ${attributes}>${content}</div>`;
}

// User info display with avatar
export interface UserDisplayProps {
    initials: string;
    name: string;
    subtitle?: string;
    size?: Size;
}

export function UserDisplay(props: UserDisplayProps): string {
    const { initials, name, subtitle, size = 'md' } = props;

    return `
        <div class="d-flex align-items-center gap-2">
            ${Avatar({ initials, size })}
            <div>
                <strong>${name}</strong>
                ${when(!!subtitle, () => `<div class="text-muted-tf small">${subtitle}</div>`)}
            </div>
        </div>
    `;
}
