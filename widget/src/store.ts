import { createSignal } from "solid-js";
import { SETTINGS_DEFAULT, WidgetSettings } from "./types";

export const [settingsState, setSettingsState] =
  createSignal<WidgetSettings>(SETTINGS_DEFAULT);

export const [globalShow, setGlobalShow] = createSignal(false);
