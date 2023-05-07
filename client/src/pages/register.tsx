import React from 'react';
import { AuthForm } from '../widgets/AuthForm';
import { NextSeo } from 'next-seo';

type Props = {};

const LoginPage = (props: Props) => {
    return (
        <>
            <NextSeo title="Регистрация" />

            <div className="h-full bg-[#EEF1F7] centered">
                <AuthForm type="register" title="Создание аккаунта" />
            </div>
        </>
    );
};

export default LoginPage;
