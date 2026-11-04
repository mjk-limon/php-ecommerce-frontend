"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onValueChange: (val: [number, number]) => void;
  onValueCommit?: (val: [number, number]) => void;
  className?: string;
  disabled?: boolean;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  onValueCommit,
  className,
  disabled = false,
}) => {
  const [minVal, maxVal] = value;
  const minValRef = useRef(minVal);
  const maxValRef = useRef(maxVal);

  useEffect(() => {
    minValRef.current = minVal;
    maxValRef.current = maxVal;
  }, [minVal, maxVal]);

  const range = Math.max(1, max - min);
  const minPercent = Math.min(Math.max(0, ((minVal - min) / range) * 100), 100);
  const maxPercent = Math.min(Math.max(0, ((maxVal - min) / range) * 100), 100);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxValRef.current);
    onValueChange([val, maxValRef.current]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minValRef.current);
    onValueChange([minValRef.current, val]);
  };

  const handleCommit = () => {
    onValueCommit?.([minValRef.current, maxValRef.current]);
  };

  return (
    <div className={cn("relative w-full py-4 select-none touch-none", className)}>
      {/* Background Track */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-[#E8E2D9] dark:bg-[#312E29] rounded-full" />

      {/* Active Range Highlight */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-primary dark:bg-[#E05343] rounded-full pointer-events-none"
        style={{
          left: `${minPercent}%`,
          width: `${Math.max(0, maxPercent - minPercent)}%`,
        }}
      />

      {/* Min Thumb Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        disabled={disabled}
        onChange={handleMinChange}
        onMouseUp={handleCommit}
        onTouchEnd={handleCommit}
        onKeyUp={handleCommit}
        aria-label="Minimum price"
        className={cn(
          "absolute top-1/2 -translate-y-1/2 left-0 w-full appearance-none bg-transparent pointer-events-none focus:outline-hidden",
          "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary",
          "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing",
          "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
          "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none",
          "[&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full",
          "[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary",
          "[&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing",
          minVal > max - (max - min) * 0.05 && "z-10",
        )}
      />

      {/* Max Thumb Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        disabled={disabled}
        onChange={handleMaxChange}
        onMouseUp={handleCommit}
        onTouchEnd={handleCommit}
        onKeyUp={handleCommit}
        aria-label="Maximum price"
        className={cn(
          "absolute top-1/2 -translate-y-1/2 left-0 w-full appearance-none bg-transparent pointer-events-none focus:outline-hidden",
          "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary",
          "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing",
          "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
          "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none",
          "[&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full",
          "[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary",
          "[&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing",
        )}
      />
    </div>
  );
};
