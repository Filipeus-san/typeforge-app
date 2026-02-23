import { DbMedia } from "./media.types";

export function findAllMedia(): DbMedia[] {
    return sqlQuery<DbMedia>(
        `SELECT id, filename, original_name, storage_path, mime_type, file_size,
                 width, height, alt_text, created_at::text as created_at, updated_at::text as updated_at
                 FROM media ORDER BY created_at DESC`,
        []
    );
}

export function insertMedia(filename: string, originalName: string, storagePath: string, mimeType: string, fileSize: number, width: number, height: number, altText: string): void {
    sqlQuery(
        `INSERT INTO media (filename, original_name, storage_path, mime_type, file_size, width, height, alt_text)
         VALUES ($1, $2, $3, $4, $5, NULLIF($6, 0), NULLIF($7, 0), NULLIF($8, ''))`,
        [filename, originalName, storagePath, mimeType, fileSize, width, height, altText]
    );
}

export function findMediaById(id: number): DbMedia | null {
    const results = sqlQuery<DbMedia>("SELECT storage_path FROM media WHERE id = $1", [id]);
    return results.length > 0 ? results[0] : null;
}

export function deleteMedia(id: number): void {
    sqlQuery("DELETE FROM media WHERE id = $1", [id]);
}
