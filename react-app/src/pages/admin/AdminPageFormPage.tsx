import React, { useState } from 'react';
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
import { CraftEditor } from '../../components/editor';
import { useT } from '../../i18n';

interface Props {
  isEdit?: boolean;
  values?: {
    id?: string;
    title?: string;
    slug?: string;
    content?: string;
    status?: string;
    metaTitle?: string;
    metaDescription?: string;
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
      <Box sx={{ p: { xs: 2, sm: 3 }, pb: { xs: 1.5, sm: 2 } }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.25 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        {children}
      </Box>
    </Paper>
  );
}

export function AdminPageFormPage({ isEdit, values, error, success }: Props) {
  const { theme } = useTheme();
  const t = useT('pageForm');
  const v = values ?? {};
  const [craftContent, setCraftContent] = useState(v.content ?? '');

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  const actionUrl = isEdit ? `/admin/pages/edit/${v.id ?? ''}` : '/admin/pages/create';

  return (
    <AdminLayout activePath="/admin/pages">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Button
            href="/admin/pages"
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'text.secondary', mb: 1, pl: 0, textTransform: 'none', fontWeight: 500 }}
          >
            {t.backToPages}
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {isEdit ? t.titleEdit : t.titleNew}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {isEdit ? t.subtitleEdit : t.subtitleNew}
          </Typography>
        </Box>
      </Stack>

      {error && <FlashMessage type="error" message={error} />}
      {success && <FlashMessage type="success" message={success} />}

      <Box component="form" method="post" action={actionUrl}>
        {/* Hidden field for Craft.js content JSON */}
        <input type="hidden" name="content" value={craftContent} />

        <FormSection title={t.sectionContent} description={t.sectionContentDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label={t.fields.title}
                name="title"
                defaultValue={v.title ?? ''}
                required
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label={t.fields.slug}
                name="slug"
                defaultValue={v.slug ?? ''}
                placeholder={t.fields.slugPlaceholder}
                helperText={t.fields.slugHelp}
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </FormSection>

        <FormSection title={t.sectionEditor} description={t.sectionEditorDesc}>
          <CraftEditor
            initialContent={v.content}
            onContentChange={setCraftContent}
          />
        </FormSection>

        <FormSection title={t.sectionSettings} description={t.sectionSettingsDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t.statusField}</InputLabel>
                <Select
                  label={t.statusField}
                  name="status"
                  defaultValue={v.status ?? 'draft'}
                >
                  <MenuItem value="draft">{t.statusOptions.draft}</MenuItem>
                  <MenuItem value="published">{t.statusOptions.published}</MenuItem>
                  <MenuItem value="archived">{t.statusOptions.archived}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </FormSection>

        <FormSection title={t.sectionSeo} description={t.sectionSeoDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t.seoFields.metaTitle}
                name="metaTitle"
                defaultValue={v.metaTitle ?? ''}
                helperText={t.seoFields.metaTitleHelp}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t.seoFields.metaDescription}
                name="metaDescription"
                defaultValue={v.metaDescription ?? ''}
                multiline
                rows={2}
                helperText={t.seoFields.metaDescriptionHelp}
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </FormSection>

        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2} justifyContent="flex-end">
          <Button
            href="/admin/pages"
            variant="outlined"
            sx={{ borderRadius: 2.5, px: 3, borderColor: 'divider', color: 'text.secondary', textTransform: 'none', width: { xs: '100%', sm: 'auto' } }}
          >
            {t.actions.cancel}
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
              width: { xs: '100%', sm: 'auto' },
              '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(124,92,252,0.4)' },
            }}
          >
            {isEdit ? t.actions.saveEdit : t.actions.saveNew}
          </Button>
        </Stack>
      </Box>
    </AdminLayout>
  );
}
