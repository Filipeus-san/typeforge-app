import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import SaveIcon from '@mui/icons-material/Save';
import { AdminLayout } from '../../components/AdminLayout';
import { FlashMessage } from '../../components/FlashMessage';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface Props {
  values?: {
    siteName?: string;
    siteDescription?: string;
    siteUrl?: string;
    contactEmail?: string;
    language?: string;
    postsPerPage?: string;
    homepageId?: string;
    maintenanceMode?: boolean;
    registrationEnabled?: boolean;
    analyticsEnabled?: boolean;
  };
  pages?: Array<{ id: string; title: string }>;
  success?: string;
}

function SettingsSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: 1,
        borderColor: 'divider',
        bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
        mb: 3,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.25 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    </Paper>
  );
}

function SettingsToggle({ label, description, name, defaultChecked }: { label: string; description: string; name: string; defaultChecked?: boolean }) {
  const { theme } = useTheme();
  const [checked, setChecked] = React.useState(defaultChecked ?? false);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        py: 1.5,
        px: 2,
        borderRadius: 2.5,
        '&:hover': {
          bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        },
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{label}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
          {description}
        </Typography>
      </Box>
      <input type="hidden" name={name} value={checked ? 'on' : ''} />
      <Switch
        checked={checked}
        onChange={(_, v) => setChecked(v)}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': { color: '#06d6a0' },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#06d6a0' },
        }}
      />
    </Stack>
  );
}

export function AdminSettingsPage({ values, pages, success }: Props) {
  const { theme } = useTheme();
  const t = useT('settings');
  const v = values ?? {};

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  return (
    <AdminLayout activePath="/admin/settings">
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
      </Stack>

      {success && <FlashMessage type="success" message={success} />}

      <Box component="form" method="post" action="/admin/settings">
        {/* General */}
        <SettingsSection title={t.sectionGeneral} description={t.sectionGeneralDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.fields.siteName}
                name="siteName"
                defaultValue={v.siteName ?? 'Lorem Inc.'}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.fields.siteUrl}
                name="siteUrl"
                defaultValue={v.siteUrl ?? 'https://lorem.example.com'}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t.fields.siteDescription}
                name="siteDescription"
                defaultValue={v.siteDescription ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                multiline
                rows={3}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.fields.contactEmail}
                name="contactEmail"
                type="email"
                defaultValue={v.contactEmail ?? 'admin@lorem.example.com'}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t.fields.language}</InputLabel>
                <Select
                  label={t.fields.language}
                  name="language"
                  defaultValue={v.language ?? 'en'}
                >
                  <MenuItem value="cs">Čeština</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t.fields.homepage}</InputLabel>
                <Select
                  label={t.fields.homepage}
                  name="homepageId"
                  defaultValue={v.homepageId ?? ''}
                >
                  <MenuItem value="">{t.fields.homepageNone}</MenuItem>
                  {(pages ?? []).map((p) => (
                    <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </SettingsSection>

        {/* Content */}
        <SettingsSection title={t.sectionContent} description={t.sectionContentDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.contentFields.postsPerPage}
                name="postsPerPage"
                type="number"
                defaultValue={v.postsPerPage ?? '10'}
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </SettingsSection>

        {/* Toggles */}
        <SettingsSection title={t.sectionSystem} description={t.sectionSystemDesc}>
          <Stack spacing={0.5}>
            <SettingsToggle
              label={t.systemToggles.maintenance}
              description={t.systemToggles.maintenanceDesc}
              name="maintenanceMode"
              defaultChecked={v.maintenanceMode ?? false}
            />
            <SettingsToggle
              label={t.systemToggles.registration}
              description={t.systemToggles.registrationDesc}
              name="registrationEnabled"
              defaultChecked={v.registrationEnabled ?? true}
            />
            <SettingsToggle
              label={t.systemToggles.analytics}
              description={t.systemToggles.analyticsDesc}
              name="analyticsEnabled"
              defaultChecked={v.analyticsEnabled ?? true}
            />
          </Stack>
        </SettingsSection>

        {/* Save */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
              boxShadow: '0 4px 15px rgba(124,92,252,0.3)',
              borderRadius: 2.5,
              px: 4,
              py: 1.25,
              '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(124,92,252,0.4)' },
            }}
          >
            {t.save}
          </Button>
        </Box>
      </Box>
    </AdminLayout>
  );
}
