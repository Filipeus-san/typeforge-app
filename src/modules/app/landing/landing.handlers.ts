import { getReactPageTemplate } from "../../../react";
import { getVisibleMenuItems, getSiteSettings } from "../shared";
import { findPageById } from "../pages/pages.repository";
import { getSettingsMap } from "../auth/auth.repository";

export function renderIndex(request: Request, response: Response): Response {
    const settings = getSiteSettings();
    const settingsMap = getSettingsMap();
    const homepageId = settingsMap['homepageId'] ?? '';

    if (homepageId !== '') {
        const page = findPageById(Number(homepageId));
        if (page !== null && page.status === 'published') {
            const pageTitle = (page.meta_title !== null && page.meta_title !== '') ? page.meta_title : settings.siteName;
            response.content = getReactPageTemplate(pageTitle, "Page", {
                menuItems: getVisibleMenuItems(),
                siteSettings: settings,
                title: page.title,
                content: page.content,
            }, {
                seo: {
                    description: page.meta_description ?? (settings.siteDescription !== '' ? settings.siteDescription : ''),
                    canonicalUrl: "https://" + request.host + "/",
                    ogType: 'website',
                },
            });
            return response;
        }
    }

    // Fallback when no homepage is configured
    response.content = getReactPageTemplate(settings.siteName, "Page", {
        menuItems: getVisibleMenuItems(),
        siteSettings: settings,
        title: settings.siteName,
        content: '<p>Domovská stránka není nastavena. Vytvořte stránku v administraci a nastavte ji jako domovskou v Nastavení.</p>',
    });
    return response;
}
