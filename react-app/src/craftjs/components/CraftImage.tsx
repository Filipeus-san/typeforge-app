import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ImageIcon from '@mui/icons-material/Image';
import CollectionsIcon from '@mui/icons-material/Collections';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEditorBorder } from './useEditorBorder';
import { useMediaImages } from '../../context/MediaContext';

interface CraftImageProps {
  src: string;
  alt: string;
  width: string;
  borderRadius: number;
  objectFit: 'cover' | 'contain' | 'fill';
  marginBottom: number;
}

export const CraftImage = ({ src, alt, width, borderRadius, objectFit, marginBottom }: CraftImageProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  if (!src) {
    return (
      <Box
        ref={(ref: HTMLDivElement) => connect(drag(ref))}
        sx={{
          width: width || '100%',
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 1,
          bgcolor: 'rgba(124,92,252,0.08)',
          border: borderStyle,
          borderRadius: `${borderRadius}px`,
          mb: `${marginBottom}px`,
          color: 'text.secondary',
          transition: 'border 0.15s ease',
          cursor: 'pointer',
        }}
      >
        <ImageIcon sx={{ fontSize: 40, opacity: 0.5 }} />
        <Typography variant="caption">Zadejte URL obrázku v nastavení</Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: width || '100%',
        maxWidth: '100%',
        borderRadius: `${borderRadius}px`,
        objectFit,
        display: 'block',
        mb: `${marginBottom}px`,
        border: borderStyle,
        transition: 'border 0.15s ease',
        cursor: 'pointer',
      }}
    />
  );
};

const ImageSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftImageProps,
  }));
  const mediaImages = useMediaImages();
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSelectImage = (url: string, name: string) => {
    setProp((p: CraftImageProps) => { p.src = url; });
    if (!props.alt) {
      setProp((p: CraftImageProps) => { p.alt = name; });
    }
    setPickerOpen(false);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Obrázek
      </Typography>
      {mediaImages.length > 0 && (
        <Button
          variant="outlined"
          startIcon={<CollectionsIcon />}
          onClick={() => setPickerOpen(true)}
          size="small"
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          Vybrat z médií
        </Button>
      )}
      <TextField
        label="URL obrázku"
        size="small"
        value={props.src}
        onChange={(e) => setProp((p: CraftImageProps) => { p.src = e.target.value; })}
        placeholder="https://..."
      />
      <TextField
        label="Alt text"
        size="small"
        value={props.alt}
        onChange={(e) => setProp((p: CraftImageProps) => { p.alt = e.target.value; })}
      />
      <TextField
        label="Šířka"
        size="small"
        value={props.width}
        onChange={(e) => setProp((p: CraftImageProps) => { p.width = e.target.value; })}
        placeholder="100%, 400px, 50%"
      />
      <TextField
        label="Zaoblení (px)"
        size="small"
        type="number"
        value={props.borderRadius}
        onChange={(e) => setProp((p: CraftImageProps) => { p.borderRadius = Number(e.target.value); })}
      />
      <FormControl size="small">
        <InputLabel>Přizpůsobení</InputLabel>
        <Select
          label="Přizpůsobení"
          value={props.objectFit}
          onChange={(e) => setProp((p: CraftImageProps) => { p.objectFit = e.target.value as CraftImageProps['objectFit']; })}
        >
          <MenuItem value="cover">Vyplnit</MenuItem>
          <MenuItem value="contain">Celý obrázek</MenuItem>
          <MenuItem value="fill">Roztáhnout</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Spodní okraj (px)"
        size="small"
        type="number"
        value={props.marginBottom}
        onChange={(e) => setProp((p: CraftImageProps) => { p.marginBottom = Number(e.target.value); })}
      />

      {/* Media Picker Dialog */}
      <Dialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, border: 1, borderColor: 'divider', bgcolor: 'background.paper' },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Vybrat obrázek z médií</Typography>
          <IconButton size="small" onClick={() => setPickerOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {mediaImages.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.4, mb: 1 }} />
              <Typography sx={{ color: 'text.secondary' }}>Žádné obrázky v médiích</Typography>
            </Box>
          ) : (
            <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
              {mediaImages.map((img) => {
                const isSelected = props.src === img.url;
                return (
                  <Grid size={{ xs: 4, sm: 3, md: 2 }} key={img.id}>
                    <Paper
                      elevation={0}
                      onClick={() => handleSelectImage(img.url, img.name)}
                      sx={{
                        borderRadius: 2,
                        border: 2,
                        borderColor: isSelected ? 'primary.main' : 'divider',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.15s',
                        '&:hover': { borderColor: 'primary.main', transform: 'translateY(-1px)' },
                      }}
                    >
                      <Box
                        component="img"
                        src={img.url}
                        alt={img.name}
                        sx={{ width: '100%', height: 80, objectFit: 'cover', display: 'block' }}
                      />
                      {isSelected && (
                        <Box sx={{ position: 'absolute', top: 4, right: 4 }}>
                          <CheckCircleIcon sx={{ fontSize: 20, color: 'primary.main', bgcolor: 'background.paper', borderRadius: '50%' }} />
                        </Box>
                      )}
                      <Box sx={{ p: 0.75 }}>
                        <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {img.name}
                        </Typography>
                        {img.dimensions && (
                          <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                            {img.dimensions}
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

CraftImage.craft = {
  displayName: 'Obrázek',
  props: {
    src: '',
    alt: '',
    width: '100%',
    borderRadius: 0,
    objectFit: 'cover',
    marginBottom: 16,
  } as CraftImageProps,
  related: {
    settings: ImageSettings,
  },
};
