import { getReactPageTemplate } from "../../../react";
import { getPayloudData, getSession, setSession, clearSession, getRouteParam, setFlash } from "../../../utils";
import { requireAdmin, requireAuth, formatDateCz, initializeLanguage } from "../shared";
import { authenticateUser, getSettingsMap, upsertSetting, findAllMenuItems, deleteAllMenuItems, insertMenuItem, findAllMedia, insertMedia, findMediaById, deleteMedia, findUserByEmail, createPasswordResetToken, findValidResetToken, markResetTokenUsed } from "./auth.repository";
import { countTotalPageViews, countUniqueVisitors, countPageViewsLast7Days, countPageViewsPrevious7Days } from "./auth.repository";
import { findAllPages } from "../pages/pages.repository";
import { countPages, findRecentPages, findAllPublishedPages } from "../pages/pages.repository";
import { findAllArticlesWithDetails } from "../blog/blog.repository";
import { findUserById, updateUserProfile, updateUserPassword, updateUserAvatar } from "../users/users.repository";
import { getAppConfig } from "../../../config";
import { getSiteSettings } from "../shared";
import { t } from "../../../i18n";

// ---- Logout ----

export function handleAdminLogout(request: Request, response: Response): Response {
    response = clearSession(response);
    response.status = 302;
    response.headers["Location"] = "/admin/login";
    return response;
}

// ---- Login ----

export function renderAdminLogin(request: Request, response: Response): Response {
    initializeLanguage();

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const email = trim(raw.username ?? '');
        const password = raw.password ?? '';

        if (email === '' || password === '') {
            response.content = getReactPageTemplate(t().pageTitles.login, "AdminLogin", {
                error: t().errors.loginBothFields,
                values: { username: email },
            });
            return response;
        }

        const user = authenticateUser(email, password);
        if (user !== null) {
            response = setSession({
                userId: user.id,
                email: user.email,
                role: user.role,
                token: uniqueKey(),
            }, response);
            response.status = 302;
            response.headers["Location"] = "/admin";
            return response;
        }

        response.content = getReactPageTemplate(t().pageTitles.login, "AdminLogin", {
            error: t().errors.loginInvalidCredentials,
            values: { username: email },
        });
        return response;
    }

    const session = getSession(request);
    if (session !== null) {
        response.status = 302;
        response.headers["Location"] = "/admin";
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.login, "AdminLogin", {});
    return response;
}

// ---- Dashboard ----

export function renderAdminDashboard(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const totalPages = countPages();
    const totalViews = countTotalPageViews();
    const visitors = countUniqueVisitors();
    const viewsThisWeek = countPageViewsLast7Days();
    const viewsLastWeek = countPageViewsPrevious7Days();

    let growth = "+0%";
    if (viewsLastWeek > 0) {
        const pct = round(((viewsThisWeek - viewsLastWeek) / viewsLastWeek) * 100);
        growth = (pct >= 0 ? "+" : "") + String(pct) + "%";
    }

    const recentPages = findRecentPages(5);

    response.content = getReactPageTemplate(t().pageTitles.dashboard, "AdminDashboard", {
        stats: {
            pages: totalPages,
            views: totalViews,
            growth: growth,
            visitors: visitors,
        },
        recentPages: recentPages.map(p => ({
            title: p.title,
            status: p.status,
            updated: formatDateCz(p.updated_at),
        })),
    });
    return response;
}

// ---- Pages List ----

export function renderAdminPages(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const allPages = findAllPages();

    response.content = getReactPageTemplate(t().pageTitles.pages, "AdminPages", {
        pages: allPages.map(p => ({
            id: String(p.id),
            title: p.title,
            slug: p.slug,
            status: p.status,
            author: p.author_name ?? 'Admin',
            updated: formatDateCz(p.updated_at),
        })),
        flash: auth.flash,
    });
    return response;
}

// ---- Settings ----

