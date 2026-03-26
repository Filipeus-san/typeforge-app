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
    blogTitle?: string;
    blogDescription?: string;
    postsPerPage?: string;
    excerptLength?: string;
    defaultAuthor?: string;
    dateFormat?: string;
    commentsEnabled?: boolean;
    commentModeration?: boolean;
    rssEnabled?: boolean;
    socialSharing?: boolean;
    relatedPosts?: boolean;
    readTime?: boolean;
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
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

export function AdminBlogSettingsPage({ values, success }: Props) {
  const { theme } = useTheme();
  const t = useT('blogSettings');
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
    <AdminLayout activePath="/admin/blog/settings">
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

      <Box component="form" method="post" action="/admin/blog/settings">
        {/* General */}
        <SettingsSection title={t.sectionGeneral} description={t.sectionGeneralDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.fields.blogTitle}
                name="blogTitle"
                defaultValue={v.blogTitle ?? 'Blog'}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.fields.defaultAuthor}
                name="defaultAuthor"
                defaultValue={v.defaultAuthor ?? 'Admin'}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t.fields.blogDescription}
                name="blogDescription"
                defaultValue={v.blogDescription ?? t.fields.blogDescriptionDefault}
                multiline
                rows={3}
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </SettingsSection>

        {/* Display */}
        <SettingsSection title={t.sectionDisplay} description={t.sectionDisplayDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.displayFields.postsPerPage}
                name="postsPerPage"
                type="number"
                defaultValue={v.postsPerPage ?? '12'}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.displayFields.excerptLength}
                name="excerptLength"
                type="number"
                defaultValue={v.excerptLength ?? '160'}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t.displayFields.dateFormat}</InputLabel>
                <Select
                  label={t.displayFields.dateFormat}
                  name="dateFormat"
                  defaultValue={v.dateFormat ?? 'dd.MM.yyyy'}
                >
                  <MenuItem value="dd.MM.yyyy">31.12.2026</MenuItem>
                  <MenuItem value="d. M. yyyy">31. 12. 2026</MenuItem>
                  <MenuItem value="yyyy-MM-dd">2026-12-31</MenuItem>
                  <MenuItem value="dd/MM/yyyy">31/12/2026</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </SettingsSection>

        {/* Features */}
        <SettingsSection title={t.sectionFeatures} description={t.sectionFeaturesDesc}>
          <Stack spacing={0.5}>
            <SettingsToggle
              label={t.features.comments}
              description={t.features.commentsDesc}
              name="commentsEnabled"
              defaultChecked={v.commentsEnabled ?? true}
            />
            <SettingsToggle
              label={t.features.moderation}
              description={t.features.moderationDesc}
              name="commentModeration"
              defaultChecked={v.commentModeration ?? true}
            />
            <SettingsToggle
              label={t.features.rss}
              description={t.features.rssDesc}
              name="rssEnabled"
              defaultChecked={v.rssEnabled ?? true}
            />
            <SettingsToggle
              label={t.features.social}
              description={t.features.socialDesc}
              name="socialSharing"
              defaultChecked={v.socialSharing ?? true}
            />
            <SettingsToggle
              label={t.features.related}
              description={t.features.relatedDesc}
              name="relatedPosts"
              defaultChecked={v.relatedPosts ?? true}
            />
            <SettingsToggle
              label={t.features.readTime}
              description={t.features.readTimeDesc}
              name="readTime"
              defaultChecked={v.readTime ?? true}
            />
          </Stack>
        </SettingsSection>

        {/* SEO */}
        <SettingsSection title={t.sectionSeo} description={t.sectionSeoDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t.seoFields.metaTitle}
                name="metaTitle"
                defaultValue={v.metaTitle ?? 'Blog — Lorem Inc.'}
                helperText={t.seoFields.metaTitleHelp}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t.seoFields.metaDescription}
                name="metaDescription"
                defaultValue={v.metaDescription ?? 'Čtěte nejnovější články o technologiích, designu a vývoji.'}
                multiline
                rows={2}
                helperText={t.seoFields.metaDescriptionHelp}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t.seoFields.ogImage}
                name="ogImage"
                defaultValue={v.ogImage ?? ''}
                placeholder="https://example.com/blog-og.jpg"
                helperText={t.seoFields.ogImageHelp}
                sx={inputSx}
              />
            </Grid>
          </Grid>
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
