import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navbar } from '../../components/Navbar';
import { PageRenderer } from '../../craftjs/PageRenderer';

const gradientText = {
  background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

interface Props {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorInitials: string;
  thumbnailUrl?: string;
  menuItems?: Array<{ label: string; url: string; target?: string; children?: Array<{ label: string; url: string; target?: string }> }>;
  siteSettings?: { siteName: string; siteDescription: string; contactEmail: string };
}

export function ArticlePage({ title, excerpt, content, category, date, readTime, author, authorInitials, thumbnailUrl, menuItems, siteSettings }: Props) {
  const isCraftContent = content && content.startsWith('{"ROOT":');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Navbar activePath="/blog" menuItems={menuItems} siteName={siteSettings?.siteName} />

      {/* Article */}
      <Container maxWidth="md" component="article" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 8 } }}>
        {/* Meta */}
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" sx={{ mb: 3 }}>
          {category && (
            <Chip
              icon={<BookmarkBorderIcon sx={{ fontSize: 14 }} />}
              label={category}
              size="small"
              sx={{
                bgcolor: 'rgba(124,92,252,0.15)',
                color: 'primary.light',
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'primary.light' },
              }}
            />
          )}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {date}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {readTime} min
            </Typography>
          </Stack>
        </Stack>

        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          {title}
        </Typography>

        {/* Lead / Excerpt */}
        {excerpt && (
          <Typography
            sx={{
              fontSize: '1.2rem',
              color: 'text.secondary',
              lineHeight: 1.7,
              mb: 4,
              borderLeft: 3,
              borderColor: 'primary.main',
              pl: 2,
            }}
          >
            {excerpt}
          </Typography>
        )}

        {/* Featured image */}
        {thumbnailUrl && (
          <Box
            component="img"
            src={thumbnailUrl}
            alt={title}
            sx={{
              width: '100%',
              maxHeight: 420,
              objectFit: 'cover',
              borderRadius: 4,
              mb: 4,
              display: 'block',
            }}
          />
        )}

        {/* Author */}
        <Paper
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2.5,
            borderRadius: 4,
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
              fontWeight: 700,
              fontSize: '1.1rem',
            }}
          >
            {authorInitials}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.25 }}>
              {author}
            </Typography>
          </Box>
        </Paper>

        {/* Body */}
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

        <Divider sx={{ my: 4 }} />

        <Link
          href="/blog"
          underline="none"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: 'primary.light',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'gap 0.2s',
            '&:hover': { gap: 1.5 },
          }}
        >
          <ArrowBackIcon fontSize="small" />
          Zpět na blog
        </Link>
      </Container>

      {/* Footer */}
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
