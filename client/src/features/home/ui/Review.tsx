import { useKeenSlider } from 'keen-slider/react';
import React from 'react';

type Props = {};

export const Review = (props: Props) => {
    const [sliderRef] = useKeenSlider({
        initial: 0,
        slides: { perView: 1 },
        loop: true,
        breakpoints: {
            '(min-width: 800px)': {
                slides: { perView: 2, spacing: 16 },
            },
            '(min-width: 1200px)': {
                slides: { perView: 3, spacing: 32 },
            },
        },
    });
    const reviews = [
        {
            author: 'Дмитрий',
            text: 'Это приложение дает мне именно то, что я ищу для моего интернет-магазина! Все очень легко настраивается.',
        },
        {
            author: 'Анна',
            text: 'Этот плагин довольно прост в использовании. Мне также нравятся ребята из службы поддержки, они всегда предупредительны и вежливы. Я определенно рекомендую это приложение.',
        },
        {
            author: 'Григорий',
            text: 'Виджет делает именно то, что я искал для своего интернет-магазина, и стоит он очень разумно. Прост в установке, прост в настройке.',
        },
        {
            author: 'Марк',
            text: 'Приложение помогло мне персонализировать мой виджет на моей домашней странице. Это выглядит высокопрофессионально, и я просто очень доволен.',
        },
    ];
    return (
        <section className="container my-32">
            <h2 className="mb-16 text-3xl font-black text-center md:text-5xl">
                Что говорят наши клиенты ❤️
            </h2>
            <div ref={sliderRef} className="keen-slider">
                {reviews.map(({ author, text }) => (
                    <div
                        key={author}
                        className="bg-[#111827] text-white  keen-slider__slide flex flex-col items-center text-center rounded-xl p-8"
                    >
                        <p className="mb-4 text-xs">{author}</p>
                        <p className="max-w-[350px]">{text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
