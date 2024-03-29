import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { WidgetsList as WidgetListType } from '@vw/src/api/generated';
import { cn } from '@vw/src/shared/lib/cn';
import { ResponsiveTable } from '@vw/src/shared/ui/components/ResponsiveTable/ResponsiveTable';
import { useGate, useStore } from 'effector-react';
import Link from 'next/link';
import { addWebsiteWidgetSlugChanged } from '../modals/AddWidgetWebsite/model';
import { deleteWidgetIdChanged } from '../modals/DeleteWidgetModal/model';
import { selectedWidgetIdChanged, videosModalOpenChanged } from '../modals/VideosModal/model';
import { selectEditWidget } from '../modals/WidgetModal/model';
import { $widgets, WidgetListGate } from './model';

export const WidgetsList = () => {
    useGate(WidgetListGate);

    const widgets = useStore($widgets).map((widget) => ({
        ...widget,
        actions: '',
        id: widget.id as number,
    }));

    const handleOpenAddVideoModal = (widget: WidgetListType) => {
        videosModalOpenChanged(true);
        selectedWidgetIdChanged(widget.id as number);
    };

    return (
        <ResponsiveTable
            items={widgets}
            headers={{
                id: '',
                name: 'Название',
                video: 'Видео',
                actions: '',
            }}
            customRenderers={{
                id: ({ id, video }) => (
                    <Link
                        href={'/app/widget/' + id}
                        className={cn('w-fit', !video && 'pointer-events-none opacity-20')}
                    >
                        <EyeIcon className="w-8" />
                    </Link>
                ),
                name: ({ id, name, video }) => (
                    <Link
                        href={'/app/widget/' + id}
                        className={cn('w-fit', !video && 'pointer-events-none')}
                    >
                        {name}
                    </Link>
                ),
                video: (widget) =>
                    widget?.video ? (
                        <div className="relative w-fit">
                            <img
                                src={widget.video.preview_image_url}
                                alt="widget"
                                className="min-w-[96px] w-32 h-32 rounded object-cover"
                            />

                            <button
                                type="button"
                                className="absolute btn btn-xs top-2 right-2 centered btn-circle"
                                onClick={() => handleOpenAddVideoModal(widget)}
                            >
                                <PencilIcon className="w-2" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => handleOpenAddVideoModal(widget)}
                            className="flex flex-col w-32 h-32 gap-2 text-sm text-center transition-all border-2 border-dashed rounded hover:border-white text-primary border-primary centered hover:bg-primary hover:text-white"
                        >
                            <PlusIcon className="w-4" />
                            <span>Добавить видео</span>
                        </button>
                    ),
                actions: (widget) => (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => addWebsiteWidgetSlugChanged(widget.slug || null)}
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
