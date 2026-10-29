export const SERVER_API_ERROR_DIGEST = 'SERVER_API_ERROR';

export type AppError = Error & { digest?: string };

export function isServerApiError(error: AppError): boolean {
  return error.digest === SERVER_API_ERROR_DIGEST;
}