import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { AppLayout } from '@vw/src/shared/ui/components/AppLayout';
import { ResponsiveTable } from '@vw/src/shared/ui/components/ResponsiveTable/ResponsiveTable';
import { AddWidgetWebsiteModal } from '@vw/src/widgets/modals/AddWidgetWebsite';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {};

const AppPage = (props: Props) => {
    const [websiteAddId, setWebsiteAddId] = useState<null | string>(null);

    return (
        <>
            <AddWidgetWebsiteModal
                open={Boolean(websiteAddId)}
                id={websiteAddId!}
                setOpen={() => setWebsiteAddId(null)}
            />

            <AppLayout>
                <h1 className="mb-16 text-4xl">Видеовиджеты</h1>

                <button className="gap-2 mb-8 btn bg-primary centered btn-primary">
                    <PlusIcon className="w-6" />
                    Создать виджет
                </button>

                <ResponsiveTable
                    items={[
                        {
                            id: '1',
                            name: 'Asdf',
                            video: 'asdf',
                            addToSite: '',
                            actions: '',
                        },
                    ]}
                    headers={{
                        id: '',
                        name: 'Название',
                        video: 'Видео',
                        actions: '',
                    }}
                    customRenderers={{
                        id: () => null,
                        name: ({ id, name }) => (
                            <Link href="/app/widget/1" className="w-full h-full">
                                Название виджета
                            </Link>
                        ),
                        video: () => (
                            <Link href="/app/widget/1" className="w-full h-full">
                                <img
                                    src="https://picsum.photos/600/600"
                                    alt="widget"
                                    className="min-w-[96px] w-24 h-24 rounded"
                                />
                            </Link>
                        ),
                        actions: ({ id }) => (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setWebsiteAddId(id)}
                                    type="button"
                                    className="btn"
                                >
                                    Добавить на сайт
                                </button>
                                <button className="btn btn-square btn-outline">
                                    <PencilIcon className="w-4" />
                                </button>
                                <button className="btn btn-square btn-error btn-outline">
                                    <TrashIcon className="w-4" />
                                </button>
                            </div>
                        ),
                    }}
                />
            </AppLayout>
        </>
    );
};

export default AppPage;
