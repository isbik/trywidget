import { CheckBadgeIcon, SparklesIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useState } from 'react';

type Props = {};

export const Opportunities = (props: Props) => {
    const ctaItems = ['Настройка стилей', 'Переход по ссылке', 'Открытие формы'];

    const [borderRadius, setBorderRadius] = useState(30);
    const [scale, setScale] = useState(5);
    const [color, setColor] = useState(270);

    return (
        <section className="bg-[#EEF1F7]">
            <div className="container py-16">
                <h2 className="mb-16 text-3xl font-black text-center md:text-5xl">
                    Больше чем просто <span className="p-1 bg-yellow-300">виджет</span>
                </h2>

                <div className="flex flex-wrap items-start justify-center gap-16 mb-16 sm:gap-32">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <Image
                                width={250}
                                height={400}
                                className="rounded-xl"
                                alt="Фотосессия"
                                src="/static/landing/woman-2.jpg"
                            />
                            <button className="absolute py-3 text-white outline-dashed outline-4 outline-offset-4 grow bottom-4 left-4 right-4 bg-[#bf00c5] rounded-xl">
                                Записаться на съемку
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
                            <Image
                                src="/static/landing/man.jpg"
                                width={250}
                                height={400}
                                className="shadow-xl rounded-xl"
                                alt="Мужчина"
                            />
                            <div className="absolute flex justify-center gap-3 py-1 text-white outline-dashed outline-4 outline-offset-4 grow bottom-4 left-4 right-4 rounded-xl">
                                <img
                                    src="/static/logos/vk.svg"
                                    className="h-[40px] w-[40px] object-cover rounded-xl"
                                    alt="Вконтакте"
                                />
                                <img
                                    src="/static/logos/telegram.svg"
                                    className="h-[40px] w-[40px] object-cover rounded-xl"
                                    alt="Телеграм"
                                />
                                <img
                                    src="/static/logos/whatsapp.svg"
                                    className="h-[40px] w-[40px] object-cover rounded-xl"
                                    alt="Ватсапп"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div
                            className="relative overflow-hidden"
                            style={{
                                borderRadius,
                                borderWidth: '4px',
                                borderStyle: 'solid',
                                borderColor: `hsl(${color}, 100%, 50%)`,
                            }}
                        >
                            <Image
                                width={250}
                                height={400}
                                src="/static/landing/woman-walking.jpg"
                                className="h-full"
                                alt="Женщина идет"
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

                <div className="flex gap-1 mb-8 max-w-[350px] m-auto font-bold">
                    <SparklesIcon className="w-6 text-primary" />
                    более 30 настроек и других функций
                </div>
            </div>
        </section>
    );
};
