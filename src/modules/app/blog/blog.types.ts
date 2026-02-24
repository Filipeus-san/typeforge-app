// =============================================================================
// Blog Types
// =============================================================================

export interface DbBlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author_id: number;
    category: string;
    status: string;
    read_time: number;
    featured_image: string | null;
    created_at: string;
    updated_at: string;
}

export interface DbBlogPostWithAuthor extends DbBlogPost {
    author_first_name: string;
    author_last_name: string;
    author_email: string;
}
