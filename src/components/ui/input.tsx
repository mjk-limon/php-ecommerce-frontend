'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = {
  icon?: React.ReactNode;
  multiline?: boolean;
  as?: 'input' | 'textarea';
  rows?: number;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
>;

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, type = 'text', icon, multiline = false, as, rows = 3, ...props }, ref) => {
    const isTextarea = multiline || as === 'textarea';

    if (isTextarea) {
      return (
        <div className="relative w-full">
          <textarea
            className={cn(
              'w-full rounded-xs border border-[#D1D5DB] dark:border-[#374151] bg-white dark:bg-[#1A1916] px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] placeholder-[#9CA3AF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y',
              icon ? 'pr-8' : '',
              className
            )}
            rows={rows}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
          {icon && (
            <div className="absolute top-2.5 right-2.5 pointer-events-none text-[#9CA3AF]">
              {icon}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative w-full flex items-center">
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-xs border border-[#D1D5DB] dark:border-[#374151] bg-white dark:bg-[#1A1916] px-3 py-1.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] placeholder-[#9CA3AF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50',
            icon ? 'pr-8' : '',
            className
          )}
          ref={ref as React.Ref<HTMLInputElement>}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
        {icon && (
          <div className="absolute right-2.5 pointer-events-none text-[#9CA3AF]">
            {icon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
