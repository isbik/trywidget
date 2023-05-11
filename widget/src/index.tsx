import { render } from "solid-js/web";

import BubbleWidget from "./features/BubbleWidget/index";
import "./index.css";

const body = document.querySelector("body")!;

const div = document.createElement("div");

render(() => <BubbleWidget />, div!);

body.appendChild(div);
