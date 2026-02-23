import { BaseProps } from '../types';
import { cx, attrs } from '../helpers';

export interface PageWrapperProps extends BaseProps {
    children: string;
    paddingTop?: boolean;
    paddingBottom?: boolean;
    minHeight?: boolean;
}

export function PageWrapper(props: PageWrapperProps): string {
    const {
        children,
        paddingTop = true,
        paddingBottom = true,
        minHeight = true,
        class: className,
        id
    } = props;

    const classes = cx(
        'page-wrapper',
        paddingTop && 'pt-navbar',
        paddingBottom && 'pb-section',
        minHeight && 'min-vh-100',
        className
    );
    const attributes = attrs({ id, class: classes });

    return `<div ${attributes}>${children}</div>`;
}

// Page wrapper styles (to be included in template)
export function pageWrapperStyles(): string {
    return `
        .page-wrapper {
            min-height: 100vh;
        }
        .pt-navbar {
            padding-top: 6rem;
        }
        .pb-section {
            padding-bottom: 4rem;
        }
    `;
}
