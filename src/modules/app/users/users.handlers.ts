import { getReactPageTemplate } from "../../../react";
import { getPayloudData, getRouteParam, setFlash } from "../../../utils";
import { requireAdmin, formatDateCz, getSiteSettings } from "../shared";
import { findAllUsers, findUserById, findUserByEmail, insertUser, updateUser, updateUserPassword, deleteUser, countUsers } from "./users.repository";
import { createPasswordResetToken } from "../auth/auth.repository";
import { getAppConfig } from "../../../config";
import { t } from "../../../i18n";

// ---- User Toggle Block ----

export function handleAdminUserToggleBlock(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    const user = findUserById(id);

    if (user !== null) {
        const newStatus = user.status === 'banned' ? 'active' : 'banned';
        updateUser(id, user.name, user.email, user.role, newStatus);
        const flashMsg = newStatus === 'banned' ? t().success.userBanned : t().success.userUnbanned;
        response = setFlash('success', flashMsg, request, response);
    }

    response.status = 302;
    response.headers["Location"] = "/admin/users";
    return response;
}

// ---- User Delete ----

export function handleAdminUserDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    deleteUser(id);

    response = setFlash('success', t().success.userDeleted, request, response);
    response.status = 302;
    response.headers["Location"] = "/admin/users";
    return response;
}

// ---- Send Password Reset Email ----

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

export function handleAdminUserSendResetEmail(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    const user = findUserById(id);

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

        sendResendEmail(user.email, t().misc.resetEmailSubject, htmlBody);
        response = setFlash('success', t().success.resetEmailSent + " " + user.email, request, response);
    } else {
        response = setFlash('error', t().errors.resetEmailFailed, request, response);
    }

    response.status = 302;
    response.headers["Location"] = "/admin/users";
    return response;
}

export function renderAdminUsers(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const users = findAllUsers();
    const stats = countUsers();

    response.content = getReactPageTemplate(t().pageTitles.users, "AdminUsers", {
        users: users.map(u => ({
            id: String(u.id),
            name: u.name,
            email: u.email,
            role: u.role,
            status: u.status,
            registeredAt: formatDateCz(u.created_at),
            lastLogin: u.last_login_at !== null ? formatDateCz(u.last_login_at) : '-',
            avatar: u.avatar_url ?? undefined,
            ordersCount: 0,
        })),
        stats: stats,
        flash: auth.flash,
    });
    return response;
}

export function renderAdminUserCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const name = trim(raw.name ?? '');
        const email = trim(raw.email ?? '');
        const password = raw.password ?? '';
        const passwordConfirm = raw.passwordConfirm ?? '';
        const role = raw.role ?? 'user';
        const status = raw.status ?? 'active';

        if (name === '' || email === '') {
            response.content = getReactPageTemplate(t().pageTitles.userCreate, "AdminUserForm", {
                isEdit: false, values: raw, error: t().errors.userNameEmailRequired,
            });
            return response;
        }
        if (password === '' || password.length < 6) {
            response.content = getReactPageTemplate(t().pageTitles.userCreate, "AdminUserForm", {
                isEdit: false, values: raw, error: t().errors.userPasswordMin,
            });
            return response;
        }
        if (password !== passwordConfirm) {
            response.content = getReactPageTemplate(t().pageTitles.userCreate, "AdminUserForm", {
                isEdit: false, values: raw, error: t().errors.userPasswordMismatch,
            });
            return response;
        }

        const existing = findUserByEmail(email);
        if (existing !== null) {
            response.content = getReactPageTemplate(t().pageTitles.userCreate, "AdminUserForm", {
                isEdit: false, values: raw, error: t().errors.userEmailExists,
            });
            return response;
        }

        const passwordHash = hashPassword(password);
        insertUser(name, email, passwordHash, role, status);
        response = setFlash('success', t().success.userCreated, request, response);
        response.status = 302;
        response.headers["Location"] = "/admin/users";
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.userCreate, "AdminUserForm", {
        isEdit: false,
        values: { role: 'user', status: 'active' },
    });
    return response;
}

export function renderAdminUserEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const idStr = getRouteParam(request, "id");
    const id = Number(idStr);
    const user = findUserById(id);

    if (user === null) {
        response.status = 302;
        response.headers["Location"] = "/admin/users";
        return response;
    }

    if (request.method === "post") {
        const raw = getPayloudData<Record<string, string>>(request);
        const name = trim(raw.name ?? '');
        const email = trim(raw.email ?? '');
        const password = raw.password ?? '';
        const passwordConfirm = raw.passwordConfirm ?? '';
        const role = raw.role ?? user.role;
        const status = raw.status ?? user.status;

        if (name === '' || email === '') {
            response.content = getReactPageTemplate(t().pageTitles.userEdit, "AdminUserForm", {
                isEdit: true, values: { ...raw, id: String(id) }, error: t().errors.userNameEmailRequired,
            });
            return response;
        }

        if (password !== '') {
            if (password.length < 6) {
                response.content = getReactPageTemplate(t().pageTitles.userEdit, "AdminUserForm", {
                    isEdit: true, values: { ...raw, id: String(id) }, error: t().errors.userPasswordMin,
                });
                return response;
            }
            if (password !== passwordConfirm) {
                response.content = getReactPageTemplate(t().pageTitles.userEdit, "AdminUserForm", {
                    isEdit: true, values: { ...raw, id: String(id) }, error: t().errors.userPasswordMismatch,
                });
                return response;
            }
            updateUserPassword(id, hashPassword(password));
        }

        updateUser(id, name, email, role, status);
        response.content = getReactPageTemplate(t().pageTitles.userEdit, "AdminUserForm", {
            isEdit: true,
            values: { id: String(id), name, email, role, status },
            success: t().success.userSaved,
        });
        return response;
    }

    response.content = getReactPageTemplate(t().pageTitles.userEdit, "AdminUserForm", {
        isEdit: true,
        values: {
            id: String(user.id),
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
        },
    });
    return response;
}
