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
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BlockIcon from '@mui/icons-material/Block';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { AdminLayout } from '../../components/AdminLayout';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  status: 'active' | 'inactive' | 'banned';
  registeredAt: string;
  lastLogin: string;
  avatar?: string;
  ordersCount: number;
}

interface UserStats {
  total: number;
  active: number;
  inactive: number;
  admins: number;
}

interface Props {
  users?: User[];
  stats?: UserStats;
  flash?: { type: 'success' | 'error' | 'warning' | 'info'; message: string };
}

const defaultUsers: User[] = [
  {
    id: '1', name: 'Jan Novák', email: 'jan.novak@example.com',
    role: 'admin', status: 'active', registeredAt: '15. 1. 2025',
    lastLogin: '27. 2. 2026', ordersCount: 0,
  },
  {
    id: '2', name: 'Eva Svobodová', email: 'eva.svobodova@example.com',
    role: 'editor', status: 'active', registeredAt: '3. 3. 2025',
    lastLogin: '26. 2. 2026', ordersCount: 5,
  },
  {
    id: '3', name: 'Petr Černý', email: 'petr.cerny@example.com',
    role: 'user', status: 'active', registeredAt: '12. 6. 2025',
    lastLogin: '25. 2. 2026', ordersCount: 12,
  },
  {
    id: '4', name: 'Marie Dvořáková', email: 'marie.dvorakova@example.com',
    role: 'user', status: 'active', registeredAt: '28. 8. 2025',
    lastLogin: '24. 2. 2026', ordersCount: 3,
  },
  {
    id: '5', name: 'Tomáš Procházka', email: 'tomas.prochazka@example.com',
    role: 'user', status: 'inactive', registeredAt: '5. 10. 2025',
    lastLogin: '10. 12. 2025', ordersCount: 1,
  },
  {
    id: '6', name: 'Kateřina Veselá', email: 'katerina.vesela@example.com',
    role: 'editor', status: 'active', registeredAt: '14. 11. 2025',
    lastLogin: '27. 2. 2026', ordersCount: 0,
  },
  {
    id: '7', name: 'Lukáš Horák', email: 'lukas.horak@example.com',
    role: 'user', status: 'banned', registeredAt: '2. 1. 2026',
    lastLogin: '15. 1. 2026', ordersCount: 0,
  },
  {
    id: '8', name: 'Anna Králová', email: 'anna.kralova@example.com',
    role: 'user', status: 'active', registeredAt: '20. 1. 2026',
    lastLogin: '26. 2. 2026', ordersCount: 8,
  },
];


function getInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

