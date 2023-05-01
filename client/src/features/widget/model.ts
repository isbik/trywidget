import { api } from '@vw/src/api/api';
import { createEffect, createEvent, createStore, sample } from 'effector';

export const fetchWidgetFx = createEffect((widgetId: number) => {
    return api.get('widgets/' + widgetId + '/').json();
});

export const $widget = createStore<any>({}).on(fetchWidgetFx.doneData, (_, widget) => widget);

export const attachWidgetVideo = createEvent<{ id: string }>();

export const attachWidgetVideoFx = createEffect(async ({ widget, video }) => {
    await api.patch('widgets/' + widget.id + '/', {
        json: {
            video_id: video.id,
        },
    });

    return widget;
});

sample({
    clock: attachWidgetVideo,
    source: $widget,
    fn: (widget, video) => ({ widget, video }),
    target: attachWidgetVideoFx,
});

$widget.on(attachWidgetVideoFx.doneData, (widget, video) => ({ ...widget, video: video }));

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
