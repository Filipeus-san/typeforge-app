import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AdminLayout } from '../../components/AdminLayout';
import { FlashMessage } from '../../components/FlashMessage';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface Props {
  isEdit?: boolean;
  values?: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    status?: string;
  };
  error?: string;
  success?: string;
}

function FormSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
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

export function AdminUserFormPage({ isEdit, values, error, success }: Props) {
  const { theme } = useTheme();
  const t = useT();
  const v = values ?? {};

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  const actionUrl = isEdit ? `/admin/users/edit/${v.id ?? ''}` : '/admin/users/create';

  return (
    <AdminLayout activePath="/admin/users">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Button
            href="/admin/users"
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'text.secondary', mb: 1, pl: 0, textTransform: 'none', fontWeight: 500 }}
          >
            {t.userForm.backToUsers}
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {isEdit ? t.userForm.titleEdit : t.userForm.titleNew}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {isEdit ? t.userForm.subtitleEdit : t.userForm.subtitleNew}
          </Typography>
        </Box>
      </Stack>

      {error && <FlashMessage type="error" message={error} />}
      {success && <FlashMessage type="success" message={success} />}

      <Box component="form" method="post" action={actionUrl}>
        <FormSection title={t.userForm.sectionPersonal} description={t.userForm.sectionPersonalDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.userForm.fields.name}
                name="name"
                defaultValue={v.name ?? ''}
                required
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.userForm.fields.email}
                name="email"
                type="email"
                defaultValue={v.email ?? ''}
                required
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </FormSection>

        <FormSection title={t.userForm.sectionPassword} description={isEdit ? t.userForm.sectionPasswordDescEdit : t.userForm.sectionPasswordDescNew}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.userForm.passwordFields.password}
                name="password"
                type="password"
                required={!isEdit}
                placeholder={isEdit ? '••••••••' : ''}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.userForm.passwordFields.confirm}
                name="passwordConfirm"
                type="password"
                required={!isEdit}
                placeholder={isEdit ? '••••••••' : ''}
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </FormSection>

        <FormSection title={t.userForm.sectionPermissions} description={t.userForm.sectionPermissionsDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t.userForm.roleField}</InputLabel>
                <Select
                  label={t.userForm.roleField}
                  name="role"
                  defaultValue={v.role ?? 'user'}
                >
                  <MenuItem value="admin">{t.userForm.roleOptions.admin}</MenuItem>
                  <MenuItem value="editor">{t.userForm.roleOptions.editor}</MenuItem>
                  <MenuItem value="user">{t.userForm.roleOptions.user}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t.userForm.statusField}</InputLabel>
                <Select
                  label={t.userForm.statusField}
                  name="status"
                  defaultValue={v.status ?? 'active'}
                >
                  <MenuItem value="active">{t.userForm.statusOptions.active}</MenuItem>
                  <MenuItem value="inactive">{t.userForm.statusOptions.inactive}</MenuItem>
                  <MenuItem value="banned">{t.userForm.statusOptions.banned}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </FormSection>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            href="/admin/users"
            variant="outlined"
            sx={{ borderRadius: 2.5, px: 3, borderColor: 'divider', color: 'text.secondary', textTransform: 'none' }}
          >
            {t.userForm.actions.cancel}
          </Button>
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
            {isEdit ? t.userForm.actions.saveEdit : t.userForm.actions.saveNew}
          </Button>
        </Stack>
      </Box>
    </AdminLayout>
  );
}
