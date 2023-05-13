import { NextSeoProps } from 'next-seo';

export const NEXT_SEO: NextSeoProps = {
    title: 'Видеовиджет для сайта',
    description:
        'Видеовиджет можно установить для любого сайта и легко интегрировать в любую CMS, WordPress, Bitrix и т.д.',
    openGraph: {
        url: 'https://trywidget.ru',
        type: 'website',
        locale: 'ru_RU',
        siteName: 'Видеовиджет для сайта',
        title: 'Видеовиджет для сайта, который легко интегрировать в любую CMS, WordPress, Bitrix и т.д.',
        images: [
            {
                url: '/static/open-graph.png',
                alt: 'Og Image Alt',
            },
        ],
    },
};
