import { getHtmlTemplate } from "../../template";

function getLandingPageContent(): string {
    return `
    <nav class="primary">
        <button class="circle transparent">
            <i>menu</i>
        </button>
        <h5 class="max">TypeForge</h5>
        <button class="circle transparent">
            <i>light_mode</i>
        </button>
    </nav>

    <main class="responsive">
        <section style="display:flex;align-items:center;justify-content:center;min-height:85vh;text-align:center;">
            <div>
                <i style="font-size:6rem;">rocket_launch</i>
                <h1 class="large">Hello World</h1>
                <h5 class="secondary-text">Welcome to TypeForge</h5>
                <p style="max-width:600px;margin:1rem auto;">A serverless web framework that compiles TypeScript to Lua.</p>
                <div class="space"></div>
                <nav>
                    <button class="large">
                        <i>play_arrow</i>
                        <span>Get Started</span>
                    </button>
                    <button class="large border">
                        <i>code</i>
                        <span>Learn More</span>
                    </button>
                </nav>
            </div>
        </section>

        <div class="large-divider"></div>

        <h3 style="text-align:center;">Features</h3>
        <div class="space"></div>

        <div class="grid">
            <div class="s12 m4">
                <article class="border round" style="text-align:center;">
                    <div class="padding">
                        <i style="font-size:3rem;">bolt</i>
                        <h5>Fast</h5>
                        <p>Powered by Lua JIT for blazing fast execution with minimal overhead.</p>
                    </div>
                </article>
            </div>
            <div class="s12 m4">
                <article class="border round" style="text-align:center;">
                    <div class="padding">
                        <i style="font-size:3rem;">code</i>
                        <h5>TypeScript</h5>
                        <p>Write in TypeScript with full type safety, compile to optimized Lua.</p>
                    </div>
                </article>
            </div>
            <div class="s12 m4">
                <article class="border round" style="text-align:center;">
                    <div class="padding">
                        <i style="font-size:3rem;">cloud</i>
                        <h5>Serverless</h5>
                        <p>Deploy anywhere with built-in APIs for HTTP, database, crypto, and more.</p>
                    </div>
                </article>
            </div>
        </div>

        <div class="space"></div>
        <div class="space"></div>
    </main>

    <footer class="primary padding" style="text-align:center;">
        <p>Built with TypeForge</p>
    </footer>`;
}

export function renderIndex(request: Request, response: Response): Response {
    response.content = getHtmlTemplate("TypeForge", getLandingPageContent());
    return response;
}

export function renderTest(request: Request, response: Response): Response {
    response.content = getHtmlTemplate("Test Page", "<main class='responsive'><h1>Test Page</h1></main>");
    return response;
}

export function renderNotFound(request: Request, response: Response): Response {
    response.status = 404;
    response.content = getHtmlTemplate("Not Found", `
    <main class="responsive">
        <div class="grid center-align" style="min-height: 80vh;">
            <div class="s12">
                <i class="extra" style="font-size: 5rem;">error</i>
                <h1>404</h1>
                <h5 class="secondary-text">Page Not Found</h5>
                <div class="space"></div>
                <a href="/"><button class="large">
                    <i>home</i>
                    <span>Go Home</span>
                </button></a>
            </div>
        </div>
    </main>`);
    return response;
}