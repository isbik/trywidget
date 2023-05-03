import { createEffect, createEvent, createStore, sample } from 'effector';

export const videosModalOpenChanged = createEvent<boolean>();
export const $videosModalOpen = createStore<boolean>(true).on(
    videosModalOpenChanged,
    (_, value) => value
);

export const fetchVideos = createEvent();

export const fetchVideosFx = createEffect(() => {
    return [
        {
            id: '1',
            name: 'Тест 1 видео № 112313',
            preview_image_url: 'https://loremflickr.com/640/360',
            size: 1.12341234124,
        },
        {
            id: '2',
            name: 'Тест 2',
            preview_image_url: 'https://loremflickr.com/640/360',
            size: 12.1231313,
        },
        {
            id: '3',
            name: 'Видео второе',
            preview_image_url: 'https://loremflickr.com/640/360',
            size: 45.6575775,
        },
    ];
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
