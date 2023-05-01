import { api } from '@vw/src/api/api';
import { createEffect, createStore } from 'effector';

export const fetchUserFx = createEffect(() => {
    return api.get('users/me').json();
});

export const $user = createStore<null | object>(null).on(fetchUserFx.doneData, (_, data) => data);
