import React from 'react';
import { useNode } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEditorBorder } from './useEditorBorder';

interface CraftSpacerProps {
  height: number;
}

export const CraftSpacer = ({ height }: CraftSpacerProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      sx={{
        height: `${height}px`,
        width: '100%',
        border: borderStyle,
        transition: 'border 0.15s ease',
        cursor: 'pointer',
      }}
    />
  );
};

const SpacerSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftSpacerProps,
  }));

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Mezera
      </Typography>
      <TextField
        label="Výška (px)"
        size="small"
        type="number"
        value={props.height}
        onChange={(e) => setProp((p: CraftSpacerProps) => { p.height = Number(e.target.value); })}
      />
    </Stack>
  );
};

CraftSpacer.craft = {
  displayName: 'Mezera',
  props: {
    height: 32,
  } as CraftSpacerProps,
  related: {
    settings: SpacerSettings,
  },
};
