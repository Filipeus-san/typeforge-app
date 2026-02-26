import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useT } from '../../i18n';

interface ConfirmDialogProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, message, onConfirm, onCancel }: ConfirmDialogProps) {
  const t = useT('common');
  return (
    <Modal show={open} onHide={onCancel} centered size="sm">
      <Modal.Body className="text-center py-4">
        <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>{message}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn-outline-tf btn-sm" onClick={onCancel} style={{ padding: '0.5rem 1.5rem', borderRadius: 8 }}>{t.confirm.cancel}</button>
          <button className="btn-primary-tf btn-sm" onClick={onConfirm} style={{ padding: '0.5rem 1.5rem', borderRadius: 8 }}>{t.confirm.confirm}</button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
