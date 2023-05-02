import { api } from '@vw/src/api/api';
import { createEffect, createEvent, createStore, sample, split } from 'effector';
import { or, reset } from 'patronum';

export const widgetModalChanged = createEvent<boolean>();
export const $widgetModal = createStore(false).on(widgetModalChanged, (_, payload) => payload);

export const widgetNameChanged = createEvent<string>();
export const $widgetName = createStore('').on(widgetNameChanged, (_, payload) => payload);

export const widgetDescriptionChanged = createEvent<string>();
export const $widgetDescription = createStore('').on(
    widgetDescriptionChanged,
    (_, payload) => payload
);

export const widgetIdChanged = createEvent<number | null>();
export const $widgetId = createStore<number | null>(null).on(
    widgetIdChanged,
    (_, payload) => payload
);

export const formSubmitted = createEvent();

export const createWidgetFx = createEffect(async (data) => {
    return api.post('widgets/', { json: data }).json();
});

sample({
    clock: formSubmitted,
    source: {
        name: $widgetName,
        description: $widgetDescription,
        id: $widgetId,
    },
    filter: ({ id }) => {
        return id === null;
    },
    target: createWidgetFx,
});

export const updateWidgetFx = createEffect(async (data) => {
    return api.patch('widgets/' + data.id + '/', { json: data }).json();
});

sample({
    clock: formSubmitted,
    source: {
        name: $widgetName,
        description: $widgetDescription,
        id: $widgetId,
    },
    filter: ({ id }) => {
        return id !== null;
    },
    target: updateWidgetFx,
});

export const selectEditWidget = createEvent<{ id: number; name: string }>();

$widgetId.on(selectEditWidget, (_, payload) => payload.id);
$widgetName.on(selectEditWidget, (_, payload) => payload.name);

$widgetModal.on(selectEditWidget, () => true);

export const $loading = or(createWidgetFx.pending, updateWidgetFx.pending);

reset({
    clock: [createWidgetFx.doneData, updateWidgetFx.doneData],
    target: [$widgetName, $widgetId, $widgetModal, $widgetDescription],
});