export function renderAdminSettings(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    let success: string | undefined;

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const settingsKeys = ['siteName', 'siteDescription', 'siteUrl', 'contactEmail', 'language', 'postsPerPage', 'homepageId'];
        const boolKeys = ['maintenanceMode', 'registrationEnabled', 'analyticsEnabled'];

        for (const key of settingsKeys) {
            upsertSetting(key, raw[key] ?? '');
        }
        for (const key of boolKeys) {
            const val = raw[key];
            upsertSetting(key, (val !== undefined && val !== null && val !== '') ? 'true' : 'false');
        }
        success = t().success.settingsSaved;
    }

    const settingsMap = getSettingsMap();
    const publishedPages = findAllPublishedPages();
    response.content = getReactPageTemplate(t().pageTitles.settings, "AdminSettings", {
        values: {
            siteName: settingsMap['siteName'] ?? '',
            siteDescription: settingsMap['siteDescription'] ?? '',
            siteUrl: settingsMap['siteUrl'] ?? '',
            contactEmail: settingsMap['contactEmail'] ?? '',
            language: settingsMap['language'] ?? 'cs',
            postsPerPage: settingsMap['postsPerPage'] ?? '10',
            homepageId: settingsMap['homepageId'] ?? '',
            maintenanceMode: settingsMap['maintenanceMode'] === 'true',
            registrationEnabled: settingsMap['registrationEnabled'] !== 'false',
            analyticsEnabled: settingsMap['analyticsEnabled'] !== 'false',
        },
        pages: publishedPages.map(p => ({ id: String(p.id), title: p.title })),
        success: success,
    });
    return response;
}

// ---- Menu ----

export function renderAdminMenu(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    let success: string | undefined;

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const menuJson = raw['menuData'] ?? '';
        if (menuJson !== '') {
            deleteAllMenuItems();
            const items = jsonDecode<Array<{ label: string; url: string; target: string; visible: boolean; children?: Array<{ label: string; url: string; target: string; visible: boolean }> }>>(menuJson);
            let sortOrder = 0;
            for (const item of items) {
                sortOrder++;
                const parentId = insertMenuItem(item.label, item.url, item.target, null, sortOrder, item.visible);
                if (item.children) {
                    let childOrder = 0;
                    for (const child of item.children) {
                        childOrder++;
                        insertMenuItem(child.label, child.url, child.target, parentId, childOrder, child.visible);
                    }
                }
            }
            success = t().success.menuSaved;
        }
    }

    const menuItems = findAllMenuItems();
    const topLevel = menuItems.filter(m => m.parent_id === null);
    const nested = topLevel.map(item => ({
        id: String(item.id),
        label: item.label,
        url: item.url,
        target: item.target,
        visible: item.visible,
        children: menuItems
            .filter(c => c.parent_id === item.id)
            .map(c => ({
                id: String(c.id),
                label: c.label,
                url: c.url,
                target: c.target,
                visible: c.visible,
            })),
    }));

    const allPages = findAllPages();
    const allArticles = findAllArticlesWithDetails();

    response.content = getReactPageTemplate(t().pageTitles.menu, "AdminMenu", {
        items: nested,
        success: success,
        pages: allPages.map(p => ({ title: p.title, slug: p.slug, status: p.status })),
        articles: allArticles.map(a => ({ title: a.title, slug: a.slug, status: a.status })),
    });
    return response;
}

// ---- Media ----

function getMediaType(mimeType: string): string {
    if (stringStartsWith(mimeType, "image/")) return "image";
    if (mimeType === "application/pdf") return "pdf";
    if (stringStartsWith(mimeType, "video/")) return "video";
    if (stringStartsWith(mimeType, "audio/")) return "audio";
    return "other";
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return String(bytes) + " B";
    if (bytes < 1024 * 1024) return String(round(bytes / 1024, 1)) + " KB";
    return String(round(bytes / (1024 * 1024), 1)) + " MB";
}

export function renderAdminMedia(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const mediaFiles = findAllMedia();

    response.content = getReactPageTemplate(t().pageTitles.media, "AdminMedia", {
        files: mediaFiles.map(f => ({
            id: String(f.id),
            name: f.name,
            url: f.url,
            type: getMediaType(f.mime_type),
            size: formatFileSize(f.file_size),
            dimensions: (f.width !== null && f.height !== null) ? String(f.width) + "x" + String(f.height) : undefined,
            uploaded: formatDateCz(f.created_at),
        })),
        flash: auth.flash,
    });
    return response;
}

// ---- Media Upload ----

