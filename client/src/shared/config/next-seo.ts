import { NextSeoProps } from 'next-seo';

export const NEXT_SEO: NextSeoProps = {
    title: 'Видеовиджет для сайта',
    description:
        'Видеовиджет можно установить для любого сайта и легко интегрировать в любую CMS, WordPress, Bitrix и т.д.',
    openGraph: {
        type: 'website',
        locale: 'ru_RU',
        url: 'https://trywidget.ru',
        siteName: 'Видеовиджет для сайта',
        images: [
            {
                url: 'https://trywidget.ru/static/favicon.svg',
            },
        ],
    },
};
