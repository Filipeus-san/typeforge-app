import React, { useState, useRef } from 'react';
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
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import { AdminLayout } from '../../components/AdminLayout';
import { FlashMessage } from '../../components/FlashMessage';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  mimeType: string;
}

interface Props {
  isEdit?: boolean;
  values?: {
    id?: string;
    source_path?: string;
    target_url?: string;
    type?: string;
    status_code?: string;
    is_active?: string;
    sort_order?: string;
    note?: string;
  };
  mediaFiles?: MediaFile[];
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

function getFileExtension(name: string): string {
  const parts = name.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';
}

export function AdminRedirectFormPage({ isEdit, values, mediaFiles, error, success }: Props) {
  const { theme } = useTheme();
  const t = useT('redirectForm');
  const v = values ?? {};
  const [ruleType, setRuleType] = useState(v.type ?? 'redirect');
  const [targetUrl, setTargetUrl] = useState(v.target_url ?? '');
  const targetUrlRef = useRef<HTMLInputElement>(null);
  const allMedia = mediaFiles ?? [];

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  const actionUrl = isEdit ? `/admin/redirects/edit/${v.id ?? ''}` : '/admin/redirects/create';

  // Find which media file matches the current target_url (if any)
  const selectedMedia = allMedia.find(m => m.url === targetUrl) ?? null;

  return (
    <AdminLayout activePath="/admin/redirects">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Button
            href="/admin/redirects"
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'text.secondary', mb: 1, pl: 0, textTransform: 'none', fontWeight: 500 }}
          >
            {t.backToRedirects}
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
        <FormSection title={t.sectionRule} description={t.sectionRuleDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.fields.source}
                name="source_path"
                defaultValue={v.source_path ?? ''}
                required
                placeholder={t.fields.sourcePlaceholder}
                helperText={t.fields.sourceHelp}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.fields.target}
                name="target_url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                inputRef={targetUrlRef}
                required
                placeholder={t.fields.targetPlaceholder}
                helperText={t.fields.targetHelp}
                sx={inputSx}
              />
            </Grid>
          </Grid>

          {allMedia.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Autocomplete
                options={allMedia}
                value={selectedMedia}
                onChange={(_, newValue) => {
                  if (newValue) {
                    setTargetUrl(newValue.url);
                  }
                }}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => {
                  const { key, ...rest } = props as React.HTMLAttributes<HTMLLIElement> & { key: string };
                  const isImage = option.mimeType.startsWith('image/');
                  const ext = getFileExtension(option.name);
                  return (
                    <Box component="li" key={key} {...rest} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
                      {isImage ? (
                        <ImageIcon sx={{ color: '#3b82f6', fontSize: 20 }} />
                      ) : (
                        <InsertDriveFileIcon sx={{ color: '#9595ad', fontSize: 20 }} />
                      )}
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }} noWrap>
                          {option.name}
                        </Typography>
                      </Box>
                      {ext && (
                        <Chip
                          label={ext}
                          size="small"
                          sx={{
                            height: 20, fontSize: '0.65rem', fontWeight: 600,
                            bgcolor: isImage ? 'rgba(59,130,246,0.12)' : 'rgba(149,149,173,0.12)',
                            color: isImage ? '#3b82f6' : '#9595ad',
                          }}
                        />
                      )}
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t.fields.mediaFile}
                    placeholder={t.fields.mediaFilePlaceholder}
                    helperText={t.fields.mediaFileHelp}
                    sx={inputSx}
                  />
                )}
                noOptionsText={t.fields.noFiles}
                clearText={t.fields.clearSelection}
              />
            </Box>
          )}
        </FormSection>

        <FormSection title={t.sectionSettings} description={t.sectionSettingsDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t.settingsFields.type}</InputLabel>
                <Select
                  label={t.settingsFields.type}
                  name="type"
                  value={ruleType}
                  onChange={(e) => setRuleType(e.target.value)}
                >
                  <MenuItem value="redirect">{t.settingsFields.typeRedirect}</MenuItem>
                  <MenuItem value="rewrite">{t.settingsFields.typeRewrite}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {ruleType === 'redirect' && (
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth sx={inputSx}>
                  <InputLabel>{t.settingsFields.statusCode}</InputLabel>
                  <Select
                    label={t.settingsFields.statusCode}
                    name="status_code"
                    defaultValue={v.status_code ?? '301'}
                  >
                    <MenuItem value="301">{t.settingsFields.code301}</MenuItem>
                    <MenuItem value="302">{t.settingsFields.code302}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            {ruleType === 'rewrite' && (
              <input type="hidden" name="status_code" value={v.status_code ?? '301'} />
            )}
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t.settingsFields.status}</InputLabel>
                <Select
                  label={t.settingsFields.status}
                  name="is_active"
                  defaultValue={v.is_active ?? 'true'}
                >
                  <MenuItem value="true">{t.settingsFields.statusActive}</MenuItem>
                  <MenuItem value="false">{t.settingsFields.statusInactive}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </FormSection>

        <FormSection title={t.sectionOther} description={t.sectionOtherDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label={t.otherFields.sortOrder}
                name="sort_order"
                type="number"
                defaultValue={v.sort_order ?? '0'}
                helperText={t.otherFields.sortOrderHelp}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label={t.otherFields.note}
                name="note"
                defaultValue={v.note ?? ''}
                placeholder={t.otherFields.notePlaceholder}
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </FormSection>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            href="/admin/redirects"
            variant="outlined"
            sx={{ borderRadius: 2.5, px: 3, borderColor: 'divider', color: 'text.secondary', textTransform: 'none' }}
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
