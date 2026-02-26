import { getReactPageTemplate } from "../../../react";
import { checkCsrfToken } from "../../../utils";
import { UserSession, requireAdmin } from "../shared";
import { getMediaTypeFilter } from "./media.utils";
import { findAllMedia, insertMedia, findMediaById, deleteMedia } from "./media.repository";
import { MEDIA_T } from "./media.translation";

// =============================================================================
// Admin Media Module — Route Handlers
// =============================================================================

export function renderAdminMedia(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const typeFilter = parseUrlQuery<{ type?: string }>(request.query)?.type ?? '';

    const mediaItems = findAllMedia();

    const filteredItems = typeFilter !== ''
        ? mediaItems.filter(m => getMediaTypeFilter(m.mime_type) === typeFilter)
        : mediaItems;

    response.content = getReactPageTemplate(MEDIA_T.titles.admin, "AdminMedia", {
        mediaItems: filteredItems.map(m => ({
            id: String(m.id),
            originalName: m.original_name,
            storagePath: m.storage_path,
            mimeType: m.mime_type,
            fileSize: m.file_size,
            altText: m.alt_text ?? '',
            url: storageGetUrl(m.storage_path),
        })),
        typeFilter,
    });
    return response;
}

export function handleAdminMediaUpload(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method !== "post") {
        response.status = 302;
        response.headers["Location"] = "/admin/media";
        return response;
    }

    const uploadedFiles = request.files["file"];
    if (!uploadedFiles || uploadedFiles.length === 0) {
        response.status = 302;
        response.headers["Location"] = "/admin/media";
        return response;
    }

    const tempFilePath = uploadedFiles[0];
    const altText = parseUrlQuery<{ alt_text?: string }>(request.payload ?? '')?.alt_text ?? '';

    // Extract original filename from temp path
    // Runtime saves as: /tmp/<uuid>_<original_filename>
    const pathParts = stringSplit(tempFilePath, '/');
    const tempFileName = pathParts[pathParts.length - 1];
    // Strip UUID prefix (36 chars + underscore) to get original filename
    const originalName = tempFileName.length > 37 ? tempFileName.substring(37) : tempFileName;

    // Generate unique filename for storage
    const timestamp = now();
    const uniqueId = uniqueKey().substring(0, 8);
    // Get file extension using split (TSTL doesn't support lastIndexOf)
    const fileNameParts = stringSplit(originalName, '.');
    const fileExtension = fileNameParts.length > 1 ? '.' + fileNameParts[fileNameParts.length - 1] : '';
    const storageFileName = `media/${timestamp}_${uniqueId}${fileExtension}`;

    // Read file content using Lua native io.open (binary mode)
    // fileRead() validates UTF-8 and fails on binary files like images
    const mimeType = fileContentType(tempFilePath);
    const fileHandle = io.open(tempFilePath, "rb");
    if (!fileHandle) {
        logError("Failed to open uploaded file", { path: tempFilePath });
        response.status = 302;
        response.headers["Location"] = "/admin/media";
        return response;
    }
    const fileContent = fileHandle.read("*a");
    fileHandle.close();

    storageUpload(storageFileName, fileContent, mimeType);

    // Get image dimensions if it's an image
    let width: number | null = null;
    let height: number | null = null;
    if (stringStartsWith(mimeType, 'image/')) {
        try {
            const info = imageInfo(tempFilePath);
            width = info.width;
            height = info.height;
        } catch (e) {
            // Ignore if we can't get image info
        }
    }

    // Calculate file size (approximate from content length)
    const fileSize = fileContent.length;

    // Save to database
    const altTextValue = (altText !== undefined && altText !== '') ? altText : '';
    insertMedia(storageFileName, originalName, storageFileName, mimeType, fileSize, width !== null ? width : 0, height !== null ? height : 0, altTextValue);

    // Clean up temp file
    try {
        fileDelete(tempFilePath);
    } catch (e) {
        // Ignore cleanup errors
    }

    response.status = 302;
    response.headers["Location"] = "/admin/media";
    return response;
}

export function handleAdminMediaDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string; token?: string }>(request.query);
    const mediaId = params?.id;
    const token = params?.token;

    if (!token || !checkCsrfToken(token, request)) {
        response.status = 302;
        response.headers["Location"] = "/admin/media";
        return response;
    }

    if (mediaId) {
        // Get media info first
        const media = findMediaById(Number(mediaId));

        if (media) {
            // Delete from cloud storage
            try {
                storageDelete(media.storage_path);
            } catch (e) {
                logError("Failed to delete file from storage", { path: media.storage_path, error: e });
            }

            // Delete from database
            deleteMedia(Number(mediaId));
        }
    }

    response.status = 302;
    response.headers["Location"] = "/admin/media";
    return response;
}
