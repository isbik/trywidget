import { cn } from '@vw/src/shared/lib/cn';
import React from 'react';

export type CellProps = {
    children: React.ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Cell = ({ className, children }: CellProps) => {
    return (
        <td className={cn('pl-6 pr-1 pb-3 pt-5 text-[18px] sm:text-[22px]', className)}>
            {children}
        </td>
    );
};

export const CellDiv = ({ className, children }: CellProps) => {
    return (
        <div className={cn('pl-6 pr-1 pb-3 pt-5 text-[18px] sm:text-[22px]', className)}>
            {children}
        </div>
    );
};
