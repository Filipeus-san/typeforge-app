import { migrations } from "./migrations";

// App configuration
export function getAppConfig(): Config {
    return {
        microCache: { maxEntries: 100, ttl: 25 },
        postgresql: { enable: true, url: getConfig("DATABASE_URL") ?? "" },
        redis: { enable: false, url: getConfig("REDIS_URL") ?? "" },
        session: {
            secret: getConfig("SESSION_SECRET") ?? "default-dev-secret-change-in-production",
            ttlMinutes: 15,
            cookieName: "session_token",
            refreshThresholdMinutes: 5
        },
        uploadTempDir: "/tmp",
        maxUploadFileSize: 10 * 1024 * 1024, // 10 MB
        migrations
    }
}