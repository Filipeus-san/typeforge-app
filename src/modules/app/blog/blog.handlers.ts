import { getHtmlTemplate } from "../../../template";
import { AdminLayout, CardSection, Select, Badge, Icon, map } from "../../../components";
import { getPayloudData, checkCsrfToken, link } from "../../../utils";
import { transformValidate, ValidationError } from "../../../validator";
import { UserSession, requireAdmin, generateSlug } from "../shared";
import { DbBlogPost } from "./blog.types";
import { BlogPostForm } from "./blog.validation";
import { findPostBySlugWithAuthor, findAllPostsWithAuthor, findPostById, findPostBySlug, findPostBySlugExcluding, insertPost, updatePost, deletePost } from "./blog.repository";
import { escapeHtmlBlog, formatBlogDate } from "./blog.utils";
import { getArticlePageContent, getBlogPageContent, getBlogFormContent } from "./blog.templates";
import { BLOG_STATUS_FILTER_OPTIONS, DEFAULT_READ_TIME } from "./blog.const";
import { BLOG_T } from "./blog.translation";

// =============================================================================
// Public Blog Pages
// =============================================================================

export function renderArticle(request: Request, response: Response): Response {
    const params = parseUrlQuery<{ slug?: string }>(request.query);
    const slug = params?.slug;

    if (slug) {
        const post = findPostBySlugWithAuthor(slug);

        if (post) {
            const authorName = (post.author_first_name !== undefined && post.author_first_name !== '' && post.author_last_name !== undefined && post.author_last_name !== '')
                ? post.author_first_name + ' ' + post.author_last_name
                : 'TypeForge Team';
            const featuredImageUrl = (post.featured_image !== null && post.featured_image !== undefined && post.featured_image !== '')
                ? storageGetUrl(post.featured_image)
                : undefined;
            response.content = getHtmlTemplate(
                escapeHtmlBlog(post.title) + " — TypeForge",
                getArticlePageContent(post.title, post.content, post.category, formatBlogDate(post.created_at), authorName, String(post.read_time), featuredImageUrl)
            );
            return response;
        }
    }

    response.content = getHtmlTemplate(BLOG_T.titles.article, getArticlePageContent());
    return response;
}

export function renderBlog(request: Request, response: Response): Response {
    response.content = getHtmlTemplate(BLOG_T.titles.public, getBlogPageContent());
    return response;
}

// =============================================================================
// Blog Admin — List
// =============================================================================

export function renderAdminBlog(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const posts = findAllPostsWithAuthor();

    const statusFilter = parseUrlQuery<{ status?: string }>(request.query)?.status ?? '';

    const filteredPosts = statusFilter !== ''
        ? posts.filter(p => p.status === statusFilter)
        : posts;

    response.content = getHtmlTemplate(BLOG_T.titles.admin, AdminLayout({
        title: BLOG_T.headings.admin,
        activePage: "blog",
        children: `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="filter-bar mb-0">
                    ${Select({ filter: true, options: BLOG_STATUS_FILTER_OPTIONS.map(o => ({ ...o, selected: statusFilter === o.value })) })}
                </div>
                <a href="/admin/blog/create" class="btn-add">
                    ${Icon({ name: 'plus-lg' })} ${BLOG_T.actions.newArticle}
                </a>
            </div>
            ${CardSection({
                children: `
                    <table class="data-table">
                        <thead><tr><th>${BLOG_T.columns.name}</th><th>${BLOG_T.columns.author}</th><th>${BLOG_T.columns.category}</th><th>${BLOG_T.columns.status}</th><th>${BLOG_T.columns.date}</th><th>${BLOG_T.columns.actions}</th></tr></thead>
                        <tbody>
                            ${filteredPosts.length === 0
                                ? `<tr><td colspan="6" class="text-center text-muted-tf py-4">${BLOG_T.empty.articles}</td></tr>`
                                : map(filteredPosts, (p) => `
                                <tr>
                                    <td><strong>${escapeHtmlBlog(p.title)}</strong></td>
                                    <td>${escapeHtmlBlog(p.author_first_name + ' ' + p.author_last_name)}</td>
                                    <td>${escapeHtmlBlog(p.category)}</td>
                                    <td>${Badge({ children: p.status === 'published' ? BLOG_T.statuses.published : BLOG_T.statuses.draft, variant: p.status === 'published' ? 'success' : 'warning' })}</td>
                                    <td>${formatBlogDate(p.created_at)}</td>
                                    <td>
                                        <a href="/admin/blog/edit?id=${p.id}" class="btn-action" title="${BLOG_T.actions.edit}">${Icon({ name: 'pencil' })}</a>
                                        <a href="/article?slug=${p.slug}" class="btn-action" title="${BLOG_T.actions.view}" target="_blank">${Icon({ name: 'eye' })}</a>
                                        <a href="${link('/admin/blog/delete', { id: String(p.id) }, request, 'action')}" class="btn-action danger" title="${BLOG_T.actions.delete}" x-data @click.prevent="if(confirm('${BLOG_T.confirm.deleteArticle}')) window.location.href=$el.href">${Icon({ name: 'trash' })}</a>
                                    </td>
                                </tr>
                            `)}
                        </tbody>
                    </table>
                `
            })}
        `
    }));
    return response;
}

