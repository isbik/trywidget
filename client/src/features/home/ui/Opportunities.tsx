import { CheckBadgeIcon, PlusCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

type Props = {};

export const Opportunities = (props: Props) => {
    const ctaItems = ['Настройка стилей', 'Переход по ссылки', 'Открытие формы'];

    const [borderRadius, setBorderRadius] = useState(20);
    const [scale, setScale] = useState(5);
    const [color, setColor] = useState(240);

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
                            Записаться на курс
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
                                value={borderRadius}
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
                                className="range range-primary range-sm"
                                value={scale}
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
                                value={color}
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
