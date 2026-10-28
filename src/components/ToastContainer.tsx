'use client';

import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import React from 'react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3.5 rounded-sm border shadow-lg flex items-center justify-between gap-3 text-xs animate-slide-in ${
            toast.type === 'success'
              ? 'bg-[#FBF9F5] dark:bg-[#1A1916] border-[#1F6E54] text-[#1F1D1A] dark:text-[#EDE7DE]'
              : toast.type === 'error'
              ? 'bg-[#FDF7F5] dark:bg-[#251D1B] border-[#BA2D1D] text-primary dark:text-[#E05343]'
              : 'bg-[#FBF9F5] dark:bg-[#1A1916] border-[#DCD5C9] dark:border-[#38332C] text-[#1F1D1A] dark:text-[#EDE7DE]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#1F6E54] shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-primary shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#3498DB] shrink-0" />}
            <span className="font-medium leading-snug">{toast.message}</span>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-[#9A9184] hover:text-[#1F1D1A] dark:hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
