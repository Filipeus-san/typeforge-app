import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface CodeNodeProps {
  code: string;
  language: string;
}

export const CodeNode: UserComponent<CodeNodeProps> = ({ code, language }) => {
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
        py: 0.5,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        {language && (
          <Box sx={{ px: 2.5, py: 0.75, bgcolor: 'rgba(124,92,252,0.08)', borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 600, fontFamily: 'monospace' }}>
              {language}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            p: 2.5,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: '0.9rem',
            overflowX: 'auto',
          }}
        >
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{code || '// Kód zde...'}</pre>
        </Box>
      </Paper>
    </Box>
  );
};

function CodeSettings() {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props as CodeNodeProps }));

  return (
    <Stack spacing={2}>
      <TextField
        label="Jazyk"
        size="small"
        value={props.language}
        onChange={(e) => setProp((p: CodeNodeProps) => { p.language = e.target.value; })}
        fullWidth
        placeholder="javascript, python, html..."
      />
      <TextField
        label="Kód"
        size="small"
        multiline
        rows={8}
        value={props.code}
        onChange={(e) => setProp((p: CodeNodeProps) => { p.code = e.target.value; })}
        fullWidth
        slotProps={{
          input: {
            sx: { fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '0.85rem' },
          },
        }}
      />
    </Stack>
  );
}

CodeNode.craft = {
  props: {
    code: '',
    language: '',
  } as CodeNodeProps,
  displayName: 'Kód',
  related: {
    settings: CodeSettings,
  },
};
