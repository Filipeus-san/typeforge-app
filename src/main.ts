import { getAppConfig } from './config';
import { getRouter } from './modules/router';
import { index, notFound } from './routes';
import { sessionStart } from './utils';

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

    if (request.headers["content-type"] !== "application/json") {
         return index(request);
    }

    return notFound(request);
}
