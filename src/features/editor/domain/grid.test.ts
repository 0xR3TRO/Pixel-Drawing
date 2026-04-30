import { describe, expect, it } from "vitest";
import {
  clampGridSize,
  createCellIndex,
  createCellId,
  formatGridSize,
  MAX_GRID_SIZE,
  MIN_GRID_SIZE
} from "./grid";

describe("grid helpers", () => {
  it("clamps values to allowed range", () => {
    expect(clampGridSize(MIN_GRID_SIZE - 100)).toBe(MIN_GRID_SIZE);
    expect(clampGridSize(MAX_GRID_SIZE + 100)).toBe(MAX_GRID_SIZE);
  });

  it("formats values as two digits", () => {
    expect(formatGridSize(1)).toBe("01");
    expect(formatGridSize(12)).toBe("12");
  });

  it("creates deterministic cell IDs", () => {
    expect(createCellId(2, 4)).toBe("cell-2-4");
  });

  it("resolves index based on row and column", () => {
    expect(createCellIndex(3, 5, 20)).toBe(65);
  });

  it("throws for invalid coordinates", () => {
    expect(() => createCellIndex(Number.NaN, 0, 10)).toThrow();
    expect(() => createCellIndex(0, -1, 10)).toThrow();
    expect(() => createCellIndex(0, 0, 0)).toThrow();
  });
});
