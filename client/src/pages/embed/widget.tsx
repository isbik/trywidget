import dynamic from 'next/dynamic';
import React from 'react';

const WidgetPreview = dynamic(
    () => import('../../features/widget-editor/components/WidgetEmbedPage').then((mod) => mod.WidgetPreview),
    { ssr: false }
);

type Props = {};

const EmbedWidgetPage = (props: Props) => {
    return <WidgetPreview />;
};

export default EmbedWidgetPage;
