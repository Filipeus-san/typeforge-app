import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ImageIcon from '@mui/icons-material/Image';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Navbar } from '../../components/Navbar';

const gradientText = {
  background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  year?: string;
  month?: string;
  readTime: string;
  author: string;
  authorInitials: string;
  thumbnailUrl?: string;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  posts: BlogPost[];
  categories?: BlogCategory[];
  menuItems?: Array<{ label: string; url: string; target?: string; children?: Array<{ label: string; url: string; target?: string }> }>;
  siteSettings?: { siteName: string; siteDescription: string; contactEmail: string };
}

const defaultPosts: BlogPost[] = [
  {
    slug: 'de-finibus-bonorum-et-malorum',
    title: 'De Finibus Bonorum et Malorum: Consectetur Adipiscing Elit',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Lorem Ipsum',
    date: '26. 2. 2026',
    readTime: '5',
    author: 'Marcus Aurelius',
    authorInitials: 'MA',
  },
  {
    slug: 'unde-omnis-iste-natus-error',
    title: 'Unde Omnis Iste Natus Error Sit Voluptatem',
    excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    category: 'Philosophia',
    date: '24. 2. 2026',
    readTime: '8',
    author: 'Julia Domna',
    authorInitials: 'JD',
  },
  {
    slug: 'at-vero-eos-et-accusamus',
    title: 'At Vero Eos Et Accusamus Et Iusto Odio Dignissimos',
    excerpt: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.',
    category: 'Technologia',
    date: '20. 2. 2026',
    readTime: '6',
    author: 'Gaius Plinius',
    authorInitials: 'GP',
  },
  {
    slug: 'nemo-enim-ipsam-voluptatem',
    title: 'Nemo Enim Ipsam Voluptatem Quia Voluptas Sit',
    excerpt: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    category: 'Lorem Ipsum',
    date: '15. 2. 2026',
    readTime: '4',
    author: 'Marcus Aurelius',
    authorInitials: 'MA',
  },
  {
    slug: 'temporibus-autem-quibusdam',
    title: 'Temporibus Autem Quibusdam Et Aut Officiis Debitis',
    excerpt: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae.',
    category: 'Designum',
    date: '10. 2. 2026',
    readTime: '7',
    author: 'Julia Domna',
    authorInitials: 'JD',
  },
  {
    slug: 'quis-autem-vel-eum',
    title: 'Quis Autem Vel Eum Iure Reprehenderit',
    excerpt: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
    category: 'Philosophia',
    date: '5. 2. 2026',
    readTime: '5',
    author: 'Gaius Plinius',
    authorInitials: 'GP',
  },
];

