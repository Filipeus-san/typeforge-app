import { CardSection, Select, Input, Textarea, FormGroup, Icon, escapeHtml, map } from "../../../components";
import { DbBlogPostWithAuthor } from "./blog.types";
import { escapeHtmlBlog, formatBlogDate } from "./blog.utils";
import { findPublishedPostsWithAuthor } from "./blog.repository";
import { findAllMedia } from "../media/media.repository";
import { DbMedia } from "../media/media.types";
import { BLOG_T } from "./blog.translation";

// =============================================================================
// Public Blog Templates
// =============================================================================

export function getArticlePageContent(
    title?: string,
    content?: string,
    category?: string,
    date?: string,
    author?: string,
    readTime?: string,
    featuredImageUrl?: string
): string {
    const articleTitle = title || "Lorem Ipsum Dolor Sit Amet Consectetur";
    const articleCategory = category || BLOG_T.public.nav.article;
    const articleDate = date || "3. 2. 2026";
    const articleAuthor = author || "TypeForge Team";
    const articleReadTime = readTime || "5";
    const articleContent = (content !== undefined && content !== '')
        ? content.split('\n').map(p => trim(p) !== '' ? `<p>${escapeHtmlBlog(p)}</p>` : '').join('\n')
        : getDefaultArticleContent();

    return `
<style>
.article-wrapper {
    min-height: 100vh;
    padding-top: 6rem;
    padding-bottom: 4rem;
}
.article-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem 0;
}
.article-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    background: var(--tf-gradient-subtle);
    border: 1px solid rgba(124,92,252,0.25);
    color: var(--tf-primary-light);
    margin-bottom: 1.5rem;
}
.article-title {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
}
.article-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    color: var(--tf-text-muted);
    font-size: 0.9rem;
}
.article-meta i {
    margin-right: 0.4rem;
}
.article-content {
    max-width: 800px;
    margin: 0 auto;
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    padding: 3rem;
}
.article-content p {
    font-size: 1.1rem;
    line-height: 1.9;
    color: var(--tf-text);
    margin-bottom: 1.5rem;
}
.article-content h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: var(--tf-text);
}
.article-content blockquote {
    border-left: 4px solid var(--tf-primary);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: var(--tf-text-muted);
}
.article-image {
    width: 100%;
    height: 300px;
    background: var(--tf-gradient-subtle);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
    border: 1px solid rgba(124,92,252,0.15);
}
.article-image i {
    font-size: 4rem;
    color: var(--tf-primary-light);
}
.navbar-tf {
    background: rgba(15,15,23,0.85) !important;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.navbar-tf .navbar-brand {
    font-weight: 800;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
}
.article-featured-image {
    max-width: 800px;
    margin: 0 auto 2rem auto;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.05);
}
.article-featured-image img {
    width: 100%;
    height: auto;
    max-height: 450px;
    object-fit: cover;
    display: block;
}
@media (max-width: 768px) {
    .article-title { font-size: 2rem; }
    .article-content { padding: 2rem 1.5rem; }
    .article-meta { flex-direction: column; gap: 0.5rem; }
    .article-featured-image img { max-height: 250px; }
}
</style>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark navbar-tf fixed-top">
    <div class="container">
        <a class="navbar-brand text-gradient" href="/">
            <i class="bi bi-braces-asterisk me-2"></i>TypeForge
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMain">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link" href="/#connector">MCP Connector</a></li>
                <li class="nav-item"><a class="nav-link" href="/#features">${BLOG_T.public.nav.features}</a></li>
                <li class="nav-item"><a class="nav-link active" href="/article">${BLOG_T.public.nav.article}</a></li>
                <li class="nav-item"><a class="nav-link" href="/eshop">E-Shop</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin"><i class="bi bi-speedometer2 me-1"></i>Admin</a></li>
            </ul>
            <button class="btn-theme-toggle ms-lg-3 me-2" @click="$store.theme.toggle()" title="${BLOG_T.public.nav.toggleTheme}">
                <i class="bi bi-moon"></i>
                <i class="bi bi-sun"></i>
            </button>
            <a href="/login" class="btn btn-outline-tf btn-sm">
                <i class="bi bi-box-arrow-in-right me-1"></i>Login
            </a>
        </div>
    </div>
</nav>

<div class="article-wrapper">
    <div class="container">
        <!-- Article Header -->
        <div class="article-header">
            <span class="article-badge">
                <i class="bi bi-newspaper"></i>
                ${articleCategory}
            </span>
            <h1 class="article-title">
                <span class="text-gradient">${escapeHtmlBlog(articleTitle)}</span>
            </h1>
            <div class="article-meta">
                <span><i class="bi bi-calendar3"></i>${articleDate}</span>
                <span><i class="bi bi-person"></i>${escapeHtmlBlog(articleAuthor)}</span>
                <span><i class="bi bi-clock"></i>${articleReadTime} ${BLOG_T.public.minRead}</span>
            </div>
        </div>

        ${featuredImageUrl ? `
        <!-- Featured Image -->
        <div class="article-featured-image">
            <img src="${featuredImageUrl}" alt="${escapeHtmlBlog(articleTitle)}">
        </div>
        ` : ''}

        <!-- Article Content -->
        <article class="article-content">
            ${articleContent}
        </article>
    </div>
</div>

<!-- Footer -->
<footer class="py-4 text-center border-top" style="border-color:rgba(255,255,255,0.05)!important;">
    <div class="container">
        <p class="text-muted-tf small mb-0">TypeForge &mdash; Lorem ipsum dolor sit amet</p>
    </div>
</footer>`;
}

