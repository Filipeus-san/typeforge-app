import { renderIndex, renderLogin } from "./app/app.controller";
import { RouterPaths } from "./types";

// Router
export function getRouter(): { path: RouterPaths; route: RouteFunction, type: "action" | "render" }[] {
    return [
        {
            path: "/",
            route: renderIndex,
            type: "render"
        },
        {
            path: "/login",
            route: renderLogin,
            type: "render"
        },
    ];
}