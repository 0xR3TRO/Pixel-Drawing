import { beforeEach } from "vitest";

// Node.js 25+ ships an experimental global `localStorage` that shadows the one
// provided by jsdom (and is unusable without --localstorage-file). Make the
// tests use jsdom's Web Storage on every Node version.
const jsdomStorage = (globalThis as { jsdom?: { window: Window } }).jsdom?.window.localStorage;
if (jsdomStorage && globalThis.localStorage !== jsdomStorage) {
  Object.defineProperty(globalThis, "localStorage", {
    value: jsdomStorage,
    configurable: true,
    writable: true
  });
}

beforeEach(() => {
  localStorage.clear();
});
