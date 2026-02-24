import { getHtmlTemplate } from "../../../template";
import { AdminLayout, Badge, escapeHtml } from "../../../components";
import { getPayloudData } from "../../../utils";
import { transformValidate, ValidationError } from "../../../validator";
import { requireAdmin } from "../shared";
import { TranslationForm } from "./translations.validation";
import { getTranslationsListContent, getTranslationFormContent } from "./translations.templates";
import { TRANSLATABLE_FIELDS, ENTITY_TYPE_LABELS, LANGUAGE_LABELS } from "./translations.const";
import {
    findAllTranslationsGrouped, findTranslationsByEntityAndLanguage,
    upsertTranslation, deleteTranslationsByEntityAndLanguage, getEntitiesByType, getEntityOriginalFields
} from "./translations.repository";
import { TRANSLATIONS_T } from "./translations.translation";

// =============================================================================
// Admin Translations List
// =============================================================================

export function renderAdminTranslations(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ entity_type?: string; language?: string }>(request.query);
    const entityTypeFilter = params?.entity_type ?? '';
    const languageFilter = params?.language ?? '';

    let translations = findAllTranslationsGrouped();

    if (entityTypeFilter !== '') {
        translations = translations.filter(t => t.entity_type === entityTypeFilter);
    }
    if (languageFilter !== '') {
        translations = translations.filter(t => t.language === languageFilter);
    }

    const content = getTranslationsListContent(translations, entityTypeFilter, languageFilter);

    response.content = getHtmlTemplate(TRANSLATIONS_T.titles.admin, AdminLayout({
        title: TRANSLATIONS_T.headings.admin,
        activePage: "translations",
        children: content,
    }));
    return response;
}

// =============================================================================
// Admin Translation Create
// =============================================================================

export function renderAdminTranslationCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        return handleTranslationCreate(request, response);
    }

    // GET — check if entity_type and entity_id are selected
    const params = parseUrlQuery<{ entity_type?: string; entity_id?: string }>(request.query);
    const entityType = params?.entity_type ?? '';
    const entityIdParam = params?.entity_id ?? '';

    const entities = entityType !== '' ? getEntitiesByType(entityType) : [];

    // Load original field values if entity is selected
    const originalFields = (entityType !== '' && entityIdParam !== '')
        ? getEntityOriginalFields(entityType, Number(entityIdParam))
        : {};

    response.content = getHtmlTemplate(TRANSLATIONS_T.titles.create, AdminLayout({
        title: TRANSLATIONS_T.headings.create,
        activePage: "translations",
        children: getTranslationFormContent(request, entities, { entity_type: entityType, entity_id: entityIdParam }, undefined, false, originalFields),
    }));
    return response;
}

function handleTranslationCreate(request: Request, response: Response): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(TRANSLATIONS_T.titles.create, AdminLayout({
            title: TRANSLATIONS_T.headings.create,
            activePage: "translations",
            children: getTranslationFormContent(request, [], undefined, TRANSLATIONS_T.errors.invalidRequest),
        }));
        return response;
    }

    try {
        const data = transformValidate(TranslationForm, raw);
        const entityType = data.entity_type;
        const entityId = Number(data.entity_id);
        const language = data.language;
        const origFields = (entityType !== '' && entityId > 0) ? getEntityOriginalFields(entityType, entityId) : {};

        if (entityId === 0 || isNaN(entityId)) {
            const entities = entityType !== '' ? getEntitiesByType(entityType) : [];
            response.content = getHtmlTemplate("Nový překlad — Administrace", AdminLayout({
                title: "Nový překlad",
                activePage: "translations",
                children: getTranslationFormContent(request, entities, raw, TRANSLATIONS_T.errors.selectEntity, false, origFields),
            }));
            return response;
        }

        const fields = TRANSLATABLE_FIELDS[entityType];
        if (fields === undefined) {
            const entities = getEntitiesByType(entityType);
            response.content = getHtmlTemplate("Nový překlad — Administrace", AdminLayout({
                title: "Nový překlad",
                activePage: "translations",
                children: getTranslationFormContent(request, entities, raw, TRANSLATIONS_T.errors.unknownEntityType, false, origFields),
            }));
            return response;
        }

        // Check at least one field is filled
        let hasValue = false;
        for (let i = 0; i < fields.length; i++) {
            const val = raw[fields[i].name];
            if (val !== undefined && val !== '') {
                hasValue = true;
            }
        }

        if (!hasValue) {
            const entities = getEntitiesByType(entityType);
            response.content = getHtmlTemplate("Nový překlad — Administrace", AdminLayout({
                title: "Nový překlad",
                activePage: "translations",
                children: getTranslationFormContent(request, entities, raw, TRANSLATIONS_T.errors.fillAtLeastOneField, false, origFields),
            }));
            return response;
        }

        // Upsert each filled field
        for (let i = 0; i < fields.length; i++) {
            const fieldValue = raw[fields[i].name];
            if (fieldValue !== undefined && fieldValue !== '') {
                upsertTranslation(entityType, entityId, language, fields[i].name, fieldValue);
            }
        }

        response.status = 302;
        response.headers["Location"] = "/admin/translations";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values((error as ValidationError).errors)[0]?.[0] ?? TRANSLATIONS_T.errors.validationError;
            const entityType = raw.entity_type ?? '';
            const entityIdStr = raw.entity_id ?? '';
            const entities = entityType !== '' ? getEntitiesByType(entityType) : [];
            const origFields = (entityType !== '' && entityIdStr !== '') ? getEntityOriginalFields(entityType, Number(entityIdStr)) : {};
            response.content = getHtmlTemplate("Nový překlad — Administrace", AdminLayout({
                title: "Nový překlad",
                activePage: "translations",
                children: getTranslationFormContent(request, entities, raw, firstError, false, origFields),
            }));
            return response;
        }
        response.content = getHtmlTemplate(TRANSLATIONS_T.titles.create, AdminLayout({
            title: TRANSLATIONS_T.headings.create,
            activePage: "translations",
            children: getTranslationFormContent(request, [], raw, TRANSLATIONS_T.errors.genericError),
        }));
        return response;
    }
}

