import {
    ChevronDoubleLeftIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import { CTASettings } from '@vw/src/features/widget-editor/components/CTASettings';
import { ShowingSettings } from '@vw/src/features/widget-editor/components/ShowingSettings';
import { StyleSettings } from '@vw/src/features/widget-editor/components/StyleSettings';
import { cn } from '@vw/src/shared/lib/cn';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SETTINGS_DEFAULT } from '../../../../shared/types';

const WidgetEditor = dynamic(
    () => import('@vw/src/widgets/WidgetPreview').then((mod) => mod.WidgetPreview),
    {
        ssr: false,
    }
);

const TABS = [
    {
        name: 'style',
        title: 'Стили',
    },
    {
        name: 'cta',
        title: 'CTA',
    },
    {
        name: 'showing',
        title: 'Показ',
    },
] as const;

type Props = {};

const WidgetPage = (props: Props) => {
    const [collapsed, setCollapsed] = useState(false);

    const [tab, setTab] = useState<'style' | 'cta' | 'showing'>('style');

    const [frame, setFrame] = useState<Window>();

    const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');

    const { ...methods } = useForm({ defaultValues: SETTINGS_DEFAULT });

    const values = methods.watch();

    useEffect(() => {
        frame?.['widget']?.setSettings(values);
    }, [values]);

    const onSubmit = (data: any) => {
        frame?.['widget']?.setSettings(data);
    };

    return (
        <>
            <div className="relative flex h-16 border-b border-base-300 bg-base-100">
                <div
                    className={cn(
                        'border-r border-base-300 h-full flex items-center justify-between px-2 gap-2 z-20 bg-base-100',
                        !collapsed && 'min-w-[300px] w-[300px]',
                        'max-sm:absolute'
                    )}
                >
                    <Link
                        href={'/app/widget/1'}
                        className="btn btn-outline btn-sm btn-square border-base-300"
                    >
                        <XMarkIcon className="w-4" />
                    </Link>
                    {!collapsed && <span className="font-medium text-[20px]">Редактирование</span>}
                    <button
                        onClick={() => setCollapsed((p) => !p)}
                        className="btn btn-square btn-sm btn-outline"
                    >
                        <ChevronDoubleLeftIcon
                            className={cn('w-4 transition-[transform]', collapsed && 'rotate-180')}
                        />
                    </button>
                </div>

                <div className="flex items-center justify-center gap-4 sm:-ml-[72px] grow">
                    <button
                        onClick={() => setDevice('desktop')}
                        className={cn(
                            'btn btn-sm btn-square',
                            device !== 'desktop' && 'btn-outline'
                        )}
                    >
                        <ComputerDesktopIcon className="w-4" />
                    </button>

                    <button
                        onClick={() => setDevice('mobile')}
                        className={cn(
                            'btn btn-sm btn-square',
                            device !== 'mobile' && 'btn-outline'
                        )}
                    >
                        <DevicePhoneMobileIcon className="w-4" />
                    </button>
                </div>
            </div>

            <div className="flex grow max-h-[calc(100vh-64px)] overflow-hidden relative">
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className={cn(
                            'min-w-[300px] w-[300px] border-r border-base-300 bg-base-100 h-full relative overflow-auto flex flex-col no-scrollbar',
                            collapsed && 'hidden',
                            'max-sm:absolute h-full'
                        )}
                    >
                        <div className="sticky top-0 z-10 items-center w-full border-b centered bg-base-100">
                            {TABS.map(({ name, title }) => (
                                <button
                                    onClick={() => setTab(name)}
                                    type="button"
                                    key={name}
                                    className={cn(
                                        'grow m-1 py-2 hover:bg-primary/30 rounded-lg',
                                        name === tab && 'text-primary bg-primary/20'
                                    )}
                                >
                                    {title}
                                </button>
                            ))}
                        </div>

                        <div className="grow">
                            {tab === 'style' && <StyleSettings />}
                            {tab === 'cta' && <CTASettings />}
                            {tab === 'showing' && <ShowingSettings />}
                        </div>

                        <div className="sticky bottom-0 w-full p-2 mt-auto border-t bg-base-100 border-base-300">
                            <button
                                className="btn-block btn"
                                type="submit"
                                disabled={
                                    JSON.stringify(values) === JSON.stringify(SETTINGS_DEFAULT)
                                }
                            >
                                Сохранить
                            </button>
                        </div>
                    </form>
                </FormProvider>

                <WidgetEditor setFrame={setFrame} device={device} />
            </div>
        </>
    );
};

export default WidgetPage;
