import { DbSetting, SETTINGS_DEFAULTS } from "./admin-misc.types";
import { findAllSettings, upsertSetting } from "./admin-misc.repository";

export function getAllSettings(): Record<string, string> {
    const result: Record<string, string> = {};
    for (const key of Object.keys(SETTINGS_DEFAULTS)) {
        result[key] = SETTINGS_DEFAULTS[key];
    }
    const rows = findAllSettings();
    for (const row of rows) {
        result[row.key] = row.value;
    }
    return result;
}

export function saveSetting(key: string, value: string): void {
    upsertSetting(key, value);
}

export function settingsCheckbox(name: string, label: string, checked: boolean): string {
    return `
        <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" name="${name}" id="${name}" value="1" ${checked ? 'checked' : ''}>
            <label class="form-check-label" for="${name}">${label}</label>
        </div>
    `;
}

export function formatUserDate(dateStr: string): string {
    if (!dateStr || dateStr.length < 10) return '-';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(5, 7);
    const day = dateStr.substring(8, 10);
    const d = Number(day);
    const m = Number(month);
    if (d > 0 && m > 0) return `${d}. ${m}. ${year}`;
    return '-';
}
