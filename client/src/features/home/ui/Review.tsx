import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import React from 'react';

type Props = {};

export const Review = (props: Props) => {
    return (
        <section className="container flex justify-center my-32">
            <div className="bg-[#111827] text-white max-w-6xl w-full px-8 rounded-xl flex md:gap-16 flex-col md:flex-row">
                <div className="py-16 max-md:pb-0 flex flex-col max-w-[500px] mr-auto">
                    <h2 className="mb-8 text-3xl font-black md:text-5xl">
                        Это была любовь с первого взгляда.
                    </h2>
                    <p className="mb-8">
                        Отличный виджет и потрясающая поддержка. Я опробовала другие виджеты,
                        которые пытаются достичь того же самого. Ни один из них не делал это так
                        красиво и просто, как EmbedStories
                    </p>
                </div>
                <img
                    src="/static/landing/review-person.png"
                    alt="Отзыв"
                    className="my-8 max-w-[300px] md:w-[300px] md:h-[300px] m-auto"
                />
            </div>
        </section>
    );
};
