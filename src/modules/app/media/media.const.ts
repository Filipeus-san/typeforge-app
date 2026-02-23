// =============================================================================
// Media Module — Constants
// =============================================================================

import { MEDIA_T } from "./media.translation";

export const MEDIA_TYPE_FILTER_OPTIONS = [
    { value: '', label: MEDIA_T.filters.allTypes },
    { value: 'images', label: MEDIA_T.filters.images },
    { value: 'docs', label: MEDIA_T.filters.documents },
    { value: 'videos', label: MEDIA_T.filters.videos },
];

export const MEDIA_ACCEPT_TYPES = "image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.zip,.rar";
