import ky from 'ky';
import { CONFIG } from '../shared/config/config';

// get cookie value by key
export const getCookie = (key: string) => {
    if (typeof window === 'undefined') return null;

    const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
    if (match) {
        return match[2];
    }
    return null;
};

const created = ky.create({
    prefixUrl: CONFIG.API_URL,
});

export const api = created.extend({
    credentials: 'include',

    hooks: {
        beforeRequest: [
            (request) => {
                request.headers.set('X-CSRFToken', getCookie('csrftoken') || '');
                return request;
            },
        ],
    },
});
