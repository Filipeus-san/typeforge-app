import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';

interface ButtonNodeProps {
  text: string;
  href: string;
  variant: 'primary' | 'outline' | 'text';
  align: 'left' | 'center' | 'right';
}

export const ButtonNode: UserComponent<ButtonNodeProps> = ({ text, href, variant, align }) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({ selected: state.events.selected }));

  const buttonSx = variant === 'primary'
    ? {
        background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
        boxShadow: '0 4px 15px rgba(124,92,252,0.3)',
        borderRadius: 2.5,
        px: 4,
        py: 1.25,
        color: '#fff',
        '&:hover': { boxShadow: '0 6px 20px rgba(124,92,252,0.4)' },
      }
    : variant === 'outline'
    ? {
        borderRadius: 2.5,
        px: 4,
        py: 1.25,
        borderColor: 'primary.main',
        color: 'primary.main',
      }
    : {
        borderRadius: 2.5,
        px: 4,
        py: 1.25,
        color: 'primary.main',
      };

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
        py: 1,
        textAlign: align,
      }}
    >
      <Button
        variant={variant === 'primary' ? 'contained' : variant === 'outline' ? 'outlined' : 'text'}
        href={href || undefined}
        sx={buttonSx}
        onClick={(e) => { if (selected) e.preventDefault(); }}
      >
        {text}
      </Button>
    </Box>
  );
};

function ButtonSettings() {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props as ButtonNodeProps }));

  return (
    <Stack spacing={2}>
      <TextField
        label="Text tlačítka"
        size="small"
        value={props.text}
        onChange={(e) => setProp((p: ButtonNodeProps) => { p.text = e.target.value; })}
        fullWidth
      />
      <TextField
        label="Odkaz (URL)"
        size="small"
        value={props.href}
        onChange={(e) => setProp((p: ButtonNodeProps) => { p.href = e.target.value; })}
        fullWidth
        placeholder="/stranka nebo https://..."
      />
      <FormControl size="small" fullWidth>
        <InputLabel>Varianta</InputLabel>
        <Select
          label="Varianta"
          value={props.variant}
          onChange={(e) => setProp((p: ButtonNodeProps) => { p.variant = e.target.value as any; })}
        >
          <MenuItem value="primary">Primární (gradient)</MenuItem>
          <MenuItem value="outline">Obrys</MenuItem>
          <MenuItem value="text">Textový</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" fullWidth>
        <InputLabel>Zarovnání</InputLabel>
        <Select
          label="Zarovnání"
          value={props.align}
          onChange={(e) => setProp((p: ButtonNodeProps) => { p.align = e.target.value as any; })}
        >
          <MenuItem value="left">Vlevo</MenuItem>
          <MenuItem value="center">Na střed</MenuItem>
          <MenuItem value="right">Vpravo</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

ButtonNode.craft = {
  props: {
    text: 'Klikněte zde',
    href: '',
    variant: 'primary',
    align: 'left',
  } as ButtonNodeProps,
  displayName: 'Tlačítko',
  related: {
    settings: ButtonSettings,
  },
};
