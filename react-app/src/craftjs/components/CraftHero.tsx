import React from 'react';
import { useNode } from '@craftjs/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useEditorBorder } from './useEditorBorder';

interface CraftHeroProps {
  badge: string;
  showBadge: boolean;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  showPrimaryButton: boolean;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  showSecondaryButton: boolean;
  paddingTop: number;
  paddingBottom: number;
}

const gradientText = {
  background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export const CraftHero = ({
  badge, showBadge, titleLine1, titleLine2, description,
  primaryButtonText, primaryButtonHref, showPrimaryButton,
  secondaryButtonText, secondaryButtonHref, showSecondaryButton,
  paddingTop, paddingBottom,
}: CraftHeroProps) => {
  const { connect, drag, borderStyle } = useEditorBorder();

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      sx={{
        pt: `${paddingTop}px`,
        pb: `${paddingBottom}px`,
        textAlign: 'center',
        position: 'relative',
        px: 2,
        width: '100%',
        border: borderStyle,
        transition: 'border 0.15s ease',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      {showBadge && badge && (
        <Chip
          icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
          label={badge}
          sx={{
            bgcolor: 'rgba(124,92,252,0.15)',
            color: 'primary.light',
            fontWeight: 600,
            fontSize: '0.85rem',
            mb: 3,
            px: 1,
            height: 36,
            '& .MuiChip-icon': { color: 'primary.light' },
          }}
        />
      )}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.5rem', md: '4.5rem' },
          mb: 2,
          maxWidth: 800,
          mx: 'auto',
          fontWeight: 700,
        }}
      >
        {titleLine1}
        {titleLine2 && (
          <>
            <br />
            <Box component="span" sx={gradientText}>
              {titleLine2}
            </Box>
          </>
        )}
      </Typography>
      {description && (
        <Typography
          sx={{
            fontSize: '1.2rem',
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
            mb: 4,
            lineHeight: 1.7,
          }}
        >
          {description}
        </Typography>
      )}
      {(showPrimaryButton || showSecondaryButton) && (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
          {showPrimaryButton && (
            <Button
              variant="contained"
              size="large"
              href={primaryButtonHref}
              startIcon={<RocketLaunchIcon />}
              sx={{
                background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
                boxShadow: '0 4px 20px rgba(124,92,252,0.35)',
                px: 4,
                py: 1.5,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px rgba(124,92,252,0.45)',
                },
              }}
            >
              {primaryButtonText}
            </Button>
          )}
          {showSecondaryButton && (
            <Button
              variant="outlined"
              size="large"
              href={secondaryButtonHref}
              startIcon={<PlayCircleOutlineIcon />}
              sx={{
                borderColor: 'divider',
                borderWidth: 2,
                color: 'text.primary',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  transform: 'translateY(-2px)',
                  borderWidth: 2,
                },
              }}
            >
              {secondaryButtonText}
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
};

const HeroSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as CraftHeroProps,
  }));

  return (
    <Stack spacing={2}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
        Hero sekce
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={props.showBadge}
            onChange={(e) => setProp((p: CraftHeroProps) => { p.showBadge = e.target.checked; })}
            size="small"
          />
        }
        label="Zobrazit badge"
      />
      {props.showBadge && (
        <TextField
          label="Badge text"
          size="small"
          value={props.badge}
          onChange={(e) => setProp((p: CraftHeroProps) => { p.badge = e.target.value; })}
        />
      )}

      <TextField
        label="Titulek — řádek 1"
        size="small"
        value={props.titleLine1}
        onChange={(e) => setProp((p: CraftHeroProps) => { p.titleLine1 = e.target.value; })}
      />
      <TextField
        label="Titulek — řádek 2 (gradient)"
        size="small"
        value={props.titleLine2}
        onChange={(e) => setProp((p: CraftHeroProps) => { p.titleLine2 = e.target.value; })}
        helperText="Zobrazí se s gradient efektem"
      />
      <TextField
        label="Popis"
        size="small"
        multiline
        rows={3}
        value={props.description}
        onChange={(e) => setProp((p: CraftHeroProps) => { p.description = e.target.value; })}
      />

      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', pt: 1 }}>
        Primární tlačítko
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={props.showPrimaryButton}
            onChange={(e) => setProp((p: CraftHeroProps) => { p.showPrimaryButton = e.target.checked; })}
            size="small"
          />
        }
        label="Zobrazit"
      />
      {props.showPrimaryButton && (
        <>
          <TextField
            label="Text"
            size="small"
            value={props.primaryButtonText}
            onChange={(e) => setProp((p: CraftHeroProps) => { p.primaryButtonText = e.target.value; })}
          />
          <TextField
            label="Odkaz (URL)"
            size="small"
            value={props.primaryButtonHref}
            onChange={(e) => setProp((p: CraftHeroProps) => { p.primaryButtonHref = e.target.value; })}
          />
        </>
      )}

      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', pt: 1 }}>
        Sekundární tlačítko
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={props.showSecondaryButton}
            onChange={(e) => setProp((p: CraftHeroProps) => { p.showSecondaryButton = e.target.checked; })}
            size="small"
          />
        }
        label="Zobrazit"
      />
      {props.showSecondaryButton && (
        <>
          <TextField
            label="Text"
            size="small"
            value={props.secondaryButtonText}
            onChange={(e) => setProp((p: CraftHeroProps) => { p.secondaryButtonText = e.target.value; })}
          />
          <TextField
            label="Odkaz (URL)"
            size="small"
            value={props.secondaryButtonHref}
            onChange={(e) => setProp((p: CraftHeroProps) => { p.secondaryButtonHref = e.target.value; })}
          />
        </>
      )}

      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', pt: 1 }}>
        Rozestupy
      </Typography>
      <TextField
        label="Horní odsazení (px)"
        size="small"
        type="number"
        value={props.paddingTop}
        onChange={(e) => setProp((p: CraftHeroProps) => { p.paddingTop = Number(e.target.value); })}
      />
      <TextField
        label="Spodní odsazení (px)"
        size="small"
        type="number"
        value={props.paddingBottom}
        onChange={(e) => setProp((p: CraftHeroProps) => { p.paddingBottom = Number(e.target.value); })}
      />
    </Stack>
  );
};

CraftHero.craft = {
  displayName: 'Hero',
  props: {
    badge: 'Lorem Ipsum Dolor Sit Amet',
    showBadge: true,
    titleLine1: 'Consectetur Adipiscing',
    titleLine2: 'Elit Sed Do Eiusmod',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    primaryButtonText: 'Začít zdarma',
    primaryButtonHref: '#',
    showPrimaryButton: true,
    secondaryButtonText: 'Zjistit více',
    secondaryButtonHref: '#',
    showSecondaryButton: true,
    paddingTop: 80,
    paddingBottom: 80,
  } as CraftHeroProps,
  related: {
    settings: HeroSettings,
  },
};
