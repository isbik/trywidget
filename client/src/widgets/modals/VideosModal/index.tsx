import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/solid';
import * as Dialog from '@radix-ui/react-dialog';
import {
    $isUploading,
    $uploadError,
    $uploadProgress,
    uploadFileFx,
} from '@vw/src/shared/lib/chunkUploadFile';
import { cn } from '@vw/src/shared/lib/cn';
import { FileUpload } from '@vw/src/shared/ui/components/FileUpload';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { attachWidgetVideo } from '../../WidgetList/model';
import {
    $selectedWidget,
    $videos,
    $videosModalOpen,
    deleteVideo,
    fetchVideos,
    videosModalOpenChanged,
} from './model';

export const VideosModal = () => {
    const [videos, videosModalOpen, selectedWidget] = useUnit([
        $videos,
        $videosModalOpen,
        $selectedWidget,
    ]);

    useEffect(() => {
        fetchVideos();
    }, []);

    const [uploadProgress, isUploading, uploadError] = useUnit([
        $uploadProgress,
        $isUploading,
        $uploadError,
    ]);

    const handleUploadFile = (file: File) => {
        uploadFileFx(file);
    };

    const errorMessage = () => {
        switch (uploadError) {
            case 'too_large_file':
                return 'Размер файла слишком большой.';
            case 'invalid_data':
                return 'Неверный формат файла.';
            case 'too_many_videos_trial':
                return 'Приобретете тариф, чтобы загрузить больше видео.';
            case 'too_many_videos_plan':
                return 'Обновите тариф, чтобы загрузить больше видео.';
            default:
                return 'При загрузке файла произошла ошибка, попробуйте позже.';
        }
    };

    return (
        <Dialog.Root open={videosModalOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80" />
                <Dialog.Content className="fixed max-h-screen overflow-auto w-full sm:w-[620px] p-4 px-6 -translate-x-1/2 -translate-y-1/2 bg-base-100 top-1/2 left-1/2 sm:rounded-xl">
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
                                    onClick={() => {
                                        if (!selectedWidget) {
                                            return;
                                        }

                                        attachWidgetVideo({
                                            video,
                                            selectedWidget: selectedWidget,
                                        });
                                    }}
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
                                    onClick={() => video.id && deleteVideo(video.id)}
                                    className="absolute btn btn-xs top-2 right-2 btn-circle"
                                >
                                    <XMarkIcon className="w-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {uploadError && (
                        <p className="block px-4 py-2 mb-8 rounded bg-error">{errorMessage()}</p>
                    )}

                    <FileUpload
                        className={cn(
                            'flex flex-col gap-2 border-2  text-primary border-primary rounded-2xl centered   w-full m-auto transition-all',
                            isUploading && 'max-w-[120px] min-h-[120px] rounded-full',
                            !isUploading &&
                                'min-h-[120px] max-w-[400px] w-full border-dashed hover:border-white hover:bg-primary hover:text-white cursor-pointer'
                        )}
                        disabled={isUploading}
                        onFile={handleUploadFile}
                    >
                        {isUploading ? (
                            <p>{Number.parseInt(String(uploadProgress * 100), 10)}%</p>
                        ) : (
                            <>
                                <CloudArrowUpIcon className="w-6" />

                                <p className="text-base">Добавьте или перенесите видео до 50мб</p>
                            </>
                        )}
                    </FileUpload>

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
