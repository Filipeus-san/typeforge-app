import React from 'react';
import { useEditor } from '@craftjs/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

interface EditorTopbarProps {
  onSave: (json: string) => void;
}

export function EditorTopbar({ onSave }: EditorTopbarProps) {
  const { query, canUndo, canRedo, actions } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  const handleSave = () => {
    const json = query.serialize();
    onSave(json);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title="Zpět">
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
      <Tooltip title="Vpřed">
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
      <Button
        variant="contained"
        size="small"
        startIcon={<SaveIcon />}
        onClick={handleSave}
        sx={{
          ml: 1,
          background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
          boxShadow: '0 4px 15px rgba(124,92,252,0.3)',
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(124,92,252,0.4)' },
        }}
      >
        Uložit
      </Button>
    </Box>
  );
}
