import { api } from '@vw/src/api/api';
import { WidgetUpdate } from '@vw/src/api/generated';
import { createEffect, createEvent, createStore, sample } from 'effector';
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

export const createWidgetFx = createEffect<any, any, string>(async (data) => {
    try {
        const response = await api.post('widgets/', { json: data }).json();
        return response;
    } catch (error) {
        const json = await (error as any).response.json();
        throw (json?.type || 'error') as string;
    }
});

export const $error = createStore('');

$error.on(createWidgetFx.failData, (_, error) => error);

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

export const updateWidgetFx = createEffect<WidgetUpdate, WidgetUpdate>(async (data) => {
    return api.patch('widgets/' + data.id + '/', { json: data }).json<WidgetUpdate>();
});

sample({
    // @ts-ignore
    clock: formSubmitted,
    source: {
        name: $widgetName,
        // description: $widgetDescription,
        id: $widgetId,
    },
    fn({ name, id }) {
        return { name, id };
    },
    filter: ({ id }) => {
        return Boolean(id);
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
    target: [$widgetName, $widgetId, $widgetModal, $widgetDescription, $error],
});

reset({
    clock: widgetModalChanged,
    target: [$error],
});
