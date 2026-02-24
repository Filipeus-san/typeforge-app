// =============================================================================
// Blog Module — Constants
// =============================================================================

import { BLOG_T } from "./blog.translation";

export const BLOG_STATUS_FILTER_OPTIONS = [
    { value: '', label: BLOG_T.filters.allStatuses },
    { value: 'published', label: BLOG_T.filters.published },
    { value: 'draft', label: BLOG_T.filters.drafts }
];

export const DEFAULT_READ_TIME = 5;
