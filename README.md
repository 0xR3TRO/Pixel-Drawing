# Pixel Drawing

Pixel Drawing is a local-first web editor for pixel art.  
The app is now based on a modular TypeScript + Vite stack with test, lint, security, and CI baselines.

## Runtime and toolchain

- **Runtime:** browser (Vite dev/build pipeline)
- **Language:** TypeScript (strict mode)
- **Tests:** Vitest + jsdom + coverage
- **Quality:** ESLint + Prettier + typecheck
- **CI:** GitHub Actions (`.github/workflows/ci.yml`)
- **Security:** CodeQL, Dependency Review, Dependabot

## Quick start

```bash
npm install
npm run dev
```

Open the URL printed by Vite (default: `http://localhost:5173`).

## Scripts

- `npm run dev` - run local dev server
- `npm run build` - typecheck + production build
- `npm run preview` - preview built app
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript checks
- `npm run test:run` - run tests once with coverage
- `npm run format` - apply formatting
- `npm run format:check` - check formatting

## Current features

- configurable grid size (1-35 x 1-35)
- paint/erase modes
- clear grid
- local persistence in `localStorage`
- JSON export of the current project

## Architecture

The project is split by feature boundaries:

- `src/features/editor` - editor domain + UI orchestration
- `src/features/project-storage` - local persistence contract
- `src/features/export-sharing` - export contract

Additional architecture, runbooks, and metrics are in `docs/`.

## Delivery process

- PR template with risk and rollback section
- mandatory quality gates in CI
- security scans on PR/push

## Language

[Polska wersja README](<Documents/README(PL).md>)
