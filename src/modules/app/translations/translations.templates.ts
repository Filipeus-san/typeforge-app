import { AdminForm, FormSection, AdminDataList, Badge, escapeHtml } from "../../../components";
import { SUPPORTED_LANGUAGES, ENTITY_TYPE_OPTIONS, ENTITY_TYPE_LABELS, LANGUAGE_LABELS, TRANSLATABLE_FIELDS } from "./translations.const";
import { DbTranslationRow } from "./translations.types";
import { TRANSLATIONS_T } from "./translations.translation";

export function getTranslationsListContent(
    translations: DbTranslationRow[],
    entityTypeFilter: string,
    languageFilter: string
): string {
    const rows = translations.map(t => ({
        id: t.entity_type + ':' + String(t.entity_id) + ':' + t.language,
        entity_type: t.entity_type,
        entity_name: t.entity_name,
        language: t.language,
        entity_id: String(t.entity_id),
    }));

    return AdminDataList({
        columns: [
            {
                key: 'entity_type',
                label: TRANSLATIONS_T.columns.type,
                width: '20%',
                render: (val) => Badge({ children: ENTITY_TYPE_LABELS[val] !== undefined ? ENTITY_TYPE_LABELS[val] : val, variant: 'default' }),
            },
            {
                key: 'entity_name',
                label: TRANSLATIONS_T.columns.entity,
                width: '35%',
                render: (val) => `<strong>${escapeHtml(val)}</strong>`,
            },
            {
                key: 'language',
                label: TRANSLATIONS_T.columns.language,
                width: '20%',
                render: (val) => Badge({ children: LANGUAGE_LABELS[val] !== undefined ? LANGUAGE_LABELS[val] : val, variant: 'info' }),
            },
        ],
        rows,
        actions: [
            { icon: 'pencil', href: (row) => `/admin/translations/edit?entity_type=${row.entity_type}&entity_id=${row.entity_id}&language=${row.language}`, title: TRANSLATIONS_T.actions.saveChanges },
            { icon: 'trash', href: (row) => `/admin/translations/delete?entity_type=${row.entity_type}&entity_id=${row.entity_id}&language=${row.language}`, variant: 'danger', title: TRANSLATIONS_T.actions.backToList, confirm: TRANSLATIONS_T.confirm.deleteAll },
        ],
        filters: [
            { name: 'entity_type', options: ENTITY_TYPE_OPTIONS, value: entityTypeFilter, placeholder: TRANSLATIONS_T.filters.allTypes },
            { name: 'language', options: SUPPORTED_LANGUAGES, value: languageFilter, placeholder: TRANSLATIONS_T.filters.allLanguages },
        ],
        addButton: { label: TRANSLATIONS_T.actions.newTranslation, href: '/admin/translations/create' },
        emptyMessage: TRANSLATIONS_T.empty.translations,
    });
}

