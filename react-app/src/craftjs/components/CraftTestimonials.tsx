import React from 'react';
import { useNode } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useEditorBorder } from './useEditorBorder';

interface CraftTestimonialsProps {
  sectionBadge: string;
  sectionTitle: string;
  sectionDescription: string;
  t1Text: string;
  t1Name: string;
  t1Role: string;
  t1Initials: string;
  t2Text: string;
  t2Name: string;
  t2Role: string;
  t2Initials: string;
  t3Text: string;
  t3Name: string;
  t3Role: string;
  t3Initials: string;
}

export const CraftTestimonials = (props: CraftTestimonialsProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  const testimonials = [
    { text: props.t1Text, name: props.t1Name, role: props.t1Role, initials: props.t1Initials },
    { text: props.t2Text, name: props.t2Name, role: props.t2Role, initials: props.t2Initials },
    { text: props.t3Text, name: props.t3Name, role: props.t3Role, initials: props.t3Initials },
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
              icon={<FormatQuoteIcon sx={{ fontSize: 14 }} />}
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
          {testimonials.map((t, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Card
                sx={{
                  height: '100%',
                  p: 1,
                  position: 'relative',
                  '&::before': {
                    content: '"\\201C"',
                    fontSize: '4rem',
                    lineHeight: 1,
                    position: 'absolute',
                    top: 12,
                    right: 20,
                    opacity: 0.1,
                    fontFamily: 'Georgia, serif',
                  },
                }}
              >
                <CardContent>
                  <Rating value={5} readOnly size="small" sx={{ mb: 1.5, color: '#fbbf24' }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.7,
                      mb: 2.5,
                      fontStyle: 'italic',
                    }}
                  >
                    {t.text}
                  </Typography>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      sx={{
                        width: 44,
                        height: 44,
                        background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                      }}
                    >
                      {t.initials}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        {t.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {t.role}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const TestimonialsSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftTestimonialsProps,
  }));

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Sekce Reference
      </Typography>

      <TextField
        label="Badge"
        size="small"
        value={props.sectionBadge}
        onChange={(e) => setProp((p: CraftTestimonialsProps) => { p.sectionBadge = e.target.value; })}
      />
      <TextField
        label="Titulek sekce"
        size="small"
        value={props.sectionTitle}
        onChange={(e) => setProp((p: CraftTestimonialsProps) => { p.sectionTitle = e.target.value; })}
      />
      <TextField
        label="Popis sekce"
        size="small"
        multiline
        rows={2}
        value={props.sectionDescription}
        onChange={(e) => setProp((p: CraftTestimonialsProps) => { p.sectionDescription = e.target.value; })}
      />

      {[1, 2, 3].map((n) => {
        const prefix = `t${n}`;
        return (
          <React.Fragment key={n}>
            <Divider />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', pt: 1 }}>
              Reference {n}
            </Typography>
            <TextField
              label="Text"
              size="small"
              multiline
              rows={2}
              value={(props as any)[`${prefix}Text`]}
              onChange={(e) => setProp((p: any) => { p[`${prefix}Text`] = e.target.value; })}
            />
            <TextField
              label="Jméno"
              size="small"
              value={(props as any)[`${prefix}Name`]}
              onChange={(e) => setProp((p: any) => { p[`${prefix}Name`] = e.target.value; })}
            />
            <TextField
              label="Role"
              size="small"
              value={(props as any)[`${prefix}Role`]}
              onChange={(e) => setProp((p: any) => { p[`${prefix}Role`] = e.target.value; })}
            />
            <TextField
              label="Iniciály"
              size="small"
              value={(props as any)[`${prefix}Initials`]}
              onChange={(e) => setProp((p: any) => { p[`${prefix}Initials`] = e.target.value; })}
            />
          </React.Fragment>
        );
      })}
    </Stack>
  );
};

CraftTestimonials.craft = {
  displayName: 'Reference',
  props: {
    sectionBadge: 'REFERENCE',
    sectionTitle: 'Co říkají naši klienti',
    sectionDescription: 'Přečtěte si zkušenosti našich spokojených zákazníků.',
    t1Text: 'Skvělá spolupráce a profesionální přístup. Výsledky předčily naše očekávání.',
    t1Name: 'Jan Novák',
    t1Role: 'CEO, Firma s.r.o.',
    t1Initials: 'JN',
    t2Text: 'Rychlé dodání a bezproblémová komunikace. Doporučuji všem.',
    t2Name: 'Marie Svobodová',
    t2Role: 'CTO, Tech Corp',
    t2Initials: 'MS',
    t3Text: 'Výborná kvalita práce a skvělý zákaznický servis.',
    t3Name: 'Petr Dvořák',
    t3Role: 'Lead Developer, Dev Labs',
    t3Initials: 'PD',
  } as CraftTestimonialsProps,
  related: {
    settings: TestimonialsSettings,
  },
};