export function handleAdminMediaUpload(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const fileList = request.files["file"];
    if (fileList !== undefined && fileList !== null) {
        for (const tempPath of fileList) {
            // Get original filename from the temp path
            const parts = stringSplit(tempPath, "/");
            const tempFileName = parts[parts.length - 1];

            // Detect content type
            const mimeType = fileContentType(tempPath);

            // Read file content using binary io (fileRead validates UTF-8)
            const fh = io.open(tempPath, "rb");
            if (fh === null) continue;
            const content = fh.read("*a");
            fh.close();
            const fileSize = content.length;

            // Generate unique storage path
            const storagePath = "media/" + uniqueKey() + "-" + tempFileName;

            // Upload to cloud storage (Lua strings are byte sequences, works for binary)
            storageUpload(storagePath, content, mimeType);

            // Get public URL
            const url = storageGetUrl(storagePath);

            // Get image dimensions if applicable
            let width: number | null = null;
            let height: number | null = null;
            if (stringStartsWith(mimeType, "image/") && mimeType !== "image/svg+xml") {
                const info = imageInfo(tempPath);
                if (info !== null) {
                    width = info.width;
                    height = info.height;
                }
            }

            // Insert into database
            insertMedia(tempFileName, storagePath, url, mimeType, fileSize, width, height, auth.userId);

            // Clean up temp file
            fileDelete(tempPath);
        }
    }

    response = setFlash('success', t().success.mediaUploaded, request, response);
    response.status = 302;
    response.headers["Location"] = "/admin/media";
    return response;
}

// ---- Media Delete ----

export function handleAdminMediaDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    const media = findMediaById(id);

    if (media !== null) {
        // Delete from cloud storage
        storageDelete(media.storage_path);
        // Delete from database
        deleteMedia(id);
    }

    response = setFlash('success', t().success.mediaDeleted, request, response);
    response.status = 302;
    response.headers["Location"] = "/admin/media";
    return response;
}

// ---- Profile ----

export function renderAdminProfile(request: Request, response: Response): Response {
    const auth = requireAuth(request, response);
    if (!auth) return response;

    const user = findUserById(auth.userId);
    if (user === null) {
        response.status = 302;
        response.headers["Location"] = "/admin/login";
        return response;
    }

    // Get image media for avatar picker
    const allMedia = findAllMedia();
    const imageMedia = allMedia.filter(m => stringStartsWith(m.mime_type, "image/"));

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const name = trim(raw.name ?? '');
        const email = trim(raw.email ?? '');
        const password = raw.password ?? '';
        const passwordConfirm = raw.passwordConfirm ?? '';
        const avatarUrl = raw.avatar_url ?? '';

        if (name === '' || email === '') {
            response.content = getReactPageTemplate(t().pageTitles.profile, "AdminProfile", {
                values: { name, email, avatar_url: avatarUrl },
                error: t().errors.profileNameEmailRequired,
                mediaImages: imageMedia.map(m => ({ id: String(m.id), url: m.url, name: m.name })),
            });
            return response;
        }

        if (password !== '') {
            if (password.length < 6) {
                response.content = getReactPageTemplate(t().pageTitles.profile, "AdminProfile", {
                    values: { name, email, avatar_url: avatarUrl },
                    error: t().errors.profilePasswordMin,
                    mediaImages: imageMedia.map(m => ({ id: String(m.id), url: m.url, name: m.name })),
                });
                return response;
            }
            if (password !== passwordConfirm) {
                response.content = getReactPageTemplate(t().pageTitles.profile, "AdminProfile", {
                    values: { name, email, avatar_url: avatarUrl },
                    error: t().errors.profilePasswordMismatch,
                    mediaImages: imageMedia.map(m => ({ id: String(m.id), url: m.url, name: m.name })),
                });
                return response;
            }
            updateUserPassword(auth.userId, hashPassword(password));
        }

        updateUserProfile(auth.userId, name, email);
        updateUserAvatar(auth.userId, avatarUrl !== '' ? avatarUrl : null);

        response.content = getReactPageTemplate(t().pageTitles.profile, "AdminProfile", {
            values: { name, email, avatar_url: avatarUrl !== '' ? avatarUrl : undefined },
            success: t().success.profileSaved,
            mediaImages: imageMedia.map(m => ({ id: String(m.id), url: m.url, name: m.name })),
        });
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.profile, "AdminProfile", {
        values: {
            name: user.name,
            email: user.email,
            avatar_url: user.avatar_url ?? undefined,
        },
        mediaImages: imageMedia.map(m => ({ id: String(m.id), url: m.url, name: m.name })),
    });
    return response;
}

// ---- Forgot Password ----

