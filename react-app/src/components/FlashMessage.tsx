import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface FlashMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

const config = {
  success: { color: '#06d6a0', bg: 'rgba(6,214,160,0.1)', border: 'rgba(6,214,160,0.3)', icon: CheckCircleOutlineIcon },
  error: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', icon: ErrorOutlineIcon },
  warning: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: WarningAmberIcon },
  info: { color: '#7c5cfc', bg: 'rgba(124,92,252,0.1)', border: 'rgba(124,92,252,0.3)', icon: InfoOutlinedIcon },
};

export function FlashMessage({ type, message }: FlashMessageProps) {
  const [visible, setVisible] = useState(true);
  const c = config[type] || config.info;
  const Icon = c.icon;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 3,
        bgcolor: c.bg,
        border: 1,
        borderColor: c.border,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        animation: 'flashFadeIn 0.3s ease-out',
        '@keyframes flashFadeIn': {
          from: { opacity: 0, transform: 'translateY(-8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Icon sx={{ color: c.color, fontSize: 20 }} />
      <Typography variant="body2" sx={{ color: c.color, fontWeight: 500, flexGrow: 1 }}>
        {message}
      </Typography>
      <IconButton size="small" onClick={() => setVisible(false)} sx={{ color: c.color, opacity: 0.7, '&:hover': { opacity: 1 } }}>
        <CloseIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  );
}
