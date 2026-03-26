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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AdminLayout } from '../../components/AdminLayout';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  author: string;
  updated: string;
}

interface Props {
  pages?: PageItem[];
  flash?: { type: 'success' | 'error' | 'warning' | 'info'; message: string };
}

const defaultPages: PageItem[] = [
  { id: '1', title: 'Úvodní stránka', slug: '/', status: 'published', author: 'Admin', updated: '26. 2. 2026' },
  { id: '2', title: 'O nás', slug: '/o-nas', status: 'published', author: 'Admin', updated: '25. 2. 2026' },
  { id: '3', title: 'Služby', slug: '/sluzby', status: 'draft', author: 'Admin', updated: '24. 2. 2026' },
  { id: '4', title: 'Kontakt', slug: '/kontakt', status: 'published', author: 'Admin', updated: '23. 2. 2026' },
  { id: '5', title: 'Ceník', slug: '/cenik', status: 'published', author: 'Admin', updated: '22. 2. 2026' },
  { id: '6', title: 'Blog', slug: '/blog', status: 'published', author: 'Admin', updated: '21. 2. 2026' },
  { id: '7', title: 'Kariéra', slug: '/kariera', status: 'draft', author: 'Admin', updated: '20. 2. 2026' },
  { id: '8', title: 'Podmínky použití', slug: '/podminky', status: 'archived', author: 'Admin', updated: '18. 2. 2026' },
];

export function AdminPagesPage({ pages, flash }: Props) {
  const { theme } = useTheme();
  const t = useT('pages');

  const statusConfig = {
    published: { label: t.statuses.published, color: '#06d6a0', bg: 'rgba(6,214,160,0.12)' },
    draft: { label: t.statuses.draft, color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
    archived: { label: t.statuses.archived, color: '#9595ad', bg: 'rgba(149,149,173,0.12)' },
  };
  const allPages = pages ?? defaultPages;
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuPageId, setMenuPageId] = useState<string | null>(null);
  const [menuPageSlug, setMenuPageSlug] = useState<string | null>(null);

  const filtered = allPages.filter((p) => {
    const matchSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>, pageId: string, pageSlug: string) => {
    setMenuAnchor(e.currentTarget);
    setMenuPageId(pageId);
    setMenuPageSlug(pageSlug);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuPageId(null);
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  return (
    <AdminLayout activePath="/admin/pages" flash={flash}>
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
            {t.subtitle(allPages.length)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/admin/pages/create"
          sx={{
            background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
            boxShadow: '0 4px 15px rgba(124,92,252,0.3)',
            borderRadius: 2.5,
            px: 3,
            whiteSpace: 'nowrap',
            '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(124,92,252,0.4)' },
          }}
        >
          {t.addNew}
        </Button>
      </Stack>

      {/* Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder={t.search}
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: { sm: 320 }, ...inputSx }}
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
        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 0.5, flexShrink: 0, '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
          {[
            { key: 'all', label: t.filters.all },
            { key: 'published', label: t.filters.published },
            { key: 'draft', label: t.filters.drafts },
            { key: 'archived', label: t.filters.archived },
          ].map((f) => (
            <Chip
              key={f.key}
              label={f.label}
              onClick={() => setFilterStatus(f.key)}
              icon={f.key === filterStatus ? undefined : <FilterListIcon sx={{ fontSize: '14px !important' }} />}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '0.8rem',
                border: 1,
                borderColor: f.key === filterStatus ? 'primary.main' : 'divider',
                bgcolor: f.key === filterStatus ? 'rgba(124,92,252,0.12)' : 'transparent',
                color: f.key === filterStatus ? 'primary.light' : 'text.secondary',
                '& .MuiChip-icon': { color: 'text.secondary' },
                '&:hover': { borderColor: 'primary.main' },
              }}
            />
          ))}
        </Stack>
      </Stack>

      {/* Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: 1,
          borderColor: 'divider',
          bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
          overflowX: 'auto',
        }}
      >
        <Box
          component="table"
          sx={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <Box
            component="thead"
            sx={{
              '& th': {
                textAlign: 'left',
                px: { xs: 1.5, sm: 3 },
                py: 1.5,
                borderBottom: 1,
                borderColor: 'divider',
                color: 'text.secondary',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              },
            }}
          >
            <tr>
              <th>{t.columns.title}</th>
              <Box component="th" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{t.columns.url}</Box>
              <th>{t.columns.status}</th>
              <Box component="th" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{t.columns.updated}</Box>
              <th style={{ width: 50 }}></th>
            </tr>
          </Box>
          <Box
            component="tbody"
            sx={{
              '& td': {
                px: { xs: 1.5, sm: 3 },
                py: 2,
                borderBottom: 1,
                borderColor: 'divider',
                fontSize: '0.9rem',
              },
              '& tr:last-child td': { borderBottom: 0 },
              '& tr:hover': {
                bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
              },
            }}
          >
            {filtered.map((page) => {
              const status = statusConfig[page.status];
              return (
                <tr key={page.id}>
                  <td>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      {page.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: { xs: 'block', sm: 'none' } }}>
                      {page.slug} &middot; {page.updated}
                    </Typography>
                  </td>
                  <Box component="td" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      {page.slug}
                    </Typography>
                  </Box>
                  <td>
                    <Chip
                      label={status.label}
                      size="small"
                      sx={{
                        bgcolor: status.bg,
                        color: status.color,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: 24,
                      }}
                    />
                  </td>
                  <Box component="td" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {page.updated}
                    </Typography>
                  </Box>
                  <td>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, page.id, page.slug)}
                      sx={{ color: 'text.secondary' }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5}>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {t.empty}
                    </Typography>
                  </Box>
                </td>
              </tr>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Context menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            minWidth: 180,
            boxShadow: theme === 'dark'
              ? '0 8px 30px rgba(0,0,0,0.4)'
              : '0 8px 30px rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuItem component="a" href={`/admin/pages/edit/${menuPageId}`} sx={{ py: 1 }}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.edit}</ListItemText>
        </MenuItem>
        <MenuItem component="a" href={`/${menuPageSlug}`} target="_blank" sx={{ py: 1 }}>
          <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.view}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { setMenuAnchor(null); const f = document.createElement('form'); f.method = 'POST'; f.action = `/admin/pages/duplicate/${menuPageId}`; document.body.appendChild(f); f.submit(); }} sx={{ py: 1 }}>
          <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.duplicate}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { if (window.confirm(t.confirmDelete)) { setMenuAnchor(null); const f = document.createElement('form'); f.method = 'POST'; f.action = `/admin/pages/delete/${menuPageId}`; document.body.appendChild(f); f.submit(); } else { setMenuAnchor(null); } }} sx={{ py: 1, color: 'error.main' }}>
          <ListItemIcon><DeleteOutlineIcon fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.delete}</ListItemText>
        </MenuItem>
      </Menu>
    </AdminLayout>
  );
}
