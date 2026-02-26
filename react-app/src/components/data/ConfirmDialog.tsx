import React from 'react';
import { useT } from '../../i18n';

interface ConfirmDialogProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, message, onConfirm, onCancel }: ConfirmDialogProps) {
  const t = useT('common');
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={onCancel} />
      <div style={{
        position: 'relative', background: 'var(--tf-surface)', border: '1px solid var(--tf-border)',
        borderRadius: 16, padding: '2rem', maxWidth: 400, width: '90%', textAlign: 'center',
      }}>
        <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>{message}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn-outline-tf btn-sm" onClick={onCancel} style={{ padding: '0.5rem 1.5rem', borderRadius: 8 }}>{t.confirm.cancel}</button>
          <button className="btn-primary-tf btn-sm" onClick={onConfirm} style={{ padding: '0.5rem 1.5rem', borderRadius: 8 }}>{t.confirm.confirm}</button>
        </div>
      </div>
    </div>
  );
}
