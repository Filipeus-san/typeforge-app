import { reactBuild } from "./react-build";


export function getHtmlTemplate(content: string) {
    return `
        <html>
            <head>
            <title>Login</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <meta charset="UTF-8" />
            <link rel="icon" href="data:;base64,=">
            </head>
            <body>
            ${content}
            </body>
            </html>
    `;
}
