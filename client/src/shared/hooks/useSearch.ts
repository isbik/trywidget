import { useState, useMemo } from 'react';

export const useSearch = <T>(items: T[], key?: keyof T, params?: { ignore?: boolean }) => {
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        if (params?.ignore) return items;

        return items.filter((item) => {
            return (((typeof item === 'string' || !key ? item : item[key]) as string) || '')
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase());
        });
    }, [search, items, params?.ignore]);

    return { filtered, search, setSearch };
};
