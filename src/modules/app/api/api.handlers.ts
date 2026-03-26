import { jsonResponse, jsonError, requireApiAuth, getJsonBody, getApiId, getApiParam } from "./api.utils";
import { generateSlug } from "../shared";

// ---- Repositories ----
import { findAllPages, findPageById, insertPage, updatePage, deletePage, countPages } from "../pages/pages.repository";
import { findAllArticlesWithDetails, findArticleById, insertArticle, updateArticle, deleteArticle, findAllBlogCategories, findBlogCategoryById, insertBlogCategory, updateBlogCategory, deleteBlogCategory, countArticles } from "../blog/blog.repository";
import { findAllUsers, findUserById, findUserByEmail, insertUser, updateUser, updateUserPassword, deleteUser, countUsers } from "../users/users.repository";
import { findAllSettings, getSettingsMap, upsertSetting, findAllMenuItems, deleteAllMenuItems, insertMenuItem, findAllMedia, findMediaById, deleteMedia, authenticateUser, countTotalPageViews, countUniqueVisitors, countPageViewsLast7Days, countPageViewsPrevious7Days } from "../auth/auth.repository";
import { findAllRedirects, findRedirectById, insertRedirect, updateRedirect, deleteRedirect, toggleRedirectActive, countRedirects } from "../redirects/redirects.repository";

// ============================================================
// Bootstrap — POST /api/bootstrap (set API key, no auth needed, only works once)
// ============================================================

export function apiBootstrap(request: Request, response: Response): Response {
    if (request.method !== "post") {
        return jsonError(response, "Method not allowed", 405);
    }

    // Check if API key is already configured
    let existingKey = getConfig("API_KEY") ?? '';
    if (existingKey === '') {
        existingKey = getConfig("API_SECRET") ?? '';
    }
    if (existingKey === '') {
        const settings = getSettingsMap();
        existingKey = settings['api_key'] ?? '';
    }

    if (existingKey !== '') {
        return jsonError(response, "API key already configured. Use Bearer auth to manage settings.", 403);
    }

    const body = getJsonBody<Record<string, string>>(request);
    const apiKey = body.api_key ?? '';
    if (apiKey === '' || apiKey.length < 16) {
        return jsonError(response, "api_key is required (min 16 characters)", 400);
    }

    upsertSetting('api_key', apiKey);
    return jsonResponse(response, { success: true, message: "API key configured. Use Authorization: Bearer " + apiKey });
}

// ============================================================
// Auth Login — POST /api/auth/login (no Bearer required)
// ============================================================

export function apiAuthLogin(request: Request, response: Response): Response {
    if (request.method !== "post") {
        return jsonError(response, "Method not allowed", 405);
    }

    const body = getJsonBody<Record<string, string>>(request);
    const email = trim(body.email ?? '');
    const password = body.password ?? '';

    if (email === '' || password === '') {
        return jsonError(response, "Email and password are required", 400);
    }

    const user = authenticateUser(email, password);
    if (user === null) {
        return jsonError(response, "Invalid credentials", 401);
    }

    // Return the active API key (same logic as requireApiAuth)
    let apiKey = getConfig("API_KEY") ?? '';
    if (apiKey === '') {
        apiKey = getConfig("API_SECRET") ?? '';
    }
    if (apiKey === '') {
        const settings = getSettingsMap();
        apiKey = settings['api_key'] ?? '';
    }

    return jsonResponse(response, {
        data: {
            api_key: apiKey,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        },
    });
}

// ============================================================
// Dashboard — GET /api/dashboard
// ============================================================

export function apiDashboard(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    if (request.method !== "get") {
        return jsonError(response, "Method not allowed", 405);
    }

    const pageStats = countPages();
    const articleStats = countArticles();
    const userStats = countUsers();
    const mediaFiles = findAllMedia();
    const totalViews = countTotalPageViews();
    const visitors = countUniqueVisitors();
    const viewsThisWeek = countPageViewsLast7Days();
    const viewsLastWeek = countPageViewsPrevious7Days();

    let growth = "+0%";
    if (viewsLastWeek > 0) {
        const pct = round(((viewsThisWeek - viewsLastWeek) / viewsLastWeek) * 100);
        growth = (pct >= 0 ? "+" : "") + String(pct) + "%";
    }

    return jsonResponse(response, {
        data: {
            pages: pageStats,
            articles: articleStats,
            users: userStats,
            media_count: mediaFiles.length,
            views: {
                total: totalViews,
                unique_visitors: visitors,
                this_week: viewsThisWeek,
                last_week: viewsLastWeek,
                growth: growth,
            },
        },
    });
}

