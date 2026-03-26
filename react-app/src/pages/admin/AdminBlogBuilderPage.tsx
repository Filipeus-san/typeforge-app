import React, { useRef, useState } from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
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
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useT } from '../../i18n';
import { AdminLayout } from '../../components/AdminLayout';
import { FlashMessage } from '../../components/FlashMessage';
import { useTheme } from '../../context/ThemeContext';
import { MediaProvider, MediaImage } from '../../context/MediaContext';

import { craftResolver, CraftContainer, CraftText, CraftHeading } from '../../craftjs/components';
import { EditorLayout } from '../../craftjs/editor/EditorLayout';
import { EditorTopbar } from '../../craftjs/editor/EditorTopbar';

interface CategoryOption {
  value: string;
  label: string;
}

interface Props {
  isEdit?: boolean;
  categories?: CategoryOption[];
  mediaImages?: MediaImage[];
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
    thumbnailId?: string;
  };
  error?: string;
  success?: string;
}

function FormSection({ title, description, children, defaultOpen = true }: { title: string; description: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: 1,
        borderColor: 'divider',
        bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
        mb: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{ p: 2, pb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.25, fontSize: '0.95rem' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
            {description}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Divider />
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      </Collapse>
    </Paper>
  );
}

const defaultCategories: CategoryOption[] = [];

export function AdminBlogBuilderPage({ isEdit, categories, mediaImages, values, error, success }: Props) {
  const { theme } = useTheme();
  const t = useT('blogBuilder');
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const v = values ?? {};
  const cats = categories ?? defaultCategories;

  const [formTitle, setFormTitle] = useState(v.title ?? '');
  const [formSlug, setFormSlug] = useState(v.slug ?? '');
  const [formExcerpt, setFormExcerpt] = useState(v.excerpt ?? '');
  const [formStatus, setFormStatus] = useState(v.status ?? 'draft');
  const [formCategoryId, setFormCategoryId] = useState(v.categoryId ?? '');
  const [formReadTime, setFormReadTime] = useState(v.readTime ?? '5');
  const [formPublishedAt, setFormPublishedAt] = useState(v.publishedAt ?? '');
  const [formMetaTitle, setFormMetaTitle] = useState(v.metaTitle ?? '');
  const [formMetaDesc, setFormMetaDesc] = useState(v.metaDescription ?? '');
  const [formThumbnailId, setFormThumbnailId] = useState(v.thumbnailId ?? '');
  const [showImagePicker, setShowImagePicker] = useState(false);

  const isCraftContent = v.content ? v.content.startsWith('{"ROOT":') : false;

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  const actionUrl = isEdit ? `/admin/blog/edit/${v.id ?? ''}` : '/admin/blog/create';

  const handleSave = (json: string) => {
    if (contentRef.current) {
      contentRef.current.value = json;
    }
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <AdminLayout activePath="/admin/blog" fullWidth>
      <form ref={formRef} method="post" action={actionUrl} style={{ display: 'none' }}>
        <input type="hidden" name="title" value={formTitle} />
        <input type="hidden" name="slug" value={formSlug} />
        <input type="hidden" name="excerpt" value={formExcerpt} />
        <input type="hidden" name="content" ref={contentRef} defaultValue={v.content ?? ''} />
        <input type="hidden" name="status" value={formStatus} />
        <input type="hidden" name="categoryId" value={formCategoryId} />
        <input type="hidden" name="readTime" value={formReadTime} />
        <input type="hidden" name="publishedAt" value={formPublishedAt} />
        <input type="hidden" name="metaTitle" value={formMetaTitle} />
        <input type="hidden" name="metaDescription" value={formMetaDesc} />
        <input type="hidden" name="thumbnailId" value={formThumbnailId} />
      </form>

      <MediaProvider images={mediaImages ?? []}>
      <Editor resolver={craftResolver}>
        {/* Top bar */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              href="/admin/blog"
              startIcon={<ArrowBackIcon />}
              sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500, minWidth: 0, px: 1 }}
            >
              {t.back}
            </Button>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {isEdit ? t.titleEdit : t.titleNew}
            </Typography>
          </Box>
          <EditorTopbar onSave={handleSave} />
        </Stack>

        {error && <FlashMessage type="error" message={error} />}
        {success && <FlashMessage type="success" message={success} />}

        {/* Main editor area */}
        <EditorLayout>
          {isCraftContent ? (
            <Frame data={v.content}>
              <Element
                is={CraftContainer}
                canvas
                background="transparent"
                padding={20}
                borderRadius={0}
                flexDirection="column"
                alignItems="stretch"
                gap={8}
                minHeight={200}
              />
            </Frame>
          ) : (
            <Frame>
              <Element
                is={CraftContainer}
                canvas
                background="transparent"
                padding={20}
                borderRadius={0}
                flexDirection="column"
                alignItems="stretch"
                gap={8}
                minHeight={200}
              >
                <CraftHeading text={v.title || t.titleNew} level={1} textAlign="left" color="" marginBottom={24} />
                <CraftText text={t.defaultContent} fontSize={16} fontWeight={400} color="text.secondary" textAlign="left" lineHeight={1.6} marginBottom={16} />
              </Element>
            </Frame>
          )}
        </EditorLayout>
      </Editor>
      </MediaProvider>

      {/* Article metadata */}
      <FormSection title={t.sectionArticle} description={t.sectionArticleDesc} defaultOpen={true}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5 }}>
            <TextField
              fullWidth
              label={t.fields.title}
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              required
              size="small"
              sx={inputSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label={t.fields.slug}
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              placeholder={t.fields.slugPlaceholder}
              size="small"
              sx={inputSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small" sx={inputSx}>
              <InputLabel>{t.fields.status}</InputLabel>
              <Select
                label={t.fields.status}
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
              >
                <MenuItem value="draft">{t.statusOptions.draft}</MenuItem>
                <MenuItem value="published">{t.statusOptions.published}</MenuItem>
                <MenuItem value="scheduled">{t.statusOptions.scheduled}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={t.fields.excerpt}
              value={formExcerpt}
              onChange={(e) => setFormExcerpt(e.target.value)}
              multiline
              rows={2}
              size="small"
              helperText={t.fields.excerptHelp}
              sx={inputSx}
            />
          </Grid>
        </Grid>
      </FormSection>

      <FormSection title={t.sectionSettings} description={t.sectionSettingsDesc} defaultOpen={false}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small" sx={inputSx}>
              <InputLabel>{t.settingsFields.category}</InputLabel>
              <Select
                label={t.settingsFields.category}
                value={formCategoryId}
                onChange={(e) => setFormCategoryId(e.target.value)}
              >
                <MenuItem value="">{t.settingsFields.categoryNone}</MenuItem>
                {cats.map((c) => (
                  <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label={t.settingsFields.readTime}
              value={formReadTime}
              onChange={(e) => setFormReadTime(e.target.value)}
              type="number"
              size="small"
              sx={inputSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label={t.settingsFields.publishDate}
              value={formPublishedAt}
              onChange={(e) => setFormPublishedAt(e.target.value)}
              type="datetime-local"
              size="small"
              helperText={t.settingsFields.publishDateHelp}
              sx={inputSx}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          {/* Thumbnail picker */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              {t.settingsFields.thumbnail}
            </Typography>
            {formThumbnailId && mediaImages ? (() => {
              const img = mediaImages.find(m => m.id === formThumbnailId);
              return img ? (
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Box
                    component="img"
                    src={img.url}
                    alt={img.name}
                    sx={{
                      width: 200,
                      height: 130,
                      objectFit: 'cover',
                      borderRadius: 2,
                      border: 1,
                      borderColor: 'divider',
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => setFormThumbnailId('')}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      '&:hover': { bgcolor: 'error.main' },
                      width: 28,
                      height: 28,
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setShowImagePicker(true)}
                    sx={{ mt: 0.5, display: 'block', textTransform: 'none', fontSize: '0.8rem' }}
                  >
                    {t.settingsFields.changeThumbnail}
                  </Button>
                </Box>
              ) : null;
            })() : (
              <Button
                variant="outlined"
                startIcon={<ImageIcon />}
                onClick={() => setShowImagePicker(true)}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  borderColor: 'divider',
                  color: 'text.secondary',
                  '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                }}
              >
                {t.settingsFields.selectThumbnail}
              </Button>
            )}
          </Grid>
        </Grid>
      </FormSection>

      {/* Image picker dialog */}
      <Dialog
        open={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {t.settingsFields.selectThumbnail}
          <IconButton onClick={() => setShowImagePicker(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {mediaImages && mediaImages.length > 0 ? (
            <Grid container spacing={1.5} sx={{ pt: 1 }}>
              {mediaImages.map((img) => (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={img.id}>
                  <Box
                    onClick={() => {
                      setFormThumbnailId(img.id);
                      setShowImagePicker(false);
                    }}
                    sx={{
                      position: 'relative',
                      cursor: 'pointer',
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: 2,
                      borderColor: formThumbnailId === img.id ? 'primary.main' : 'divider',
                      transition: 'all 0.2s',
                      '&:hover': { borderColor: 'primary.main', transform: 'scale(1.02)' },
                    }}
                  >
                    <Box
                      component="img"
                      src={img.url}
                      alt={img.name}
                      sx={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }}
                    />
                    {formThumbnailId === img.id && (
                      <Box sx={{ position: 'absolute', top: 4, right: 4 }}>
                        <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 22, bgcolor: '#fff', borderRadius: '50%' }} />
                      </Box>
                    )}
                    <Typography variant="caption" sx={{ display: 'block', p: 0.5, textAlign: 'center', fontSize: '0.7rem' }} noWrap>
                      {img.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>
              {t.settingsFields.noImages}
            </Typography>
          )}
        </DialogContent>
      </Dialog>

      <FormSection title={t.sectionSeo} description={t.sectionSeoDesc} defaultOpen={false}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={t.seoFields.metaTitle}
              value={formMetaTitle}
              onChange={(e) => setFormMetaTitle(e.target.value)}
              size="small"
              sx={inputSx}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={t.seoFields.metaDescription}
              value={formMetaDesc}
              onChange={(e) => setFormMetaDesc(e.target.value)}
              multiline
              rows={2}
              size="small"
              sx={inputSx}
            />
          </Grid>
        </Grid>
      </FormSection>
    </AdminLayout>
  );
}
