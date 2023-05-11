import { Component, Show, onMount } from "solid-js";
import { getWidgetUrl } from "../../lib/getWidgetSlug";
import {
  globalShow,
  setGlobalShow,
  setSettingsState,
  setWidgetData,
  settingsState,
  widgetState,
} from "../../store";
import { VideoWidget } from "./ui/VideoWidget";

const fetchData = async () => {
  try {
    const res = await fetch(getWidgetUrl());

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const BubbleWidget: Component = () => {
  onMount(async () => {
    const widget = await fetchData();

    setWidgetData(widget);

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

  onMount(() => {
    window["widget"] = {
      setSettings: (data) => {
        setSettingsState({ ...(settingsState() || {}), ...data });
      },
    };

    // For dev only
    document.querySelectorAll("[data-vidget-id]").forEach((e, index, all) => {
      if (index !== all.length - 2) {
        e.parentElement?.closest("div")?.remove();
      }
    });
  });

  return (
    <Show when={globalShow() && widgetState()}>
      <VideoWidget />
    </Show>
  );
};

export default BubbleWidget;
