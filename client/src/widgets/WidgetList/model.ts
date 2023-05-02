import { api } from '@vw/src/api/api';
import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { createWidgetFx, updateWidgetFx } from '../modals/WidgetModal/model';
import { deleteWidgetFx } from '../modals/DeleteWidgetModal/model';

export const WidgetListGate = createGate();

const fetchWidgetsFx = createEffect(() => {
    return api.get('widgets/').json();
});

export const $widgets = createStore<Array<any>>([]).on(
    fetchWidgetsFx.doneData,
    (_, widgets) => widgets
);

sample({
    clock: WidgetListGate.open,
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
