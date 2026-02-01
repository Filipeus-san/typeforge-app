import { getHtmlTemplate } from "../../template";

function getLandingPageContent(): string {
    return `
<style>
.hero-section {
    min-height: 90vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}
.hero-section::before {
    content: '';
    position: absolute;
    top: -40%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}
.hero-section::after {
    content: '';
    position: absolute;
    bottom: -30%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(6,214,160,0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}
.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    background: var(--tf-gradient-subtle);
    border: 1px solid rgba(124,92,252,0.25);
    color: var(--tf-primary-light);
    margin-bottom: 1.5rem;
}
.hero-title {
    font-size: 4rem;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
}
.hero-subtitle {
    font-size: 1.25rem;
    line-height: 1.7;
    color: var(--tf-text-muted);
    max-width: 600px;
}
.prompt-box {
    max-width: 580px;
    border-radius: 16px;
    overflow: hidden;
    background: var(--tf-surface);
    border: 1px solid rgba(124,92,252,0.15);
    margin-top: 3rem;
}
.prompt-box-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--tf-text-muted);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.prompt-box-body {
    padding: 1.25rem;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 0.9rem;
    line-height: 1.8;
    color: var(--tf-text);
}
.prompt-cursor {
    display: inline-block;
    width: 2px;
    height: 1.1em;
    background: var(--tf-primary);
    vertical-align: text-bottom;
    animation: cursorBlink 1s step-end infinite;
}
@keyframes cursorBlink { 50% { opacity: 0; } }
.feature-card {
    padding: 2rem;
    border-radius: 16px;
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    transition: all 0.3s ease;
    height: 100%;
}
.feature-card:hover {
    border-color: rgba(124,92,252,0.3);
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(124,92,252,0.1);
}
.feature-icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
    background: var(--tf-gradient-subtle);
    color: var(--tf-primary-light);
}
.step-card {
    padding: 2rem;
    border-radius: 16px;
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    text-align: center;
    height: 100%;
}
.step-number {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 700;
    background: var(--tf-gradient);
    color: #fff;
    margin-bottom: 1.25rem;
}
.connector-card {
    border-radius: 20px;
    background: var(--tf-surface);
    border: 1px solid rgba(124,92,252,0.15);
    padding: 3rem;
}
.connector-code {
    background: var(--tf-bg);
    border-radius: 12px;
    padding: 1.5rem;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 0.85rem;
    line-height: 1.9;
    border: 1px solid rgba(255,255,255,0.05);
    overflow-x: auto;
}
.cta-section {
    border-radius: 24px;
    background: var(--tf-gradient-subtle);
    border: 1px solid rgba(124,92,252,0.2);
    padding: 4rem 2rem;
}
.section-label {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--tf-primary-light);
    margin-bottom: 1rem;
}
.navbar-tf {
    background: rgba(15,15,23,0.85) !important;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.navbar-tf .navbar-brand {
    font-weight: 800;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
}
.agent-badge {
    display: inline-block;
    padding: 0.4rem 1rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 500;
    background: var(--tf-surface-light);
    border: 1px solid rgba(255,255,255,0.08);
    color: var(--tf-text);
    transition: all 0.2s ease;
}
.agent-badge:hover {
    border-color: rgba(124,92,252,0.3);
    background: rgba(124,92,252,0.1);
}
@media (max-width: 768px) {
    .hero-title { font-size: 2.5rem; }
    .hero-subtitle { font-size: 1.05rem; }
    .connector-card { padding: 2rem; }
    .cta-section { padding: 2.5rem 1.5rem; }
}
</style>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark navbar-tf fixed-top">
    <div class="container">
        <a class="navbar-brand text-gradient" href="/">
            <i class="bi bi-braces-asterisk me-2"></i>TypeForge
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMain">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link" href="#connector">MCP Connector</a></li>
                <li class="nav-item"><a class="nav-link" href="#features">Funkce</a></li>
                <li class="nav-item"><a class="nav-link" href="#how-it-works">Jak to funguje</a></li>
            </ul>
            <a href="/login" class="btn btn-outline-tf btn-sm ms-lg-3">
                <i class="bi bi-box-arrow-in-right me-1"></i>Login
            </a>
        </div>
    </div>
</nav>

<!-- Hero -->
<section class="hero-section" style="padding-top:6rem;">
    <div class="container position-relative" style="z-index:2;">
        <div class="row align-items-center">
            <div class="col-lg-7">
                <div class="hero-badge">
                    <i class="bi bi-stars"></i>
                    Lorem ipsum dolor sit amet
                </div>
                <h1 class="hero-title">
                    Lorem ipsum<br>
                    <span class="text-gradient">dolor sit amet</span><br>
                    consectetur.
                </h1>
                <p class="hero-subtitle mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
                <div class="d-flex flex-wrap gap-3">
                    <a href="#" class="btn btn-primary-tf btn-lg">
                        <i class="bi bi-rocket-takeoff me-2"></i>Lorem ipsum
                    </a>
                    <a href="#connector" class="btn btn-outline-tf btn-lg">
                        <i class="bi bi-puzzle me-2"></i>Dolor sit amet
                    </a>
                </div>
            </div>
            <div class="col-lg-5 mt-5 mt-lg-0">
                <div class="prompt-box">
                    <div class="prompt-box-header">
                        <i class="bi bi-robot"></i> AI Agent prompt
                    </div>
                    <div class="prompt-box-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.<span class="prompt-cursor"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Connector -->
<section id="connector" class="py-5 my-5">
    <div class="container">
        <div class="connector-card text-center mx-auto" style="max-width:740px;">
            <div class="mb-3">
                <span class="section-label"><i class="bi bi-plug"></i> MCP Connector</span>
            </div>
            <i class="bi bi-puzzle-fill text-gradient" style="font-size:3rem;"></i>
            <h3 class="fw-bold mt-3 mb-2">Lorem ipsum. Dolor sit amet.</h3>
            <p class="text-muted-tf mb-4" style="max-width:520px;margin:0 auto;">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua &mdash;
                ut enim ad minim veniam.
            </p>
            <div class="connector-code text-start mb-4">
                <span style="color:var(--tf-text-muted);">// MCP connector konfigurace</span><br>
                {<br>
                &nbsp;&nbsp;<span style="color:var(--tf-primary-light);">"mcpServers"</span>: {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--tf-primary-light);">"typeforge"</span>: {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--tf-primary-light);">"url"</span>: <span style="color:var(--tf-accent);">"https://your-instance/mcp/sse"</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;}<br>
                &nbsp;&nbsp;}<br>
                }
            </div>
            <p class="text-muted-tf small mb-3">Lorem ipsum dolor sit amet consectetur</p>
            <div class="d-flex flex-wrap gap-2 justify-content-center">
                <span class="agent-badge">Claude Code</span>
                <span class="agent-badge">Cursor</span>
                <span class="agent-badge">Windsurf</span>
                <span class="agent-badge">Cline</span>
                <span class="agent-badge">a dal&scaron;&iacute;</span>
            </div>
        </div>
    </div>
</section>

<!-- Features -->
<section id="features" class="py-5 my-5">
    <div class="container">
        <div class="text-center mb-5">
            <span class="section-label"><i class="bi bi-grid-3x3-gap"></i> Funkce</span>
            <h3 class="fw-bold">Lorem ipsum dolor sit amet</h3>
            <p class="text-muted-tf mx-auto" style="max-width:560px;">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
        <div class="row g-4">
            <div class="col-md-6 col-lg-4">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-robot"></i></div>
                    <h5 class="fw-bold mb-2">Lorem Ipsum</h5>
                    <p class="text-muted-tf mb-0">Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-code-slash"></i></div>
                    <h5 class="fw-bold mb-2">Dolor Sit</h5>
                    <p class="text-muted-tf mb-0">Amet consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-cloud-arrow-up"></i></div>
                    <h5 class="fw-bold mb-2">Consectetur</h5>
                    <p class="text-muted-tf mb-0">Adipiscing elit sed do eiusmod tempor incididunt. Ut labore et dolore magna aliqua.</p>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-database"></i></div>
                    <h5 class="fw-bold mb-2">Adipiscing &amp; Elit</h5>
                    <p class="text-muted-tf mb-0">Sed do eiusmod tempor incididunt ut labore et dolore. Magna aliqua ut enim ad minim.</p>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-diagram-3"></i></div>
                    <h5 class="fw-bold mb-2">Sed Eiusmod</h5>
                    <p class="text-muted-tf mb-0">Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="feature-card">
                    <div class="feature-icon"><i class="bi bi-share"></i></div>
                    <h5 class="fw-bold mb-2">Tempor</h5>
                    <p class="text-muted-tf mb-0">Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- How it works -->
<section id="how-it-works" class="py-5 my-5">
    <div class="container">
        <div class="text-center mb-5">
            <span class="section-label"><i class="bi bi-arrow-repeat"></i> Proces</span>
            <h3 class="fw-bold">Lorem ipsum dolor sit</h3>
            <p class="text-muted-tf mx-auto" style="max-width:560px;">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
        </div>
        <div class="row g-4 justify-content-center">
            <div class="col-md-4">
                <div class="step-card">
                    <div class="step-number">1</div>
                    <h5 class="fw-bold mb-2">Lorem ipsum</h5>
                    <p class="text-muted-tf mb-0">Dolor sit amet consectetur adipiscing elit &mdash; sed do eiusmod tempor incididunt.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="step-card">
                    <div class="step-number">2</div>
                    <h5 class="fw-bold mb-2">Dolor sit amet</h5>
                    <p class="text-muted-tf mb-0">Consectetur adipiscing elit. Sed do eiusmod &mdash; tempor incididunt ut labore et dolore.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="step-card">
                    <div class="step-number">3</div>
                    <h5 class="fw-bold mb-2">Consectetur</h5>
                    <p class="text-muted-tf mb-0">Adipiscing elit sed do eiusmod. Tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CTA -->
<section class="py-5 my-5">
    <div class="container">
        <div class="cta-section text-center">
            <i class="bi bi-rocket-takeoff text-gradient" style="font-size:2.5rem;"></i>
            <h3 class="fw-bold mt-3 mb-2">Lorem ipsum dolor</h3>
            <p class="text-muted-tf mb-4 mx-auto" style="max-width:480px;">
                Sit amet consectetur adipiscing elit, sed do eiusmod tempor.<br>
                Incididunt ut labore et dolore.
            </p>
            <a href="#" class="btn btn-primary-tf btn-lg">
                <i class="bi bi-rocket-takeoff me-2"></i>Lorem ipsum
            </a>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="py-4 text-center border-top" style="border-color:rgba(255,255,255,0.05)!important;">
    <div class="container">
        <p class="text-muted-tf small mb-0">TypeForge &mdash; Lorem ipsum dolor sit amet</p>
    </div>
</footer>`;
}

