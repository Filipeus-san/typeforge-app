// API utilities — JSON responses, auth, body parsing
import { getSettingsMap } from "../auth/auth.repository";

// ---- JSON Response Helpers ----

export function jsonResponse(response: Response, data: unknown, status: HttpStatusCode = 200): Response {
    response.content = jsonEncode(data);
    response.contentType = "application/json";
    response.status = status;
    return response;
}

export function jsonError(response: Response, message: string, status: HttpStatusCode = 400): Response {
    return jsonResponse(response, { error: message }, status);
}

// ---- API Authentication ----

export function requireApiAuth(request: Request, response: Response): { userId: number; email: string } | null {
    const authHeader = request.headers["authorization"] ?? request.headers["Authorization"] ?? '';
    if (authHeader === '' || !stringStartsWith(authHeader, "Bearer ")) {
        jsonError(response, "Unauthorized", 401);
        return null;
    }

    const token = trim(authHeader.substring(7));
    if (token === '') {
        jsonError(response, "Unauthorized", 401);
        return null;
    }

    // Try env var API_KEY, then API_SECRET, then DB settings 'api_key'
    let apiKey = getConfig("API_KEY") ?? '';
    if (apiKey === '') {
        apiKey = getConfig("API_SECRET") ?? '';
    }
    if (apiKey === '') {
        const settings = getSettingsMap();
        apiKey = settings['api_key'] ?? '';
    }
    if (apiKey === '') {
        jsonError(response, "API key not configured on server. Set via: POST /api/settings {\"api_key\": \"your-key\"} or env var API_KEY.", 500);
        return null;
    }
    if (token !== apiKey) {
        jsonError(response, "Invalid API key", 401);
        return null;
    }

    // Find first admin user to use as the API actor
    const users = sqlQuery<{ id: number; email: string }>(
        "SELECT id, email FROM users WHERE role = 'admin' AND status = 'active' ORDER BY id LIMIT 1",
        []
    );
    if (users.length > 0) {
        return { userId: users[0].id, email: users[0].email };
    }
    return { userId: 1, email: "api" };
}

// ---- Request Body Parsing ----

export function getJsonBody<T = Record<string, unknown>>(request: Request): T {
    const contentType = request.headers["content-type"] ?? request.headers["Content-Type"] ?? '';
    if (stringContains(contentType, "application/json")) {
        const payload = request.payload ?? '{}';
        if (payload === '') return jsonDecode<T>('{}');
        return jsonDecode<T>(payload);
    }
    return parseUrlQuery<T>(request.payload ?? '');
}

// ---- Route Parameter Extraction ----

export function getApiId(request: Request): number {
    const parts = stringSplit(request.path, "/");
    return Number(parts[parts.length - 1]);
}

export function getApiParam(request: Request): string {
    const parts = stringSplit(request.path, "/");
    return parts[parts.length - 1];
}
