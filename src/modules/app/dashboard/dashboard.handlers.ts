import { getHtmlTemplate } from "../../../template";
import { AdminLayout, StatsGrid, CardSection, map } from "../../../components";
import { requireAdmin } from "../shared";
import { countUsers } from "./dashboard.repository";
import { QUICK_ACTIONS } from "./dashboard.const";
import { DASHBOARD_T } from "./dashboard.translation";

export function renderAdmin(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const userCount = countUsers();

    const stats = [
        { icon: "people", iconColor: "blue" as const, value: String(userCount), label: DASHBOARD_T.stats.users },
    ];

    response.content = getHtmlTemplate(DASHBOARD_T.titles.admin, AdminLayout({
        title: DASHBOARD_T.headings.dashboard,
        activePage: "dashboard",
        children: `
            ${StatsGrid({ stats })}

            <div class="row g-4">
                <div class="col-lg-8">
                    ${CardSection({
                        title: DASHBOARD_T.sections.overview,
                        children: `
                            <div class="text-center py-5">
                                <i class="bi bi-braces-asterisk text-gradient" style="font-size:3rem;"></i>
                                <h5 class="fw-bold mt-3">${DASHBOARD_T.empty.welcome}</h5>
                                <p class="text-muted-tf">${DASHBOARD_T.empty.description}</p>
                            </div>
                        `
                    })}
                </div>

                <div class="col-lg-4">
                    ${CardSection({
                        title: DASHBOARD_T.sections.quickActions,
                        children: map(QUICK_ACTIONS, a => `
                            <a href="${a.href}" class="quick-action" style="text-decoration:none;color:inherit;">
                                <div class="quick-action-icon"><i class="bi bi-${a.icon}"></i></div>
                                <div class="quick-action-text"><h6>${a.title}</h6><p>${a.desc}</p></div>
                            </a>
                        `)
                    })}
                </div>
            </div>
        `
    }));
    return response;
}

export function renderAdminAnalytics(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const userCount = countUsers();

    const stats = [
        { icon: "people", iconColor: "blue" as const, value: String(userCount), label: DASHBOARD_T.stats.users },
    ];

    response.content = getHtmlTemplate(DASHBOARD_T.titles.admin, AdminLayout({
        title: DASHBOARD_T.headings.dashboard,
        activePage: "analytics",
        children: `
            ${StatsGrid({ stats })}
            <div class="row g-4">
                <div class="col-12">
                    ${CardSection({
                        title: DASHBOARD_T.sections.overview,
                        children: `<p class="text-muted-tf text-center py-4">${DASHBOARD_T.empty.description}</p>`
                    })}
                </div>
            </div>
        `
    }));
    return response;
}
