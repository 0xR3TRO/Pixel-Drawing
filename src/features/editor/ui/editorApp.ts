import { downloadProjectAsJson } from "../../export-sharing/exportJson";
import { clearStoredProject, loadProject, saveProject } from "../../project-storage/storage";
import type { DrawMode, ProjectSnapshot } from "../contracts";
import { createCellId, createCellIndex, DEFAULT_GRID_SIZE, formatGridSize } from "../domain/grid";
import { cloneSnapshot, createBlankSnapshot, EMPTY_CELL_COLOR, touchSnapshot } from "../domain/snapshot";

interface EditorState {
  snapshot: ProjectSnapshot;
  color: string;
  mode: DrawMode;
  isDrawing: boolean;
}

const DEFAULT_COLOR = "#43a047";

export function mountEditorApp(root: HTMLDivElement): void {
  root.innerHTML = `
    <section class="editor-shell">
      <h1 class="editor-title">Pixel Editor</h1>
      <p id="status-message" class="status-message" aria-live="polite"></p>
      <div class="options-grid">
        <div class="sliders">
          <div class="slider-group">
            <label class="slider-label" for="width-range">
              <span>Grid width</span>
              <span id="width-value">00</span>
            </label>
            <input id="width-range" type="range" min="1" max="35" />
          </div>
          <div class="slider-group">
            <label class="slider-label" for="height-range">
              <span>Grid height</span>
              <span id="height-value">00</span>
            </label>
            <input id="height-range" type="range" min="1" max="35" />
          </div>
        </div>
        <div class="controls">
          <button id="create-grid" type="button">Create Grid</button>
          <button id="clear-grid" type="button">Clear Grid</button>
          <input id="color-input" type="color" aria-label="Choose paint color" />
          <button id="paint-button" type="button">Paint</button>
          <button id="erase-button" type="button">Erase</button>
          <button id="export-button" type="button">Export JSON</button>
        </div>
      </div>
      <div id="canvas" class="canvas"></div>
    </section>
  `;

  const statusMessage = getElement<HTMLParagraphElement>("status-message");
  const widthRange = getElement<HTMLInputElement>("width-range");
  const heightRange = getElement<HTMLInputElement>("height-range");
  const widthValue = getElement<HTMLSpanElement>("width-value");
  const heightValue = getElement<HTMLSpanElement>("height-value");
  const colorInput = getElement<HTMLInputElement>("color-input");
  const createGridButton = getElement<HTMLButtonElement>("create-grid");
  const clearGridButton = getElement<HTMLButtonElement>("clear-grid");
  const paintButton = getElement<HTMLButtonElement>("paint-button");
  const eraseButton = getElement<HTMLButtonElement>("erase-button");
  const exportButton = getElement<HTMLButtonElement>("export-button");
  const canvas = getElement<HTMLDivElement>("canvas");

  const state: EditorState = {
    snapshot: resolveInitialSnapshot(statusMessage),
    color: DEFAULT_COLOR,
    mode: "paint",
    isDrawing: false
  };

  widthRange.value = String(state.snapshot.width);
  heightRange.value = String(state.snapshot.height);
  colorInput.value = state.color;

  updateDimensionLabel(widthRange, widthValue);
  updateDimensionLabel(heightRange, heightValue);
  updateModeButtons(paintButton, eraseButton, state.mode);
  renderCanvas(canvas, state.snapshot);

  widthRange.addEventListener("input", () => {
    updateDimensionLabel(widthRange, widthValue);
  });

  heightRange.addEventListener("input", () => {
    updateDimensionLabel(heightRange, heightValue);
  });

  colorInput.addEventListener("input", () => {
    state.color = colorInput.value;
  });

  createGridButton.addEventListener("click", () => {
    state.snapshot = createBlankSnapshot(Number(widthRange.value), Number(heightRange.value));
    persistSnapshot(state.snapshot, statusMessage);
    renderCanvas(canvas, state.snapshot);
  });

  clearGridButton.addEventListener("click", () => {
    state.snapshot = createBlankSnapshot(state.snapshot.width, state.snapshot.height);
    persistSnapshot(state.snapshot, statusMessage);
    renderCanvas(canvas, state.snapshot);
  });

  paintButton.addEventListener("click", () => {
    state.mode = "paint";
    updateModeButtons(paintButton, eraseButton, state.mode);
  });

  eraseButton.addEventListener("click", () => {
    state.mode = "erase";
    updateModeButtons(paintButton, eraseButton, state.mode);
  });

  exportButton.addEventListener("click", () => {
    downloadProjectAsJson(state.snapshot);
    statusMessage.textContent = "Project exported to JSON.";
  });

  canvas.addEventListener("pointerdown", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLDivElement) || !target.classList.contains("grid-cell")) {
      return;
    }

    state.isDrawing = true;
    paintCell(state, target);
    persistSnapshot(state.snapshot, statusMessage);
  });

  canvas.addEventListener("pointerover", (event) => {
    if (!state.isDrawing) {
      return;
    }

    const target = event.target;
    if (!(target instanceof HTMLDivElement) || !target.classList.contains("grid-cell")) {
      return;
    }

    paintCell(state, target);
    persistSnapshot(state.snapshot, statusMessage);
  });

  window.addEventListener("pointerup", () => {
    state.isDrawing = false;
  });
}

