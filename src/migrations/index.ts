import { migration001CreateUsers } from "./001_create_users";
import { migration002CreatePages } from "./002_create_pages";
import { migration003CreateMedia } from "./003_create_media";
import { migration004CreateBlogCategories } from "./004_create_blog_categories";
import { migration005CreateArticles } from "./005_create_articles";
import { migration006CreateMenuItems } from "./006_create_menu_items";
import { migration007CreateSettings } from "./007_create_settings";
import { migration008CreatePageViews } from "./008_create_page_views";
import { migration009CreateRedirects } from "./009_create_redirects";
import { migration010CreatePasswordResetTokens } from "./010_create_password_reset_tokens";

export const migrations: Migration[] = [
    migration001CreateUsers,
    migration002CreatePages,
    migration003CreateMedia,
    migration004CreateBlogCategories,
    migration005CreateArticles,
    migration006CreateMenuItems,
    migration007CreateSettings,
    migration008CreatePageViews,
    migration009CreateRedirects,
    migration010CreatePasswordResetTokens,
];