// ============================================================
// Pages — GET/POST /api/pages
// ============================================================

export function apiPages(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    if (request.method === "get") {
        const pages = findAllPages();
        return jsonResponse(response, {
            data: pages.map(p => ({
                id: p.id,
                title: p.title,
                slug: p.slug,
                content: p.content,
                status: p.status,
                author_id: p.author_id,
                sort_order: p.sort_order,
                meta_title: p.meta_title,
                meta_description: p.meta_description,
                author_name: p.author_name,
                created_at: p.created_at,
                updated_at: p.updated_at,
            })),
        });
    }

    if (request.method === "post") {
        const body = getJsonBody<Record<string, string>>(request);
        const title = trim(body.title ?? '');
        if (title === '') {
            return jsonError(response, "Title is required", 400);
        }

        const slug = (body.slug !== undefined && body.slug !== null && body.slug !== '')
            ? slugify(body.slug)
            : slugify(title);
        const content = body.content ?? '';
        const status = body.status ?? 'draft';
        const metaTitle = body.meta_title ?? '';
        const metaDescription = body.meta_description ?? '';

        insertPage(title, slug, content, status, auth.userId, metaTitle, metaDescription);

        const pages = findAllPages();
        const created = pages.length > 0 ? pages[0] : null;

        return jsonResponse(response, { data: created }, 201);
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Pages by ID — GET/PUT/DELETE /api/pages/:id
// ============================================================

export function apiPagesById(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    const id = getApiId(request);

    if (request.method === "get") {
        const page = findPageById(id);
        if (page === null) {
            return jsonError(response, "Page not found", 404);
        }
        return jsonResponse(response, { data: page });
    }

    if (request.method === "put") {
        const page = findPageById(id);
        if (page === null) {
            return jsonError(response, "Page not found", 404);
        }

        const body = getJsonBody<Record<string, string>>(request);
        const title = trim(body.title !== undefined ? body.title : page.title);
        const slug = (body.slug !== undefined && body.slug !== null && body.slug !== '')
            ? slugify(body.slug)
            : page.slug;
        const content = body.content !== undefined ? body.content : page.content;
        const status = body.status ?? page.status;
        const metaTitle = body.meta_title !== undefined ? body.meta_title : (page.meta_title ?? '');
        const metaDescription = body.meta_description !== undefined ? body.meta_description : (page.meta_description ?? '');

        updatePage(id, title, slug, content, status, metaTitle, metaDescription);

        const updated = findPageById(id);
        return jsonResponse(response, { data: updated });
    }

    if (request.method === "delete") {
        const page = findPageById(id);
        if (page === null) {
            return jsonError(response, "Page not found", 404);
        }
        deletePage(id);
        return jsonResponse(response, { success: true });
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Articles — GET/POST /api/articles
// ============================================================

export function apiArticles(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    if (request.method === "get") {
        const articles = findAllArticlesWithDetails();
        return jsonResponse(response, {
            data: articles.map(a => ({
                id: a.id,
                title: a.title,
                slug: a.slug,
                excerpt: a.excerpt,
                content: a.content,
                author_id: a.author_id,
                category_id: a.category_id,
                status: a.status,
                thumbnail_id: a.thumbnail_id,
                read_time: a.read_time,
                views: a.views,
                meta_title: a.meta_title,
                meta_description: a.meta_description,
                published_at: a.published_at,
                created_at: a.created_at,
                updated_at: a.updated_at,
                author_name: a.author_name,
                category_name: a.category_name,
                thumbnail_url: a.thumbnail_url,
            })),
        });
    }

    if (request.method === "post") {
        const body = getJsonBody<Record<string, string>>(request);
        const title = trim(body.title ?? '');
        if (title === '') {
            return jsonError(response, "Title is required", 400);
        }

        const slug = (body.slug !== undefined && body.slug !== null && body.slug !== '')
            ? slugify(body.slug)
            : slugify(title);
        const excerpt = body.excerpt ?? '';
        const content = body.content ?? '';
        const status = body.status ?? 'draft';
        const readTime = Number(body.read_time ?? '5');
        const metaTitle = body.meta_title ?? '';
        const metaDescription = body.meta_description ?? '';
        const publishedAt = body.published_at ?? '';
        const categoryId = (body.category_id !== undefined && body.category_id !== null && body.category_id !== '')
            ? Number(body.category_id) : null;
        const thumbnailId = (body.thumbnail_id !== undefined && body.thumbnail_id !== null && body.thumbnail_id !== '')
            ? Number(body.thumbnail_id) : null;

        insertArticle(title, slug, excerpt, content, auth.userId, categoryId, status, readTime, metaTitle, metaDescription, publishedAt, thumbnailId);

        const articles = findAllArticlesWithDetails();
        const created = articles.length > 0 ? articles[0] : null;

        return jsonResponse(response, { data: created }, 201);
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Articles by ID — GET/PUT/DELETE /api/articles/:id
// ============================================================

export function apiArticlesById(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    const id = getApiId(request);

    if (request.method === "get") {
        const article = findArticleById(id);
        if (article === null) {
            return jsonError(response, "Article not found", 404);
        }
        return jsonResponse(response, { data: article });
    }

    if (request.method === "put") {
        const article = findArticleById(id);
        if (article === null) {
            return jsonError(response, "Article not found", 404);
        }

        const body = getJsonBody<Record<string, string>>(request);
        const title = trim(body.title !== undefined ? body.title : article.title);
        const slug = (body.slug !== undefined && body.slug !== null && body.slug !== '')
            ? slugify(body.slug)
            : article.slug;
        const excerpt = body.excerpt !== undefined ? body.excerpt : (article.excerpt ?? '');
        const content = body.content !== undefined ? body.content : article.content;
        const status = body.status ?? article.status;
        const readTime = body.read_time !== undefined ? Number(body.read_time) : article.read_time;
        const metaTitle = body.meta_title !== undefined ? body.meta_title : (article.meta_title ?? '');
        const metaDescription = body.meta_description !== undefined ? body.meta_description : (article.meta_description ?? '');
        const publishedAt = body.published_at !== undefined ? body.published_at : (article.published_at ?? '');
        const categoryId = body.category_id !== undefined
            ? (body.category_id !== '' && body.category_id !== null ? Number(body.category_id) : null)
            : article.category_id;
        const thumbnailId = body.thumbnail_id !== undefined
            ? (body.thumbnail_id !== '' && body.thumbnail_id !== null ? Number(body.thumbnail_id) : null)
            : article.thumbnail_id;

        updateArticle(id, title, slug, excerpt, content, categoryId, status, readTime, metaTitle, metaDescription, publishedAt, thumbnailId);

        const updated = findArticleById(id);
        return jsonResponse(response, { data: updated });
    }

    if (request.method === "delete") {
        const article = findArticleById(id);
        if (article === null) {
            return jsonError(response, "Article not found", 404);
        }
        deleteArticle(id);
        return jsonResponse(response, { success: true });
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Blog Categories — GET/POST /api/blog-categories
// ============================================================

export function apiBlogCategories(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    if (request.method === "get") {
        const categories = findAllBlogCategories();
        return jsonResponse(response, { data: categories });
    }

    if (request.method === "post") {
        const body = getJsonBody<Record<string, string>>(request);
        const name = trim(body.name ?? '');
        if (name === '') {
            return jsonError(response, "Name is required", 400);
        }

        const slug = (body.slug !== undefined && body.slug !== null && body.slug !== '')
            ? slugify(body.slug)
            : slugify(name);
        const sortOrder = Number(body.sort_order ?? '0');

        insertBlogCategory(name, slug, sortOrder);

        const categories = findAllBlogCategories();
        return jsonResponse(response, { data: categories[categories.length - 1] }, 201);
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Blog Categories by ID — GET/PUT/DELETE /api/blog-categories/:id
// ============================================================

export function apiBlogCategoriesById(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    const id = getApiId(request);

    if (request.method === "get") {
        const cat = findBlogCategoryById(id);
        if (cat === null) {
            return jsonError(response, "Category not found", 404);
        }
        return jsonResponse(response, { data: cat });
    }

    if (request.method === "put") {
        const cat = findBlogCategoryById(id);
        if (cat === null) {
            return jsonError(response, "Category not found", 404);
        }

        const body = getJsonBody<Record<string, string>>(request);
        const name = trim(body.name !== undefined ? body.name : cat.name);
        const slug = (body.slug !== undefined && body.slug !== null && body.slug !== '')
            ? slugify(body.slug)
            : cat.slug;
        const sortOrder = body.sort_order !== undefined ? Number(body.sort_order) : cat.sort_order;

        updateBlogCategory(id, name, slug, sortOrder);

        const updated = findBlogCategoryById(id);
        return jsonResponse(response, { data: updated });
    }

    if (request.method === "delete") {
        const cat = findBlogCategoryById(id);
        if (cat === null) {
            return jsonError(response, "Category not found", 404);
        }
        deleteBlogCategory(id);
        return jsonResponse(response, { success: true });
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Users — GET/POST /api/users
// ============================================================

function stripPasswordHash(user: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(user)) {
        if (key !== 'password_hash') {
            result[key] = (user as Record<string, unknown>)[key];
        }
    }
    return result;
}

export function apiUsers(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    if (request.method === "get") {
        const users = findAllUsers();
        return jsonResponse(response, {
            data: users.map(u => ({
                id: u.id,
                name: u.name,
                email: u.email,
                role: u.role,
                status: u.status,
                avatar_url: u.avatar_url,
                last_login_at: u.last_login_at,
                created_at: u.created_at,
                updated_at: u.updated_at,
            })),
        });
    }

    if (request.method === "post") {
        const body = getJsonBody<Record<string, string>>(request);
        const name = trim(body.name ?? '');
        const email = trim(body.email ?? '');
        const password = body.password ?? '';

        if (name === '' || email === '') {
            return jsonError(response, "Name and email are required", 400);
        }
        if (password === '' || password.length < 6) {
            return jsonError(response, "Password is required (min 6 characters)", 400);
        }

        const existing = findUserByEmail(email);
        if (existing !== null) {
            return jsonError(response, "Email already exists", 409);
        }

        const role = body.role ?? 'user';
        const status = body.status ?? 'active';
        const passwordHash = hashPassword(password);

        insertUser(name, email, passwordHash, role, status);

        const users = findAllUsers();
        const created = users.length > 0 ? users[0] : null;

        if (created !== null) {
            return jsonResponse(response, {
                data: {
                    id: created.id,
                    name: created.name,
                    email: created.email,
                    role: created.role,
                    status: created.status,
                    created_at: created.created_at,
                },
            }, 201);
        }
        return jsonResponse(response, { data: null }, 201);
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Users by ID — GET/PUT/DELETE /api/users/:id
// ============================================================

export function apiUsersById(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    const id = getApiId(request);

    if (request.method === "get") {
        const user = findUserById(id);
        if (user === null) {
            return jsonError(response, "User not found", 404);
        }
        return jsonResponse(response, {
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                avatar_url: user.avatar_url,
                last_login_at: user.last_login_at,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
        });
    }

    if (request.method === "put") {
        const user = findUserById(id);
        if (user === null) {
            return jsonError(response, "User not found", 404);
        }

        const body = getJsonBody<Record<string, string>>(request);
        const name = trim(body.name !== undefined ? body.name : user.name);
        const email = trim(body.email !== undefined ? body.email : user.email);
        const role = body.role ?? user.role;
        const status = body.status ?? user.status;

        updateUser(id, name, email, role, status);

        if (body.password !== undefined && body.password !== null && body.password !== '') {
            if (body.password.length < 6) {
                return jsonError(response, "Password must be at least 6 characters", 400);
            }
            updateUserPassword(id, hashPassword(body.password));
        }

        const updated = findUserById(id);
        if (updated !== null) {
            return jsonResponse(response, {
                data: {
                    id: updated.id,
                    name: updated.name,
                    email: updated.email,
                    role: updated.role,
                    status: updated.status,
                    avatar_url: updated.avatar_url,
                    last_login_at: updated.last_login_at,
                    created_at: updated.created_at,
                    updated_at: updated.updated_at,
                },
            });
        }
        return jsonResponse(response, { data: null });
    }

    if (request.method === "delete") {
        const user = findUserById(id);
        if (user === null) {
            return jsonError(response, "User not found", 404);
        }
        deleteUser(id);
        return jsonResponse(response, { success: true });
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Media — GET /api/media
// ============================================================

export function apiMedia(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    if (request.method === "get") {
        const files = findAllMedia();
        return jsonResponse(response, {
            data: files.map(f => ({
                id: f.id,
                name: f.name,
                storage_path: f.storage_path,
                url: f.url,
                mime_type: f.mime_type,
                file_size: f.file_size,
                width: f.width,
                height: f.height,
                uploaded_by: f.uploaded_by,
                created_at: f.created_at,
            })),
        });
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Media by ID — GET/DELETE /api/media/:id
// ============================================================

export function apiMediaById(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    const id = getApiId(request);

    if (request.method === "get") {
        const media = findMediaById(id);
        if (media === null) {
            return jsonError(response, "Media not found", 404);
        }
        return jsonResponse(response, {
            data: {
                id: media.id,
                name: media.name,
                storage_path: media.storage_path,
                url: media.url,
                mime_type: media.mime_type,
                file_size: media.file_size,
                width: media.width,
                height: media.height,
                uploaded_by: media.uploaded_by,
                created_at: media.created_at,
            },
        });
    }

    if (request.method === "delete") {
        const media = findMediaById(id);
        if (media === null) {
            return jsonError(response, "Media not found", 404);
        }
        storageDelete(media.storage_path);
        deleteMedia(id);
        return jsonResponse(response, { success: true });
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Menu — GET/POST /api/menu
// ============================================================

export function apiMenu(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    if (request.method === "get") {
        const menuItems = findAllMenuItems();
        const topLevel = menuItems.filter(m => m.parent_id === null);
        const nested = topLevel.map(item => ({
            id: item.id,
            label: item.label,
            url: item.url,
            target: item.target,
            visible: item.visible,
            sort_order: item.sort_order,
            children: menuItems
                .filter(c => c.parent_id === item.id)
                .map(c => ({
                    id: c.id,
                    label: c.label,
                    url: c.url,
                    target: c.target,
                    visible: c.visible,
                    sort_order: c.sort_order,
                })),
        }));
        return jsonResponse(response, { data: nested });
    }

    if (request.method === "post") {
        const body = getJsonBody<{ items: Array<{ label: string; url: string; target: string; visible: boolean; children?: Array<{ label: string; url: string; target: string; visible: boolean }> }> }>(request);

        if (body.items === undefined || body.items === null) {
            return jsonError(response, "items array is required", 400);
        }

        deleteAllMenuItems();
        let sortOrder = 0;
        for (const item of body.items) {
            sortOrder++;
            const parentId = insertMenuItem(item.label, item.url, item.target ?? '_self', null, sortOrder, item.visible !== false);
            if (item.children !== undefined && item.children !== null) {
                let childOrder = 0;
                for (const child of item.children) {
                    childOrder++;
                    insertMenuItem(child.label, child.url, child.target ?? '_self', parentId, childOrder, child.visible !== false);
                }
            }
        }

        return jsonResponse(response, { success: true });
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Settings — GET/POST /api/settings
// ============================================================

export function apiSettings(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    if (request.method === "get") {
        const settingsMap = getSettingsMap();
        return jsonResponse(response, { data: settingsMap });
    }

    if (request.method === "post") {
        const body = getJsonBody<Record<string, string>>(request);
        const keys = Object.keys(body);
        for (const key of keys) {
            upsertSetting(key, String(body[key] ?? ''));
        }
        const updated = getSettingsMap();
        return jsonResponse(response, { data: updated });
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Settings by Key — GET /api/settings/:key
// ============================================================

export function apiSettingsByKey(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    if (request.method !== "get") {
        return jsonError(response, "Method not allowed", 405);
    }

    const key = getApiParam(request);
    const settingsMap = getSettingsMap();
    const value = settingsMap[key];

    if (value === undefined) {
        return jsonError(response, "Setting not found", 404);
    }

    return jsonResponse(response, { data: { key: key, value: value } });
}

// ============================================================
// Redirects — GET/POST /api/redirects
// ============================================================

export function apiRedirects(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    if (request.method === "get") {
        const redirects = findAllRedirects();
        return jsonResponse(response, { data: redirects });
    }

    if (request.method === "post") {
        const body = getJsonBody<Record<string, string>>(request);
        const sourcePath = trim(body.source_path ?? '');
        const targetUrl = trim(body.target_url ?? '');

        if (sourcePath === '' || targetUrl === '') {
            return jsonError(response, "source_path and target_url are required", 400);
        }

        const type = body.type ?? 'redirect';
        const statusCode = Number(body.status_code ?? '301');
        const isActive = body.is_active !== 'false';
        const sortOrder = Number(body.sort_order ?? '0');
        const note = body.note ?? '';

        insertRedirect(sourcePath, targetUrl, type, statusCode, isActive, sortOrder, note);

        const redirects = findAllRedirects();
        const created = redirects.length > 0 ? redirects[0] : null;
        return jsonResponse(response, { data: created }, 201);
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Redirects by ID — GET/PUT/DELETE /api/redirects/:id
// ============================================================

export function apiRedirectsById(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    const id = getApiId(request);

    if (request.method === "get") {
        const redirect = findRedirectById(id);
        if (redirect === null) {
            return jsonError(response, "Redirect not found", 404);
        }
        return jsonResponse(response, { data: redirect });
    }

    if (request.method === "put") {
        const redirect = findRedirectById(id);
        if (redirect === null) {
            return jsonError(response, "Redirect not found", 404);
        }

        const body = getJsonBody<Record<string, string>>(request);
        const sourcePath = trim(body.source_path !== undefined ? body.source_path : redirect.source_path);
        const targetUrl = trim(body.target_url !== undefined ? body.target_url : redirect.target_url);
        const type = body.type ?? redirect.type;
        const statusCode = body.status_code !== undefined ? Number(body.status_code) : redirect.status_code;
        const isActive = body.is_active !== undefined ? body.is_active !== 'false' : redirect.is_active;
        const sortOrder = body.sort_order !== undefined ? Number(body.sort_order) : redirect.sort_order;
        const note = body.note !== undefined ? body.note : (redirect.note ?? '');

        updateRedirect(id, sourcePath, targetUrl, type, statusCode, isActive, sortOrder, note);

        const updated = findRedirectById(id);
        return jsonResponse(response, { data: updated });
    }

    if (request.method === "delete") {
        const redirect = findRedirectById(id);
        if (redirect === null) {
            return jsonError(response, "Redirect not found", 404);
        }
        deleteRedirect(id);
        return jsonResponse(response, { success: true });
    }

    return jsonError(response, "Method not allowed", 405);
}

// ============================================================
// Redirects Toggle — POST /api/redirects/toggle/:id
// ============================================================

export function apiRedirectsToggle(request: Request, response: Response): Response {
    const auth = requireApiAuth(request, response);
    if (!auth) return response;

    if (request.method !== "post") {
        return jsonError(response, "Method not allowed", 405);
    }

    const id = getApiId(request);
    const redirect = findRedirectById(id);
    if (redirect === null) {
        return jsonError(response, "Redirect not found", 404);
    }

    toggleRedirectActive(id);

    const updated = findRedirectById(id);
    return jsonResponse(response, { data: updated });
}
