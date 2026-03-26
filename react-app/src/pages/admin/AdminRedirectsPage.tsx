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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import CallMadeIcon from '@mui/icons-material/CallMade';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AdminLayout } from '../../components/AdminLayout';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface RedirectRule {
  id: string;
  sourcePath: string;
  targetUrl: string;
  type: 'redirect' | 'rewrite';
  statusCode: string;
  isActive: boolean;
  sortOrder: string;
  note: string;
  createdAt: string;
}

interface RedirectStats {
  total: number;
  active: number;
  inactive: number;
  redirects: number;
  rewrites: number;
}

interface Props {
  redirects?: RedirectRule[];
  stats?: RedirectStats;
  flash?: { type: 'success' | 'error' | 'warning' | 'info'; message: string };
}

const typeConfig = {
  redirect: { label: 'Redirect', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', icon: <CallMadeIcon sx={{ fontSize: 14 }} /> },
  rewrite: { label: 'Rewrite', color: '#a855f7', bg: 'rgba(168,85,247,0.12)', icon: <SyncAltIcon sx={{ fontSize: 14 }} /> },
};

export function AdminRedirectsPage({ redirects, stats, flash }: Props) {
  const { theme } = useTheme();
  const t = useT('redirects');
  const allRedirects = redirects ?? [];
  const s = stats ?? {
    total: allRedirects.length,
    active: allRedirects.filter(r => r.isActive).length,
    inactive: allRedirects.filter(r => !r.isActive).length,
    redirects: allRedirects.filter(r => r.type === 'redirect').length,
    rewrites: allRedirects.filter(r => r.type === 'rewrite').length,
  };

  const statusConfig = {
    true: { label: t.statuses.active, color: '#06d6a0', bg: 'rgba(6,214,160,0.12)' },
    false: { label: t.statuses.inactive, color: '#9595ad', bg: 'rgba(149,149,173,0.12)' },
  };

  const [search, setSearch] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [menuIsActive, setMenuIsActive] = useState<boolean>(false);

  const tabStatuses = ['all', 'active', 'inactive'];
  const currentStatus = tabStatuses[tabValue];

  const filtered = allRedirects.filter((r) => {
    const matchSearch = search === '' ||
      r.sourcePath.toLowerCase().includes(search.toLowerCase()) ||
      r.targetUrl.toLowerCase().includes(search.toLowerCase()) ||
      (r.note && r.note.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = currentStatus === 'all' ||
      (currentStatus === 'active' && r.isActive) ||
      (currentStatus === 'inactive' && !r.isActive);
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

  return (
    <AdminLayout activePath="/admin/redirects" flash={flash}>
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
          href="/admin/redirects/create"
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
          { label: t.stats.active, value: String(s.active), color: '#06d6a0' },
          { label: t.stats.inactive, value: String(s.inactive), color: '#9595ad' },
          { label: t.stats.redirect, value: String(s.redirects), color: '#3b82f6' },
          { label: t.stats.rewrite, value: String(s.rewrites), color: '#a855f7' },
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
          <Tab label={t.tabs.all(allRedirects.length)} />
          <Tab label={t.tabs.active(allRedirects.filter(r => r.isActive).length)} />
          <Tab label={t.tabs.inactive(allRedirects.filter(r => !r.isActive).length)} />
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

      {/* Table */}
      {filtered.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6, textAlign: 'center', borderRadius: 4, border: 1, borderColor: 'divider',
            bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
          }}
        >
          <Typography sx={{ color: 'text.secondary' }}>
            {allRedirects.length === 0 ? t.empty : t.emptySearch}
          </Typography>
        </Paper>
      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4, border: 1, borderColor: 'divider',
            bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
            overflowX: 'auto',
          }}
        >
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box
              component="thead"
              sx={{
                '& th': {
                  textAlign: 'left',
                  px: { xs: 1, sm: 3 },
                  py: 1.5,
                  borderBottom: 1,
                  borderColor: 'divider',
                  color: 'text.secondary',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                },
              }}
            >
              <tr>
                <th>{t.columns.source}</th>
                <Box component="th" sx={{ display: { xs: 'none', sm: 'table-cell' }, width: 30, textAlign: 'center' }}></Box>
                <th>{t.columns.target}</th>
                <Box component="th" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{t.columns.type}</Box>
                <Box component="th" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{t.columns.code}</Box>
                <th>{t.columns.status}</th>
                <Box component="th" sx={{ textAlign: 'right', width: { xs: 60, sm: 'auto' } }}>{t.columns.actions}</Box>
              </tr>
            </Box>
            <Box
              component="tbody"
              sx={{
                '& td': {
                  px: { xs: 1, sm: 3 },
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
              {filtered.map((rule) => {
                const typeInfo = typeConfig[rule.type] ?? typeConfig.redirect;
                const activeInfo = statusConfig[String(rule.isActive) as 'true' | 'false'];
                return (
                  <tr key={rule.id}>
                    <td>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', fontFamily: 'monospace', lineHeight: 1.3 }}>
                          {rule.sourcePath}
                        </Typography>
                        {rule.note && (
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                            {rule.note}
                          </Typography>
                        )}
                      </Box>
                    </td>
                    <Box component="td" sx={{ display: { xs: 'none', sm: 'table-cell' }, textAlign: 'center', color: 'text.disabled', px: '0 !important' }}>
                      <ArrowForwardIcon sx={{ fontSize: 16 }} />
                    </Box>
                    <td>
                      <Typography sx={{ fontSize: '0.9rem', fontFamily: 'monospace', color: 'text.secondary' }}>
                        {rule.targetUrl}
                      </Typography>
                    </td>
                    <Box component="td" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Chip
                        icon={typeInfo.icon}
                        label={typeInfo.label}
                        size="small"
                        sx={{
                          height: 24, fontSize: '0.73rem', fontWeight: 600,
                          bgcolor: typeInfo.bg, color: typeInfo.color,
                          '& .MuiChip-icon': { ml: 0.5, color: `${typeInfo.color} !important` },
                        }}
                      />
                    </Box>
                    <Box component="td" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {rule.type === 'redirect' && (
                        <Chip
                          label={rule.statusCode}
                          size="small"
                          sx={{
                            height: 22, fontSize: '0.7rem', fontWeight: 600,
                            bgcolor: rule.statusCode === '301' ? 'rgba(251,146,60,0.12)' : 'rgba(59,130,246,0.12)',
                            color: rule.statusCode === '301' ? '#fb923c' : '#3b82f6',
                          }}
                        />
                      )}
                    </Box>
                    <td>
                      <Chip
                        label={activeInfo.label}
                        size="small"
                        sx={{
                          height: 22, fontSize: '0.7rem', fontWeight: 600,
                          bgcolor: activeInfo.bg, color: activeInfo.color,
                        }}
                      />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Stack direction="row" spacing={0.25} justifyContent="flex-end">
                        <Tooltip title={t.actions.edit}>
                          <IconButton size="small" component="a" href={`/admin/redirects/edit/${rule.id}`} sx={{ color: 'text.secondary' }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          size="small"
                          sx={{ color: 'text.secondary' }}
                          onClick={(e) => { setMenuAnchor(e.currentTarget); setMenuId(rule.id); setMenuIsActive(rule.isActive); }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </td>
                  </tr>
                );
              })}
            </Box>
          </Box>
        </Paper>
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
        <MenuItem component="a" href={`/admin/redirects/edit/${menuId}`} sx={{ py: 1 }}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.edit}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { setMenuAnchor(null); const f = document.createElement('form'); f.method = 'POST'; f.action = `/admin/redirects/toggle/${menuId}`; document.body.appendChild(f); f.submit(); }} sx={{ py: 1 }}>
          <ListItemIcon>{menuIsActive ? <ToggleOffIcon fontSize="small" /> : <ToggleOnIcon fontSize="small" />}</ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{menuIsActive ? t.actions.deactivate : t.actions.activate}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { if (window.confirm(t.confirmDelete)) { setMenuAnchor(null); const f = document.createElement('form'); f.method = 'POST'; f.action = `/admin/redirects/delete/${menuId}`; document.body.appendChild(f); f.submit(); } else { setMenuAnchor(null); } }} sx={{ py: 1, color: 'error.main' }}>
          <ListItemIcon><DeleteOutlineIcon fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.delete}</ListItemText>
        </MenuItem>
      </Menu>
    </AdminLayout>
  );
}
