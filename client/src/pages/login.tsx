import React from 'react';
import { AuthForm } from '../widgets/AuthForm';

type Props = {};

const LoginPage = (props: Props) => {
    return (
        <div className="h-full bg-[#EEF1F7] centered">
            <AuthForm title="Вход на сайт" />
        </div>
    );
};

export default LoginPage;