function resolveInitialSnapshot(statusMessage: HTMLParagraphElement): ProjectSnapshot {
  try {
    const stored = loadProject();
    if (stored === null) {
      return createBlankSnapshot(DEFAULT_GRID_SIZE, DEFAULT_GRID_SIZE);
    }

    return cloneSnapshot(stored);
  } catch {
    clearStoredProject();
    statusMessage.textContent = "Stored project was invalid and has been reset.";
    return createBlankSnapshot(DEFAULT_GRID_SIZE, DEFAULT_GRID_SIZE);
  }
}

function persistSnapshot(snapshot: ProjectSnapshot, statusMessage: HTMLParagraphElement): void {
  touchSnapshot(snapshot);
  saveProject(snapshot);
  statusMessage.textContent = "";
}

function renderCanvas(canvas: HTMLDivElement, snapshot: ProjectSnapshot): void {
  canvas.innerHTML = "";

  for (let row = 0; row < snapshot.height; row += 1) {
    const rowElement = document.createElement("div");
    rowElement.className = "grid-row";

    for (let column = 0; column < snapshot.width; column += 1) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.id = createCellId(row, column);
      cell.dataset.row = String(row);
      cell.dataset.column = String(column);
      const cellIndex = createCellIndex(row, column, snapshot.width);
      cell.style.backgroundColor = snapshot.cells[cellIndex];
      rowElement.appendChild(cell);
    }

    canvas.appendChild(rowElement);
  }
}

function paintCell(state: EditorState, cell: HTMLDivElement): void {
  const rowValue = Number(cell.dataset.row);
  const columnValue = Number(cell.dataset.column);
  const cellIndex = createCellIndex(rowValue, columnValue, state.snapshot.width);
  const nextColor = state.mode === "erase" ? EMPTY_CELL_COLOR : state.color;

  state.snapshot.cells[cellIndex] = nextColor;
  cell.style.backgroundColor = nextColor;
}

function updateDimensionLabel(rangeInput: HTMLInputElement, outputElement: HTMLSpanElement): void {
  outputElement.textContent = formatGridSize(Number(rangeInput.value));
}

function updateModeButtons(
  paintButton: HTMLButtonElement,
  eraseButton: HTMLButtonElement,
  mode: DrawMode
): void {
  paintButton.classList.toggle("is-active", mode === "paint");
  eraseButton.classList.toggle("is-active", mode === "erase");
}

function getElement<TElement extends HTMLElement>(id: string): TElement {
  const element = document.getElementById(id);

  if (element === null) {
    throw new Error(`Missing required element: #${id}`);
  }

  return element as TElement;
}
