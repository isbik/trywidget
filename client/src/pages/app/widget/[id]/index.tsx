import { AppLayout } from '@vw/src/shared/ui/components/AppLayout';
import Link from 'next/link';
import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { WidgetLayout } from '@vw/src/shared/layouts/WidgetLayout';

type Props = {};

const WidgetPage = (props: Props) => {
    const [video, setVideo] = useState('');

    const handleDrop = (event: React.DragEvent) => {
        event.stopPropagation();
        event.preventDefault();
        var files = event.dataTransfer.files;

        setVideo(files[0]?.name);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    };

    return (
        <WidgetLayout>
            <p className="mb-4">Видео</p>

            <div
                className="flex flex-row gap-4 p-4 bg-white border card border-base-300"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {!video && (
                    <div className="flex items-center gap-6">
                        <button
                            type="button"
                            className="text-4xl border rounded-2xl btn w-36 h-36 centered btn-outline border-[#EEF1F7]"
                            onClick={() => setVideo('video')}
                        >
                            <PlusIcon className="w-6" />
                        </button>
                        <p className="text-2xl">Добавьте или перенесите сюда видео до 50мб</p>
                    </div>
                )}
                {video && (
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setVideo('')}
                            className="absolute p-2 top-2 right-2 btn btn-circle btn-sm"
                        >
                            <XMarkIcon />
                        </button>
                        <img
                            src="https://loremflickr.com/640/360"
                            alt="widget"
                            className="rounded w-36 h-36"
                        />
                    </div>
                )}
            </div>
        </WidgetLayout>
    );
};

export default WidgetPage;
