import React, { useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SaveIcon from '@mui/icons-material/Save';
import LinkIcon from '@mui/icons-material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AdminLayout } from '../../components/AdminLayout';
import { FlashMessage } from '../../components/FlashMessage';
import { useTheme } from '../../context/ThemeContext';
import { useT } from '../../i18n';

interface MenuItemData {
  id: string;
  label: string;
  url: string;
  target: '_self' | '_blank';
  visible: boolean;
  children?: MenuItemData[];
}

interface LinkableItem {
  title: string;
  slug: string;
  status: string;
}

interface Props {
  items?: MenuItemData[];
  success?: string;
  pages?: LinkableItem[];
  articles?: LinkableItem[];
}

const defaultItems: MenuItemData[] = [
  { id: '1', label: 'Domů', url: '/', target: '_self', visible: true },
  { id: '2', label: 'O nás', url: '/o-nas', target: '_self', visible: true },
  {
    id: '3', label: 'Služby', url: '/sluzby', target: '_self', visible: true,
    children: [
      { id: '3a', label: 'Webdesign', url: '/sluzby/webdesign', target: '_self', visible: true },
      { id: '3b', label: 'E-shopy', url: '/sluzby/e-shopy', target: '_self', visible: true },
      { id: '3c', label: 'SEO', url: '/sluzby/seo', target: '_self', visible: false },
    ],
  },
  { id: '4', label: 'Blog', url: '/blog', target: '_self', visible: true },
  { id: '5', label: 'Kontakt', url: '/kontakt', target: '_self', visible: true },
  { id: '6', label: 'Dokumentace', url: 'https://docs.example.com', target: '_blank', visible: true },
];

interface EditDialogState {
  open: boolean;
  item: MenuItemData | null;
  isNew: boolean;
  parentId: string | null;
}

export function AdminMenuPage({ items, success, pages, articles }: Props) {
  const { theme } = useTheme();
  const t = useT('menu');
  const [menuItems, setMenuItems] = useState<MenuItemData[]>(items ?? defaultItems);
  const [editDialog, setEditDialog] = useState<EditDialogState>({
    open: false, item: null, isNew: false, parentId: null,
  });
  const [editLabel, setEditLabel] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editTarget, setEditTarget] = useState<'_self' | '_blank'>('_self');
  const [dialogTab, setDialogTab] = useState(0);

  // Drag-and-drop state
  const dragItem = useRef<{ id: string; parentId: string | null } | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<'above' | 'below' | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, id: string, parentId: string | null) => {
    dragItem.current = { id, parentId };
    e.dataTransfer.effectAllowed = 'move';
    // Make the drag ghost semi-transparent
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.4';
    }
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    dragItem.current = null;
    setDragOverId(null);
    setDragOverPosition(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    setDragOverId(targetId);
    setDragOverPosition(e.clientY < midY ? 'above' : 'below');
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverId(null);
    setDragOverPosition(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetId: string, targetParentId: string | null) => {
    e.preventDefault();
    setDragOverId(null);
    setDragOverPosition(null);

    if (!dragItem.current || dragItem.current.id === targetId) return;

    const src = dragItem.current;
    // Only allow reordering within the same level (same parent)
    if (src.parentId !== targetParentId) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const insertBefore = e.clientY < midY;

    setMenuItems(prev => {
      if (targetParentId === null) {
        // Top-level reorder
        const srcIdx = prev.findIndex(mi => mi.id === src.id);
        let targetIdx = prev.findIndex(mi => mi.id === targetId);
        if (srcIdx === -1 || targetIdx === -1) return prev;
        const copy = [...prev];
        const [moved] = copy.splice(srcIdx, 1);
        // Recalculate target index after removal
        targetIdx = copy.findIndex(mi => mi.id === targetId);
        const insertIdx = insertBefore ? targetIdx : targetIdx + 1;
        copy.splice(insertIdx, 0, moved);
        return copy;
      } else {
        // Child reorder within a parent
        return prev.map(mi => {
          if (mi.id !== targetParentId || !mi.children) return mi;
          const children = [...mi.children];
          const srcIdx = children.findIndex(c => c.id === src.id);
          let targetIdx = children.findIndex(c => c.id === targetId);
          if (srcIdx === -1 || targetIdx === -1) return mi;
          const [moved] = children.splice(srcIdx, 1);
          targetIdx = children.findIndex(c => c.id === targetId);
          const insertIdx = insertBefore ? targetIdx : targetIdx + 1;
          children.splice(insertIdx, 0, moved);
          return { ...mi, children };
        });
      }
    });

    dragItem.current = null;
  }, []);

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
    },
  };

  const openNewDialog = (parentId: string | null = null) => {
    setEditLabel('');
    setEditUrl('');
    setEditTarget('_self');
    setDialogTab(0);
    setEditDialog({ open: true, item: null, isNew: true, parentId });
  };

  const openEditDialog = (item: MenuItemData) => {
    setEditLabel(item.label);
    setEditUrl(item.url);
    setEditTarget(item.target);
    setDialogTab(0);
    setEditDialog({ open: true, item, isNew: false, parentId: null });
  };

  const selectLinkable = (item: LinkableItem, urlPrefix: string) => {
    setEditLabel(item.title);
    setEditUrl(urlPrefix + item.slug);
    setDialogTab(0);
  };

  const closeDialog = () => {
    setEditDialog({ open: false, item: null, isNew: false, parentId: null });
  };

  const saveItem = () => {
    if (!editLabel || !editUrl) return;

    if (editDialog.isNew) {
      const newItem: MenuItemData = {
        id: String(Date.now()),
        label: editLabel,
        url: editUrl,
        target: editTarget,
        visible: true,
      };
      if (editDialog.parentId) {
        setMenuItems(prev => prev.map(mi =>
          mi.id === editDialog.parentId
            ? { ...mi, children: [...(mi.children ?? []), newItem] }
            : mi
        ));
      } else {
        setMenuItems(prev => [...prev, newItem]);
      }
    } else if (editDialog.item) {
      const updateId = editDialog.item.id;
      const update = (list: MenuItemData[]): MenuItemData[] =>
        list.map(mi => {
          if (mi.id === updateId) {
            return { ...mi, label: editLabel, url: editUrl, target: editTarget };
          }
          if (mi.children) {
            return { ...mi, children: update(mi.children) };
          }
          return mi;
        });
      setMenuItems(prev => update(prev));
    }
    closeDialog();
  };

  const toggleVisibility = (id: string) => {
    const toggle = (list: MenuItemData[]): MenuItemData[] =>
      list.map(mi => {
        if (mi.id === id) return { ...mi, visible: !mi.visible };
        if (mi.children) return { ...mi, children: toggle(mi.children) };
        return mi;
      });
    setMenuItems(prev => toggle(prev));
  };

  const removeItem = (id: string) => {
    const remove = (list: MenuItemData[]): MenuItemData[] =>
      list
        .filter(mi => mi.id !== id)
        .map(mi => mi.children ? { ...mi, children: remove(mi.children) } : mi);
    setMenuItems(prev => remove(prev));
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const move = (list: MenuItemData[]): MenuItemData[] => {
      const idx = list.findIndex(mi => mi.id === id);
      if (idx === -1) {
        return list.map(mi => mi.children ? { ...mi, children: move(mi.children) } : mi);
      }
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= list.length) return list;
      const copy = [...list];
      [copy[idx], copy[swapIdx]] = [copy[swapIdx], copy[idx]];
      return copy;
    };
    setMenuItems(prev => move(prev));
  };

  const renderMenuItem = (item: MenuItemData, index: number, total: number, isChild = false, parentId: string | null = null) => (
    <Box
      key={item.id}
      draggable
      onDragStart={(e) => handleDragStart(e, item.id, parentId)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => handleDragOver(e, item.id)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, item.id, parentId)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 0.75, sm: 1.5 },
        px: { xs: 1.5, sm: 2.5 },
        py: 1.5,
        borderBottom: 1,
        borderColor: 'divider',
        opacity: item.visible ? 1 : 0.5,
        '&:hover': {
          bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        },
        pl: isChild ? { xs: 4, sm: 6 } : { xs: 1.5, sm: 2.5 },
        position: 'relative',
        ...(dragOverId === item.id && dragOverPosition === 'above' ? {
          '&::before': {
            content: '""', position: 'absolute', top: 0, left: 16, right: 16,
            height: 3, bgcolor: 'primary.main', borderRadius: 2,
          },
        } : {}),
        ...(dragOverId === item.id && dragOverPosition === 'below' ? {
          '&::after': {
            content: '""', position: 'absolute', bottom: 0, left: 16, right: 16,
            height: 3, bgcolor: 'primary.main', borderRadius: 2,
          },
        } : {}),
      }}
    >
      <DragIndicatorIcon sx={{ color: 'text.secondary', fontSize: 20, cursor: 'grab', flexShrink: 0, touchAction: 'none' }} />

      {isChild && (
        <SubdirectoryArrowRightIcon sx={{ color: 'text.secondary', fontSize: 18, flexShrink: 0 }} />
      )}

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
            {item.label}
          </Typography>
          {item.target === '_blank' && (
            <OpenInNewIcon sx={{ color: 'text.secondary', fontSize: 14 }} />
          )}
          {!item.visible && (
            <Chip label={t.hidden} size="small" sx={{
              height: 20, fontSize: '0.65rem', fontWeight: 600,
              bgcolor: 'rgba(149,149,173,0.12)', color: '#9595ad',
            }} />
          )}
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.75rem' }}>
          {item.url}
        </Typography>
      </Box>

      <Stack direction="row" spacing={0.25} sx={{ flexShrink: 0 }}>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.25 }}>
          <Tooltip title={t.moveUp}>
            <span>
              <IconButton size="small" disabled={index === 0} onClick={() => moveItem(item.id, 'up')} sx={{ color: 'text.secondary' }}>
                <ArrowUpwardIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t.moveDown}>
            <span>
              <IconButton size="small" disabled={index === total - 1} onClick={() => moveItem(item.id, 'down')} sx={{ color: 'text.secondary' }}>
                <ArrowDownwardIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={item.visible ? t.hide : t.show}>
            <IconButton size="small" onClick={() => toggleVisibility(item.id)} sx={{ color: 'text.secondary' }}>
              {item.visible
                ? <VisibilityIcon sx={{ fontSize: 18 }} />
                : <VisibilityOffIcon sx={{ fontSize: 18 }} />
              }
            </IconButton>
          </Tooltip>
        </Box>
        <Tooltip title={t.edit}>
          <IconButton size="small" onClick={() => openEditDialog(item)} sx={{ color: 'text.secondary' }}>
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t.deleteItem}>
          <IconButton size="small" onClick={() => removeItem(item.id)} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
            <DeleteOutlineIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );

  return (
    <AdminLayout activePath="/admin/menu">
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {t.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t.subtitle(menuItems.length)}
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => openNewDialog()}
            sx={{
              borderColor: 'divider',
              color: 'text.primary',
              borderRadius: 2.5,
              '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(124,92,252,0.06)' },
            }}
          >
            {t.addItem}
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => {
              const form = document.createElement('form');
              form.method = 'POST';
              form.action = '/admin/menu';
              const input = document.createElement('input');
              input.type = 'hidden';
              input.name = 'menuData';
              input.value = JSON.stringify(menuItems.map(item => ({
                label: item.label,
                url: item.url,
                target: item.target,
                visible: item.visible,
                children: (item.children ?? []).map(c => ({
                  label: c.label,
                  url: c.url,
                  target: c.target,
                  visible: c.visible,
                })),
              })));
              form.appendChild(input);
              document.body.appendChild(form);
              form.submit();
            }}
            sx={{
              background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
              boxShadow: '0 4px 15px rgba(124,92,252,0.3)',
              borderRadius: 2.5,
              '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(124,92,252,0.4)' },
            }}
          >
            {t.save}
          </Button>
        </Stack>
      </Stack>

      {success && <FlashMessage type="success" message={success} />}

      {/* Menu items list */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: 1,
          borderColor: 'divider',
          bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
          overflow: 'hidden',
          mb: 3,
        }}
      >
        <Box sx={{ p: 2.5, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {t.mainNav}
          </Typography>
          <Chip
            label={t.itemsChip(menuItems.length)}
            size="small"
            sx={{
              bgcolor: 'rgba(124,92,252,0.12)', color: 'primary.light',
              fontWeight: 600, fontSize: '0.75rem',
            }}
          />
        </Box>
        <Divider />

        {menuItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <LinkIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1.5, opacity: 0.4 }} />
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              {t.empty}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => openNewDialog()}
              sx={{ borderRadius: 2.5, borderColor: 'divider', color: 'text.primary' }}
            >
              {t.emptyAdd}
            </Button>
          </Box>
        ) : (
          <Box>
            {menuItems.map((item, i) => (
              <Box key={item.id}>
                {renderMenuItem(item, i, menuItems.length)}
                {item.children && item.children.length > 0 && (
                  item.children.map((child, ci) =>
                    renderMenuItem(child, ci, item.children!.length, true, item.id)
                  )
                )}
                {/* Add sub-item button */}
                <Box
                  sx={{
                    pl: 6, pr: 2.5, py: 0.75,
                    borderBottom: 1, borderColor: 'divider',
                    display: 'flex',
                  }}
                >
                  <Button
                    size="small"
                    startIcon={<AddIcon sx={{ fontSize: '14px !important' }} />}
                    onClick={() => openNewDialog(item.id)}
                    sx={{
                      fontSize: '0.75rem', color: 'text.secondary', fontWeight: 500,
                      '&:hover': { color: 'primary.light', bgcolor: 'transparent' },
                    }}
                  >
                    {t.addSubitem}
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      {/* Preview */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: 1,
          borderColor: 'divider',
          bgcolor: theme === 'dark' ? 'rgba(26,26,46,0.6)' : 'background.paper',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 2.5, pb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {t.preview}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t.previewDesc}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            borderRadius: 3,
            m: 2,
            bgcolor: theme === 'dark' ? 'rgba(15,15,23,0.8)' : 'rgba(248,249,252,0.8)',
            border: 1,
            borderColor: 'divider',
            overflowX: 'auto',
          }}
        >
          {/* Logo */}
          <Box sx={{
            background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontWeight: 800, fontSize: '1.2rem', mr: 3, flexShrink: 0,
          }}>
            ⬡ Lorem
          </Box>

          {/* Nav links preview */}
          <Stack direction="row" spacing={2.5} sx={{ flexGrow: 1 }}>
            {menuItems.filter(mi => mi.visible).map((item) => (
              <Typography
                key={item.id}
                sx={{
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: 'text.secondary',
                  whiteSpace: 'nowrap',
                  '&:hover': { color: 'primary.light' },
                  cursor: 'default',
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Paper>

      {/* Edit/New dialog */}
      <Dialog
        open={editDialog.open}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 0 }}>
          {editDialog.isNew ? t.dialog.titleNew : t.dialog.titleEdit}
        </DialogTitle>
        <DialogContent sx={{ px: 0, pb: 0 }}>
          <Tabs
            value={dialogTab}
            onChange={(_, v) => setDialogTab(v)}
            sx={{ px: 3, borderBottom: 1, borderColor: 'divider', minHeight: 40, '& .MuiTab-root': { minHeight: 40, py: 1, textTransform: 'none', fontSize: '0.85rem' } }}
          >
            <Tab icon={<LinkIcon sx={{ fontSize: 18 }} />} iconPosition="start" label={t.dialog.tabCustom} />
            {pages && pages.length > 0 && <Tab icon={<DescriptionIcon sx={{ fontSize: 18 }} />} iconPosition="start" label={t.dialog.tabPages(pages.length)} />}
            {articles && articles.length > 0 && <Tab icon={<ArticleIcon sx={{ fontSize: 18 }} />} iconPosition="start" label={t.dialog.tabArticles(articles.length)} />}
          </Tabs>

          {dialogTab === 0 && (
            <Stack spacing={2.5} sx={{ mt: 2, px: 3 }}>
              <TextField
                fullWidth
                label={t.dialog.fields.label}
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                placeholder={t.dialog.fields.labelPlaceholder}
                sx={inputSx}
              />
              <TextField
                fullWidth
                label={t.dialog.fields.url}
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder={t.dialog.fields.urlPlaceholder}
                sx={inputSx}
              />
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t.dialog.fields.target}</InputLabel>
                <Select
                  label={t.dialog.fields.target}
                  value={editTarget}
                  onChange={(e) => setEditTarget(e.target.value as '_self' | '_blank')}
                >
                  <MenuItem value="_self">{t.dialog.fields.targetSelf}</MenuItem>
                  <MenuItem value="_blank">{t.dialog.fields.targetBlank}</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}

          {/* Pages tab */}
          {dialogTab === 1 && pages && pages.length > 0 && (
            <List dense sx={{ maxHeight: 320, overflowY: 'auto' }}>
              {pages.map((p) => (
                <ListItemButton
                  key={p.slug}
                  selected={editUrl === '/' + p.slug}
                  onClick={() => selectLinkable(p, '/')}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <DescriptionIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={p.title}
                    secondary={'/' + p.slug}
                    primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                    secondaryTypographyProps={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                  />
                  <Chip
                    label={p.status === 'published' ? t.dialog.statusPublished : t.dialog.statusDraft}
                    size="small"
                    sx={{
                      height: 22, fontSize: '0.7rem', fontWeight: 600,
                      bgcolor: p.status === 'published' ? 'rgba(6,214,160,0.12)' : 'rgba(149,149,173,0.12)',
                      color: p.status === 'published' ? '#06d6a0' : '#9595ad',
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          )}

          {/* Articles tab - index depends on whether pages tab exists */}
          {((pages && pages.length > 0 && dialogTab === 2) || ((!pages || pages.length === 0) && dialogTab === 1)) && articles && articles.length > 0 && (
            <List dense sx={{ maxHeight: 320, overflowY: 'auto' }}>
              {articles.map((a) => (
                <ListItemButton
                  key={a.slug}
                  selected={editUrl === '/article/' + a.slug}
                  onClick={() => selectLinkable(a, '/article/')}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <ArticleIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={a.title}
                    secondary={'/article/' + a.slug}
                    primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                    secondaryTypographyProps={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                  />
                  <Chip
                    label={a.status === 'published' ? t.dialog.statusPublished : t.dialog.statusDraft}
                    size="small"
                    sx={{
                      height: 22, fontSize: '0.7rem', fontWeight: 600,
                      bgcolor: a.status === 'published' ? 'rgba(6,214,160,0.12)' : 'rgba(149,149,173,0.12)',
                      color: a.status === 'published' ? '#06d6a0' : '#9595ad',
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          )}

          {/* Show selected values summary when on pages/articles tab */}
          {dialogTab !== 0 && (editLabel || editUrl) && (
            <Box sx={{ px: 3, pt: 2, pb: 1, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
                {t.dialog.selected}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{editLabel}</Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{editUrl}</Typography>
              </Stack>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={closeDialog} sx={{ color: 'text.secondary', borderRadius: 2 }}>
            {t.dialog.cancel}
          </Button>
          <Button
            onClick={saveItem}
            variant="contained"
            disabled={!editLabel || !editUrl}
            sx={{
              background: 'linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%)',
              borderRadius: 2,
              px: 3,
            }}
          >
            {editDialog.isNew ? t.dialog.add : t.dialog.saveItem}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
