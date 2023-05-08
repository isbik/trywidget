import { useStore } from 'effector-react';
import { useEffect, useRef } from 'react';
import { $widget } from '../../features/widget/model';
import { $renderKey } from './model';

type Props = {
    device: 'desktop' | 'mobile';
    setFrame: (window: Window) => void;
};

export const WidgetPreview = ({ device, setFrame }: Props) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const widget = useStore($widget);

    const renderKey = useStore($renderKey);

    useEffect(() => {
        if (!iframeRef.current) return;

        iframeRef.current.onload = () => {
            if (!iframeRef.current) return;
            setFrame(iframeRef.current.contentWindow!);
        };
    }, []);

    return (
        <div className="grow bg-[#A9A9A9] bg-[length:400px_400px] p-8 justify-center flex overflow-auto -m-2">
            <iframe
                key={renderKey}
                className="rounded"
                title="Виджет"
                ref={iframeRef}
                src={window.location.origin + `/embed/widget?widgetSlug=` + widget.slug}
                style={{
                    maxHeight: device === 'desktop' ? '100%' : '720px',
                }}
                height={device === 'desktop' ? '100%' : '720px'}
                width={device === 'desktop' ? '100%' : '320px'}
            ></iframe>
        </div>
    );
};