export function getDefaultArticleContent(): string {
    return `
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div class="article-image">
            <i class="bi bi-image"></i>
        </div>
        <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium.
        </p>
        <h2>Nemo Enim Ipsam Voluptatem</h2>
        <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
            quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        <blockquote>
            "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur."
        </blockquote>
        <p>
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
    `;
}

export function getBlogPageContent(): string {
    const dbArticles = findPublishedPostsWithAuthor();

    const articleCards = dbArticles.map(article => {
        const authorName = (article.author_first_name !== undefined && article.author_first_name !== '' && article.author_last_name !== undefined && article.author_last_name !== '')
            ? article.author_first_name + ' ' + article.author_last_name
            : 'TypeForge Team';
        const dateStr = formatBlogDate(article.created_at);
        const hasFeaturedImage = article.featured_image !== null && article.featured_image !== undefined && article.featured_image !== '';
        const cardImage = hasFeaturedImage
            ? `<img src="${storageGetUrl(article.featured_image!)}" alt="${escapeHtmlBlog(article.title)}" class="blog-card-img">`
            : `<i class="bi bi-file-earmark-text"></i>`;
        return `
        <a href="/article?slug=${article.slug}" class="blog-card">
            <div class="blog-card-image">
                ${cardImage}
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span class="blog-card-category">${escapeHtmlBlog(article.category)}</span>
                    <span class="blog-card-date"><i class="bi bi-calendar3"></i>${dateStr}</span>
                </div>
                <h3 class="blog-card-title">${escapeHtmlBlog(article.title)}</h3>
                <p class="blog-card-excerpt">${escapeHtmlBlog(article.excerpt)}</p>
                <div class="blog-card-footer">
                    <span class="blog-card-author"><i class="bi bi-person"></i>${escapeHtmlBlog(authorName)}</span>
                    <span class="blog-card-read-time"><i class="bi bi-clock"></i>${article.read_time} min</span>
                </div>
            </div>
        </a>
    `;
    }).join('');

    return `
<style>
.blog-wrapper {
    min-height: 100vh;
    padding-top: 6rem;
    padding-bottom: 4rem;
}
.blog-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem 0;
}
.blog-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    background: var(--tf-gradient-subtle);
    border: 1px solid rgba(124,92,252,0.25);
    color: var(--tf-primary-light);
    margin-bottom: 1.5rem;
}
.blog-title {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
}
.blog-subtitle {
    font-size: 1.1rem;
    color: var(--tf-text-muted);
    max-width: 600px;
    margin: 0 auto;
}
.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}
.blog-card {
    display: flex;
    flex-direction: column;
    background: var(--tf-surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
}
.blog-card:hover {
    transform: translateY(-4px);
    border-color: rgba(124,92,252,0.3);
    box-shadow: 0 12px 40px rgba(124,92,252,0.15);
}
.blog-card-image {
    height: 180px;
    background: var(--tf-gradient-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.blog-card-image i {
    font-size: 3rem;
    color: var(--tf-primary-light);
}
.blog-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.blog-card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
}
.blog-card-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
    font-size: 0.8rem;
}
.blog-card-category {
    padding: 0.25rem 0.75rem;
    background: rgba(124,92,252,0.15);
    border-radius: 20px;
    color: var(--tf-primary-light);
    font-weight: 600;
}
.blog-card-date {
    color: var(--tf-text-muted);
}
.blog-card-date i {
    margin-right: 0.3rem;
}
.blog-card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: var(--tf-text);
    line-height: 1.3;
}
.blog-card:hover .blog-card-title {
    color: var(--tf-primary-light);
}
.blog-card-excerpt {
    font-size: 0.9rem;
    color: var(--tf-text-muted);
    line-height: 1.6;
    margin-bottom: 1rem;
    flex: 1;
}
.blog-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: var(--tf-text-muted);
    padding-top: 1rem;
    border-top: 1px solid rgba(255,255,255,0.05);
}
.blog-card-footer i {
    margin-right: 0.3rem;
}
.navbar-tf {
    background: rgba(15,15,23,0.85) !important;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.navbar-tf .navbar-brand {
    font-weight: 800;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
}
@media (max-width: 768px) {
    .blog-title { font-size: 2rem; }
    .blog-grid { grid-template-columns: 1fr; padding: 0 1rem; }
}
</style>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark navbar-tf fixed-top">
    <div class="container">
        <a class="navbar-brand text-gradient" href="/">
            <i class="bi bi-braces-asterisk me-2"></i>TypeForge
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMain">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link" href="/">${BLOG_T.public.nav.home}</a></li>
                <li class="nav-item"><a class="nav-link active" href="/blog">Blog</a></li>
                <li class="nav-item"><a class="nav-link" href="/eshop">E-Shop</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin"><i class="bi bi-speedometer2 me-1"></i>Admin</a></li>
            </ul>
            <button class="btn-theme-toggle ms-lg-3 me-2" @click="$store.theme.toggle()" title="${BLOG_T.public.nav.toggleTheme}">
                <i class="bi bi-moon"></i>
                <i class="bi bi-sun"></i>
            </button>
            <a href="/login" class="btn btn-outline-tf btn-sm">
                <i class="bi bi-box-arrow-in-right me-1"></i>Login
            </a>
        </div>
    </div>
</nav>

<div class="blog-wrapper">
    <div class="container">
        <!-- Blog Header -->
        <div class="blog-header">
            <span class="blog-badge">
                <i class="bi bi-journal-richtext"></i>
                Blog
            </span>
            <h1 class="blog-title">
                ${BLOG_T.public.newsAndArticles} <span class="text-gradient">${BLOG_T.public.articles}</span>
            </h1>
            <p class="blog-subtitle">
                ${BLOG_T.public.subtitle}
            </p>
        </div>

        <!-- Blog Grid -->
        <div class="blog-grid">
            ${articleCards || '<div class="text-center text-muted-tf py-5" style="grid-column:1/-1;"><i class="bi bi-journal-x" style="font-size:3rem;display:block;margin-bottom:1rem;"></i>' + BLOG_T.empty.noArticlesYet + '</div>'}
        </div>
    </div>
</div>

<!-- Footer -->
<footer class="py-4 text-center border-top" style="border-color:rgba(255,255,255,0.05)!important;">
    <div class="container">
        <p class="text-muted-tf small mb-0">TypeForge &mdash; Lorem ipsum dolor sit amet</p>
    </div>
</footer>`;
}

