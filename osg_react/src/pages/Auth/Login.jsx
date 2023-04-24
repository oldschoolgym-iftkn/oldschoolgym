import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import HeaderAuth from '../../components/HeaderAuth';
import useAuth from '../../hooks/useAuth';

const Login = () => {
	const location = useLocation();
	// const from = location.state?.from?.pathname || '/cabinet';
	const from = '/cabinet';

	const { user, logInUser } = useAuth();
	const [authError, setAuthError] = useState(null);
	const {
		register,
		handleSubmit,
		setError,
		// eslint-disable-next-line
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		const error = await logInUser(values);
		if (error) {
			if (!error.response) {
				setAuthError('Сервер не віподвідає');
			} else {
				setAuthError('Невірні вхідні дані');
			}
			setError('email', {}, { shouldFocus: true });
			setError('password');
			console.error(error);
		}
	};

	if (user?.user_profile) {
		return <Navigate to={from} replace />;
	}

	return (
		<div className="min-h-screen">
			<HeaderAuth />
			<form className="pb-8 mx-auto w-fit" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex justify-center">
					<h1 className="mb-16 mr-2.5 text-4xl text-center">Вхід</h1>
				</div>
				<div className="px-10 py-12 space-y-4 border border-black shadow-lg max-md:py-8 max-md:px-6 w-96 shadow-gray-400/80 rounded-xl 2xl:space-y-6">
					{authError ? (
						<p className="text-center p-2.5 text-red-500 border text-lg border-red-500 bg-red-300 rounded-lg">
							{authError}
						</p>
					) : (
						<></>
					)}
					<div>
						<label htmlFor="email" className="block mb-2 font-medium text-black">
							Електронна пошта
						</label>
						<input
							type="email"
							name="email"
							id="email"
							aria-invalid={errors.email ? 'true' : 'false'}
							className="bg-gray-50 shadow-md shadow-gray-400 border border-black text-black aria-[invalid=true]:border-red-500 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
							placeholder="name@company.com"
							{...register('email', { required: 'Введіть електронну пошту' })}
						/>
					</div>

					<div>
						<label htmlFor="password" className="block mb-2 font-medium text-black">
							Пароль
						</label>
						<input
							type="password"
							name="password"
							id="password"
							aria-invalid={errors.password ? 'true' : 'false'}
							placeholder="••••••••"
							className="bg-gray-50 shadow-md shadow-gray-400 border border-black text-black aria-[invalid=true]:border-red-500 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
							{...register('password', { required: 'Введіть пароль' })}
						/>
					</div>
					<button
						type="submit"
						className="w-full shadow-md shadow-gray-400 text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full px-5 py-2.5 text-center">
						Увійти
					</button>
					<div className="space-x-2 text-sm font-light text-gray-500">
						<Link to="/register" className="float-left font-medium text-black hover:underline">
							Зареєструватись
						</Link>
						<Link
							to="/password-recovery"
							className="float-right text-gray-700 font-extralight hover:underline">
							Забули пароль?
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
