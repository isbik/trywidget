import Link from 'next/link';
import { AnyWebsite } from '../features/home/ui/AnyWebsite';
import { IntegrationSteps } from '../features/home/ui/IntegrationSteps';
import { Labels } from '../features/home/ui/Labels';
import { Opportunities } from '../features/home/ui/Opportunities';
import { Review } from '../features/home/ui/Review';
import { UseCases } from '../features/home/ui/UseCases';
import { Footer } from '../shared/ui/components/Footer';
import { GetStartedNow } from '../shared/ui/components/GetStartedNow';
import { Header } from '../shared/ui/components/Header';
import { FeedbackForm } from '../widgets/FeedbackForm';

const Home = () => {
    return (
        <>
            <Header />

            <main className="py-32">
                <div className="container flex">
                    <div className="flex flex-col grow max-w-[500px]">
                        <h1 className="mb-8 text-4xl font-black uppercase md:text-6xl">
                            Видеовиджет для сайта{' '}
                            <span className="block p-1 bg-yellow-300 w-fit">за секунды.</span>
                        </h1>
                        <p className="mb-12 max-w-[450px]">
                            Донесите свое сообщение с помощью видеовиджетов! Привлекайте свою
                            аудиторию и увеличивайте конверсию с помощью настраиваемых
                            видеовиджетов.
                        </p>
                        <Link
                            href="/register"
                            className="px-6 py-3 mb-2 text-white transition-all border rounded w-fit bg-primary border-primary hover:scale-110"
                        >
                            Начать пользоваться
                        </Link>
                        <Labels />
                    </div>

                    <div className="relative ml-auto -mr-32 max-md:hidden xl:mr-48 w-fit">
                        <div className="absolute hover:shadow-2xl hover:scale-[1.2] transition-all hover:z-10 overflow-hidden border-4 shadow-xl rounded-3xl right-36 border-[#B250FF] -top-8">
                            <img
                                className="w-[250px] min-w-[250px] object-cover h-[350px]"
                                src="/static/landing/selfie.jpg"
                                alt="Селфи"
                            />
                        </div>
                        <div className="rounded-3xl border-4 absolute hover:shadow-2xl hover:z-10 hover:scale-[1.2] transition-all -right-8 shadow-xl top-4 overflow-hidden border-[#0066FF]">
                            <img
                                className="w-[250px] min-w-[250px] object-cover  h-[350px] "
                                src="/static/landing/laywer.jpg"
                                alt="Адвокат"
                            />

                            <div className="absolute flex justify-center gap-4 bottom-4 left-4 right-4 ">
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

                        <div className="absolute hover:shadow-2xl hover:scale-[1.2] transition-all overflow-hidden shadow-xl rounded-3xl right-16 top-24 border-4 border-[#101128]">
                            <img
                                className="w-[250px] min-w-[250px] object-cover  h-[350px]"
                                src="/static/landing/woman.jpg"
                                alt="Женщина"
                            />
                            <button className="absolute hover:shadow-2xl transition-all p-2 text-white cursor-pointer rounded-3xl bottom-2 right-4 left-4 bg-[#101128]">
                                Подать заявку
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <IntegrationSteps />

            <AnyWebsite />

            <UseCases />

            <Opportunities />

            <Review />

            <GetStartedNow />

            <FeedbackForm />

            <Footer />
        </>
    );
};

export default Home;
