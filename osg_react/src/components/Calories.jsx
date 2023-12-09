import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import useAxios from '../hooks/useAxios';

const CaloriesComponent = () => {
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();
    const api = useAxios();
    const [confirmError, setConfirmError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [yPred, setYPred] = useState(null);


    const onSubmit = async (values) => {
        console.log(values);
        try {
            setLoading(true);
            const response = await api.get(`/user/api/predict_calories/?${new URLSearchParams(values).toString()}`);

            if (response.status === 200) {
                setYPred(response.data.y_pred)
                setSuccess(true);
            } else {
                setConfirmError('Перевірте правильність введених даних!');
            }
        } catch (error) {
            setConfirmError('Помилка відправки на сервер');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div align="center">
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 max-w-sm p-5' id='my-form'>
                <div>
                    <label htmlFor="is_male">Ваша стать:</label>
                    <br />
                    <input type="radio" id="male" {...register('is_male')} value="1" />
                    <label htmlFor="male" className='pr-2'>Чоловік</label>

                    <input type="radio" id="female" {...register('is_male')} value="0" />
                    <label htmlFor="female">Жінка</label>
                </div>
                {/* <br /> */}

                <label htmlFor="age">Вік:</label>
                <input type="number" id="age" {...register('age')} required />

                {/* <br /> */}

                <label htmlFor="height">Зріст(см):</label>
                <input type="number" id="height" {...register('height')} required />

                <label htmlFor="weight">Вага(кг):</label>
                <input type="number" id="weight" {...register('weight')} required />

                <label htmlFor="duration">Тривалість тренування:</label>
                <input type="number" id="duration" {...register('duration')} required />

                <label htmlFor="heart_rate">Середній пульс:</label>
                <input type="number" id="heart_rate" {...register('heart_rate')} required />

                <label htmlFor="body_temp">Температура тіла:</label>
                <input type="number" id="body_temp" {...register('body_temp')} required />

                {!yPred ? <button type="submit">Надіслати</button> : <span>Витрата складає {yPred.toFixed(2)} кКал</span>}
                <button onClick={() => { reset(Object); setYPred(null); }} type="button">Очистити</button>
            </form >
        </div >
    );
};

export default CaloriesComponent;
