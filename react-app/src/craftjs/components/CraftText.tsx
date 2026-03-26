import React from 'react';
import { useNode } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useEditorBorder } from './useEditorBorder';

interface CraftTextProps {
  text: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  lineHeight: number;
  marginBottom: number;
}

export const CraftText = ({ text, fontSize, fontWeight, color, textAlign, lineHeight, marginBottom }: CraftTextProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  return (
    <Typography
      ref={(ref: HTMLElement) => connect(drag(ref))}
      sx={{
        fontSize: `${fontSize}px`,
        fontWeight,
        color: color || 'text.primary',
        textAlign,
        lineHeight,
        mb: `${marginBottom}px`,
        width: '100%',
        whiteSpace: 'pre-wrap',
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

const TextSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftTextProps,
  }));

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Text
      </Typography>
      <TextField
        label="Text"
        size="small"
        multiline
        rows={3}
        value={props.text}
        onChange={(e) => setProp((p: CraftTextProps) => { p.text = e.target.value; })}
      />
      <TextField
        label="Velikost (px)"
        size="small"
        type="number"
        value={props.fontSize}
        onChange={(e) => setProp((p: CraftTextProps) => { p.fontSize = Number(e.target.value); })}
      />
      <FormControl size="small">
        <InputLabel>Tloušťka</InputLabel>
        <Select
          label="Tloušťka"
          value={props.fontWeight}
          onChange={(e) => setProp((p: CraftTextProps) => { p.fontWeight = Number(e.target.value); })}
        >
          <MenuItem value={300}>Tenký (300)</MenuItem>
          <MenuItem value={400}>Normální (400)</MenuItem>
          <MenuItem value={500}>Střední (500)</MenuItem>
          <MenuItem value={600}>Semi-bold (600)</MenuItem>
          <MenuItem value={700}>Tučný (700)</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Barva"
        size="small"
        value={props.color}
        onChange={(e) => setProp((p: CraftTextProps) => { p.color = e.target.value; })}
        placeholder="inherit, #333, text.secondary"
      />
      <FormControl size="small">
        <InputLabel>Zarovnání</InputLabel>
        <Select
          label="Zarovnání"
          value={props.textAlign}
          onChange={(e) => setProp((p: CraftTextProps) => { p.textAlign = e.target.value as CraftTextProps['textAlign']; })}
        >
          <MenuItem value="left">Vlevo</MenuItem>
          <MenuItem value="center">Na střed</MenuItem>
          <MenuItem value="right">Vpravo</MenuItem>
          <MenuItem value="justify">Do bloku</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Řádkování"
        size="small"
        type="number"
        inputProps={{ step: 0.1 }}
        value={props.lineHeight}
        onChange={(e) => setProp((p: CraftTextProps) => { p.lineHeight = Number(e.target.value); })}
      />
      <TextField
        label="Spodní okraj (px)"
        size="small"
        type="number"
        value={props.marginBottom}
        onChange={(e) => setProp((p: CraftTextProps) => { p.marginBottom = Number(e.target.value); })}
      />
    </Stack>
  );
};

CraftText.craft = {
  displayName: 'Text',
  props: {
    text: 'Zadejte text...',
    fontSize: 16,
    fontWeight: 400,
    color: '',
    textAlign: 'left',
    lineHeight: 1.6,
    marginBottom: 16,
  } as CraftTextProps,
  related: {
    settings: TextSettings,
  },
};
