export function getHtmlTemplate(title: string, content: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <title>${title}</title>
    <link rel="icon" href="data:;base64,=">
    <link href="https://cdn.jsdelivr.net/npm/beercss@3.9.7/dist/cdn/beer.min.css" rel="stylesheet">
    <script type="module" src="https://cdn.jsdelivr.net/npm/beercss@3.9.7/dist/cdn/beer.min.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/material-dynamic-colors@1.1.2/dist/cdn/material-dynamic-colors.min.js"></script>
</head>
<body>
${content}
</body>
</html>`;
}
