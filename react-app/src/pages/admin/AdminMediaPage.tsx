import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AdminLayout } from '../../components/AdminLayout';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'pdf' | 'video' | 'audio' | 'other';
  size: string;
  dimensions?: string;
  uploaded: string;
  thumbnail?: string;
}

interface Props {
  files?: MediaFile[];
  storageUsed?: string;
  storageTotal?: string;
  flash?: { type: 'success' | 'error' | 'warning' | 'info'; message: string };
}

const defaultFiles: MediaFile[] = [
  { id: '1', name: 'hero-background.jpg', url: '/uploads/hero-background.jpg', type: 'image', size: '2.4 MB', dimensions: '1920×1080', uploaded: '26. 2. 2026', thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: '2', name: 'logo-dark.svg', url: '/uploads/logo-dark.svg', type: 'image', size: '12 KB', dimensions: '200×60', uploaded: '25. 2. 2026', thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: '3', name: 'team-photo.png', url: '/uploads/team-photo.png', type: 'image', size: '1.8 MB', dimensions: '1600×900', uploaded: '24. 2. 2026', thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: '4', name: 'annual-report-2025.pdf', url: '/uploads/annual-report-2025.pdf', type: 'pdf', size: '4.2 MB', uploaded: '23. 2. 2026' },
  { id: '5', name: 'product-demo.mp4', url: '/uploads/product-demo.mp4', type: 'video', size: '18.5 MB', uploaded: '22. 2. 2026' },
  { id: '6', name: 'about-section.jpg', url: '/uploads/about-section.jpg', type: 'image', size: '890 KB', dimensions: '1200×800', uploaded: '21. 2. 2026', thumbnail: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: '7', name: 'podcast-ep12.mp3', url: '/uploads/podcast-ep12.mp3', type: 'audio', size: '32 MB', uploaded: '20. 2. 2026' },
  { id: '8', name: 'services-banner.jpg', url: '/uploads/services-banner.jpg', type: 'image', size: '1.1 MB', dimensions: '1920×600', uploaded: '19. 2. 2026', thumbnail: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: '9', name: 'pricing-table.png', url: '/uploads/pricing-table.png', type: 'image', size: '340 KB', dimensions: '800×600', uploaded: '18. 2. 2026', thumbnail: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' },
  { id: '10', name: 'terms-of-service.pdf', url: '/uploads/terms-of-service.pdf', type: 'pdf', size: '156 KB', uploaded: '17. 2. 2026' },
  { id: '11', name: 'favicon.ico', url: '/uploads/favicon.ico', type: 'other', size: '4 KB', uploaded: '15. 2. 2026' },
  { id: '12', name: 'testimonial-bg.jpg', url: '/uploads/testimonial-bg.jpg', type: 'image', size: '2.1 MB', dimensions: '1920×1080', uploaded: '14. 2. 2026', thumbnail: 'linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%)' },
];

function getFileIcon(type: string) {
  switch (type) {
    case 'image': return <ImageIcon />;
    case 'pdf': return <PictureAsPdfIcon />;
    case 'video': return <VideoFileIcon />;
    case 'audio': return <AudioFileIcon />;
    default: return <InsertDriveFileIcon />;
  }
}

function getFileColor(type: string) {
  switch (type) {
    case 'image': return '#7c5cfc';
    case 'pdf': return '#ef4444';
    case 'video': return '#06d6a0';
    case 'audio': return '#fb923c';
    default: return '#9595ad';
  }
}

export function AdminMediaPage({ files, storageUsed, storageTotal, flash }: Props) {
  const { theme } = useTheme();
  const t = useT();
  const allFiles = files ?? defaultFiles;
  const used = storageUsed ?? '64.3 MB';
  const total = storageTotal ?? '1 GB';
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [detailFile, setDetailFile] = useState<MediaFile | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = allFiles.filter((f) => {
    const matchSearch = search === '' || f.name.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || f.type === filterType;
    return matchSearch && matchType;
  });

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  return (
    <AdminLayout activePath="/admin/media" flash={flash}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {t.media.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t.media.subtitle(allFiles.length)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          component="label"
          sx={{
            background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
            boxShadow: '0 4px 15px rgba(124,92,252,0.3)',
            borderRadius: 2.5,
            px: 3,
            whiteSpace: 'nowrap',
            '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(124,92,252,0.4)' },
          }}
        >
          {t.media.upload}
          <input type="file" hidden multiple name="file" onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              const form = document.createElement('form');
              form.method = 'POST';
              form.action = '/admin/media/upload';
              form.enctype = 'multipart/form-data';
              const input = document.createElement('input');
              input.type = 'file';
              input.name = 'file';
              input.multiple = true;
              input.style.display = 'none';
              form.appendChild(input);
              document.body.appendChild(form);
              const dt = new DataTransfer();
              for (let i = 0; i < e.target.files.length; i++) {
                dt.items.add(e.target.files[i]);
              }
              input.files = dt.files;
              form.submit();
            }
          }} />
        </Button>
      </Stack>

      {/* Storage bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
          bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
            {t.media.storage}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
            {used} / {total}
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={6.4}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              background: 'linear-gradient(90deg, #7c5cfc, #06d6a0)',
            },
          }}
        />
      </Paper>

      {/* Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }} alignItems="center">
        <TextField
          placeholder={t.media.search}
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: { sm: 320 }, ...inputSx }}
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
        <Stack direction="row" spacing={1} sx={{ flexGrow: 1, overflowX: 'auto', pb: 0.5, flexShrink: 0, '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
          {[
            { key: 'all', label: t.media.filters.all },
            { key: 'image', label: t.media.filters.images },
            { key: 'pdf', label: t.media.filters.pdf },
            { key: 'video', label: t.media.filters.video },
            { key: 'audio', label: t.media.filters.audio },
          ].map((f) => (
            <Chip
              key={f.key}
              label={f.label}
              onClick={() => setFilterType(f.key)}
              icon={f.key === filterType ? undefined : <FilterListIcon sx={{ fontSize: '14px !important' }} />}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '0.8rem',
                border: 1,
                borderColor: f.key === filterType ? 'primary.main' : 'divider',
                bgcolor: f.key === filterType ? 'rgba(124,92,252,0.12)' : 'transparent',
                color: f.key === filterType ? 'primary.light' : 'text.secondary',
                '& .MuiChip-icon': { color: 'text.secondary' },
                '&:hover': { borderColor: 'primary.main' },
              }}
            />
          ))}
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <IconButton
            size="small"
            onClick={() => setViewMode('grid')}
            sx={{
              color: viewMode === 'grid' ? 'primary.light' : 'text.secondary',
              bgcolor: viewMode === 'grid' ? 'rgba(124,92,252,0.12)' : 'transparent',
              borderRadius: 2,
            }}
          >
            <GridViewIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setViewMode('list')}
            sx={{
              color: viewMode === 'list' ? 'primary.light' : 'text.secondary',
              bgcolor: viewMode === 'list' ? 'rgba(124,92,252,0.12)' : 'transparent',
              borderRadius: 2,
            }}
          >
            <ViewListIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Files */}
      {filtered.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6, textAlign: 'center', borderRadius: 4, border: 1, borderColor: 'divider',
            bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
          }}
        >
          <InsertDriveFileIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1.5, opacity: 0.4 }} />
          <Typography sx={{ color: 'text.secondary' }}>{t.media.empty}</Typography>
        </Paper>
      ) : viewMode === 'grid' ? (
        <Grid container spacing={2}>
          {filtered.map((file) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={file.id}>
              <Paper
                elevation={0}
                onClick={() => setDetailFile(file)}
                sx={{
                  borderRadius: 3,
                  border: 1,
                  borderColor: 'divider',
                  bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)',
                    boxShadow: theme === 'dark'
                      ? '0 8px 25px rgba(0,0,0,0.3)'
                      : '0 8px 25px rgba(0,0,0,0.08)',
                  },
                }}
              >
                {/* Thumbnail / icon */}
                <Box
                  sx={{
                    height: 120,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: file.thumbnail
                      ? file.thumbnail
                      : theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    overflow: 'hidden',
                  }}
                >
                  {file.type === 'image' && !file.thumbnail && file.url ? (
                    <Box component="img" src={file.url} alt={file.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : !file.thumbnail ? (
                    <Box sx={{ color: getFileColor(file.type), opacity: 0.7, '& svg': { fontSize: 40 } }}>
                      {getFileIcon(file.type)}
                    </Box>
                  ) : null}
                </Box>
                {/* Info */}
                <Box sx={{ p: 1.5 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {file.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {file.size}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
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
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box
              component="thead"
              sx={{
                '& th': {
                  textAlign: 'left', px: { xs: 1.5, sm: 3 }, py: 1.5, borderBottom: 1, borderColor: 'divider',
                  color: 'text.secondary', fontSize: '0.8rem', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                },
              }}
            >
              <tr>
                <th style={{ width: 40 }}></th>
                <th>{t.media.columns.name}</th>
                <th>{t.media.columns.type}</th>
                <Box component="th" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{t.media.columns.size}</Box>
                <Box component="th" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{t.media.columns.uploaded}</Box>
                <th style={{ width: 100 }}></th>
              </tr>
            </Box>
            <Box
              component="tbody"
              sx={{
                '& td': { px: { xs: 1.5, sm: 3 }, py: 1.5, borderBottom: 1, borderColor: 'divider', fontSize: '0.9rem' },
                '& tr:last-child td': { borderBottom: 0 },
                '& tr': { cursor: 'pointer' },
                '& tr:hover': { bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' },
              }}
            >
              {filtered.map((file) => (
                <tr key={file.id} onClick={() => setDetailFile(file)}>
                  <td>
                    <Box sx={{ color: getFileColor(file.type), display: 'flex', '& svg': { fontSize: 22 } }}>
                      {getFileIcon(file.type)}
                    </Box>
                  </td>
                  <td>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{file.name}</Typography>
                  </td>
                  <td>
                    <Chip
                      label={file.type.toUpperCase()}
                      size="small"
                      sx={{
                        height: 22, fontSize: '0.65rem', fontWeight: 700,
                        bgcolor: `${getFileColor(file.type)}18`,
                        color: getFileColor(file.type),
                      }}
                    />
                  </td>
                  <Box component="td" sx={{ display: { xs: 'none', sm: 'table-cell' } }}><Typography variant="body2" sx={{ color: 'text.secondary' }}>{file.size}</Typography></Box>
                  <Box component="td" sx={{ display: { xs: 'none', md: 'table-cell' } }}><Typography variant="body2" sx={{ color: 'text.secondary' }}>{file.uploaded}</Typography></Box>
                  <td>
                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title={t.media.actions.copyUrl}>
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleCopyUrl(file.url); }} sx={{ color: 'text.secondary' }}>
                          <ContentCopyIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t.media.actions.delete}>
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); if (window.confirm(t.media.confirmDelete)) { const f = document.createElement('form'); f.method = 'POST'; f.action = `/admin/media/delete/${file.id}`; document.body.appendChild(f); f.submit(); } }} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                          <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </td>
                </tr>
              ))}
            </Box>
          </Box>
        </Paper>
      )}

      {/* Detail dialog */}
      <Dialog
        open={!!detailFile}
        onClose={() => setDetailFile(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4, border: 1, borderColor: 'divider', bgcolor: 'background.paper',
          },
        }}
      >
        {detailFile && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>{t.media.detail.title}</Typography>
              <IconButton size="small" onClick={() => setDetailFile(null)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              {/* Preview */}
              <Box
                sx={{
                  height: 200,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2.5,
                  background: detailFile.thumbnail
                    ? detailFile.thumbnail
                    : theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)',
                  border: 1,
                  borderColor: 'divider',
                  overflow: 'hidden',
                }}
              >
                {detailFile.type === 'image' && !detailFile.thumbnail && detailFile.url ? (
                  <Box component="img" src={detailFile.url} alt={detailFile.name} sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : !detailFile.thumbnail ? (
                  <Box sx={{ color: getFileColor(detailFile.type), '& svg': { fontSize: 56 } }}>
                    {getFileIcon(detailFile.type)}
                  </Box>
                ) : null}
              </Box>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t.media.detail.fileName}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>{detailFile.name}</Typography>
                </Box>

                <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t.media.detail.size}
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>{detailFile.size}</Typography>
                  </Box>
                  {detailFile.dimensions && (
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {t.media.detail.dimensions}
                      </Typography>
                      <Typography sx={{ fontWeight: 500 }}>{detailFile.dimensions}</Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t.media.detail.uploaded}
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>{detailFile.uploaded}</Typography>
                  </Box>
                </Stack>

                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.5, display: 'block' }}>
                    {t.media.detail.url}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                        border: 1,
                        borderColor: 'divider',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {detailFile.url}
                    </Box>
                    <Tooltip title={copied ? t.media.detail.copied : t.media.detail.copy}>
                      <IconButton size="small" onClick={() => handleCopyUrl(detailFile.url)} sx={{ color: copied ? '#06d6a0' : 'text.secondary' }}>
                        {copied ? <CheckCircleIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Stack>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button
                startIcon={<OpenInNewIcon />}
                href={detailFile.url}
                target="_blank"
                sx={{ color: 'text.secondary', borderRadius: 2 }}
              >
                {t.media.detail.open}
              </Button>
              <Button
                startIcon={<DeleteOutlineIcon />}
                onClick={() => { if (window.confirm(t.media.confirmDelete)) { setDetailFile(null); const f = document.createElement('form'); f.method = 'POST'; f.action = `/admin/media/delete/${detailFile.id}`; document.body.appendChild(f); f.submit(); } }}
                sx={{ color: 'error.main', borderRadius: 2 }}
              >
                {t.media.actions.delete}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </AdminLayout>
  );
}
