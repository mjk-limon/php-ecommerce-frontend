'use client';

import { ErrorPage } from '@/components/ErrorPage';
import type { AppError } from '@/lib/errors';

export default function Error({ error, reset }: { error: AppError; reset: () => void }) {
  return <ErrorPage error={error} reset={reset} />;
}