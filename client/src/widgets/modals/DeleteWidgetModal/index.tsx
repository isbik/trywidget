import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { $deleteWidgetId, $loading, deleteWidget, deleteWidgetIdChanged } from './model';
import { useStore } from 'effector-react';
import { cn } from '@vw/src/shared/lib/cn';

export const DeleteWidgetModal = () => {
    const widgetId = useStore($deleteWidgetId);

    const loading = useStore($loading);

    return (
        <Dialog.Root open={widgetId !== null}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80" />
                <Dialog.Content className="fixed max-w-md p-4 px-6 -translate-x-1/2 -translate-y-1/2 bg-base-100 top-1/2 left-1/2 rounded-xl">
                    <Dialog.Title className="mb-6 text-2xl">
                        Вы действительно хотите удалить виджет?
                    </Dialog.Title>

                    <div className="flex gap-2">
                        <button
                            disabled={loading}
                            className={cn('grow btn btn-outline', loading && 'loading')}
                            onClick={() => deleteWidget(widgetId!)}
                        >
                            Да
                        </button>
                        <button
                            onClick={() => deleteWidgetIdChanged(null)}
                            disabled={loading}
                            className="grow btn btn-primary"
                        >
                            Нет
                        </button>
                    </div>

                    <Dialog.Close asChild onClick={() => deleteWidgetIdChanged(null)}>
                        <button className="" aria-label="Close">
                            <XMarkIcon className="absolute w-4 top-4 right-4" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
