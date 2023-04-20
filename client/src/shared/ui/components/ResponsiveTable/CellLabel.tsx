import { cn } from '@vw/src/shared/lib/cn';
import React from 'react';

type CellLabelProps = {
    children: React.ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export const CellLabel = ({ className, children }: CellLabelProps) => {
    return (
        <div className={cn('text-[#7B7B7B] text-[16px] max-sm:text-[#1A1A1A]', className)}>
            {children}
        </div>
    );
};
