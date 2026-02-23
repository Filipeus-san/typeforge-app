// Utility functions for component composition

/**
 * Joins class names, filtering out falsy values
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(c => !!c).join(' ');
}

/**
 * Maps an array to HTML string
 */
export function map<T>(items: T[], fn: (item: T, index: number) => string): string {
    return items.map(fn).join('');
}

/**
 * Conditionally renders content
 */
export function when(condition: boolean, content: string | (() => string), fallback?: string | (() => string)): string {
    if (condition) {
        return typeof content === 'function' ? content() : content;
    }
    if (fallback) {
        return typeof fallback === 'function' ? fallback() : fallback;
    }
    return '';
}

/**
 * Creates HTML attributes string from object
 */
export function attrs(attributes: Record<string, string | boolean | undefined>): string {
    return Object.entries(attributes)
        .filter(([_, value]) => value !== undefined && value !== false)
        .map(([key, value]) => {
            if (value === true) return key;
            return `${key}="${value}"`;
        })
        .join(' ');
}

/**
 * Escapes HTML special characters
 */
export function escapeHtml(text: string): string {
    let result = text;
    result = result.split('&').join('&amp;');
    result = result.split('<').join('&lt;');
    result = result.split('>').join('&gt;');
    result = result.split('"').join('&quot;');
    result = result.split("'").join('&#039;');
    return result;
}

/**
 * Creates a slot/children placeholder
 */
export function slot(content: string | undefined, defaultContent?: string): string {
    return content || defaultContent || '';
}

/**
 * Repeats content n times
 */
export function repeat(n: number, fn: (index: number) => string): string {
    const result: string[] = [];
    for (let i = 0; i < n; i++) {
        result.push(fn(i));
    }
    return result.join('');
}

/**
 * Simple template tag for syntax highlighting support
 */
export function html(strings: TemplateStringsArray, ...values: (string | number)[]): string {
    return strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '');
}
