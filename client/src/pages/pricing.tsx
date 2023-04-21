import { Footer } from '../shared/ui/components/Footer';
import { Header } from '../shared/ui/components/Header';

const PlansPage = () => {
    return (
        <>
            <Header />

            <main className="container py-16">
                <div className="text-center">
                    <h1 className="mb-12 text-4xl">Выберите подходящий для вас план</h1>

                    <div className="flex justify-center gap-2 mb-8">
                        <p>В месяц</p>
                        <input type="checkbox" className="toggle toggle-primary" />
                        <p>
                            В год <span className="text-primary">(Скида до 20%)</span>
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <div className="max-w-xs p-4 card card-bordered bg-base-200">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam asperiores
                            molestias sapiente error illo fugiat voluptatibus sed excepturi dolore
                            sit sequi illum, mollitia obcaecati reprehenderit ullam odit porro
                            tenetur et sint dignissimos quia quod ab dicta saepe. Est, hic.
                        </div>
                        <div className="max-w-xs p-4 card card-bordered bg-base-200">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam asperiores
                            molestias sapiente error illo fugiat voluptatibus sed excepturi dolore
                            sit sequi illum, mollitia obcaecati reprehenderit ullam odit porro
                            tenetur et sint dignissimos quia quod ab dicta saepe. Est, hic.
                        </div>
                        <div className="max-w-xs p-4 card card-bordered bg-base-200">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam asperiores
                            molestias sapiente error illo fugiat voluptatibus sed excepturi dolore
                            sit sequi illum, mollitia obcaecati reprehenderit ullam odit porro
                            tenetur et sint dignissimos quia quod ab dicta saepe. Est, hic.
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default PlansPage;
