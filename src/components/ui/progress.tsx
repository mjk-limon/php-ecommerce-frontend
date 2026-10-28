import { cn } from '@/lib/utils';
import React from 'react';

export const Progress: React.FC<{
  value?: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}> = ({ value = 0, max = 100, className, indicatorClassName }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-[#E5E7EB] dark:bg-[#374151]',
        className
      )}
    >
      <div
        className={cn('h-full bg-primary transition-all duration-300 ease-out', indicatorClassName)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export const Separator: React.FC<{
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}> = ({ orientation = 'horizontal', className }) => {
  return (
    <div
      className={cn(
        'bg-[#E5E7EB] dark:bg-[#2A2A2A] shrink-0',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
    />
  );
};

