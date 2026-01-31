
export function getAppConfig(): Config {
    return {
        microCache: { maxEntries: 100, ttl: 25 },
        postgresql: { enable: false, url: getConfig("DATABASE_URL") ?? "" },
        redis: { enable: false, url: getConfig("REDIS_URL") ?? "" },
        uploadTempDir: "tmp/files",
        maxUploadFileSize: 10 * 1024 * 1024 // 10 MB
        
    }
}