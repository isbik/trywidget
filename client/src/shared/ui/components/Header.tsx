import Link from 'next/link';

export const Header = () => {
    return (
        <header className="shadow-[0px_0px_20px_rgba(0,0,0,0.1)]">
            <div className="container flex items-center gap-4 h-[70px]">
                <Link href={'/'} className="mr-auto">
                    <img src="/static/logo.svg" alt="" className="w-[50px]" />
                </Link>

                <Link href="/login" className="btn btn-ghost">
                    Войти
                </Link>
                <Link href={'/app'} className="rounded btn btn-primary bg-primary">
                    Бесплатный период
                </Link>
            </div>
        </header>
    );
};
