export const ADMIN_MISC_T = {
    titles: {
        settings: 'Nastavení — Administrace',
        users: 'Uživatelé — Administrace',
        userCreate: 'Nový uživatel — Administrace',
        userEdit: 'Upravit uživatele — Administrace',
    },
    headings: {
        settings: 'Nastavení',
        users: 'Uživatelé',
        userCreate: 'Nový uživatel',
        userEdit: 'Upravit uživatele',
    },
    actions: {
        addUser: 'Přidat uživatele',
        createUser: 'Vytvořit uživatele',
        saveChanges: 'Uložit změny',
        cancel: 'Zrušit',
        editUser: 'Upravit',
        deleteUser: 'Smazat',
    },
    confirm: {
        deleteUser: 'Opravdu chcete smazat tohoto uživatele?',
    },
    empty: {
        users: 'Žádní uživatelé k zobrazení',
    },
    errors: {
        invalidRequest: 'Neplatný požadavek',
        validationError: 'Chyba validace',
        genericError: 'Došlo k chybě, zkuste to znovu',
        emailExists: 'Uživatel s tímto emailem již existuje',
        passwordRequired: 'Heslo je povinné a musí mít alespoň 6 znaků',
    },
    settings: {
        success: 'Nastavení bylo úspěšně uloženo.',
        invalidRequest: 'Neplatný požadavek.',
        sections: {
            general: 'Obecné nastavení',
            options: 'Možnosti',
        },
        labels: {
            siteName: 'Název webu',
            contactEmail: 'Kontaktní email',
            siteDescription: 'Popis webu',
            currency: 'Měna',
            allowRegistration: 'Povolit registrace',
        },
    },
    users: {
        columns: {
            user: 'Uživatel',
            email: 'Email',
            role: 'Role',
            registered: 'Registrován',
            actions: 'Akce',
        },
        roles: {
            admin: 'Administrátor',
            user: 'Uživatel',
        },
        form: {
            firstName: 'Jméno *',
            lastName: 'Příjmení *',
            email: 'Email *',
            password: 'Heslo *',
            passwordEdit: 'Nové heslo (ponechte prázdné pro zachování)',
            isAdmin: 'Administrátor',
        },
    },
    roleFilters: {
        allRoles: 'Všechny role',
        admins: 'Administrátoři',
        users: 'Uživatelé',
    },
    currency: {
        czk: 'CZK - Česká koruna',
        eur: 'EUR - Euro',
        usd: 'USD - US Dollar',
    },
} as const;
