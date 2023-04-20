import { Footer } from '../shared/ui/components/Footer';
import { Header } from '../shared/ui/components/Header';

const PlansPage = () => {
    return (
        <>
            <Header />

            <main className="container py-64">
                <h1 className="mb-12 text-4xl">Планы</h1>
                <button className="btn btn-primary">Кнопка</button>
            </main>

            <Footer />
        </>
    );
};

export default PlansPage;
