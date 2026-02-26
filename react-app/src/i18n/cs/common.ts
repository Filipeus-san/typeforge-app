export const common = {
    sidebar: {
        sections: {
            main: 'Hlavní',
            eshop: 'E-Shop',
            content: 'Obsah',
        },
        items: {
            dashboard: 'Dashboard',
            analytics: 'Analytika',
            orders: 'Objednávky',
            products: 'Produkty',
            categories: 'Kategorie',
            customers: 'Zákazníci',
            warehouse: 'Sklad',
            blog: 'Blog',
            media: 'Média',
        },
    },
    layout: {
        web: 'Web',
        toggleSidebar: 'Přepnout postranní panel',
        toggleTheme: 'Přepnout téma',
    },
    confirm: {
        title: 'Potvrdit akci',
        cancel: 'Zrušit',
        confirm: 'Potvrdit',
    },
    nav: {
        home: 'Domů',
        features: 'Funkce',
        article: 'Článek',
        eshop: 'E-Shop',
        admin: 'Admin',
        toggleTheme: 'Přepnout téma',
        logout: 'Odhlásit',
    },
    footer: {
        brand: 'TypeForge',
        tagline: 'Moderní serverless web framework',
        links: {
            documentation: 'Dokumentace',
            github: 'GitHub',
            blog: 'Blog',
            community: 'Komunita',
        },
        copyright: 'TypeForge. Všechna práva vyhrazena.',
    },
    customers: {
        heading: 'Zákazníci',
        columns: {
            name: 'Jméno',
            email: 'Email',
            orders: 'Objednávek',
            totalSpent: 'Celkem utraceno',
            registered: 'Registrace',
        },
        empty: 'Žádní zákazníci k zobrazení',
    },
    errors: {
        invalidRequest: 'Neplatný požadavek',
        validationError: 'Chyba validace',
        genericError: 'Došlo k chybě, zkuste to znovu',
    },
} as const;
