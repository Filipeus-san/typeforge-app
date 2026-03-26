import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';

interface DividerNodeProps {
  spacing: 'sm' | 'md' | 'lg';
  style: 'solid' | 'dashed' | 'gradient';
}

const spacingMap = { sm: 2, md: 4, lg: 6 };

export const DividerNode: UserComponent<DividerNodeProps> = ({ spacing, style }) => {
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
        py: spacingMap[spacing],
      }}
    >
      {style === 'gradient' ? (
        <Box sx={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(124,92,252,0.5), rgba(6,214,160,0.5), transparent)', borderRadius: 1 }} />
      ) : (
        <Divider sx={style === 'dashed' ? { borderStyle: 'dashed' } : {}} />
      )}
    </Box>
  );
};

function DividerSettings() {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props as DividerNodeProps }));

  return (
    <Stack spacing={2}>
      <FormControl size="small" fullWidth>
        <InputLabel>Odsazení</InputLabel>
        <Select
          label="Odsazení"
          value={props.spacing}
          onChange={(e) => setProp((p: DividerNodeProps) => { p.spacing = e.target.value as any; })}
        >
          <MenuItem value="sm">Malé</MenuItem>
          <MenuItem value="md">Střední</MenuItem>
          <MenuItem value="lg">Velké</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" fullWidth>
        <InputLabel>Styl</InputLabel>
        <Select
          label="Styl"
          value={props.style}
          onChange={(e) => setProp((p: DividerNodeProps) => { p.style = e.target.value as any; })}
        >
          <MenuItem value="solid">Plná čára</MenuItem>
          <MenuItem value="dashed">Čárkovaná</MenuItem>
          <MenuItem value="gradient">Gradient</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

DividerNode.craft = {
  props: {
    spacing: 'md',
    style: 'solid',
  } as DividerNodeProps,
  displayName: 'Oddělovač',
  related: {
    settings: DividerSettings,
  },
};
