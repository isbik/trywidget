import { settingsState } from "../store";
import { getWidgetUrl } from "./getWidgetSlug";

const MAP = {
  tw_open: "open_widget",
  tw_cta_click: "click_cta",
  tw_full_watched: "full_watched",
} as any;

const callMetric = (key: string) => {
  const settings = settingsState();

  if (settings.enableVkPixel) {
    window.VK?.Goal(key);
  }

  if (settings.enableGoogleAnalytics) {
    window.dataLayer?.push({
      event: key,
    });
  }

  if (settings.enableYandexAnalytics && settings.yandexCounter) {
    window.ym?.(settings.yandexCounter, "reachGoal", key);
  }

  const url = getWidgetUrl();

  if (url.includes("https://trywidget.ru")) return;

  const body = { [MAP[key]]: true };

  fetch(url + "analytics/", {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch(console.error);
};

export const openWidgetMetric = () => {
  callMetric("tw_open");
};

export const clickCtaMetric = () => {
  callMetric("tw_cta_click");
};

export const fullWatchedMetric = () => {
  callMetric("tw_full_watched");
};
