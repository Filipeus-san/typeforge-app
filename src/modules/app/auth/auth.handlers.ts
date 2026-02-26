import { getReactPageTemplate } from "../../../react";
import { getPayloudData, getSession, setSession, clearSession } from "../../../utils";
import { transformValidate, ValidationError } from "../../../validator";
import { UserSession } from "../shared";
import { LoginForm, RegisterForm } from "./auth.validation";
import { findUserByEmail, findUserIdByEmail, insertUser } from "./auth.repository";
import { AUTH_T } from "./auth.translation";

export function renderIndex(request: Request, response: Response): Response {
    const session = getSession<UserSession>(request);
    const userName = session?.user ? `${session.user.firstName} ${session.user.lastName}` : null;
    response.content = getReactPageTemplate("TypeForge \u2014 AI Hosting pro Vibe Coding", "Landing", { userName });
    return response;
}

export function renderLogin(request: Request, response: Response): Response {
    // Already logged in — redirect to home
    const session = getSession<UserSession>(request);
    if (session?.user) {
        response.status = 302;
        response.headers["Location"] = "/";
        return response;
    }

    if (request.method === "post") {
        return handleLogin(request, response);
    }

    response.content = getReactPageTemplate(AUTH_T.titles.login, "Login", {});
    return response;
}

function handleLogin(request: Request, response: Response): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getReactPageTemplate(AUTH_T.titles.login, "Login", { error: AUTH_T.errors.invalidRequest });
        return response;
    }

    try {
        const data = transformValidate(LoginForm, raw);

        const user = findUserByEmail(data.email);
        if (!user || !verifyPassword(data.password, user.password_hash)) {
            response.content = getReactPageTemplate(AUTH_T.titles.login, "Login", { error: AUTH_T.errors.invalidCredentials, email: data.email });
            return response;
        }
        response = setSession<UserSession>({
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                isAdmin: user.is_admin,
                token: uniqueKey()
            }
        }, response);
        response.status = 302;
        response.headers["Location"] = "/";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? AUTH_T.errors.validationError;
            response.content = getReactPageTemplate(AUTH_T.titles.login, "Login", { error: firstError, email: raw.email });
            return response;
        }
        response.content = getReactPageTemplate(AUTH_T.titles.login, "Login", { error: AUTH_T.errors.genericError });
        return response;
    }
}

export function handleLogout(request: Request, response: Response): Response {
    response = clearSession(response);
    response.status = 302;
    response.headers["Location"] = "/";
    return response;
}

export function renderRegister(request: Request, response: Response): Response {
    // Already logged in — redirect to home
    const session = getSession<UserSession>(request);
    if (session?.user) {
        response.status = 302;
        response.headers["Location"] = "/";
        return response;
    }

    if (request.method === "post") {
        return handleRegister(request, response);
    }

    response.content = getReactPageTemplate(AUTH_T.titles.register, "Register", {});
    return response;
}

function handleRegister(request: Request, response: Response): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getReactPageTemplate(AUTH_T.titles.register, "Register", { error: AUTH_T.errors.invalidRequest });
        return response;
    }

    try {
        const data = transformValidate(RegisterForm, raw);

        if (data.password !== data.passwordConfirm) {
            response.content = getReactPageTemplate(AUTH_T.titles.register, "Register", { error: AUTH_T.errors.passwordMismatch, values: raw });
            return response;
        }

        const existingUser = findUserIdByEmail(data.email);
        if (existingUser) {
            response.content = getReactPageTemplate(AUTH_T.titles.register, "Register", { error: AUTH_T.errors.emailExists, values: raw });
            return response;
        }

        const passwordHash = hashPassword(data.password);

        const user = insertUser(data.firstName, data.lastName, data.email, passwordHash);

        if (!user) {
            response.content = getReactPageTemplate(AUTH_T.titles.register, "Register", { error: AUTH_T.errors.registrationFailed, values: raw });
            return response;
        }
        response = setSession<UserSession>({
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                isAdmin: user.is_admin,
                token: uniqueKey()
            }
        }, response);
        response.status = 302;
        response.headers["Location"] = "/";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? AUTH_T.errors.validationError;
            response.content = getReactPageTemplate(AUTH_T.titles.register, "Register", { error: firstError, values: raw });
            return response;
        }
        response.content = getReactPageTemplate(AUTH_T.titles.register, "Register", { error: AUTH_T.errors.genericError });
        return response;
    }
}
