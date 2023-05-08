import { createEvent, createStore } from 'effector';

export const renderKeyUpdated = createEvent();
export const $renderKey = createStore(0).on(renderKeyUpdated, (key) => (key + 1) % 2);
