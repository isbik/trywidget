import Image from 'next/image';

type Props = {};

export const IntegrationSteps = (props: Props) => {
    const steps = [
        {
            name: 'Снимите короткий ролик',
            image: '/static/selfie.png',
            description:
                'Используйте камеру или смартфон, чтобы записать короткое видео, которое вы хотите добавить на свой веб-сайт.',
        },
        {
            name: 'Загрузите видео',
            image: '/static/image.png',
            description: 'Создайте видеовиджет и загрузите видео на платформу.',
        },
        {
            name: 'Настройте стили',
            image: '/static/magic-wand.png',
            description:
                'Выберите стиль и дизайн видеовиджета, который вы хотите использовать на своем веб-сайте.',
        },
        {
            name: 'Добавьте на сайт',
            image: '/static/layers.png',
            description:
                'Скопируйте код предоставленный платформой, и вставьте его в HTML-код вашего веб-сайта.',
        },
    ];

    return (
        <section className="bg-[#EEF1F7]">
            <div className="container py-16">
                <h2 className="mb-8 text-3xl font-black text-center md:text-5xl">
                    <span className="p-1 bg-yellow-300">Простая</span> интеграция
                </h2>

                <div className="grid justify-center grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
                    {steps.map(({ name, image, description }, index) => (
                        <div
                            key={index}
                            className="bg-white relative flex flex-col p-6 border rounded-md min-w-[300px] hover:shadow-xl transition-all"
                        >
                            <div className="absolute p-4 bg-white border rounded-full centered -top-4 -right-4">
                                <Image width={32} height={32} src={image} alt={name} />
                            </div>

                            <div className="flex items-center gap-6 mb-2">
                                <span className="text-6xl font-bold text-base-300">
                                    {index + 1}
                                </span>
                                <h3 className="text-lg font-bold">{name}</h3>
                            </div>
                            <p>{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
