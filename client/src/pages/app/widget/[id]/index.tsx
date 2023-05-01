import React, { useEffect, useRef } from 'react';
import { CloudArrowUpIcon, TrashIcon } from '@heroicons/react/24/solid';
import { WidgetLayout } from '@vw/src/shared/layouts/WidgetLayout';
import { chunkUploadFile } from '@vw/src/shared/lib/chunkUploadFile';
import { $widget, attachWidgetVideo, fetchWidgetFx } from '@vw/src/features/widget/model';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';

type Props = {};

const WidgetPage = (props: Props) => {
    const widget = useStore($widget);

    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            fetchWidgetFx(Number(router.query.id));
        }
    }, [router.isReady]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (event: React.DragEvent) => {
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer.files;

        handleUploadFile(files[0]);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        handleUploadFile(files?.[0]!);
    };

    const handleUploadFile = (file: File) => {
        chunkUploadFile(file).then((response) => {
            attachWidgetVideo(response);
        });
    };

    return (
        <WidgetLayout>
            <div
                className="flex flex-row gap-4 p-4 bg-white border card border-base-300"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="file"
                    className="sr-only"
                    ref={fileInputRef}
                    onChange={handleChangeFile}
                />

                {!widget.video && (
                    <div className="flex items-center gap-6">
                        <button
                            type="button"
                            className="flex flex-col gap-2 transition-all border-4 border-dashed hover:border-white text-primary border-primary rounded-2xl min-w-[144px] h-36 centered hover:bg-primary hover:text-white"
                            onClick={handleClick}
                        >
                            <CloudArrowUpIcon className="w-6" />
                            <p>Загрузить</p>
                        </button>
                        <p className="text-2xl">Добавьте или перенесите видео до 50мб</p>
                    </div>
                )}
                {widget.video && (
                    <div className="relative flex gap-4">
                        <img
                            src="https://loremflickr.com/640/360"
                            alt="widget"
                            className="object-cover rounded w-36 h-36"
                        />
                        <div className="flex flex-col">
                            <p className="mb-auto">Название видео</p>
                            <button
                                type="button"
                                onClick={() => setVideo('')}
                                className="gap-2 text-white btn btn-sm btn-error"
                            >
                                <TrashIcon className="w-4" />
                                Удалить
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </WidgetLayout>
    );
};

export default WidgetPage;
