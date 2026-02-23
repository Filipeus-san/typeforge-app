import { migration_001_create_users } from "./001_create_users";
import { migration_002_create_settings } from "./002_create_settings";
import { migration_003_create_media } from "./003_create_media";

export const migrations: Migration[] = [
    migration_001_create_users,
    migration_002_create_settings,
    migration_003_create_media,
];
