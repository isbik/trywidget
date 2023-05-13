import { NextSeo } from 'next-seo';
import { AuthForm } from '../widgets/AuthForm';

type Props = {};

const LoginPage = (props: Props) => {
    return (
        <>
            <NextSeo title="Регистрация" />

            <div className="h-full sm:bg-[#EEF1F7] centered">
                <AuthForm type="register" title="Создание аккаунта" />
            </div>
        </>
    );
};

export default LoginPage;
