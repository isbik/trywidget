import { createEvent, createStore } from 'effector';

export const addWebsiteWidgetIdChanged = createEvent<number | null>();
export const $addWebsiteWidgetId = createStore<number | null>(null).on(
    addWebsiteWidgetIdChanged,
    (_, id) => id
);
