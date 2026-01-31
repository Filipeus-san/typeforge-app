import { getHtmlTemplate } from "../../template";

function getLandingPageContent(): string {
    return `
<style>
body { min-height: 100vh; }
.landing-hero {
    min-height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
}
.landing-hero h1 {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1rem;
}
.landing-hero .hero-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    margin-bottom: 2rem;
}
.landing-hero .subtitle {
    font-size: 1.3rem;
    opacity: 0.8;
    max-width: 640px;
    margin: 0 auto 2.5rem;
    line-height: 1.6;
}
.landing-hero .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}
.prompt-demo {
    max-width: 600px;
    margin: 3rem auto 0;
    text-align: left;
    border-radius: 16px;
    overflow: hidden;
}
.prompt-demo-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    opacity: 0.7;
}
.prompt-demo-body {
    padding: 1rem 1.25rem;
    font-family: monospace;
    font-size: 0.95rem;
    line-height: 1.7;
    opacity: 0.9;
}
.prompt-demo-body .prompt-cursor {
    display: inline-block;
    width: 2px;
    height: 1.1em;
    vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
}
@keyframes blink {
    50% { opacity: 0; }
}
.landing-features {
    padding: 4rem 0;
}
.landing-features h3 {
    text-align: center;
    margin-bottom: 0.5rem;
}
.landing-features .section-sub {
    text-align: center;
    opacity: 0.7;
    margin-bottom: 3rem;
    max-width: 560px;
    margin-left: auto;
    margin-right: auto;
}
.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}
.feature-card {
    padding: 2rem;
    text-align: center;
}
.feature-card i {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}
.feature-card h6 {
    margin-bottom: 0.5rem;
}
.feature-card p {
    opacity: 0.7;
    line-height: 1.5;
}
.landing-section {
    padding: 4rem 0;
}
.landing-section h3 {
    text-align: center;
    margin-bottom: 0.5rem;
}
.landing-section .section-sub {
    text-align: center;
    opacity: 0.7;
    margin-bottom: 3rem;
    max-width: 560px;
    margin-left: auto;
    margin-right: auto;
}
.step-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
}
.step-card {
    padding: 2rem;
    text-align: center;
}
.step-number {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
}
.connector-section {
    padding: 4rem 0;
}
.connector-box {
    max-width: 700px;
    margin: 0 auto;
    padding: 2.5rem;
    border-radius: 24px;
    text-align: center;
}
.connector-box h4 {
    margin-bottom: 0.5rem;
}
.connector-box .connector-sub {
    opacity: 0.7;
    margin-bottom: 2rem;
    line-height: 1.6;
}
.connector-code {
    text-align: left;
    padding: 1.25rem;
    border-radius: 12px;
    font-family: monospace;
    font-size: 0.85rem;
    line-height: 1.8;
    overflow-x: auto;
    margin-bottom: 1.5rem;
}
.connector-agents {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1.5rem;
}
.landing-footer {
    text-align: center;
    padding: 3rem 0;
    opacity: 0.6;
}
.landing-cta {
    text-align: center;
    padding: 4rem 2rem;
}
.landing-cta h3 {
    margin-bottom: 1rem;
}
.landing-cta p {
    opacity: 0.7;
    margin-bottom: 2rem;
    line-height: 1.6;
}
.landing-nav {
    padding: 1rem 0;
}
.landing-nav h6 {
    font-weight: 700;
}
@media (max-width: 600px) {
    .landing-hero h1 {
        font-size: 2.2rem;
    }
    .landing-hero .subtitle {
        font-size: 1.1rem;
    }
    .prompt-demo {
        margin: 2rem auto 0;
    }
}
</style>

<header>
    <nav class="landing-nav responsive">
        <h6>TypeForge</h6>
        <div class="max"></div>
        <a href="#connector" class="button transparent small-round">Connector</a>
        <a href="#features" class="button transparent small-round">Funkce</a>
        <a href="#how-it-works" class="button transparent small-round">Jak to funguje</a>
    </nav>
</header>

<main class="responsive">
    <!-- Hero -->
    <section class="landing-hero">
        <div>
            <div class="hero-label primary-container">
                <i>auto_awesome</i>
                AI-first hosting pro vibe coding
            </div>
            <h1>Popište aplikaci.<br>AI ji naprogramuje<br>a nasadí.</h1>
            <p class="subtitle">
                TypeForge je AI hosting platforma navržená pro vibe coding.
                Připojte connector do svého AI agenta, popište co chcete pár větami
                a vaše aplikace běží na internetu.
            </p>
            <div class="actions">
                <button class="large-round extra">
                    <i>rocket_launch</i>
                    <span>Začít zdarma</span>
                </button>
                <button class="large-round border extra">
                    <i>extension</i>
                    <span>Připojit connector</span>
                </button>
            </div>

            <div class="prompt-demo surface-variant">
                <div class="prompt-demo-header">
                    <i>smart_toy</i> AI Agent prompt
                </div>
                <div class="prompt-demo-body">
                    Vytvoř e-shop na prodej zrnkové kávy. Potřebuji katalog produktů,
                    košík a jednoduchou checkout stránku.<span class="prompt-cursor primary"></span>
                </div>
            </div>
        </div>
    </section>

    <!-- Connector -->
    <section id="connector" class="connector-section">
        <div class="connector-box surface-variant round">
            <i class="extra-large-text primary-text">extension</i>
            <div class="space"></div>
            <h4>Jeden connector. Plná kontrola.</h4>
            <p class="connector-sub">
                Připojte TypeForge jako MCP connector do libovolného AI agenta.
                Agent získá přístup k projektům, databázím, prostředím i deploymentu &mdash;
                vše řízené přirozeným jazykem.
            </p>
            <div class="connector-code surface">
                <span style="opacity:0.5">// MCP connector konfigurace</span><br>
                {<br>
                &nbsp;&nbsp;"mcpServers": {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;"typeforge": {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"url": "https://your-instance/mcp/sse"<br>
                &nbsp;&nbsp;&nbsp;&nbsp;}<br>
                &nbsp;&nbsp;}<br>
                }
            </div>
            <p style="opacity: 0.6; font-size: 0.9rem;">Funguje s libovolným agentem podporujícím MCP protokol</p>
            <div class="connector-agents">
                <span class="chip small-round">Claude Code</span>
                <span class="chip small-round">Cursor</span>
                <span class="chip small-round">Windsurf</span>
                <span class="chip small-round">Cline</span>
                <span class="chip small-round">a další</span>
            </div>
        </div>
    </section>

    <!-- Features -->
    <section id="features" class="landing-features">
        <h3>Vytvořeno pro AI workflow</h3>
        <p class="section-sub">Kompletní infrastruktura, kterou AI agent potřebuje k vytvoření a nasazení plnohodnotné aplikace.</p>
        <div class="feature-grid">
            <article class="feature-card round surface-variant">
                <i class="primary-text">smart_toy</i>
                <h6>MCP Connector</h6>
                <p>Připojte hosting jako nástroj do svého AI agenta. Jeden connector, plná kontrola nad projekty i infrastrukturou.</p>
            </article>
            <article class="feature-card round surface-variant">
                <i class="primary-text">code</i>
                <h6>Vibe Coding</h6>
                <p>Popište aplikaci v přirozeném jazyce. AI agent ji naprogramuje, vytvoří repozitář a nasadí na internet.</p>
            </article>
            <article class="feature-card round surface-variant">
                <i class="primary-text">cloud_upload</i>
                <h6>Auto Deploy</h6>
                <p>Push do GitHub repozitáře automaticky spustí build a deploy. Nulová konfigurace CI/CD.</p>
            </article>
            <article class="feature-card round surface-variant">
                <i class="primary-text">database</i>
                <h6>PostgreSQL &amp; Redis</h6>
                <p>Integrovaná Neon PostgreSQL databáze a Redis cache. Agent je vytvoří a propojí automaticky.</p>
            </article>
            <article class="feature-card round surface-variant">
                <i class="primary-text">dns</i>
                <h6>Vlastní domény</h6>
                <p>Připojte vlastní domény s automatickým SSL. Stačí říct agentovi jakou doménu chcete.</p>
            </article>
            <article class="feature-card round surface-variant">
                <i class="primary-text">account_tree</i>
                <h6>Prostředí</h6>
                <p>Dev, staging, produkce. Každé prostředí s vlastní konfigurací, vše spravovatelné přes AI agenta.</p>
            </article>
        </div>
    </section>

    <!-- How it works -->
    <section id="how-it-works" class="landing-section">
        <h3>Tři kroky k hotové aplikaci</h3>
        <p class="section-sub">Od nápadu k běžící aplikaci na internetu. Žádná manuální konfigurace.</p>
        <div class="step-grid">
            <article class="step-card round surface-variant">
                <div class="step-number primary primary-text inverse-primary">1</div>
                <h6>Připojte connector</h6>
                <p>Přidejte TypeForge MCP connector do svého AI agenta &mdash; Claude Code, Cursor nebo jiného.</p>
            </article>
            <article class="step-card round surface-variant">
                <div class="step-number primary primary-text inverse-primary">2</div>
                <h6>Popište co chcete</h6>
                <p>Řekněte agentovi co má vytvořit. Pár vět stačí &mdash; agent se postará o kód, databázi i deployment.</p>
            </article>
            <article class="step-card round surface-variant">
                <div class="step-number primary primary-text inverse-primary">3</div>
                <h6>Aplikace běží</h6>
                <p>Vaše aplikace je online. Další změny? Prostě popište co chcete upravit a agent to nasadí.</p>
            </article>
        </div>
    </section>

    <!-- CTA -->
    <section class="landing-cta">
        <article class="round extra-large-padding primary-container">
            <h3>Začněte vibe codovat</h3>
            <p>Připojte connector, popište svůj nápad a nechte AI udělat zbytek.<br>Od promptu k běžící aplikaci.</p>
            <button class="large-round inverse-primary">
                <i>rocket_launch</i>
                <span>Začít zdarma</span>
            </button>
        </article>
    </section>
</main>

<footer class="landing-footer responsive">
    <p>TypeForge &mdash; AI hosting pro vibe coding</p>
</footer>`;
}

export function renderIndex(request: Request, response: Response): Response {
    response.content = getHtmlTemplate("TypeForge — AI Hosting pro Vibe Coding", getLandingPageContent());
    return response;
}

export function renderTest(request: Request, response: Response): Response {
    response.content = getHtmlTemplate("Test Page", "<main class='responsive'><h1>Test Page</h1></main>");
    return response;
}

export function renderNotFound(request: Request, response: Response): Response {
    response.status = 404;
    response.content = getHtmlTemplate("Stránka nenalezena", `
    <main class="responsive">
        <section style="display:flex;align-items:center;justify-content:center;min-height:80vh;text-align:center;">
            <div>
                <i style="font-size:5rem;">error</i>
                <h1>404</h1>
                <h5 style="opacity:0.7;">Stránka nenalezena</h5>
                <div class="space"></div>
                <a href="/"><button class="large-round">
                    <i>home</i>
                    <span>Zpět na úvod</span>
                </button></a>
            </div>
        </section>
    </main>`);
    return response;
}
