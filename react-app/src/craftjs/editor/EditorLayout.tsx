import React, { useState } from 'react';
import { useEditor } from '@craftjs/core';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import WidgetsIcon from '@mui/icons-material/Widgets';
import TuneIcon from '@mui/icons-material/Tune';
import { useTheme } from '../../context/ThemeContext';
import { EditorToolbox } from './EditorToolbox';
import { EditorSettings } from './EditorSettings';

interface EditorLayoutProps {
  children: React.ReactNode;
}

export function EditorLayout({ children }: EditorLayoutProps) {
  const muiTheme = useMuiTheme();
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up('md'));
  const { theme } = useTheme();
  const [mobileTab, setMobileTab] = useState(0);

  const { hasSelection } = useEditor((state) => ({
    hasSelection: state.events.selected ? state.events.selected.size > 0 : false,
  }));

  const paperBg = theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper';

  if (isDesktop) {
    return (
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Paper
          elevation={0}
          sx={{
            width: 900,
            flexShrink: 0,
            minHeight: 400,
            border: 1,
            borderColor: 'divider',
            borderRadius: 4,
            bgcolor: paperBg,
            overflow: 'auto',
            p: 2,
          }}
        >
          {children}
        </Paper>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            minWidth: 310,
            border: 1,
            borderColor: 'divider',
            borderRadius: 4,
            bgcolor: paperBg,
            overflow: 'auto',
            maxHeight: 'calc(100vh - 180px)',
          }}
        >
          <Box sx={{ p: 2 }}>
            <EditorToolbox />
          </Box>
          <Divider />
          <EditorSettings />
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: '16px 16px 0 0',
          border: 1,
          borderColor: 'divider',
          bgcolor: paperBg,
          position: 'sticky',
          top: 56,
          zIndex: 10,
        }}
      >
        <Tabs
          value={mobileTab}
          onChange={(_, v) => setMobileTab(v)}
          variant="fullWidth"
          sx={{
            minHeight: 48,
            '& .MuiTab-root': {
              minHeight: 48,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.8rem',
            },
          }}
        >
          <Tab icon={<ViewQuiltIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Plátno" />
          <Tab icon={<WidgetsIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Komponenty" />
          <Tab
            icon={
              hasSelection
                ? <Badge color="primary" variant="dot"><TuneIcon sx={{ fontSize: 18 }} /></Badge>
                : <TuneIcon sx={{ fontSize: 18 }} />
            }
            iconPosition="start"
            label="Nastavení"
          />
        </Tabs>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          border: 1,
          borderTop: 0,
          borderColor: 'divider',
          borderRadius: '0 0 16px 16px',
          bgcolor: paperBg,
          minHeight: 300,
        }}
      >
        <Box sx={{ p: 1.5, display: mobileTab === 0 ? 'block' : 'none' }}>
          <Box sx={{ p: 1 }}>
            {children}
          </Box>
        </Box>

        {mobileTab === 1 && (
          <Box sx={{ p: 2 }}>
            <EditorToolbox mobile />
          </Box>
        )}

        {mobileTab === 2 && (
          <EditorSettings />
        )}
      </Paper>
    </Box>
  );
}
