import { Footer } from '../shared/ui/components/Footer';
import { Header } from '../shared/ui/components/Header';

const Home = () => {
    return (
        <>
            <Header />

            <main className="container py-64">
                <h1 className="mb-12 text-4xl">Виджеты для вашего сайта</h1>
                <button className="btn btn-primary">Кнопка</button>
            </main>

            <Footer />
        </>
    );
};

export default Home;
