import type { AppProps } from 'next/app';
import Head from 'next/head';

import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import '../application//index.css';

import { fetchUser } from '../features/user/model';
import { NEXT_SEO } from '../shared/config/next-seo';

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
                <meta charSet="utf-8" />
            </Head>
            <DefaultSeo {...NEXT_SEO} />
            <Component {...pageProps} />
        </>
    );
}
