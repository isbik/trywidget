import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleIcon } from '../shared/ui/icons/Google';
import { CONFIG } from '../shared/config';
import { cn } from '../shared/lib/cn';
import { api } from '../api/api';
import { useRouter } from 'next/router';
import { fetchUser } from '../features/user/model';

type Props = {
    type?: 'login' | 'register';
    title?: string;
};

export const getErrors = (jsonError: any) => {
    return Object.keys(jsonError || {})
        .map((key) => {
            return jsonError[key];
        })
        .join(' ');
};

export const AuthForm = ({ title, type = 'login' }: Props) => {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            passwordAgain: '',
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        setError('');

        if (type === 'login') await handleLogin(data);
        if (type === 'register') await handleRegister(data);
    });

    const handleLogin = async (data) => {
        setLoading(true);

        try {
            await api.post('auth/login', { json: data });
            fetchUser();
            router.push('/app');
        } catch (error) {
            const json = await (error as any).response.json();
            setError(getErrors(json));
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (data) => {
        if (data.password !== data.passwordAgain) {
            setError('Пароли не совпадают');
            return;
        }

        setLoading(true);

        try {
            await api.post('auth/register', { json: data });
            setIsSubmitted(true);
        } catch (error) {
            const json = await (error as any).response.json();
            setError(getErrors(json));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="relative max-w-md border bg-base-100 sm:card w-96 card-body"
            onSubmit={onSubmit}
        >
            <Link href="/">
                <img
                    src="/static/logo.svg"
                    alt="Логотип"
                    className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 border rounded-full shadow -top-4 left-1/2"
                />
            </Link>

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
                            <Link
                                href="/login"
                                className="btn btn-primary flex-[0_1_50%]"
                                type="button"
                            >
                                Войти
                            </Link>
                        </div>
                    </>
                </>
            )}
            {!isSubmitted && (
                <>
                    <p className="text-3xl text-center">{title}</p>

                    <div className="my-4 centered">
                        <Link
                            href={CONFIG.API_URL + '/oauth/google'}
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
                            {...register('email', { required: true })}
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
                            {...register('password', { min: 8, required: true })}
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
                                {...register('passwordAgain', { min: 8, required: true })}
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-end mb-8">
                        <Link className="text-secondary" href="/forgot">
                            Забыли пароль?
                        </Link>
                    </div>

                    <p className="text-center text-error">{error}</p>

                    <button
                        disabled={loading || !isValid}
                        className={cn('mb-4 btn btn-primary', loading && 'loading')}
                        type="submit"
                    >
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
