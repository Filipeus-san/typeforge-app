import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Navbar } from '../../components/Navbar';
import { PageRenderer } from '../../craftjs/PageRenderer';

interface Props {
  title: string;
  content: string;
  menuItems?: Array<{ label: string; url: string; target?: string; children?: Array<{ label: string; url: string; target?: string }> }>;
  siteSettings?: { siteName: string; siteDescription: string; contactEmail: string };
}

export function PagePage({ title, content, menuItems, siteSettings }: Props) {
  const isCraftContent = content && content.startsWith('{"ROOT":');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Navbar menuItems={menuItems} siteName={siteSettings?.siteName} />

      <Container maxWidth="md" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 8 } }}>
        {!isCraftContent && (
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.2,
              mb: 4,
            }}
          >
            {title}
          </Typography>
        )}

        {isCraftContent ? (
          <PageRenderer json={content} />
        ) : (
          <Box
            sx={{
              '& h2': { fontSize: '1.6rem', mt: 4, mb: 1.5, fontWeight: 700 },
              '& h3': { fontSize: '1.3rem', mt: 3, mb: 1, fontWeight: 700 },
              '& p': { fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary', mb: 2 },
              '& ul, & ol': { pl: 3, mb: 2 },
              '& li': { fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary', mb: 0.5 },
              '& code': { fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', bgcolor: 'rgba(124,92,252,0.1)', px: 0.5, borderRadius: 1 },
              '& pre': { p: 2, borderRadius: 2, overflowX: 'auto', bgcolor: 'rgba(0,0,0,0.2)', mb: 2 },
              '& blockquote': { borderLeft: 3, borderColor: 'primary.main', pl: 2, my: 3, fontStyle: 'italic' },
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </Container>

      <Box
        component="footer"
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          py: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          &copy; {new Date().getFullYear()} {siteSettings?.siteName || 'Lorem'}. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
