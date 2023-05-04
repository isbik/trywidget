import React, { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckIcon, CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/solid';
import {
    $selectedWidget,
    $videos,
    $videosModalOpen,
    deleteVideo,
    fetchVideos,
    uploadVideo,
    videosModalOpenChanged,
} from './model';
import { useUnit } from 'effector-react';
import { chunkUploadFile } from '@vw/src/shared/lib/chunkUploadFile';
import { cn } from '@vw/src/shared/lib/cn';
import { attachWidgetVideo } from '../../WidgetList/model';

export const VideosModal = () => {
    const [videos, videosModalOpen, selectedWidget] = useUnit([
        $videos,
        $videosModalOpen,
        $selectedWidget,
    ]);

    useEffect(() => {
        fetchVideos();
    }, []);

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

    const [progress, setProgress] = React.useState(0);

    const [success, setSuccess] = React.useState(false);

    const handleUploadFile = (file: File) => {
        chunkUploadFile(file, setProgress).then((response) => {
            uploadVideo(response);
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 1500);
        });
    };

    const uploading = progress > 0 && progress < 1;

    return (
        <Dialog.Root open={videosModalOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80" />
                <Dialog.Content className="absolute w-full sm:w-[620px] p-4 px-6 -translate-x-1/2 -translate-y-1/2 bg-base-100 top-1/2 left-1/2 rounded-xl">
                    <Dialog.Title className="mb-6 text-2xl">Ваши видео</Dialog.Title>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-8">
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                className={cn(
                                    'relative cursor-pointer hover:shadow-xl -m-1 p-1 rounded',
                                    selectedWidget?.video?.id === video.id &&
                                        'border-2 border-success'
                                )}
                            >
                                <img
                                    src={video.preview_image_url}
                                    alt="widget"
                                    className="object-cover w-full rounded h-[120px] mb-2"
                                    onClick={() =>
                                        attachWidgetVideo({ video, selectedWidget: selectedWidget })
                                    }
                                    role="presentation"
                                />

                                <p className="flex items-center whitespace-nowrap">
                                    <span className="mr-auto overflow-hidden text-ellipsis">
                                        {video.name}
                                    </span>
                                    <span className="text-[#A9A9A9]">
                                        {Number(video.size).toFixed(1)} мб
                                    </span>
                                </p>
                                <button
                                    type="button"
                                    onClick={() => deleteVideo(video.id)}
                                    className="absolute btn btn-xs top-2 right-2 btn-circle"
                                >
                                    <XMarkIcon className="w-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        className={cn(
                            'flex flex-col gap-2 border-2  text-primary border-primary rounded-2xl centered   w-full m-auto transition-all',
                            (uploading || success) && 'max-w-[120px] min-h-[120px] rounded-full',
                            !uploading &&
                                !success &&
                                'min-h-[120px] max-w-[400px] w-full border-dashed hover:border-white hover:bg-primary hover:text-white',
                            success && 'border-success text-success'
                        )}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleClick}
                    >
                        {success && <CheckIcon className="w-8" />}

                        {!success && (
                            <>
                                {uploading ? (
                                    <p>{Number.parseInt(String(progress * 100), 10)}%</p>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            className="sr-only"
                                            ref={fileInputRef}
                                            onChange={handleChangeFile}
                                            accept="video/*"
                                        />

                                        <CloudArrowUpIcon className="w-6" />
                                        <p className="text-base">
                                            Добавьте или перенесите видео до 50мб
                                        </p>
                                    </>
                                )}
                            </>
                        )}
                    </button>

                    <Dialog.Close asChild onClick={() => videosModalOpenChanged(false)}>
                        <button className="" aria-label="Close">
                            <XMarkIcon className="absolute w-4 top-4 right-4" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
