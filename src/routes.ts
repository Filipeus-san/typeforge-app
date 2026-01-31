import { getHtmlTemplate } from "./react.template";

export function index(request: Request): Response  {

    const response: Response = { headers: { }, content: getHtmlTemplate("Hello world"), contentType: "text/html", status: 200  };
    return response;
}


export function notFound(request: Request): Response  {

    const json: ResponseStatus = { status: "not found" };
    const response: Response = { headers: { }, content: jsonEncode(json), contentType: "application/json", status: 404  };

    return response;
}
