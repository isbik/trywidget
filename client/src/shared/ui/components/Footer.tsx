import Link from 'next/link';
import React from 'react';

export const Footer = () => {
    return (
        <footer className="flex justify-center gap-4 py-8 mt-auto text-center opacity-50 border-t text-[14px] flex-col md:flex-row">
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
