import React from 'react';
import { useForm } from 'react-hook-form';
import HeaderAuth from '../../components/HeaderAuth';

const Recovery = () => {
	const {
		register,
		handleSubmit,
		// setError,
		// eslint-disable-next-line
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		console.log(values);
	};
	return (
		<div className="min-h-screen">
			<HeaderAuth />
			<form className="pb-8 mx-auto w-fit" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col justify-center mb-10 space-y-4">
					<h1 className=" mr-2.5 text-4xl text-center">Відновлення паролю</h1>
					<p className="text-xl text-center">
						Введіть пошту, яку ви вказали при реєстрації,
						<br /> і ми надішлемо вам інструкції щодо скидання пароля.
					</p>
				</div>
				<div className="px-10 py-10 mx-auto space-y-4 border border-black shadow-lg max-md:py-8 max-md:px-6 w-96 shadow-gray-400/80 rounded-xl 2xl:space-y-6">
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
					<button
						type="submit"
						className="w-full shadow-md shadow-gray-400 text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full px-5 py-2.5 text-center">
						Відправити
					</button>
				</div>
			</form>
		</div>
	);
};

export default Recovery;
