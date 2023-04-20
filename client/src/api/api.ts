import { getAccessToken } from '../shared/lib/cookie';
import ky from 'ky';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const created = ky.create({
    prefixUrl: BASE_URL,
});

export const api = created.extend({
    hooks: {
        beforeRequest: [
            (request) => {
                if (getAccessToken()) {
                    request.headers.set('Authorization', `Bearer ${getAccessToken()}`);
                }
            },
        ],
    },
});
