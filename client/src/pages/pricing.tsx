import { CheckBadgeIcon, CheckIcon } from '@heroicons/react/24/solid';
import { cn } from '../shared/lib/cn';
import { Footer } from '../shared/ui/components/Footer';
import { Header } from '../shared/ui/components/Header';
import { GetStartedNow } from '../shared/ui/components/GetStartedNow';

const PlansPage = () => {
    const plans = [
        {
            price: 390,
            name: 'Начинающий',
        },
        {
            price: 890,
            name: 'Базовый',
        },
        {
            price: 1900,
            name: 'Pro',
        },
    ];
    return (
        <>
            <Header />

            <main>
                <div className="container pt-16 mb-32 text-center">
                    <h1 className="mb-16 text-3xl font-black md:text-5xl">
                        Выберите подходящий для вас тариф
                    </h1>

                    <div className="flex justify-center gap-2 mb-16">
                        <p>За месяц</p>
                        <input type="checkbox" className="toggle toggle-primary" />
                        <p>
                            За год <span className="text-primary">(Скида до 20%)</span>
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        {plans.map(({ price, name }, index) => (
                            <div key={price} className="max-w-xs min-w-[300px]">
                                <div
                                    className={cn(
                                        'p-4 py-8 card card-bordered bg-[#EEF1F7] min-w-[300px] items-center',
                                        index === 1 && 'mb-8 border-primary border-2 shadow-xl',
                                        index !== 1 && 'mt-6 mb-12'
                                    )}
                                >
                                    {index === 1 && (
                                        <p className="mb-4 font-bold text-primary ">
                                            Самый популярный
                                        </p>
                                    )}
                                    <p className="mb-4 text-3xl font-bold">{name}</p>
                                    <p className="mb-6">
                                        <span className="text-2xl font-bold">{price}</span>{' '}
                                        <span className="text-base-content">₽/месяц</span>
                                    </p>

                                    <button
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
                                        <CheckBadgeIcon className="w-4 text-primary" />
                                        {index + 1} виджет
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
                                    <li className="flex items-center gap-2">
                                        <CheckBadgeIcon className="w-4 text-primary" />
                                        Премиум-поддержка
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckBadgeIcon className="w-4 text-primary" />
                                        Скрытие логотипа
                                    </li>

                                    <li className="flex items-center gap-2">
                                        <CheckBadgeIcon className="w-4 text-primary" />
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
