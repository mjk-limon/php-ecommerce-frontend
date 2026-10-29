'use client';

import { isServerApiError, type AppError } from '@/lib/errors';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface ErrorPageProps {
  error: AppError;
  reset: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  const isApiError = isServerApiError(error);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#faf9f7] px-4 py-16 dark:bg-[#121212]">
      <section className="w-full max-w-xl rounded-3xl border border-[#eee8e2] bg-white p-8 text-center shadow-[0_20px_70px_rgba(54,27,42,0.08)] sm:p-12 dark:border-[#2a2a2a] dark:bg-[#1e1e1e]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#68183f]/10 text-[#68183f] dark:bg-[#e05343]/10 dark:text-[#e05343]">
          <AlertTriangle aria-hidden="true" size={30} />
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#68183f] dark:text-[#e05343]">
          {isApiError ? 'Service unavailable' : 'Something went wrong'}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#1f1d1a] sm:text-4xl dark:text-[#f3f4f6]">
          {isApiError ? 'We couldn’t load this page' : 'We hit an unexpected error'}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#6b7280] dark:text-[#9ca3af]">
          {isApiError
            ? 'The store service is temporarily unavailable. Please try again in a moment.'
            : 'Please try again. If the problem continues, return to the homepage and start again.'}
        </p>
        {error.digest && (
          <p className="mt-5 text-xs text-[#9ca3af]">Reference: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            <RefreshCw aria-hidden="true" size={16} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e7e9e5] px-5 py-3 text-sm font-semibold text-[#1f1d1a] hover:bg-[#faf9f7] dark:border-[#3a3a3a] dark:text-[#f3f4f6] dark:hover:bg-[#252525]"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}