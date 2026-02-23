export const SHARED_T = {
    statuses: {
        product: {
            active: 'Aktivní',
            inactive: 'Neaktivní',
            soldout: 'Vyprodáno',
        },
        order: {
            pending: 'Čeká',
            processing: 'Zpracování',
            shipped: 'Odesláno',
            completed: 'Dokončeno',
            cancelled: 'Zrušeno',
        },
    },
} as const;
