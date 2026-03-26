// Menu from DB + public pages support + mobile optimization v3
import { getAppConfig } from './config';
import { getHtmlTemplate } from './template';
import { getRouter } from './modules/router';
import { migrations } from './migrations';
import { seeds } from './seeds';
import { applyRedirectRules } from './modules/app/redirects/redirects.repository';
import { findMediaByUrl } from './modules/app/auth/auth.repository';

/** @noSelf */
export function config() {
    return getAppConfig();
}

/** @noSelf */
export function init() {
    // Create _migrations table if not exists
    sqlQuery("CREATE TABLE IF NOT EXISTS _migrations (id SERIAL PRIMARY KEY, version INTEGER NOT NULL UNIQUE, name VARCHAR(255) NOT NULL, applied_at TIMESTAMP NOT NULL DEFAULT NOW())", []);

    // Run pending migrations
    const applied = sqlQuery<{ version: number }>("SELECT version FROM _migrations ORDER BY version", []);
    const appliedVersions = new Set(applied.map(m => m.version));

    for (const migration of migrations) {
        if (!appliedVersions.has(migration.version)) {
            logInfo(`Running migration ${migration.version}: ${migration.name}`);
            sqlQuery(migration.up, []);
            sqlQuery("INSERT INTO _migrations (version, name) VALUES ($1, $2)", [migration.version, migration.name]);
            logInfo(`Migration ${migration.version} applied`);
        }
    }

    // Run pending seeds
    runSeedsInit();
}

function runSeedsInit() {
    sqlQuery("CREATE TABLE IF NOT EXISTS _seeds (id SERIAL PRIMARY KEY, version INTEGER NOT NULL UNIQUE, name VARCHAR(255) NOT NULL, applied_at TIMESTAMP NOT NULL DEFAULT NOW())", []);

    const applied = sqlQuery<{ version: number }>("SELECT version FROM _seeds ORDER BY version", []);
    const appliedVersions = new Set(applied.map(m => m.version));

    for (const seed of seeds) {
        if (!appliedVersions.has(seed.version)) {
            logInfo(`Running seed ${seed.version}: ${seed.name}`);
            if (seed.run) {
                seed.run();
            } else {
                sqlQuery(seed.up, []);
            }
            sqlQuery("INSERT INTO _seeds (version, name) VALUES ($1, $2)", [seed.version, seed.name]);
            logInfo(`Seed ${seed.version} applied`);
        }
    }
}

let migrationsRan = false;

function runMigrations() {
    if (migrationsRan) return;
    migrationsRan = true;
    try {
        sqlQuery("CREATE TABLE IF NOT EXISTS _migrations (id SERIAL PRIMARY KEY, version INTEGER NOT NULL UNIQUE, name VARCHAR(255) NOT NULL, applied_at TIMESTAMP NOT NULL DEFAULT NOW())", []);
        const applied = sqlQuery<{ version: number }>("SELECT version FROM _migrations ORDER BY version", []);
        const appliedVersions = new Set(applied.map(m => m.version));
        for (const migration of migrations) {
            if (!appliedVersions.has(migration.version)) {
                logInfo(`Running migration ${migration.version}: ${migration.name}`);
                // Split multi-statement SQL and run each separately
                const statements = stringSplit(trim(migration.up), ";");
                for (const stmt of statements) {
                    const trimmed = trim(stmt);
                    if (trimmed !== "" && trimmed.length > 2) {
                        sqlQuery(trimmed, []);
                    }
                }
                sqlQuery("INSERT INTO _migrations (version, name) VALUES ($1, $2)", [migration.version, migration.name]);
                logInfo(`Migration ${migration.version} applied`);
            }
        }
    } catch (e: unknown) {
        logError(`Migration error: ${String(e)}`);
    }
    // Run seeds after migrations
    runSeeds();
}

let seedsRan = false;

function runSeeds() {
    if (seedsRan) return;
    seedsRan = true;
    try {
        sqlQuery("CREATE TABLE IF NOT EXISTS _seeds (id SERIAL PRIMARY KEY, version INTEGER NOT NULL UNIQUE, name VARCHAR(255) NOT NULL, applied_at TIMESTAMP NOT NULL DEFAULT NOW())", []);
        const applied = sqlQuery<{ version: number }>("SELECT version FROM _seeds ORDER BY version", []);
        const appliedVersions = new Set(applied.map(m => m.version));
        for (const seed of seeds) {
            if (!appliedVersions.has(seed.version)) {
                logInfo(`Running seed ${seed.version}: ${seed.name}`);
                if (seed.run) {
                    seed.run();
                } else {
                    const statements = stringSplit(trim(seed.up), ";");
                    for (const stmt of statements) {
                        const trimmed = trim(stmt);
                        if (trimmed !== "" && trimmed.length > 2) {
                            sqlQuery(trimmed, []);
                        }
                    }
                }
                sqlQuery("INSERT INTO _seeds (version, name) VALUES ($1, $2)", [seed.version, seed.name]);
                logInfo(`Seed ${seed.version} applied`);
            }
        }
    } catch (e: unknown) {
        logError(`Seed error: ${String(e)}`);
    }
}

