import { Required, MinLength, MaxLength, Transform } from "../../../validator";

export class ProductForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    @MaxLength(300)
    name: string = '';

    @Transform((v: string) => v?.trim())
    slug: string = '';

    @Transform((v: string) => v?.trim())
    short_description: string = '';

    @Transform((v: string) => v?.trim())
    description: string = '';

    category_id: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    price: string = '0';

    @Transform((v: string) => v?.trim())
    old_price: string = '';

    @Transform((v: string) => v?.trim())
    icon: string = 'box';

    @Transform((v: string) => v?.trim())
    stock: string = '0';

    status: string = 'active';

    @Transform((v: string) => v?.trim())
    featured_image: string = '';

    @Transform((v: string) => v?.trim())
    gallery_images: string = '';
}

export class CategoryForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    @MaxLength(200)
    name: string = '';

    @Transform((v: string) => v?.trim())
    slug: string = '';

    @Transform((v: string) => v?.trim())
    description: string = '';

    @Transform((v: string) => v?.trim())
    icon: string = 'tag';

    status: string = 'active';

    @Transform((v: string) => v?.trim())
    sort_order: string = '0';
}
