import React, { useState } from 'react';
import { AppLayout } from '../ui/components/AppLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '../lib/cn';
import { addWebsiteWidgetSlugChanged } from '@vw/src/widgets/modals/AddWidgetWebsite/model';
import { useStore } from 'effector-react';
import { $widget } from '@vw/src/features/widget/model';
import dynamic from 'next/dynamic';

const AddWidgetWebsiteModal = dynamic(
    import('@vw/src/widgets/modals/AddWidgetWebsite').then((mod) => mod.AddWidgetWebsiteModal),
    {
        ssr: false,
    }
);

type Props = {
    children: React.ReactNode;
};

export const WidgetLayout = ({ children }: Props) => {
    const router = useRouter();
    const id = router.query.id as string;

    const widget = useStore($widget);

    return (
        <AppLayout>
            <AddWidgetWebsiteModal />

            <h1 className="mb-8 text-4xl">Управление виджетом</h1>

            <div className="items-center mb-8 tabs">
                <Link
                    href={`/app/widget/${id}`}
                    className={cn(
                        'tab tab-bordered',
                        router.asPath === `/app/widget/${id}` && 'tab-active'
                    )}
                >
                    Аналитика
                </Link>
                <Link
                    href={'/app/widget/' + id + '/' + 'customize'}
                    className={cn('tab tab-bordered')}
                >
                    Настройка
                </Link>
                <button
                    onClick={() => addWebsiteWidgetSlugChanged(widget?.slug)}
                    className="tab tab-bordered"
                >
                    Добавить на сайт
                </button>
            </div>

            {children}
        </AppLayout>
    );
};
