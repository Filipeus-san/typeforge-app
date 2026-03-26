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

interface CategoryOption {
  value: string;
  label: string;
}

interface Props {
  isEdit?: boolean;
  categories?: CategoryOption[];
  values?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    status?: string;
    categoryId?: string;
    readTime?: string;
    publishedAt?: string;
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

const defaultCategories: CategoryOption[] = [
  { value: '1', label: 'Technologie' },
  { value: '2', label: 'Design' },
  { value: '3', label: 'Vývoj' },
  { value: '4', label: 'Marketing' },
];

export function AdminBlogFormPage({ isEdit, categories, values, error, success }: Props) {
  const { theme } = useTheme();
  const t = useT();
  const v = values ?? {};
  const cats = categories ?? defaultCategories;

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  const actionUrl = isEdit ? `/admin/blog/edit/${v.id ?? ''}` : '/admin/blog/create';

  return (
    <AdminLayout activePath="/admin/blog">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Button
            href="/admin/blog"
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'text.secondary', mb: 1, pl: 0, textTransform: 'none', fontWeight: 500 }}
          >
            {t.blogForm.backToArticles}
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {isEdit ? t.blogForm.titleEdit : t.blogForm.titleNew}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {isEdit ? t.blogForm.subtitleEdit : t.blogForm.subtitleNew}
          </Typography>
        </Box>
      </Stack>

      {error && <FlashMessage type="error" message={error} />}
      {success && <FlashMessage type="success" message={success} />}

      <Box component="form" method="post" action={actionUrl}>
        <FormSection title={t.blogForm.sectionContent} description={t.blogForm.sectionContentDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label={t.blogForm.fields.title}
                name="title"
                defaultValue={v.title ?? ''}
                required
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label={t.blogForm.fields.slug}
                name="slug"
                defaultValue={v.slug ?? ''}
                placeholder="nazev-clanku"
                helperText={t.blogForm.fields.slugHelp}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t.blogForm.fields.excerpt}
                name="excerpt"
                defaultValue={v.excerpt ?? ''}
                multiline
                rows={3}
                helperText={t.blogForm.fields.excerptHelp}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t.blogForm.fields.content}
                name="content"
                defaultValue={v.content ?? ''}
                multiline
                rows={16}
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </FormSection>

        <FormSection title={t.blogForm.sectionSettings} description={t.blogForm.sectionSettingsDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t.blogForm.settingsFields.status}</InputLabel>
                <Select
                  label={t.blogForm.settingsFields.status}
                  name="status"
                  defaultValue={v.status ?? 'draft'}
                >
                  <MenuItem value="draft">{t.blogForm.settingsFields.statusDraft}</MenuItem>
                  <MenuItem value="published">{t.blogForm.settingsFields.statusPublished}</MenuItem>
                  <MenuItem value="scheduled">{t.blogForm.settingsFields.statusScheduled}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t.blogForm.settingsFields.category}</InputLabel>
                <Select
                  label={t.blogForm.settingsFields.category}
                  name="categoryId"
                  defaultValue={v.categoryId ?? ''}
                >
                  <MenuItem value="">{t.blogForm.settingsFields.categoryNone}</MenuItem>
                  {cats.map((c) => (
                    <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label={t.blogForm.settingsFields.readTime}
                name="readTime"
                type="number"
                defaultValue={v.readTime ?? '5'}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label={t.blogForm.settingsFields.publishDate}
                name="publishedAt"
                type="datetime-local"
                defaultValue={v.publishedAt ?? ''}
                helperText={t.blogForm.settingsFields.publishDateHelp}
                sx={inputSx}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>
        </FormSection>

        <FormSection title={t.blogForm.sectionSeo} description={t.blogForm.sectionSeoDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t.blogForm.seoFields.metaTitle}
                name="metaTitle"
                defaultValue={v.metaTitle ?? ''}
                helperText={t.blogForm.seoFields.metaTitleHelp}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t.blogForm.seoFields.metaDescription}
                name="metaDescription"
                defaultValue={v.metaDescription ?? ''}
                multiline
                rows={2}
                helperText={t.blogForm.seoFields.metaDescriptionHelp}
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </FormSection>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            href="/admin/blog"
            variant="outlined"
            sx={{ borderRadius: 2.5, px: 3, borderColor: 'divider', color: 'text.secondary', textTransform: 'none' }}
          >
            {t.blogForm.actions.cancel}
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
            {isEdit ? t.blogForm.actions.saveEdit : t.blogForm.actions.saveNew}
          </Button>
        </Stack>
      </Box>
    </AdminLayout>
  );
}
