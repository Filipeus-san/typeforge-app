import { getAppConfig } from './config';
import { renderNotFound } from './modules/app/app.controller';
import { getRouter } from './modules/router';

/** @noSelf */
export function config() {
    return getAppConfig();
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
