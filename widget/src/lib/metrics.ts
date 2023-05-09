import { settingsState } from "../store";
import { getWidgetUrl } from "./getWidgetSlug";

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

  const body = { full_watched: true };

  fetch(url + "analytics/", {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
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
