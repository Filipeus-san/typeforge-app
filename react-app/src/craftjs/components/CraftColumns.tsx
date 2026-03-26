import React from 'react';
import { useNode, Element } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { CraftContainer } from './CraftContainer';
import { useEditorBorder } from './useEditorBorder';

interface CraftColumnsProps {
  columns: 2 | 3;
  gap: number;
  marginBottom: number;
}

export const CraftColumns = ({ columns, gap, marginBottom }: CraftColumnsProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  const cols = [];
  for (let i = 0; i < columns; i++) {
    cols.push(
      <Element
        key={`col_${i}`}
        id={`col_${i}`}
        is={CraftContainer}
        canvas
        background="transparent"
        padding={8}
        borderRadius={0}
        flexDirection="column"
        alignItems="stretch"
        gap={8}
        minHeight={60}
      />
    );
  }

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        mb: `${marginBottom}px`,
        width: '100%',
        border: borderStyle,
        transition: 'border 0.15s ease',
        cursor: 'pointer',
      }}
    >
      {cols}
    </Box>
  );
};

const ColumnsSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftColumnsProps,
  }));

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Sloupce
      </Typography>
      <FormControl size="small">
        <InputLabel>Počet sloupců</InputLabel>
        <Select
          label="Počet sloupců"
          value={props.columns}
          onChange={(e) => setProp((p: CraftColumnsProps) => { p.columns = Number(e.target.value) as 2 | 3; })}
        >
          <MenuItem value={2}>2 sloupce</MenuItem>
          <MenuItem value={3}>3 sloupce</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Mezera (px)"
        size="small"
        type="number"
        value={props.gap}
        onChange={(e) => setProp((p: CraftColumnsProps) => { p.gap = Number(e.target.value); })}
      />
      <TextField
        label="Spodní okraj (px)"
        size="small"
        type="number"
        value={props.marginBottom}
        onChange={(e) => setProp((p: CraftColumnsProps) => { p.marginBottom = Number(e.target.value); })}
      />
    </Stack>
  );
};

CraftColumns.craft = {
  displayName: 'Sloupce',
  props: {
    columns: 2,
    gap: 24,
    marginBottom: 24,
  } as CraftColumnsProps,
  related: {
    settings: ColumnsSettings,
  },
};
