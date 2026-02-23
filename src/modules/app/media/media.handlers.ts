import { getHtmlTemplate } from "../../../template";
import { AdminLayout, CardSection, Icon, map, escapeHtml } from "../../../components";
import { checkCsrfToken, link } from "../../../utils";
import { UserSession, requireAdmin } from "../shared";
import { getMediaIcon, getMediaTypeFilter, formatFileSize } from "./media.utils";
import { findAllMedia, insertMedia, findMediaById, deleteMedia } from "./media.repository";
import { MEDIA_TYPE_FILTER_OPTIONS, MEDIA_ACCEPT_TYPES } from "./media.const";
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

    response.content = getHtmlTemplate(MEDIA_T.titles.admin, AdminLayout({
        title: MEDIA_T.headings.admin,
        activePage: "media",
        children: `
            <div x-data="{ uploadOpen: false, previewOpen: false, previewSrc: '', previewAlt: '' }">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="filter-bar mb-0">
                    <select class="filter-select" @change="window.location.href='/admin/media' + ($event.target.value ? '?type=' + $event.target.value : '')">
                        ${map(MEDIA_TYPE_FILTER_OPTIONS, o => `<option value="${o.value}"${typeFilter === o.value ? ' selected' : ''}>${o.label}</option>`)}
                    </select>
                </div>
                <button type="button" class="btn-add" @click="uploadOpen = true">
                    ${Icon({ name: 'upload' })} ${MEDIA_T.actions.upload}
                </button>
            </div>
            ${CardSection({
                children: filteredItems.length === 0
                    ? `<div class="text-center text-muted-tf py-5">
                        ${Icon({ name: 'folder2-open' })}
                        <p class="mt-3 mb-0">${MEDIA_T.empty.noMedia}</p>
                        <p class="small">${MEDIA_T.empty.uploadHint}</p>
                       </div>`
                    : `
                    <div class="media-grid">
                        ${map(filteredItems, (media) => {
                            const isImage = stringStartsWith(media.mime_type, 'image/');
                            const mediaUrl = storageGetUrl(media.storage_path);
                            const altText = escapeHtml(media.alt_text ?? media.original_name);
                            return `
                            <div class="media-item" title="${escapeHtml(media.original_name)}"
                                ${isImage ? `@click="previewSrc='${mediaUrl}'; previewAlt='${altText}'; previewOpen=true"` : ''}>
                                ${isImage
                                    ? `<img src="${mediaUrl}" alt="${altText}" class="media-preview">`
                                    : `<div class="media-icon">${Icon({ name: getMediaIcon(media.mime_type) })}</div>`
                                }
                                <div class="media-overlay" @click.stop>
                                    <div class="media-info">
                                        <div class="media-name">${escapeHtml(media.original_name)}</div>
                                        <div class="media-meta">${formatFileSize(media.file_size)}</div>
                                    </div>
                                    <div class="media-actions">
                                        ${isImage
                                            ? `<button type="button" class="btn-action" title="${MEDIA_T.actions.open}"
                                                @click="previewSrc='${mediaUrl}'; previewAlt='${altText}'; previewOpen=true">
                                                ${Icon({ name: 'eye' })}
                                            </button>`
                                            : `<a href="${mediaUrl}" target="_blank" class="btn-action" title="${MEDIA_T.actions.open}">
                                                ${Icon({ name: 'eye' })}
                                            </a>`
                                        }
                                        <a href="${link('/admin/media/delete', { id: String(media.id) }, request, 'action')}"
                                           class="btn-action danger"
                                           title="${MEDIA_T.actions.delete}"
                                           @click.prevent="if(confirm('${MEDIA_T.confirm.deleteFile}')) window.location.href=$el.href">
                                            ${Icon({ name: 'trash' })}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        `;})}
                    </div>
                `
            })}

            <!-- Image Preview Modal -->
            <div class="modal-backdrop preview-modal" x-show="previewOpen" x-cloak
                 @click.self="previewOpen = false"
                 @keydown.escape.window="previewOpen = false"
                 style="display:flex;">
                <div class="preview-container">
                    <button type="button" class="preview-close" @click="previewOpen = false" title="${MEDIA_T.actions.close}">&times;</button>
                    <img :src="previewSrc" :alt="previewAlt" class="preview-image">
                </div>
            </div>

            <!-- Upload Modal -->
            <div class="modal-backdrop" x-show="uploadOpen" x-cloak @click.self="uploadOpen = false" style="display:flex;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5>${MEDIA_T.form.uploadTitle}</h5>
                        <button type="button" class="btn-close" @click="uploadOpen = false">&times;</button>
                    </div>
                    <form method="post" action="/admin/media/upload" enctype="multipart/form-data">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">${MEDIA_T.form.selectFile}</label>
                                <input type="file" name="file" class="form-control" required accept="${MEDIA_ACCEPT_TYPES}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${MEDIA_T.form.altText}</label>
                                <input type="text" name="alt_text" class="form-control" placeholder="${MEDIA_T.form.altPlaceholder}">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-tf" @click="uploadOpen = false">${MEDIA_T.actions.cancelBtn}</button>
                            <button type="submit" class="btn btn-primary-tf">${Icon({ name: 'upload' })} ${MEDIA_T.actions.uploadBtn}</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>

            <style>
                .media-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 1rem;
                }
                .media-item {
                    position: relative;
                    aspect-ratio: 1;
                    border-radius: 8px;
                    overflow: hidden;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    cursor: pointer;
                }
                .media-item:hover .media-overlay {
                    opacity: 1;
                }
                .media-preview {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .media-icon {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    color: var(--text-muted);
                }
                .media-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.7);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 0.75rem;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .media-info {
                    color: white;
                    margin-bottom: 0.5rem;
                }
                .media-name {
                    font-size: 0.85rem;
                    font-weight: 500;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .media-meta {
                    font-size: 0.75rem;
                    opacity: 0.8;
                }
                .media-actions {
                    display: flex;
                    gap: 0.5rem;
                }
                .media-actions .btn-action {
                    background: rgba(255,255,255,0.2);
                    color: white;
                    border: none;
                    padding: 0.4rem 0.6rem;
                    border-radius: 4px;
                }
                .media-actions .btn-action:hover {
                    background: rgba(255,255,255,0.3);
                }
                .media-actions .btn-action.danger:hover {
                    background: rgba(220,53,69,0.8);
                }

                /* Image Preview Modal */
                .preview-modal {
                    z-index: 1060;
                    background: rgba(0,0,0,0.85);
                }
                .preview-container {
                    position: relative;
                    max-width: 90vw;
                    max-height: 90vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .preview-image {
                    max-width: 90vw;
                    max-height: 90vh;
                    object-fit: contain;
                    border-radius: 4px;
                    box-shadow: 0 4px 30px rgba(0,0,0,0.5);
                }
                .preview-close {
                    position: absolute;
                    top: -2.5rem;
                    right: -0.5rem;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    line-height: 1;
                    padding: 0.25rem 0.5rem;
                    opacity: 0.8;
                }
                .preview-close:hover {
                    opacity: 1;
                }

                /* Modal styles */
                .modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 1050;
                    align-items: center;
                    justify-content: center;
                }
                .modal-content {
                    background: #ffffff;
                    border-radius: 8px;
                    width: 100%;
                    max-width: 500px;
                    margin: 1rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                }
                [data-theme="dark"] .modal-content {
                    background: #1e1e2e;
                    color: #e0e0e0;
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #dee2e6;
                    background: #f8f9fa;
                    border-radius: 8px 8px 0 0;
                }
                [data-theme="dark"] .modal-header {
                    background: #2d2d3d;
                    border-bottom-color: #3d3d4d;
                }
                .modal-header h5 {
                    margin: 0;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #212529;
                }
                [data-theme="dark"] .modal-header h5 {
                    color: #e0e0e0;
                }
                .modal-body {
                    padding: 1.5rem;
                    background: #ffffff;
                }
                [data-theme="dark"] .modal-body {
                    background: #1e1e2e;
                }
                .modal-body .form-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: #212529;
                }
                [data-theme="dark"] .modal-body .form-label {
                    color: #e0e0e0;
                }
                .modal-body .form-control {
                    display: block;
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    font-size: 1rem;
                    border: 1px solid #ced4da;
                    border-radius: 4px;
                    background: #ffffff;
                    color: #212529;
                    box-sizing: border-box;
                }
                [data-theme="dark"] .modal-body .form-control {
                    background: #2d2d3d;
                    border-color: #3d3d4d;
                    color: #e0e0e0;
                }
                .modal-body .mb-3 {
                    margin-bottom: 1rem;
                }
                .modal-footer {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.5rem;
                    padding: 1rem 1.5rem;
                    border-top: 1px solid #dee2e6;
                    background: #f8f9fa;
                    border-radius: 0 0 8px 8px;
                }
                [data-theme="dark"] .modal-footer {
                    background: #2d2d3d;
                    border-top-color: #3d3d4d;
                }
                .btn-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #6c757d;
                    cursor: pointer;
                    line-height: 1;
                    padding: 0;
                }
                .btn-close:hover {
                    color: #212529;
                }
                [data-theme="dark"] .btn-close {
                    color: #adb5bd;
                }
                [data-theme="dark"] .btn-close:hover {
                    color: #e0e0e0;
                }
            </style>
        `
    }));
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
