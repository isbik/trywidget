import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { AppLayout } from '@vw/src/shared/ui/components/AppLayout';
import { ResponsiveTable } from '@vw/src/shared/ui/components/ResponsiveTable/ResponsiveTable';
import { WidgetsList } from '@vw/src/widgets/WidgetList';
import { AddWidgetWebsiteModal } from '@vw/src/widgets/modals/AddWidgetWebsite';
import { DeleteWidgetModal } from '@vw/src/widgets/modals/DeleteWidgetModal';
import { WidgetModal } from '@vw/src/widgets/modals/WidgetModal';
import { widgetModalChanged } from '@vw/src/widgets/modals/WidgetModal/model';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {};

const AppPage = (props: Props) => {
    return (
        <>
            <AddWidgetWebsiteModal />

            <WidgetModal />

            <DeleteWidgetModal />

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
