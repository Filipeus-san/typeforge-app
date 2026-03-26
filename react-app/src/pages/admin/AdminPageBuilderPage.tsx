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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { AdminLayout } from '../../components/AdminLayout';
import { FlashMessage } from '../../components/FlashMessage';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';
import { MediaProvider, MediaImage } from '../../context/MediaContext';

import { craftResolver, CraftContainer, CraftText, CraftHeading } from '../../craftjs/components';
import { EditorLayout } from '../../craftjs/editor/EditorLayout';
import { EditorTopbar } from '../../craftjs/editor/EditorTopbar';

interface Props {
  isEdit?: boolean;
  mediaImages?: MediaImage[];
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

export function AdminPageBuilderPage({ isEdit, mediaImages, values, error, success }: Props) {
  const { theme } = useTheme();
  const t = useT();
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const v = values ?? {};

  const [formTitle, setFormTitle] = useState(v.title ?? '');
  const [formSlug, setFormSlug] = useState(v.slug ?? '');
  const [formStatus, setFormStatus] = useState(v.status ?? 'draft');
  const [formMetaTitle, setFormMetaTitle] = useState(v.metaTitle ?? '');
  const [formMetaDesc, setFormMetaDesc] = useState(v.metaDescription ?? '');

  const isCraftContent = v.content ? v.content.startsWith('{"ROOT":') : false;

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  const actionUrl = isEdit ? `/admin/pages/edit/${v.id ?? ''}` : '/admin/pages/create';

  const handleSave = (json: string) => {
    if (contentRef.current) {
      contentRef.current.value = json;
    }
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <AdminLayout activePath="/admin/pages" fullWidth>
      <form ref={formRef} method="post" action={actionUrl} style={{ display: 'none' }}>
        <input type="hidden" name="title" value={formTitle} />
        <input type="hidden" name="slug" value={formSlug} />
        <input type="hidden" name="content" ref={contentRef} defaultValue={v.content ?? ''} />
        <input type="hidden" name="status" value={formStatus} />
        <input type="hidden" name="metaTitle" value={formMetaTitle} />
        <input type="hidden" name="metaDescription" value={formMetaDesc} />
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
              href="/admin/pages"
              startIcon={<ArrowBackIcon />}
              sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500, minWidth: 0, px: 1 }}
            >
              {t.pageBuilder.actions.back}
            </Button>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {isEdit ? t.pageBuilder.titleEdit : t.pageBuilder.titleNew}
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
                <CraftText text={t.pageBuilder.defaultContent} fontSize={16} fontWeight={400} color="text.secondary" textAlign="left" lineHeight={1.6} marginBottom={16} />
              </Element>
            </Frame>
          )}
        </EditorLayout>
      </Editor>
      </MediaProvider>

      {/* Page metadata */}
      <FormSection title={t.pageBuilder.sectionPage} description={t.pageBuilder.sectionPageDesc} defaultOpen={true}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5 }}>
            <TextField
              fullWidth
              label={t.pageBuilder.fields.title}
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
              label={t.pageBuilder.fields.slug}
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              placeholder={t.pageBuilder.fields.slugPlaceholder}
              size="small"
              sx={inputSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small" sx={inputSx}>
              <InputLabel>{t.pageBuilder.fields.status}</InputLabel>
              <Select
                label={t.pageBuilder.fields.status}
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
              >
                <MenuItem value="draft">{t.pageBuilder.statusOptions.draft}</MenuItem>
                <MenuItem value="published">{t.pageBuilder.statusOptions.published}</MenuItem>
                <MenuItem value="archived">{t.pageBuilder.statusOptions.archived}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </FormSection>

      <FormSection title={t.pageBuilder.sectionSeo} description={t.pageBuilder.sectionSeoDesc} defaultOpen={false}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={t.pageBuilder.seoFields.metaTitle}
              value={formMetaTitle}
              onChange={(e) => setFormMetaTitle(e.target.value)}
              size="small"
              sx={inputSx}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={t.pageBuilder.seoFields.metaDescription}
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
