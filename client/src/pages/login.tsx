import React from 'react';
import { AuthForm } from '../widgets/AuthForm';
import { NextSeo } from 'next-seo';

type Props = {};

const LoginPage = (props: Props) => {
    return (
        <>
            <NextSeo title="Вход" />

            <div className="h-full bg-[#EEF1F7] centered">
                <AuthForm title="Вход на сайт" />
            </div>
        </>
    );
};

export default LoginPage;
