'use client';

import { ErrorPage } from '@/components/ErrorPage';
import type { AppError } from '@/lib/errors';
import './globals.css';

export default function GlobalError({ error, reset }: { error: AppError; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <ErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
}