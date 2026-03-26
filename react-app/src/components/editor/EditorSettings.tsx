import React from 'react';
import { useEditor } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export function EditorSettings() {
  const { selected, actions } = useEditor((state, query) => {
    const currentNodeId = state.events.selected ? Array.from(state.events.selected)[0] : undefined;
    let selectedData: { id: string; name: string; settings: any; isDeletable: boolean } | null = null;

    if (currentNodeId) {
      const node = state.nodes[currentNodeId];
      if (node) {
        selectedData = {
          id: currentNodeId,
          name: node.data.displayName || node.data.name || 'Blok',
          settings: node.related?.settings,
          isDeletable: query.node(currentNodeId).isDeletable(),
        };
      }
    }
    return { selected: selectedData };
  });

  if (!selected) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          Vyberte blok pro úpravu nastavení
        </Typography>
      </Box>
    );
  }

  const SettingsComponent = selected.settings;

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1 }}>
          {selected.name}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          {selected.isDeletable && (
            <IconButton
              size="small"
              onClick={() => { actions.delete(selected.id); }}
              sx={{ color: 'error.main', '&:hover': { bgcolor: 'rgba(239,68,68,0.1)' } }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {SettingsComponent ? (
        <SettingsComponent />
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Tento blok nemá žádná nastavení.
        </Typography>
      )}
    </Box>
  );
}
