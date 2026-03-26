import React from 'react';
import { useNode } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import BoltIcon from '@mui/icons-material/Bolt';
import ShieldIcon from '@mui/icons-material/Shield';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaletteIcon from '@mui/icons-material/Palette';
import GridViewIcon from '@mui/icons-material/GridView';
import { useEditorBorder } from './useEditorBorder';

interface FeatureItem {
  title: string;
  description: string;
}

interface CraftFeaturesProps {
  sectionBadge: string;
  sectionTitle: string;
  sectionDescription: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
}

const featureIcons = [
  { icon: <BoltIcon />, color: 'rgba(124,92,252,0.15)', iconColor: '#a78bfa' },
  { icon: <ShieldIcon />, color: 'rgba(6,214,160,0.15)', iconColor: '#06d6a0' },
  { icon: <TrendingUpIcon />, color: 'rgba(59,130,246,0.15)', iconColor: '#60a5fa' },
  { icon: <PaletteIcon />, color: 'rgba(251,146,60,0.15)', iconColor: '#fb923c' },
];

export const CraftFeatures = (props: CraftFeaturesProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  const features: FeatureItem[] = [
    { title: props.feature1Title, description: props.feature1Desc },
    { title: props.feature2Title, description: props.feature2Desc },
    { title: props.feature3Title, description: props.feature3Desc },
    { title: props.feature4Title, description: props.feature4Desc },
  ];

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      sx={{
        py: { xs: 8, md: 12 },
        width: '100%',
        border: borderStyle,
        transition: 'border 0.15s ease',
        cursor: 'pointer',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          {props.sectionBadge && (
            <Chip
              icon={<GridViewIcon sx={{ fontSize: 14 }} />}
              label={props.sectionBadge}
              size="small"
              sx={{
                color: 'primary.light',
                fontWeight: 700,
                letterSpacing: '0.08em',
                mb: 1.5,
                bgcolor: 'transparent',
                '& .MuiChip-icon': { color: 'primary.light' },
              }}
            />
          )}
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 1.5 }}>
            {props.sectionTitle}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 560, mx: 'auto', lineHeight: 1.6 }}>
            {props.sectionDescription}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
              <Card
                sx={{
                  height: '100%',
                  p: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(124,92,252,0.3)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: featureIcons[i].color,
                      color: featureIcons[i].iconColor,
                      fontSize: '1.5rem',
                      mb: 2,
                    }}
                  >
                    {featureIcons[i].icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {f.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const FeaturesSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftFeaturesProps,
  }));

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Sekce Features
      </Typography>

      <TextField
        label="Badge"
        size="small"
        value={props.sectionBadge}
        onChange={(e) => setProp((p: CraftFeaturesProps) => { p.sectionBadge = e.target.value; })}
      />
      <TextField
        label="Titulek sekce"
        size="small"
        value={props.sectionTitle}
        onChange={(e) => setProp((p: CraftFeaturesProps) => { p.sectionTitle = e.target.value; })}
      />
      <TextField
        label="Popis sekce"
        size="small"
        multiline
        rows={2}
        value={props.sectionDescription}
        onChange={(e) => setProp((p: CraftFeaturesProps) => { p.sectionDescription = e.target.value; })}
      />

      {[1, 2, 3, 4].map((n) => (
        <React.Fragment key={n}>
          <Divider />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', pt: 1 }}>
            Feature {n}
          </Typography>
          <TextField
            label="Název"
            size="small"
            value={(props as any)[`feature${n}Title`]}
            onChange={(e) => setProp((p: any) => { p[`feature${n}Title`] = e.target.value; })}
          />
          <TextField
            label="Popis"
            size="small"
            multiline
            rows={2}
            value={(props as any)[`feature${n}Desc`]}
            onChange={(e) => setProp((p: any) => { p[`feature${n}Desc`] = e.target.value; })}
          />
        </React.Fragment>
      ))}
    </Stack>
  );
};

CraftFeatures.craft = {
  displayName: 'Features',
  props: {
    sectionBadge: 'FEATURES',
    sectionTitle: 'Naše služby',
    sectionDescription: 'Nabízíme širokou škálu služeb, které vám pomohou dosáhnout vašich cílů.',
    feature1Title: 'Rychlost',
    feature1Desc: 'Bleskově rychlé řešení postavené na moderních technologiích.',
    feature2Title: 'Bezpečnost',
    feature2Desc: 'Maximální zabezpečení vašich dat a systémů.',
    feature3Title: 'Růst',
    feature3Desc: 'Nástroje pro růst a škálování vašeho podnikání.',
    feature4Title: 'Design',
    feature4Desc: 'Elegantní design, který zaujme na první pohled.',
  } as CraftFeaturesProps,
  related: {
    settings: FeaturesSettings,
  },
};