// =============================================================================
// Blog Admin — Form
// =============================================================================

export function getBlogFormContent(
    request: Request,
    values?: Record<string, string>,
    errorMessage?: string,
    editId?: number
): string {
    const isEdit = editId !== undefined;
    const actionUrl = isEdit ? `/admin/blog/edit?id=${editId}` : '/admin/blog/create';
    const featuredImage = values?.featured_image ?? '';

    // Load media images for the picker
    const allMedia = findAllMedia();
    const imageMedia = allMedia.filter(m => stringStartsWith(m.mime_type, 'image/'));

    const featuredImageUrl = (featuredImage !== '' && featuredImage !== undefined) ? storageGetUrl(featuredImage) : '';

    const errorHtml = errorMessage
        ? `<div class="alert alert-danger" style="background:rgba(220,53,69,0.1);border:1px solid rgba(220,53,69,0.3);color:#ff6b7a;border-radius:12px;padding:0.75rem 1rem;font-size:0.9rem;margin-bottom:1rem;">
            <i class="bi bi-exclamation-circle me-2"></i>${errorMessage}
           </div>`
        : '';

    return `
        ${errorHtml}
        <div x-data="{
            modalOpen: false,
            featuredImage: '${stringReplace(featuredImage, "'", "\\'")}',
            featuredImageUrl: '${stringReplace(featuredImageUrl, "'", "\\'")}',
            selectImage(path, url) {
                this.featuredImage = path;
                this.featuredImageUrl = url;
                this.modalOpen = false;
            },
            clearImage() {
                this.featuredImage = '';
                this.featuredImageUrl = '';
            }
        }">
        <form method="post" action="${actionUrl}">
            <input type="hidden" name="featured_image" :value="featuredImage">
            <div class="row g-4">
                <div class="col-lg-8">
                    ${CardSection({
                        title: BLOG_T.form.sections.content,
                        children: `
                            ${FormGroup({ label: BLOG_T.form.labels.title, children: Input({ name: "title", value: values?.title ?? '', placeholder: BLOG_T.form.placeholders.title }) })}
                            ${FormGroup({ label: BLOG_T.form.labels.slug, children: Input({ name: "slug", value: values?.slug ?? '', placeholder: BLOG_T.form.placeholders.slug }) })}
                            ${FormGroup({ label: BLOG_T.form.labels.excerpt, hint: BLOG_T.form.labels.excerptHint, children: Textarea({ name: "excerpt", value: values?.excerpt ?? '', placeholder: BLOG_T.form.placeholders.excerpt, rows: 3 }) })}
                            ${FormGroup({ label: BLOG_T.form.labels.content, children: Textarea({ name: "content", value: values?.content ?? '', placeholder: BLOG_T.form.placeholders.content, rows: 15 }) })}
                        `
                    })}
                </div>
                <div class="col-lg-4">
                    ${CardSection({
                        title: BLOG_T.form.sections.featuredImage,
                        children: `
                            <div x-show="featuredImageUrl" x-cloak>
                                <img :src="featuredImageUrl" alt="${BLOG_T.form.sections.featuredImage}" style="width:100%;border-radius:8px;margin-bottom:0.5rem;">
                                <button type="button" class="btn btn-outline-tf btn-sm w-100" @click="clearImage()">
                                    <i class="bi bi-x-lg me-1"></i>${BLOG_T.actions.removeImage}
                                </button>
                            </div>
                            <div x-show="!featuredImageUrl" style="width:100%;height:120px;background:var(--bg-secondary, #f8f9fa);border:2px dashed var(--border-color, #dee2e6);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--text-muted, #6c757d);flex-direction:column;gap:0.5rem;">
                                <i class="bi bi-image" style="font-size:2rem;"></i>
                                <span style="font-size:0.85rem;">${BLOG_T.form.labels.noImage}</span>
                            </div>
                            <button type="button" class="btn btn-outline-tf btn-sm w-100 mt-2" @click="modalOpen = true">
                                <i class="bi bi-images me-1"></i>${BLOG_T.actions.selectFromMedia}
                            </button>
                        `
                    })}
                    ${CardSection({
                        title: BLOG_T.form.sections.settings,
                        children: `
                            ${FormGroup({ label: BLOG_T.form.labels.status, children: Select({
                                name: "status",
                                options: [
                                    { value: 'draft', label: BLOG_T.statuses.draft, selected: (values?.status ?? 'draft') === 'draft' },
                                    { value: 'published', label: BLOG_T.statuses.published, selected: values?.status === 'published' }
                                ]
                            }) })}
                            ${FormGroup({ label: BLOG_T.form.labels.category, children: Input({ name: "category", value: values?.category ?? '', placeholder: BLOG_T.form.placeholders.category }) })}
                            ${FormGroup({ label: BLOG_T.form.labels.readTime, children: Input({ name: "read_time", type: "number", value: values?.read_time ?? '5' }) })}
                        `
                    })}
                    ${CardSection({
                        children: `
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn-add w-100 justify-content-center">
                                    ${Icon({ name: isEdit ? 'check-lg' : 'plus-lg' })}
                                    ${isEdit ? BLOG_T.actions.saveChanges : BLOG_T.actions.createArticle}
                                </button>
                                <a href="/admin/blog" class="btn btn-outline-tf btn-sm text-center">${BLOG_T.actions.backToList}</a>
                            </div>
                        `
                    })}
                </div>
            </div>
        </form>

        <!-- Media Picker Modal -->
        <div class="modal-backdrop" x-show="modalOpen" x-cloak @click.self="modalOpen = false" style="display:flex;">
            <div class="modal-content" style="max-width:700px;">
                <div class="modal-header">
                    <h5>${BLOG_T.form.sections.selectImage}</h5>
                    <button type="button" class="btn-close" @click="modalOpen = false">&times;</button>
                </div>
                <div class="modal-body" style="max-height:400px;overflow-y:auto;">
                    ${imageMedia.length === 0
                        ? `<div class="text-center py-4" style="color:var(--text-muted, #6c757d);">
                               <i class="bi bi-images" style="font-size:2.5rem;display:block;margin-bottom:0.5rem;"></i>
                               <p>${BLOG_T.empty.noImages}</p>
                               <a href="/admin/media" class="btn btn-outline-tf btn-sm">${BLOG_T.actions.goToMedia}</a>
                           </div>`
                        : `<div class="media-picker-grid">
                               ${map(imageMedia, (m) => `
                                   <div class="media-picker-item"
                                        :class="{'selected': featuredImage === '${stringReplace(m.storage_path, "'", "\\'")}'}"
                                        @click="selectImage('${stringReplace(m.storage_path, "'", "\\'")}', '${stringReplace(storageGetUrl(m.storage_path), "'", "\\'")}')"
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
            }
            .modal-body {
                padding: 1.5rem;
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
            .btn-close:hover { color: #212529; }
            [data-theme="dark"] .btn-close { color: #adb5bd; }
            [data-theme="dark"] .btn-close:hover { color: #e0e0e0; }
            .media-picker-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                gap: 0.75rem;
            }
            .media-picker-item {
                aspect-ratio: 1;
                border-radius: 8px;
                overflow: hidden;
                border: 2px solid transparent;
                cursor: pointer;
                transition: all 0.2s;
            }
            .media-picker-item:hover {
                border-color: var(--tf-primary, #7c5cfc);
                transform: scale(1.03);
            }
            .media-picker-item.selected {
                border-color: var(--tf-primary, #7c5cfc);
                box-shadow: 0 0 0 2px rgba(124,92,252,0.3);
            }
            .media-picker-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        </style>
    `;
}
