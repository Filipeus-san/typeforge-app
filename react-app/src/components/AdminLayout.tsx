import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import HexagonIcon from '@mui/icons-material/Hexagon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PeopleIcon from '@mui/icons-material/People';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TuneIcon from '@mui/icons-material/Tune';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../i18n';
import { FlashMessage } from './FlashMessage';

const DRAWER_WIDTH = 260;

const gradientText = {
  background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

interface Props {
  activePath: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  flash?: { type: 'success' | 'error' | 'warning' | 'info'; message: string };
}

export function AdminLayout({ activePath, children, fullWidth, flash }: Props) {
  const { theme, toggleTheme } = useTheme();
  const t = useT();
  const [mobileOpen, setMobileOpen] = useState(false);

  const mainNavItems = [
    { href: '/admin', label: t.nav.dashboard, icon: <DashboardIcon /> },
    { href: '/admin/pages', label: t.nav.pages, icon: <ArticleIcon /> },
    { href: '/admin/users', label: t.nav.users, icon: <PeopleIcon /> },
    { href: '/admin/media', label: t.nav.media, icon: <PermMediaIcon /> },
    { href: '/admin/menu', label: t.nav.menu, icon: <MenuBookIcon /> },
    { href: '/admin/redirects', label: t.nav.redirects, icon: <SyncAltIcon /> },
    { href: '/admin/settings', label: t.nav.settings, icon: <SettingsIcon /> },
  ];

  const blogNavItems = [
    { href: '/admin/blog', label: t.nav.articles, icon: <NewspaperIcon /> },
    { href: '/admin/blog/settings', label: t.nav.blogSettings, icon: <TuneIcon /> },
  ];
  const currentUser = (window as any).__CURRENT_USER__ as { name?: string; avatarUrl?: string | null } | undefined;
  const userName = currentUser?.name ?? 'Admin';
  const userInitial = userName.charAt(0).toUpperCase();
  const userAvatar = currentUser?.avatarUrl ?? null;

  const isActive = (href: string) => activePath === href;

  const sidebarContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          component="a"
          href="/admin"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            textDecoration: 'none',
            fontSize: '1.35rem',
            fontWeight: 800,
          }}
        >
          <Box component="span" sx={{ ...gradientText, display: 'flex', alignItems: 'center' }}>
            <HexagonIcon fontSize="inherit" />
          </Box>
          <Box component="span" sx={gradientText}>
            Lorem
          </Box>
        </Box>
        <Typography
          variant="caption"
          sx={{
            bgcolor: 'rgba(124,92,252,0.15)',
            color: 'primary.light',
            px: 1,
            py: 0.25,
            borderRadius: 1,
            fontWeight: 600,
            fontSize: '0.65rem',
            ml: 0.5,
          }}
        >
          ADMIN
        </Typography>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Nav */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List sx={{ px: 1.5, pt: 2, pb: 1 }}>
          {mainNavItems.map((item) => (
            <ListItemButton
              key={item.href}
              component="a"
              href={item.href}
              selected={isActive(item.href)}
              sx={{
                borderRadius: 2.5,
                mb: 0.5,
                py: 1,
                px: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'rgba(124,92,252,0.12)',
                  color: 'primary.light',
                  '& .MuiListItemIcon-root': { color: 'primary.light' },
                  '&:hover': { bgcolor: 'rgba(124,92,252,0.18)' },
                },
                '&:hover': {
                  bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isActive(item.href) ? 600 : 500 }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ mx: 2, my: 0.5 }} />

        <Typography
          variant="overline"
          sx={{
            px: 3,
            pt: 1.5,
            pb: 0.5,
            display: 'block',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'text.disabled',
          }}
        >
          {t.nav.blog}
        </Typography>
        <List sx={{ px: 1.5, pb: 1 }}>
          {blogNavItems.map((item) => (
            <ListItemButton
              key={item.href}
              component="a"
              href={item.href}
              selected={isActive(item.href)}
              sx={{
                borderRadius: 2.5,
                mb: 0.5,
                py: 1,
                px: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'rgba(124,92,252,0.12)',
                  color: 'primary.light',
                  '& .MuiListItemIcon-root': { color: 'primary.light' },
                  '&:hover': { bgcolor: 'rgba(124,92,252,0.18)' },
                },
                '&:hover': {
                  bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isActive(item.href) ? 600 : 500 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Footer */}
      <Box sx={{ p: 2 }}>
        <Stack
          component="a"
          href="/admin/profile"
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            mb: 1.5,
            textDecoration: 'none',
            color: 'inherit',
            borderRadius: 2,
            p: 0.5,
            mx: -0.5,
            '&:hover': { bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' },
          }}
        >
          <Avatar
            src={userAvatar || undefined}
            sx={{
              width: 34,
              height: 34,
              background: userAvatar ? 'transparent' : 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            {!userAvatar && userInitial}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {userName}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              {t.nav.editProfile}
            </Typography>
          </Box>
          <IconButton
            onClick={(e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); toggleTheme(); }}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            {theme === 'dark' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
          </IconButton>
        </Stack>
        <ListItemButton
          component="a"
          href="/admin/logout"
          sx={{
            borderRadius: 2,
            py: 0.75,
            px: 1.5,
            color: 'text.secondary',
            '&:hover': { color: 'error.main' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={t.nav.logout}
            primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Desktop sidebar */}
      <Box
        component="nav"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box
          sx={{
            width: DRAWER_WIDTH,
            height: '100vh',
            position: 'fixed',
            borderRight: 1,
            borderColor: 'divider',
            bgcolor: theme === 'dark' ? 'rgba(15,15,23,0.95)' : 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {sidebarContent}
        </Box>
      </Box>

      {/* Mobile drawer */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            bgcolor: 'background.default',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {sidebarContent}
      </Drawer>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Mobile top bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            display: { xs: 'block', md: 'none' },
            bgcolor: theme === 'dark' ? 'rgba(15,15,23,0.9)' : 'rgba(248,249,252,0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Toolbar sx={{ minHeight: '56px !important' }}>
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 1, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box component="span" sx={{ ...gradientText, display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                <HexagonIcon fontSize="inherit" />
              </Box>
              <Typography sx={{ ...gradientText, fontWeight: 800, fontSize: '1.1rem' }}>
                Lorem
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 1.5, sm: 3, md: 4 },
            maxWidth: fullWidth ? 'none' : 1200,
            width: '100%',
            overflowX: 'hidden',
          }}
        >
          {flash && flash.message && (
            <FlashMessage type={flash.type} message={flash.message} />
          )}
          {children}
        </Box>
      </Box>
    </Box>
  );
}
