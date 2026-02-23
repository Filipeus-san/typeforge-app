// =============================================================================
// Admin Media Module — Helpers
// =============================================================================

export function getMediaIcon(mimeType: string): string {
    if (stringStartsWith(mimeType, 'image/')) return 'image';
    if (stringStartsWith(mimeType, 'video/')) return 'camera-video';
    if (mimeType === 'application/pdf') return 'file-earmark-pdf';
    if (stringContains(mimeType, 'word') || stringContains(mimeType, 'document')) return 'file-earmark-word';
    if (stringContains(mimeType, 'zip') || stringContains(mimeType, 'archive') || stringContains(mimeType, 'compressed')) return 'file-earmark-zip';
    if (stringContains(mimeType, 'excel') || stringContains(mimeType, 'spreadsheet')) return 'file-earmark-excel';
    return 'file-earmark';
}

export function getMediaTypeFilter(mimeType: string): string {
    if (stringStartsWith(mimeType, 'image/')) return 'images';
    if (stringStartsWith(mimeType, 'video/')) return 'videos';
    return 'docs';
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return round(bytes / 1024, 1) + ' KB';
    return round(bytes / (1024 * 1024), 2) + ' MB';
}

export function formatMediaDate(dateStr: string): string {
    if (!dateStr) return '';
    const clean = dateStr.length > 19 ? dateStr.substring(0, 19) : dateStr;
    const ts = dateParse(clean, "YYYY-MM-DDTHH:mm:ss");
    if (ts > 0) {
        return dateFormat(ts, "DD. MM. YYYY HH:mm");
    }
    const ts2 = dateParse(clean, "YYYY-MM-DD HH:mm:ss");
    if (ts2 > 0) {
        return dateFormat(ts2, "DD. MM. YYYY HH:mm");
    }
    return dateStr;
}
