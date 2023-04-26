import React, { useState } from 'react';
import { AppLayout } from '../ui/components/AppLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '../lib/cn';
import { AddWidgetWebsiteModal } from '@vw/src/widgets/modals/AddWidgetWebsite';

type Props = {
    children: React.ReactNode;
};

export const WidgetLayout = ({ children }: Props) => {
    const router = useRouter();
    const id = router.query.id as string;

    const [open, setOpen] = useState(false);

    return (
        <AppLayout>
            <AddWidgetWebsiteModal open={open} id={id} setOpen={setOpen} />

            <h1 className="mb-8 text-4xl">Управление виджетом</h1>

            <div className="items-center mb-8 tabs">
                <Link
                    href={`/app/widget/${id}`}
                    className={cn(
                        'tab tab-bordered',
                        router.asPath === `/app/widget/${id}` && 'tab-active'
                    )}
                >
                    Видео
                </Link>
                <Link
                    href={`/app/widget/${id}/analytics`}
                    className={cn(
                        'tab tab-bordered',
                        router.asPath === `/app/widget/${id}/analytics` && 'tab-active'
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
                <button onClick={() => setOpen(true)} className="tab tab-bordered">
                    Добавить на сайт
                </button>
            </div>

            {children}
        </AppLayout>
    );
};
