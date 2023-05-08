import { CheckBadgeIcon } from '@heroicons/react/24/solid';

type Props = {};

export const AnyWebsite = (props: Props) => {
    const logos = [
        '/static/logos/html.png',
        '/static/logos/bitrix.png',
        '/static/logos/tilda.png',
        '/static/logos/wordpress.png',
        '/static/logos/wix.jpg',
        '/static/logos/Shopify.png',
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
