# Repository Guidelines

## Project Structure & Module Organization

The active application is in `src/` and uses the Next.js App Router. Add page routes under `src/app/`, API handlers under `src/app/api/v1/`, reusable UI in `src/components/`, shared state in `src/context/`, and common types or helpers in `src/types/` and `src/lib/`. Product fixtures live in `src/data/mockData.ts`. Static files served directly belong in `public/`; the older Vite implementation is retained in `legacy_vite/` and is not the main application.

## Build, Test, and Development Commands

Run `npm install` to install the dependencies recorded in `package-lock.json`.

- `npm run dev` starts the Next.js development server on port 3000.
- `npm run build` creates the production build.
- `npm run start` serves the production build on port 3000; run it after building.
- `npm run lint` invokes the repository's configured Next.js lint command.

There is no test script currently defined in `package.json`. For changes, at minimum run the build and exercise the affected page or API route locally.

## Coding Style & Naming Conventions

Use TypeScript and React for application code, matching the existing `.ts` and `.tsx` files. Follow nearby formatting: two-space indentation, semicolons, and single quotes where consistent with the file. Use PascalCase for React component files and component names (for example, `ProductCard.tsx`), lowercase route segment names, and descriptive camelCase for functions and variables. Keep shared UI in `src/components/` and avoid duplicating API or data logic across pages.

## Testing Guidelines

No automated test framework or coverage requirement is configured. If adding tests, keep them near the feature or in a clearly named test directory and document how to run them. Verify user-facing changes in the browser and confirm API changes with representative requests.

## Commit & Pull Request Guidelines

No project-specific commit convention is available from the repository history. Use a short imperative commit subject, such as `Add order tracking page`. Pull requests should summarize the user-visible change, note affected routes or APIs, list validation performed, and include screenshots for visual changes. Link related issues when available.

## Security & Configuration

Keep secrets and local credentials in `.env`; do not commit them. Use `.env.example` to document required variable names without real values. Validate configuration and user input at API boundaries.
