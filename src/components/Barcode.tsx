'use client';

import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
  displayValue?: boolean;
  className?: string;
  lineColor?: string;
}

export const Barcode: React.FC<BarcodeProps> = ({
  value,
  width = 1.4,
  height = 36,
  displayValue = false,
  className = '',
  lineColor = '#000000',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, String(value), {
          format: 'CODE128',
          width,
          height,
          displayValue,
          margin: 0,
          lineColor,
          background: 'transparent',
        });
      } catch (err) {
        console.warn('Barcode generation error for value:', value, err);
      }
    }
  }, [value, width, height, displayValue, lineColor]);

  if (!value) return null;

  return <svg ref={svgRef} className={className} />;
};
