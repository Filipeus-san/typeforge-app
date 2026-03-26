import React, { useState, useEffect, useRef } from 'react';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import { useTheme } from '../../context/ThemeContext';
import { TextNode } from './nodes/TextNode';
import { ImageNode } from './nodes/ImageNode';
import { QuoteNode } from './nodes/QuoteNode';
import { DividerNode } from './nodes/DividerNode';
import { CodeNode } from './nodes/CodeNode';
import { ButtonNode } from './nodes/ButtonNode';
import { ContainerNode } from './nodes/ContainerNode';
import { ListNode } from './nodes/ListNode';
import { EditorToolbox } from './EditorToolbox';
import { EditorSettings } from './EditorSettings';
import { EditorTopbar } from './EditorTopbar';

const resolver = {
  TextNode,
  ImageNode,
  QuoteNode,
  DividerNode,
  CodeNode,
  ButtonNode,
  ContainerNode,
  ListNode,
};

interface CraftEditorProps {
  initialContent?: string;
  onContentChange?: (json: string) => void;
  allowFullscreen?: boolean;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

function EditorCanvas() {
  const { theme } = useTheme();
  const { connectors } = useEditor();
  const isMobile = useIsMobile();

  return (
    <Box
      ref={(ref: HTMLElement | null) => { if (ref) connectors.select(ref, ''); }}
      sx={{ flex: 1, overflow: 'auto' }}
    >
      <EditorTopbar />
      <Box
        sx={{
          p: isMobile ? 1.5 : { xs: 2, md: 4 },
          minHeight: isMobile ? 300 : 400,
          maxWidth: isMobile ? '100%' : 800,
          mx: 'auto',
        }}
      >
        <Frame>
          <Element
            is={ContainerNode}
            canvas
            padding={0}
            background="none"
            borderRadius={0}
          >
            <TextNode text="Začněte psát svůj článek..." variant="paragraph" textAlign="left" fontWeight={400} />
          </Element>
        </Frame>
      </Box>
    </Box>
  );
}

function SaveListener({ onContentChange }: { onContentChange?: (json: string) => void }) {
  const { query } = useEditor();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!onContentChange) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        const json = query.serialize();
        onContentChange(json);
      } catch {
        // ignore serialization errors during editing
      }
    }, 500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  });

  return null;
}

function LoadContent({ initialContent }: { initialContent?: string }) {
  const { actions } = useEditor();
  const loaded = useRef(false);

  useEffect(() => {
    if (initialContent && !loaded.current) {
      loaded.current = true;
      try {
        actions.deserialize(initialContent);
      } catch {
        // ignore invalid content — use default
      }
    }
  }, [initialContent, actions]);

  return null;
}

