import { api } from '@vw/src/api/api';
import { UserMe } from '@vw/src/api/generated';
import { createEffect, createEvent, createStore, sample } from 'effector';

export const fetchUser = createEvent();

export const fetchUserFx = createEffect<unknown, UserMe | null, any>(async () => {
    try {
        const response = await api.get('users/me').json<UserMe>();
        return response;
    } catch (error) {
        console.log(error);
    }

    return null;
});

export const $userLoading = fetchUserFx.pending;

sample({
    clock: fetchUser,
    target: fetchUserFx,
    source: $userLoading,
    filter: (loading) => !loading,
});

export const userReset = createEvent();
export const $user = createStore<null | UserMe>(null).on(fetchUserFx.doneData, (_, data) => data);

$user.on(userReset, () => null);
