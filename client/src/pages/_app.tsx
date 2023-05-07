import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../app/index.css';
import { useEffect } from 'react';
import { fetchUser, fetchUserFx } from '../features/user/model';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        fetchUser();
    }, []);

    // useEffect(() => {
    //     const unsubscribe = fetchUserFx.failData.watch((error) => {
    //         // @ts-ignore
    //         if (error.response.status === 401) router.push('/login');
    //     });

    //     return () => unsubscribe();
    // });

    return (
        <>
            <Head>
                <title>Видео виджет на сайт</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
