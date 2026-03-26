import React from 'react';
import { useEditor, Element } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CodeIcon from '@mui/icons-material/Code';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { TextNode } from './nodes/TextNode';
import { ImageNode } from './nodes/ImageNode';
import { QuoteNode } from './nodes/QuoteNode';
import { DividerNode } from './nodes/DividerNode';
import { CodeNode } from './nodes/CodeNode';
import { ButtonNode } from './nodes/ButtonNode';
import { ContainerNode } from './nodes/ContainerNode';
import { ListNode } from './nodes/ListNode';

interface ToolboxItem {
  label: string;
  icon: React.ReactNode;
  element: React.ReactElement;
}

interface EditorToolboxProps {
  mobile?: boolean;
  onAdd?: () => void;
}

const toolboxItems: ToolboxItem[] = [
  {
    label: 'Text',
    icon: <TextFieldsIcon sx={{ fontSize: 20 }} />,
    element: <TextNode text="Nový textový blok" variant="paragraph" textAlign="left" fontWeight={400} />,
  },
  {
    label: 'Nadpis',
    icon: <Typography sx={{ fontWeight: 800, fontSize: 16, lineHeight: 1 }}>H</Typography>,
    element: <TextNode text="Nadpis" variant="h2" textAlign="left" fontWeight={800} />,
  },
  {
    label: 'Obrázek',
    icon: <ImageIcon sx={{ fontSize: 20 }} />,
    element: <ImageNode src="" alt="" caption="" maxWidth="full" borderRadius={12} />,
  },
  {
    label: 'Citát',
    icon: <FormatQuoteIcon sx={{ fontSize: 20 }} />,
    element: <QuoteNode text="Zadejte citát..." author="" />,
  },
  {
    label: 'Seznam',
    icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
    element: <ListNode items={'Položka 1\nPoložka 2\nPoložka 3'} listType="ul" />,
  },
  {
    label: 'Kód',
    icon: <CodeIcon sx={{ fontSize: 20 }} />,
    element: <CodeNode code="" language="" />,
  },
  {
    label: 'Tlačítko',
    icon: <SmartButtonIcon sx={{ fontSize: 20 }} />,
    element: <ButtonNode text="Klikněte zde" href="" variant="primary" align="left" />,
  },
  {
    label: 'Oddělovač',
    icon: <HorizontalRuleIcon sx={{ fontSize: 20 }} />,
    element: <DividerNode spacing="md" style="solid" />,
  },
  {
    label: 'Kontejner',
    icon: <ViewColumnIcon sx={{ fontSize: 20 }} />,
    element: <Element is={ContainerNode} canvas padding={2} background="none" borderRadius={0} />,
  },
];

export function EditorToolbox({ mobile, onAdd }: EditorToolboxProps = {}) {
  const { connectors, query, actions } = useEditor();

  const handleAdd = (item: ToolboxItem) => {
    try {
      const rootNodeId = 'ROOT';
      const rootNode = query.node(rootNodeId).get();
      // Find the first canvas node (the root container)
      const canvasNodeId = rootNode.data.nodes?.[0] || rootNodeId;

      const nodeTree = query.parseReactElement(item.element).toNodeTree();
      actions.addNodeTree(nodeTree, canvasNodeId);
      onAdd?.();
    } catch {
      // fallback: ignore if adding fails
    }
  };

  return (
    <Box>
      {!mobile && (
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1 }}>
          Bloky
        </Typography>
      )}
      <Stack spacing={0.5}>
        {toolboxItems.map((item) => (
          <Box
            key={item.label}
            ref={!mobile ? (ref: HTMLElement | null) => { if (ref) connectors.create(ref, item.element); } : undefined}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 1.5,
              py: 1,
              borderRadius: 2,
              cursor: mobile ? 'default' : 'grab',
              transition: 'all 0.15s',
              '&:hover': {
                bgcolor: 'rgba(124,92,252,0.08)',
                ...(!mobile && { transform: 'translateX(2px)' }),
              },
              '&:active': mobile ? {} : {
                cursor: 'grabbing',
                bgcolor: 'rgba(124,92,252,0.15)',
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(124,92,252,0.1)',
                color: 'primary.main',
                flexShrink: 0,
              }}
            >
              {item.icon}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem', flex: 1 }}>
              {item.label}
            </Typography>
            {mobile && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                onClick={() => handleAdd(item)}
                sx={{
                  flexShrink: 0,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  px: 1.5,
                  py: 0.5,
                  minWidth: 'auto',
                  borderColor: 'rgba(124,92,252,0.3)',
                  color: '#7c5cfc',
                  '&:hover': {
                    bgcolor: 'rgba(124,92,252,0.1)',
                    borderColor: '#7c5cfc',
                  },
                }}
              >
                Přidat
              </Button>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
