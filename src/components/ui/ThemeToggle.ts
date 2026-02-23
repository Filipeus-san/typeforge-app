import { BaseProps, Size } from '../types';
import { cx, attrs } from '../helpers';

export interface ThemeToggleProps extends BaseProps {
    size?: Size;
}

const sizeStyles: Record<Size, string> = {
    xs: 'width:28px;height:28px;font-size:0.8rem;',
    sm: 'width:32px;height:32px;font-size:0.9rem;',
    md: 'width:40px;height:40px;font-size:1.1rem;',
    lg: 'width:48px;height:48px;font-size:1.25rem;',
    xl: 'width:56px;height:56px;font-size:1.4rem;'
};

export function ThemeToggle(props: ThemeToggleProps = {}): string {
    const { size = 'md', class: className, id } = props;

    const classes = cx('btn-theme-toggle', className);
    const style = sizeStyles[size];
    const attributes = attrs({ id, class: classes, style, '@click': '$store.theme.toggle()', title: 'Přepnout téma' });

    return `
        <button ${attributes}>
            <i class="bi bi-moon"></i>
            <i class="bi bi-sun"></i>
        </button>
    `;
}
