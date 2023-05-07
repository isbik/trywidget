import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React, { useState } from 'react';
import { api } from '../../api/api';
import { cn } from '../../shared/lib/cn';
import { getErrors } from '../../widgets/AuthForm';

const LoginPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);

        setError('');

        api.post('auth/password/recovery', { json: { email } })
            .json()
            .then(() => {
                setIsSubmitted(true);
            })
            .catch(async (err) => {
                const json = await err.response.json();
                setError(getErrors(json));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const errorMessage = () => {
        switch (error) {
            case 'user_not_found':
                return 'Пользователь не найден';

            default:
                return 'Что-то пошло не так';
        }
    };

    return (
        <>
            <NextSeo title="Восстановление пароля" />

            <div className="h-full bg-[#EEF1F7] centered">
                <form
                    className="max-w-md border card w-96 bg-base-100 card-body"
                    onSubmit={handleSubmit}
                >
                    {isSubmitted ? (
                        <>
                            <p className="mb-8 text-center">
                                Вам отправлено письмо с инструкциями по смене пароля.
                            </p>

                            <Link href="/" className="btn btn-primary" type="submit">
                                Вернуться на главную
                            </Link>
                        </>
                    ) : (
                        <>
                            <p className="text-3xl text-center">Восстановление пароля</p>

                            <p className="text-center">
                                Введите почту, которая была указана при регистрации вашего аккаунта.
                            </p>
                            <div className="mb-8 form-control">
                                <label className="label" htmlFor="email">
                                    <span className="label-text">E-mail</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Введите ваш email адрес"
                                    className="input input-bordered"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {error && (
                                <p className="block px-4 py-2 rounded bg-error">{errorMessage()}</p>
                            )}

                            <div className="flex gap-4">
                                <Link
                                    href="/"
                                    className={cn('btn btn-outline flex-[0_1_50%]')}
                                    type="submit"
                                >
                                    На главную
                                </Link>

                                <button
                                    className={cn(
                                        'btn btn-primary  flex-[0_1_50%]',
                                        loading && 'loading'
                                    )}
                                    type="submit"
                                >
                                    Далее
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </>
    );
};

export default LoginPage;
