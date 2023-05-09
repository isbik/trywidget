import { SETTINGS_DEFAULT, WidgetSettings } from '@vw/src/shared/types';
import { createEvent, createStore } from 'effector';

export const setWidgetSettings = createEvent<WidgetSettings>();

export const $widgetSettings = createStore(SETTINGS_DEFAULT).on(
    setWidgetSettings,
    (store, payload) => ({
        ...store,
        ...payload,
    })
);
