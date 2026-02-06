import { getAppConfig } from './config';
import { runMigrations } from './migrations';
import { renderNotFound } from './modules/app/app.controller';
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

    return renderNotFound(request, response);
}
