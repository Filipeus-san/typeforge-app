import { getAppConfig } from './config';
import { runMigrations } from './migration-runner';
import { getHtmlTemplate } from './template';
import { getRouter } from './modules/router';

/** @noSelf */
export function config() {
    return getAppConfig();
}

/**
 * Called once at application startup (before first request)
 * Runs database migrations if PostgreSQL is enabled
 * @noSelf
 */
export function init() {
    const appConfig = getAppConfig();

    // Run migrations if database is enabled
    if (appConfig.postgresql.enable && appConfig.migrations) {
        runMigrations(appConfig.migrations);
    }
}

/** @noSelf */
export function main(request: Request): Response {
    const routerList = getRouter();

    let response: Response = { headers: {}, content: "", contentType: "text/html", status: 200  };

    let find = routerList.find(element => {
        return element.path == request.path
    });
    
    if (find) {
        return find.route(request, response);
    }

    response.status = 404;
    response.content = getHtmlTemplate("404 — Stránka nenalezena", `
        <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;">
            <div style="text-align:center;max-width:480px;">
                <div style="font-size:8rem;font-weight:800;line-height:1;margin-bottom:0.5rem;" class="text-gradient">404</div>
                <h1 style="font-size:1.5rem;font-weight:600;margin-bottom:1rem;color:var(--tf-text);">Stránka nenalezena</h1>
                <p style="color:var(--tf-text-muted);margin-bottom:2rem;">Omlouváme se, ale stránka <code style="background:var(--tf-surface-light);padding:2px 8px;border-radius:4px;">${request.path}</code> neexistuje.</p>
                <a href="/" class="btn btn-primary-tf">
                    <i class="bi bi-house me-2"></i>Zpět na úvod
                </a>
            </div>
        </div>
    `);
    return response;
}
