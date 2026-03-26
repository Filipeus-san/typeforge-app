import React from 'react';
import { useNode } from '@craftjs/core';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useEditorBorder } from './useEditorBorder';

interface CraftHeadingProps {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  textAlign: 'left' | 'center' | 'right';
  color: string;
  marginBottom: number;
}

const levelVariant: Record<number, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
  1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6',
};

export const CraftHeading = ({ text, level, textAlign, color, marginBottom }: CraftHeadingProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  return (
    <Typography
      ref={(ref: HTMLElement) => connect(drag(ref))}
      variant={levelVariant[level] || 'h2'}
      sx={{
        textAlign,
        color: color || 'text.primary',
        mb: `${marginBottom}px`,
        width: '100%',
        fontWeight: 700,
        border: borderStyle,
        transition: 'border 0.15s ease',
        cursor: 'pointer',
        p: '4px',
      }}
    >
      {text}
    </Typography>
  );
};

const HeadingSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftHeadingProps,
  }));

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Nadpis
      </Typography>
      <TextField
        label="Text nadpisu"
        size="small"
        value={props.text}
        onChange={(e) => setProp((p: CraftHeadingProps) => { p.text = e.target.value; })}
      />
      <FormControl size="small">
        <InputLabel>Úroveň</InputLabel>
        <Select
          label="Úroveň"
          value={props.level}
          onChange={(e) => setProp((p: CraftHeadingProps) => { p.level = Number(e.target.value) as CraftHeadingProps['level']; })}
        >
          <MenuItem value={1}>H1 — Hlavní nadpis</MenuItem>
          <MenuItem value={2}>H2 — Sekce</MenuItem>
          <MenuItem value={3}>H3 — Pod-sekce</MenuItem>
          <MenuItem value={4}>H4</MenuItem>
          <MenuItem value={5}>H5</MenuItem>
          <MenuItem value={6}>H6</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>Zarovnání</InputLabel>
        <Select
          label="Zarovnání"
          value={props.textAlign}
          onChange={(e) => setProp((p: CraftHeadingProps) => { p.textAlign = e.target.value as CraftHeadingProps['textAlign']; })}
        >
          <MenuItem value="left">Vlevo</MenuItem>
          <MenuItem value="center">Na střed</MenuItem>
          <MenuItem value="right">Vpravo</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Barva"
        size="small"
        value={props.color}
        onChange={(e) => setProp((p: CraftHeadingProps) => { p.color = e.target.value; })}
        placeholder="inherit, #333"
      />
      <TextField
        label="Spodní okraj (px)"
        size="small"
        type="number"
        value={props.marginBottom}
        onChange={(e) => setProp((p: CraftHeadingProps) => { p.marginBottom = Number(e.target.value); })}
      />
    </Stack>
  );
};

CraftHeading.craft = {
  displayName: 'Nadpis',
  props: {
    text: 'Nadpis',
    level: 2,
    textAlign: 'left',
    color: '',
    marginBottom: 24,
  } as CraftHeadingProps,
  related: {
    settings: HeadingSettings,
  },
};
