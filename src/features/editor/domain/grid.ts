export const MIN_GRID_SIZE = 1;
export const MAX_GRID_SIZE = 35;
export const DEFAULT_GRID_SIZE = 16;

export function clampGridSize(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_GRID_SIZE;
  }

  const normalized = Math.trunc(value);
  return Math.min(MAX_GRID_SIZE, Math.max(MIN_GRID_SIZE, normalized));
}

export function formatGridSize(value: number): string {
  return clampGridSize(value).toString().padStart(2, "0");
}

export function createCellId(row: number, column: number): string {
  return `cell-${row}-${column}`;
}

export function createCellIndex(row: number, column: number, width: number): number {
  if (!Number.isInteger(width) || width < 1) {
    throw new RangeError("Grid width must be a positive integer.");
  }

  if (!Number.isInteger(row) || !Number.isInteger(column) || row < 0 || column < 0) {
    throw new RangeError("Grid coordinates must be non-negative integers.");
  }

  return row * width + column;
}
