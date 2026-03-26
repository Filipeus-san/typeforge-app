import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HexagonIcon from '@mui/icons-material/Hexagon';
import { useTheme } from '../context/ThemeContext';

interface MenuItem {
  label: string;
  url: string;
  target?: string;
  children?: MenuItem[];
}

interface NavbarProps {
  activePath?: string;
  menuItems?: MenuItem[];
  siteName?: string;
}

const defaultNavLinks: MenuItem[] = [
  { url: '/', label: 'Home' },
  { url: '/blog', label: 'Blog' },
];

export function Navbar({ activePath, menuItems, siteName }: NavbarProps) {
  const navLinks = menuItems && menuItems.length > 0 ? menuItems : defaultNavLinks;
  const { theme, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: 64,
          bgcolor: theme === 'dark' ? 'rgba(15, 15, 23, 0.8)' : 'rgba(248, 249, 252, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 4 },
            height: '100%',
            minHeight: '64px !important',
          }}
        >
          {/* Logo */}
          <Box
            component="a"
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              textDecoration: 'none',
              fontSize: '1.5rem',
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <HexagonIcon fontSize="inherit" />
            </Box>
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {siteName || 'Lorem'}
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop nav links */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 3,
              height: '100%',
            }}
          >
            {navLinks.map((link) => (
              link.children && link.children.length > 0 ? (
                <Box
                  key={link.url}
                  onMouseEnter={() => setOpenDropdown(link.url)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  sx={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}
                >
                  <Button
                    component="a"
                    href={link.url}
                    sx={{
                      color: activePath === link.url ? 'primary.light' : 'text.secondary',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      minWidth: 'auto',
                      p: 0,
                      '&:hover': { color: 'primary.light', bgcolor: 'transparent' },
                    }}
                  >
                    {link.label}
                    <KeyboardArrowDownIcon sx={{ fontSize: 18, ml: 0.25, transition: 'transform 0.2s', transform: openDropdown === link.url ? 'rotate(180deg)' : 'none' }} />
                  </Button>
                  {openDropdown === link.url && (
                    <Paper
                      elevation={8}
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        mt: 0,
                        minWidth: 180,
                        borderRadius: 2,
                        border: 1,
                        borderColor: 'divider',
                        bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.95)' : 'rgba(255,255,255,0.98)',
                        backdropFilter: 'blur(12px)',
                        overflow: 'hidden',
                        py: 0.5,
                      }}
                    >
                      {link.children.map((child) => (
                        <Button
                          key={child.url}
                          component="a"
                          href={child.url}
                          target={child.target === '_blank' ? '_blank' : undefined}
                          rel={child.target === '_blank' ? 'noopener noreferrer' : undefined}
                          sx={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            color: 'text.secondary',
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            px: 2,
                            py: 0.75,
                            borderRadius: 0,
                            '&:hover': { color: 'primary.light', bgcolor: theme === 'dark' ? 'rgba(124,92,252,0.08)' : 'rgba(124,92,252,0.06)' },
                          }}
                        >
                          {child.label}
                        </Button>
                      ))}
                    </Paper>
                  )}
                </Box>
              ) : (
                <Button
                  key={link.url}
                  component="a"
                  href={link.url}
                  target={link.target === '_blank' ? '_blank' : undefined}
                  rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                  sx={{
                    color: activePath === link.url ? 'primary.light' : 'text.secondary',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    minWidth: 'auto',
                    p: 0,
                    '&:hover': { color: 'primary.light', bgcolor: 'transparent' },
                  }}
                >
                  {link.label}
                </Button>
              )
            ))}
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                color: 'text.primary',
                width: 36,
                height: 36,
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(124,92,252,0.1)',
                },
              }}
            >
              {theme === 'dark' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
            </IconButton>
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              display: { xs: 'flex', md: 'none' },
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              color: 'text.primary',
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: 'background.default',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <IconButton
          onClick={() => setDrawerOpen(false)}
          sx={{
            position: 'absolute',
            top: 16,
            right: 32,
            color: 'text.primary',
            fontSize: '1.8rem',
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <List sx={{ textAlign: 'center' }}>
          {navLinks.map((link) => (
            <React.Fragment key={link.url}>
              {link.children && link.children.length > 0 ? (
                <>
                  <ListItemButton
                    onClick={() => setMobileExpanded(mobileExpanded === link.url ? null : link.url)}
                    sx={{ justifyContent: 'center', py: 1.5 }}
                  >
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{
                        fontSize: '1.3rem',
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    />
                    <KeyboardArrowDownIcon sx={{ transition: 'transform 0.2s', transform: mobileExpanded === link.url ? 'rotate(180deg)' : 'none' }} />
                  </ListItemButton>
                  <Collapse in={mobileExpanded === link.url}>
                    <List disablePadding>
                      {link.children.map((child) => (
                        <ListItemButton
                          key={child.url}
                          component="a"
                          href={child.url}
                          target={child.target === '_blank' ? '_blank' : undefined}
                          rel={child.target === '_blank' ? 'noopener noreferrer' : undefined}
                          sx={{ justifyContent: 'center', py: 1 }}
                        >
                          <ListItemText
                            primary={child.label}
                            primaryTypographyProps={{
                              fontSize: '1.1rem',
                              fontWeight: 500,
                              textAlign: 'center',
                              color: 'text.secondary',
                            }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItemButton
                  component="a"
                  href={link.url}
                  target={link.target === '_blank' ? '_blank' : undefined}
                  rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                  sx={{ justifyContent: 'center', py: 1.5 }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  />
                </ListItemButton>
              )}
            </React.Fragment>
          ))}
        </List>
        <IconButton
          onClick={toggleTheme}
          sx={{
            mt: 2,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            color: 'text.primary',
            width: 44,
            height: 44,
          }}
        >
          {theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Box sx={{ height: 64 }} />
    </>
  );
}
