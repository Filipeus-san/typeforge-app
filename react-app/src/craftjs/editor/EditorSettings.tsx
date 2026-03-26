import React from 'react';
import { useEditor } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export function EditorSettings() {
  const { selected, actions, query } = useEditor((state, query) => {
    const selectedIds = state.events.selected;
    const currentNodeId = selectedIds ? Array.from(selectedIds)[0] : undefined;
    let selected;
    if (currentNodeId && state.nodes[currentNodeId]) {
      const node = state.nodes[currentNodeId];
      selected = {
        id: currentNodeId,
        name: node.data.displayName || node.data.name || 'Komponenta',
        settings: node.related && node.related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
        parent: node.data.parent,
      };
    }
    return { selected };
  });

  if (!selected) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          Klikněte na komponentu pro úpravu vlastností
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {selected.name}
        </Typography>
        {selected.parent && (
          <Button
            size="small"
            sx={{ minWidth: 0, p: 0.5, color: 'text.secondary' }}
            onClick={() => {
              actions.selectNode(selected.parent!);
            }}
          >
            <ArrowUpwardIcon fontSize="small" />
          </Button>
        )}
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        {selected.settings && React.createElement(selected.settings)}
      </Box>
      {selected.isDeletable && (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              size="small"
              color="error"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => actions.delete(selected.id)}
              sx={{ borderRadius: 2 }}
            >
              Smazat komponentu
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
