import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ResponsiveTable } from '@vw/src/shared/ui/components/ResponsiveTable/ResponsiveTable';
import { useGate, useStore } from 'effector-react';
import Link from 'next/link';
import React from 'react';
import { $widgets, WidgetListGate } from './model';
import { deleteWidgetIdChanged } from '../modals/DeleteWidgetModal/model';
import { selectEditWidget } from '../modals/WidgetModal/model';
import { addWebsiteWidgetIdChanged } from '../modals/AddWidgetWebsite/model';

type Props = {};

export const WidgetsList = (props: Props) => {
    useGate(WidgetListGate);

    const widgets = useStore($widgets).map((widget) => ({ ...widget, actions: '' }));

    return (
        <ResponsiveTable
            items={widgets}
            headers={{
                id: '',
                name: 'Название',
                preview_image_url: 'Видео',
                actions: '',
            }}
            customRenderers={{
                id: () => null,
                name: ({ id, name }) => (
                    <Link href={'/app/widget/' + id} className="w-full h-full">
                        {name}
                    </Link>
                ),
                preview_image_url: ({ id, preview_image_url }) => (
                    <Link href={'/app/widget/' + id} className="w-full h-full">
                        {preview_image_url ? (
                            <img
                                src="https://picsum.photos/600/600"
                                alt="widget"
                                className="min-w-[96px] w-32 h-32 rounded"
                            />
                        ) : (
                            <div className="flex flex-col w-24 h-24 gap-2 text-sm text-center transition-all border-2 border-dashed hover:border-white text-primary border-primary rounded-2xl centered hover:bg-primary hover:text-white">
                                <PlusIcon className="w-4" />
                                <span>Добавить видео</span>
                            </div>
                        )}
                    </Link>
                ),
                actions: (widget) => (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => addWebsiteWidgetIdChanged(widget.id)}
                            type="button"
                            className="btn"
                        >
                            Добавить на сайт
                        </button>

                        <button
                            className="btn btn-square btn-outline"
                            type="button"
                            onClick={() => selectEditWidget(widget)}
                        >
                            <PencilIcon className="w-4" />
                        </button>

                        <button
                            onClick={() => deleteWidgetIdChanged(widget.id)}
                            type="button"
                            className="btn btn-square btn-error btn-outline"
                        >
                            <TrashIcon className="w-4" />
                        </button>
                    </div>
                ),
            }}
        />
    );
};
