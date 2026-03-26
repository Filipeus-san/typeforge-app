import React from 'react';
import { useNode, Element } from '@craftjs/core';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { useEditorBorder } from './useEditorBorder';

interface CraftContainerProps {
  background: string;
  padding: number;
  borderRadius: number;
  flexDirection: 'column' | 'row';
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap: number;
  minHeight: number;
  children?: React.ReactNode;
}

export const CraftContainer = ({
  background,
  padding,
  borderRadius,
  flexDirection,
  alignItems,
  gap,
  minHeight,
  children,
}: CraftContainerProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      sx={{
        display: 'flex',
        flexDirection,
        alignItems,
        gap: `${gap}px`,
        background: background || 'transparent',
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
        minHeight: minHeight > 0 ? `${minHeight}px` : 'auto',
        minWidth: 0,
        width: '100%',
        border: borderStyle,
        transition: 'border 0.15s ease',
        cursor: 'pointer',
      }}
    >
      {children}
    </Box>
  );
};

const ContainerSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftContainerProps,
  }));

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Kontejner
      </Typography>
      <TextField
        label="Pozadí"
        size="small"
        value={props.background}
        onChange={(e) => setProp((p: CraftContainerProps) => { p.background = e.target.value; })}
        placeholder="transparent, #fff, rgba(...)"
      />
      <TextField
        label="Padding (px)"
        size="small"
        type="number"
        value={props.padding}
        onChange={(e) => setProp((p: CraftContainerProps) => { p.padding = Number(e.target.value); })}
      />
      <TextField
        label="Zaoblení (px)"
        size="small"
        type="number"
        value={props.borderRadius}
        onChange={(e) => setProp((p: CraftContainerProps) => { p.borderRadius = Number(e.target.value); })}
      />
      <FormControl size="small">
        <InputLabel>Směr</InputLabel>
        <Select
          label="Směr"
          value={props.flexDirection}
          onChange={(e) => setProp((p: CraftContainerProps) => { p.flexDirection = e.target.value as 'column' | 'row'; })}
        >
          <MenuItem value="column">Sloupec</MenuItem>
          <MenuItem value="row">Řádek</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>Zarovnání</InputLabel>
        <Select
          label="Zarovnání"
          value={props.alignItems}
          onChange={(e) => setProp((p: CraftContainerProps) => { p.alignItems = e.target.value as CraftContainerProps['alignItems']; })}
        >
          <MenuItem value="stretch">Stretch</MenuItem>
          <MenuItem value="flex-start">Začátek</MenuItem>
          <MenuItem value="center">Střed</MenuItem>
          <MenuItem value="flex-end">Konec</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Mezera (px)"
        size="small"
        type="number"
        value={props.gap}
        onChange={(e) => setProp((p: CraftContainerProps) => { p.gap = Number(e.target.value); })}
      />
      <TextField
        label="Min. výška (px)"
        size="small"
        type="number"
        value={props.minHeight}
        onChange={(e) => setProp((p: CraftContainerProps) => { p.minHeight = Number(e.target.value); })}
      />
    </Stack>
  );
};

CraftContainer.craft = {
  displayName: 'Kontejner',
  props: {
    background: 'transparent',
    padding: 16,
    borderRadius: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 8,
    minHeight: 0,
  } as CraftContainerProps,
  rules: {
    canMoveIn: () => true,
  },
  related: {
    settings: ContainerSettings,
  },
};
