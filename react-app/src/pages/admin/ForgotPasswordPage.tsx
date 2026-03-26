import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import HexagonIcon from '@mui/icons-material/Hexagon';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

const gradientText = {
  background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

interface Props {
  error?: string;
  success?: string;
}

export function ForgotPasswordPage({ error, success }: Props) {
  const { theme } = useTheme();
  const t = useT();

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': {
        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)',
      },
      '&:hover fieldset': {
        borderColor: 'primary.main',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
        borderWidth: 2,
      },
    },
    '& .MuiInputLabel-root': {
      color: 'text.secondary',
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
        py: 4,
      }}
    >
      {/* Background glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(124,92,252,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            component="a"
            href="/"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              textDecoration: 'none',
              fontSize: '1.75rem',
              fontWeight: 800,
              mb: 1,
            }}
          >
            <Box component="span" sx={{ ...gradientText, display: 'flex', alignItems: 'center' }}>
              <HexagonIcon fontSize="inherit" />
            </Box>
            <Box component="span" sx={gradientText}>
              Lorem
            </Box>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {t.forgotPassword.subtitle}
          </Typography>
        </Box>

        {/* Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 5,
            border: 1,
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
            bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.8)' : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 0.5, textAlign: 'center' }}
          >
            {t.forgotPassword.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}
          >
            {t.forgotPassword.description}
          </Typography>

          {error && (
            <Box
              sx={{
                mb: 2.5,
                p: 1.5,
                borderRadius: 2,
                bgcolor: 'rgba(239,68,68,0.1)',
                border: 1,
                borderColor: 'rgba(239,68,68,0.3)',
              }}
            >
              <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 500 }}>
                {error}
              </Typography>
            </Box>
          )}

          {success ? (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'rgba(6,214,160,0.1)',
                border: 1,
                borderColor: 'rgba(6,214,160,0.3)',
                textAlign: 'center',
              }}
            >
              <CheckCircleOutlineIcon sx={{ color: '#06d6a0', fontSize: 40, mb: 1 }} />
              <Typography variant="body2" sx={{ color: '#06d6a0', fontWeight: 500 }}>
                {success}
              </Typography>
            </Box>
          ) : (
            <Box component="form" method="post" action="/admin/forgot-password">
              <TextField
                fullWidth
                name="email"
                label={t.forgotPassword.emailLabel}
                type="email"
                autoComplete="email"
                autoFocus
                sx={{ mb: 3, ...inputSx }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                startIcon={<SendIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
                  boxShadow: '0 4px 20px rgba(124,92,252,0.35)',
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 3,
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(124,92,252,0.45)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                {t.forgotPassword.submit}
              </Button>
            </Box>
          )}
        </Paper>

        {/* Back to login */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Link
            href="/admin/login"
            underline="none"
            sx={{
              color: 'text.secondary',
              fontSize: '0.85rem',
              '&:hover': { color: 'primary.light' },
            }}
          >
            {t.forgotPassword.backToLogin}
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
