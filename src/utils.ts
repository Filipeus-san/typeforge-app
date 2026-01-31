import { RouterPaths } from "./modules/types";

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

export function sessionStart(request: Request, response: Response): Response {
    let sessionId = getCookie("sessionId", request);

    if (!sessionId) {
        const key = uniqueKey();
        response = setCookie({ sessionId: key }, response, { httpOnly: true, maxAge: 3600, path: "/" });
    }

    return response;
}


export function setSession<T>(request: Request, value: T) {
    let sessionId = getCookie("sessionId", request);

    if (!sessionId) return;

    const sessions = jsonDecode<Record<string, T>>(appCacheGet("sessions") ?? "{}") || {};
    sessions[sessionId] = value;

    appCacheSet("sessions", jsonEncode(sessions), 3600 * 1000);
}

export function getSession<T>(request: Request): T | null {
     let sessionId = getCookie("sessionId", request);
     if (!sessionId) return null;

   const sessions = jsonDecode<Record<string, T>>(appCacheGet("sessions") ?? "{}") || {};
   return sessions[sessionId] || null;
}


export function link(path: RouterPaths, queryParams: Record<string, string>, request: Request, type: "action"|"render" = "render"): string {
    if (type === "action") {
        const csrfToken = getSession<{ user: { token: string } }>(request)?.user.token;
        
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
