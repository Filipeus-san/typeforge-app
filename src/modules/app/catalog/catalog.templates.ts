import { AdminForm, FormSection, CardSection, FormGroup, Input, Select, Textarea, Icon, escapeHtml, map } from "../../../components";
import { DbCategory, DbProductImage } from "../shared";
import { PRODUCT_STATUS_FILTER_OPTIONS, CATEGORY_STATUS_FILTER_OPTIONS } from "./catalog.const";
import { CATALOG_T } from "./catalog.translation";
import { findAllMedia } from "../media/media.repository";

export function getProductFormContent(request: Request, categories: DbCategory[], data?: Record<string, string>, error?: string, isEdit: boolean = false, galleryImages?: DbProductImage[]): string {
    const categoryOptions = [
        { value: '', label: CATALOG_T.form.labels.noCategory },
        ...categories.map(c => ({ value: String(c.id), label: c.name })),
    ];

    const featuredImage = data?.featured_image ?? '';

    // Load media images for the picker
    const allMedia = findAllMedia();
    const imageMedia = allMedia.filter(m => stringStartsWith(m.mime_type, 'image/'));

    // Gallery data
    const galleryPaths = galleryImages ? galleryImages.map(img => img.storage_path) : [];
    const galleryValue = data?.gallery_images ?? galleryPaths.join(',');

    // Build gallery images array for Alpine x-data
    const galleryImagesJson = galleryValue !== '' ? (() => {
        const paths = stringSplit(galleryValue, ',');
        return paths.map((p: string) => `{path:'${stringReplace(p, "'", "\\'")}',url:'${stringReplace(storageGetUrl(p), "'", "\\'")}'}`).join(',');
    })() : '';

    const featuredImageUrl = (featuredImage !== '' && featuredImage !== undefined) ? storageGetUrl(featuredImage) : '';

    const errorHtml = (error !== undefined && error !== '')
        ? `<div class="alert alert-danger mb-4">${escapeHtml(error!)}</div>`
        : '';

    const statusOptions = PRODUCT_STATUS_FILTER_OPTIONS.map(o => ({
        value: o.value,
        label: o.label,
        selected: o.value === (data?.status ?? 'active'),
    }));

    const catSelectOptions = categoryOptions.map(o => ({
        value: o.value,
        label: o.label,
        selected: o.value === (data?.category_id ?? ''),
    }));

    return `
        ${errorHtml}
        <div x-data="{
            featuredModalOpen: false,
            featuredImage: '${stringReplace(featuredImage, "'", "\\'")}',
            featuredImageUrl: '${stringReplace(featuredImageUrl, "'", "\\'")}',
            galleryModalOpen: false,
            galleryImages: [${galleryImagesJson}],
            dragIndex: null,
            dragOverIndex: null,
            selectFeaturedImage(path, url) {
                this.featuredImage = path;
                this.featuredImageUrl = url;
                this.featuredModalOpen = false;
            },
            clearFeaturedImage() {
                this.featuredImage = '';
                this.featuredImageUrl = '';
            },
            addGalleryImage(path, url) {
                if (this.galleryImages.some(function(img) { return img.path === path; })) return;
                this.galleryImages.push({path: path, url: url});
                this.galleryModalOpen = false;
            },
            removeGalleryImage(index) {
                this.galleryImages.splice(index, 1);
            },
            get galleryValue() {
                return this.galleryImages.map(function(img) { return img.path; }).join(',');
            },
            dragStart(index, e) {
                this.dragIndex = index;
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', '');
            },
            dragOver(index, e) {
                e.preventDefault();
                this.dragOverIndex = index;
            },
            drop(index, e) {
                e.preventDefault();
                if (this.dragIndex !== null && this.dragIndex !== index) {
                    var item = this.galleryImages.splice(this.dragIndex, 1)[0];
                    this.galleryImages.splice(index, 0, item);
                }
                this.dragIndex = null;
                this.dragOverIndex = null;
            },
            dragEnd() {
                this.dragIndex = null;
                this.dragOverIndex = null;
            }
        }">
        <form method="post">
            <input type="hidden" name="featured_image" :value="featuredImage">
            <input type="hidden" name="gallery_images" :value="galleryValue">
            <div class="row g-4">
                <div class="col-md-8">
                    ${CardSection({
                        title: CATALOG_T.form.sections.basicInfo,
                        children: `
                            <div class="row g-3">
                                <div class="col-md-8">${FormGroup({ label: CATALOG_T.form.labels.productName, required: true, children: Input({ name: 'name', value: data?.name ?? '', required: true }) })}</div>
                                <div class="col-md-4">${FormGroup({ label: CATALOG_T.form.labels.slug, children: Input({ name: 'slug', value: data?.slug ?? '', placeholder: CATALOG_T.form.placeholders.autoFromName }) })}</div>
                            </div>
                            <div class="mb-3">${FormGroup({ label: CATALOG_T.form.labels.shortDescription, children: Input({ name: 'short_description', value: data?.short_description ?? '' }) })}</div>
                            <div class="mb-3">${FormGroup({ label: CATALOG_T.form.labels.description, children: Textarea({ name: 'description', value: data?.description ?? '', rows: 5 }) })}</div>
                        `
                    })}
                    ${CardSection({
                        title: CATALOG_T.form.sections.priceStock,
                        children: `
                            <div class="row g-3">
                                <div class="col-md-4">${FormGroup({ label: CATALOG_T.form.labels.price, required: true, children: `<input type="number" name="price" class="form-control" value="${escapeHtml(data?.price ?? '0')}" step="0.01" min="0" required>` })}</div>
                                <div class="col-md-4">${FormGroup({ label: CATALOG_T.form.labels.oldPrice, children: `<input type="number" name="old_price" class="form-control" value="${escapeHtml(data?.old_price ?? '')}" step="0.01" min="0" placeholder="${CATALOG_T.form.placeholders.discountHint}">` })}</div>
                                <div class="col-md-4">${FormGroup({ label: CATALOG_T.form.labels.stock, children: `<input type="number" name="stock" class="form-control" value="${escapeHtml(data?.stock ?? '0')}" min="0">` })}</div>
                            </div>
                        `
                    })}
                    ${CardSection({
                        title: CATALOG_T.form.sections.gallery,
                        children: `
                            <div class="gallery-preview-grid">
                                <template x-if="galleryImages.length === 0">
                                    <div class="gallery-empty-msg"><i class="bi bi-images" style="font-size:1.5rem;"></i><span>${CATALOG_T.empty.noGalleryImages}</span></div>
                                </template>
                                <template x-for="(img, index) in galleryImages" :key="img.path">
                                    <div class="gallery-preview-item"
                                         draggable="true"
                                         :data-path="img.path"
                                         :class="{ 'dragging': dragIndex === index, 'drag-over': dragOverIndex === index }"
                                         @dragstart="dragStart(index, $event)"
                                         @dragover="dragOver(index, $event)"
                                         @dragleave="dragOverIndex = null"
                                         @drop="drop(index, $event)"
                                         @dragend="dragEnd()">
                                        <img :src="img.url" alt="">
                                        <button type="button" class="gallery-remove-btn" @click="removeGalleryImage(index)" title="Odebrat">&times;</button>
                                    </div>
                                </template>
                            </div>
                            <button type="button" class="btn btn-outline-tf btn-sm w-100 mt-2" @click="galleryModalOpen = true">
                                <i class="bi bi-plus-lg me-1"></i>${CATALOG_T.actions.addToGallery}
                            </button>
                        `
                    })}
                </div>
                <div class="col-md-4">
                    ${CardSection({
                        title: CATALOG_T.form.sections.featuredImage,
                        children: `
                            <div x-show="featuredImageUrl" x-cloak>
                                <img :src="featuredImageUrl" alt="${CATALOG_T.form.sections.featuredImage}" style="width:100%;border-radius:8px;margin-bottom:0.5rem;">
                                <button type="button" class="btn btn-outline-tf btn-sm w-100" @click="clearFeaturedImage()">
                                    <i class="bi bi-x-lg me-1"></i>${CATALOG_T.actions.removeImage}
                                </button>
                            </div>
                            <div x-show="!featuredImageUrl" style="width:100%;height:120px;background:var(--bg-secondary, #f8f9fa);border:2px dashed var(--border-color, #dee2e6);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--text-muted, #6c757d);flex-direction:column;gap:0.5rem;">
                                <i class="bi bi-image" style="font-size:2rem;"></i>
                                <span style="font-size:0.85rem;">${CATALOG_T.form.labels.noImage}</span>
                            </div>
                            <button type="button" class="btn btn-outline-tf btn-sm w-100 mt-2" @click="featuredModalOpen = true">
                                <i class="bi bi-images me-1"></i>${CATALOG_T.actions.selectFromMedia}
                            </button>
                        `
                    })}
                    ${CardSection({
                        title: CATALOG_T.form.sections.categoryStatus,
                        children: `
                            <div class="mb-3">${FormGroup({ label: CATALOG_T.form.labels.category, children: Select({ name: 'category_id', options: catSelectOptions }) })}</div>
                            <div class="mb-3">${FormGroup({ label: CATALOG_T.form.labels.status, children: Select({ name: 'status', options: statusOptions }) })}</div>
                            <div class="mb-3">${FormGroup({ label: CATALOG_T.form.labels.icon, children: Input({ name: 'icon', value: data?.icon ?? 'box', placeholder: CATALOG_T.form.placeholders.iconExamples }) })}</div>
                        `
                    })}
                    ${CardSection({
                        children: `
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn-add w-100 justify-content-center">
                                    ${Icon({ name: isEdit ? 'check-lg' : 'plus-lg' })}
                                    ${isEdit ? CATALOG_T.actions.saveChanges : CATALOG_T.actions.createProduct}
                                </button>
                                <a href="/admin/products" class="btn btn-outline-tf btn-sm text-center">Zpět</a>
                            </div>
                        `
                    })}
                </div>
            </div>
        </form>

        <!-- Media Picker Modal -->
        <div class="modal-backdrop-tf" x-show="featuredModalOpen" x-cloak @click.self="featuredModalOpen = false">
            <div class="modal-content-tf" style="max-width:700px;">
                <div class="modal-header-tf">
                    <h5>${CATALOG_T.form.sections.selectImage}</h5>
                    <button type="button" class="btn-close-tf" @click="featuredModalOpen = false">&times;</button>
                </div>
                <div class="modal-body-tf" style="max-height:400px;overflow-y:auto;">
                    ${imageMedia.length === 0
                        ? `<div class="text-center py-4" style="color:var(--text-muted, #6c757d);">
                               <i class="bi bi-images" style="font-size:2.5rem;display:block;margin-bottom:0.5rem;"></i>
                               <p>${CATALOG_T.empty.noImages}</p>
                               <a href="/admin/media" class="btn btn-outline-tf btn-sm">${CATALOG_T.actions.goToMedia}</a>
                           </div>`
                        : `<div class="media-picker-grid-tf">
                               ${map(imageMedia, (m) => `
                                   <div class="media-picker-item-tf"
                                        :class="{'selected': featuredImage === '${stringReplace(m.storage_path, "'", "\\'")}'}"
                                        @click="selectFeaturedImage('${stringReplace(m.storage_path, "'", "\\'")}', '${stringReplace(storageGetUrl(m.storage_path), "'", "\\'")}')"
                                        title="${escapeHtml(m.original_name)}">
                                       <img src="${storageGetUrl(m.storage_path)}" alt="${escapeHtml(m.alt_text ?? m.original_name)}">
                                   </div>
                               `)}
                           </div>`
                    }
                </div>
            </div>
        </div>

        <!-- Gallery Picker Modal -->
        <div class="modal-backdrop-tf" x-show="galleryModalOpen" x-cloak @click.self="galleryModalOpen = false">
            <div class="modal-content-tf" style="max-width:700px;">
                <div class="modal-header-tf">
                    <h5>${CATALOG_T.form.sections.selectGalleryImages}</h5>
                    <button type="button" class="btn-close-tf" @click="galleryModalOpen = false">&times;</button>
                </div>
                <div class="modal-body-tf" style="max-height:400px;overflow-y:auto;">
                    ${imageMedia.length === 0
                        ? `<div class="text-center py-4" style="color:var(--text-muted, #6c757d);">
                               <i class="bi bi-images" style="font-size:2.5rem;display:block;margin-bottom:0.5rem;"></i>
                               <p>${CATALOG_T.empty.noImages}</p>
                               <a href="/admin/media" class="btn btn-outline-tf btn-sm">${CATALOG_T.actions.goToMedia}</a>
                           </div>`
                        : `<div class="media-picker-grid-tf">
                               ${map(imageMedia, (m) => `
                                   <div class="media-picker-item-tf"
                                        @click="addGalleryImage('${stringReplace(m.storage_path, "'", "\\'")}', '${stringReplace(storageGetUrl(m.storage_path), "'", "\\'")}')"
                                        title="${escapeHtml(m.original_name)}">
                                       <img src="${storageGetUrl(m.storage_path)}" alt="${escapeHtml(m.alt_text ?? m.original_name)}">
                                   </div>
                               `)}
                           </div>`
                    }
                </div>
            </div>
        </div>
        </div>

        <style>
            .modal-backdrop-tf {
                display: flex;
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.5);
                z-index: 1050;
                align-items: center;
                justify-content: center;
            }
            .modal-content-tf {
                background: #ffffff;
                border-radius: 8px;
                width: 100%;
                margin: 1rem;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            }
            [data-theme="dark"] .modal-content-tf {
                background: #1e1e2e;
                color: #e0e0e0;
            }
            .modal-header-tf {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #dee2e6;
                background: #f8f9fa;
                border-radius: 8px 8px 0 0;
            }
            [data-theme="dark"] .modal-header-tf {
                background: #2d2d3d;
                border-bottom-color: #3d3d4d;
            }
            .modal-header-tf h5 {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 600;
            }
            .modal-body-tf {
                padding: 1.5rem;
            }
            .btn-close-tf {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #6c757d;
                cursor: pointer;
                line-height: 1;
                padding: 0;
            }
            .btn-close-tf:hover { color: #212529; }
            [data-theme="dark"] .btn-close-tf { color: #adb5bd; }
            [data-theme="dark"] .btn-close-tf:hover { color: #e0e0e0; }
            .media-picker-grid-tf {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                gap: 0.75rem;
            }
            .media-picker-item-tf {
                aspect-ratio: 1;
                border-radius: 8px;
                overflow: hidden;
                border: 2px solid transparent;
                cursor: pointer;
                transition: all 0.2s;
            }
            .media-picker-item-tf:hover {
                border-color: var(--tf-primary, #7c5cfc);
                transform: scale(1.03);
            }
            .media-picker-item-tf.selected {
                border-color: var(--tf-primary, #7c5cfc);
                box-shadow: 0 0 0 2px rgba(124,92,252,0.3);
            }
            .media-picker-item-tf img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .gallery-preview-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 0.75rem;
                min-height: 60px;
            }
            .gallery-preview-item {
                aspect-ratio: 1;
                border-radius: 8px;
                overflow: hidden;
                position: relative;
                border: 2px solid var(--tf-border, #dee2e6);
                cursor: grab;
                transition: opacity 0.2s, border-color 0.2s, border-style 0.2s;
            }
            .gallery-preview-item:active { cursor: grabbing; }
            .gallery-preview-item.dragging {
                opacity: 0.3;
                border-style: dashed;
                border-color: var(--tf-primary, #7c5cfc);
            }
            .gallery-preview-item.drag-over {
                border-color: var(--tf-primary, #7c5cfc);
                border-style: dashed;
                transform: scale(1.05);
            }
            .gallery-preview-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .gallery-remove-btn {
                position: absolute;
                top: 4px;
                right: 4px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: rgba(220,53,69,0.9);
                color: #fff;
                border: none;
                font-size: 1rem;
                line-height: 1;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.2s;
            }
            .gallery-preview-item:hover .gallery-remove-btn {
                opacity: 1;
            }
            .gallery-empty-msg {
                grid-column: 1 / -1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 1.5rem;
                color: var(--text-muted, #6c757d);
                font-size: 0.85rem;
            }
        </style>
    `;
}