// =============================================================================
// Admin Translation Edit
// =============================================================================

export function renderAdminTranslationEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ entity_type?: string; entity_id?: string; language?: string }>(request.query);
    const entityType = params?.entity_type ?? '';
    const entityIdStr = params?.entity_id ?? '';
    const language = params?.language ?? '';

    if (entityType === '' || entityIdStr === '' || language === '') {
        response.status = 302;
        response.headers["Location"] = "/admin/translations";
        return response;
    }

    const entityId = Number(entityIdStr);

    // Get entity name for display
    const entities = getEntitiesByType(entityType);
    let entityName = '';
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].id === entityId) {
            entityName = entities[i].name;
        }
    }

    if (request.method === "post") {
        return handleTranslationEdit(request, response, entityType, entityId, language, entityName, entities);
    }

    // Load existing translations and original fields
    const existing = findTranslationsByEntityAndLanguage(entityType, entityId, language);
    const originalFields = getEntityOriginalFields(entityType, entityId);
    const formData: Record<string, string> = {
        entity_type: entityType,
        entity_id: String(entityId),
        language: language,
        _entity_name: entityName,
    };
    for (let i = 0; i < existing.length; i++) {
        formData[existing[i].field_name] = existing[i].field_value;
    }

    response.content = getHtmlTemplate(TRANSLATIONS_T.titles.edit, AdminLayout({
        title: TRANSLATIONS_T.headings.edit,
        activePage: "translations",
        children: getTranslationFormContent(request, entities, formData, undefined, true, originalFields),
    }));
    return response;
}

function handleTranslationEdit(request: Request, response: Response, entityType: string, entityId: number, language: string, entityName: string, entities: Array<{ id: number; name: string }>): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        const formData: Record<string, string> = {
            entity_type: entityType,
            entity_id: String(entityId),
            language: language,
            _entity_name: entityName,
        };
        response.content = getHtmlTemplate("Upravit překlad — Administrace", AdminLayout({
            title: "Upravit překlad",
            activePage: "translations",
            children: getTranslationFormContent(request, entities, formData, TRANSLATIONS_T.errors.invalidRequest, true),
        }));
        return response;
    }

    const fields = TRANSLATABLE_FIELDS[entityType];
    if (fields === undefined) {
        response.status = 302;
        response.headers["Location"] = "/admin/translations";
        return response;
    }

    // Upsert all fields (even empty ones to clear values)
    for (let i = 0; i < fields.length; i++) {
        const fieldValue = raw[fields[i].name];
        if (fieldValue !== undefined && fieldValue !== '') {
            upsertTranslation(entityType, entityId, language, fields[i].name, fieldValue);
        }
    }

    response.status = 302;
    response.headers["Location"] = "/admin/translations";
    return response;
}

// =============================================================================
// Admin Translation Delete
// =============================================================================

export function handleAdminTranslationDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ entity_type?: string; entity_id?: string; language?: string }>(request.query);
    const entityType = params?.entity_type ?? '';
    const entityIdStr = params?.entity_id ?? '';
    const language = params?.language ?? '';

    if (entityType !== '' && entityIdStr !== '' && language !== '') {
        deleteTranslationsByEntityAndLanguage(entityType, Number(entityIdStr), language);
    }

    response.status = 302;
    response.headers["Location"] = "/admin/translations";
    return response;
}
