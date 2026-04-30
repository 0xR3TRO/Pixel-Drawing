import { describe, expect, it } from "vitest";
import { createBlankSnapshot, EMPTY_CELL_COLOR } from "./snapshot";

describe("snapshot helpers", () => {
  it("creates empty grid snapshot with expected size", () => {
    const snapshot = createBlankSnapshot(4, 3);

    expect(snapshot.width).toBe(4);
    expect(snapshot.height).toBe(3);
    expect(snapshot.cells).toHaveLength(12);
    expect(new Set(snapshot.cells)).toEqual(new Set([EMPTY_CELL_COLOR]));
  });
});
