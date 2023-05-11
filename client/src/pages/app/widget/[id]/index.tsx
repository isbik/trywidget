import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { $analytics, fetchAnalytics } from '@vw/src/features/widget/analytics.model';
import {
    $updateLoading,
    $widget,
    fetchWidgetFx,
    updateWidget,
} from '@vw/src/features/widget/model';
import { WidgetLayout } from '@vw/src/shared/layouts/WidgetLayout';
import { cn } from '@vw/src/shared/lib/cn';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Props = {};

const WidgetAnalyticPage = (props: Props) => {
    const router = useRouter();

    const [widget, updateLoading, analytics] = useUnit([$widget, $updateLoading, $analytics]);

    useEffect(() => {
        if (router.isReady) {
            const id = Number(router.query.id);
            fetchWidgetFx(id);
            fetchAnalytics(id);
        }
    }, [router.isReady]);

    const {
        register,
        formState: { isDirty },
        watch,
        handleSubmit,
    } = useForm({
        values: {
            enableVkPixel: widget?.settings?.enableVkPixel ?? false,
            enableGoogleAnalytics: widget?.settings?.enableGoogleAnalytics ?? false,
            enableYandexAnalytics: widget?.settings?.enableYandexAnalytics ?? false,
            yandexCounter: widget?.settings?.yandexCounter ?? '',
        },
    });

    const enableYandexAnalytics = watch('enableYandexAnalytics');

    const onSubmit = handleSubmit(async (data) => {
        updateWidget({ settings: data });
    });

    return (
        <WidgetLayout>
            <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex gap-8 p-6 text-lg bg-white border border-base-300 rounded-xl">
                    <form onSubmit={onSubmit} className="">
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
                                type="number"
                                placeholder="Номер счетчика"
                                className="h-auto py-1 input input-bordered input-sm"
                                disabled={!enableYandexAnalytics}
                                {...register('yandexCounter')}
                            />
                        </div>
                        <button
                            type="submit"
                            className={cn(
                                'w-full h-auto py-3 btn btn-primary btn-sm',
                                updateLoading && 'loading'
                            )}
                            disabled={!isDirty || updateLoading}
                        >
                            Сохранить
                        </button>
                    </form>
                    <div className="flex flex-col gap-2 max-w-[450px] text-base">
                        <p className="text-lg">Счетчики используют следующие события:</p>
                        <ul className="pl-4 list-disc">
                            <li>
                                <span className="font-bold">tw_open</span> - видео было открыто
                            </li>
                            <li>
                                <span className="font-bold">tw_cta_click</span> - пользователь
                                кликнул на CTA-кнопку
                            </li>
                            <li>
                                <span className="font-bold">tw_full_watched</span> - видео полностью
                                посмотрено
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full"></div>

                <div className="p-6 bg-white border border-base-300 rounded-xl">
                    <div className="mb-4 text-sm">Открытие виджета</div>
                    <div className="stat-value text-primary">{analytics.open_widget}</div>
                </div>

                <div className="p-6 bg-white border border-base-300 rounded-xl">
                    <div className="mb-4 text-sm">Просмотрено полностью</div>
                    <div className="stat-value text-primary">{analytics.full_watched}</div>
                </div>

                <div className="p-6 bg-white border border-base-300 rounded-xl">
                    <div className="mb-4 text-sm">Кликов по cta</div>
                    <div className="stat-value text-primary">{analytics.click_cta}</div>
                </div>
            </div>
        </WidgetLayout>
    );
};

export default WidgetAnalyticPage;
