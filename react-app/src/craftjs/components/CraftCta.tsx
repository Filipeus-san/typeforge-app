import React from 'react';
import { useNode } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useEditorBorder } from './useEditorBorder';

interface CraftCtaProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export const CraftCta = ({ title, description, buttonText, buttonHref }: CraftCtaProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      sx={{
        width: '100%',
        px: { xs: 2, md: 3 },
        py: { xs: 3, md: 4 },
        border: borderStyle,
        transition: 'border 0.15s ease',
        cursor: 'pointer',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
            borderRadius: 6,
            py: { xs: 6, md: 8 },
            px: 3,
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mb: 1.5 }}>
            {title}
          </Typography>
          <Typography sx={{ opacity: 0.9, fontSize: '1.1rem', mb: 3, maxWidth: 500, mx: 'auto', lineHeight: 1.6 }}>
            {description}
          </Typography>
          <Button
            variant="contained"
            size="large"
            href={buttonHref}
            startIcon={<RocketLaunchIcon />}
            sx={{
              bgcolor: '#fff',
              color: '#5b3fd9',
              px: 4,
              py: 1.5,
              '&:hover': {
                bgcolor: '#fff',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
              },
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

const CtaSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftCtaProps,
  }));

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Výzva k akci (CTA)
      </Typography>

      <TextField
        label="Titulek"
        size="small"
        value={props.title}
        onChange={(e) => setProp((p: CraftCtaProps) => { p.title = e.target.value; })}
      />
      <TextField
        label="Popis"
        size="small"
        multiline
        rows={2}
        value={props.description}
        onChange={(e) => setProp((p: CraftCtaProps) => { p.description = e.target.value; })}
      />
      <TextField
        label="Text tlačítka"
        size="small"
        value={props.buttonText}
        onChange={(e) => setProp((p: CraftCtaProps) => { p.buttonText = e.target.value; })}
      />
      <TextField
        label="Odkaz (URL)"
        size="small"
        value={props.buttonHref}
        onChange={(e) => setProp((p: CraftCtaProps) => { p.buttonHref = e.target.value; })}
      />
    </Stack>
  );
};

CraftCta.craft = {
  displayName: 'CTA',
  props: {
    title: 'Připraveni začít?',
    description: 'Kontaktujte nás ještě dnes a zjistěte, jak vám můžeme pomoci.',
    buttonText: 'Začít',
    buttonHref: '#',
  } as CraftCtaProps,
  related: {
    settings: CtaSettings,
  },
};
