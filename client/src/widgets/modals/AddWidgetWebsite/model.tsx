import { createEvent, createStore } from 'effector';

export const addWebsiteWidgetSlugChanged = createEvent<string | null>();
export const $addWebsiteWidgetSlug = createStore<string | null>(null).on(
    addWebsiteWidgetSlugChanged,
    (_, id) => id
);
