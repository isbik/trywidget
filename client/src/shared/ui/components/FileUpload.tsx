import React, { useRef } from 'react';

type Props = {
    onFile: (file: File) => void;
    children?: React.ReactNode;
    disabled?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const FileUpload = ({ disabled, children, onFile, ...props }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (event: React.DragEvent) => {
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer.files;

        if (!disabled) onFile(files[0]);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    };

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!disabled) onFile(files?.[0]!);
    };

    const handleClick = () => {
        if (!disabled) fileInputRef.current?.click();
    };

    return (
        <div
            role="presentation"
            className="flex flex-col items-center justify-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
            {...props}
        >
            <input
                type="file"
                className="sr-only"
                ref={fileInputRef}
                onChange={handleChangeFile}
                accept="video/*"
            />
            {children}
        </div>
    );
};
