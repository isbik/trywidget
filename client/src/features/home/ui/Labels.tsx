import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import React from 'react';

type Props = {};

export const Labels = (props: Props) => {
    const labels = ['7 дней бесплатно', 'Легкая настройка'];

    return (
        <ul className="flex flex-wrap gap-4 text-sm">
            {labels.map((label) => (
                <li key={label} className="flex items-center gap-1">
                    <CheckBadgeIcon className="w-4 text-primary" />
                    {label}
                </li>
            ))}
        </ul>
    );
};
