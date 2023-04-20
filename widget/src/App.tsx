import { Component, Show, onMount } from "solid-js";
import { SETTINGS_DEFAULT } from "./types";
import {
  globalShow,
  setGlobalShow,
  setSettingsState,
  settingsState,
} from "./store";
import { VideoWidget } from "./components/VideoWidget";

const fetchData = (id: string) => {
  return SETTINGS_DEFAULT;
};

const App: Component = () => {
  const widgetId = document.currentScript?.getAttribute("data-widget-id");

  if (widgetId) {
    setSettingsState(fetchData(widgetId));
  }

  onMount(() => {
    // For dev only
    window["widget"] = {
      setSettings: (data) => {
        console.log(data);

        setSettingsState({ ...(settingsState() || {}), ...data });
      },
    };
    document.querySelectorAll("[data-vidget-id]").forEach((e, index, all) => {
      if (index !== all.length - 2) {
        e.parentElement?.closest("div")?.remove();
      }
    });
  });

  onMount(() => {
    let settings = settingsState();

    const currentPage = window.location.origin;

    const allowedPages = settings?.showingOnlyPages || [];
    const blockedPages = settings?.showingIgnorePages || [];

    if (settings?.showingAllPages) {
      setGlobalShow(true);
      return;
    }

    if (blockedPages.some((page) => page.includes(currentPage))) {
      setGlobalShow(false);
    }

    if (allowedPages.some((page) => page.includes(currentPage))) {
      setGlobalShow(true);
    }
  });

  return (
    <Show when={globalShow()}>
      <VideoWidget />
    </Show>
  );
};

export default App;
