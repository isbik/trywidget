import 'keen-slider/keen-slider.min.css';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';

type Props = {};

export const UseCases = (props: Props) => {
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slides: { perView: 1 },
        loop: true,
        breakpoints: {
            '(min-width: 1200px)': {
                slides: { perView: 2, spacing: 16 },
            },
            '(min-width: 1500px)': {
                slides: { perView: 3, spacing: 32 },
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const items = [
        {
            profession: 'Блогер',
            description:
                'Блогеры могут использовать видеовиджеты для показа своих видео-блогов на своих веб-сайтах и в социальных сетях. Они также могут использовать видеовиджеты для создания коллекции видеороликов, которые они могут продавать или предоставлять доступ к ним за подписку.',
            videoUrl: '/static/landing/videos/блогер.mp4',
        },
        {
            profession: 'Учителя',
            description:
                'Учителя могут использовать видеовиджеты для проведения онлайн-уроков и показа обучающих видеороликов на своих веб-сайтах. Они также могут использовать видеовиджеты для создания библиотеки обучающих видеороликов, которые ученики могут просматривать в любое время.',
            videoUrl: '/static/landing/videos/учитель.mp4',
        },
        // {
        //     profession: 'Фотограф',
        //     description:
        //         'Фотографы могут использовать видеовиджеты для создания слайд-шоу своих фотографий, которые они могут показывать на своих веб-сайтах и в социальных сетях. Они также могут использовать видеовиджеты для создания обучающих видеороликов, которые помогут своим клиентам улучшить свои навыки фотографирования.',
        //     // TODO
        //     videoUrl: '/static/landing/videos/учитель.mp4',
        // },
        // {
        //     profession: 'Юрист',
        //     description:
        //         'Юристы могут использовать видеовиджеты для проведения онлайн-консультаций и показа видеороликов с рекомендациями по правовым вопросам на своих веб-сайтах и в социальных сетях. Они также могут использовать видеовиджеты для создания обучающих видеороликов, которые помогут своим клиентам лучше понимать юридические вопросы.',
        //     // TODO
        //     videoUrl: '/static/landing/videos/учитель.mp4',
        // },
        {
            profession: 'Агент по недвижимости',
            description:
                'Агент по недвижимости может использовать видеовиджет для демонстрации виртуальных туров по объектам недвижимости, основных моментов по соседству и отзывов клиентов. Это может помочь потенциальным покупателям лучше ознакомиться с недвижимостью и окрестностями, прежде чем планировать физическое посещение.',
            videoUrl: '/static/landing/videos/риэлетор.mp4',
        },
        {
            profession: 'Фитнес-тренер:',
            description:
                'Фитнес-тренер может использовать видеовиджет, чтобы делиться тренировками, демонстрациями упражнений и мотивационными сообщениями. Это может помочь клиентам оставаться вовлеченными в достижение своих целей в фитнесе и обеспечить удобный способ доступа к тренировкам из дома.',
            videoUrl: '/static/landing/videos/фитнес тренер.mp4',
        },
        {
            profession: 'Шеф-повар',
            description:
                'Шеф-повар или инструктор по кулинарии может использовать видеовиджет для обмена рецептами, кулинарными советами и обучающими видеороликами. Это может помочь создать их бренд как эксперта в данной области и предоставить ценный контент для любителей еды.',
            videoUrl: '/static/landing/videos/повар.mp4',
        },
        {
            profession: 'Музыкант',
            description:
                'Музыкант может использовать виджет видео для обмена музыкальными клипами, живыми выступлениями и кадрами из-за кулис. Это может помочь создать их фан-базу и обеспечить более личную связь с аудиторией.',
            videoUrl: '/static/landing/videos/музыкант.mp4',
        },
        {
            profession: 'Лайф-коуч',
            description:
                'Лайф-коуч может использовать видеовиджет для обмена мотивационными сообщениями, коучинговыми сессиями и историями успеха клиентов. Это может помочь укрепить доверие с потенциальными клиентами и дать представление о процессе коучинга.',
            videoUrl: '/static/landing/videos/коуч.mp4',
        },
    ];

    return (
        <section className="container py-16">
            <h2 className="mb-16 text-3xl font-black text-center md:text-5xl">
                Как можно <span className="p-1 bg-yellow-300">использовать</span>
            </h2>

            <div ref={sliderRef} className="m-auto keen-slider">
                {items.map(({ profession, description, videoUrl }, index) => (
                    <div key={profession} className="flex gap-6 keen-slider__slide">
                        <video
                            className="bg-red-400 h-[300px] min-w-[200px] rounded-xl object-cover"
                            src={videoUrl}
                            muted
                            autoPlay={currentSlide + 1 === index}
                            loop
                            preload="auto"
                            onClick={(event) => {
                                if (event.currentTarget.paused) {
                                    event.currentTarget.play();
                                } else {
                                    event.currentTarget.pause();
                                }
                            }}
                        />

                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl font-bold">{profession}</h3>
                            <p>{description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {loaded && instanceRef.current && (
                <div className="flex justify-center gap-4 mt-8">
                    {[...Array(instanceRef.current.track.details.slides.length).keys()].map(
                        (idx) => {
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        instanceRef.current?.moveToIdx(idx);
                                    }}
                                    className={
                                        'w-4 h-4 bg-[#EEF1F7] rounded-full' +
                                        (currentSlide === idx ? ' bg-primary' : '')
                                    }
                                    aria-label="Навигация"
                                ></button>
                            );
                        }
                    )}
                </div>
            )}
        </section>
    );
};
