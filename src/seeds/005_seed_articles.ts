export const seed005Articles: Seed = {
    version: 5,
    name: "seed_articles",
    up: `
        INSERT INTO articles (title, slug, excerpt, content, author_id, category_id, status, read_time, published_at)
        SELECT 'Jak vybrat správný produkt', 'jak-vybrat-spravny-produkt',
               'Přinášíme vám kompletního průvodce výběrem produktu, který vám bude sloužit dlouhé roky.',
               '<h2>Jak vybrat správný produkt</h2><p>Výběr správného produktu může být náročný. V tomto článku vám poradíme, na co se zaměřit.</p><h3>1. Definujte své potřeby</h3><p>Než začnete vybírat, zamyslete se nad tím, co od produktu očekáváte.</p><h3>2. Porovnejte parametry</h3><p>Srovnání technických parametrů vám pomůže zúžit výběr.</p><h3>3. Přečtěte si recenze</h3><p>Zkušenosti ostatních zákazníků jsou neocenitelné.</p>',
               u.id, bc.id, 'published', 5, NOW()
        FROM users u, blog_categories bc
        WHERE u.email = 'admin@example.com' AND bc.slug = 'navody'
        AND NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'jak-vybrat-spravny-produkt');

        INSERT INTO articles (title, slug, excerpt, content, author_id, category_id, status, read_time, published_at)
        SELECT 'Nová kolekce jaro 2026', 'nova-kolekce-jaro-2026',
               'Představujeme naši novou jarní kolekci plnou barev a svěžích designů.',
               '<h2>Nová kolekce jaro 2026</h2><p>S příchodem jara přicházíme s novou kolekcí, která vás nadchne.</p><p>Jarní kolekce se vyznačuje svěžími barvami a lehkými materiály, které jsou ideální pro teplejší dny.</p><p>Kolekce zahrnuje přes 50 nových produktů z různých kategorií.</p>',
               u.id, bc.id, 'published', 3, NOW()
        FROM users u, blog_categories bc
        WHERE u.email = 'admin@example.com' AND bc.slug = 'novinky'
        AND NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'nova-kolekce-jaro-2026');

        INSERT INTO articles (title, slug, excerpt, content, author_id, category_id, status, read_time, published_at)
        SELECT 'Recenze: Top 5 produktů měsíce', 'recenze-top-5-produktu-mesice',
               'Vybrali jsme pro vás 5 nejlepších produktů tohoto měsíce na základě hodnocení zákazníků.',
               '<h2>Top 5 produktů měsíce</h2><p>Každý měsíc vybíráme pro vás nejlépe hodnocené produkty.</p><h3>1. Premium Widget</h3><p>Skvělý poměr cena/výkon s hodnocením 4.9/5.</p><h3>2. Smart Gadget Pro</h3><p>Inovativní design a špičkové materiály.</p><h3>3. Eco Friendly Set</h3><p>Pro ty, kteří myslí na životní prostředí.</p>',
               u.id, bc.id, 'published', 4, NOW()
        FROM users u, blog_categories bc
        WHERE u.email = 'admin@example.com' AND bc.slug = 'recenze'
        AND NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'recenze-top-5-produktu-mesice');

        INSERT INTO articles (title, slug, excerpt, content, author_id, category_id, status, read_time)
        SELECT 'Připravujeme: Letní výprodej', 'pripravujeme-letni-vyprodej',
               'Už brzy startuje náš tradiční letní výprodej se slevami až 50%.',
               '<h2>Letní výprodej se blíží</h2><p>Připravte se na největší slevy roku! Náš letní výprodej nabídne slevy až 50% na vybrané produkty.</p><p>Výprodej startuje 1. července a potrvá celý měsíc.</p>',
               u.id, bc.id, 'draft', 2
        FROM users u, blog_categories bc
        WHERE u.email = 'admin@example.com' AND bc.slug = 'novinky'
        AND NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'pripravujeme-letni-vyprodej');
    `
};
