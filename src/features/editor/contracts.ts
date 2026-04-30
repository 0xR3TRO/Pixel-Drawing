export type DrawMode = "paint" | "erase";

export interface ProjectSnapshot {
  width: number;
  height: number;
  cells: string[];
  updatedAt: string;
}