export function getTranslationFormContent(
    request: Request,
    entities: Array<{ id: number; name: string }>,
    data?: Record<string, string>,
    error?: string,
    isEdit: boolean = false,
    originalFields?: Record<string, string>
): string {
    const entityType = data?.entity_type ?? '';

    const entityOptions = entities.map(e => ({ value: String(e.id), label: e.name }));

    const sidebarFields: any[] = [];

    if (isEdit) {
        sidebarFields.push(
            { name: 'entity_type', label: TRANSLATIONS_T.form.labels.entityType, type: 'hidden' as const },
            { name: 'entity_id', label: TRANSLATIONS_T.form.labels.entity, type: 'hidden' as const },
            { name: 'language', label: TRANSLATIONS_T.form.labels.language, type: 'hidden' as const },
        );
    } else {
        const entityTypeSelectOptions = [
            { value: '', label: TRANSLATIONS_T.form.labels.selectType },
            ...ENTITY_TYPE_OPTIONS,
        ];
        const languageSelectOptions = [
            { value: '', label: TRANSLATIONS_T.form.labels.selectLanguage },
            ...SUPPORTED_LANGUAGES,
        ];
        const entitySelectOptions = entityOptions.length > 0
            ? [{ value: '', label: TRANSLATIONS_T.form.labels.selectEntity }, ...entityOptions]
            : [{ value: '', label: TRANSLATIONS_T.form.labels.selectEntityFirst }];
        sidebarFields.push(
            { name: 'entity_type', label: TRANSLATIONS_T.form.labels.entityType, type: 'select' as const, options: entityTypeSelectOptions, required: true },
            { name: 'entity_id', label: TRANSLATIONS_T.form.labels.entity, type: 'select' as const, options: entitySelectOptions, required: true },
            { name: 'language', label: TRANSLATIONS_T.form.labels.language, type: 'select' as const, options: languageSelectOptions, required: true },
        );
    }

    const sections: FormSection[] = [
        {
            title: isEdit ? '' : TRANSLATIONS_T.form.sections.entitySelection,
            position: 'sidebar',
            fields: sidebarFields,
        },
    ];

    // Add info section for edit mode
    if (isEdit) {
        const entityTypeLabel = ENTITY_TYPE_LABELS[entityType] !== undefined ? ENTITY_TYPE_LABELS[entityType] : entityType;
        const languageLabel = LANGUAGE_LABELS[data?.language ?? ''] !== undefined ? LANGUAGE_LABELS[data?.language ?? ''] : (data?.language ?? '');
        const entityName = data?._entity_name ?? '';

        sections.push({
            title: TRANSLATIONS_T.form.sections.info,
            position: 'sidebar',
            fields: [
                { name: '_info_type', label: TRANSLATIONS_T.form.labels.entityType + ': ' + entityTypeLabel, type: 'hidden' as const },
                { name: '_info_entity', label: TRANSLATIONS_T.form.labels.entity + ': ' + entityName, type: 'hidden' as const },
                { name: '_info_language', label: TRANSLATIONS_T.form.labels.language + ': ' + languageLabel, type: 'hidden' as const },
            ],
        });
    }

    // Add translatable fields if entity type is known
    const fields = TRANSLATABLE_FIELDS[entityType];
    const origFields = originalFields ?? {};
    if (fields !== undefined) {
        const entityIdVal = data?.entity_id ?? '';
        const hasEntity = entityIdVal !== '' && entityIdVal !== '0';
        sections.push({
            title: TRANSLATIONS_T.form.sections.translations,
            position: 'main',
            fields: fields.map(f => {
                const origVal = origFields[f.name];
                let hint = '';
                if (hasEntity && origVal !== undefined && origVal !== '') {
                    const truncated = origVal.length > 120 ? origVal.substring(0, 120) + '…' : origVal;
                    hint = TRANSLATIONS_T.form.labels.originalPrefix + truncated;
                } else if (hasEntity) {
                    hint = TRANSLATIONS_T.form.labels.originalEmpty;
                } else {
                    hint = TRANSLATIONS_T.form.labels.selectEntityForOriginal;
                }
                return {
                    name: f.name,
                    label: f.label,
                    type: f.type,
                    rows: f.rows,
                    hint,
                };
            }),
        });
    } else {
        sections.push({
            title: TRANSLATIONS_T.form.sections.translations,
            position: 'main',
            fields: [
                { name: '_placeholder', label: TRANSLATIONS_T.form.labels.selectEntityFirst2, type: 'hidden' as const },
            ],
        });
    }

    const formHtml = AdminForm({
        sections,
        values: data,
        error,
        submitLabel: isEdit ? TRANSLATIONS_T.actions.saveChanges : TRANSLATIONS_T.actions.createTranslation,
        submitIcon: isEdit ? 'check-lg' : 'plus-lg',
        backUrl: '/admin/translations',
    });

    // Add JS to reload page when entity_type or entity_id changes (create mode only)
    if (!isEdit) {
        const script = `<script>
(function(){
    var typeSel = document.querySelector('select[name="entity_type"]');
    var entitySel = document.querySelector('select[name="entity_id"]');
    if(typeSel) typeSel.addEventListener('change', function(){
        var v = typeSel.value;
        if(v) window.location.href = '/admin/translations/create?entity_type=' + encodeURIComponent(v);
        else window.location.href = '/admin/translations/create';
    });
    if(entitySel) entitySel.addEventListener('change', function(){
        var t = typeSel ? typeSel.value : '';
        var e = entitySel.value;
        if(t && e) window.location.href = '/admin/translations/create?entity_type=' + encodeURIComponent(t) + '&entity_id=' + encodeURIComponent(e);
        else if(t) window.location.href = '/admin/translations/create?entity_type=' + encodeURIComponent(t);
    });
})();
</script>`;
        return formHtml + script;
    }

    return formHtml;
}
