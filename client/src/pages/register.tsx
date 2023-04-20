import React from 'react';
import { AuthForm } from '../widgets/AuthForm';

type Props = {};

const LoginPage = (props: Props) => {
    return (
        <div className="h-full bg-base-300 centered">
            <AuthForm type="register" title="Создание аккаунта" />
        </div>
    );
};

export default LoginPage;
