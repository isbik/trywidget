import { Footer } from '../shared/ui/components/Footer';
import { GetStartedNow } from '../shared/ui/components/GetStartedNow';
import { Header } from '../shared/ui/components/Header';
import { Labels } from '../features/home/ui/Labels';
import { IntegrationSteps } from '../features/home/ui/IntegrationSteps';
import { AnyWebsite } from '../features/home/ui/AnyWebsite';
import { Review } from '../features/home/ui/Review';
import { UseCases } from '../features/home/ui/UseCases';
import { Opportunities } from '../features/home/ui/Opportunities';

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
                        <button className="px-6 py-3 mb-2 text-white transition-all border rounded w-fit bg-primary border-primary hover:scale-110">
                            Начать пользоваться
                        </button>
                        <Labels />
                    </div>

                    <div className="relative ml-auto w-fit max-md:hidden">
                        <img
                            className="max-w-[500px] absolute h-full right-0"
                            src="/static/landing/woman.png"
                            alt="Женщина"
                        />
                    </div>
                </div>
            </main>

            <IntegrationSteps />

            <AnyWebsite />

            <UseCases />

            <Opportunities />

            <Review />

            <GetStartedNow />
            <Footer />
        </>
    );
};

export default Home;
