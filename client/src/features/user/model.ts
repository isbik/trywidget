import { api } from '@vw/src/api/api';
import { User } from '@vw/src/api/generated';
import { createEffect, createEvent, createStore, sample } from 'effector';

export const fetchUser = createEvent();

export const fetchUserFx = createEffect<unknown, User>(() => {
    return api.get('users/me').json();
});

export const $userLoading = fetchUserFx.pending;

sample({
    clock: fetchUser,
    target: fetchUserFx,
    source: $userLoading,
    filter: (loading) => !loading,
});

export const userReset = createEvent();
export const $user = createStore<null | User>(null).on(fetchUserFx.doneData, (_, data) => data);

$user.on(userReset, () => null);
