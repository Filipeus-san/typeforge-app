import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { CardSection } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { FormGroup } from '../../components/form/FormGroup';
import { Select } from '../../components/form/Select';

interface BlogFormProps {
  isEdit: boolean;
  editId?: string;
  values?: Record<string, string>;
  allMedia?: { id: string; storagePath: string; url: string; filename: string; contentType: string }[];
  error?: string;
}

export function BlogFormPage({ isEdit, editId, values: initialValues, allMedia = [], error }: BlogFormProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>(initialValues ?? {});
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<string>(initialValues?.featured_image ?? '');

  const statusOptions = [
    { value: 'draft', label: 'Koncept' },
    { value: 'published', label: 'Publikovano' },
    { value: 'archived', label: 'Archivovano' },
  ];

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const imageMedia = allMedia.filter((m) => m.contentType.startsWith('image/'));

  const handleSelectImage = (url: string) => {
    setFeaturedImage(url);
    setMediaPickerOpen(false);
  };

  const handleRemoveImage = () => {
    setFeaturedImage('');
  };

  return (
    <AdminLayout title={isEdit ? 'Upravit clanek' : 'Novy clanek'} activePage="blog">
      {error && <div className="alert alert-danger mb-4">{error}</div>}
      <form method="post">
        {editId && <input type="hidden" name="id" value={editId} />}
        <input type="hidden" name="featured_image" value={featuredImage} />

        <div className="row g-4">
          <div className="col-lg-8">
            <CardSection title="Obsah">
              <div className="row g-3">
                <div className="col-md-8">
                  <FormGroup label="Nazev" required>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      required
                      value={formValues.title ?? ''}
                      onChange={handleChange('title')}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-4">
                  <FormGroup label="Slug">
                    <input
                      type="text"
                      name="slug"
                      className="form-control"
                      value={formValues.slug ?? ''}
                      onChange={handleChange('slug')}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="mb-3 mt-3">
                <FormGroup label="Vytah">
                  <textarea
                    name="excerpt"
                    className="form-control"
                    rows={3}
                    value={formValues.excerpt ?? ''}
                    onChange={handleChange('excerpt')}
                  />
                </FormGroup>
              </div>
              <div className="mb-3">
                <FormGroup label="Obsah">
                  <textarea
                    name="content"
                    className="form-control"
                    rows={15}
                    value={formValues.content ?? ''}
                    onChange={handleChange('content')}
                  />
                </FormGroup>
              </div>
            </CardSection>
          </div>

          <div className="col-lg-4">
            {/* Featured Image Card */}
            <CardSection title="Hlavni obrazek">
              {featuredImage ? (
                <div className="mb-3">
                  <img
                    src={featuredImage}
                    alt="Hlavni obrazek"
                    style={{ width: '100%', borderRadius: 8, objectFit: 'cover', maxHeight: 200 }}
                  />
                  <div className="d-flex gap-2 mt-2">
                    <button
                      type="button"
                      className="btn-outline-tf btn-sm"
                      onClick={() => setMediaPickerOpen(true)}
                    >
                      <Icon name="arrow-repeat" /> Zmenit
                    </button>
                    <button
                      type="button"
                      className="btn-outline-tf btn-sm"
                      style={{ color: 'var(--tf-danger)' }}
                      onClick={handleRemoveImage}
                    >
                      <Icon name="x-lg" /> Odstranit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-3">
                  <Icon name="image" size="xl" className="text-muted-tf" />
                  <p className="text-muted-tf small mt-2 mb-3">Zadny obrazek</p>
                  <button
                    type="button"
                    className="btn-outline-tf btn-sm"
                    onClick={() => setMediaPickerOpen(true)}
                  >
                    <Icon name="images" /> Vybrat z medii
                  </button>
                </div>
              )}
            </CardSection>

            {/* Settings Card */}
            <CardSection title="Nastaveni">
              <div className="mb-3">
                <FormGroup label="Stav">
                  <Select
                    name="status"
                    options={statusOptions}
                    value={formValues.status ?? 'draft'}
                    onChange={handleChange('status')}
                  />
                </FormGroup>
              </div>
              <div className="mb-3">
                <FormGroup label="Kategorie">
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    placeholder="Nazev kategorie"
                    value={formValues.category ?? ''}
                    onChange={handleChange('category')}
                  />
                </FormGroup>
              </div>
              <div className="mb-3">
                <FormGroup label="Doba cteni (min)">
                  <input
                    type="number"
                    name="read_time"
                    className="form-control"
                    min="1"
                    value={formValues.read_time ?? '5'}
                    onChange={handleChange('read_time')}
                  />
                </FormGroup>
              </div>
            </CardSection>

            {/* Submit Card */}
            <CardSection>
              <div className="d-grid gap-2">
                <button type="submit" className="btn-add w-100 justify-content-center">
                  <Icon name="check-lg" /> {isEdit ? 'Ulozit zmeny' : 'Vytvorit clanek'}
                </button>
                <a href="/admin/blog" className="btn btn-outline-tf btn-sm text-center">Zrusit</a>
              </div>
            </CardSection>
          </div>
        </div>
      </form>

      {/* Media Picker Modal */}
      {mediaPickerOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setMediaPickerOpen(false)}
          />
          <div style={{
            position: 'relative',
            background: 'var(--tf-surface)',
            border: '1px solid var(--tf-border)',
            borderRadius: 16,
            padding: '1.5rem',
            maxWidth: 700,
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
          }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ margin: 0 }}>Vybrat obrazek</h5>
              <button
                type="button"
                className="btn-action"
                onClick={() => setMediaPickerOpen(false)}
              >
                <Icon name="x-lg" />
              </button>
            </div>
            {imageMedia.length === 0 ? (
              <div className="text-center text-muted-tf py-4">
                <Icon name="images" size="xl" />
                <p className="mt-2">Zadne obrazky v mediich</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '0.75rem',
              }}>
                {imageMedia.map((media) => (
                  <div
                    key={media.id}
                    onClick={() => handleSelectImage(media.url)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: 8,
                      overflow: 'hidden',
                      border: featuredImage === media.url ? '2px solid var(--tf-primary)' : '2px solid transparent',
                      aspectRatio: '1',
                    }}
                  >
                    <img
                      src={media.url}
                      alt={media.filename}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
