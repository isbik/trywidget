import Link from 'next/link';

export const Header = () => {
    return (
        <header className="items-center container flex gap-4 pt-4">
            <p className="badge badge-primary">Виджеты</p>

            <button className="btn btn-ghost mr-auto">Тарифы</button>
            <Link href="/login" className="btn btn-ghost">
                Войти
            </Link>
            <button className="btn btn-primary">Бесплатный период</button>
        </header>
    );
};