const categoryColors: Record<string, { bg: string; color: string }> = {
  'Lorem Ipsum': { bg: 'rgba(124,92,252,0.15)', color: '#a78bfa' },
  'Philosophia': { bg: 'rgba(6,214,160,0.15)', color: '#06d6a0' },
  'Technologia': { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
  'Designum': { bg: 'rgba(251,146,60,0.15)', color: '#fb923c' },
};

const dynamicCategoryColors = [
  { bg: 'rgba(124,92,252,0.15)', color: '#a78bfa' },
  { bg: 'rgba(6,214,160,0.15)', color: '#06d6a0' },
  { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
  { bg: 'rgba(251,146,60,0.15)', color: '#fb923c' },
  { bg: 'rgba(236,72,153,0.15)', color: '#f472b6' },
  { bg: 'rgba(250,204,21,0.15)', color: '#facc15' },
  { bg: 'rgba(34,211,238,0.15)', color: '#22d3ee' },
  { bg: 'rgba(168,85,247,0.15)', color: '#a855f7' },
];

function getCategoryStyle(name: string, index: number) {
  if (categoryColors[name]) return categoryColors[name];
  return dynamicCategoryColors[index % dynamicCategoryColors.length];
}

const MONTH_NAMES: Record<string, string> = {
  '01': 'Leden', '02': 'Únor', '03': 'Březen', '04': 'Duben',
  '05': 'Květen', '06': 'Červen', '07': 'Červenec', '08': 'Srpen',
  '09': 'Září', '10': 'Říjen', '11': 'Listopad', '12': 'Prosinec',
};

const POSTS_PER_PAGE = 6;


export function BlogListPage({ posts, categories, menuItems, siteSettings }: Props) {
  const articles = posts && posts.length > 0 ? posts : defaultPosts;
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [page, setPage] = useState(1);

  // Build category list from props or extract unique from articles
  const categoryList = useMemo(() => {
    if (categories && categories.length > 0) return categories;
    const unique = new Map<string, string>();
    for (const post of articles) {
      if (post.category && !unique.has(post.category)) {
        unique.set(post.category, post.category);
      }
    }
    return Array.from(unique.values()).map((name, i) => ({ id: String(i), name, slug: name }));
  }, [categories, articles]);

  // Extract available years from articles (parse from date "D. M. YYYY")
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    for (const post of articles) {
      if (post.year) {
        years.add(post.year);
      } else {
        // Fallback: parse from date string "D. M. YYYY"
        const parts = post.date.split('. ');
        if (parts.length >= 3) years.add(parts[2].trim());
      }
    }
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [articles]);

  // Extract available months for the selected year
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    for (const post of articles) {
      let postYear: string;
      let postMonth: string;
      if (post.year && post.month) {
        postYear = post.year;
        postMonth = post.month;
      } else {
        const parts = post.date.split('. ');
        if (parts.length < 3) continue;
        postYear = parts[2].trim();
        postMonth = parts[1].trim().padStart(2, '0');
      }
      if (!selectedYear || postYear === selectedYear) {
        months.add(postMonth);
      }
    }
    return Array.from(months).sort();
  }, [articles, selectedYear]);

  // Build category color map
  const categoryColorMap = useMemo(() => {
    const map: Record<string, { bg: string; color: string }> = {};
    categoryList.forEach((cat, i) => {
      map[cat.name] = getCategoryStyle(cat.name, i);
    });
    return map;
  }, [categoryList]);

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory);
    }
    if (selectedYear) {
      result = result.filter(p => {
        if (p.year) return p.year === selectedYear;
        const parts = p.date.split('. ');
        return parts.length >= 3 && parts[2].trim() === selectedYear;
      });
    }
    if (selectedMonth) {
      result = result.filter(p => {
        if (p.month) return p.month === selectedMonth;
        const parts = p.date.split('. ');
        return parts.length >= 2 && parts[1].trim().padStart(2, '0') === selectedMonth;
      });
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [articles, activeCategory, selectedYear, selectedMonth, search]);

  // Reset page when filters change
  const prevFilterKey = `${activeCategory}|${selectedYear}|${selectedMonth}|${search}`;
  const [lastFilterKey, setLastFilterKey] = useState(prevFilterKey);
  if (prevFilterKey !== lastFilterKey) {
    setLastFilterKey(prevFilterKey);
    if (page !== 1) setPage(1);
  }

  const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Navbar activePath="/blog" menuItems={menuItems} siteName={siteSettings?.siteName} />

      {/* Header */}
      <Box
        component="section"
        sx={{
          pt: { xs: 6, md: 10 },
          pb: { xs: 2, md: 3 },
          textAlign: 'center',
          position: 'relative',
          px: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', md: '3.5rem' },
            mb: 2,
          }}
        >
          <Box component="span" sx={gradientText}>Blog</Box>
        </Typography>
        <Typography
          sx={{
            fontSize: '1.15rem',
            color: 'text.secondary',
            maxWidth: 560,
            mx: 'auto',
            lineHeight: 1.7,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Box>

      {/* Search & Category Filter */}
      <Container maxWidth="lg" sx={{ pb: 2 }}>
        <Stack spacing={2.5}>
          {/* Search + Date filters row */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center" alignItems="center">
            <TextField
              placeholder="Hledat články..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                width: { xs: '100%', sm: 320 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            {availableYears.length > 0 && (
              <FormControl size="small" sx={{ minWidth: 110 }}>
                <Select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setSelectedMonth('');
                  }}
                  displayEmpty
                  startAdornment={
                    <CalendarMonthIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 0.5 }} />
                  }
                  sx={{
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: selectedYear ? 'primary.main' : undefined,
                    },
                  }}
                >
                  <MenuItem value="">Rok</MenuItem>
                  {availableYears.map(y => (
                    <MenuItem key={y} value={y}>{y}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {availableMonths.length > 0 && (
              <FormControl size="small" sx={{ minWidth: 130 }}>
                <Select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: selectedMonth ? 'primary.main' : undefined,
                    },
                  }}
                >
                  <MenuItem value="">Měsíc</MenuItem>
                  {availableMonths.map(m => (
                    <MenuItem key={m} value={m}>{MONTH_NAMES[m] || m}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Stack>

          {/* Category chips */}
          {categoryList.length > 0 && (
            <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
              <Chip
                label="Vše"
                size="small"
                onClick={() => setActiveCategory(null)}
                sx={{
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  height: 30,
                  cursor: 'pointer',
                  bgcolor: activeCategory === null ? 'primary.main' : 'transparent',
                  color: activeCategory === null ? '#fff' : 'text.secondary',
                  border: 1,
                  borderColor: activeCategory === null ? 'primary.main' : 'divider',
                  '&:hover': {
                    bgcolor: activeCategory === null ? 'primary.dark' : 'action.hover',
                  },
                }}
              />
              {categoryList.map((cat, i) => {
                const style = getCategoryStyle(cat.name, i);
                const isActive = activeCategory === cat.name;
                return (
                  <Chip
                    key={cat.id}
                    label={cat.name}
                    size="small"
                    onClick={() => setActiveCategory(isActive ? null : cat.name)}
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      height: 30,
                      cursor: 'pointer',
                      bgcolor: isActive ? style.color : 'transparent',
                      color: isActive ? '#fff' : style.color,
                      border: 1,
                      borderColor: isActive ? style.color : 'divider',
                      '&:hover': {
                        bgcolor: isActive ? style.color : style.bg,
                      },
                    }}
                  />
                );
              })}
            </Stack>
          )}
        </Stack>
      </Container>

      {/* Articles Grid */}
      <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 10 } }}>
        {filteredArticles.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
              Nebyly nalezeny žádné články.
            </Typography>
          </Box>
        ) : (
          <>
          <Grid container spacing={3}>
            {paginatedArticles.map((post) => {
              const catStyle = categoryColorMap[post.category] || categoryColors['Lorem Ipsum'];
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.slug}>
                  <Card
                    component="a"
                    href={`/article/${post.slug}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'rgba(124,92,252,0.3)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    {/* Thumbnail or placeholder */}
                    {post.thumbnailUrl ? (
                      <Box
                        component="img"
                        src={post.thumbnailUrl}
                        alt={post.title}
                        sx={{
                          width: '100%',
                          height: 180,
                          objectFit: 'cover',
                          borderBottom: 1,
                          borderColor: 'divider',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: 180,
                          background: 'linear-gradient(135deg, rgba(124,92,252,0.15), rgba(6,214,160,0.1))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderBottom: 1,
                          borderColor: 'divider',
                        }}
                      >
                        <ImageIcon sx={{ fontSize: '2.5rem', color: 'primary.light', opacity: 0.4 }} />
                      </Box>
                    )}

                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                      {/* Category & date */}
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                        <Chip
                          label={post.category}
                          size="small"
                          sx={{
                            bgcolor: catStyle.bg,
                            color: catStyle.color,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 24,
                          }}
                        />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {post.date}
                        </Typography>
                      </Stack>

                      {/* Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          lineHeight: 1.4,
                          mb: 1,
                        }}
                      >
                        {post.title}
                      </Typography>

                      {/* Excerpt */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          mb: 2,
                          flexGrow: 1,
                        }}
                      >
                        {post.excerpt}
                      </Typography>

                      {/* Footer: author + read time */}
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {post.author}
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {post.readTime} min
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {totalPages > 1 && (
            <Stack alignItems="center" sx={{ mt: 5 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, v) => {
                  setPage(v);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'text.secondary',
                    borderColor: 'divider',
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: '#fff',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  },
                }}
              />
            </Stack>
          )}
          </>
        )}
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
