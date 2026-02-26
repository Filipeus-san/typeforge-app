import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { CardSection } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/form/Select';
import { FormGroup } from '../../components/form/FormGroup';
import { ConfirmDialog } from '../../components/data/ConfirmDialog';
import { formatDate } from '../../utils';
import { useT } from '../../i18n';

interface MediaProps {
  mediaItems: { id: string; filename: string; contentType: string; storagePath: string; url: string; createdAt: string }[];
  typeFilter: string;
}

function getMediaTypeIcon(contentType: string): string {
  if (contentType.startsWith('image/')) return 'file-earmark-image';
  if (contentType.startsWith('video/')) return 'file-earmark-play';
  if (contentType.startsWith('audio/')) return 'file-earmark-music';
  if (contentType.includes('pdf')) return 'file-earmark-pdf';
  return 'file-earmark';
}

function matchesTypeFilter(contentType: string, filter: string): boolean {
  if (!filter) return true;
  if (filter === 'image') return contentType.startsWith('image/');
  if (filter === 'video') return contentType.startsWith('video/');
  if (filter === 'audio') return contentType.startsWith('audio/');
  if (filter === 'document') {
    return !contentType.startsWith('image/') && !contentType.startsWith('video/') && !contentType.startsWith('audio/');
  }
  return true;
}

export function MediaPage({ mediaItems, typeFilter }: MediaProps) {
  const t = useT('media');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<typeof mediaItems[0] | null>(null);
  const [confirmState, setConfirmState] = useState<{ url: string; message: string } | null>(null);

  const TYPE_FILTER_OPTIONS = [
    { value: '', label: t.filters.allTypes },
    { value: 'image', label: t.filters.images },
    { value: 'document', label: t.filters.documents },
    { value: 'video', label: t.filters.videos },
    { value: 'audio', label: 'Audio' },
  ];

  const filteredItems = mediaItems.filter((m) => matchesTypeFilter(m.contentType, typeFilter));

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams(window.location.search);
    if (val) params.set('type', val);
    else params.delete('type');
    window.location.search = params.toString();
  };

  const handleDelete = (item: typeof mediaItems[0]) => {
    setConfirmState({
      url: `/admin/media/delete?id=${item.id}`,
      message: t.confirm.deleteFile,
    });
  };

  return (
    <AdminLayout
      title={t.headings.admin}
      activePage="media"
      headerActions={
        <Button variant="primary" size="sm" icon="upload" onClick={() => setUploadOpen(true)}>
          {t.actions.upload}
        </Button>
      }
    >
      {/* Filter Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="filter-bar mb-0">
          <Select
            filter
            options={TYPE_FILTER_OPTIONS}
            name="type"
            value={typeFilter}
            onChange={handleFilterChange}
          />
        </div>
        <span className="text-muted-tf small">{filteredItems.length} polozek</span>
      </div>

      {/* Media Grid */}
      <CardSection>
        {filteredItems.length === 0 ? (
          <div className="text-center text-muted-tf py-5">
            <Icon name="images" size="xl" />
            <p className="mt-2">{t.empty.noMedia}</p>
            <p className="small">{t.empty.uploadHint}</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1rem',
          }}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="media-grid-item"
                style={{
                  position: 'relative',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid var(--tf-border)',
                  background: 'var(--tf-surface)',
                  aspectRatio: '1',
                  cursor: 'pointer',
                }}
              >
                {/* Thumbnail / Icon */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {item.contentType.startsWith('image/') ? (
                    <img
                      src={item.url}
                      alt={item.filename}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="text-center">
                      <Icon name={getMediaTypeIcon(item.contentType)} size="xl" className="text-muted-tf" />
                      <div className="text-muted-tf small mt-1" style={{
                        maxWidth: 140,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        padding: '0 0.5rem',
                      }}>
                        {item.filename}
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Overlay */}
                <div
                  className="media-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.65)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    padding: '0.5rem',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
                >
                  <div style={{
                    color: '#fff',
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    marginBottom: '0.5rem',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.filename}
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn-outline-tf btn-sm"
                      style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                      onClick={(e) => { e.stopPropagation(); setPreviewItem(item); }}
                    >
                      <Icon name="eye" /> {t.actions.open}
                    </button>
                    <button
                      type="button"
                      className="btn-outline-tf btn-sm"
                      style={{ color: '#ff6b6b', borderColor: 'rgba(255,107,107,0.5)', fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                      onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
                    >
                      <Icon name="trash" /> {t.actions.delete}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardSection>

      {/* Upload Modal */}
      {uploadOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setUploadOpen(false)}
          />
          <div style={{
            position: 'relative',
            background: 'var(--tf-surface)',
            border: '1px solid var(--tf-border)',
            borderRadius: 16,
            padding: '2rem',
            maxWidth: 450,
            width: '90%',
          }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ margin: 0 }}>{t.form.uploadTitle}</h5>
              <button type="button" className="btn-action" onClick={() => setUploadOpen(false)}>
                <Icon name="x-lg" />
              </button>
            </div>
            <form method="post" encType="multipart/form-data" action="/admin/media/upload">
              <div className="mb-3">
                <FormGroup label={t.form.selectFile} required>
                  <Form.Control type="file" name="file" required />
                </FormGroup>
              </div>
              <div className="mb-3">
                <FormGroup label={t.form.altText}>
                  <Form.Control type="text" name="alt_text" placeholder={t.form.altPlaceholder} />
                </FormGroup>
              </div>
              <div className="d-flex gap-2 justify-content-end">
                <button type="button" className="btn-outline-tf btn-sm" onClick={() => setUploadOpen(false)}>
                  {t.actions.cancelBtn}
                </button>
                <button type="submit" className="btn-add">
                  <Icon name="upload" /> {t.actions.uploadBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewItem && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }}
            onClick={() => setPreviewItem(null)}
          />
          <div style={{
            position: 'relative',
            background: 'var(--tf-surface)',
            border: '1px solid var(--tf-border)',
            borderRadius: 16,
            padding: '1.5rem',
            maxWidth: 800,
            width: '90%',
            maxHeight: '85vh',
            overflow: 'auto',
          }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ margin: 0 }}>{previewItem.filename}</h5>
              <button type="button" className="btn-action" onClick={() => setPreviewItem(null)}>
                <Icon name="x-lg" />
              </button>
            </div>
            {previewItem.contentType.startsWith('image/') ? (
              <img
                src={previewItem.url}
                alt={previewItem.filename}
                style={{ width: '100%', borderRadius: 8, objectFit: 'contain', maxHeight: '60vh' }}
              />
            ) : (
              <div className="text-center py-4">
                <Icon name={getMediaTypeIcon(previewItem.contentType)} size="xl" />
                <p className="mt-2">{previewItem.filename}</p>
                <a href={previewItem.url} target="_blank" rel="noopener noreferrer" className="btn-outline-tf btn-sm">
                  <Icon name="download" /> Stahnout
                </a>
              </div>
            )}
            <div className="text-muted-tf small mt-3">
              <div>Typ: {previewItem.contentType}</div>
              <div>Nahrano: {formatDate(previewItem.createdAt)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={!!confirmState}
        message={confirmState?.message || ''}
        onConfirm={() => { if (confirmState) window.location.href = confirmState.url; }}
        onCancel={() => setConfirmState(null)}
      />
    </AdminLayout>
  );
}
