import { getReactPageTemplate } from "../../../react";
import { getPayloudData, getRouteParam, setFlash } from "../../../utils";
import { requireAdmin, formatDateCz } from "../shared";
import { findAllRedirects, findRedirectById, findRedirectBySourcePath, insertRedirect, updateRedirect, deleteRedirect, toggleRedirectActive, countRedirects } from "./redirects.repository";
import { findAllMedia } from "../auth/auth.repository";
import { t } from "../../../i18n";

function getMediaFiles(): Array<{ id: string; name: string; url: string; mimeType: string }> {
    const media = findAllMedia();
    return media.map(m => ({
        id: String(m.id),
        name: m.name,
        url: m.url,
        mimeType: m.mime_type,
    }));
}

// ---- List ----

export function renderAdminRedirects(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const redirects = findAllRedirects();
    const stats = countRedirects();

    response.content = getReactPageTemplate(t().pageTitles.redirects, "AdminRedirects", {
        redirects: redirects.map(r => ({
            id: String(r.id),
            sourcePath: r.source_path,
            targetUrl: r.target_url,
            type: r.type,
            statusCode: String(r.status_code),
            isActive: r.is_active,
            sortOrder: String(r.sort_order),
            note: r.note ?? '',
            createdAt: formatDateCz(r.created_at),
        })),
        stats: stats,
        flash: auth.flash,
    });
    return response;
}

// ---- Create ----

export function renderAdminRedirectCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const mediaFiles = getMediaFiles();

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const sourcePath = trim(raw.source_path ?? '');
        const targetUrl = trim(raw.target_url ?? '');
        const type = raw.type ?? 'redirect';
        const statusCode = Number(raw.status_code ?? '301');
        const isActive = raw.is_active === 'true' || raw.is_active === '1';
        const sortOrder = Number(raw.sort_order ?? '0');
        const note = trim(raw.note ?? '');

        if (sourcePath === '' || targetUrl === '') {
            response.content = getReactPageTemplate(t().pageTitles.redirectCreate, "AdminRedirectForm", {
                isEdit: false, values: raw, error: t().errors.redirectSourceTargetRequired, mediaFiles,
            });
            return response;
        }

        if (!stringStartsWith(sourcePath, '/')) {
            response.content = getReactPageTemplate(t().pageTitles.redirectCreate, "AdminRedirectForm", {
                isEdit: false, values: raw, error: t().errors.redirectSourceSlash, mediaFiles,
            });
            return response;
        }

        const existing = findRedirectBySourcePath(sourcePath);
        if (existing !== null) {
            response.content = getReactPageTemplate(t().pageTitles.redirectCreate, "AdminRedirectForm", {
                isEdit: false, values: raw, error: t().errors.redirectDuplicate, mediaFiles,
            });
            return response;
        }

        insertRedirect(sourcePath, targetUrl, type, statusCode, isActive, sortOrder, note);
        response = setFlash('success', t().success.redirectCreated, request, response);
        response.status = 302;
        response.headers["Location"] = "/admin/redirects";
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.redirectCreate, "AdminRedirectForm", {
        isEdit: false,
        values: { type: 'redirect', status_code: '301', is_active: 'true', sort_order: '0' },
        mediaFiles,
    });
    return response;
}

// ---- Edit ----

export function renderAdminRedirectEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    const redirect = findRedirectById(id);

    if (redirect === null) {
        response.status = 302;
        response.headers["Location"] = "/admin/redirects";
        return response;
    }

    const mediaFiles = getMediaFiles();

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const sourcePath = trim(raw.source_path ?? '');
        const targetUrl = trim(raw.target_url ?? '');
        const type = raw.type ?? 'redirect';
        const statusCode = Number(raw.status_code ?? '301');
        const isActive = raw.is_active === 'true' || raw.is_active === '1';
        const sortOrder = Number(raw.sort_order ?? '0');
        const note = trim(raw.note ?? '');

        if (sourcePath === '' || targetUrl === '') {
            response.content = getReactPageTemplate(t().pageTitles.redirectEdit, "AdminRedirectForm", {
                isEdit: true, values: { ...raw, id: String(id) }, error: t().errors.redirectSourceTargetRequired, mediaFiles,
            });
            return response;
        }

        if (!stringStartsWith(sourcePath, '/')) {
            response.content = getReactPageTemplate(t().pageTitles.redirectEdit, "AdminRedirectForm", {
                isEdit: true, values: { ...raw, id: String(id) }, error: t().errors.redirectSourceSlash, mediaFiles,
            });
            return response;
        }

        // Check uniqueness - exclude current record
        const existing = findRedirectBySourcePath(sourcePath);
        if (existing !== null && existing.id !== id) {
            response.content = getReactPageTemplate(t().pageTitles.redirectEdit, "AdminRedirectForm", {
                isEdit: true, values: { ...raw, id: String(id) }, error: t().errors.redirectDuplicate, mediaFiles,
            });
            return response;
        }

        updateRedirect(id, sourcePath, targetUrl, type, statusCode, isActive, sortOrder, note);
        response.content = getReactPageTemplate(t().pageTitles.redirectEdit, "AdminRedirectForm", {
            isEdit: true,
            values: {
                id: String(id), source_path: sourcePath, target_url: targetUrl,
                type, status_code: String(statusCode), is_active: String(isActive),
                sort_order: String(sortOrder), note,
            },
            success: t().success.redirectSaved, mediaFiles,
        });
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.redirectEdit, "AdminRedirectForm", {
        isEdit: true,
        values: {
            id: String(redirect.id),
            source_path: redirect.source_path,
            target_url: redirect.target_url,
            type: redirect.type,
            status_code: String(redirect.status_code),
            is_active: String(redirect.is_active),
            sort_order: String(redirect.sort_order),
            note: redirect.note ?? '',
        },
        mediaFiles,
    });
    return response;
}

// ---- Toggle Active ----

export function handleAdminRedirectToggle(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    const redirect = findRedirectById(id);

    if (redirect !== null) {
        toggleRedirectActive(id);
        const flashMsg = redirect.is_active ? t().success.redirectDeactivated : t().success.redirectActivated;
        response = setFlash('success', flashMsg, request, response);
    }

    response.status = 302;
    response.headers["Location"] = "/admin/redirects";
    return response;
}

// ---- Delete ----

export function handleAdminRedirectDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    deleteRedirect(id);

    response = setFlash('success', t().success.redirectDeleted, request, response);
    response.status = 302;
    response.headers["Location"] = "/admin/redirects";
    return response;
}
