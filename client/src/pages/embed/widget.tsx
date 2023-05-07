import dynamic from 'next/dynamic';
import React from 'react';

const WidgetPreview = dynamic(
    () =>
        import('../../features/widget-editor/components/WidgetEmbedPage').then(
            (mod) => mod.WidgetPreview
        ),
    { ssr: false }
);

const EmbedWidgetPage = () => {
    return <WidgetPreview />;
};

export default EmbedWidgetPage;