export function getCategoryFormContent(request: Request, data?: Record<string, string>, error?: string, isEdit: boolean = false): string {
    const sections: FormSection[] = [
        {
            title: CATALOG_T.form.sections.categoryInfo,
            position: 'main',
            fields: [
                { name: 'name', label: CATALOG_T.form.labels.categoryName, required: true, colSpan: 6 },
                { name: 'slug', label: CATALOG_T.form.labels.slug, placeholder: CATALOG_T.form.placeholders.autoFromName, colSpan: 6 },
                { name: 'description', label: CATALOG_T.form.labels.description, type: 'textarea', rows: 3 },
            ],
        },
        {
            title: CATALOG_T.form.sections.settings,
            position: 'sidebar',
            fields: [
                { name: 'icon', label: CATALOG_T.form.labels.icon, placeholder: CATALOG_T.form.placeholders.categoryIconExamples },
                { name: 'status', label: CATALOG_T.form.labels.status, type: 'select', options: CATEGORY_STATUS_FILTER_OPTIONS },
                { name: 'sort_order', label: CATALOG_T.form.labels.sortOrder, type: 'number', min: '0' },
            ],
        },
    ];

    return AdminForm({
        sections,
        values: data,
        error,
        submitLabel: isEdit ? CATALOG_T.actions.saveChanges : CATALOG_T.actions.createCategory,
        submitIcon: isEdit ? 'check-lg' : 'plus-lg',
        backUrl: '/admin/categories',
    });
}
