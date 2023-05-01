import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '../../lib/cn';
import {
    ArrowRightOnRectangleIcon,
    ArrowUpCircleIcon,
    Bars3Icon,
    FilmIcon,
    LinkIcon,
    UserIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { api } from '@vw/src/api/api';

type Props = {
    children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
    const items = [
        {
            title: 'Аккаунт',
            url: '/app/account',
            Icon: UserIcon,
        },
        {
            title: 'Виджеты',
            url: '/app',
            Icon: FilmIcon,
        },
        {
            title: 'Реферальная программа',
            url: '',
            Icon: LinkIcon,
            className: '',
        },
    ];

    const [openDrawer, setOpenDrawer] = useState(true);

    const router = useRouter();

    const handleLogout = () => {
        api.get('auth/logout');
        router.push('/');
    };

    return (
        <main
            className={cn(
                'flex max-sm:flex-col transition-all pl-[240px] bg-base-200 h-full',
                !openDrawer && 'max-sm:pl-0'
            )}
        >
            <nav
                className={cn(
                    'transition-all min-w-[240px] w-[240px] h-screen flex flex-col fixed left-0 border-r bg-white',
                    !openDrawer && 'max-sm:-translate-x-full'
                )}
            >
                <div className="flex items-center gap-3 p-4 mb-16">
                    <img className="w-8 h-8" src="/static/logo.svg" alt="logo" />
                    <p className="font-black leading-5">Embedless</p>
                </div>

                <ul className="flex flex-col grow text-[14px] overflow-y-auto">
                    {items.map(({ title, url, className, Icon }) => (
                        <li key={url} className={'centered ' + className}>
                            <Link
                                className={cn(
                                    'w-full p-4 flex gap-2',
                                    router.asPath === url && 'bg-[#EEF1F7] text-primary'
                                )}
                                href={url}
                            >
                                <Icon className={cn('w-4')} />
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col p-4 border-t border-base-300">
                    <p className="text-xs font-bold">Базовый тариф</p>
                    <div className="flex items-center">
                        test@gmail.com
                        <button
                            onClick={handleLogout}
                            className="ml-auto btn btn-sm btn-circle btn-outline"
                        >
                            <ArrowRightOnRectangleIcon className="w-3" />
                        </button>
                    </div>

                    {/* TODO show button when plan is going expired or trial has 3 days left */}
                    <button className="items-center gap-2 mt-4 text-sm btn btn-sm btn-warning">
                        <ArrowUpCircleIcon className="w-4" />
                        Обновить тариф
                    </button>
                </div>
            </nav>

            <div className="p-2 bg-[#EEF1F7] sm:hidden">
                <button className="btn btn-sm btn-square" onClick={() => setOpenDrawer((p) => !p)}>
                    <Bars3Icon />
                </button>
            </div>

            <div className={cn('container flex-grow pt-8')}>{children}</div>
        </main>
    );
};
