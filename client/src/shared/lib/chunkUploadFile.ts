import ky from 'ky';
import { hex } from './hex';
import { api } from '@vw/src/api/api';

const CHUNK_SIZE = 1024 * 1024; // 1MB

export const chunkUploadFile = async (
    file: File,
    onProgress?: (percent: number) => void
): Promise<any> => {
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

    return new Promise((resolve, reject) => {
        async function sendChunk(index: number, start: number) {
            const formData = new FormData();
            const end = Math.min(start + CHUNK_SIZE - 1, totalSize - 1);
            const contentRange = `${start}-${end}/${totalSize}`;

            formData.append('file', chunks[index]);
            formData.append('file_name', file.name);
            formData.append('file_id', uniqueId);

            await api
                .post('files/upload', {
                    body: formData,
                    headers: {
                        'Content-Range': contentRange,
                    },
                })
                .json()
                .then((response) => {
                    if (response) {
                        resolve(response);
                        onProgress?.(1);
                    } else {
                        onProgress?.(index / chunks.length);
                        sendChunk(index + 1, (index + 1) * CHUNK_SIZE);
                    }
                })
                .catch(reject);
        }

        sendChunk(0, 0);
    });
};
