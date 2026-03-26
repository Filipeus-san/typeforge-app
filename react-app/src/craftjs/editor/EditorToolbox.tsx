import React, { useState } from 'react';
import { useEditor, Element } from '@craftjs/core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TitleIcon from '@mui/icons-material/Title';
import ImageIcon from '@mui/icons-material/Image';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CampaignIcon from '@mui/icons-material/Campaign';

import { CraftText } from '../components/CraftText';
import { CraftHeading } from '../components/CraftHeading';
import { CraftImage } from '../components/CraftImage';
import { CraftButton } from '../components/CraftButton';
import { CraftContainer } from '../components/CraftContainer';
import { CraftColumns } from '../components/CraftColumns';
import { CraftSpacer } from '../components/CraftSpacer';
import { CraftDivider } from '../components/CraftDivider';
import { CraftHero } from '../components/CraftHero';
import { CraftFeatures } from '../components/CraftFeatures';
import { CraftTestimonials } from '../components/CraftTestimonials';
import { CraftCta } from '../components/CraftCta';

const tools = [
  { label: 'Text', icon: <TextFieldsIcon />, element: <CraftText text="Zadejte text..." fontSize={16} fontWeight={400} color="" textAlign="left" lineHeight={1.6} marginBottom={16} /> },
  { label: 'Nadpis', icon: <TitleIcon />, element: <CraftHeading text="Nadpis" level={2} textAlign="left" color="" marginBottom={24} /> },
  { label: 'Obrázek', icon: <ImageIcon />, element: <CraftImage src="" alt="" width="100%" borderRadius={0} objectFit="cover" marginBottom={16} /> },
  { label: 'Tlačítko', icon: <SmartButtonIcon />, element: <CraftButton text="Klikněte zde" href="#" variant="contained" color="primary" size="medium" fullWidth={false} textAlign="center" marginBottom={16} /> },
  { label: 'Kontejner', icon: <ViewStreamIcon />, element: <Element is={CraftContainer} canvas background="transparent" padding={16} borderRadius={0} flexDirection="column" alignItems="stretch" gap={8} minHeight={0} /> },
  { label: 'Sloupce', icon: <ViewColumnIcon />, element: <CraftColumns columns={2} gap={24} marginBottom={24} /> },
  { label: 'Mezera', icon: <SpaceBarIcon />, element: <CraftSpacer height={32} /> },
  { label: 'Oddělovač', icon: <HorizontalRuleIcon />, element: <CraftDivider marginTop={16} marginBottom={16} /> },
  { label: 'Hero', icon: <RocketLaunchIcon />, element: <CraftHero badge="Lorem Ipsum" showBadge={true} titleLine1="Nadpis" titleLine2="Gradient text" description="Popis sekce..." primaryButtonText="Začít" primaryButtonHref="#" showPrimaryButton={true} secondaryButtonText="Více" secondaryButtonHref="#" showSecondaryButton={true} paddingTop={80} paddingBottom={80} /> },
  { label: 'Features', icon: <GridViewIcon />, element: <CraftFeatures sectionBadge="FEATURES" sectionTitle="Naše služby" sectionDescription="Nabízíme širokou škálu služeb." feature1Title="Rychlost" feature1Desc="Bleskově rychlé řešení." feature2Title="Bezpečnost" feature2Desc="Maximální zabezpečení." feature3Title="Růst" feature3Desc="Nástroje pro růst." feature4Title="Design" feature4Desc="Elegantní design." /> },
  { label: 'Reference', icon: <FormatQuoteIcon />, element: <CraftTestimonials sectionBadge="REFERENCE" sectionTitle="Co říkají klienti" sectionDescription="Zkušenosti našich zákazníků." t1Text="Skvělá spolupráce." t1Name="Jan Novák" t1Role="CEO" t1Initials="JN" t2Text="Rychlé dodání." t2Name="Marie S." t2Role="CTO" t2Initials="MS" t3Text="Výborná kvalita." t3Name="Petr D." t3Role="Developer" t3Initials="PD" /> },
  { label: 'CTA', icon: <CampaignIcon />, element: <CraftCta title="Připraveni začít?" description="Kontaktujte nás ještě dnes." buttonText="Začít" buttonHref="#" /> },
];

interface EditorToolboxProps {
  mobile?: boolean;
}

export function EditorToolbox({ mobile }: EditorToolboxProps = {}) {
  const { connectors, query, actions } = useEditor();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (selectedIndex === null) return;
    try {
      const tool = tools[selectedIndex];
      const nodeTree = query.parseReactElement(tool.element).toNodeTree();
      actions.addNodeTree(nodeTree, 'ROOT');
    } catch {
      // ignore if adding fails
    }
  };

  return (
    <Box>
      <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, px: 1, mb: 1, display: 'block' }}>
        Komponenty
      </Typography>
      <Grid container spacing={1}>
        {tools.map((tool, index) => {
          const isSelected = mobile && selectedIndex === index;
          return (
            <Grid size={{ xs: 6 }} key={tool.label}>
              <Paper
                ref={!mobile ? (ref: HTMLDivElement | null) => { if (ref) connectors.create(ref, tool.element); } : undefined}
                elevation={0}
                onClick={mobile ? () => setSelectedIndex(index) : undefined}
                sx={{
                  p: 1.5,
                  cursor: mobile ? 'pointer' : 'grab',
                  textAlign: 'center',
                  border: 2,
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                  transition: 'all 0.15s',
                  bgcolor: isSelected ? 'rgba(124,92,252,0.1)' : 'transparent',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                  WebkitTouchCallout: 'none',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(124,92,252,0.06)',
                  },
                  '&:active': {
                    transform: 'scale(0.97)',
                    bgcolor: 'rgba(124,92,252,0.1)',
                  },
                }}
              >
                <Box sx={{ color: isSelected ? 'primary.main' : 'text.secondary', fontSize: 20 }}>{tool.icon}</Box>
                <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 500, color: isSelected ? 'primary.main' : 'text.secondary' }}>
                  {tool.label}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {mobile && (
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
          disabled={selectedIndex === null}
          onClick={handleAdd}
          sx={{
            mt: 2,
            py: 1.2,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: '0.9rem',
            textTransform: 'none',
            bgcolor: '#7c5cfc',
            '&:hover': { bgcolor: '#6a4be0' },
            '&.Mui-disabled': { bgcolor: 'rgba(124,92,252,0.2)', color: 'rgba(255,255,255,0.4)' },
          }}
        >
          Přidat {selectedIndex !== null ? tools[selectedIndex].label : ''}
        </Button>
      )}
    </Box>
  );
}
