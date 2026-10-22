import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', icon, ...props }, ref) => {
    return (
      <div className="relative w-full flex items-center">
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-xs border border-[#D1D5DB] dark:border-[#374151] bg-white dark:bg-[#1A1916] px-3 py-1.5 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] placeholder-[#9CA3AF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#BA2D1D] focus-visible:border-[#BA2D1D] disabled:cursor-not-allowed disabled:opacity-50',
            icon ? 'pr-8' : '',
            className
          )}
          ref={ref}
          {...props}
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

