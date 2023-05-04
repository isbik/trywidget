import { api } from '@vw/src/api/api';
import { createEffect, createEvent, createStore, sample } from 'effector';

export const videosModalOpenChanged = createEvent<boolean>();
export const $videosModalOpen = createStore<boolean>(false).on(
    videosModalOpenChanged,
    (_, value) => value
);

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
})