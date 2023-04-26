import {
    PlusIcon,
    MinusIcon,
    XMarkIcon,
    Bars3BottomLeftIcon,
    Bars3Icon,
    Bars3BottomRightIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { cn } from '@vw/src/shared/lib/cn';
import { SlideDown } from '@vw/src/shared/ui/components/SlideDown';
import { CircleIcon } from '@vw/src/shared/ui/icons/Circle';
import { RectangleIcon } from '@vw/src/shared/ui/icons/Rectangle';
import { SquareIcon } from '@vw/src/shared/ui/icons/Square';
import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useFieldArray, useFormContext } from 'react-hook-form';

export const CustomizeDivider = ({ title }: { title: string }) => {
    return <div className="p-4 py-2 text-sm font-bold border-t border-base-200">{title}</div>;
};

export const CustomizeBlock = ({
    className,
    children,
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    return (
        <div className={cn('flex items-center justify-between gap-2 p-2 px-4', className)}>
            {children}
        </div>
    );
};

type CustomizeLabelProps = { title: string } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
>;

const CustomizeLabel = ({ title, className, ...props }: CustomizeLabelProps) => {
    return (
        <p className={cn('text-sm', className)} {...props}>
            {title}
        </p>
    );
};

export const CustomizeInputNumber = ({ title, name }: { name: string; title: string }) => {
    const { register, setValue, watch } = useFormContext();

    const value = watch(name);

    return (
        <CustomizeBlock>
            <CustomizeLabel title={title} />

            <div className="flex p-0 border rounded-lg border-base-300 min-w-[110px]">
                <button
                    onClick={() => setValue(name, value - 1)}
                    className="px-2 btn-ghost btn btn-sm"
                    type="button"
                >
                    <MinusIcon className="w-4" />
                </button>
                <input
                    type="number"
                    placeholder="10"
                    className="w-[1px] h-[32px] px-0 text-center grow"
                    {...register(name)}
                />
                <button
                    onClick={() => setValue(name, Number(value) + 1)}
                    className="px-2 btn btn-sm btn-ghost"
                    type="button"
                >
                    <PlusIcon className="w-4" />
                </button>
            </div>
        </CustomizeBlock>
    );
};

export const CustomizeInputSwitch = ({
    title,
    name,
    className,
}: {
    name: string;
    title: string;
    className?: string;
}) => {
    const { register } = useFormContext();

    return (
        <CustomizeBlock className={className}>
            <CustomizeLabel title={title} />

            <input type="checkbox" className="toggle" {...register(name)} />
        </CustomizeBlock>
    );
};

export const CustomizeInputColor = ({ title, name }: { name: string; title: string }) => {
    const { watch, setValue } = useFormContext();

    const value = watch(name);

    const [open, setOpen] = useState(false);

    return (
        <CustomizeBlock>
            <CustomizeLabel title={title} />
            {open ? (
                <div className="absolute z-20 right-10">
                    <button onClick={() => setOpen(false)} className="fixed inset-0" />
                    <HexColorPicker
                        color={value}
                        onChange={(v) => {
                            setValue(name, v);
                        }}
                    />
                </div>
            ) : null}

            <div className="flex items-center overflow-hidden border rounded-md border-base-300 min-w-[110px]">
                <span className="px-2 grow">{value}</span>
                <button
                    onClick={() => setOpen(true)}
                    className="w-8 h-8 border-l border-base-300"
                    style={{ background: value }}
                ></button>
            </div>
        </CustomizeBlock>
    );
};

export const CustomizeInputSelect = ({
    title,
    items,
    name,
}: {
    name: string;
    title: string;
    items: { id: string; name: string }[];
}) => {
    const { register } = useFormContext();

    return (
        <CustomizeBlock>
            <CustomizeLabel title={title} />
            <select
                className="w-[180px] font-normal select select-bordered select-sm"
                {...register(name)}
            >
                {items.map(({ id, name }) => (
                    <option value={id} key={id}>
                        {name}
                    </option>
                ))}
            </select>
        </CustomizeBlock>
    );
};

export const CustomizeInputText = ({ title, name }: { name: string; title: string }) => {
    const { register } = useFormContext();

    return (
        <CustomizeBlock>
            <CustomizeLabel title={title} />
            <input
                type="text"
                className="w-[180px] input input-bordered input-sm"
                {...register(name)}
            ></input>
        </CustomizeBlock>
    );
};

export const CustomizeInputCreateList = ({ title, name }: { name: string; title: string }) => {
    const { register, control } = useFormContext();
    const { fields, remove, insert } = useFieldArray({ name, control });

    return (
        <CustomizeBlock className="flex-col items-start">
            <div className="flex items-center gap-2">
                <CustomizeLabel title={title} />
                <button onClick={() => insert(0, '')} className="btn btn-square btn-primary btn-xs">
                    <PlusIcon />
                </button>
            </div>

            {fields.map((field, index) => (
                <div className="flex w-full gap-4" key={field.id}>
                    <input
                        type="text"
                        className="w-full input input-bordered input-sm"
                        placeholder="https://www.youtube.com/"
                        {...register(`${name}.${index}.value`)}
                    ></input>
                    <button
                        type="button"
                        onClick={() => remove(index)}
                        className="btn btn-square btn-sm"
                    >
                        <XMarkIcon />
                    </button>
                </div>
            ))}
        </CustomizeBlock>
    );
};

export const CustomizeInputShape = ({ title, name }: { name: string; title: string }) => {
    const { watch, setValue } = useFormContext();

    const value = watch(name);

    return (
        <CustomizeBlock>
            <CustomizeLabel title={title} />
            <div className="text-white btn-group">
                <button
                    type="button"
                    className={cn(
                        'btn-sm btn btn-ghost text-black border-base-300',
                        value === 'rectangle' && 'bg-primary text-white'
                    )}
                    onClick={() => setValue(name, 'rectangle')}
                >
                    <RectangleIcon className="w-4" />
                </button>

                <button
                    type="button"
                    className={cn(
                        'btn-sm btn btn-ghost text-black border-base-300',
                        value === 'square' && 'bg-primary text-white'
                    )}
                    onClick={() => setValue(name, 'square')}
                >
                    <SquareIcon className="w-4" />
                </button>

                <button
                    type="button"
                    className={cn(
                        'btn-sm btn btn-ghost text-black border-base-300',
                        value === 'circle' && 'bg-primary text-white'
                    )}
                    onClick={() => setValue(name, 'circle')}
                >
                    <CircleIcon className="w-4" />
                </button>
            </div>
        </CustomizeBlock>
    );
};

export const CustomizeInputAlign = ({
    title,
    name,
    center = true,
}: {
    name: string;
    title: string;
    center?: boolean;
}) => {
    const { watch, setValue } = useFormContext();

    const value = watch(name);

    return (
        <CustomizeBlock>
            <CustomizeLabel title={title} />
            <div className="btn-group">
                <button
                    onClick={() => setValue(name, 'left')}
                    type="button"
                    className={cn(
                        'btn-sm btn btn-ghost border-base-300 text-black',
                        value === 'left' && 'bg-primary text-white'
                    )}
                >
                    <Bars3BottomLeftIcon className="w-4" />
                </button>
                {center && (
                    <button
                        onClick={() => setValue(name, 'center')}
                        type="button"
                        className={cn(
                            'btn-sm btn btn-ghost border-base-300 text-black',
                            value === 'center' && 'bg-primary text-white'
                        )}
                    >
                        <Bars3Icon className="w-4" />
                    </button>
                )}
                <button
                    onClick={() => setValue(name, 'right')}
                    type="button"
                    className={cn(
                        'btn-sm btn btn-ghost border-base-300 text-black',
                        value === 'right' && 'bg-primary text-white'
                    )}
                >
                    <Bars3BottomRightIcon className="w-4" />
                </button>
            </div>
        </CustomizeBlock>
    );
};

export const CustomizeExpand = ({
    title,
    className,
    children,
    open = true,
}: {
    title: string;
    className?: string;
    children: React.ReactNode;
    open?: boolean;
    onToggle?: () => void;
}) => {
    const [closed, setClosed] = useState(!open);
    return (
        <CustomizeBlock className={cn('flex flex-col items-start justify-start p-0', className)}>
            <button
                className={cn(
                    'flex items-center w-full p-4 py-2 border-t border-base-300',
                    !closed && 'border-b'
                )}
                type="button"
                onClick={() => setClosed((p) => !p)}
            >
                <CustomizeLabel className="text-lg font-medium" title={title} />

                <ChevronDownIcon
                    className={cn('w-4 ml-auto transition-all', !closed && 'rotate-180')}
                />
            </button>

            <SlideDown closed={closed} transitionOnAppear={false}>
                {children}
            </SlideDown>
        </CustomizeBlock>
    );
};
