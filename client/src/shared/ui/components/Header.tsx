import Link from 'next/link';

export const Header = () => {
    return (
        <header className="shadow-[0px_0px_20px_rgba(0,0,0,0.1)]">
            <div className="container flex items-center gap-4 h-[70px]">
                <Link href={'/'} className="mr-auto" aria-label="Логотип">
                    <img src="/static/logo.svg" alt="Логотип" className="w-[50px]" />
                </Link>

                <Link href="/pricing" className="btn max-md:btn-sm btn-ghost">
                    Тарифы
                </Link>

                <Link href="/login" className="btn max-md:btn-sm btn-ghost">
                    Войти
                </Link>

                <Link
                    href={'/register'}
                    className="rounded btn max-md:btn-sm btn-primary bg-primary"
                >
                    Бесплатный период
                </Link>
            </div>
        </header>
    );
};
