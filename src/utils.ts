import { RouterPaths } from "./modules/types";
import { getAppConfig } from "./config";

export function app<T>(t: new () => T): T {
    return new t();
}

export function getPayloudData<T>(request: Request): T | null {
    if (request.headers["content-type"] == "application/x-www-form-urlencoded" && request.payload) {
        return parseUrlQuery<T>(request.payload);
    } else  if ( request.payload) {
        return jsonDecode<T>(request.payload);
    }

    return request.payload as T || null;
}

export function setCookie(cookieObject: Record<string, string>, response: Response, options?: CookieOptions): Response {
    let cookie = buildUrlQuery(cookieObject);

    if (!options) {
        response.headers["Set-Cookie"] = cookie;
        return response;
    }

    if (options.maxAge !== undefined) {
        cookie += `; Max-Age=${options.maxAge}`;
    }
    if (options.expires) {
        cookie += `; Expires=${options.expires.toUTCString()}`;
    }
    if (options.domain) {
        cookie += `; Domain=${options.domain}`;
    }
    if (options.path) {
        cookie += `; Path=${options.path}`;
    } else {
        cookie += `; Path=/`;
    }
    if (options.httpOnly) {
        cookie += `; HttpOnly`;
    }
    if (options.secure) {
        cookie += `; Secure`;
    }
    if (options.sameSite) {
        cookie += `; SameSite=${options.sameSite}`;
    }

    response.headers["Set-Cookie"] = cookie;
    return response;
}

export function getCookie(name: string, request: Request): string | null {
  const rawCookies = request.headers["cookie"];
  if (!rawCookies) return null;

  const cookies = rawCookies.split(";");
  const cookie = cookies.find((cookie) => {
    const cookie_split  = cookie.split("=");
    const key = cookie_split[0] ? cookie_split[0].trim() : null;

    return key === name;
  });

  if (cookie) {
       const cookie_split = cookie.split("=");
       const value = cookie_split[1] ?? null;

       return value;
  }

  return null;
}

// =============================================================================
// JWT-based Session Management
// =============================================================================

/**
 * Get session config from app config
 */
function getSessionConfig(): SessionConfig {
    return getAppConfig().session;
}

/**
 * Creates a new session token with the given data
 * @param data Session data to store in the token
 * @returns JWT token string
 */
export function createSessionToken<T>(data: T): string {
    const config = getSessionConfig();
    const ttlSeconds = config.ttlMinutes * 60;
    return jwtSign(jsonEncode(data), config.secret, ttlSeconds);
}

/**
 * Verifies and decodes a session token
 * @param token JWT token string
 * @returns Decoded data or null if invalid/expired
 */
export function verifySessionToken<T>(token: string): { data: T; remainingSeconds: number } | null {
    const config = getSessionConfig();
    const result = jwtVerify(token, config.secret);

    if (!result || !result.valid) {
        return null;
    }

    return {
        data: jsonDecode<T>(result.data),
        remainingSeconds: result.remainingSeconds
    };
}

/**
 * Gets session data from request cookie
 * @param request HTTP request
 * @returns Session data or null if no valid session
 */
export function getSession<T>(request: Request): T | null {
    const config = getSessionConfig();
    const token = getCookie(config.cookieName, request);

    if (!token) {
        return null;
    }

    const result = verifySessionToken<T>(token);
    return result?.data ?? null;
}

/**
 * Gets session data with metadata (remaining time, etc.)
 * @param request HTTP request
 * @returns Session data with metadata or null
 */
export function getSessionWithMeta<T>(request: Request): { data: T; remainingSeconds: number } | null {
    const config = getSessionConfig();
    const token = getCookie(config.cookieName, request);

    if (!token) {
        return null;
    }

    return verifySessionToken<T>(token);
}

/**
 * Sets session data by creating a new JWT token and setting it as a cookie
 * @param data Session data to store
 * @param response HTTP response to add cookie to
 * @returns Modified response with session cookie
 */
export function setSession<T>(data: T, response: Response): Response {
    const config = getSessionConfig();
    const token = createSessionToken(data);
    const maxAge = config.ttlMinutes * 60;

    return setCookie(
        { [config.cookieName]: token },
        response,
        { httpOnly: true, sameSite: "Lax", path: "/", maxAge }
    );
}

/**
 * Clears the session by setting an expired cookie
 * @param response HTTP response
 * @returns Modified response with cleared session cookie
 */
export function clearSession(response: Response): Response {
    const config = getSessionConfig();

    return setCookie(
        { [config.cookieName]: "" },
        response,
        { httpOnly: true, sameSite: "Lax", path: "/", maxAge: 0 }
    );
}

/**
 * Refreshes session if it's close to expiring
 * Returns new response with refreshed token if needed, otherwise returns original response
 * @param request HTTP request
 * @param response HTTP response
 * @returns Response (potentially with refreshed session cookie)
 */
export function refreshSessionIfNeeded<T>(request: Request, response: Response): Response {
    const config = getSessionConfig();
    const sessionMeta = getSessionWithMeta<T>(request);

    if (!sessionMeta) {
        return response;
    }

    const refreshThresholdSeconds = config.refreshThresholdMinutes * 60;

    // Refresh if remaining time is less than threshold
    if (sessionMeta.remainingSeconds < refreshThresholdSeconds) {
        return setSession(sessionMeta.data, response);
    }

    return response;
}

/**
 * Middleware-style function to handle session refresh automatically
 * Use this in your route handlers to ensure sessions are refreshed
 * @param request HTTP request
 * @param response HTTP response
 * @param handler Route handler function
 * @returns Response from handler with potential session refresh
 */
export function withSessionRefresh<T>(
    request: Request,
    response: Response,
    handler: (request: Request, response: Response) => Response
): Response {
    const result = handler(request, response);
    return refreshSessionIfNeeded<T>(request, result);
}

// =============================================================================
// CSRF Protection
// =============================================================================

export function link(path: RouterPaths, queryParams: Record<string, string>, request: Request, type: "action"|"render" = "render"): string {
    if (type === "action") {
        const csrfToken = getSession<{ user: { token: string } }>(request)?.user?.token;

        if (csrfToken) {
            queryParams.token = csrfToken;
        }
    }
    const queryString = buildUrlQuery(queryParams);

    return `${path}?${queryString}`;
}

export function checkCsrfToken(token: string, request: Request): boolean {
    const csrfToken = getSession<{ user: { token: string } }>(request)?.user?.token;
    return csrfToken === token;
}

// =============================================================================
// Deprecated - kept for backward compatibility
// =============================================================================

/**
 * @deprecated Use setSession() instead. This function is kept for backward compatibility.
 */
export function sessionStart(request: Request, response: Response): Response {
    // With JWT-based sessions, we don't need to "start" a session
    // The session is created when setSession() is called
    return response;
}
