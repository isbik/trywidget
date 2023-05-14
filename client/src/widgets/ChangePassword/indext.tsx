import { useForm } from 'react-hook-form';

type Props = {};

export const ChangePassword = (props: Props) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            new_password: '',
            old_password: '',
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
    });

    return (
        <div className="mb-8 bg-white border rounded-md border-base-300 sm:w-96">
            <form onSubmit={onSubmit} className="card-body">
                <h2 className="card-title">Пароль</h2>
                <div className="w-full max-w-xs form-control">
                    <span className="">Текущий пароль</span>
                    <input
                        {...register('old_password', { required: true, minLength: 8 })}
                        type="password"
                        placeholder="Пароль"
                        className="w-full max-w-xs input input-bordered"
                    />
                </div>
                <div className="w-full max-w-xs mb-4 form-control">
                    <span>Новый пароль</span>
                    <input
                        {...register('new_password', { required: true, minLength: 8 })}
                        type="password"
                        placeholder="Пароль"
                        className="w-full max-w-xs input input-bordered"
                    />
                </div>

                <button type="submit" className="btn">
                    Обновить
                </button>
            </form>
        </div>
    );
};
