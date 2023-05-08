import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';

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
            imageUrl: '/static/landing/use/blogger.jpg',
            buttonText: 'Заказать рекламу',
        },
        {
            profession: 'Учителя',
            description:
                'Учителя могут использовать видеовиджеты для проведения онлайн-уроков и показа обучающих видеороликов на своих веб-сайтах. Они также могут использовать видеовиджеты для создания библиотеки обучающих видеороликов, которые ученики могут просматривать в любое время.',
            imageUrl: '/static/landing/use/teacher.jpg',
            buttonText: 'Пробный урок',
        },
        {
            profession: 'Фотограф',
            description:
                'Фотографы могут использовать видеовиджеты для создания слайд-шоу своих фотографий, которые они могут показывать на своих веб-сайтах и в социальных сетях. Они также могут использовать видеовиджеты для создания обучающих видеороликов, которые помогут своим клиентам улучшить свои навыки фотографирования.',
            imageUrl: '/static/landing/use/photographer.jpg',
            buttonText: 'Заказать съемку',
        },
        {
            profession: 'Юрист',
            description:
                'Юристы могут использовать видеовиджеты для проведения онлайн-консультаций и показа видеороликов с рекомендациями по правовым вопросам на своих веб-сайтах и в социальных сетях. Они также могут использовать видеовиджеты для создания обучающих видеороликов, которые помогут своим клиентам лучше понимать юридические вопросы.',
            imageUrl: '/static/landing/use/laywer.jpg',
            buttonText: 'Оформить документы',
        },

        {
            profession: 'Фитнес-тренер:',
            description:
                'Фитнес-тренер может использовать видеовиджет, чтобы делиться тренировками, демонстрациями упражнений и мотивационными сообщениями. Это может помочь клиентам оставаться вовлеченными в достижение своих целей в фитнесе и обеспечить удобный способ доступа к тренировкам из дома.',
            imageUrl: '/static/landing/use/coach.jpg',
            buttonText: 'Бесплатная тренировка',
        },
        {
            profession: 'Музыкант',
            description:
                'Музыкант может использовать виджет видео для обмена музыкальными клипами, живыми выступлениями и кадрами из-за кулис. Это может помочь создать их фан-базу и обеспечить более личную связь с аудиторией.',
            imageUrl: '/static/landing/use/musician.jpg',
            buttonText: 'Пробное занятие',
        },
    ];

    return (
        <section className="container py-16">
            <h2 className="mb-16 text-3xl font-black text-center md:text-5xl">
                Как можно <span className="p-1 bg-yellow-300">использовать</span>
            </h2>

            <div ref={sliderRef} className="m-auto keen-slider">
                {items.map(({ profession, description, imageUrl, buttonText }, index) => (
                    <div key={profession} className="flex gap-6 keen-slider__slide">
                        <div className="relative h-fit">
                            <img
                                className="bg-red-400 h-[300px] min-w-[200px] rounded-xl object-cover"
                                src={imageUrl}
                                alt={profession}
                            />
                            <button className="absolute py-2 text-white bg-primary left-2 right-2 bottom-2 rounded-xl">
                                {buttonText}
                            </button>
                        </div>

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
