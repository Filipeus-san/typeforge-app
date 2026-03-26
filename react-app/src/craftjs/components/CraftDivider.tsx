import React from 'react';
import { useNode } from '@craftjs/core';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEditorBorder } from './useEditorBorder';

interface CraftDividerProps {
  marginTop: number;
  marginBottom: number;
}

export const CraftDivider = ({ marginTop, marginBottom }: CraftDividerProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      sx={{ mt: `${marginTop}px`, mb: `${marginBottom}px`, width: '100%', border: borderStyle, transition: 'border 0.15s ease', cursor: 'pointer', p: '4px' }}
    >
      <Divider />
    </Box>
  );
};

const DividerSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftDividerProps,
  }));

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Oddělovač
      </Typography>
      <TextField
        label="Horní okraj (px)"
        size="small"
        type="number"
        value={props.marginTop}
        onChange={(e) => setProp((p: CraftDividerProps) => { p.marginTop = Number(e.target.value); })}
      />
      <TextField
        label="Spodní okraj (px)"
        size="small"
        type="number"
        value={props.marginBottom}
        onChange={(e) => setProp((p: CraftDividerProps) => { p.marginBottom = Number(e.target.value); })}
      />
    </Stack>
  );
};

CraftDivider.craft = {
  displayName: 'Oddělovač',
  props: {
    marginTop: 16,
    marginBottom: 16,
  } as CraftDividerProps,
  related: {
    settings: DividerSettings,
  },
};
