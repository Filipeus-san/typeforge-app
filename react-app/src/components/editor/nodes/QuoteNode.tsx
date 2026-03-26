import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

interface QuoteNodeProps {
  text: string;
  author: string;
}

export const QuoteNode: UserComponent<QuoteNodeProps> = ({ text, author }) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
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
        py: 0.5,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          borderLeft: 4,
          borderLeftColor: 'primary.main',
          borderRadius: '0 12px 12px 0',
          p: 2.5,
          fontStyle: 'italic',
        }}
      >
        <Typography
          sx={{ color: 'text.primary' }}
          contentEditable={selected}
          suppressContentEditableWarning
          onBlur={(e: React.FocusEvent<HTMLElement>) => {
            setProp((p: QuoteNodeProps) => { p.text = e.currentTarget.textContent || ''; });
          }}
        >
          {text ? `"${text}"` : '"Zadejte citát..."'}
        </Typography>
        {author && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, fontStyle: 'normal' }}>
            — {author}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

function QuoteSettings() {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props as QuoteNodeProps }));

  return (
    <Stack spacing={2}>
      <TextField
        label="Citát"
        size="small"
        multiline
        rows={3}
        value={props.text}
        onChange={(e) => setProp((p: QuoteNodeProps) => { p.text = e.target.value; })}
        fullWidth
      />
      <TextField
        label="Autor"
        size="small"
        value={props.author}
        onChange={(e) => setProp((p: QuoteNodeProps) => { p.author = e.target.value; })}
        fullWidth
      />
    </Stack>
  );
}

QuoteNode.craft = {
  props: {
    text: 'Zadejte citát...',
    author: '',
  } as QuoteNodeProps,
  displayName: 'Citát',
  related: {
    settings: QuoteSettings,
  },
};
