# Pixel Editor

Mały edytor pixel art działający lokalnie w przeglądarce. Rysujesz na siatce, wymazujesz, czyścisz — praca zapisuje się automatycznie w przeglądarce.

## Funkcje

- siatka od 1×1 do 35×35
- tryb rysowania i gumki
- czyszczenie siatki
- automatyczny zapis w `localStorage`
- eksport bieżącego projektu do JSON

## Uruchomienie

```bash
npm install
npm run dev
```

Otwórz adres wypisany przez Vite (domyślnie `http://localhost:5173`).

## Skrypty

- `npm run dev` — serwer deweloperski
- `npm run build` — sprawdzenie typów i build produkcyjny
- `npm run preview` — podgląd buildu
- `npm run lint` — ESLint
- `npm run typecheck` — sprawdzenie typów TypeScript
- `npm run test:run` — testy z pokryciem
- `npm run format` / `npm run format:check` — Prettier

## Technologie

- TypeScript (strict) i Vite
- Vitest i jsdom do testów, z pokryciem
- ESLint i Prettier
- GitHub Actions: lint, typy, testy i build przy każdym pushu; skan CodeQL; Dependabot raz w miesiącu, zbiorczo

## Struktura

- `src/features/editor` — logika siatki i interfejs edytora
- `src/features/project-storage` — zapis w `localStorage`
- `src/features/export-sharing` — eksport do JSON

Decyzja architektoniczna: [`docs/adr/0001-local-first-modular-frontend.md`](../docs/adr/0001-local-first-modular-frontend.md).

## Historia

Pierwsza wersja (2024) była jednym skryptem. W maju 2026 projekt przebudowano na TypeScript i Vite. W październiku 2026 repozytorium zmieniło nazwę z `Pixel-Drawing` na `pixel-editor`.

## Licencja

[MIT](../LICENSE)

[English README](../README.md)
