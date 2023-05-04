import { api } from '@vw/src/api/api';
import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { $widgets } from '../../WidgetList/model';

export const videosModalOpenChanged = createEvent<boolean>();
export const $videosModalOpen = createStore<boolean>(false).on(
    videosModalOpenChanged,
    (_, value) => value
);

export const selectedWidgetIdChanged = createEvent<number | null>();
export const $selectedWidgetId = createStore<number | null>(null).on(
    selectedWidgetIdChanged,
    (_, value) => value
);

export const $selectedWidget = combine($widgets, $selectedWidgetId, (widgets, id) => {
    return widgets.find((widget) => widget.id === id);
});

export const fetchVideos = createEvent();

export const fetchVideosFx = createEffect(() => {
    return api.get('files/').json();
});

sample({
    clock: $videosModalOpen,
    filter(isOpen) {
        return !isOpen;
    },
    target: fetchVideos,
});

sample({
    clock: fetchVideos,
    target: fetchVideosFx,
});

export const $videos = createStore<any[]>([]).on(fetchVideosFx.doneData, (_, data) => data);

export const uploadVideo = createEvent<File>();

$videos.on(uploadVideo, (videos, file) => {
    return [...videos, file];
});

export const deleteVideo = createEvent<number>();

export const deleteVideoFx = createEffect(async (id) => {
    await api.delete(`files/${id}/`).json();
    return id;
});

export const $deleteVideoLoading = deleteVideoFx.pending;

sample({
    clock: deleteVideo,
    target: deleteVideoFx,
});

$videos.on(deleteVideoFx.doneData, (videos, id) => {
    return videos.filter((video) => video.id !== id);
});

$widgets.on(deleteVideoFx.doneData, (widgets, id) => {
    return widgets.map((widget) => {
        if (widget?.video?.id === id) {
            return {
                ...widget,
                video: null,
            };
        }

        return widget;
    });
});
