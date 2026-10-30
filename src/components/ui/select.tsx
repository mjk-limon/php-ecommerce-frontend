'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, Search, X } from 'lucide-react';

export interface SelectOption<T = string | number> {
  value: T;
  label: string;
  sublabel?: React.ReactNode;
  icon?: React.ReactNode;
  group?: string;
  disabled?: boolean;
}

export interface SelectProps<T = string | number> {
  options: SelectOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T, option: SelectOption<T>) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  groupBy?: boolean;
  error?: string | boolean;
  id?: string;
  name?: string;
  required?: boolean;
}

export function Select<T = string | number>({
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  searchable = true,
  disabled = false,
  className,
  triggerClassName,
  dropdownClassName,
  groupBy = true,
  error,
  id,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<T | undefined>(
    value !== undefined ? value : defaultValue
  );
  const [searchQuery, setSearchQuery] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Synchronize internal value when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const currentValue = value !== undefined ? value : internalValue;

  // Find currently selected option
  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === currentValue);
  }, [options, currentValue]);

  // Handle outside click to close dropdown
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Autofocus search on open
  useEffect(() => {
    if (isOpen && searchable) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 40);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery('');
    }
  }, [isOpen, searchable]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return options;

    return options.filter((opt) => {
      const matchLabel = opt.label.toLowerCase().includes(q);
      const matchSublabel =
        typeof opt.sublabel === 'string' && opt.sublabel.toLowerCase().includes(q);
      const matchGroup = opt.group && opt.group.toLowerCase().includes(q);
      return matchLabel || matchSublabel || matchGroup;
    });
  }, [options, searchQuery]);

  // Group filtered options if grouping enabled and any option has group
  const groupedData = useMemo(() => {
    const hasAnyGroup = options.some((opt) => Boolean(opt.group));
    if (!groupBy || !hasAnyGroup) {
      return [{ groupName: null, items: filteredOptions }];
    }

    const groupsMap = new Map<string, SelectOption<T>[]>();
    const ungrouped: SelectOption<T>[] = [];

    filteredOptions.forEach((opt) => {
      if (opt.group) {
        if (!groupsMap.has(opt.group)) {
          groupsMap.set(opt.group, []);
        }
        groupsMap.get(opt.group)!.push(opt);
      } else {
        ungrouped.push(opt);
      }
    });

    const result: { groupName: string | null; items: SelectOption<T>[] }[] = [];

    if (ungrouped.length > 0) {
      result.push({ groupName: null, items: ungrouped });
    }

    groupsMap.forEach((items, groupName) => {
      result.push({ groupName, items });
    });

    return result;
  }, [filteredOptions, groupBy, options]);

  const handleSelect = (option: SelectOption<T>) => {
    if (option.disabled) return;
    setInternalValue(option.value);
    onChange?.(option.value, option);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={containerRef} className={cn('relative w-full select-none', className)}>
      {/* Trigger button/div */}
      <div
        id={id}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
          } else if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
        className={cn(
          'w-full flex items-center justify-between text-left rounded-xs border border-[#D1D5DB] dark:border-[#374151] bg-white dark:bg-[#1A1916] px-3 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer min-h-[40px]',
          isOpen ? 'ring-1 ring-primary border-primary' : '',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
          disabled ? 'cursor-not-allowed opacity-50 bg-[#F3F4F6] dark:bg-[#202020]' : '',
          triggerClassName
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {selectedOption?.icon && (
            <div className="shrink-0 flex items-center justify-center">
              {selectedOption.icon}
            </div>
          )}
          {selectedOption ? (
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-xs truncate text-[#1F1D1A] dark:text-[#EDE7DE] leading-tight">
                {selectedOption.label}
              </div>
              {selectedOption.sublabel && (
                <div className="text-[10px] text-[#736C62] dark:text-[#9E968B] truncate leading-tight mt-0.5">
                  {selectedOption.sublabel}
                </div>
              )}
            </div>
          ) : (
            <span className="text-[#9CA3AF] truncate text-xs">{placeholder}</span>
          )}
        </div>

        <ChevronDown
          className={cn(
            'w-4 h-4 text-[#736C62] dark:text-[#9E968B] shrink-0 ml-2 transition-transform duration-200',
            isOpen ? 'rotate-180 text-primary' : ''
          )}
        />
      </div>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          className={cn(
            'absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xs border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#1A1916] shadow-xl overflow-hidden',
            dropdownClassName
          )}
        >
          {/* Live Search Input */}
          {searchable && (
            <div className="p-2 border-b border-[#F0EDE8] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#161513]">
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 absolute left-2.5 text-[#9CA3AF] pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-white dark:bg-[#1E1C19] border border-[#D1D5DB] dark:border-[#374151] rounded-xs text-[#1F1D1A] dark:text-[#EDE7DE] placeholder-[#9CA3AF] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsOpen(false);
                    }
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-2 text-[#9CA3AF] hover:text-[#1F1D1A] dark:hover:text-[#EDE7DE] p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options list */}
          <div className="max-h-64 overflow-y-auto divide-y divide-[#F0EDE8]/60 dark:divide-[#2A2A2A]/60 overscroll-contain">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#736C62] dark:text-[#9E968B]">
                <p className="font-medium">No results found</p>
                {searchQuery && (
                  <p className="text-[10px] mt-0.5 opacity-80">
                    No options match &quot;{searchQuery}&quot;
                  </p>
                )}
              </div>
            ) : (
              groupedData.map((group, groupIdx) => (
                <div key={group.groupName || `ungrouped-${groupIdx}`}>
                  {group.groupName && (
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] dark:text-[#6B7280] bg-[#F9FAFB] dark:bg-[#151412] sticky top-0 border-b border-[#F0EDE8] dark:border-[#2A2A2A] z-10 flex items-center justify-between">
                      <span>{group.groupName}</span>
                      <span className="text-[9px] font-mono opacity-70">
                        {group.items.length}
                      </span>
                    </div>
                  )}

                  <div className="divide-y divide-[#F0EDE8]/40 dark:divide-[#2A2A2A]/40">
                    {group.items.map((option) => {
                      const isSelected = option.value === currentValue;

                      return (
                        <div
                          key={String(option.value)}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelect(option)}
                          className={cn(
                            'px-3 py-2.5 flex items-center justify-between gap-2.5 text-xs cursor-pointer transition-colors',
                            isSelected
                              ? 'bg-primary/10 text-primary dark:text-[#E05343] font-medium'
                              : 'hover:bg-[#F5F2ED] dark:hover:bg-[#25221E] text-[#1F1D1A] dark:text-[#EDE7DE]',
                            option.disabled
                              ? 'opacity-40 cursor-not-allowed pointer-events-none'
                              : ''
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            {option.icon && (
                              <div className="shrink-0 flex items-center justify-center">
                                {option.icon}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <div
                                className={cn(
                                  'truncate leading-tight',
                                  isSelected ? 'font-bold' : 'font-medium'
                                )}
                              >
                                {option.label}
                              </div>
                              {option.sublabel && (
                                <div className="text-[10px] text-[#736C62] dark:text-[#9E968B] truncate leading-tight mt-0.5">
                                  {option.sublabel}
                                </div>
                              )}
                            </div>
                          </div>

                          {isSelected && (
                            <Check className="w-4 h-4 text-primary dark:text-[#E05343] shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
