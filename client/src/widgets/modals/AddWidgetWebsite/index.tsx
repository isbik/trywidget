import { XMarkIcon } from '@heroicons/react/24/solid';
import * as Dialog from '@radix-ui/react-dialog';
import { useStore } from 'effector-react';
import { $addWebsiteWidgetSlug, addWebsiteWidgetSlugChanged } from './model';

export const AddWidgetWebsiteModal = () => {
    const widgetSlug = useStore($addWebsiteWidgetSlug);

    return (
        <Dialog.Root open={widgetSlug !== null}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80" />
                <Dialog.Content className="fixed max-w-md p-4 px-6 -translate-x-1/2 -translate-y-1/2 bg-base-100 top-1/2 left-1/2 rounded-xl">
                    <Dialog.Title className="mb-6 text-2xl">Добавить виджет на сайт</Dialog.Title>

                    <p className="mb-2 text-lg font-medium">
                        1. Скопируйте сгенерированный фрагмент кода виджета
                    </p>

                    <div className="p-2 mb-2 rounded bg-[#EEF1F7] select-all">
                        <code>
                            {`<script defer src="${window.location.origin}/public/widget.js" data-widget="${widgetSlug}"></script>`}
                        </code>
                    </div>

                    <p className="mb-2 text-lg font-medium">
                        2. Вставьте фрагмент кода на свою HTML-страницу
                    </p>

                    <p>
                        Зайдите на свой HTML-сайт в режиме редактирования и вставьте фрагмент кода.
                        Как только виджет будет сохранен на вашей веб-странице, все настройки,
                        которые вы внесете в https://video-lab.ru, будут автоматически применены к
                        виджету.
                    </p>

                    <Dialog.Close asChild onClick={() => addWebsiteWidgetSlugChanged(null)}>
                        <button className="" aria-label="Close">
                            <XMarkIcon className="absolute w-4 top-4 right-4" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
