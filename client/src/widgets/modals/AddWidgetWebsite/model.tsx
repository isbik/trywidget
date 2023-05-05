import { createEvent, createStore } from 'effector';

export const addWebsiteWidgetSlugChanged = createEvent<number | null>();
export const $addWebsiteWidgetSlug = createStore<number | null>(null).on(
    addWebsiteWidgetSlugChanged,
    (_, id) => id
);
