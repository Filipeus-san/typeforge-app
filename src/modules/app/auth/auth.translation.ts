export const AUTH_T = {
    titles: {
        login: 'Prihlaseni — TypeForge',
        register: 'Registrace — TypeForge',
    },
    headings: {
        login: 'Prihlaseni',
        loginSubtitle: 'Prihlaste se do sveho uctu',
        register: 'Vytvorit ucet',
        registerSubtitle: 'Zaregistrujte se a zacnete pouzivat TypeForge',
    },
    form: {
        email: 'Email',
        password: 'Heslo',
        firstName: 'Jmeno',
        lastName: 'Prijmeni',
        confirmPassword: 'Potvrzeni hesla',
    },
    actions: {
        login: 'Prihlasit se',
        register: 'Zaregistrovat se',
    },
    links: {
        or: 'nebo',
        noAccount: 'Nemate ucet?',
        registerLink: 'Registrovat se',
        hasAccount: 'Uz mate ucet?',
        loginLink: 'Prihlaste se',
        terms: 'obchodnimi podminkami',
        privacy: 'zasadami ochrany osobnich udaju',
    },
    errors: {
        invalidRequest: 'Neplatny pozadavek',
        invalidCredentials: 'Neplatny email nebo heslo',
        validationError: 'Chyba validace',
        genericError: 'Doslo k chybe, zkuste to znovu',
        passwordMismatch: 'Hesla se neshoduji',
        emailExists: 'Ucet s timto emailem jiz existuje',
        registrationFailed: 'Registrace se nezdarila, zkuste to znovu',
    },
    nav: {
        features: 'Funkce',
        howItWorks: 'Jak to funguje',
        toggleTheme: 'Přepnout téma',
        logout: 'Odhlásit',
    },
} as const;
