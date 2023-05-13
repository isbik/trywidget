import { api } from '@vw/src/api/api';
import { cn } from '@vw/src/shared/lib/cn';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const PasswordRecoverPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);

        setError('');

        api.post('auth/password/recovery/' + router.query.token + '', { json: { password } })
            .json()
            .then(() => {
                setIsSubmitted(true);
            })
            .catch(async (err) => {
                const json = await err.response.json();
                if (json.type) {
                    router.push('/error?type=' + json.type);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <NextSeo title="Восстановление пароля" />

            <div className="h-full sm:bg-[#EEF1F7] centered">
                <form
                    className="max-w-md sm:border card w-96 bg-base-100 card-body"
                    onSubmit={handleSubmit}
                >
                    {isSubmitted ? (
                        <>
                            <p className="mb-8 text-center">Вам пароль успешно обновлен.</p>

                            <Link href="/login" className="btn btn-primary">
                                Войти
                            </Link>
                        </>
                    ) : (
                        <>
                            <p className="text-3xl text-center">Изменение пароля</p>

                            <div className="mb-8 form-control">
                                <label className="label" htmlFor="email">
                                    <span className="label-text">Введите ваш новый пароль</span>
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Пароль"
                                    className="input input-bordered"
                                    required
                                    value={password}
                                    min={8}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row">
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

export default PasswordRecoverPage;