const avatarColors = [
  'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  'linear-gradient(135deg, #fd868c 0%, #fe546b 100%)',
];

export function AdminUsersPage({ users, stats, flash }: Props) {
  const { theme } = useTheme();
  const t = useT('users');
  const allUsers = users ?? defaultUsers;
  const s = stats ?? {
    total: allUsers.length,
    active: allUsers.filter(u => u.status === 'active').length,
    inactive: allUsers.filter(u => u.status === 'inactive').length,
    admins: allUsers.filter(u => u.role === 'admin').length,
  };

  const [search, setSearch] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuUserId, setMenuUserId] = useState<string | null>(null);
  const [menuUserEmail, setMenuUserEmail] = useState<string | null>(null);
  const [menuUserStatus, setMenuUserStatus] = useState<string | null>(null);

  const statusConfig = {
    active: { label: t.statuses.active, color: '#06d6a0', bg: 'rgba(6,214,160,0.12)' },
    inactive: { label: t.statuses.inactive, color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
    banned: { label: t.statuses.banned, color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  };

  const roleConfig = {
    admin: { label: t.roles.admin, color: '#7c5cfc', bg: 'rgba(124,92,252,0.12)' },
    editor: { label: t.roles.editor, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
    user: { label: t.roles.user, color: '#9595ad', bg: 'rgba(149,149,173,0.12)' },
  };

  const tabStatuses = ['all', 'active', 'inactive', 'banned'];
  const currentStatus = tabStatuses[tabValue];

  const filtered = allUsers.filter((u) => {
    const matchSearch = search === '' ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = currentStatus === 'all' || u.status === currentStatus;
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
    <AdminLayout activePath="/admin/users" flash={flash}>
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
          href="/admin/users/create"
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
          { label: t.stats.inactive, value: String(s.inactive), color: '#fb923c' },
          { label: t.stats.admins, value: String(s.admins), color: '#7c5cfc' },
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
          <Tab label={t.tabs.all(allUsers.length)} />
          <Tab label={t.tabs.active(allUsers.filter(u => u.status === 'active').length)} />
          <Tab label={t.tabs.inactive(allUsers.filter(u => u.status === 'inactive').length)} />
          <Tab label={t.tabs.banned(allUsers.filter(u => u.status === 'banned').length)} />
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

      {/* Users list */}
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
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4, border: 1, borderColor: 'divider',
            bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
            overflowX: 'auto',
          }}
        >
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', tableLayout: { xs: 'fixed', sm: 'auto' } }}>
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
                },
              }}
            >
              <tr>
                <th>{t.columns.user}</th>
                <Box component="th" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{t.columns.role}</Box>
                <th>{t.columns.status}</th>
                <Box component="th" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{t.columns.registered}</Box>
                <Box component="th" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{t.columns.lastLogin}</Box>
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
              {filtered.map((user, idx) => {
                const status = statusConfig[user.status];
                const role = roleConfig[user.role];
                return (
                  <tr key={user.id}>
                    <td>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            background: avatarColors[idx % avatarColors.length],
                            fontSize: '0.8rem',
                            fontWeight: 700,
                          }}
                        >
                          {getInitials(user.name)}
                        </Avatar>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.3 }}>
                            {user.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.78rem' }}>
                            {user.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </td>
                    <Box component="td" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <Chip
                        icon={user.role === 'admin' ? <AdminPanelSettingsIcon sx={{ fontSize: '14px !important', color: `${role.color} !important` }} /> : undefined}
                        label={role.label}
                        size="small"
                        sx={{
                          height: 24, fontSize: '0.73rem', fontWeight: 600,
                          bgcolor: role.bg, color: role.color,
                          '& .MuiChip-icon': { ml: 0.5 },
                        }}
                      />
                    </Box>
                    <td>
                      <Chip
                        label={status.label}
                        size="small"
                        sx={{
                          height: 22, fontSize: '0.7rem', fontWeight: 600,
                          bgcolor: status.bg, color: status.color,
                        }}
                      />
                    </td>
                    <Box component="td" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <ScheduleIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {user.registeredAt}
                        </Typography>
                      </Stack>
                    </Box>
                    <Box component="td" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {user.lastLogin}
                      </Typography>
                    </Box>
                    <td style={{ textAlign: 'right' }}>
                      <Stack direction="row" spacing={0.25} justifyContent="flex-end">
                        <Tooltip title={t.actions.edit}>
                          <IconButton size="small" component="a" href={`/admin/users/edit/${user.id}`} sx={{ color: 'text.secondary' }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          size="small"
                          sx={{ color: 'text.secondary' }}
                          onClick={(e) => { setMenuAnchor(e.currentTarget); setMenuUserId(user.id); setMenuUserEmail(user.email); setMenuUserStatus(user.status); }}
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
        <MenuItem component="a" href={`/admin/users/edit/${menuUserId}`} sx={{ py: 1 }}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.edit}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { if (window.confirm(t.confirmResetEmail)) { setMenuAnchor(null); const f = document.createElement('form'); f.method = 'POST'; f.action = `/admin/users/reset-password/${menuUserId}`; document.body.appendChild(f); f.submit(); } else { setMenuAnchor(null); } }} sx={{ py: 1 }}>
          <ListItemIcon><MailOutlineIcon fontSize="small" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.sendResetEmail}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { if (window.confirm(menuUserStatus === 'banned' ? t.confirmUnblock : t.confirmBlock)) { setMenuAnchor(null); const f = document.createElement('form'); f.method = 'POST'; f.action = `/admin/users/block/${menuUserId}`; document.body.appendChild(f); f.submit(); } else { setMenuAnchor(null); } }} sx={{ py: 1 }}>
          <ListItemIcon><BlockIcon fontSize="small" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{menuUserStatus === 'banned' ? t.actions.unblock : t.actions.block}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { if (window.confirm(t.confirmDelete)) { setMenuAnchor(null); const f = document.createElement('form'); f.method = 'POST'; f.action = `/admin/users/delete/${menuUserId}`; document.body.appendChild(f); f.submit(); } else { setMenuAnchor(null); } }} sx={{ py: 1, color: 'error.main' }}>
          <ListItemIcon><DeleteOutlineIcon fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>{t.actions.delete}</ListItemText>
        </MenuItem>
      </Menu>
    </AdminLayout>
  );
}
