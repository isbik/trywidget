import { CheckBadgeIcon, SparklesIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

type Props = {};

export const Opportunities = (props: Props) => {
    const ctaItems = ['Настройка стилей', 'Переход по ссылке', 'Открытие формы'];

    const [borderRadius, setBorderRadius] = useState(20);
    const [scale, setScale] = useState(5);
    const [color, setColor] = useState(240);

    return (
        <section className="bg-[#EEF1F7]">
            <div className="container py-16">
                <h2 className="mb-16 text-3xl font-black text-center md:text-5xl">
                    Больше чем просто <span className="p-1 bg-yellow-300">виджет</span>
                </h2>

                <div className="flex flex-wrap items-start justify-center gap-16 mb-16 sm:gap-32">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img
                                src="/static/landing/review-person.png"
                                className="h-[400px] w-[250px] object-cover rounded-xl"
                                alt=""
                            />
                            <button className="absolute py-3 text-white outline-dashed outline-4 outline-offset-4 grow bottom-4 left-4 right-4 bg-primary rounded-xl">
                                Записаться на курс
                            </button>
                        </div>

                        <div className="grow">
                            <h3 className="my-8 text-2xl font-bold md:text-3xl max-w-[220px] text-center">
                                Настройка кнопки CTA
                            </h3>

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

                    <div className="flex flex-col-reverse items-center">
                        <div className="flex flex-col max-md:items-center grow">
                            <h3 className="my-8 text-2xl font-bold md:text-3xl max-w-[250px] text-center">
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
                            <div className="absolute flex justify-center gap-3 py-3 text-white outline-dashed outline-4 outline-offset-4 grow bottom-4 left-4 right-4 rounded-xl">
                                <img
                                    src="/static/logos/vk.svg"
                                    className="h-[40px] w-[40px] object-cover rounded-xl"
                                    alt=""
                                />
                                <img
                                    src="/static/logos/telegram.svg"
                                    className="h-[40px] w-[40px] object-cover rounded-xl"
                                    alt=""
                                />
                                <img
                                    src="/static/logos/whatsapp.svg"
                                    className="h-[40px] w-[40px] object-cover rounded-xl"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
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
                            <h3 className="my-8 text-2xl font-bold md:text-3xl max-w-[220px] text-center">
                                Удобный редактор
                            </h3>

                            <ul className="mb-4">
                                <li className="flex items-center gap-1">
                                    <CheckBadgeIcon className="w-4 text-primary" />
                                    Форма
                                </li>
                                <li className="flex items-center gap-1">
                                    <CheckBadgeIcon className="w-4 text-primary" />
                                    Размер
                                </li>
                                <li className="flex items-center gap-1">
                                    <CheckBadgeIcon className="w-4 text-primary" />
                                    Цвет
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex gap-1 mb-8 max-w-[200px] m-auto">
                    <SparklesIcon className="w-6 text-primary" />
                    более 30 настроек
                </div>

                <p className="text-2xl font-black text-center md:text-4xl text-primary">
                    И множество других <span className="bg-yellow-300 md:p-2">функций</span>
                </p>
            </div>
        </section>
    );
};