// =============================================================================
// Blog Admin — Create
// =============================================================================

export function renderAdminBlogCreate(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    if (request.method === "post") {
        return handleBlogCreate(request, response, auth.session);
    }

    response.content = getHtmlTemplate(BLOG_T.titles.create, AdminLayout({
        title: BLOG_T.headings.create,
        activePage: "blog",
        children: getBlogFormContent(request)
    }));
    return response;
}

function handleBlogCreate(request: Request, response: Response, session: UserSession): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getHtmlTemplate(BLOG_T.titles.create, AdminLayout({
            title: BLOG_T.headings.create,
            activePage: "blog",
            children: getBlogFormContent(request, undefined, BLOG_T.errors.invalidRequest)
        }));
        return response;
    }

    try {
        const data = transformValidate(BlogPostForm, raw);
        const slug = (data.slug !== '' && data.slug !== undefined) ? data.slug : generateSlug(data.title);
        const readTime = Number(data.read_time) || DEFAULT_READ_TIME;

        const existing = findPostBySlug(slug);
        if (existing) {
            response.content = getHtmlTemplate(BLOG_T.titles.create, AdminLayout({
                title: BLOG_T.headings.create,
                activePage: "blog",
                children: getBlogFormContent(request, raw, BLOG_T.errors.slugExists)
            }));
            return response;
        }

        insertPost(data.title, slug, data.excerpt, data.content, Number(session.user.id), data.category, data.status, readTime, data.featured_image);

        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? BLOG_T.errors.validationError;
            response.content = getHtmlTemplate(BLOG_T.titles.create, AdminLayout({
                title: BLOG_T.headings.create,
                activePage: "blog",
                children: getBlogFormContent(request, raw, firstError)
            }));
            return response;
        }
        response.content = getHtmlTemplate(BLOG_T.titles.create, AdminLayout({
            title: BLOG_T.headings.create,
            activePage: "blog",
            children: getBlogFormContent(request, undefined, BLOG_T.errors.genericError)
        }));
        return response;
    }
}

// =============================================================================
// Blog Admin — Edit
// =============================================================================

export function renderAdminBlogEdit(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string }>(request.query);
    const postId = params?.id;

    if (!postId) {
        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    }

    const post = findPostById(Number(postId));
    if (!post) {
        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    }

    if (request.method === "post") {
        return handleBlogEdit(request, response, post);
    }

    const values: Record<string, string> = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        status: post.status,
        read_time: String(post.read_time),
        featured_image: post.featured_image ?? ''
    };

    response.content = getHtmlTemplate(BLOG_T.titles.edit, AdminLayout({
        title: BLOG_T.headings.edit,
        activePage: "blog",
        children: getBlogFormContent(request, values, undefined, post.id)
    }));
    return response;
}

function handleBlogEdit(request: Request, response: Response, post: DbBlogPost): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    }

    try {
        const data = transformValidate(BlogPostForm, raw);
        const slug = (data.slug !== '' && data.slug !== undefined) ? data.slug : generateSlug(data.title);
        const readTime = Number(data.read_time) || DEFAULT_READ_TIME;

        const existing = findPostBySlugExcluding(slug, post.id);
        if (existing) {
            response.content = getHtmlTemplate(BLOG_T.titles.edit, AdminLayout({
                title: BLOG_T.headings.edit,
                activePage: "blog",
                children: getBlogFormContent(request, raw, BLOG_T.errors.slugExists, post.id)
            }));
            return response;
        }

        updatePost(Number(post.id), data.title, slug, data.excerpt, data.content, data.category, data.status, readTime, data.featured_image);

        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? BLOG_T.errors.validationError;
            response.content = getHtmlTemplate(BLOG_T.titles.edit, AdminLayout({
                title: BLOG_T.headings.edit,
                activePage: "blog",
                children: getBlogFormContent(request, raw, firstError, post.id)
            }));
            return response;
        }
        response.content = getHtmlTemplate(BLOG_T.titles.edit, AdminLayout({
            title: BLOG_T.headings.edit,
            activePage: "blog",
            children: getBlogFormContent(request, undefined, BLOG_T.errors.genericError, post.id)
        }));
        return response;
    }
}

// =============================================================================
// Blog Admin — Delete
// =============================================================================

export function handleAdminBlogDelete(request: Request, response: Response): Response {
    const auth = requireAdmin(request, response);
    if (!auth) return response;

    const params = parseUrlQuery<{ id?: string; token?: string }>(request.query);
    if (!params?.id) {
        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    }

    if (!params.token || !checkCsrfToken(params.token, request)) {
        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    }

    deletePost(Number(params.id));

    response.status = 302;
    response.headers["Location"] = "/admin/blog";
    return response;
}
