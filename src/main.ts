import { mountEditorApp } from "./features/editor/ui/editorApp";
import "./styles.css";

const appRoot = document.querySelector<HTMLDivElement>("#app");

if (appRoot === null) {
  throw new Error("Missing #app root element.");
}

mountEditorApp(appRoot);
