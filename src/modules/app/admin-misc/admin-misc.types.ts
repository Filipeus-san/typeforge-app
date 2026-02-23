// =============================================================================
// Admin Settings Types & Helpers
// =============================================================================

export interface DbSetting {
    id: number;
    key: string;
    value: string;
    updated_at: string;
}

export { SETTINGS_DEFAULTS } from "./admin-misc.const";
