import { createSignal } from "solid-js";
import { SETTINGS_DEFAULT, WidgetSettings } from "./types";

export const [settingsState, setSettingsState] =
  createSignal<WidgetSettings>(SETTINGS_DEFAULT);

export const [globalShow, setGlobalShow] = createSignal(false);

export const [widgetState, setWidgetState] = createSignal<any>(null);

export const setWidgetData = (data: any) => {
  const { widget, plan } = data;

  const { settings = {}, ...rest } = widget || {};

  setSettingsState({ ...SETTINGS_DEFAULT, ...settings });

  setWidgetState({ ...rest, plan });
};
