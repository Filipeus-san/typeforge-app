import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ImageIcon from '@mui/icons-material/Image';

interface ImageNodeProps {
  src: string;
  alt: string;
  caption: string;
  maxWidth: 'sm' | 'md' | 'full';
  borderRadius: number;
}

const maxWidthMap = { sm: 480, md: 720, full: '100%' };

export const ImageNode: UserComponent<ImageNodeProps> = ({ src, alt, caption, maxWidth, borderRadius }) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({ selected: state.events.selected }));

  return (
    <Box
      ref={(ref: HTMLElement | null) => { if (ref) connect(drag(ref)); }}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        outline: selected ? '2px solid' : '2px solid transparent',
        outlineColor: selected ? 'primary.main' : 'transparent',
        outlineOffset: 4,
        borderRadius: 1,
        transition: 'outline-color 0.15s',
        '&:hover': { outlineColor: selected ? 'primary.main' : 'rgba(124,92,252,0.3)' },
        py: 0.5,
        textAlign: 'center',
      }}
    >
      {src ? (
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            maxWidth: maxWidthMap[maxWidth],
            width: '100%',
            height: 'auto',
            borderRadius: borderRadius,
            display: 'block',
            mx: 'auto',
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: maxWidthMap[maxWidth],
            height: 240,
            mx: 'auto',
            background: 'linear-gradient(135deg, rgba(124,92,252,0.2), rgba(6,214,160,0.15))',
            borderRadius: borderRadius / 8 + 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 1,
            borderColor: 'divider',
          }}
        >
          <ImageIcon sx={{ fontSize: '3rem', color: 'primary.light', opacity: 0.5 }} />
        </Box>
      )}
      {caption && (
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
          {caption}
        </Typography>
      )}
    </Box>
  );
};

function ImageSettings() {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props as ImageNodeProps }));

  return (
    <Stack spacing={2}>
      <TextField
        label="URL obrázku"
        size="small"
        value={props.src}
        onChange={(e) => setProp((p: ImageNodeProps) => { p.src = e.target.value; })}
        fullWidth
        placeholder="https://example.com/image.jpg"
      />
      <TextField
        label="Alt text"
        size="small"
        value={props.alt}
        onChange={(e) => setProp((p: ImageNodeProps) => { p.alt = e.target.value; })}
        fullWidth
      />
      <TextField
        label="Popisek"
        size="small"
        value={props.caption}
        onChange={(e) => setProp((p: ImageNodeProps) => { p.caption = e.target.value; })}
        fullWidth
      />
      <FormControl size="small" fullWidth>
        <InputLabel>Šířka</InputLabel>
        <Select
          label="Šířka"
          value={props.maxWidth}
          onChange={(e) => setProp((p: ImageNodeProps) => { p.maxWidth = e.target.value as any; })}
        >
          <MenuItem value="sm">Malá (480px)</MenuItem>
          <MenuItem value="md">Střední (720px)</MenuItem>
          <MenuItem value="full">Plná šířka</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>
          Zaoblení rohů
        </Typography>
        <Box sx={{ px: 1 }}>
          <input
            type="range"
            min={0}
            max={32}
            value={props.borderRadius}
            onChange={(e) => setProp((p: ImageNodeProps) => { p.borderRadius = Number(e.target.value); })}
            style={{ width: '100%' }}
          />
        </Box>
      </Box>
    </Stack>
  );
}

ImageNode.craft = {
  props: {
    src: '',
    alt: '',
    caption: '',
    maxWidth: 'full',
    borderRadius: 12,
  } as ImageNodeProps,
  displayName: 'Obrázek',
  related: {
    settings: ImageSettings,
  },
};
