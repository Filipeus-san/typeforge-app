import { getReactPageTemplate } from "../../../react";
import { getPayloudData, getRouteParam, setFlash } from "../../../utils";
import { requireAdmin, getVisibleMenuItems, getSiteSettings } from "../shared";
import { findPageById, findPublishedPageBySlug, insertPage, updatePage, deletePage } from "./pages.repository";
import { findAllMedia } from "../auth/auth.repository";
import { t } from "../../../i18n";

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

// ---- Page Duplicate ----

export function handleAdminPageDuplicate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    const page = findPageById(id);

    if (page === null) {
        response.status = 302;
        response.headers["Location"] = "/admin/pages";
        return response;
    }

    const newTitle = page.title + ' ' + t().misc.copy;
    const newSlug = slugify(newTitle);
    insertPage(newTitle, newSlug, page.content, 'draft', auth.userId, page.meta_title ?? '', page.meta_description ?? '');

    response = setFlash('success', t().success.pageDuplicated, request, response);
    response.status = 302;
    response.headers["Location"] = "/admin/pages";
    return response;
}

// ---- Page Delete ----

export function handleAdminPageDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    deletePage(id);

    response = setFlash('success', t().success.pageDeleted, request, response);
    response.status = 302;
    response.headers["Location"] = "/admin/pages";
    return response;
}

// ---- Public Page ----

export function renderPage(request: Request, response: Response): Response {
    const slug = getRouteParam(request, "slug");
    const page = findPublishedPageBySlug(slug);

    if (page === null) {
        response.status = 404;
        response.content = "Page not found";
        return response;
    }

    const siteSettings = getSiteSettings();
    const pageTitle = (page.meta_title !== null && page.meta_title !== '') ? page.meta_title : page.title;

    response.content = getReactPageTemplate(pageTitle + ' — ' + siteSettings.siteName, "Page", {
        menuItems: getVisibleMenuItems(),
        siteSettings,
        title: page.title,
        content: page.content,
    }, {
        seo: {
            description: page.meta_description ?? '',
            canonicalUrl: "https://" + request.host + "/" + page.slug,
            ogType: 'website',
        },
    });
    return response;
}

// ---- Admin Pages ----

export function renderAdminPageCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const title = trim(raw.title ?? '');
        const slug = (raw.slug !== undefined && raw.slug !== null && raw.slug !== '')
            ? slugify(raw.slug)
            : slugify(title);
        const content = raw.content ?? '';
        const status = raw.status ?? 'draft';
        const metaTitle = raw.metaTitle ?? '';
        const metaDescription = raw.metaDescription ?? '';

        if (title === '') {
            response.content = getReactPageTemplate(t().pageTitles.pageCreate, "AdminPageBuilder", {
                isEdit: false,
                mediaImages: getMediaImages(),
                values: raw,
                error: t().errors.pageNameRequired,
            });
            return response;
        }

        insertPage(title, slug, content, status, auth.userId, metaTitle, metaDescription);
        response = setFlash('success', t().success.pageCreated, request, response);
        response.status = 302;
        response.headers["Location"] = "/admin/pages";
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.pageCreate, "AdminPageBuilder", {
        isEdit: false,
        mediaImages: getMediaImages(),
        values: { status: 'draft' },
    });
    return response;
}

export function renderAdminPageEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    const page = findPageById(id);

    if (page === null) {
        response.status = 302;
        response.headers["Location"] = "/admin/pages";
        return response;
    }

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const title = trim(raw.title ?? '');
        const slug = (raw.slug !== undefined && raw.slug !== null && raw.slug !== '')
            ? slugify(raw.slug)
            : slugify(title);
        const content = raw.content ?? '';
        const status = raw.status ?? 'draft';
        const metaTitle = raw.metaTitle ?? '';
        const metaDescription = raw.metaDescription ?? '';

        if (title === '') {
            response.content = getReactPageTemplate(t().pageTitles.pageEdit, "AdminPageBuilder", {
                isEdit: true,
                mediaImages: getMediaImages(),
                values: { ...raw, id: String(id) },
                error: t().errors.pageNameRequired,
            });
            return response;
        }

        updatePage(id, title, slug, content, status, metaTitle, metaDescription);
        response.content = getReactPageTemplate(t().pageTitles.pageEdit, "AdminPageBuilder", {
            isEdit: true,
            mediaImages: getMediaImages(),
            values: {
                id: String(id), title, slug, content, status, metaTitle, metaDescription,
            },
            success: t().success.pageSaved,
        });
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.pageEdit, "AdminPageBuilder", {
        isEdit: true,
        mediaImages: getMediaImages(),
        values: {
            id: String(page.id),
            title: page.title,
            slug: page.slug,
            content: page.content,
            status: page.status,
            metaTitle: page.meta_title ?? '',
            metaDescription: page.meta_description ?? '',
        },
    });
    return response;
}
