import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { AdminLayout } from '../../components/AdminLayout';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: 'published' | 'draft' | 'scheduled';
  author: string;
  category: string;
  readTime: string;
  views: number;
  comments: number;
  publishedAt: string;
  thumbnail?: string;
}

interface BlogStats {
  total: number;
  published: number;
  drafts: number;
  totalViews: number;
}

interface Props {
  posts?: BlogPost[];
  stats?: BlogStats;
  flash?: { type: 'success' | 'error' | 'warning' | 'info'; message: string };
}

const defaultPosts: BlogPost[] = [
  {
    id: '1', title: 'Jak optimalizovat výkon webových aplikací v roce 2026',
    slug: '/blog/optimalizace-vykonu-2026', excerpt: 'Přehled nejnovějších technik pro zrychlení webu včetně edge computing a streaming SSR.',
    status: 'published', author: 'Jan Novák', category: 'Technologie', readTime: '8 min',
    views: 1243, comments: 12, publishedAt: '26. 2. 2026',
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: '2', title: 'Úvod do AI-driven designu: Budoucnost UX',
    slug: '/blog/ai-driven-design', excerpt: 'Jak umělá inteligence mění přístup k návrhu uživatelských rozhraní a personalizaci.',
    status: 'published', author: 'Eva Svobodová', category: 'Design', readTime: '6 min',
    views: 892, comments: 8, publishedAt: '24. 2. 2026',
    thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: '3', title: 'Bezpečnostní trendy pro webové aplikace',
    slug: '/blog/bezpecnostni-trendy', excerpt: 'Zero-trust architektura, passkeys a další bezpečnostní novinky, které byste měli znát.',
    status: 'draft', author: 'Jan Novák', category: 'Bezpečnost', readTime: '10 min',
    views: 0, comments: 0, publishedAt: '',
    thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: '4', title: 'Nové funkce TypeScriptu 6.0',
    slug: '/blog/typescript-6', excerpt: 'Kompletní přehled novinek v TypeScriptu 6.0 — pattern matching, pipe operátor a další.',
    status: 'scheduled', author: 'Petr Černý', category: 'Technologie', readTime: '12 min',
    views: 0, comments: 0, publishedAt: '1. 3. 2026',
    thumbnail: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  {
    id: '5', title: 'Jak jsme přešli na microservices',
    slug: '/blog/prechod-na-microservices', excerpt: 'Případová studie naší migrace z monolitu na microservices architekturu.',
    status: 'published', author: 'Eva Svobodová', category: 'Architektura', readTime: '15 min',
    views: 2105, comments: 23, publishedAt: '20. 2. 2026',
    thumbnail: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    id: '6', title: 'Průvodce moderním CSS — Container Queries a Scope',
    slug: '/blog/moderni-css', excerpt: 'Praktické ukázky nových CSS funkcí, které zjednodušují responzivní design.',
    status: 'published', author: 'Jan Novák', category: 'Frontend', readTime: '7 min',
    views: 567, comments: 5, publishedAt: '18. 2. 2026',
    thumbnail: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  },
  {
    id: '7', title: 'Edge computing: Kdy a proč ho použít',
    slug: '/blog/edge-computing', excerpt: 'Porovnání edge computing platforem a praktické rady pro nasazení.',
    status: 'draft', author: 'Petr Černý', category: 'Infrastruktura', readTime: '9 min',
    views: 0, comments: 0, publishedAt: '',
  },
];

export function AdminBlogPage({ posts, stats, flash }: Props) {
  const { theme } = useTheme();
  const t = useT('blog');

  const statusConfig = {
    published: { label: t.statuses.published, color: '#06d6a0', bg: 'rgba(6,214,160,0.12)' },
    draft: { label: t.statuses.draft, color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
    scheduled: { label: t.statuses.scheduled, color: '#7c5cfc', bg: 'rgba(124,92,252,0.12)' },
  };
  const allPosts = posts ?? defaultPosts;
  const s = stats ?? {
    total: allPosts.length,
    published: allPosts.filter(p => p.status === 'published').length,
    drafts: allPosts.filter(p => p.status === 'draft').length,
    totalViews: allPosts.reduce((acc, p) => acc + p.views, 0),
  };

  const [search, setSearch] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuPostId, setMenuPostId] = useState<string | null>(null);
  const [menuPostSlug, setMenuPostSlug] = useState<string | null>(null);

  const tabStatuses = ['all', 'published', 'draft', 'scheduled'];
  const currentStatus = tabStatuses[tabValue];

  const filtered = allPosts.filter((p) => {
    const matchSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = currentStatus === 'all' || p.status === currentStatus;
    return matchSearch && matchStatus;
  });

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  const formatViews = (n: number) => n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);

  return (
    <AdminLayout activePath="/admin/blog" flash={flash}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {t.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t.subtitle}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/admin/blog/create"
          sx={{
            background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
            boxShadow: '0 4px 15px rgba(124,92,252,0.3)',
            borderRadius: 2.5, px: 3, whiteSpace: 'nowrap',
            '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(124,92,252,0.4)' },
          }}
        >
          {t.addNew}
        </Button>
      </Stack>

      {/* Stats row */}
      <Stack direction="row" spacing={{ xs: 1, sm: 2 }} sx={{ mb: 3, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
        {[
          { label: t.stats.total, value: String(s.total), color: 'text.primary' },
          { label: t.stats.published, value: String(s.published), color: '#06d6a0' },
          { label: t.stats.drafts, value: String(s.drafts), color: '#fb923c' },
          { label: t.stats.views, value: formatViews(s.totalViews), color: '#7c5cfc' },
        ].map((stat) => (
          <Paper
            key={stat.label}
            elevation={0}
            sx={{
              px: { xs: 1.5, sm: 3 }, py: { xs: 1.5, sm: 2 }, borderRadius: 3, border: 1, borderColor: 'divider',
              bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
              minWidth: 0, flex: { xs: '1 1 0', sm: '0 0 auto' }, textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, color: stat.color, fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>{stat.value}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{stat.label}</Typography>
          </Paper>
        ))}
      </Stack>

      {/* Tabs + search */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 40,
            maxWidth: '100%',
            '& .MuiTab-root': {
              minHeight: 40, textTransform: 'none', fontWeight: 600, fontSize: { xs: '0.78rem', sm: '0.85rem' },
              minWidth: 'auto', px: { xs: 1, sm: 2 }, py: 0.5,
            },
            '& .MuiTabs-indicator': {
              background: 'linear-gradient(90deg, #7c5cfc, #06d6a0)', borderRadius: 2, height: 3,
            },
            '& .MuiTabs-scrollButtons': { width: 28 },
          }}
        >
          <Tab label={t.tabs.all(allPosts.length)} />
          <Tab label={t.tabs.published(allPosts.filter(p => p.status === 'published').length)} />
          <Tab label={t.tabs.drafts(allPosts.filter(p => p.status === 'draft').length)} />
          <Tab label={t.tabs.scheduled(allPosts.filter(p => p.status === 'scheduled').length)} />
        </Tabs>
        <Box sx={{ flexGrow: 1 }} />
        <TextField
          placeholder={t.search}
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ maxWidth: { sm: 280 }, ...inputSx }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      {/* Posts list */}
      {filtered.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6, textAlign: 'center', borderRadius: 4, border: 1, borderColor: 'divider',
            bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
          }}
        >
          <Typography sx={{ color: 'text.secondary' }}>{t.empty}</Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {filtered.map((post) => {
            const status = statusConfig[post.status];
            return (
              <Paper
                key={post.id}
                elevation={0}
                sx={{
                  borderRadius: 3, border: 1, borderColor: 'divider',
                  bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
                  overflow: 'hidden',
                  transition: 'all 0.15s',
                  '&:hover': {
                    borderColor: theme === 'dark' ? 'rgba(124,92,252,0.3)' : 'rgba(124,92,252,0.2)',
                  },
                }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }}>
                  {/* Thumbnail */}
                  {post.thumbnail && (
                    <Box
                      sx={{
                        width: { xs: '100%', sm: 180 },
                        height: { xs: 120, sm: 'auto' },
                        minHeight: { sm: 140 },
                        flexShrink: 0,
                        background: post.thumbnail,
                      }}
                    />
                  )}

                  {/* Content */}
                  <Box sx={{ p: 2.5, flexGrow: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.75 }}>
                      <Chip
                        label={status.label}
                        size="small"
                        sx={{
                          height: 22, fontSize: '0.7rem', fontWeight: 600,
                          bgcolor: status.bg, color: status.color,
                        }}
                      />
                      <Chip
                        label={post.category}
                        size="small"
                        variant="outlined"
                        sx={{
                          height: 22, fontSize: '0.7rem', fontWeight: 500,
                          borderColor: 'divider', color: 'text.secondary',
                        }}
                      />
                    </Stack>

                    <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', mb: 0.5, lineHeight: 1.3 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, fontSize: '0.85rem', lineHeight: 1.5 }}>
                      {post.excerpt}
                    </Typography>

                    <Stack direction="row" spacing={2.5} alignItems="center" flexWrap="wrap" useFlexGap>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <PersonOutlineIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.author}</Typography>
                      </Stack>
                      {post.publishedAt && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <ScheduleIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.publishedAt}</Typography>
                        </Stack>
                      )}
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {post.readTime} {t.readTime}
                      </Typography>
                      {post.status === 'published' && (
                        <>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <TrendingUpIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{formatViews(post.views)} {t.viewsLabel}</Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <ChatBubbleOutlineIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.comments}</Typography>
                          </Stack>
                        </>
                      )}
                    </Stack>
                  </Box>

                  {/* Actions */}
                  <Stack
                    direction={{ xs: 'row', sm: 'column' }}
                    spacing={0.5}
                    sx={{
                      p: 1.5,
                      justifyContent: { xs: 'flex-end', sm: 'flex-start' },
                      borderTop: { xs: 1, sm: 0 },
                      borderLeft: { xs: 0, sm: 1 },
                      borderColor: 'divider',
                    }}
                  >
                    <IconButton size="small" component="a" href={`/admin/blog/edit/${post.id}`} sx={{ color: 'text.secondary' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={(e) => { setMenuAnchor(e.currentTarget); setMenuPostId(post.id); setMenuPostSlug(post.slug); }}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      )}

      {/* Context menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        PaperProps={{
          sx: {
            borderRadius: 3, border: 1, borderColor: 'divider', minWidth: 180,
            boxShadow: theme === 'dark' ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuItem component="a" href={`/admin/blog/edit/${menuPostId}`} sx={{ py: 1 }}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.edit}</ListItemText>
        </MenuItem>
        <MenuItem component="a" href={`/article/${menuPostSlug}`} target="_blank" sx={{ py: 1 }}>
          <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.view}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { setMenuAnchor(null); const f = document.createElement('form'); f.method = 'POST'; f.action = `/admin/blog/duplicate/${menuPostId}`; document.body.appendChild(f); f.submit(); }} sx={{ py: 1 }}>
          <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.duplicate}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { if (window.confirm(t.confirmDelete)) { setMenuAnchor(null); const f = document.createElement('form'); f.method = 'POST'; f.action = `/admin/blog/delete/${menuPostId}`; document.body.appendChild(f); f.submit(); } else { setMenuAnchor(null); } }} sx={{ py: 1, color: 'error.main' }}>
          <ListItemIcon><DeleteOutlineIcon fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.delete}</ListItemText>
        </MenuItem>
      </Menu>
    </AdminLayout>
  );
}
