import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';

interface ListNodeProps {
  items: string;
  listType: 'ul' | 'ol';
}

export const ListNode: UserComponent<ListNodeProps> = ({ items, listType }) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({ selected: state.events.selected }));

  const itemsList = items.split('\n').filter((i) => i.trim());

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
      <Box component={listType} sx={{ pl: 3, m: 0 }}>
        {itemsList.length > 0 ? (
          itemsList.map((item, i) => (
            <Box component="li" key={i} sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary', mb: 0.5 }}>
              {item}
            </Box>
          ))
        ) : (
          <Box component="li" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary', opacity: 0.5 }}>
            Položka seznamu...
          </Box>
        )}
      </Box>
    </Box>
  );
};

function ListSettings() {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props as ListNodeProps }));

  return (
    <Stack spacing={2}>
      <FormControl size="small" fullWidth>
        <InputLabel>Typ seznamu</InputLabel>
        <Select
          label="Typ seznamu"
          value={props.listType}
          onChange={(e) => setProp((p: ListNodeProps) => { p.listType = e.target.value as any; })}
        >
          <MenuItem value="ul">Odrážky</MenuItem>
          <MenuItem value="ol">Číslovaný</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Položky (jedna na řádek)"
        size="small"
        multiline
        rows={6}
        value={props.items}
        onChange={(e) => setProp((p: ListNodeProps) => { p.items = e.target.value; })}
        fullWidth
        placeholder={'Položka 1\nPoložka 2\nPoložka 3'}
      />
    </Stack>
  );
}

ListNode.craft = {
  props: {
    items: 'Položka 1\nPoložka 2\nPoložka 3',
    listType: 'ul',
  } as ListNodeProps,
  displayName: 'Seznam',
  related: {
    settings: ListSettings,
  },
};
