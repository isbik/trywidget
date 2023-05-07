import { api } from '@vw/src/api/api';
import { cn } from '@vw/src/shared/lib/cn';
import React from 'react';
import { useForm } from 'react-hook-form';

type Props = {};

export const FeedbackForm = (props: Props) => {
    const [isSent, setIsSent] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const { handleSubmit, register } = useForm({
        values: {
            name: 'asdf',
            email: 'test@gmail.cm',
            text: 'asdfas fas',
        },
    });

    const onSubmit = handleSubmit((data) => {
        if (isSent) return;

        setLoading(true);

        api.post('public/feedback', { json: data })
            .json()
            .then(() => {
                setIsSent(true);
            })
            .finally(() => {
                setLoading(false);
            });
    });

    return (
        <section className="py-16 centered">
            <form onSubmit={onSubmit} className="p-8 px-16 card card-bordered bg-[#EEF1F7]">
                <h2 className="max-w-md mb-12 text-2xl font-black text-center">
                    Остались вопросы или предложения, заполните форму и мы свяжемся с вами как можно
                    скорее!
                </h2>

                <div className="flex flex-col items-center justify-center w-full mb-8">
                    <div className="w-full form-control">
                        <label className="pb-0 label" htmlFor="name">
                            <span className="text-center">Как к вам обращаться?</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Введите ваше имя"
                            id="name"
                            className="input input-bordered"
                            {...register('name', { required: true })}
                        />
                    </div>

                    <div className="w-full form-control">
                        <label className="pb-0 label" htmlFor="email">
                            <span className="text-center">Ваша почта</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Введите E-mail"
                            id="email"
                            className="input input-bordered"
                            {...register('email', { required: true })}
                        />
                    </div>

                    <div className="w-full form-control">
                        <label className="pb-0 label" htmlFor="text">
                            <span className="text-center">Текст обращения</span>
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Расскажите нам как мы можем вам помочь или ответить на ваши вопросы"
                            id="text"
                            className="resize-none textarea textarea-bordered"
                            {...register('text', { required: true })}
                        />
                    </div>
                </div>

                {isSent ? (
                    <p className="mt-4 text-center">Спасибо! Ваше сообщение отправлено</p>
                ) : (
                    <button
                        type="submit"
                        disabled={loading}
                        className={cn('btn', loading && 'loading')}
                    >
                        Отправить
                    </button>
                )}
            </form>
        </section>
    );
};
