import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export default function Toast({ toasts, onClose }: ToastProps) {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }: { key?: string; toast: ToastMessage; onClose: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl bg-white/95 backdrop-blur-md ${
        toast.type === 'success'
          ? 'border-emerald-200 text-emerald-900 bg-emerald-50/95 shadow-emerald-500/10'
          : toast.type === 'error'
          ? 'border-rose-200 text-rose-900 bg-rose-50/95 shadow-rose-500/10'
          : 'border-blue-200 text-blue-900 bg-blue-50/95 shadow-blue-500/10'
      }`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" />}
        {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-600" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600" />}
      </div>
      <div className="flex-grow">
        <p className="text-xs font-bold leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className={`flex-shrink-0 p-0.5 rounded-lg hover:bg-black/5 transition-all ${
          toast.type === 'success'
            ? 'text-emerald-500 hover:text-emerald-700'
            : toast.type === 'error'
            ? 'text-rose-500 hover:text-rose-700'
            : 'text-blue-500 hover:text-blue-700'
        }`}
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
