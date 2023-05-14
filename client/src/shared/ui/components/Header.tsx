import { Bars3BottomRightIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '../../lib/cn';

export const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="border-[#e3e3e3] border-b max-sm:fixed  bg-white max-sm:z-30 w-screen shadow-[0px_0px_20px_rgba(0,0,0,0.1)]">
            <div className="container flex items-center gap-4 h-[70px]">
                <Link href={'/'} className="mr-auto" aria-label="Логотип">
                    <Image width={50} height={50} src="/static/logo.svg" alt="Логотип" />
                </Link>

                <Link href="/pricing" className="max-sm:hidden btn btn-ghost">
                    Тарифы
                </Link>

                <Link href="/login" className="max-sm:hidden btn btn-ghost">
                    Войти
                </Link>

                <Link href={'/register'} className="rounded btn btn-primary bg-primary">
                    Бесплатный период
                </Link>

                <button className="btn btn-ghost sm:hidden" onClick={() => setOpen(!open)}>
                    <Bars3BottomRightIcon className="w-6" />
                </button>
            </div>

            <nav
                className={cn(
                    'opacity-0 transition-opacity fixed inset-0 z-50 bg-[#1e1c24b3] block sm:hidden',
                    open && 'opacity-100',
                    !open && 'pointer-events-none'
                )}
            >
                <div
                    className={cn(
                        'fixed flex flex-col top-0 bottom-0 transition-all -right-full bg-white min-w-[300px] p-6',
                        open && 'right-0'
                    )}
                >
                    <button className="self-end" onClick={() => setOpen((p) => !p)}>
                        <XCircleIcon className="w-6" />
                    </button>

                    <Link href="/pricing" className="btn btn-ghost">
                        Тарифы
                    </Link>

                    <Link href="/login" className="btn btn-ghost">
                        Войти
                    </Link>
                    <Link href="/register" className="btn btn-ghost">
                        Регистрация
                    </Link>
                </div>
            </nav>
        </header>
    );
};
