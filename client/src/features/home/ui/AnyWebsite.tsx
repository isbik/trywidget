import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import React from 'react';

type Props = {};

export const AnyWebsite = (props: Props) => {
    const logos = [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F10%2FWix-Logo-2015-present.jpg&f=1&nofb=1&ipt=35aeb9c191a46479fa10c20aa8fdadfef9217341a7889735543ede1a13cc1439&ipo=images',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F10%2FWordPress-Logo.png&f=1&nofb=1&ipt=05fe4ac1de586f9e497b9110ad81f9705879ece77cb4ef50c7a1717d2e7d549b&ipo=images',
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flogos-download.com%2Fwp-content%2Fuploads%2F2016%2F11%2FTilda_logo_logotype.png&f=1&nofb=1&ipt=35790f3c9818a4ca61e95e3e2c6c07f3cd344177b1ddb3b214455a2ba8950d1a&ipo=images',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F11%2FShopify-Logo.png&f=1&nofb=1&ipt=024853fa9fbc555430c32f8bbabb285e4f624b227af9dc6df640c5ce6c73d571&ipo=images',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fitcarg.com%2Fassets%2Fimg%2Fbitrix24%2Fbitrix24_logo.png&f=1&nofb=1&ipt=9edfc52a6075c69dc96c5569416744fd4ded1185ad152f65a07608197b7842c9&ipo=images',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipground.com%2Fimages%2Fhtml-5-logo-png-4.png&f=1&nofb=1&ipt=6c4c19a0855911db624517d9c8573ee9fa58c5c7df0125dc00ff64bb6a505078&ipo=images',
    ];

    return (
        <section className="container flex justify-center my-32">
            <div className="bg-[#EEF1F7] max-w-6xl w-full px-8 rounded-xl flex md:gap-16 flex-col md:flex-row">
                <div className="py-16 flex flex-col max-w-[500px]">
                    <h2 className="mb-8 text-3xl font-black md:text-5xl">
                        Работает с <span className="p-1 bg-yellow-300">99,9%</span> <br />{' '}
                        веб-платформ
                    </h2>
                    <p className="mb-8">
                        Мы интегрируемся с множеством других приложений, платформ электронной
                        коммерции или веб-конструкторов. Нативные приложения также доступны.
                    </p>

                    <ul className="flex flex-col gap-2">
                        <li className="flex items-center gap-1">
                            <CheckBadgeIcon className="min-w-[16px] w-4 text-primary" />
                            Работает с любым сайтом
                        </li>
                        <li className="flex items-center gap-1">
                            <CheckBadgeIcon className="min-w-[16px] w-4 text-primary" />
                            Для интеграции не требуется писать код
                        </li>
                    </ul>
                </div>

                <div className="relative overflow-auto grow no-scrollbar min-w-[200px]">
                    <ul className="flex flex-wrap items-center justify-center gap-4 py-16 md:absolute">
                        {logos.map((url) => (
                            <li key={url} className="p-4 bg-white rounded-xl">
                                <img src={url} alt="LOGO" className="h-12 md:h-24" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
