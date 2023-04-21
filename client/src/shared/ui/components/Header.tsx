import Link from 'next/link';

export const Header = () => {
    return (
        <header className="container flex items-center gap-4 pt-4">
            <p className="badge badge-primary">Виджеты</p>

            <Link href={'/pricing'} className="mr-auto btn btn-ghost">
                Тарифы
            </Link>
            <Link href="/login" className="btn btn-ghost">
                Войти
            </Link>
            <button className="btn btn-primary">Бесплатный период</button>
        </header>
    );
};