export function renderIndex(request: Request, response: Response): Response {
    response.content = getHtmlTemplate("TypeForge — AI Hosting pro Vibe Coding", getLandingPageContent());
    return response;
}

export function renderLogin(request: Request, response: Response): Response {
    response.content = getHtmlTemplate("Login — TypeForge", getLoginPageContent());
    return response;
}

function getLoginPageContent(): string {
    return `
<style>
.login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 2rem 1rem;
}
.login-wrapper::before {
    content: '';
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(124,92,252,0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}
.login-card {
    max-width: 440px;
    width: 100%;
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 20px;
    padding: 3rem 2.5rem;
    position: relative;
    z-index: 2;
}
.login-card .form-control {
    background: var(--tf-bg);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 0.85rem 1rem;
    color: var(--tf-text);
    font-size: 0.95rem;
    transition: all 0.2s ease;
}
.login-card .form-control:focus {
    border-color: var(--tf-primary);
    box-shadow: 0 0 0 3px rgba(124,92,252,0.15);
    background: var(--tf-bg);
    color: var(--tf-text);
}
.login-card .form-label {
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--tf-text-muted);
    margin-bottom: 0.5rem;
}
.login-icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    background: var(--tf-gradient-subtle);
    color: var(--tf-primary-light);
    margin-bottom: 1.25rem;
}
.login-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
    margin: 1.5rem 0;
}
.login-divider::before,
.login-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
}
</style>

<div class="login-wrapper">
    <div class="login-card">
        <div class="text-center mb-4">
            <a href="/" class="text-decoration-none">
                <span class="text-gradient fw-bold fs-4">
                    <i class="bi bi-braces-asterisk me-1"></i>TypeForge
                </span>
            </a>
        </div>
        <div class="text-center mb-4">
            <div class="login-icon">
                <i class="bi bi-shield-lock"></i>
            </div>
            <h4 class="fw-bold mb-1">Lorem ipsum</h4>
            <p class="text-muted-tf small">Dolor sit amet consectetur</p>
        </div>

        <form>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" placeholder="vas@email.cz">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Lorem ipsum</label>
                <input type="password" class="form-control" id="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;">
            </div>
            <div class="d-grid mt-4">
                <button type="submit" class="btn btn-primary-tf btn-lg">
                    <i class="bi bi-box-arrow-in-right me-2"></i>Lorem ipsum
                </button>
            </div>
        </form>

        <div class="text-center mt-4">
            <a href="#" class="text-muted-tf text-decoration-none small" style="transition:color 0.2s;">Dolor sit amet?</a>
        </div>
        <div class="login-divider">nebo</div>
        <div class="text-center">
            <span class="text-muted-tf small">Lorem ipsum dolor? </span>
            <a href="#" class="small fw-semibold text-decoration-none" style="color:var(--tf-primary-light);">Sit amet</a>
        </div>
    </div>
</div>`;
}

export function renderNotFound(request: Request, response: Response): Response {
    response.status = 404;
    response.content = getHtmlTemplate("Str\u00e1nka nenalezena", `
<style>
.notfound-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}
.notfound-wrapper::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}
.notfound-card {
    text-align: center;
    position: relative;
    z-index: 2;
}
.notfound-code {
    font-size: 8rem;
    font-weight: 800;
    line-height: 1;
    background: var(--tf-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
}
.notfound-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    background: var(--tf-gradient-subtle);
    color: var(--tf-primary-light);
    margin-bottom: 1.5rem;
}
</style>

<div class="notfound-wrapper">
    <div class="notfound-card">
        <div class="notfound-icon">
            <i class="bi bi-exclamation-triangle"></i>
        </div>
        <div class="notfound-code">404</div>
        <h4 class="fw-bold mb-2">Str\u00e1nka nenalezena</h4>
        <p class="text-muted-tf mb-4">Omlouv\u00e1me se, ale hledan\u00e1 str\u00e1nka neexistuje.</p>
        <a href="/" class="btn btn-primary-tf btn-lg">
            <i class="bi bi-house me-2"></i>Zp\u011bt na \u00favod
        </a>
    </div>
</div>`);
    return response;
}
