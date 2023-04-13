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
			role: '0',
			first_name: '',
			last_name: '',
			email: '',
			gender: 'M',
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
				<h1 className="text-4xl text-center ">Створити аккаунт</h1>
				<div className="grid items-center grid-cols-2 gap-4 px-6 mt-2 text-xl select-none">
					<div className="p-2.5">
						<input
							type="radio"
							id="accountChoice1"
							value="0"
							{...register('role', { required: 'Вкажіть тип аккаунту' })}
							className="m-2 text-black border-white ring-offset-2 checked:bg-none ring-black ring-1 focus:ring-1 focus:ring-offset-4"
						/>
						<label htmlFor="accountChoice1" className="align-middle">
							Користувач
						</label>
					</div>
					<div className="p-2.5">
						<input
							type="radio"
							id="accountChoice2"
							value="1"
							{...register('role', { required: 'Вкажіть тип аккаунту' })}
							className="m-2 text-black border-white ring-offset-2 checked:bg-none ring-black ring-1 focus:ring-1 focus:ring-offset-4"
						/>
						<label htmlFor="accountChoice2" className="align-middle">
							Тренер
						</label>
					</div>
				</div>
				<div className="p-6 space-y-4 border border-black shadow-lg shadow-gray-400/80 rounded-xl 2xl:space-y-6 sm:p-8">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="">
							<label htmlFor="first_name" className="block mb-2 font-medium text-black">
								Ваше ім'я
							</label>
							<input
								type="text"
								name="first_name"
								id="first_name"
								aria-invalid={errors.first_name ? 'true' : 'false'}
								className="bg-gray-50 border shadow-md shadow-gray-400 aria-[invalid=true]:border-red-500 border-black text-black sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
								placeholder="Ім'я"
								{...register('first_name', { required: "Введіть ім'я" })}
							/>
						</div>
						<div className="">
							<label htmlFor="last_name" className="block mb-2 font-medium text-black">
								Ваше прізвище
							</label>
							<input
								type="text"
								name="last_name"
								id="last_name"
								aria-invalid={errors.last_name ? 'true' : 'false'}
								className="bg-gray-50 border shadow-md shadow-gray-400 border-black text-black aria-[invalid=true]:border-red-500 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
								placeholder="Прізвище"
								{...register('last_name', { required: 'Введіть прізвище' })}
							/>
						</div>
					</div>
					<div>
						<label htmlFor="email" className="block mb-2 font-medium text-black">
							Електронна пошта
						</label>
						<input
							type="email"
							name="email"
							id="email"
							aria-invalid={errors.email ? 'true' : 'false'}
							className="bg-gray-50 border shadow-md shadow-gray-400 border-black text-black aria-[invalid=true]:border-red-500 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
							placeholder="name@company.com"
							{...register('email', { required: 'Введіть електронну пошту' })}
						/>
					</div>
					<div>
						<div>
							<label htmlFor="phone" className="block mb-2 font-medium text-black">
								Номер телефону
							</label>
							<input
								type="tel"
								id="phone"
								aria-invalid={errors.phone ? 'true' : 'false'}
								className="bg-gray-50 border shadow-md shadow-gray-400 border-black text-black aria-[invalid=true]:border-red-500 rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
								placeholder="0123456789"
								pattern="[0-9]{10}"
								{...register('phone', { required: 'Введіть номер телефону' })}
							/>
						</div>
					</div>
					<div>
						<label className="block mb-2 font-medium text-black">Стать</label>
						<ul className="items-center w-full font-medium text-black border border-black rounded-lg shadow-md sm:flex shadow-gray-400">
							<li className="w-full p-2.5 border-b border-black sm:border-b-0 sm:border-r">
								<input
									id="genderMale"
									type="radio"
									value="M"
									{...register('gender', { required: 'Вкажіть стать' })}
									className="m-2 text-black border-white ring-offset-2 checked:bg-none ring-black ring-1 focus:ring-1 focus:ring-offset-4"
								/>
								<label htmlFor="genderMale" className="text-black align-middle">
									Чулувік
								</label>
							</li>
							<li className="w-full p-2.5">
								<input
									id="genderFemale"
									type="radio"
									value="F"
									{...register('gender', { required: 'Вкажіть стать' })}
									className="m-2 text-black border-white ring-offset-2 checked:bg-none ring-black ring-1 focus:ring-1 focus:ring-offset-4"
								/>
								<label htmlFor="genderFemale" className="text-black align-middle">
									Жінка
								</label>
							</li>
						</ul>
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
							className="bg-gray-50 border shadow-md shadow-gray-400 border-black text-black aria-[invalid=true]:border-red-500 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
							{...register('password', { required: 'Введіть пароль' })}
						/>
					</div>
					<button
						type="submit"
						className="w-full text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full px-5 py-2.5 text-center">
						Зареєструвати мене
					</button>
					<div className="space-x-2 text-sm font-light text-gray-500">
						<span>Вже маєте аккаунт?</span>
						<a href="/sign-in" className="font-medium text-black hover:underline">
							Увійти в аккаунт
						</a>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;
