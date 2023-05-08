import { api } from '@vw/src/api/api';
import { AnalyticRetrieve } from '@vw/src/api/generated';
import { createEffect, createEvent, createStore, sample } from 'effector';

export const fetchAnalytics = createEvent<number>();

export const $analytics = createStore<AnalyticRetrieve>({});

export const fetchAnalyticsFx = createEffect((widgetId: number) => {
    return api.get('widgets/' + widgetId + '/analytics/').json<AnalyticRetrieve>();
});

$analytics.on(fetchAnalyticsFx.doneData, (_, data) => data);

sample({
    clock: fetchAnalytics,
    target: fetchAnalyticsFx,
});
