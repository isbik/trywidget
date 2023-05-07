import React from 'react';
import { Footer } from '../shared/ui/components/Footer';
import { Header } from '../shared/ui/components/Header';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ErrorPage = () => {
    const router = useRouter();

    const message = () => {
        switch (router.query.type) {
            case 'invalid_token':
                return 'Токен не действителен, попробуйте ещё раз';
            default:
                return 'Токен не действителен, попробуйте ещё раз';
        }
    };

    return (
        <>
            <Header />

            <main className="py-32 text-center">
                <h1 className="mb-16 text-4xl font-bold">Ошибка</h1>

                <p className="mb-8">{message()}</p>

                <Link href="/" className="btn btn-primary bg-primary btn-wide">
                    На главную
                </Link>
            </main>
            <Footer />
        </>
    );
};

export default ErrorPage;

