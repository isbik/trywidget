import ky from 'ky';

// get cookie value by key
export const getCookie = (key: string) => {
    if (typeof window === 'undefined') return null;

    const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
    if (match) {
        return match[2];
    }
    return null;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const created = ky.create({
    prefixUrl: BASE_URL,
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