function EditorLayout({ fullscreen, onClose }: { fullscreen?: boolean; onClose?: () => void }) {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: fullscreen ? '100vh' : 'auto',
      }}
    >
      {/* Header bar */}
      {fullscreen && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 2,
            py: 1,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: theme === 'dark' ? 'rgba(15,15,23,0.95)' : 'background.paper',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Editor obsahu
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Stack>
      )}

      {/* Mobile toolbar - floating buttons for toolbox/settings drawers */}
      {isMobile && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            px: 1.5,
            py: 1,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: theme === 'dark' ? 'rgba(15,15,23,0.9)' : 'rgba(248,249,252,0.95)',
          }}
        >
          <IconButton
            onClick={() => setToolboxOpen(true)}
            size="small"
            sx={{
              bgcolor: 'rgba(124,92,252,0.1)',
              color: '#7c5cfc',
              borderRadius: 2,
              px: 1.5,
              '&:hover': { bgcolor: 'rgba(124,92,252,0.2)' },
            }}
          >
            <AddIcon fontSize="small" />
            <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 600, fontSize: '0.75rem' }}>Bloky</Typography>
          </IconButton>
          <IconButton
            onClick={() => setSettingsOpen(true)}
            size="small"
            sx={{
              bgcolor: 'rgba(124,92,252,0.1)',
              color: '#7c5cfc',
              borderRadius: 2,
              px: 1.5,
              '&:hover': { bgcolor: 'rgba(124,92,252,0.2)' },
            }}
          >
            <TuneIcon fontSize="small" />
            <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 600, fontSize: '0.75rem' }}>Nastavení</Typography>
          </IconButton>
        </Stack>
      )}

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          border: fullscreen ? 0 : 1,
          borderColor: 'divider',
          borderRadius: fullscreen ? 0 : 3,
          minHeight: fullscreen ? 0 : isMobile ? 350 : 500,
          bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.4)' : 'background.paper',
        }}
      >
        {/* Left sidebar — Toolbox (hidden on mobile, shown in drawer instead) */}
        {!isMobile && (
          <Box
            sx={{
              width: 200,
              flexShrink: 0,
              borderRight: 1,
              borderColor: 'divider',
              p: 2,
              overflowY: 'auto',
            }}
          >
            <EditorToolbox />
          </Box>
        )}

        {/* Center — Canvas */}
        <EditorCanvas />

        {/* Right sidebar — Settings (hidden on mobile, shown in drawer instead) */}
        {!isMobile && (
          <Box
            sx={{
              width: 260,
              flexShrink: 0,
              borderLeft: 1,
              borderColor: 'divider',
              p: 2,
              overflowY: 'auto',
              display: { xs: 'none', lg: 'block' },
            }}
          >
            <EditorSettings />
          </Box>
        )}
      </Box>

      {/* Mobile drawers */}
      {isMobile && (
        <>
          <Drawer
            anchor="bottom"
            open={toolboxOpen}
            onClose={() => setToolboxOpen(false)}
            PaperProps={{
              sx: {
                maxHeight: '60vh',
                borderRadius: '16px 16px 0 0',
                bgcolor: theme === 'dark' ? '#1a1a2e' : 'background.paper',
                p: 2,
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Přidat blok</Typography>
              <IconButton size="small" onClick={() => setToolboxOpen(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
            <EditorToolbox mobile onAdd={() => setToolboxOpen(false)} />
          </Drawer>

          <Drawer
            anchor="bottom"
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            PaperProps={{
              sx: {
                maxHeight: '60vh',
                borderRadius: '16px 16px 0 0',
                bgcolor: theme === 'dark' ? '#1a1a2e' : 'background.paper',
                p: 2,
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Nastavení bloku</Typography>
              <IconButton size="small" onClick={() => setSettingsOpen(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
            <EditorSettings />
          </Drawer>
        </>
      )}
    </Box>
  );
}

export function CraftEditor({ initialContent, onContentChange, allowFullscreen = true }: CraftEditorProps) {
  const { theme } = useTheme();
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <Editor resolver={resolver} enabled={true}>
      <LoadContent initialContent={initialContent} />
      <SaveListener onContentChange={onContentChange} />

      {/* Inline editor */}
      <Box sx={{ position: 'relative' }}>
        {allowFullscreen && (
          <IconButton
            onClick={() => setFullscreen(true)}
            size="small"
            title="Otevřít na celou obrazovku"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 10,
              bgcolor: theme === 'dark' ? 'rgba(124,92,252,0.15)' : 'rgba(124,92,252,0.08)',
              color: '#7c5cfc',
              '&:hover': { bgcolor: theme === 'dark' ? 'rgba(124,92,252,0.3)' : 'rgba(124,92,252,0.15)' },
            }}
          >
            <FullscreenIcon />
          </IconButton>
        )}
        {!fullscreen && <EditorLayout />}
      </Box>

      {/* Fullscreen modal */}
      <Dialog
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: theme === 'dark' ? '#0f0f17' : '#f8f9fc',
            backgroundImage: 'none',
          },
        }}
      >
        <EditorLayout fullscreen onClose={() => setFullscreen(false)} />
      </Dialog>
    </Editor>
  );
}
