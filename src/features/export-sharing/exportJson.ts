import type { ProjectSnapshot } from "../editor/contracts";

export function serializeProject(snapshot: ProjectSnapshot): string {
  return JSON.stringify(snapshot, null, 2);
}

export function downloadProjectAsJson(snapshot: ProjectSnapshot, fileName = "pixel-project.json"): void {
  const blob = new Blob([serializeProject(snapshot)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}
