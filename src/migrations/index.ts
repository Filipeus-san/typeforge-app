import { migration_001_create_users } from "./001_create_users";
import { migration_002_create_blog_posts } from "./002_create_blog_posts";
import { migration_003_create_orders } from "./003_create_orders";
import { migration_004_create_order_items } from "./004_create_order_items";
import { migration_005_create_categories } from "./005_create_categories";
import { migration_006_create_products } from "./006_create_products";
import { migration_007_add_product_id_to_order_items } from "./007_add_product_id_to_order_items";
import { migration_008_create_customers } from "./008_create_customers";
import { migration_009_add_customer_id_to_orders } from "./009_add_customer_id_to_orders";
import { migration_014_create_media } from "./014_create_media";
import { migration_015_add_blog_featured_image } from "./015_add_blog_featured_image";
import { migration_017_add_product_featured_image } from "./017_add_product_featured_image";
import { migration_018_create_product_images } from "./018_create_product_images";
import { migration_019_create_cart_items } from "./019_create_cart_items";

export const migrations: Migration[] = [
    migration_001_create_users,
    migration_002_create_blog_posts,
    migration_003_create_orders,
    migration_004_create_order_items,
    migration_005_create_categories,
    migration_006_create_products,
    migration_007_add_product_id_to_order_items,
    migration_008_create_customers,
    migration_009_add_customer_id_to_orders,
    migration_014_create_media,
    migration_015_add_blog_featured_image,
    migration_017_add_product_featured_image,
    migration_018_create_product_images,
    migration_019_create_cart_items,
];
