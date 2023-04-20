import Link from 'next/link';
import React from 'react';

export const Footer = () => {
    return (
        <footer className="flex justify-center gap-4 py-8 mt-auto text-center opacity-50 border-t border-base-300 text-[14px]">
            <span>© {new Date().getFullYear()} VideoParty</span>

            <Link className="whitespace-nowrap" href="/policy">
                Пользовательское соглашения
            </Link>

            <Link className="whitespace-nowrap" href="/policy">
                Политика конфиденциальности
            </Link>
        </footer>
    );
};
