import React, { Key } from 'react';
import { Cell, CellDiv } from './Cell';
import { CellLabel } from './CellLabel';
import { PrimitiveType, isPrimitive } from '@vw/src/shared/lib/isPrimitive';
import { objectKeys } from '@vw/src/shared/lib/object';

interface MinTableItem {
    id: PrimitiveType;
}

type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;

type CustomRenderers<T extends MinTableItem> = Partial<
    Record<keyof T, (item: T) => React.ReactNode>
>;

interface TableProps<T extends MinTableItem> {
    items: T[];
    headers?: Partial<TableHeaders<T>>;
    customRenderers?: CustomRenderers<T>;
}

export const ResponsiveTable = <T extends MinTableItem>({
    items,
    headers = {} as TableHeaders<T>,
    customRenderers,
}: TableProps<T>) => {
    const renderRow = (item: T, rowClasses = '', cellClasses = '', { mobile = false } = {}) => {
        const RowComponent = mobile ? 'div' : 'tr';

        return (
            <RowComponent key={item.id as Key} className={rowClasses}>
                {objectKeys(item).map((itemProperty: keyof typeof item) => {
                    const customRenderer = customRenderers?.[itemProperty];

                    const content = isPrimitive(item[itemProperty])
                        ? (item[itemProperty] as React.ReactNode)
                        : '';

                    let cellContent = <span className="max-sm:text-[#7B7B7B]">{content}</span>;

                    if (customRenderer) {
                        cellContent = <span key={itemProperty as Key}>{customRenderer(item)}</span>;
                    }

                    const CellComponent = mobile ? CellDiv : Cell;

                    return (
                        <CellComponent className={cellClasses} key={itemProperty as Key}>
                            <CellLabel className="lg:hidden">{headers[itemProperty]}</CellLabel>
                            {cellContent}
                        </CellComponent>
                    );
                })}
            </RowComponent>
        );
    };

    if (items.length === 0) return null;

    return (
        <>
            {/* Render mobile cards */}
            {items.map((item) => {
                return renderRow(
                    item,
                    'mb-5 flex flex-col gap-4 rounded-md border border-base-300 p-5 lg:hidden bg-white',
                    'p-0',
                    {
                        mobile: true,
                    }
                );
            })}

            {/* Render table */}
            <div className="overflow-auto border rounded-md border-base-300 max-lg:hidden">
                <table className="w-full bg-white border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="text-left border-b border-base-300">
                            {objectKeys(headers).map((key) => (
                                <th className="py-2 pl-6 pr-1" key={key as string}>
                                    {headers[key]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => {
                            const classList =
                                index !== items.length - 1 ? 'border-b-2 border-base-300' : '';
                            return renderRow(item, 'px-6 ' + classList);
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};
