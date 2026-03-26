import React from 'react';
import { useNode, Element, UserComponent } from '@craftjs/core';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface ContainerNodeProps {
  padding: number;
  background: 'none' | 'subtle' | 'paper' | 'gradient';
  borderRadius: number;
  children?: React.ReactNode;
}

const bgMap = {
  none: 'transparent',
  subtle: 'rgba(124,92,252,0.04)',
  paper: undefined, // uses theme paper
  gradient: 'linear-gradient(135deg, rgba(124,92,252,0.08), rgba(6,214,160,0.06))',
};

export const ContainerNode: UserComponent<ContainerNodeProps> = ({ padding, background, borderRadius, children }) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({ selected: state.events.selected }));

  const bgValue = background === 'paper' ? undefined : bgMap[background];

  return (
    <Box
      ref={(ref: HTMLElement | null) => { if (ref) connect(drag(ref)); }}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        outline: selected ? '2px solid' : '2px solid transparent',
        outlineColor: selected ? 'primary.main' : 'transparent',
        outlineOffset: 4,
        transition: 'outline-color 0.15s',
        '&:hover': { outlineColor: selected ? 'primary.main' : 'rgba(124,92,252,0.3)' },
        p: padding,
        borderRadius: borderRadius / 8,
        ...(background === 'paper'
          ? { bgcolor: 'background.paper', border: 1, borderColor: 'divider' }
          : bgValue !== 'transparent'
          ? { background: bgValue }
          : {}),
        minHeight: 60,
      }}
    >
      {children}
    </Box>
  );
};

function ContainerSettings() {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props as ContainerNodeProps }));

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>Vnitřní odsazení</Typography>
        <Box sx={{ px: 1 }}>
          <input
            type="range"
            min={0}
            max={8}
            value={props.padding}
            onChange={(e) => setProp((p: ContainerNodeProps) => { p.padding = Number(e.target.value); })}
            style={{ width: '100%' }}
          />
        </Box>
      </Box>
      <FormControl size="small" fullWidth>
        <InputLabel>Pozadí</InputLabel>
        <Select
          label="Pozadí"
          value={props.background}
          onChange={(e) => setProp((p: ContainerNodeProps) => { p.background = e.target.value as any; })}
        >
          <MenuItem value="none">Žádné</MenuItem>
          <MenuItem value="subtle">Jemné</MenuItem>
          <MenuItem value="paper">Karta</MenuItem>
          <MenuItem value="gradient">Gradient</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>Zaoblení rohů</Typography>
        <Box sx={{ px: 1 }}>
          <input
            type="range"
            min={0}
            max={32}
            value={props.borderRadius}
            onChange={(e) => setProp((p: ContainerNodeProps) => { p.borderRadius = Number(e.target.value); })}
            style={{ width: '100%' }}
          />
        </Box>
      </Box>
    </Stack>
  );
}

ContainerNode.craft = {
  props: {
    padding: 2,
    background: 'none',
    borderRadius: 0,
  } as ContainerNodeProps,
  displayName: 'Kontejner',
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: ContainerSettings,
  },
};
