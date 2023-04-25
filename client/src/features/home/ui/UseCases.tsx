import 'keen-slider/keen-slider.min.css';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';

type Props = {};

export const UseCases = (props: Props) => {
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 1,
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
            profession: 'Шеф-повар / инструктор по кулинарии',
            description:
                ' Шеф-повар или инструктор по кулинарии может использовать видео-виджет для обмена рецептами, кулинарными советами и обучающими видеороликами. Это может помочь создать их бренд как эксперта в данной области и предоставить ценный контент для любителей еды.',
            videoUrl: '',
        },
        {
            profession: 'Шеф-повар / инструктор по кулинарии',
            description:
                ' Шеф-повар или инструктор по кулинарии может использовать видео-виджет для обмена рецептами, кулинарными советами и обучающими видеороликами. Это может помочь создать их бренд как эксперта в данной области и предоставить ценный контент для любителей еды.',
            videoUrl: '',
        },
        {
            profession: 'Шеф-повар / инструктор по кулинарии',
            description:
                ' Шеф-повар или инструктор по кулинарии может использовать видео-виджет для обмена рецептами, кулинарными советами и обучающими видеороликами. Это может помочь создать их бренд как эксперта в данной области и предоставить ценный контент для любителей еды.',
            videoUrl: '',
        },
        {
            profession: 'Шеф-повар / инструктор по кулинарии',
            description:
                ' Шеф-повар или инструктор по кулинарии может использовать видео-виджет для обмена рецептами, кулинарными советами и обучающими видеороликами. Это может помочь создать их бренд как эксперта в данной области и предоставить ценный контент для любителей еды.',
            videoUrl: '',
        },
        {
            profession: 'Шеф-повар / инструктор по кулинарии',
            description:
                ' Шеф-повар или инструктор по кулинарии может использовать видео-виджет для обмена рецептами, кулинарными советами и обучающими видеороликами. Это может помочь создать их бренд как эксперта в данной области и предоставить ценный контент для любителей еды.',
            videoUrl: '',
        },
    ];

    return (
        <section className="container py-16">
            <h2 className="mb-16 text-3xl font-black text-center md:text-5xl">
                Как можно <span className="p-1 bg-yellow-300">использовать</span>
            </h2>

            <div ref={sliderRef} className="m-auto keen-slider">
                {items.map(({ profession, description }) => (
                    <div key={profession} className="flex gap-6 keen-slider__slide">
                        <img
                            className="bg-red-400 h-[300px] min-w-[200px] rounded-xl"
                            src=""
                            alt=""
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
                                ></button>
                            );
                        }
                    )}
                </div>
            )}
        </section>
    );
};
