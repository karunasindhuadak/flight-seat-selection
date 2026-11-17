import { useEffect, useCallback } from 'react';
import { useBooking } from '../../hooks/useBooking';

const TOAST_STYLES = {
  success: 'bg-emerald-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-indigo-600 text-white',
};

const TOAST_ICONS = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

export default function Toast() {
  const { toast, clearToast } = useBooking();

  const handleClose = useCallback(() => clearToast(), [clearToast]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(handleClose, 3000);
    return () => clearTimeout(timer);
  }, [toast, handleClose]);

  if (!toast) return null;

  const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
  const icon = TOAST_ICONS[toast.type] || TOAST_ICONS.info;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-sm ${style}`}
      >
        <span className="text-lg font-bold shrink-0">{icon}</span>
        <p className="text-sm font-medium">{toast.message}</p>
        <button
          onClick={handleClose}
          className="ml-2 shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
