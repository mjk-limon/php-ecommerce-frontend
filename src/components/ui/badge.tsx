import { cn } from '@/lib/utils';
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'discount' | 'secondary' | 'outline' | 'success' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-primary text-white',
    discount: 'bg-primary text-white font-bold tracking-wider',
    secondary: 'bg-[#F3F4F6] text-[#374151] dark:bg-[#374151] dark:text-[#F3F4F6]',
    outline: 'border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB]',
    success: 'bg-[#10B981] text-white',
    warning: 'bg-[#F59E0B] text-white'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 text-[10px] rounded-xs font-semibold select-none shadow-xs',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

