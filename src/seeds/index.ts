import { seed001Users } from "./001_seed_users";
import { seed002Settings } from "./002_seed_settings";
import { seed003Pages } from "./003_seed_pages";
import { seed004BlogCategories } from "./004_seed_blog_categories";
import { seed005Articles } from "./005_seed_articles";
import { seed006MenuItems } from "./006_seed_menu_items";
import { seed007EnsureAdmin } from "./007_seed_ensure_admin";

export const seeds: Seed[] = [
    seed001Users,
    seed002Settings,
    seed003Pages,
    seed004BlogCategories,
    seed005Articles,
    seed006MenuItems,
    seed007EnsureAdmin,
];
