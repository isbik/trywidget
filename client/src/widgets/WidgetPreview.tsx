import { useEffect, useRef } from 'react';

type Props = {
    device: 'desktop' | 'mobile';
    setFrame: (window: Window) => void;
};

export const WidgetPreview = ({ device, setFrame }: Props) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (!iframeRef.current) return;

        iframeRef.current.onload = () => {
            if (!iframeRef.current) return;

            setFrame(iframeRef.current.contentWindow!);
        };
    }, []);

    return (
        <div className="grow bg-[url('/static/empty.jpg')] bg-[length:400px_400px] p-8 justify-center flex overflow-auto -m-2">
            <iframe
                title="Виджет"
                ref={iframeRef}
                src={window.location.origin + '/embed/widget'}
                style={{
                    maxHeight: device === 'desktop' ? '100%' : '720px',
                }}
                height={device === 'desktop' ? '100%' : '720px'}
                width={device === 'desktop' ? '100%' : '320px'}
            ></iframe>
        </div>
    );
};
