import { api } from '@vw/src/api/api';
import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { $widgets } from '../../WidgetList/model';
import { uploadFileFx } from '@vw/src/shared/lib/chunkUploadFile';

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

const $videosLoading = fetchVideosFx.pending;

export const $videos = createStore<any[]>([]).on(fetchVideosFx.doneData, (_, data) => data);

sample({
    clock: $videosModalOpen,
    source: { loading: $videosLoading, videos: $videos },
    filter: ({ loading, videos }) => !loading && videos.length === 0,
    target: fetchVideos,
});

sample({
    clock: fetchVideos,
    source: { loading: $videosLoading, videos: $videos },
    filter: ({ loading, videos }) => !loading && videos.length === 0,
    target: fetchVideosFx,
});

$videos.on(uploadFileFx.doneData, (videos, file) => {
    return [...videos, file];
});

export const $error = createStore<string | null>(null);

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
