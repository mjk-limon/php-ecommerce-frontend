'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: 'right' | 'left';
  className?: string;
}

export const Sheet: React.FC<SheetProps> = ({
  open,
  onOpenChange,
  children,
  side = 'right',
  className
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />
      {/* Panel */}
      <div
        className={cn(
          'relative z-50 h-full w-full max-w-md bg-white dark:bg-[#1A1916] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out',
          side === 'right' ? 'ml-auto translate-x-0' : 'mr-auto translate-x-0',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const SheetHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('p-4 border-b border-[#F0EDE8] dark:border-[#2A2A2A] flex items-center justify-between', className)} {...props} />
);

export const SheetTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h2 className={cn('text-sm font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]', className)} {...props} />
);

export const SheetClose: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <button
    onClick={onClose}
    aria-label="Close"
    className="p-1 rounded hover:bg-[#F3F4F6] dark:hover:bg-[#2A2A2A] text-[#6B7280] hover:text-[#111827] dark:hover:text-[#F3F4F6] transition-colors cursor-pointer"
  >
    <X className="w-4 h-4" />
  </button>
);

