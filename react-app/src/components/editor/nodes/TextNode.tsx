import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

type TextVariant = 'paragraph' | 'h1' | 'h2' | 'h3' | 'h4' | 'lead';

interface TextNodeProps {
  text: string;
  variant: TextVariant;
  textAlign: 'left' | 'center' | 'right';
  fontWeight: number;
}

const variantMap: Record<TextVariant, { component: string; sx: Record<string, unknown> }> = {
  h1: { component: 'h1', sx: { fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, lineHeight: 1.2 } },
  h2: { component: 'h2', sx: { fontSize: { xs: '1.6rem', md: '2.2rem' }, fontWeight: 800, lineHeight: 1.3 } },
  h3: { component: 'h3', sx: { fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 700, lineHeight: 1.3 } },
  h4: { component: 'h4', sx: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.4 } },
  paragraph: { component: 'p', sx: { fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary' } },
  lead: {
    component: 'p',
    sx: { fontSize: '1.2rem', lineHeight: 1.7, color: 'text.secondary', borderLeft: 3, borderColor: 'primary.main', pl: 2 },
  },
};

export const TextNode: UserComponent<TextNodeProps> = ({ text, variant, textAlign, fontWeight }) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({ selected: state.events.selected }));

  const config = variantMap[variant];

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
      }}
    >
      <Typography
        component={config.component as any}
        sx={{ ...config.sx, textAlign, fontWeight: (fontWeight || config.sx.fontWeight) as number, m: 0 }}
        contentEditable={selected}
        suppressContentEditableWarning
        onBlur={(e: React.FocusEvent<HTMLElement>) => {
          setProp((props: TextNodeProps) => { props.text = e.currentTarget.textContent || ''; });
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

function TextSettings() {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props as TextNodeProps }));

  return (
    <Stack spacing={2}>
      <TextField
        label="Text"
        multiline
        rows={3}
        size="small"
        value={props.text}
        onChange={(e) => setProp((p: TextNodeProps) => { p.text = e.target.value; })}
        fullWidth
      />
      <FormControl size="small" fullWidth>
        <InputLabel>Typ</InputLabel>
        <Select
          label="Typ"
          value={props.variant}
          onChange={(e) => setProp((p: TextNodeProps) => { p.variant = e.target.value as TextVariant; })}
        >
          <MenuItem value="h1">Nadpis H1</MenuItem>
          <MenuItem value="h2">Nadpis H2</MenuItem>
          <MenuItem value="h3">Nadpis H3</MenuItem>
          <MenuItem value="h4">Nadpis H4</MenuItem>
          <MenuItem value="paragraph">Odstavec</MenuItem>
          <MenuItem value="lead">Perex</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" fullWidth>
        <InputLabel>Zarovnání</InputLabel>
        <Select
          label="Zarovnání"
          value={props.textAlign}
          onChange={(e) => setProp((p: TextNodeProps) => { p.textAlign = e.target.value as any; })}
        >
          <MenuItem value="left">Vlevo</MenuItem>
          <MenuItem value="center">Na střed</MenuItem>
          <MenuItem value="right">Vpravo</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>Tloušťka písma</Typography>
        <Slider
          size="small"
          value={props.fontWeight}
          onChange={(_, val) => setProp((p: TextNodeProps) => { p.fontWeight = val as number; })}
          min={300}
          max={900}
          step={100}
          marks
          valueLabelDisplay="auto"
        />
      </Box>
    </Stack>
  );
}

TextNode.craft = {
  props: {
    text: 'Nový textový blok',
    variant: 'paragraph',
    textAlign: 'left',
    fontWeight: 400,
  } as TextNodeProps,
  displayName: 'Text',
  related: {
    settings: TextSettings,
  },
};
