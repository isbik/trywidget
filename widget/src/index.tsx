import { render } from "solid-js/web";

import "./index.css";
import BubbleWidget from "./features/BubbleWidget/index";

window.onload = () => {
  const body = document.querySelector("body")!;

  if (import.meta.env.DEV && !(body instanceof HTMLElement)) {
    throw new Error(
      "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?",
    );
  }

  const div = document.createElement("div");

  render(() => <BubbleWidget />, div!);

  body.appendChild(div);
};
