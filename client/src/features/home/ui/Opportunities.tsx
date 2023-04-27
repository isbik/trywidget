import { CheckBadgeIcon, PlusCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

type Props = {};

export const Opportunities = (props: Props) => {
    const ctaItems = ['Настройка стилей', 'Переход по ссылки', 'Открытие формы'];

    const [borderRadius, setBorderRadius] = useState(1);
    const [scale, setScale] = useState(5);
    const [color, setColor] = useState(1);

    return (
        <section className="bg-[#EEF1F7]">
            <div className="container py-16">
                <h2 className="mb-16 text-3xl font-black text-center md:text-5xl">
                    Больше чем просто <span className="p-1 bg-yellow-300">виджет</span>
                </h2>

                <div className="flex flex-col items-center w-full max-w-2xl gap-4 m-auto mb-16 md:gap-16 md:mb-32 md:flex-row">
                    <div className="relative">
                        <img
                            src="/static/landing/review-person.png"
                            className="h-[400px] w-[250px] object-cover rounded-xl"
                            alt=""
                        />
                        <button className="absolute py-3 text-white outline-dashed outline-4 outline-offset-4 grow bottom-4 left-4 right-4 bg-primary rounded-xl">
                            Регистрация
                        </button>
                    </div>

                    <div className="grow">
                        <h3 className="mb-4 text-2xl font-bold md:text-4xl">Настройка CTA</h3>

                        <ul>
                            {ctaItems.map((name) => (
                                <li key={name} className="flex items-center gap-1">
                                    <CheckBadgeIcon className="w-4 text-primary" />
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col-reverse items-center w-full max-w-2xl gap-4 m-auto mb-16 md:gap-16 md:mb-32 md:flex-row">
                    <div className="flex flex-col max-md:items-center grow">
                        <h3 className="mb-4 text-2xl font-bold md:text-4xl">
                            Добавление мессенджеров
                        </h3>

                        <ul>
                            <li className="flex items-center gap-1">
                                <CheckBadgeIcon className="w-4 text-primary" />
                                WhatsApp
                            </li>
                            <li className="flex items-center gap-1">
                                <CheckBadgeIcon className="w-4 text-primary" />
                                Telegram
                            </li>
                            <li className="flex items-center gap-1">
                                <CheckBadgeIcon className="w-4 text-primary" />
                                Vk
                            </li>
                        </ul>
                    </div>

                    <div className="relative">
                        <img
                            src="/static/landing/review-person.png"
                            className="h-[400px] w-[250px] object-cover rounded-xl"
                            alt=""
                        />
                        <div className="absolute flex justify-center py-3 text-white outline-dashed outline-4 outline-offset-4 grow bottom-4 left-4 right-4 rounded-xl">
                            <img
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogospng.org%2Fdownload%2Fwhatsapp%2Flogo-whatsapp-4096.png&f=1&nofb=1&ipt=aaf35be9a3dcaebcbd8af45a4f1496078025970d9c1d2812a8ff7558d34e418f&ipo=images"
                                className="h-[40px] w-[40px] object-cover rounded-xl"
                                alt=""
                            />
                            <img
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hostgnome.com%2Fwp-content%2Fuploads%2F2021%2F09%2FTelegram-logo.png&f=1&nofb=1&ipt=d9972aeb1374eb41ec6f2e6861cabe1787061578f1b77f3df6b2f110a78c284f&ipo=images"
                                className="h-[40px] w-[40px] object-cover rounded-xl"
                                alt=""
                            />
                            <img
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogodownload.org%2Fwp-content%2Fuploads%2F2020%2F01%2Fvk-logo-0.png&f=1&nofb=1&ipt=6111fb9b8128a37a351e302b975c0c73bddf2efaa94c0271b8e8279893095270&ipo=images"
                                className="h-[40px] w-[40px] object-cover rounded-xl"
                                alt=""
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center w-full max-w-2xl gap-4 m-auto mb-16 md:gap-16 md:mb-32 md:flex-row">
                    <div className="relative h-[400px] w-[250px] min-h-[400px]">
                        <img
                            src="/static/landing/review-person.png"
                            className="h-[80px] w-[50px] object-cover bottom-0 left-0 absolute"
                            alt=""
                            style={{
                                borderRadius,
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: `hsl(${color}, 100%, 50%)`,
                                transform: `scale(${scale})`,
                                transformOrigin: 'bottom left',
                            }}
                        />
                    </div>

                    <div className="flex-col items-center max-md:text-center grow">
                        <h3 className="mb-4 text-2xl font-bold md:text-4xl">Удобный редактор</h3>

                        <label className="flex flex-col gap-1 mb-4 max-w-[200px]">
                            Форма
                            <input
                                onChange={({ target }) => {
                                    return setBorderRadius(Number(target.value));
                                }}
                                min={1}
                                max={25}
                                type="range"
                                className="range range-primary range-sm"
                            />
                        </label>
                        <label className="flex flex-col gap-1 mb-4 max-w-[200px]">
                            Размер
                            <input
                                onChange={({ target }) => {
                                    return setScale(Number(target.value));
                                }}
                                min={1}
                                max={5}
                                type="range"
                                className="range range-primary range-sm "
                            />
                        </label>
                        <label className="flex flex-col gap-1 mb-8 max-w-[200px]">
                            Цвет
                            <input
                                onChange={({ target }) => {
                                    return setColor(Number(target.value));
                                }}
                                min={1}
                                max={360}
                                type="range"
                                className="range range-primary range-sm"
                            />
                        </label>

                        <div className="flex gap-1 mb-4 max-w-[200px]">
                            <SparklesIcon className="w-6 text-primary" />
                            более 30 настроек
                        </div>
                    </div>
                </div>

                <p className="text-2xl font-black text-center md:text-4xl text-primary">
                    И множество других <span className="bg-yellow-300 md:p-2">функций</span>
                </p>
            </div>
        </section>
    );
};
