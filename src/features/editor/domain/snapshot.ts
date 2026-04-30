import type { ProjectSnapshot } from "../contracts";
import { clampGridSize } from "./grid";

export const EMPTY_CELL_COLOR = "transparent";

export function createBlankSnapshot(width: number, height: number): ProjectSnapshot {
  const normalizedWidth = clampGridSize(width);
  const normalizedHeight = clampGridSize(height);
  const totalCells = normalizedWidth * normalizedHeight;

  return {
    width: normalizedWidth,
    height: normalizedHeight,
    cells: Array.from({ length: totalCells }, () => EMPTY_CELL_COLOR),
    updatedAt: new Date().toISOString()
  };
}

export function cloneSnapshot(snapshot: ProjectSnapshot): ProjectSnapshot {
  return {
    width: snapshot.width,
    height: snapshot.height,
    cells: [...snapshot.cells],
    updatedAt: snapshot.updatedAt
  };
}

export function touchSnapshot(snapshot: ProjectSnapshot): ProjectSnapshot {
  snapshot.updatedAt = new Date().toISOString();
  return snapshot;
}
