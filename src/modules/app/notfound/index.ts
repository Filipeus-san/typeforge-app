import { getHtmlTemplate } from "../../../template";

export function renderNotFound(request: Request, response: Response): Response {
    response.status = 404;
    response.content = getHtmlTemplate("Stránka nenalezena", `
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
        <h4 class="fw-bold mb-2">Stránka nenalezena</h4>
        <p class="text-muted-tf mb-4">Omlouváme se, ale hledaná stránka neexistuje.</p>
        <a href="/" class="btn btn-primary-tf btn-lg">
            <i class="bi bi-house me-2"></i>Zpět na úvod
        </a>
    </div>
</div>`);
    return response;
}
