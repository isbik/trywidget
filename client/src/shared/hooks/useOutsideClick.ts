import React, { useEffect } from 'react';

export function useOutsideClick(ref: { current: HTMLElement | null }, cb: () => void) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                if ((event.target as HTMLElement).dataset['ignoreClick']) return;
                cb();
            }
        };
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}
