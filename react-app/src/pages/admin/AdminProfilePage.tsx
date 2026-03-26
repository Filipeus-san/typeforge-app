import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import { AdminLayout } from '../../components/AdminLayout';
import { FlashMessage } from '../../components/FlashMessage';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface MediaImage {
  id: string;
  url: string;
  name: string;
}

interface Props {
  values?: {
    name?: string;
    email?: string;
    avatar_url?: string;
  };
  error?: string;
  success?: string;
  mediaImages?: MediaImage[];
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

export function AdminProfilePage({ values, error, success, mediaImages }: Props) {
  const { theme } = useTheme();
  const t = useT('profile');
  const v = values ?? {};
  const images = mediaImages ?? [];
  const [avatarUrl, setAvatarUrl] = useState(v.avatar_url ?? '');
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

  const filteredImages = images.filter(img =>
    mediaSearch === '' || img.name.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  return (
    <AdminLayout activePath="/admin/profile">
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

      {error && <FlashMessage type="error" message={error} />}
      {success && <FlashMessage type="success" message={success} />}

      <Box component="form" method="post" action="/admin/profile">
        <input type="hidden" name="avatar_url" value={avatarUrl} />

        {/* Avatar section */}
        <FormSection title={t.sectionAvatar} description={t.sectionAvatarDesc}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={avatarUrl || undefined}
                sx={{
                  width: 96,
                  height: 96,
                  background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  border: 3,
                  borderColor: 'divider',
                }}
              >
                {!avatarUrl && <PersonIcon sx={{ fontSize: 48 }} />}
              </Avatar>
            </Box>
            <Stack spacing={1}>
              <Button
                variant="outlined"
                startIcon={<PhotoCameraIcon />}
                onClick={() => setMediaOpen(true)}
                sx={{
                  borderRadius: 2.5,
                  borderColor: 'divider',
                  color: 'text.primary',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                {t.selectFromMedia}
              </Button>
              {avatarUrl && (
                <Button
                  size="small"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => setAvatarUrl('')}
                  sx={{
                    color: 'text.secondary',
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    '&:hover': { color: 'error.main' },
                  }}
                >
                  {t.removeImage}
                </Button>
              )}
            </Stack>
          </Stack>
        </FormSection>

        {/* Personal info */}
        <FormSection title={t.sectionPersonal} description={t.sectionPersonalDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.fields.name}
                name="name"
                defaultValue={v.name ?? ''}
                required
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.fields.email}
                name="email"
                type="email"
                defaultValue={v.email ?? ''}
                required
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </FormSection>

        {/* Password */}
        <FormSection title={t.sectionPassword} description={t.sectionPasswordDesc}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.passwordFields.password}
                name="password"
                type="password"
                placeholder="••••••••"
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t.passwordFields.confirm}
                name="passwordConfirm"
                type="password"
                placeholder="••••••••"
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </FormSection>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
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
        </Stack>
      </Box>

      {/* Media picker dialog */}
      <Dialog
        open={mediaOpen}
        onClose={() => setMediaOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            maxHeight: '80vh',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
            {t.mediaPicker.title}
          </Typography>
          <IconButton size="small" onClick={() => setMediaOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            placeholder={t.mediaPicker.search}
            size="small"
            value={mediaSearch}
            onChange={(e) => setMediaSearch(e.target.value)}
            sx={{ mb: 2, ...inputSx }}
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

          {filteredImages.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <PhotoCameraIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.4, mb: 1 }} />
              <Typography sx={{ color: 'text.secondary' }}>
                {t.mediaPicker.empty}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                {t.mediaPicker.uploadHint}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={1.5}>
              {filteredImages.map((img) => (
                <Grid size={{ xs: 4, sm: 3, md: 2 }} key={img.id}>
                  <Box
                    onClick={() => {
                      setAvatarUrl(img.url);
                      setMediaOpen(false);
                      setMediaSearch('');
                    }}
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: 2,
                      borderColor: avatarUrl === img.url ? 'primary.main' : 'divider',
                      transition: 'all 0.15s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                        boxShadow: theme === 'dark'
                          ? '0 4px 12px rgba(0,0,0,0.3)'
                          : '0 4px 12px rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={img.url}
                      alt={img.name}
                      sx={{
                        width: '100%',
                        aspectRatio: '1',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <Box sx={{ px: 1, py: 0.75 }}>
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: 'text.secondary',
                        }}
                      >
                        {img.name}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
