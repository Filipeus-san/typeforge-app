export const seed003Pages: Seed = {
    version: 3,
    name: "seed_pages",
    up: `
        INSERT INTO pages (title, slug, content, status, author_id, sort_order)
        SELECT 'Úvod', 'uvod', '<h2>Vítejte na našem webu</h2><p>Toto je úvodní stránka našeho e-shopu. Nabízíme široký výběr kvalitního zboží za skvělé ceny.</p>', 'published', u.id, 1
        FROM users u WHERE u.email = 'admin@example.com'
        ON CONFLICT (slug) DO NOTHING;

        INSERT INTO pages (title, slug, content, status, author_id, sort_order)
        SELECT 'O nás', 'o-nas', '<h2>O naší firmě</h2><p>Jsme tým nadšenců, kteří milují kvalitní produkty. Naše firma vznikla v roce 2020 s cílem přinášet zákazníkům to nejlepší.</p><p>Věříme v kvalitu, spolehlivost a osobní přístup ke každému zákazníkovi.</p>', 'published', u.id, 2
        FROM users u WHERE u.email = 'admin@example.com'
        ON CONFLICT (slug) DO NOTHING;

        INSERT INTO pages (title, slug, content, status, author_id, sort_order)
        SELECT 'Kontakt', 'kontakt', '<h2>Kontaktujte nás</h2><p>Email: info@example.com</p><p>Telefon: +420 123 456 789</p><p>Adresa: Hlavní 123, Praha 1, 110 00</p>', 'published', u.id, 3
        FROM users u WHERE u.email = 'admin@example.com'
        ON CONFLICT (slug) DO NOTHING;

        INSERT INTO pages (title, slug, content, status, author_id, sort_order)
        SELECT 'Obchodní podmínky', 'obchodni-podminky', '<h2>Obchodní podmínky</h2><p>Tyto obchodní podmínky upravují vztahy mezi prodávajícím a kupujícím.</p><h3>1. Obecná ustanovení</h3><p>Prodávající se zavazuje dodat zboží v odpovídající kvalitě a množství.</p><h3>2. Dodání zboží</h3><p>Zboží je doručeno do 3-5 pracovních dnů.</p>', 'published', u.id, 4
        FROM users u WHERE u.email = 'admin@example.com'
        ON CONFLICT (slug) DO NOTHING;
    `
};
