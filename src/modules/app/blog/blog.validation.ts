import { Required, MinLength, MaxLength, Transform } from "../../../validator";

export class BlogPostForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(3)
    @MaxLength(500)
    title: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(3)
    @MaxLength(500)
    slug: string = '';

    @Transform((v: string) => v?.trim())
    excerpt: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    content: string = '';

    @Transform((v: string) => v?.trim())
    category: string = '';

    @Transform((v: string) => v?.trim())
    status: string = 'draft';

    @Transform((v: string) => v?.trim())
    read_time: string = '5';

    @Transform((v: string) => v?.trim())
    featured_image: string = '';
}
