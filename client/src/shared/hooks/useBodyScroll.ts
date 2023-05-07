import { useEffect } from 'react';

export const useBodyScroll = (hide: boolean) => {
    useEffect(() => {
        const body = document.querySelector('body')!;
        const html = document.querySelector('html')!;

        if (hide) {
            body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
        }

        return () => {
            if (body) {
                body.style.overflow = '';
            }
            if (html) {
                html.style.overflow = '';
            }
        };
    }, [hide]);
};
