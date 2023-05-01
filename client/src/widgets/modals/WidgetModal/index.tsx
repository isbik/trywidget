import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/solid';
import {
    $loading,
    $widgetDescription,
    $widgetId,
    $widgetModal,
    $widgetName,
    formSubmitted,
    widgetDescriptionChanged,
    widgetModalChanged,
    widgetNameChanged,
} from './model';
import { useStore, useUnit } from 'effector-react';
import { cn } from '@vw/src/shared/lib/cn';

export const WidgetModal = () => {
    const open = useStore($widgetModal);

    const [widgetId, widgetName, widgetDescription, loading] = useUnit([
        $widgetId,
        $widgetName,
        $widgetDescription,
        $loading,
    ]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        formSubmitted();
    };

    return (
        <Dialog.Root open={open}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80" />
                <Dialog.Content className="fixed min-w-[320px] max-w-md p-4 px-6 -translate-x-1/2 -translate-y-1/2 bg-base-100 top-1/2 left-1/2 rounded-xl">
                    <Dialog.Title className="mb-6 text-2xl">
                        {widgetId ? 'Изменение' : 'Добавление'} виджета
                    </Dialog.Title>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <span className="label-text">Название виджета</span>
                            <input
                                className="w-full mb-4 input input-bordered"
                                required
                                min={3}
                                value={widgetName}
                                onChange={(e) => widgetNameChanged(e.target.value)}
                            />
                        </div>

                        {/* <div className="form-control">
                            <span className="label-text">Описание виджета</span>
                            <textarea
                                rows={3}
                                className="w-full mb-4 resize-none textarea textarea-bordered"
                                required
                                value={widgetDescription}
                                onChange={(e) => widgetDescriptionChanged(e.target.value)}
                            />
                        </div> */}

                        <button
                            className={cn('w-full btn', loading && 'loading')}
                            type="submit"
                            disabled={loading}
                        >
                            Сохранить виджет
                        </button>
                    </form>

                    <Dialog.Close asChild onClick={() => widgetModalChanged(false)}>
                        <button className="" aria-label="Close">
                            <XMarkIcon className="absolute w-4 top-4 right-4" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
