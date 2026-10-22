'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type NgProgressState = {
  active: boolean;
  progress: number;
};

// Global singleton controller for NgProgress
class NgProgressController {
  private listeners: Set<(state: NgProgressState) => void> = new Set();
  private timer: NodeJS.Timeout | null = null;
  private state: NgProgressState = { active: false, progress: 0 };

  subscribe(listener: (state: NgProgressState) => void) {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l({ ...this.state }));
  }

  start() {
    if (this.timer) clearInterval(this.timer);
    this.state = { active: true, progress: 0.15 };
    this.notify();

    this.timer = setInterval(() => {
      if (this.state.progress < 0.85) {
        const increment = (0.9 - this.state.progress) * 0.15;
        this.state.progress += increment;
        this.notify();
      }
    }, 200);
  }

  done() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.state.progress = 1;
    this.notify();

    setTimeout(() => {
      this.state = { active: false, progress: 0 };
      this.notify();
    }, 350);
  }
}

export const ngProgress = new NgProgressController();

export const NgProgressBar: React.FC = () => {
  const [state, setState] = useState<NgProgressState>({ active: false, progress: 0 });
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    return ngProgress.subscribe(setState);
  }, []);

  // Trigger progress on route change
  useEffect(() => {
    ngProgress.start();
    const timeout = setTimeout(() => {
      ngProgress.done();
    }, 300);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  if (!state.active && state.progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[9999]"
    >
      {/* Top glowing bar */}
      <div
        className="h-[3px] bg-gradient-to-r from-[#BA2D1D] via-[#E05343] to-[#581845] shadow-[0_0_10px_#BA2D1D,0_0_5px_#581845] transition-all duration-200 ease-out"
        style={{
          width: `${state.progress * 100}%`,
          opacity: state.progress === 1 ? 0 : 1,
          transition: 'width 200ms ease-out, opacity 350ms 150ms ease-in'
        }}
      />
      {/* Spinner */}
      {state.active && state.progress < 1 && (
        <div className="fixed top-3 right-3 z-[9999]">
          <div className="w-4 h-4 border-2 border-[#BA2D1D] border-t-transparent rounded-full animate-spin shadow-xs" />
        </div>
      )}
    </div>
  );
};

