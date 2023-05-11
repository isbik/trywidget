import { CheckBadgeIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { $user } from '@vw/src/features/user/model';
import { cn } from '@vw/src/shared/lib/cn';
import { plural } from '@vw/src/shared/lib/plural';
import { AppLayout } from '@vw/src/shared/ui/components/AppLayout';
import { InfinityIcon } from '@vw/src/shared/ui/icons/Infinity';
import { useStore } from 'effector-react';
import Link from 'next/link';

type Props = {};

const AccountPage = (props: Props) => {
    const user = useStore($user);

    const plan = user?.plan;

    return (
        <AppLayout>
            <h1 className="mb-16 text-3xl">Настройки аккаунта</h1>

            <div className="mb-8 bg-white border rounded-md border-base-300 sm:w-96">
                <div className="card-body">
                    <h2 className="card-title">Пароль</h2>
                    <div className="w-full max-w-xs form-control">
                        <span className="label">
                            <span className="label-text">Текущий пароль</span>
                        </span>
                        <input
                            type="password"
                            placeholder="Пароль"
                            className="w-full max-w-xs input input-bordered"
                        />
                    </div>
                    <div className="w-full max-w-xs mb-4 form-control">
                        <span className="label">
                            <span className="label-text">Новый пароль</span>
                        </span>
                        <input
                            type="password"
                            placeholder="Пароль"
                            className="w-full max-w-xs input input-bordered"
                        />
                    </div>

                    <button className="btn">Обновить</button>
                </div>
            </div>

            <div className="mb-8 bg-white border rounded-md border-base-300 sm:w-96">
                <div className="card-body">
                    <h2 className="card-title">Текущий тариф</h2>
                    <span className="mb-4 text-primary">
                        {plan?.display_name || 'Пробный тариф'}
                    </span>
                    <ul>
                        <li>
                            <li className="flex items-center gap-2">
                                <InfinityIcon className="w-4 text-primary" /> просмотров
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckBadgeIcon className="w-4 text-primary" />
                                {plan?.max_widgets || 1}{' '}
                                {plural(plan?.max_widgets || 1, ['виджет', 'виджета', 'виджетов'])}
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckBadgeIcon className="w-4 text-primary" />
                                {(plan?.max_widgets || 1) * 2} видео
                            </li>

                            <li
                                className={cn(
                                    'flex items-center gap-2',
                                    !plan?.is_hide_logo && 'line-through'
                                )}
                            >
                                {!plan?.is_hide_logo ? (
                                    <XMarkIcon className="w-4 text-[#A9A9A9]" />
                                ) : (
                                    <CheckBadgeIcon className="w-4 text-primary" />
                                )}
                                Скрытие логотипа
                            </li>
                            <li
                                className={cn(
                                    'flex items-center gap-2',
                                    !plan?.is_support && 'line-through'
                                )}
                            >
                                {!plan?.is_support ? (
                                    <XMarkIcon className="w-4 text-[#A9A9A9]" />
                                ) : (
                                    <CheckBadgeIcon className="w-4 text-primary" />
                                )}
                                Премиум-поддержка
                            </li>
                        </li>
                    </ul>
                    <Link href="/pricing" className="btn">
                        Сменить
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default AccountPage;
