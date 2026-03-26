import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ArticleIcon from '@mui/icons-material/Article';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import { AdminLayout } from '../../components/AdminLayout';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, changePositive, icon, color }: StatCardProps) {
  const { theme } = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: 1,
        borderColor: 'divider',
        bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5, fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            {value}
          </Typography>
          <Chip
            label={change}
            size="small"
            sx={{
              bgcolor: changePositive ? 'rgba(6,214,160,0.12)' : 'rgba(239,68,68,0.12)',
              color: changePositive ? '#06d6a0' : '#ef4444',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 24,
            }}
          />
        </Box>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: color,
            color: '#fff',
          }}
        >
          {icon}
        </Box>
      </Stack>
    </Paper>
  );
}

interface RecentPageItem {
  title: string;
  status: string;
  updated: string;
}

interface Props {
  stats?: {
    pages: number;
    views: number;
    growth: string;
    visitors: number;
  };
  recentPages?: RecentPageItem[];
}

const defaultStats = { pages: 12, views: 3420, growth: '+18%', visitors: 856 };
const defaultRecentPages: RecentPageItem[] = [
  { title: 'Úvodní stránka', status: 'published', updated: '26. 2. 2026' },
  { title: 'O nás', status: 'published', updated: '25. 2. 2026' },
  { title: 'Služby', status: 'draft', updated: '24. 2. 2026' },
  { title: 'Kontakt', status: 'published', updated: '23. 2. 2026' },
  { title: 'Blog — Novinky 2026', status: 'draft', updated: '22. 2. 2026' },
];

export function AdminDashboardPage({ stats, recentPages }: Props) {
  const { theme } = useTheme();
  const t = useT('dashboard');
  const s = stats ?? defaultStats;
  const pages = recentPages ?? defaultRecentPages;

  return (
    <AdminLayout activePath="/admin">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
          {t.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t.subtitle}
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title={t.stats.pages}
            value={String(s.pages)}
            change={t.stats.pagesChange}
            changePositive
            icon={<ArticleIcon />}
            color="rgba(124,92,252,0.85)"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title={t.stats.views}
            value={String(s.views)}
            change={t.stats.viewsChange}
            changePositive
            icon={<VisibilityIcon />}
            color="rgba(6,214,160,0.85)"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title={t.stats.growth}
            value={s.growth}
            change={t.stats.growthChange}
            changePositive
            icon={<TrendingUpIcon />}
            color="rgba(59,130,246,0.85)"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title={t.stats.visitors}
            value={String(s.visitors)}
            change={t.stats.visitorsChange}
            changePositive
            icon={<PeopleIcon />}
            color="rgba(251,146,60,0.85)"
          />
        </Grid>
      </Grid>

      {/* Recent pages */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: 1,
          borderColor: 'divider',
          bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 3 }, pb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {t.recentPages}
          </Typography>
        </Box>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <Box
            component="thead"
            sx={{
              '& th': {
                textAlign: 'left',
                px: { xs: 2, sm: 3 },
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
              <th>{t.columns.status}</th>
              <Box component="th" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{t.columns.updated}</Box>
            </tr>
          </Box>
          <Box
            component="tbody"
            sx={{
              '& td': {
                px: { xs: 2, sm: 3 },
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
            {pages.map((page) => (
              <tr key={page.title}>
                <td>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {page.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: { xs: 'block', sm: 'none' } }}>
                    {page.updated}
                  </Typography>
                </td>
                <td>
                  <Chip
                    label={page.status === 'published' ? t.status.published : t.status.draft}
                    size="small"
                    sx={{
                      bgcolor: page.status === 'published'
                        ? 'rgba(6,214,160,0.12)'
                        : 'rgba(251,146,60,0.12)',
                      color: page.status === 'published' ? '#06d6a0' : '#fb923c',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                </td>
                <Box component="td" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {page.updated}
                  </Typography>
                </Box>
              </tr>
            ))}
          </Box>
        </Box>
      </Paper>
    </AdminLayout>
  );
}
