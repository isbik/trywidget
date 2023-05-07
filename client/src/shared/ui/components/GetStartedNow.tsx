import { Labels } from '@vw/src/features/home/ui/Labels';
import Link from 'next/link';
import React from 'react';

type Props = {};

export const GetStartedNow = (props: Props) => {
    return (
        <div className=" bg-[#EEF1F7]">
            <div className="container flex flex-col items-center py-16 text-center">
                <p className="mb-8 text-3xl font-black md:text-5xl">
                    Создайте свой <span className="p-1 bg-yellow-300">виджет</span> сегодня.
                </p>

                <p className="mb-8 max-w-[400px]">
                    Попробуйте видеовиджет сегодня и выведите свое присутствие в Интернете на новый
                    уровень!
                </p>
                <Link href={'/login'} className="mb-8 btn btn-primary bg-primary btn-wide">
                    Начать сейчас
                </Link>
                <Labels />
            </div>
        </div>
    );
};