function sendResendEmail(to: string, subject: string, htmlBody: string): boolean {
    const config = getAppConfig();
    if (!config.resend.enable || config.resend.apiSecret === '') {
        logError("Resend is not configured");
        return false;
    }

    const payload = jsonEncode({
        from: "noreply@cloud-run.filipeus.cz",
        to: [to],
        subject: subject,
        html: htmlBody,
    });

    const result = httpRequest({
        url: "https://api.resend.com/emails",
        method: "POST",
        headers: {
            "Authorization": "Bearer " + config.resend.apiSecret,
            "Content-Type": "application/json",
        },
        body: payload,
    });

    if (result.status >= 200 && result.status < 300) {
        logInfo("Password reset email sent to " + to);
        return true;
    }

    logError("Failed to send email via Resend: " + String(result.status) + " " + result.body);
    return false;
}

export function renderForgotPassword(request: Request, response: Response): Response {
    initializeLanguage();

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const email = trim(raw.email ?? '');

        if (email === '') {
            response.content = getReactPageTemplate(t().pageTitles.forgotPassword, "ForgotPassword", {
                error: t().errors.forgotPasswordEmailRequired,
            });
            return response;
        }

        // Always show success message to prevent email enumeration
        const user = findUserByEmail(email);
        if (user !== null && user.status === 'active') {
            const token = uniqueKey();
            createPasswordResetToken(user.id, token);

            const siteSettings = getSiteSettings();
            const resetUrl = (siteSettings.siteUrl !== '' ? siteSettings.siteUrl : ("https://" + request.host)) + "/admin/reset-password?token=" + token;

            const siteName = siteSettings.siteName !== '' ? siteSettings.siteName : 'Lorem';

            const htmlBody = "<!DOCTYPE html><html><body style=\"font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px\">"
                + "<h2 style=\"color:#7c5cfc\">" + siteName + "</h2>"
                + "<p>" + t().misc.resetEmailGreeting + " " + user.name + ",</p>"
                + "<p>" + t().misc.resetEmailText + "</p>"
                + "<p style=\"text-align:center;margin:30px 0\">"
                + "<a href=\"" + resetUrl + "\" style=\"background:linear-gradient(135deg,#7c5cfc,#06d6a0);color:#fff;padding:12px 30px;border-radius:8px;text-decoration:none;font-weight:bold\">"
                + t().misc.resetEmailButton + "</a></p>"
                + "<p style=\"color:#666;font-size:14px\">" + t().misc.resetEmailExpiry + "</p>"
                + "<p style=\"color:#999;font-size:12px\">" + t().misc.resetEmailIgnore + "</p>"
                + "</body></html>";

            sendResendEmail(email, t().misc.resetEmailSubject, htmlBody);
        }

        response.content = getReactPageTemplate(t().pageTitles.forgotPassword, "ForgotPassword", {
            success: t().success.forgotPasswordSent,
        });
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.forgotPassword, "ForgotPassword", {});
    return response;
}

// ---- Reset Password ----

export function renderResetPassword(request: Request, response: Response): Response {
    initializeLanguage();

    const queryParams = parseUrlQuery<Record<string, string>>(request.query);
    const token = queryParams.token ?? '';

    if (token === '') {
        response.content = getReactPageTemplate(t().pageTitles.resetPassword, "ResetPassword", {
            error: t().errors.resetPasswordInvalidToken,
        });
        return response;
    }

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const password = raw.password ?? '';
        const passwordConfirm = raw.passwordConfirm ?? '';

        if (password === '' || password.length < 6) {
            response.content = getReactPageTemplate(t().pageTitles.resetPassword, "ResetPassword", {
                token: token,
                error: t().errors.resetPasswordMin,
            });
            return response;
        }

        if (password !== passwordConfirm) {
            response.content = getReactPageTemplate(t().pageTitles.resetPassword, "ResetPassword", {
                token: token,
                error: t().errors.resetPasswordMismatch,
            });
            return response;
        }

        const resetToken = findValidResetToken(token);
        if (resetToken === null) {
            response.content = getReactPageTemplate(t().pageTitles.resetPassword, "ResetPassword", {
                error: t().errors.resetPasswordInvalidToken,
            });
            return response;
        }

        updateUserPassword(resetToken.user_id, hashPassword(password));
        markResetTokenUsed(resetToken.id);

        response.content = getReactPageTemplate(t().pageTitles.resetPassword, "ResetPassword", {
            success: t().success.resetPasswordDone,
        });
        return response;
    }

    // Verify token is valid before showing form
    const resetToken = findValidResetToken(token);
    if (resetToken === null) {
        response.content = getReactPageTemplate(t().pageTitles.resetPassword, "ResetPassword", {
            error: t().errors.resetPasswordInvalidToken,
        });
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.resetPassword, "ResetPassword", {
        token: token,
    });
    return response;
}
