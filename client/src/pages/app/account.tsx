import { AppLayout } from '@vw/src/shared/ui/components/AppLayout';
import Link from 'next/link';
import React from 'react';

type Props = {};

const AccountPage = (props: Props) => {
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
                    <h2 className="card-title">Текущий план</h2>
                    <span className="mb-4 text-primary">Базовый тариф</span>
                    <ul>
                        <li>3 видеовиджета</li>
                        <li>1 сайт</li>
                        <li>7 000 уникальных показов в месяц</li>
                        <li>Базовая аналитика за 30 дней</li>
                    </ul>
                    <Link href="/plans" className="btn">
                        Сменить
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default AccountPage;
