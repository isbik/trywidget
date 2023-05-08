import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className=" flex justify-center gap-4 py-8 mt-auto text-center border-t text-[14px] flex-col md:flex-row">
            <span>© {new Date().getFullYear()} TryWidget</span>

            <Link className="whitespace-nowrap" href="/terms">
                Пользовательское соглашения
            </Link>

            <Link className="whitespace-nowrap" href="/privacy">
                Политика конфиденциальности
            </Link>
        </footer>
    );
};
