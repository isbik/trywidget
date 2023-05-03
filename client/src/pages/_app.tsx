import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../app/index.css';
import { useEffect } from 'react';
import { fetchUser } from '../features/user/model';

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        fetchUser();
    }, []);

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
