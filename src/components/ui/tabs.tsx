'use client';

import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export const Tabs: React.FC<{
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}> = ({ value, onValueChange, children, className }) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <div className={cn('w-full', className)}>{children}</div>
  </TabsContext.Provider>
);

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div
    className={cn(
      'inline-flex items-center justify-start rounded-xs bg-[#F3F4F6] dark:bg-[#262626] p-1 text-[#6B7280]',
      className
    )}
    {...props}
  />
);

export const TabsTrigger: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs');
  const isActive = ctx.value === value;

  return (
    <button
      type="button"
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-xs px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer',
        isActive
          ? 'bg-white dark:bg-[#1E1E1E] text-[#1F1D1A] dark:text-[#EDE7DE] shadow-xs font-semibold'
          : 'text-[#6B7280] hover:text-[#111827] dark:hover:text-[#F3F4F6]',
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsContent must be used within Tabs');
  if (ctx.value !== value) return null;

  return <div className={cn('pt-4 focus-visible:outline-none', className)}>{children}</div>;
};

