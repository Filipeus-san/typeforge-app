import { getHtmlTemplate } from "../../template";

export function renderIndex(request: Request, response: Response): Response {

    response.content = getHtmlTemplate("App Page");

    return response;
}

export function renderTest(request: Request, response: Response): Response {

    response.content = getHtmlTemplate("Test Page");

    return response;
}

export function renderNotFound(request: Request, response: Response): Response {

    response.content = getHtmlTemplate("Not Found");

    return response;
}