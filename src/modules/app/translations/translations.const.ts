export interface TranslatableField {
    name: string;
    label: string;
    type: 'text' | 'textarea';
    rows?: number;
}

export const SUPPORTED_LANGUAGES = [
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
    { value: 'sk', label: 'Slovenčina' },
    { value: 'pl', label: 'Polski' },
];

export const ENTITY_TYPE_OPTIONS = [
    { value: 'product', label: 'Produkt' },
    { value: 'blog_post', label: 'Blog článek' },
    { value: 'category', label: 'Kategorie' },
];

export const ENTITY_TYPE_LABELS: Record<string, string> = {
    product: 'Produkt',
    blog_post: 'Blog článek',
    category: 'Kategorie',
};

export const LANGUAGE_LABELS: Record<string, string> = {
    en: 'English',
    de: 'Deutsch',
    sk: 'Slovenčina',
    pl: 'Polski',
};

export const TRANSLATABLE_FIELDS: Record<string, TranslatableField[]> = {
    product: [
        { name: 'name', label: 'Název produktu', type: 'text' },
        { name: 'short_description', label: 'Krátký popis', type: 'textarea', rows: 3 },
        { name: 'description', label: 'Popis', type: 'textarea', rows: 6 },
    ],
    blog_post: [
        { name: 'title', label: 'Nadpis článku', type: 'text' },
        { name: 'excerpt', label: 'Perex', type: 'textarea', rows: 3 },
        { name: 'content', label: 'Obsah', type: 'textarea', rows: 10 },
    ],
    category: [
        { name: 'name', label: 'Název kategorie', type: 'text' },
        { name: 'description', label: 'Popis', type: 'textarea', rows: 3 },
    ],
};
