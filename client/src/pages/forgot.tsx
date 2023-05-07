import Link from 'next/link';
import React, { useState } from 'react';

type Props = {};

const LoginPage = (props: Props) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    return (
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

                        <Link href="/login" className="btn btn-primary" type="submit">
                            К форме входа
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
                            />
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Далее
                        </button>
                    </>
                )}
            </form>{' '}
        </div>
    );
};

export default LoginPage;
