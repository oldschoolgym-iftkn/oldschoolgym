import React from 'react';
import { useForm } from 'react-hook-form';
import HeaderAuth from '../../components/HeaderAuth';

const Register = () => {
	const {
		register,
		handleSubmit,
		// setError,
		// eslint-disable-next-line
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
		// shouldUseNativeValidation: true,
	});

	const onSubmit = async (values) => {
		console.log(values);
		// const data = await fetchRegister(values);

		// if (!data.payload) {
		// 	return alert('Registration failed');
		// }

		// if ('token' in data.payload) {
		// 	localStorage.setItem('token', data.payload.token);
		// }
	};

	// const handleSubmit = (event) => {
	// 	console.log(event);
	// 	event.preventDefault();
	// };
	// if (isAuth) {
	// 	return <Navigate to={'/'} />;
	// }
	return (
		<div className="min-h-screen">
			<HeaderAuth />
			<form className="pb-8 mx-auto w-fit" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex justify-center">
					<h1 className="mb-16 mr-2.5 text-4xl text-center">Вхід</h1>
				</div>
				<div className="px-10 py-12 space-y-4 border border-black shadow-lg max-md:py-8 max-md:px-6 w-96 shadow-gray-400/80 rounded-xl 2xl:space-y-6">
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
						<a href="/register" className="float-left font-medium text-black hover:underline">
							Зареєструватись
						</a>
						<a
							href="/password-recovery"
							className="float-right text-gray-700 font-extralight hover:underline">
							Забули пароль?
						</a>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;
