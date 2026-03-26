import { getReactPageTemplate } from "../../../react";
import { getPayloudData, getRouteParam, setFlash } from "../../../utils";
import { requireAdmin, formatDateCz, getVisibleMenuItems, getSiteSettings } from "../shared";
import { findAllArticlesWithDetails, findArticleById, findArticleBySlug, findPublishedArticles, insertArticle, updateArticle, deleteArticle, findAllBlogCategories, countArticles } from "./blog.repository";
import { getSettingsMap, upsertSetting, findAllMedia } from "../auth/auth.repository";
import { t } from "../../../i18n";

// ---- RSS Feed ----

function escapeXml(text: string): string {
    let result = stringReplace(text, "&", "&amp;");
    result = stringReplace(result, "<", "&lt;");
    result = stringReplace(result, ">", "&gt;");
    result = stringReplace(result, '"', "&quot;");
    result = stringReplace(result, "'", "&apos;");
    return result;
}

function formatRfc822Date(isoDate: string): string {
    if (isoDate === undefined || isoDate === null || isoDate === '') return '';
    // Input: "2026-02-26 14:30:00" or "2026-02-26"
    const parts = stringSplit(isoDate, " ");
    const datePart = parts[0];
    const timePart = parts.length > 1 ? parts[1] : "00:00:00";
    const dateParts = stringSplit(datePart, "-");
    if (dateParts.length < 3) return isoDate;
    const year = dateParts[0];
    const month = Number(dateParts[1]);
    const day = dateParts[2];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthStr = months[month - 1];

    // RFC 822: "26 Feb 2026 14:30:00 +0000"
    return day + " " + monthStr + " " + year + " " + timePart + " +0000";
}

export function renderRssFeed(request: Request, response: Response): Response {
    const settingsMap = getSettingsMap();
    const rssEnabled = settingsMap['blog_rssEnabled'];

    if (rssEnabled === 'false') {
        response.status = 404;
        response.content = "RSS feed is disabled.";
        return response;
    }

    const siteSettings = getSiteSettings();
    const blogTitle = settingsMap['blog_blogTitle'];
    const blogDescription = settingsMap['blog_blogDescription'];
    const title = (blogTitle !== undefined && blogTitle !== '') ? blogTitle : siteSettings.siteName + ' — Blog';
    const description = (blogDescription !== undefined && blogDescription !== '') ? blogDescription : 'Nejnovější články';
    const siteUrl = "https://" + request.host;

    const articles = findPublishedArticles();

    let items = '';
    for (const article of articles) {
        const articleUrl = siteUrl + "/article/" + article.slug;
        const pubDate = article.published_at !== null && article.published_at !== ''
            ? formatRfc822Date(article.published_at)
            : formatRfc822Date(article.created_at);
        const excerptText = article.excerpt !== null && article.excerpt !== '' ? article.excerpt : '';

        items = items + `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(articleUrl)}</link>
      <guid isPermaLink="true">${escapeXml(articleUrl)}</guid>
      <description>${escapeXml(excerptText)}</description>
      <pubDate>${pubDate}</pubDate>`;
        if (article.author_name !== null && article.author_name !== '') {
            items = items + `
      <dc:creator>${escapeXml(article.author_name)}</dc:creator>`;
        }
        if (article.category_name !== null && article.category_name !== '') {
            items = items + `
      <category>${escapeXml(article.category_name)}</category>`;
        }
        items = items + `
    </item>
`;
    }

    const lastBuildDate = articles.length > 0
        ? formatRfc822Date(articles[0].published_at !== null && articles[0].published_at !== '' ? articles[0].published_at : articles[0].created_at)
        : '';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(siteUrl + "/blog")}</link>
    <description>${escapeXml(description)}</description>
    <language>cs</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(siteUrl + "/blog/rss")}" rel="self" type="application/rss+xml" />
