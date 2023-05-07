import { Component, Show, onMount } from "solid-js";
import { wait } from "../../lib/wait";
import {
  setWidgetData,
  setSettingsState,
  settingsState,
  setGlobalShow,
  widget,
  globalShow,
} from "../../store";
import { VideoWidget } from "./ui/VideoWidget";

const fetchData = async () => {
  const script = document.querySelector("#tw_bubble");

  const slug = script?.getAttribute("data-widget");
  const url =
    script?.getAttribute("data-url") ||
    "https://trywiget.ru/api/public/widgets";

  try {
    const res = await fetch(url + slug + "/");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const BubbleWidget: Component = () => {
  onMount(async () => {
    await wait();

    const widget = await fetchData();

    setWidgetData(widget);
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
    <Show when={globalShow() && widget() && settingsState()}>
      <VideoWidget />
    </Show>
  );
};

export default BubbleWidget;
