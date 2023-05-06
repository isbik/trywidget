import { api } from '@vw/src/api/api';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { createWidgetFx, updateWidgetFx } from '../modals/WidgetModal/model';
import { deleteWidgetFx } from '../modals/DeleteWidgetModal/model';
import { WidgetsList } from '@vw/src/api/generated';

export const WidgetListGate = createGate();

const fetchWidgetsFx = createEffect<unknown, WidgetsList[]>(() => {
    return api.get('widgets/').json();
});

export const $widgetsLoading = fetchWidgetsFx.pending;

export const $widgets = createStore<Array<WidgetsList>>([]).on(
    fetchWidgetsFx.doneData,
    (_, widgets) => widgets
);

sample({
    clock: WidgetListGate.open,
    source: $widgetsLoading,
    filter(loading) {
        return !loading;
    },
    target: fetchWidgetsFx,
});

$widgets.on(createWidgetFx.doneData, (widgets, widget) => {
    return [{ ...widget, preview_image_url: '' }, ...widgets];
});

$widgets.on(updateWidgetFx.doneData, (widgets, payload) => {
    return widgets.map((w) => (w.id === payload.id ? { ...w, ...payload } : w));
});

$widgets.on(deleteWidgetFx.doneData, (widgets, id) => {
    return widgets.filter((w) => w.id !== id);
});

export const attachWidgetVideo = createEvent<{ selectedWidget: any; video: any }>();

export const attachWidgetVideoFx = createEffect(async ({ selectedWidget: widget, video }) => {
    await api.patch('widgets/' + widget.id + '/', {
        json: {
            video_id: video.id,
        },
    });

    return { ...widget, video };
});

sample({
    clock: attachWidgetVideo,
    source: $widgets,
    fn: (_, data) => data,
    target: attachWidgetVideoFx,
});

$widgets.on(attachWidgetVideoFx.doneData, (widgets, widget) => {
    return widgets.map((w) => (w.id === widget.id ? widget : w));
});
