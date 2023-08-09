import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import useAuth from '../hooks/useAuth';
import HeaderAuth from './HeaderAuth';
import useAxios from '../hooks/useAxios';
const CONFIRM_EMAIL_URL = '/user/api/confirm_mail/';

const ConfirmEmail = () => {
	const api = useAxios();
	const { user, loadUserProfile } = useAuth();
	const [confirmError, setConfirmError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		// eslint-disable-next-line
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			code: '',
		},
		mode: 'onChange',
	});

	const confirmEmail = async ({ code }) => {
		try {
			const response = await api.post(CONFIRM_EMAIL_URL, {
				code,
			});
			if (response.status === 204) {
				await loadUserProfile();
				return null;
			}
			return response;
		} catch (err) {
			return err;
		}
	};

	const onSubmit = async (values) => {
		console.log(values); //
		const error = await confirmEmail(values);
		if (error) {
			if (!error.response) {
				setConfirmError('Сервер не віподвідає');
			} else {
				setConfirmError('Невірний код підтвердження');
			}
			setError('code', {}, { shouldFocus: true });
			console.error(error);
		} else {
			setSuccess(true);
		}
	};
	if (user?.user_profile?.verifying.is_activate === true || success) {
		console.log('"confirm" redirect to cabinet, because email confirmed');
		return <Navigate to={'/cabinet'} replace />;
	}
	return (
		<div className="min-h-screen">
			<HeaderAuth />
			<form className="px-4 pb-8 mx-auto w-fit" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col justify-center mb-10 space-y-4">
					<h1 className=" mr-2.5 text-4xl text-center">Підтвердження акаунту</h1>
					<p className="text-xl text-center">
						Введіть код підтвердження, який
						<br /> ми надіслали на вашу електронну пошту.
					</p>
				</div>
				<div className="px-10 py-10 mx-auto space-y-4 border border-black shadow-lg max-md:py-8 max-md:px-6 w-96 shadow-gray-400/80 rounded-xl 2xl:space-y-6">
					<div>
						{confirmError && (
							<p className="text-center p-2.5 text-red-500 border text-lg border-red-500 bg-red-300 rounded-lg">
								{confirmError}
							</p>
						)}
						<label htmlFor="code" className="block mb-2 font-medium text-black">
							Код
						</label>
						<input
							type="text"
							name="code"
							id="code"
							aria-invalid={errors.code ? 'true' : 'false'}
							className="bg-gray-50 shadow-md shadow-gray-400 border border-black text-black aria-[invalid=true]:border-red-500 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
							placeholder="000000"
							{...register('code', {
								required: 'Введіть код підтвердення',
								maxLength: 6,
								minLength: 6,
								validate: (value) => validator.isNumeric(value),
							})}
						/>
					</div>
					<button
						type="submit"
						className="w-full shadow-md shadow-gray-400 text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full px-5 py-2.5 text-center">
						{loading ? 'Підтвердження...' : 'Підтвердити'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ConfirmEmail;
