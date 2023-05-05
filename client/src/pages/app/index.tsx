import { PlusIcon } from '@heroicons/react/24/solid';
import { AppLayout } from '@vw/src/shared/ui/components/AppLayout';
import { WidgetsList } from '@vw/src/widgets/WidgetList';
import { DeleteWidgetModal } from '@vw/src/widgets/modals/DeleteWidgetModal';
import { VideosModal } from '@vw/src/widgets/modals/VideosModal';
import { WidgetModal } from '@vw/src/widgets/modals/WidgetModal';
import { widgetModalChanged } from '@vw/src/widgets/modals/WidgetModal/model';
import dynamic from 'next/dynamic';
import React from 'react';

const AddWidgetWebsiteModal = dynamic(
    import('@vw/src/widgets/modals/AddWidgetWebsite').then((mod) => mod.AddWidgetWebsiteModal),
    {
        ssr: false,
    }
);

type Props = {};

const AppPage = (props: Props) => {
    return (
        <>
            <AddWidgetWebsiteModal />

            <WidgetModal />

            <DeleteWidgetModal />

            <VideosModal />

            <AppLayout>
                <h1 className="mb-16 text-4xl">Видеовиджеты</h1>

                <button
                    onClick={() => widgetModalChanged(true)}
                    className="gap-2 mb-8 btn bg-primary centered btn-primary"
                >
                    <PlusIcon className="w-6" />
                    Создать виджет
                </button>

                {/* <Link href={'/pricing'} className="block px-4 py-2 mb-8 rounded bg-error">
                    Вы достигли предела своего тарифа. Пожалуйста, обновите тариф.
                </Link>

                <Link href={'/pricing'} className="block px-4 py-2 mb-8 rounded bg-warning">
                    Ваша подписка заканчивается через 3 дня. Пожалуйста, продлите тариф.
                </Link>

                <Link href={'/pricing'} className="block px-4 py-2 mb-8 rounded bg-warning">
                    Тестовый период заканчивается через 3 дня. Пожалуйста, продлите тариф.
                </Link>

                <Link href={'/pricing'} className="block px-4 py-2 mb-8 rounded bg-error">
                    Срок действия вашего тарифа истёк и видеовиджеты на ваших сайтах стали
                    недоступны. Пожалуйста, продлите тариф.
                </Link> */}

                <WidgetsList />
            </AppLayout>
        </>
    );
};

export default AppPage;
