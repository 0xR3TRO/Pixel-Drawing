# Pixel Editor

A small local-first pixel art editor that runs in the browser. Draw on a grid, erase, clear — your work is saved automatically in the browser.

## Features

- grid from 1×1 up to 35×35
- paint and erase modes
- clear the grid
- autosave in `localStorage`
- export the current project to JSON

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (default: `http://localhost:5173`).

## Scripts

- `npm run dev` — local dev server
- `npm run build` — typecheck and production build
- `npm run preview` — preview the built app
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript checks
- `npm run test:run` — tests once, with coverage
- `npm run format` / `npm run format:check` — Prettier

## Stack

- TypeScript (strict) and Vite
- Vitest and jsdom for tests, with coverage
- ESLint and Prettier
- GitHub Actions: lint, typecheck, tests and build on every push; CodeQL scan; Dependabot once a month, grouped

## Project structure

- `src/features/editor` — grid logic and editor UI
- `src/features/project-storage` — saving to `localStorage`
- `src/features/export-sharing` — JSON export

The architecture decision is recorded in [`docs/adr/0001-local-first-modular-frontend.md`](docs/adr/0001-local-first-modular-frontend.md).

## History

The first version (2024) was a single script. In May 2026 it was rebuilt on TypeScript and Vite. In October 2026 the repository was renamed from `Pixel-Drawing` to `pixel-editor`.

## License

[MIT](LICENSE)

[Polska wersja README](<Documents/README(PL).md>)
