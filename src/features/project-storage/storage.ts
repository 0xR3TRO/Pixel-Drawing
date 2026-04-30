import type { ProjectSnapshot } from "../editor/contracts";

const STORAGE_KEY = "pixel-drawing:last-project";
const STORAGE_VERSION = 1;

export interface PersistedProject extends ProjectSnapshot {
  version: number;
}

function isPersistedProject(value: unknown): value is PersistedProject {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<PersistedProject>;
  return (
    candidate.version === STORAGE_VERSION &&
    typeof candidate.width === "number" &&
    typeof candidate.height === "number" &&
    Array.isArray(candidate.cells) &&
    candidate.cells.every((entry) => typeof entry === "string") &&
    typeof candidate.updatedAt === "string"
  );
}

export function saveProject(snapshot: ProjectSnapshot): void {
  const payload: PersistedProject = {
    version: STORAGE_VERSION,
    width: snapshot.width,
    height: snapshot.height,
    cells: snapshot.cells,
    updatedAt: snapshot.updatedAt
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadProject(): PersistedProject | null {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === null) {
    return null;
  }

  const parsed: unknown = JSON.parse(raw);

  if (!isPersistedProject(parsed)) {
    throw new Error("Stored project has invalid structure.");
  }

  return parsed;
}

export function clearStoredProject(): void {
  localStorage.removeItem(STORAGE_KEY);
}
