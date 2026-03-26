export const seed002Settings: Seed = {
    version: 2,
    name: "seed_settings",
    up: `
        INSERT INTO settings (key, value) VALUES ('siteName', 'Lorem E-shop') ON CONFLICT (key) DO NOTHING;
        INSERT INTO settings (key, value) VALUES ('siteDescription', 'Moderní e-shop s kvalitním zbožím') ON CONFLICT (key) DO NOTHING;
        INSERT INTO settings (key, value) VALUES ('contactEmail', 'info@example.com') ON CONFLICT (key) DO NOTHING;
    `
};
