import { NextSeo } from 'next-seo';
import { AuthForm } from '../widgets/AuthForm';

type Props = {};

const LoginPage = (props: Props) => {
    return (
        <>
            <NextSeo title="Вход" />

            <div className="h-full sm:bg-[#EEF1F7] centered">
                <AuthForm title="Вход на сайт" />
            </div>
        </>
    );
};

export default LoginPage;
