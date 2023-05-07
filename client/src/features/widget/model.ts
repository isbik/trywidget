import { api } from '@vw/src/api/api';
import { createEffect, createEvent, createStore, sample } from 'effector';

export const fetchWidgetFx = createEffect((widgetId: number) => {
    return api.get('widgets/' + widgetId + '/').json();
});

export const $widgetLoading = fetchWidgetFx.pending;

export const $widget = createStore<any>({}).on(fetchWidgetFx.doneData, (_, widget) => widget);

export const updateWidget = createEvent<any>();

export const updateWidgetFx = createEffect(async (widget) => {
    await api.patch('widgets/' + widget.id + '/', {
        json: {
            ...widget,
        },
    });

    return widget;
});

export const $updateLoading = updateWidgetFx.pending;

sample({
    clock: updateWidget,
    source: { widget: $widget, loading: $updateLoading },
    fn({ widget }, data) {
        return { ...widget, ...data };
    },
    filter({ loading }) {
        return !loading;
    },
    target: updateWidgetFx,
});

$widget.on(updateWidgetFx.doneData, (widget, payload) => ({ ...widget, ...payload }));

export const deleteVideo = createEvent<number>();

export const deleteVideoFx = createEffect(async (widgetId: number) => {
    return api.delete('files/' + widgetId + '/').json();
});

sample({
    clock: deleteVideo,
    target: deleteVideoFx,
});

export const $deleteLoading = deleteVideoFx.pending;

$widget.on(deleteVideoFx.doneData, (widget) => ({ ...widget, video: null }));
