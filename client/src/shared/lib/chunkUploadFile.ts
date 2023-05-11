import { api } from '@vw/src/api/api';
import { File as ApiFile } from '@vw/src/api/generated';
import { createEffect, createEvent, createStore } from 'effector';

const CHUNK_SIZE = 1024 * 1024 * 1; // 1 MB

export const uploadProgressChanged = createEvent<number>();

export const uploadFileFx = createEffect<File, ApiFile, any>((file: File) => {
    const totalSize = file.size;

    let uploadedSize = 0;
    let chunks: Blob[] = [];

    while (uploadedSize < totalSize) {
        const remainingSize = totalSize - uploadedSize;
        let chunkSize = Math.min(CHUNK_SIZE, remainingSize);
        let chunk = file.slice(uploadedSize, uploadedSize + chunkSize);

        chunks.push(chunk);
        uploadedSize += chunkSize;
    }

    let file_id: null | string = null;

    return new Promise((resolve, reject) => {
        async function sendChunk(index: number, start: number) {
            const formData = new FormData();
            const end = Math.min(start + CHUNK_SIZE - 1, totalSize - 1);
            const contentRange = `${start}-${end}/${totalSize}`;

            formData.append('file', chunks[index]);
            formData.append('file_name', file.name);
            if (file_id) {
                formData.append('file_id', file_id);
            }

            await api
                .post('files/upload', {
                    body: formData,
                    headers: {
                        'Content-Range': contentRange,
                    },
                })
                .json<any>()
                .then((response) => {
                    if (response.file_id) {
                        file_id = response.file_id;

                        uploadProgressChanged(index / chunks.length);
                        sendChunk(index + 1, (index + 1) * CHUNK_SIZE);
                        return;
                    }

                    resolve(response);
                    uploadProgressChanged(1);
                })
                .catch(async (error) => {
                    const json = await error.response.json();
                    if (json) reject(json);
                    reject({ type: 'error' });
                });
        }

        sendChunk(0, 0);
    });
});

export const $uploadProgress = createStore(0).on(uploadProgressChanged, (_, progress) => progress);
export const $isUploading = $uploadProgress.map((progress) => progress < 1 && progress > 0);

export const $uploadError = createStore<string | null>(null)
    .on(uploadFileFx.failData, (_, error) => error?.type || 'error')
    .reset(uploadFileFx);

$uploadProgress.reset(uploadFileFx.finally);
