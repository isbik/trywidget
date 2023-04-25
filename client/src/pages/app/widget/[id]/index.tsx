import { AppLayout } from '@vw/src/shared/ui/components/AppLayout';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { WidgetLayout } from '@vw/src/shared/layouts/WidgetLayout';
import ky from 'ky';
import { hex } from '@vw/src/shared/lib/hex';

const CHUNK_SIZE = 1024 * 1024; // 1MB

async function uploadFile1(file: File) {
    const totalSize = file.size;

    let uploadedSize = 0;
    let chunks: Blob[] = [];

    const uniqueId = hex();

    while (uploadedSize < totalSize) {
        const remainingSize = totalSize - uploadedSize;
        let chunkSize = Math.min(CHUNK_SIZE, remainingSize);
        let chunk = file.slice(uploadedSize, uploadedSize + chunkSize);

        chunks.push(chunk);
        uploadedSize += chunkSize;
    }

    async function sendChunk(index: number, start: number) {
        const formData = new FormData();
        const end = Math.min(start + CHUNK_SIZE - 1, totalSize - 1);
        const contentRange = `${start}-${end}/${totalSize}`;

        formData.append('file', chunks[index]);
        formData.append('file_name', file.name);
        formData.append('file_id', uniqueId);

        await ky
            .post('http://localhost:8000/files/upload', {
                body: formData,
                headers: {
                    'Content-Range': contentRange,
                },
            })
            .json()
            .then((response) => {
                if (response) {
                    console.log(response);
                } else {
                    sendChunk(index + 1, (index + 1) * CHUNK_SIZE);
                }
            });
    }
    sendChunk(0, 0);
}

type Props = {};

const WidgetPage = (props: Props) => {
    const [video, setVideo] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (event: React.DragEvent) => {
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer.files;

        uploadFile(files[0]);
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
        console.log(files);

        uploadFile(files?.[0]!);
    };

    const uploadFile = (file: File) => {
        uploadFile1(file);
    };

    return (
        <WidgetLayout>
            <p className="mb-4">Видео</p>

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

                {!video && (
                    <div className="flex items-center gap-6">
                        <button
                            type="button"
                            className="text-4xl border rounded-2xl btn w-36 h-36 centered btn-outline border-[#EEF1F7]"
                            onClick={handleClick}
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
