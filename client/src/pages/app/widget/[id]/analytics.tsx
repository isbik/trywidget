import { AppLayout } from '@vw/src/shared/ui/components/AppLayout';
import Link from 'next/link';
import React, { useState } from 'react';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { WidgetLayout } from '@vw/src/shared/layouts/WidgetLayout';
import { useForm } from 'react-hook-form';

type Props = {};

const WidgetAnalyticPage = (props: Props) => {
    const {
        register,
        formState: { isDirty },
        watch,
    } = useForm({
        defaultValues: {
            enableVkPixel: false,
            enableGoogleAnalytics: false,
            enableYandexAnalytics: false,
            yandexCounter: '',
        },
    });

    const enableYandexAnalytics = watch('enableYandexAnalytics');

    return (
        <WidgetLayout>
            <div className="flex flex-wrap gap-4 mb-8">
                <form className="p-6 text-lg bg-white border border-base-300 rounded-xl">
                    <div className="flex items-center pb-2 mb-2 border-b">
                        <Link className="mr-1" href="https://vk.com/faq16578" target="_blank">
                            <InformationCircleIcon className="w-5" />
                        </Link>
                        VK Pixel
                        <input
                            type="checkbox"
                            className="ml-auto toggle"
                            {...register('enableVkPixel')}
                        />
                    </div>
                    <div className="flex items-center pb-2 mb-2 border-b">
                        <Link
                            className="mr-1"
                            href="https://support.google.com/analytics/answer/1032415?hl=ru"
                            target="_blank"
                        >
                            <InformationCircleIcon className="w-5" />
                        </Link>
                        <span className="mr-4">Google Analytics</span>
                        <input
                            type="checkbox"
                            className="ml-auto toggle"
                            {...register('enableGoogleAnalytics')}
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Link
                            className="mr-1"
                            href="https://yandex.ru/support/metrica/general/creating-counter.html"
                            target="_blank"
                        >
                            <InformationCircleIcon className="w-5" />
                        </Link>
                        Яндекс метрика
                        <input
                            type="checkbox"
                            className="ml-auto toggle"
                            {...register('enableYandexAnalytics')}
                        />
                    </div>

                    <div className="mb-4 form-control">
                        <span className="mb-1 text-sm">Номер счетчика</span>
                        <input
                            type="text"
                            placeholder="Номер счетчика"
                            className="h-auto py-1 input input-bordered input-sm"
                            disabled={!enableYandexAnalytics}
                            {...register('yandexCounter')}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full h-auto py-3 btn btn-primary btn-sm"
                        disabled={!isDirty}
                    >
                        Сохранить
                    </button>
                </form>

                <div className="w-full"></div>

                <div className="p-6 bg-white border border-base-300 rounded-xl">
                    <div className="mb-4 text-sm">Уникальных показов</div>
                    <div className="stat-value text-primary">25.6K</div>
                </div>
                <div className="p-6 bg-white border border-base-300 rounded-xl">
                    <div className="mb-4 text-sm">Просмотрено полностью</div>
                    <div className="stat-value text-primary">25.6K</div>
                </div>

                <div className="p-6 bg-white border border-base-300 rounded-xl">
                    <div className="mb-4 text-sm">Открытие виджета</div>
                    <div className="stat-value text-primary">2.6M</div>
                </div>
                <div className="p-6 bg-white border border-base-300 rounded-xl">
                    <div className="mb-4 text-sm">Уникальных показов</div>
                    <div className="stat-value text-primary">2.6M</div>
                </div>

                <div className="p-6 bg-white border border-base-300 rounded-xl">
                    <div className="mb-4 text-sm">Кликов по cta</div>
                    <div className="stat-value text-primary">2.6M</div>
                </div>
            </div>
        </WidgetLayout>
    );
};

export default WidgetAnalyticPage;
