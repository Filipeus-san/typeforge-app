import React from 'react';
import { useEditor } from '@craftjs/core';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

export function EditorTopbar() {
  const { canUndo, canRedo, actions, nodeCount } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
    nodeCount: Object.keys(state.nodes).length - 1, // exclude ROOT
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'rgba(124,92,252,0.03)',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip
          label={`${nodeCount} ${nodeCount === 1 ? 'blok' : nodeCount < 5 ? 'bloky' : 'bloků'}`}
          size="small"
          sx={{ bgcolor: 'rgba(124,92,252,0.1)', color: 'primary.main', fontWeight: 600, fontSize: '0.75rem' }}
        />
      </Stack>

      <Stack direction="row" spacing={0.5}>
        <Tooltip title="Zpět (Ctrl+Z)">
          <span>
            <IconButton
              size="small"
              disabled={!canUndo}
              onClick={() => actions.history.undo()}
              sx={{ color: 'text.secondary' }}
            >
              <UndoIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Vpřed (Ctrl+Y)">
          <span>
            <IconButton
              size="small"
              disabled={!canRedo}
              onClick={() => actions.history.redo()}
              sx={{ color: 'text.secondary' }}
            >
              <RedoIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Box>
  );
}
