import { getHtmlTemplate } from "../../react.template";

export function renderIndex(request: Request, response: Response): Response {

    response.content = getHtmlTemplate("App Page");

    return response;
}

export function renderTest(request: Request, response: Response): Response {

    response.content = getHtmlTemplate("Test Page");

    return response;
}