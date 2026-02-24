export const CUSTOMERS_T = {
    titles: {
        admin: 'Zákazníci — Administrace',
        create: 'Nový zákazník — Administrace',
        edit: 'Upravit zákazníka — Administrace',
    },
    headings: {
        admin: 'Zákazníci',
        create: 'Nový zákazník',
        edit: 'Upravit zákazníka',
    },
    columns: {
        customer: 'Zákazník',
        email: 'Email',
        phone: 'Telefon',
        orderCount: 'Objednávek',
        totalSpent: 'Celkem utraceno',
        status: 'Stav',
        number: 'Číslo',
        amount: 'Částka',
        date: 'Datum',
        actions: 'Akce',
    },
    stats: {
        totalCustomers: 'Celkem zákazníků',
        activeCustomers: 'Aktivních',
    },
    actions: {
        newCustomer: 'Nový zákazník',
        detail: 'Detail',
        edit: 'Upravit',
        delete: 'Smazat',
        backToList: 'Zpět na seznam',
    },
    confirm: {
        deleteCustomer: 'Opravdu chcete smazat tohoto zákazníka?',
    },
    filters: {
        active: 'Aktivní',
        inactive: 'Neaktivní',
        allStatuses: 'Všechny stavy',
    },
    empty: {
        customers: 'Žádní zákazníci k zobrazení',
        noOrders: 'Zákazník zatím nemá žádné objednávky.',
    },
    errors: {
        invalidRequest: 'Neplatný požadavek',
        validationError: 'Chyba validace',
        genericError: 'Došlo k chybě, zkuste to znovu',
        emailExists: 'Zákazník s tímto emailem již existuje',
    },
    detail: {
        sections: {
            customerOrders: 'Objednávky zákazníka',
            notes: 'Poznámky',
            info: 'Informace',
            shippingAddress: 'Doručovací adresa',
            billingAddress: 'Fakturační adresa',
            personalInfo: 'Osobní údaje',
            addresses: 'Adresy',
        },
        labels: {
            status: 'Stav',
            email: 'Email',
            phone: 'Telefon',
            company: 'Firma',
            registered: 'Registrace',
            orderCount: 'Objednávek',
            totalSpent: 'Celkem utraceno',
            firstName: 'Jméno',
            lastName: 'Příjmení',
        },
        placeholders: {
            notes: 'Interní poznámky k zákazníkovi...',
        },
    },
    form: {
        saveChanges: 'Uložit změny',
        createCustomer: 'Vytvořit zákazníka',
    },
} as const;
