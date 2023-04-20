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

            <div className="mb-8 btn-group">
                <Link
                    href={`/app/widget/${id}`}
                    className={cn('btn', router.asPath !== `/app/widget/${id}` && 'btn-outline')}
                >
                    Видео
                </Link>
                <Link
                    href={`/app/widget/${id}/analytics`}
                    className={cn(
                        'btn',
                        router.asPath !== `/app/widget/${id}/analytics` && 'btn-outline'
                    )}
                >
                    Аналитика
                </Link>
                <Link
                    href={'/app/widget/' + id + '/' + 'customize'}
                    className={cn('btn btn-outline')}
                >
                    Настройка
                </Link>
                <button onClick={() => setOpen(true)} className="btn btn-outline">
                    Добавить на сайт
                </button>
            </div>

            {children}
        </AppLayout>
    );
};
