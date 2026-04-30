import { describe, expect, it } from "vitest";
import { loadProject, saveProject } from "./storage";

describe("project storage", () => {
  it("persists and loads project snapshots", () => {
    saveProject({
      width: 2,
      height: 2,
      cells: ["#000000", "transparent", "#ffffff", "#111111"],
      updatedAt: "2026-05-01T00:00:00.000Z"
    });

    const loaded = loadProject();

    expect(loaded).not.toBeNull();
    expect(loaded?.version).toBe(1);
    expect(loaded?.width).toBe(2);
    expect(loaded?.cells[2]).toBe("#ffffff");
  });

  it("throws for malformed snapshot payload", () => {
    localStorage.setItem("pixel-drawing:last-project", '{"foo": "bar"}');
    expect(() => loadProject()).toThrow("Stored project has invalid structure.");
  });
});
