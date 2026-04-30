# Pixel Drawing

Pixel Drawing to lokalny edytor pixel art w przeglądarce.  
Repo zostało zmodernizowane do modularnego stacku TypeScript + Vite z bazowym CI, testami i security.

## Stack i narzędzia

- **Runtime:** przeglądarka (Vite)
- **Język:** TypeScript (strict)
- **Testy:** Vitest + jsdom + coverage
- **Jakość:** ESLint + Prettier + typecheck
- **CI:** GitHub Actions
- **Security:** CodeQL, Dependency Review, Dependabot

## Szybki start

```bash
npm install
npm run dev
```

## Dostępne skrypty

- `npm run dev` - serwer developerski
- `npm run build` - typecheck + build produkcyjny
- `npm run preview` - podgląd builda
- `npm run lint` - analiza statyczna
- `npm run typecheck` - walidacja typów
- `npm run test:run` - testy z coverage
- `npm run format` - formatowanie
- `npm run format:check` - walidacja formatu

## Aktualne funkcje

- konfigurowalna siatka (1-35 x 1-35)
- tryb rysowania i gumki
- czyszczenie siatki
- autosave projektu do `localStorage`
- eksport projektu do JSON

## Struktura projektu

- `src/features/editor` - domena i UI edytora
- `src/features/project-storage` - trwałość danych
- `src/features/export-sharing` - eksport projektu

Szczegóły architektury, runbooki i metryki znajdują się w `docs/`.

## Język

[English](/README.md)
