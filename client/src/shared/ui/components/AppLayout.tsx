import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '../../lib/cn';
import {
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    FilmIcon,
    LifebuoyIcon,
    LinkIcon,
    UserIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

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

    return (
        <main
            className={cn(
                'flex max-sm:flex-col transition-all pl-[240px]',
                !openDrawer && 'max-sm:pl-0'
            )}
        >
            <nav
                className={cn(
                    'transition-all min-w-[240px] w-[240px] h-screen flex flex-col fixed left-0 bg-base-200',
                    !openDrawer && 'max-sm:-translate-x-full'
                )}
            >
                <div className="flex items-center gap-3 p-4 mb-16">
                    <img className="w-8 h-8" src="/static/logo.svg" alt="logo" />
                    <p className="leading-2">Video Party</p>
                </div>

                <ul className="flex flex-col grow text-[14px] overflow-y-auto">
                    {items.map(({ title, url, className, Icon }) => (
                        <li key={url} className={'centered ' + className}>
                            <Link
                                className={cn(
                                    'w-full p-4 flex gap-2',
                                    router.asPath === url && 'bg-base-300'
                                )}
                                href={url}
                            >
                                <Icon
                                    className={cn('w-4', router.asPath === url && 'text-primary')}
                                />
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center p-4 border-t border-base-300">
                    test@gmail.com
                    <Link href="/" className="ml-auto btn btn-sm btn-circle btn-outline">
                        <ArrowRightOnRectangleIcon className="w-3" />
                    </Link>
                </div>
            </nav>

            <div className="p-2 bg-base-300 sm:hidden">
                <button className="btn btn-sm btn-square" onClick={() => setOpenDrawer((p) => !p)}>
                    <Bars3Icon />
                </button>
            </div>

            <div className={cn('container flex-grow pt-8')}>{children}</div>
        </main>
    );
};
