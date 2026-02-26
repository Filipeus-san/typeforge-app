import { getReactPageTemplate } from "../../../react";
import { getPayloudData, checkCsrfToken } from "../../../utils";
import { transformValidate, ValidationError } from "../../../validator";
import { UserSession, requireAdmin, generateSlug } from "../shared";
import { DbBlogPost } from "./blog.types";
import { BlogPostForm } from "./blog.validation";
import { findPostBySlugWithAuthor, findAllPostsWithAuthor, findPostById, findPostBySlug, findPostBySlugExcluding, insertPost, updatePost, deletePost } from "./blog.repository";
import { escapeHtmlBlog } from "./blog.utils";
import { DEFAULT_READ_TIME } from "./blog.const";
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
            response.content = getReactPageTemplate(
                escapeHtmlBlog(post.title) + " — TypeForge",
                "Article",
                {
                    title: post.title,
                    content: post.content,
                    category: post.category,
                    date: post.created_at,
                    author: authorName,
                    readTime: String(post.read_time),
                    featuredImageUrl: featuredImageUrl,
                }
            );
            return response;
        }
    }

    response.content = getReactPageTemplate(BLOG_T.titles.article, "Article", {
        title: "Článek nenalezen",
        content: "<p>Požadovaný článek nebyl nalezen.</p>",
    });
    return response;
}

export function renderBlog(request: Request, response: Response): Response {
    const posts = findAllPostsWithAuthor();
    const publishedPosts = posts.filter(p => p.status === 'published');
    response.content = getReactPageTemplate(BLOG_T.titles.public, "BlogList", {
        posts: publishedPosts.map(p => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            category: p.category,
            authorName: p.author_first_name + ' ' + p.author_last_name,
            createdAt: p.created_at,
            readTime: String(p.read_time),
            featuredImage: p.featured_image ?? '',
        })),
    });
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

    response.content = getReactPageTemplate(BLOG_T.titles.admin, "AdminBlogList", {
        posts: filteredPosts.map(p => ({
            id: String(p.id),
            title: p.title,
            slug: p.slug,
            authorName: p.author_first_name + ' ' + p.author_last_name,
            category: p.category,
            status: p.status,
            createdAt: p.created_at,
        })),
        statusFilter,
    });
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

    response.content = getReactPageTemplate(BLOG_T.titles.create, "AdminBlogForm", {
        isEdit: false,
    });
    return response;
}

function handleBlogCreate(request: Request, response: Response, session: UserSession): Response {
    const raw = getPayloudData<Record<string, string>>(request);
    if (!raw) {
        response.content = getReactPageTemplate(BLOG_T.titles.create, "AdminBlogForm", {
            error: BLOG_T.errors.invalidRequest,
            isEdit: false,
        });
        return response;
    }

    try {
        const data = transformValidate(BlogPostForm, raw);
        const slug = (data.slug !== '' && data.slug !== undefined) ? data.slug : generateSlug(data.title);
        const readTime = Number(data.read_time) || DEFAULT_READ_TIME;

        const existing = findPostBySlug(slug);
        if (existing) {
            response.content = getReactPageTemplate(BLOG_T.titles.create, "AdminBlogForm", {
                values: raw,
                error: BLOG_T.errors.slugExists,
                isEdit: false,
            });
            return response;
        }

        insertPost(data.title, slug, data.excerpt, data.content, Number(session.user.id), data.category, data.status, readTime, data.featured_image);

        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? BLOG_T.errors.validationError;
            response.content = getReactPageTemplate(BLOG_T.titles.create, "AdminBlogForm", {
                values: raw,
                error: firstError,
                isEdit: false,
            });
            return response;
        }
        response.content = getReactPageTemplate(BLOG_T.titles.create, "AdminBlogForm", {
            error: BLOG_T.errors.genericError,
            isEdit: false,
        });
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

    response.content = getReactPageTemplate(BLOG_T.titles.edit, "AdminBlogForm", {
        values,
        isEdit: true,
        postId: String(post.id),
    });
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
            response.content = getReactPageTemplate(BLOG_T.titles.edit, "AdminBlogForm", {
                values: raw,
                error: BLOG_T.errors.slugExists,
                isEdit: true,
                postId: String(post.id),
            });
            return response;
        }

        updatePost(Number(post.id), data.title, slug, data.excerpt, data.content, data.category, data.status, readTime, data.featured_image);

        response.status = 302;
        response.headers["Location"] = "/admin/blog";
        return response;
    } catch (error) {
        if (error instanceof ValidationError) {
            const firstError = Object.values(error.errors)[0]?.[0] ?? BLOG_T.errors.validationError;
            response.content = getReactPageTemplate(BLOG_T.titles.edit, "AdminBlogForm", {
                values: raw,
                error: firstError,
                isEdit: true,
                postId: String(post.id),
            });
            return response;
        }
        response.content = getReactPageTemplate(BLOG_T.titles.edit, "AdminBlogForm", {
            error: BLOG_T.errors.genericError,
            isEdit: true,
            postId: String(post.id),
        });
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