${items}  </channel>
</rss>`;

    response.content = xml;
    response.contentType = "application/xml";
    return response;
}

// ---- Public Blog List ----

export function renderBlogList(request: Request, response: Response): Response {
    const articles = findPublishedArticles();
    const categories = findAllBlogCategories();

    function getAuthorInitials(name: string): string {
        const parts = stringSplit(name, " ");
        if (parts.length >= 2) {
            const first = parts[0];
            const last = parts[parts.length - 1];
            return toUpper(first.substring(0, 1) + last.substring(0, 1));
        }
        return toUpper(name.substring(0, 2));
    }

    const siteSettings = getSiteSettings();
    response.content = getReactPageTemplate('Blog — ' + siteSettings.siteName, "BlogList", {
        menuItems: getVisibleMenuItems(),
        siteSettings,
        categories: categories.map(c => ({ id: String(c.id), name: c.name, slug: c.slug })),
        posts: articles.map(a => {
            const rawDate = a.published_at !== null ? a.published_at : a.created_at;
            const dateParts = stringSplit(stringSplit(rawDate, " ")[0], "-");
            return {
                slug: a.slug,
                title: a.title,
                excerpt: a.excerpt ?? '',
                category: a.category_name ?? '',
                date: formatDateCz(rawDate),
                year: dateParts[0],
                month: dateParts[1],
                readTime: String(a.read_time),
                author: a.author_name ?? 'Admin',
                authorInitials: getAuthorInitials(a.author_name ?? 'Admin'),
                thumbnailUrl: a.thumbnail_url ?? undefined,
            };
        }),
    }, {
        seo: {
            description: 'Články a novinky z našeho blogu.',
            canonicalUrl: "https://" + request.host + "/blog",
            ogType: 'website',
        },
    });
    return response;
}

// ---- Public Article Detail ----

export function renderArticle(request: Request, response: Response): Response {
    const slug = getRouteParam(request, "slug");
    const article = findArticleBySlug(slug);

    if (article === null) {
        response.status = 404;
        response.content = "Article not found";
        return response;
    }

    function getAuthorInitials(name: string): string {
        const parts = stringSplit(name, " ");
        if (parts.length >= 2) {
            const first = parts[0];
            const last = parts[parts.length - 1];
            return toUpper(first.substring(0, 1) + last.substring(0, 1));
        }
        return toUpper(name.substring(0, 2));
    }

    const siteSettings = getSiteSettings();
    response.content = getReactPageTemplate(article.title + ' — ' + siteSettings.siteName, "Article", {
        menuItems: getVisibleMenuItems(),
        siteSettings,
        title: article.title,
        excerpt: article.excerpt ?? '',
        content: article.content,
        category: article.category_name ?? '',
        date: article.published_at !== null ? formatDateCz(article.published_at) : formatDateCz(article.created_at),
        readTime: String(article.read_time),
        author: article.author_name ?? 'Admin',
        authorInitials: getAuthorInitials(article.author_name ?? 'Admin'),
        thumbnailUrl: article.thumbnail_url ?? undefined,
    }, {
        seo: {
            description: article.meta_description !== null && article.meta_description !== '' ? article.meta_description : (article.excerpt ?? ''),
            canonicalUrl: "https://" + request.host + "/article/" + article.slug,
            ogType: 'article',
            article: {
                publishedTime: article.published_at ?? '',
                author: article.author_name ?? 'Admin',
                section: article.category_name ?? '',
            },
        },
    });
    return response;
}

// ---- Admin Blog List ----

export function renderAdminBlog(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const articles = findAllArticlesWithDetails();
    const stats = countArticles();

    response.content = getReactPageTemplate(t().pageTitles.blog, "AdminBlog", {
        posts: articles.map(a => ({
            id: String(a.id),
            title: a.title,
            slug: a.slug,
            excerpt: a.excerpt ?? '',
            status: a.status,
            author: a.author_name ?? 'Admin',
            category: a.category_name ?? '-',
            readTime: String(a.read_time),
            views: a.views,
            comments: 0,
            publishedAt: a.published_at !== null ? formatDateCz(a.published_at) : '-',
            thumbnail: a.thumbnail_url ?? undefined,
        })),
        stats: stats,
        flash: auth.flash,
    });
    return response;
}

function getMediaImages(): Array<{ id: string; name: string; url: string; dimensions?: string }> {
    const media = findAllMedia();
    const images: Array<{ id: string; name: string; url: string; dimensions?: string }> = [];
    for (const m of media) {
        if (stringStartsWith(m.mime_type, "image/")) {
            images.push({
                id: String(m.id),
                name: m.name,
                url: m.url,
                dimensions: (m.width !== null && m.height !== null) ? String(m.width) + "x" + String(m.height) : undefined,
            });
        }
    }
    return images;
}

// ---- Blog Create ----

export function renderAdminBlogCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const categories = findAllBlogCategories();

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const title = trim(raw.title ?? '');
        const slug = (raw.slug !== undefined && raw.slug !== null && raw.slug !== '')
            ? slugify(raw.slug) : slugify(title);
        const excerpt = raw.excerpt ?? '';
        const content = raw.content ?? '';
        const status = raw.status ?? 'draft';
        const categoryId = (raw.categoryId !== undefined && raw.categoryId !== '') ? Number(raw.categoryId) : null;
        const readTime = Number(raw.readTime ?? '5');
        const metaTitle = raw.metaTitle ?? '';
        const metaDescription = raw.metaDescription ?? '';
        const publishedAt = raw.publishedAt ?? '';
        const thumbnailId = (raw.thumbnailId !== undefined && raw.thumbnailId !== '') ? Number(raw.thumbnailId) : null;

        if (title === '') {
            response.content = getReactPageTemplate(t().pageTitles.blogCreate, "AdminBlogBuilder", {
                isEdit: false,
                categories: categories.map(c => ({ value: String(c.id), label: c.name })),
                mediaImages: getMediaImages(),
                values: raw,
                error: t().errors.blogTitleRequired,
            });
            return response;
        }

        insertArticle(title, slug, excerpt, content, auth.userId, categoryId, status, readTime, metaTitle, metaDescription, publishedAt, thumbnailId);
        response = setFlash('success', t().success.blogCreated, request, response);
        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.blogCreate, "AdminBlogBuilder", {
        isEdit: false,
        categories: categories.map(c => ({ value: String(c.id), label: c.name })),
        mediaImages: getMediaImages(),
        values: { status: 'draft', readTime: '5' },
    });
    return response;
}

// ---- Blog Edit ----

export function renderAdminBlogEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    const article = findArticleById(id);

    if (article === null) {
        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    }

    const categories = findAllBlogCategories();

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const title = trim(raw.title ?? '');
        const slug = (raw.slug !== undefined && raw.slug !== null && raw.slug !== '')
            ? slugify(raw.slug) : slugify(title);
        const excerpt = raw.excerpt ?? '';
        const content = raw.content ?? '';
        const status = raw.status ?? 'draft';
        const categoryId = (raw.categoryId !== undefined && raw.categoryId !== '') ? Number(raw.categoryId) : null;
        const readTime = Number(raw.readTime ?? '5');
        const metaTitle = raw.metaTitle ?? '';
        const metaDescription = raw.metaDescription ?? '';
        const publishedAt = raw.publishedAt ?? '';
        const thumbnailId = (raw.thumbnailId !== undefined && raw.thumbnailId !== '') ? Number(raw.thumbnailId) : null;

        if (title === '') {
            response.content = getReactPageTemplate(t().pageTitles.blogEdit, "AdminBlogBuilder", {
                isEdit: true,
                categories: categories.map(c => ({ value: String(c.id), label: c.name })),
                mediaImages: getMediaImages(),
                values: { ...raw, id: String(id) },
                error: t().errors.blogTitleRequired,
            });
            return response;
        }

        updateArticle(id, title, slug, excerpt, content, categoryId, status, readTime, metaTitle, metaDescription, publishedAt, thumbnailId);
        response.content = getReactPageTemplate(t().pageTitles.blogEdit, "AdminBlogBuilder", {
            isEdit: true,
            categories: categories.map(c => ({ value: String(c.id), label: c.name })),
            mediaImages: getMediaImages(),
            values: {
                id: String(id), title, slug, excerpt, content, status,
                categoryId: categoryId !== null ? String(categoryId) : '',
                readTime: String(readTime), publishedAt, metaTitle, metaDescription,
                thumbnailId: thumbnailId !== null ? String(thumbnailId) : '',
            },
            success: t().success.blogSaved,
        });
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.blogEdit, "AdminBlogBuilder", {
        isEdit: true,
        categories: categories.map(c => ({ value: String(c.id), label: c.name })),
        mediaImages: getMediaImages(),
        values: {
            id: String(article.id),
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt ?? '',
            content: article.content,
            status: article.status,
            categoryId: article.category_id !== null ? String(article.category_id) : '',
            readTime: String(article.read_time),
            publishedAt: article.published_at ?? '',
            metaTitle: article.meta_title ?? '',
            metaDescription: article.meta_description ?? '',
            thumbnailId: article.thumbnail_id !== null ? String(article.thumbnail_id) : '',
        },
    });
    return response;
}

// ---- Blog Duplicate ----

export function handleAdminBlogDuplicate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    const article = findArticleById(id);

    if (article === null) {
        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    }

    const newTitle = article.title + ' ' + t().misc.copy;
    const newSlug = slugify(newTitle);
    insertArticle(
        newTitle, newSlug, article.excerpt ?? '', article.content,
        auth.userId, article.category_id, 'draft',
        article.read_time, article.meta_title ?? '', article.meta_description ?? '', '',
        article.thumbnail_id
    );

    response = setFlash('success', t().success.blogDuplicated, request, response);
    response.status = 302;
    response.headers["Location"] = "/admin/blog";
    return response;
}

// ---- Blog Delete ----

export function handleAdminBlogDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    deleteArticle(id);

    response = setFlash('success', t().success.blogDeleted, request, response);
    response.status = 302;
    response.headers["Location"] = "/admin/blog";
    return response;
}

// ---- Blog Settings ----

export function renderAdminBlogSettings(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    let success: string | undefined;

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const keys = ['blogTitle', 'blogDescription', 'postsPerPage', 'excerptLength', 'defaultAuthor', 'dateFormat', 'metaTitle', 'metaDescription', 'ogImage'];
        const boolKeys = ['commentsEnabled', 'commentModeration', 'rssEnabled', 'socialSharing', 'relatedPosts', 'readTime'];

        for (const key of keys) {
            upsertSetting('blog_' + key, raw[key] ?? '');
        }
        for (const key of boolKeys) {
            const val = raw[key];
            upsertSetting('blog_' + key, (val !== undefined && val !== null && val !== '') ? 'true' : 'false');
        }
        success = t().success.blogSettingsSaved;
    }

    const settingsMap = getSettingsMap();
    response.content = getReactPageTemplate(t().pageTitles.blogSettings, "AdminBlogSettings", {
        values: {
            blogTitle: settingsMap['blog_blogTitle'] ?? '',
            blogDescription: settingsMap['blog_blogDescription'] ?? '',
            postsPerPage: settingsMap['blog_postsPerPage'] ?? '10',
            excerptLength: settingsMap['blog_excerptLength'] ?? '160',
            defaultAuthor: settingsMap['blog_defaultAuthor'] ?? '',
            dateFormat: settingsMap['blog_dateFormat'] ?? 'DD. MM. YYYY',
            commentsEnabled: settingsMap['blog_commentsEnabled'] !== 'false',
            commentModeration: settingsMap['blog_commentModeration'] !== 'false',
            rssEnabled: settingsMap['blog_rssEnabled'] !== 'false',
            socialSharing: settingsMap['blog_socialSharing'] !== 'false',
            relatedPosts: settingsMap['blog_relatedPosts'] !== 'false',
            readTime: settingsMap['blog_readTime'] !== 'false',
            metaTitle: settingsMap['blog_metaTitle'] ?? '',
            metaDescription: settingsMap['blog_metaDescription'] ?? '',
            ogImage: settingsMap['blog_ogImage'] ?? '',
        },
        success: success,
    });
    return response;
}
