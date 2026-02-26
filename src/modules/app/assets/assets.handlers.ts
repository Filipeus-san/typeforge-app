import { REACT_BUNDLE_JS, REACT_BUNDLE_CSS } from "../../../react-bundle-content";

export function serveReactBundleJs(_request: Request, response: Response): Response {
    response.content = REACT_BUNDLE_JS;
    response.contentType = "text/javascript";
    response.headers["Cache-Control"] = "public, max-age=31536000, immutable";
    return response;
}

export function serveReactBundleCss(_request: Request, response: Response): Response {
    response.content = REACT_BUNDLE_CSS;
    response.contentType = "text/css";
    response.headers["Cache-Control"] = "public, max-age=31536000, immutable";
    return response;
}
