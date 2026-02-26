import type { ComponentType } from 'react';

// Admin pages
import { DashboardPage } from './pages/admin/DashboardPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { ProductListPage } from './pages/admin/ProductListPage';
import { ProductFormPage } from './pages/admin/ProductFormPage';
import { CategoryListPage } from './pages/admin/CategoryListPage';
import { CategoryFormPage } from './pages/admin/CategoryFormPage';
import { OrderListPage } from './pages/admin/OrderListPage';
import { OrderDetailPage } from './pages/admin/OrderDetailPage';
import { OrderFormPage } from './pages/admin/OrderFormPage';
import { BlogListPage as AdminBlogListPage } from './pages/admin/BlogListPage';
import { BlogFormPage } from './pages/admin/BlogFormPage';
import { MediaPage } from './pages/admin/MediaPage';
import { CustomerListPage } from './pages/admin/CustomerListPage';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { EshopPage } from './pages/public/EshopPage';
import { ProductPage } from './pages/public/ProductPage';
import { CategoryPage } from './pages/public/CategoryPage';
import { CartPage } from './pages/public/CartPage';
import { CheckoutShippingPage } from './pages/public/CheckoutShippingPage';
import { CheckoutPaymentPage } from './pages/public/CheckoutPaymentPage';
import { CheckoutReviewPage } from './pages/public/CheckoutReviewPage';
import { CheckoutConfirmationPage } from './pages/public/CheckoutConfirmationPage';
import { BlogListPage as PublicBlogListPage } from './pages/public/BlogListPage';
import { ArticlePage } from './pages/public/ArticlePage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registry: Record<string, ComponentType<any>> = {
  // Admin
  AdminDashboard: DashboardPage,
  AdminAnalytics: AnalyticsPage,
  AdminProductList: ProductListPage,
  AdminProductForm: ProductFormPage,
  AdminCategoryList: CategoryListPage,
  AdminCategoryForm: CategoryFormPage,
  AdminOrderList: OrderListPage,
  AdminOrderDetail: OrderDetailPage,
  AdminOrderForm: OrderFormPage,
  AdminBlogList: AdminBlogListPage,
  AdminBlogForm: BlogFormPage,
  AdminMedia: MediaPage,
  AdminCustomerList: CustomerListPage,

  // Public
  Landing: LandingPage,
  Login: LoginPage,
  Register: RegisterPage,
  Eshop: EshopPage,
  Product: ProductPage,
  Category: CategoryPage,
  Cart: CartPage,
  CheckoutShipping: CheckoutShippingPage,
  CheckoutPayment: CheckoutPaymentPage,
  CheckoutReview: CheckoutReviewPage,
  CheckoutConfirmation: CheckoutConfirmationPage,
  BlogList: PublicBlogListPage,
  Article: ArticlePage,
};
