import { reactBuild } from "./react-build";
import { getThemeDetectScript, getThemeStyles } from "./template";

// =============================================================================
// Types
// =============================================================================

interface ReactComponentOptions {
    containerId?: string;
    containerClass?: string;
    containerStyle?: string;
}

interface ReactPageOptions extends ReactComponentOptions {
    headExtra?: string;
    includeTheme?: boolean;
}

// =============================================================================
// Helpers
// =============================================================================

function safePropsJson(props: Record<string, any>): string {
    const json = jsonEncode(props);
    // Escape </ to prevent breaking out of <script> tags
    return stringReplace(json, "</", "<\\/");
}

function getBundleUrl(): string {
    return reactBuild.assetsBaseUrl + reactBuild.reactBundle;
}

function getCssUrl(): string {
    return reactBuild.assetsBaseUrl + reactBuild.reactCss;
}

// =============================================================================
// Public API
// =============================================================================

/**
 * Returns <script> tags for React 18 (CDN) + the app React bundle.
 * Include once per page, before any renderReactComponent output.
 */
export function reactScripts(): string {
    return `<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="${getBundleUrl()}" onload="document.dispatchEvent(new CustomEvent('react-bundle-loaded'))"></script>`;
}

/**
 * Renders a React component mount point with serialized props.
 * Must be used inside a page that loads the React bundle
 * (use getReactPageTemplate or include reactScripts() in the page).
 *
 * Example:
 *   const html = renderReactComponent("ProductGallery", { images: [...] });
 */
export function renderReactComponent(
    componentName: string,
    props: Record<string, any>,
    options?: ReactComponentOptions
): string {
    const containerId = (options !== undefined && options !== null && options.containerId !== undefined && options.containerId !== '')
        ? options.containerId
        : 'react-' + uniqueKey();

    const classAttr = (options !== undefined && options !== null && options.containerClass !== undefined && options.containerClass !== '')
        ? ` class="${options.containerClass}"`
        : '';

    const styleAttr = (options !== undefined && options !== null && options.containerStyle !== undefined && options.containerStyle !== '')
        ? ` style="${options.containerStyle}"`
        : '';

    const propsJson = safePropsJson(props);

    return `<div id="${containerId}"${classAttr}${styleAttr}></div>
<script>
(function(){
    function m(){
        if(window.__REACT_RENDER__){
            window.__REACT_RENDER__("${componentName}",${propsJson},"${containerId}");
        }else{
            document.addEventListener("react-bundle-loaded",function(){
                window.__REACT_RENDER__("${componentName}",${propsJson},"${containerId}");
            });
        }
    }
    if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",m);}else{m();}
})();
</script>`;
}

/**
 * Full HTML page template for React-only pages.
 * Alternative to getHtmlTemplate — includes React scripts and mounts a single component.
 *
 * Example:
 *   response.content = getReactPageTemplate("Dashboard", "AdminDashboard", { user: "Jan" });
 */
export function getReactPageTemplate(
    title: string,
    componentName: string,
    props: Record<string, any>,
    options?: ReactPageOptions
): string {
    const includeTheme = (options === undefined || options === null || options.includeTheme === undefined)
        ? true
        : options.includeTheme;

    const headExtra = (options !== undefined && options !== null && options.headExtra !== undefined && options.headExtra !== '')
        ? options.headExtra
        : '';

    const containerId = (options !== undefined && options !== null && options.containerId !== undefined && options.containerId !== '')
        ? options.containerId
        : 'react-root';

    const classAttr = (options !== undefined && options !== null && options.containerClass !== undefined && options.containerClass !== '')
        ? ` class="${options.containerClass}"`
        : '';

    const styleAttr = (options !== undefined && options !== null && options.containerStyle !== undefined && options.containerStyle !== '')
        ? ` style="${options.containerStyle}"`
        : '';

    const propsJson = safePropsJson(props);

    return `<!DOCTYPE html>
<html lang="cs" data-bs-theme="dark" data-tf-theme="dark">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="icon" href="data:;base64,=">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <link href="${getCssUrl()}" rel="stylesheet">
    ${includeTheme ? getThemeDetectScript() : ''}
    ${includeTheme ? getThemeStyles() : ''}
    ${headExtra}
</head>
<body>
    <div id="${containerId}"${classAttr}${styleAttr}></div>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="${getBundleUrl()}"></script>
    <script>window.__REACT_RENDER__("${componentName}",${propsJson},"${containerId}");</script>
</body>
</html>`;
}
