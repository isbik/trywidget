import { CheckBadgeIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { useStore } from 'effector-react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { $user } from '../features/user/model';
import { cn } from '../shared/lib/cn';
import { plural } from '../shared/lib/plural';
import { Footer } from '../shared/ui/components/Footer';
import { GetStartedNow } from '../shared/ui/components/GetStartedNow';
import { Header } from '../shared/ui/components/Header';
import { InfinityIcon } from '../shared/ui/icons/Infinity';

const $plans = createStore([]);

const fetchPlans = createEvent();

const fetchPlansFx = createEffect(() => {
    return api.get('plans/').json();
});

$plans.on(fetchPlansFx.doneData, (_, plans) => plans);

sample({
    clock: fetchPlans,
    source: { loading: fetchPlansFx.pending },
    filter({ loading }) {
        return !loading;
    },
    target: fetchPlansFx,
});

const PlansPage = () => {
    const router = useRouter();

    const user = useStore($user);
    const plans = useStore($plans);

    const [isYear, setIsYear] = useState(true);

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleCreatePayment = (plan_id: string) => {
        if (!user) {
            router.push('/login');
            return;
        }

        api.post('payments/', {
            json: {
                plan_id,
                time_period: isYear ? 'year' : 'month',
            },
        })
            .json()
            .then(({ payment_id }) => {
                console.log(payment_id);
                // TODO redirect to yokassa
            });
    };

    return (
        <>
            <Header />
            <NextSeo
                title="Тарифа для видеовиджета"
                description="Выберите тариф, который подойдет для вас"
            />
            <main>
                <div className="container pt-16 mb-32 text-center">
                    <h1 className="mb-16 text-3xl font-black md:text-5xl">
                        Выберите подходящий для вас тариф
                    </h1>

                    <div className="flex justify-center gap-2 mb-16">
                        <p>За месяц</p>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={isYear}
                            onChange={() => setIsYear((prev) => !prev)}
                        />
                        <p>
                            За год <span className="text-primary">(Скидка до 20%)</span>
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        {plans.map((plan, index) => (
                            <div key={plan.id} className="max-w-xs min-w-[300px]">
                                <div
                                    className={cn(
                                        'p-4 py-8 card card-bordered bg-[#EEF1F7] min-w-[300px] items-center',
                                        index === 1 && 'mb-8 border-primary border-2 shadow-xl',
                                        index !== 1 && 'mt-6 mb-14'
                                    )}
                                >
                                    {index === 1 && (
                                        <p className="mb-4 text-xl font-bold text-primary ">
                                            Самый популярный
                                        </p>
                                    )}
                                    <p className="mb-4 text-3xl font-bold">{plan.display_name}</p>
                                    <p className="mb-6">
                                        <span className="text-2xl font-bold">
                                            {isYear ? (plan.price * 0.8).toFixed(0) : plan.price}
                                        </span>{' '}
                                        <span className="text-base-content">₽/месяц</span>
                                        <p className={cn('text-primary', !isYear && 'opacity-0')}>
                                            Сохраните {(plan.price * 0.2 * 12).toFixed(0)}₽ в год
                                        </p>
                                    </p>

                                    <button
                                        onClick={() => handleCreatePayment(plan.id)}
                                        className={cn(
                                            'w-fit px-6 py-2 mt-auto transition-all border rounded border-primary text-primary hover:bg-primary hover:text-white',
                                            index === 1 && 'bg-primary text-white hover:scale-105'
                                        )}
                                    >
                                        Бесплатный период
                                    </button>
                                </div>

                                <ul className="p-6">
                                    <li className="flex items-center gap-2">
                                        <InfinityIcon className="w-4 text-primary" /> просмотров
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckBadgeIcon className="w-4 text-primary" />
                                        {plan.max_widgets}{' '}
                                        {plural(plan.max_widgets, [
                                            'виджет',
                                            'виджета',
                                            'виджетов',
                                        ])}
                                    </li>

                                    <li className="flex items-center gap-2">
                                        <CheckBadgeIcon className="w-4 text-primary" />
                                        Аналитика
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckBadgeIcon className="w-4 text-primary" />
                                        Яндекс Метрика
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckBadgeIcon className="w-4 text-primary" />
                                        Google Analytics
                                    </li>

                                    <li
                                        className={cn(
                                            'flex items-center gap-2',
                                            !plan.is_hide_logo && 'line-through'
                                        )}
                                    >
                                        {!plan.is_hide_logo ? (
                                            <XMarkIcon className="w-4 text-[#A9A9A9]" />
                                        ) : (
                                            <CheckBadgeIcon className="w-4 text-primary" />
                                        )}
                                        Скрытие логотипа
                                    </li>
                                    <li
                                        className={cn(
                                            'flex items-center gap-2',
                                            !plan.is_support && 'line-through'
                                        )}
                                    >
                                        {!plan.is_support ? (
                                            <XMarkIcon className="w-4 text-[#A9A9A9]" />
                                        ) : (
                                            <CheckBadgeIcon className="w-4 text-primary" />
                                        )}
                                        Премиум-поддержка
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <GetStartedNow />
            </main>

            <Footer />
        </>
    );
};

export default PlansPage;
