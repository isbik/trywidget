import { api } from '@vw/src/api/api';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

export const deleteWidgetIdChanged = createEvent<number | null>();
export const $deleteWidgetId = createStore<number | null>(null).on(
    deleteWidgetIdChanged,
    (_, id) => id
);

export const deleteWidgetFx = createEffect(async (widgetId: number) => {
    await api.delete('widgets/' + widgetId + '/');

    return widgetId;
});

export const $loading = deleteWidgetFx.pending;

export const deleteWidget = createEvent<number>();

sample({
    clock: deleteWidget,
    target: deleteWidgetFx,
});

reset({
    clock: deleteWidgetFx.doneData,
    target: $deleteWidgetId,
});
