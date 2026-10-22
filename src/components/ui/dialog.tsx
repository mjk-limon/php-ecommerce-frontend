'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children, className }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
      />
      {/* Content */}
      <div
        className={cn(
          'relative z-50 w-full max-w-lg bg-white dark:bg-[#1E1E1E] rounded-xs shadow-xl border border-[#E5E7EB] dark:border-[#2A2A2A] p-6 duration-200 animate-in zoom-in-95',
          className
        )}
      >
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute top-4 right-4 rounded-xs p-1 text-[#6B7280] hover:text-[#111827] dark:hover:text-[#F3F4F6] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left mb-4', className)} {...props} />
);

export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 className={cn('text-base font-semibold leading-none tracking-tight text-[#1F1D1A] dark:text-[#EDE7DE]', className)} {...props} />
);

export const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn('text-xs text-[#6B7280] dark:text-[#9CA3AF]', className)} {...props} />
);

