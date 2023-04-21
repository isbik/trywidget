import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleIcon } from '../shared/ui/icons/Google';

type Props = {
    type?: 'login' | 'register';
    title?: string;
};

export const AuthForm = ({ title, type = 'login' }: Props) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
            passwordAgain: '',
        },
    });

    const onSubmit = handleSubmit((data) => {
        setIsSubmitted(true);
    });

    const handleSendAgain = () => {};

    return (
        <form className="max-w-md shadow-xl bg-base-100 card w-96 card-body" onSubmit={onSubmit}>
            {isSubmitted && (
                <>
                    <>
                        <p className="mb-8 text-center">
                            Подтвердите вашу почту для завершении регистрации
                        </p>

                        <div className="flex gap-2">
                            <Link href="/" className="btn btn-outline flex-[0_1_50%]" type="submit">
                                На главную
                            </Link>
                            <button
                                onClick={handleSendAgain}
                                className="btn btn-primary flex-[0_1_50%]"
                                type="button"
                            >
                                Отправить заново
                            </button>
                        </div>
                    </>
                </>
            )}
            {!isSubmitted && (
                <>
                    <p className="text-3xl text-center">{title}</p>

                    <div className="my-4 centered">
                        <Link
                            href={'/api/auth/oauth/google/callback'}
                            className="gap-2 p-2 px-4 btn btn-outline flex-nowrap whitespace-nowrap"
                        >
                            <GoogleIcon className="w-full h-full" />
                            Войти через Google
                        </Link>
                    </div>

                    <div className="divider">Или</div>

                    <div className="form-control">
                        <label className="label" htmlFor="email">
                            <span className="label-text">E-mail</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Введите ваш email адрес"
                            className="input input-bordered"
                            {...register('email')}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label" htmlFor="password">
                            <span className="label-text">Пароль</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Введите ваш пароль"
                            className="input input-bordered"
                            {...register('password')}
                        />
                    </div>
                    {type === 'register' && (
                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Подтверждение пароля</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Подтвердите ваш пароль"
                                className="input input-bordered"
                                {...register('passwordAgain')}
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-between mb-8">
                        <div className="form-control">
                            <label className="gap-2 cursor-pointer label">
                                <input type="checkbox" className="checkbox" />
                                <span className="label-text">Запомнить меня</span>
                            </label>
                        </div>
                        <Link className="text-secondary" href="/forgot">
                            Забыли пароль?
                        </Link>
                    </div>

                    <button className="mb-4 btn btn-primary" type="submit">
                        {type === 'login' && 'Войти'}
                        {type === 'register' && 'Создать аккаунт'}
                    </button>

                    {type === 'login' && (
                        <p className="text-center">
                            Ещё нет аккаунта,{' '}
                            <Link className="text-secondary" href={'/register'}>
                                создать аккаунт
                            </Link>
                        </p>
                    )}
                    {type === 'register' && (
                        <p className="text-center">
                            Уже зарегистрированы,{' '}
                            <Link className="text-secondary" href={'/login'}>
                                Войти
                            </Link>
                        </p>
                    )}
                </>
            )}
        </form>
    );
};
