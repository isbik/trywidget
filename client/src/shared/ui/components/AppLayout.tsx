import {
    ArrowRightOnRectangleIcon,
    ArrowUpCircleIcon,
    Bars3Icon,
    FilmIcon,
    LinkIcon,
    UserIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import { api } from '@vw/src/api/api';
import { $user, userReset } from '@vw/src/features/user/model';
import dayjs from 'dayjs';
import { useStore } from 'effector-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { cn } from '../../lib/cn';

type Props = {
    children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
    const user = useStore($user);

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
            soon: true,
        },
    ];

    const [openDrawer, setOpenDrawer] = useState(false);

    const router = useRouter();

    const handleLogout = () => {
        api.get('auth/logout');

        router.replace('/').then(() => {
            userReset();
        });
    };

    const showUpdate = () => {
        if (!user) return;

        if (user.plan) {
            return dayjs(user.next_payment_date).diff(new Date(), 'days') <= 3;
        }

        return dayjs(user.trial_end).diff(new Date(), 'days') <= 3;
    };

    return (
        <main
            className={cn('flex max-sm:flex-col transition-all sm:pl-[240px] bg-base-200 h-full')}
        >
            <div className={cn('fixed w-screen h-screen bg-black/60', !openDrawer && 'hidden')} />

            <nav
                className={cn(
                    'transition-all min-w-[240px] w-[240px] h-screen flex flex-col fixed left-0 border-r bg-white',
                    !openDrawer && 'max-sm:-translate-x-full',
                    openDrawer && 'translate-x-0 max-md:z-10'
                )}
            >
                <div className="flex items-center gap-3 p-4 mb-4 md:mb-16">
                    <Image width={50} height={50} src="/static/logo.svg" alt="logo" />
                    <p className="mr-auto font-black leading-5">Trywidget</p>
                    <button
                        type="button"
                        onClick={() => setOpenDrawer(!openDrawer)}
                        className="sm:hidden btn-sm btn btn-ghost btn-square"
                    >
                        <XMarkIcon className="w-4" />
                    </button>
                </div>

                <ul className="flex flex-col grow text-[14px] overflow-y-auto">
                    {items.map(({ title, url, className, Icon, soon }) => (
                        <li key={url} className={'centered relative ' + className}>
                            <Link
                                className={cn(
                                    'w-full p-4 flex gap-2',
                                    router.asPath === url && 'bg-[#EEF1F7] text-primary',
                                    soon && 'opacity-50 pointer-events-none'
                                )}
                                href={url}
                            >
                                <Icon className={cn('w-4')} />
                                {title}
                                {soon && (
                                    <span className="absolute p-0 px-1 text-xs top-1 right-2 badge badge-primary">
                                        Скоро
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-col p-4 border-t border-base-300">
                    <p className="text-xs font-bold">
                        {user?.plan?.display_name || 'Пробный тариф'}
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="mr-auto overflow-hidden whitespace-nowrap text-ellipsis">
                            {user?.email}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="btn btn-sm btn-circle btn-outline"
                        >
                            <ArrowRightOnRectangleIcon className="w-3" />
                        </button>
                    </div>

                    {showUpdate() && (
                        <button className="items-center gap-2 mt-4 text-sm btn btn-sm btn-warning">
                            <ArrowUpCircleIcon className="w-4" />
                            Обновить тариф
                        </button>
                    )}
                </div>
            </nav>

            <div className="p-2 bg-[#EEF1F7] sm:hidden">
                <button
                    className="btn btn-ghost btn-sm btn-outline btn-square"
                    onClick={() => setOpenDrawer((p) => !p)}
                    type="button"
                >
                    <Bars3Icon className="w-4" />
                </button>
            </div>

            <div className={cn('container flex-grow pt-8')}>{children}</div>
        </main>
    );
};
