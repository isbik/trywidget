import { PlusIcon } from '@heroicons/react/24/solid';
import { $user } from '@vw/src/features/user/model';
import { plural } from '@vw/src/shared/lib/plural';
import { AppLayout } from '@vw/src/shared/ui/components/AppLayout';
import { WidgetsList } from '@vw/src/widgets/WidgetList';
import { DeleteWidgetModal } from '@vw/src/widgets/modals/DeleteWidgetModal';
import { VideosModal } from '@vw/src/widgets/modals/VideosModal';
import { WidgetModal } from '@vw/src/widgets/modals/WidgetModal';
import { widgetModalChanged } from '@vw/src/widgets/modals/WidgetModal/model';
import dayjs from 'dayjs';
import { useStore } from 'effector-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const AddWidgetWebsiteModal = dynamic(
    import('@vw/src/widgets/modals/AddWidgetWebsite').then((mod) => mod.AddWidgetWebsiteModal),
    {
        ssr: false,
    }
);

type Props = {};

const AppPage = (props: Props) => {
    const user = useStore($user);

    const trialEndDays = () => {
        if (!user?.plan) return;

        return dayjs(user.trial_end).diff(new Date(), 'days');
    };

    const showEndTrial = () => {
        if (user?.plan) return false;

        const days = trialEndDays();
        return days ? days <= 3 : false;
    };

    const paymentRestDays = () => {
        if (!user?.plan) return;

        return dayjs(user.next_payment_date).diff(new Date(), 'days');
    };

    const showPaymentEnds = () => {
        const days = paymentRestDays();

        if (typeof days !== 'number') return false;

        return days >= 1 && days <= 3;
    };

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

                {showEndTrial() && (
                    <Link href={'/pricing'} className="block px-4 py-2 mb-8 rounded bg-warning">
                        {trialEndDays() === 0
                            ? 'Ваш тестовый период закончился.'
                            : `Тестовый период заканчивается через ${trialEndDays()} ${plural(
                                  trialEndDays() || 1,
                                  ['день', 'дня', 'дней']
                              )}.`}
                        Пожалуйста, продлите тариф.
                    </Link>
                )}

                {showPaymentEnds() && (
                    <Link href={'/pricing'} className="block px-4 py-2 mb-8 rounded bg-warning">
                        Ваша подписка заканчивается. Пожалуйста, продлите тариф.
                    </Link>
                )}

                {paymentRestDays() === 0 && (
                    <Link href={'/pricing'} className="block px-4 py-2 mb-8 rounded bg-error">
                        Срок действия вашего тарифа истёк и видеовиджеты на ваших сайтах стали
                        недоступны. Пожалуйста, продлите тариф.
                    </Link>
                )}

                <WidgetsList />
            </AppLayout>
        </>
    );
};

export default AppPage;
