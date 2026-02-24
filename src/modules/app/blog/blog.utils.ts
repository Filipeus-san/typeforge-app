// =============================================================================
// Blog Helpers
// =============================================================================

export function escapeHtmlBlog(str: string): string {
    if (!str) return '';
    return str
        .split('&').join('&amp;')
        .split('"').join('&quot;')
        .split("'").join('&#39;')
        .split('<').join('&lt;')
        .split('>').join('&gt;');
}

export function formatBlogDate(dateStr: string): string {
    if (!dateStr || dateStr.length < 10) return '-';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(5, 7);
    const day = dateStr.substring(8, 10);
    const d = Number(day);
    const m = Number(month);
    if (d > 0 && m > 0) return `${d}. ${m}. ${year}`;
    return '-';
}
