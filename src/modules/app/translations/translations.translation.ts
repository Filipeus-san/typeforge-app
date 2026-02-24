export const TRANSLATIONS_T = {
    titles: {
        admin: 'Překlady — Administrace',
        create: 'Nový překlad — Administrace',
        edit: 'Upravit překlad — Administrace',
    },
    headings: {
        admin: 'Překlady',
        create: 'Nový překlad',
        edit: 'Upravit překlad',
    },
    actions: {
        newTranslation: 'Nový překlad',
        createTranslation: 'Vytvořit překlad',
        saveChanges: 'Uložit změny',
        backToList: 'Zpět na seznam',
    },
    empty: {
        translations: 'Žádné překlady k zobrazení',
    },
    errors: {
        invalidRequest: 'Neplatný požadavek',
        validationError: 'Chyba validace',
        genericError: 'Došlo k chybě, zkuste to znovu',
        selectEntity: 'Vyberte entitu',
        unknownEntityType: 'Neznámý typ entity',
        fillAtLeastOneField: 'Vyplňte alespoň jedno pole překladu',
    },
    confirm: {
        deleteAll: 'Opravdu smazat všechny překlady?',
    },
    form: {
        sections: {
            entitySelection: 'Výběr entity',
            translations: 'Překlady',
            info: 'Informace',
        },
        labels: {
            entityType: 'Typ entity',
            entity: 'Entita',
            language: 'Jazyk',
            selectType: '— Vyberte typ —',
            selectEntity: '— Vyberte entitu —',
            selectEntityFirst: '— Nejprve vyberte typ —',
            selectLanguage: '— Vyberte jazyk —',
            selectEntityForOriginal: 'Vyberte entitu pro zobrazení originálu',
            originalEmpty: 'Originál: (prázdné)',
            originalPrefix: 'Originál: ',
            selectEntityFirst2: 'Nejprve vyberte typ entity',
        },
    },
    entityTypes: {
        product: 'Produkt',
        blogPost: 'Blog článek',
        category: 'Kategorie',
    },
    fields: {
        productName: 'Název produktu',
        shortDescription: 'Krátký popis',
        description: 'Popis',
        articleTitle: 'Nadpis článku',
        excerpt: 'Perex',
        content: 'Obsah',
        categoryName: 'Název kategorie',
    },
    filters: {
        allTypes: 'Všechny typy',
        allLanguages: 'Všechny jazyky',
    },
    columns: {
        type: 'Typ',
        entity: 'Entita',
        language: 'Jazyk',
    },
} as const;
