import type { ComponentType } from 'react';
import { ArticlePage } from './pages/public/ArticlePage';
import { BlogListPage } from './pages/public/BlogListPage';
import { PagePage } from './pages/public/PagePage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminPagesPage } from './pages/admin/AdminPagesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminMenuPage } from './pages/admin/AdminMenuPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminBlogPage } from './pages/admin/AdminBlogPage';
import { AdminBlogSettingsPage } from './pages/admin/AdminBlogSettingsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminPageFormPage } from './pages/admin/AdminPageFormPage';
import { AdminUserFormPage } from './pages/admin/AdminUserFormPage';
import { AdminBlogFormPage } from './pages/admin/AdminBlogFormPage';
import { AdminBlogBuilderPage } from './pages/admin/AdminBlogBuilderPage';
import { AdminPageBuilderPage } from './pages/admin/AdminPageBuilderPage';
import { AdminRedirectsPage } from './pages/admin/AdminRedirectsPage';
import { AdminRedirectFormPage } from './pages/admin/AdminRedirectFormPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { ForgotPasswordPage } from './pages/admin/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/admin/ResetPasswordPage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registry: Record<string, ComponentType<any>> = {
  Article: ArticlePage,
  BlogList: BlogListPage,
  Page: PagePage,
  AdminLogin: AdminLoginPage,
  AdminDashboard: AdminDashboardPage,
  AdminPages: AdminPagesPage,
  AdminSettings: AdminSettingsPage,
  AdminMenu: AdminMenuPage,
  AdminMedia: AdminMediaPage,
  AdminBlog: AdminBlogPage,
  AdminBlogSettings: AdminBlogSettingsPage,
  AdminUsers: AdminUsersPage,
  AdminPageForm: AdminPageFormPage,
  AdminUserForm: AdminUserFormPage,
  AdminBlogForm: AdminBlogFormPage,
  AdminBlogBuilder: AdminBlogBuilderPage,
  AdminPageBuilder: AdminPageBuilderPage,
  AdminRedirects: AdminRedirectsPage,
  AdminRedirectForm: AdminRedirectFormPage,
  AdminProfile: AdminProfilePage,
  ForgotPassword: ForgotPasswordPage,
  ResetPassword: ResetPasswordPage,
};
