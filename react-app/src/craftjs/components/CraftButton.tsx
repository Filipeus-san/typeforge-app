import React from 'react';
import { useNode } from '@craftjs/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEditorBorder } from './useEditorBorder';

interface CraftButtonProps {
  text: string;
  href: string;
  variant: 'contained' | 'outlined' | 'text';
  color: 'primary' | 'secondary' | 'inherit';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  textAlign: 'left' | 'center' | 'right';
  marginBottom: number;
}

export const CraftButton = ({ text, href, variant, color, size, fullWidth, textAlign, marginBottom }: CraftButtonProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      sx={{ textAlign, mb: `${marginBottom}px`, width: '100%', border: borderStyle, transition: 'border 0.15s ease', cursor: 'pointer', p: '4px' }}
    >
      <Button
        href={href}
        variant={variant}
        color={color}
        size={size}
        fullWidth={fullWidth}
        sx={variant === 'contained' ? {
          background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
          boxShadow: '0 4px 15px rgba(124,92,252,0.3)',
          '&:hover': { boxShadow: '0 6px 20px rgba(124,92,252,0.4)' },
        } : undefined}
      >
        {text}
      </Button>
    </Box>
  );
};

const ButtonSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftButtonProps,
  }));

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Tlačítko
      </Typography>
      <TextField
        label="Text"
        size="small"
        value={props.text}
        onChange={(e) => setProp((p: CraftButtonProps) => { p.text = e.target.value; })}
      />
      <TextField
        label="Odkaz (URL)"
        size="small"
        value={props.href}
        onChange={(e) => setProp((p: CraftButtonProps) => { p.href = e.target.value; })}
        placeholder="/kontakt, https://..."
      />
      <FormControl size="small">
        <InputLabel>Varianta</InputLabel>
        <Select
          label="Varianta"
          value={props.variant}
          onChange={(e) => setProp((p: CraftButtonProps) => { p.variant = e.target.value as CraftButtonProps['variant']; })}
        >
          <MenuItem value="contained">Vyplněný</MenuItem>
          <MenuItem value="outlined">Obrys</MenuItem>
          <MenuItem value="text">Text</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>Barva</InputLabel>
        <Select
          label="Barva"
          value={props.color}
          onChange={(e) => setProp((p: CraftButtonProps) => { p.color = e.target.value as CraftButtonProps['color']; })}
        >
          <MenuItem value="primary">Primární</MenuItem>
          <MenuItem value="secondary">Sekundární</MenuItem>
          <MenuItem value="inherit">Zděděná</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>Velikost</InputLabel>
        <Select
          label="Velikost"
          value={props.size}
          onChange={(e) => setProp((p: CraftButtonProps) => { p.size = e.target.value as CraftButtonProps['size']; })}
        >
          <MenuItem value="small">Malý</MenuItem>
          <MenuItem value="medium">Střední</MenuItem>
          <MenuItem value="large">Velký</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={props.fullWidth}
            onChange={(e) => setProp((p: CraftButtonProps) => { p.fullWidth = e.target.checked; })}
            size="small"
          />
        }
        label="Celá šířka"
      />
      <FormControl size="small">
        <InputLabel>Zarovnání</InputLabel>
        <Select
          label="Zarovnání"
          value={props.textAlign}
          onChange={(e) => setProp((p: CraftButtonProps) => { p.textAlign = e.target.value as CraftButtonProps['textAlign']; })}
        >
          <MenuItem value="left">Vlevo</MenuItem>
          <MenuItem value="center">Na střed</MenuItem>
          <MenuItem value="right">Vpravo</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Spodní okraj (px)"
        size="small"
        type="number"
        value={props.marginBottom}
        onChange={(e) => setProp((p: CraftButtonProps) => { p.marginBottom = Number(e.target.value); })}
      />
    </Stack>
  );
};

CraftButton.craft = {
  displayName: 'Tlačítko',
  props: {
    text: 'Klikněte zde',
    href: '#',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    fullWidth: false,
    textAlign: 'center',
    marginBottom: 16,
  } as CraftButtonProps,
  related: {
    settings: ButtonSettings,
  },
};
