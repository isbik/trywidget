import { settingsState } from "../store";

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

  // TODO add requests to server
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