function getMimeTypeFromUrl(url: string): string {
    const parts = stringSplit(url, ".");
    const ext = toLower(parts[parts.length - 1]);
    // Remove query string from extension if present
    const extClean = stringSplit(ext, "?")[0];
    if (extClean === "png") return "image/png";
    if (extClean === "jpg" || extClean === "jpeg") return "image/jpeg";
    if (extClean === "gif") return "image/gif";
    if (extClean === "webp") return "image/webp";
    if (extClean === "svg") return "image/svg+xml";
    if (extClean === "pdf") return "application/pdf";
    if (extClean === "mp4") return "video/mp4";
    if (extClean === "webm") return "video/webm";
    if (extClean === "mp3") return "audio/mpeg";
    if (extClean === "css") return "text/css";
    if (extClean === "js") return "text/javascript";
    if (extClean === "json") return "application/json";
    if (extClean === "xml") return "application/xml";
    if (extClean === "ico") return "image/x-icon";
    if (extClean === "woff2") return "font/woff2";
    if (extClean === "woff") return "font/woff";
    return "application/octet-stream";
}

/** @noSelf */
export function main(request: Request): Response {
    runMigrations();
    const routerList = getRouter();

    let response: Response = { headers: {}, content: "", contentType: "text/html", status: 200  };

    // Apply redirect/rewrite rules before routing
    const redirectResult = applyRedirectRules(request.path);
    if (redirectResult !== null) {
        if (redirectResult.type === 'redirect') {
            response.status = redirectResult.statusCode as HttpStatusCode;
            response.headers["Location"] = redirectResult.target;
            return response;
        } else if (stringStartsWith(redirectResult.target, "http")) {
            // rewrite to external URL — serve media content inline
            try {
                const media = findMediaByUrl(redirectResult.target);
                if (media !== null && stringStartsWith(media.mime_type, "image/")) {
                    // Image — render HTML page that displays the image from its public URL
                    response.content = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${media.name}</title><style>*{margin:0;padding:0}body{display:flex;justify-content:center;align-items:center;min-height:100vh;background:#000}img{max-width:100%;max-height:100vh;object-fit:contain}</style></head><body><img src="${media.url}" alt="${media.name}"></body></html>`;
                    response.status = 200;
                    response.contentType = "text/html";
                    response.headers["Cache-Control"] = "public, max-age=3600";
                    return response;
                }
                if (media !== null) {
                    // Non-image media (PDF, video, etc.) — redirect to the file URL
                    response.status = 302;
                    response.headers["Location"] = media.url;
                    return response;
                }
                // Not a known media file — redirect to external URL as fallback
                response.status = 302;
                response.headers["Location"] = redirectResult.target;
                return response;
            } catch (e: unknown) {
                logError(`Rewrite proxy error for ${redirectResult.target}: ${String(e)}`);
                response.status = 502;
                response.content = "Bad Gateway";
                return response;
            }
        } else {
            // rewrite to internal path — change path and continue routing
            request.path = redirectResult.target;
        }
    }

    // First try exact match
    let find = routerList.find(element => {
        return element.path == request.path
    });

    // Then try parametric match (e.g. /admin/pages/edit/:id)
    if (!find) {
        const requestParts = stringSplit(request.path, "/");
        find = routerList.find(element => {
            if (!stringContains(element.path, ":")) return false;
            const routeParts = stringSplit(element.path, "/");
            if (routeParts.length !== requestParts.length) return false;
            for (let i = 0; i < routeParts.length; i++) {
                if (stringStartsWith(routeParts[i], ":")) continue;
                if (routeParts[i] !== requestParts[i]) return false;
            }
            return true;
        });
    }

    if (find) {
        return find.route(request, response);
    }

    response.status = 404;
    response.content = getHtmlTemplate("404 — Page Not Found", `
        <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;">
            <div style="text-align:center;max-width:480px;">
                <div style="font-size:8rem;font-weight:800;line-height:1;margin-bottom:0.5rem;" class="text-gradient">404</div>
                <h1 style="font-size:1.5rem;font-weight:600;margin-bottom:1rem;color:var(--tf-text);">Page Not Found</h1>
                <p style="color:var(--tf-text-muted);margin-bottom:2rem;">Sorry, the page <code style="background:var(--tf-surface-light);padding:2px 8px;border-radius:4px;">${request.path}</code> does not exist.</p>
                <a href="/" class="btn btn-primary-tf">
                    <i class="bi bi-house me-2"></i>Back to Home
                </a>
            </div>
        </div>
    `);
    return response;
}
