'use client';

import { cn } from '@/lib/utils';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'dark'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'quickCheckout'
    | 'whatsapp'
    | 'socialFb'
    | 'socialTw'
    | 'socialGoogle';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'pill';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, disabled, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 cursor-pointer select-none';

    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      default:
        'bg-primary hover:bg-primary-hover text-white shadow-xs hover:shadow focus-visible:ring-[#BA2D1D]',
      dark:
        'bg-[#383838] hover:bg-[#252525] text-white shadow-xs hover:shadow focus-visible:ring-[#383838]',
      outline:
        'border border-[#D1D5DB] dark:border-[#374151] bg-transparent hover:bg-[#F3F4F6] dark:hover:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB]',
      secondary:
        'bg-[#F3F4F6] dark:bg-[#1F2937] text-[#111827] dark:text-[#F9FAFB] hover:bg-[#E5E7EB] dark:hover:bg-[#374151]',
      ghost:
        'hover:bg-[#F3F4F6] dark:hover:bg-[#1F2937] text-[#111827] dark:text-[#F9FAFB]',
      link:
        'text-primary hover:underline p-0 h-auto font-normal focus-visible:ring-0',
      quickCheckout:
        'bg-[#4CAF50] hover:bg-[#43A047] text-white font-semibold shadow-md hover:shadow-lg focus-visible:ring-[#4CAF50]',
      whatsapp:
        'bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold shadow-xs hover:shadow focus-visible:ring-[#25D366]',
      socialFb:
        'bg-[#B3B9D6] hover:bg-[#A3AAD0] text-[#1E2B66] font-medium shadow-xs',
      socialTw:
        'bg-[#BAD8FB] hover:bg-[#A6CDFB] text-[#0D47A1] font-medium shadow-xs',
      socialGoogle:
        'bg-[#F6C4BA] hover:bg-[#F3B3A6] text-[#B71C1C] font-medium shadow-xs'
    };

    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
      default: 'h-9 px-4 py-2 text-xs rounded-xs',
      sm: 'h-7 px-3 text-[11px] rounded-xs',
      lg: 'h-11 px-6 text-sm rounded-xs font-semibold',
      icon: 'h-8 w-8 rounded-full p-0',
      pill: 'h-9 px-5 text-xs rounded-full'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

