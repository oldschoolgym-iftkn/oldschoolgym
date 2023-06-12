import { useForm, Controller } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useRef, useState } from 'react';
import { dataUrlToFile } from '../FullCoach/utils';
import useAxios from '../../hooks/useAxios';

const file2Base64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString() || '');
		reader.onerror = (error) => reject(error);
	});
};

const UserInfo = ({ className }) => {
	const { user, updateUserProfile } = useAuth();
	const [updating, setUpdating] = useState(false);
	const api = useAxios();
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		control,
		// setError,
		// eslint-disable-next-line
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			first_name: user.user_profile.first_name,
			last_name: user.user_profile.last_name,
			gender: user.user_profile.gender,
			height: user.user_profile.height,
			weight: user.user_profile.weight,
			// city: cities[0],
			// category: '0',
			// experience: 0,
			// type_training: '0',
			// info_block: '',
			// additional_block: '',
		},
		mode: 'onSubmit',
		// shouldUseNativeValidation: true,
	});

	const validation = {
		type_training: () => [0, 1, 3].includes(Number(getValues('type_training'))),
		gender: () => ['M', 'F'].includes(getValues('gender')),
	};

	const onSubmit = async (values) => {
		setUpdating(true);
		const parseValues = {
			...values,
			// category: Number(values.category),
			// type_training: Number(values.category),
			// experience: Number(values.experience),
			height: Number(values.height),
			weight: Number(values.weight),
		};
		const formData = new FormData();
		uploaded &&
			formData.append(
				'avatar',
				await dataUrlToFile(uploaded, `avatar-${Math.random(10000000)}.png`, 'image/png'),
			);

		uploaded && (await api.put('/user/api/upload_avatar/', formData));
		console.log('Profile patch', parseValues);
		await updateUserProfile(parseValues);
		setUpdating(false);
		window.location.reload();
	};

	const fileRef = useRef();
	const [uploaded, setUploaded] = useState(null);

	const onFileInputChange = (e) => {
		const file = e.target?.files?.[0];
		if (file) {
			file2Base64(file).then((base64) => {
				setUploaded(base64);
			});
		}
	};

	return (
		<form
			className={
				'w-full px-12 py-6 max-lg:px-4 max-lg:py-4 space-y-4 border border-black rounded-3xl' +
				' ' +
				className
			}
			onSubmit={handleSubmit(onSubmit)}>
			<h2 className="text-2xl lg:text-4xl">Дані користувача</h2>
			<div className="grid grid-cols-2 grid-rows-2 gap-8 max-lg:gap-6 max-lg:grid-cols-1 max-lg:grid-rows-4">
				<div className="flex flex-col justify-center p-6 space-y-2 text-left border-2 border-black max-lg:p-4 max-lg:order-2 rounded-2xl">
					<div className="flex flex-col">
						<input
							type="file"
							style={{ display: 'none' }}
							className="hidden"
							ref={fileRef}
							onChange={onFileInputChange}
							accept="image/png,image/jpeg,image/gif"
						/>
						<img
							src={uploaded ? uploaded : process.env.REACT_APP_API_URL + user.user_profile.avatar}
							alt="Avatar"
							className="object-scale-down mx-auto rounded-full select-none aspect-square w-36 bg-black/20"
						/>
						<button
							type="button"
							onClick={() => fileRef.current?.click()}
							className="mx-auto text-lg hover:underline">
							Змінити фото
						</button>
					</div>
					<p className="text-2xl font-medium text-center">
						{user.user_profile.first_name + ' ' + user.user_profile.last_name}
					</p>
				</div>
				<div className="row-span-2 p-6 space-y-6 border-2 border-black max-lg:p-4 max-lg:order-3 rounded-2xl">
					<div className="w-full ">
						<span className="block px-4 -mb-5 text-lg text-gray-500 bg-white select-none w-fit font-extralight">
							Ім'я
						</span>
						<input
							type="text"
							defaultValue={user.user_profile.first_name}
							{...register('first_name', { required: "Вкажіть своє ім'я" })}
							className="w-full px-4 py-2 text-xl bg-transparent border-0 border-b-2 border-black/40 focus:border- focus:border-black focus:ring-transparent"
						/>
					</div>
					<div className="w-full ">
						<span className="block px-4 -mb-5 text-lg text-gray-500 select-none font-extralight">
							Прізвище
						</span>
						<input
							type="text"
							defaultValue={user.user_profile.last_name}
							{...register('last_name', { required: 'Вкажіть своє прізвище' })}
							className="w-full px-4 py-2 text-xl bg-transparent border-0 border-b-2 border-black/40 focus:border- focus:border-black focus:ring-transparent"
						/>
					</div>
					<div>
						<label className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Стать
						</label>
						<ul className="items-center w-full text-lg text-black border border-black rounded-lg xl:flex">
							<li className="w-full p-2.5 border-b border-black xl:border-b-0 xl:border-r">
								<input
									id="genderMale"
									type="radio"
									value="M"
									{...register('gender', { required: 'Вкажіть стать' })}
									className="m-2 text-black border-white ring-offset-2 checked:bg-none ring-black ring-1 focus:ring-1 focus:ring-offset-4"
								/>
								<label htmlFor="genderMale" className="text-black align-middle">
									Чоловіча
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
									Жіноча
								</label>
							</li>
						</ul>
					</div>
					<div className="text-xl">
						<label className="inline-block px-4 text-lg text-gray-500 select-none font-extralight">
							Ріст:
						</label>
						<input
							type="number"
							min={0}
							max={300}
							{...register('height', { required: 'Вкажіть свій ріст' })}
							className="px-2 py-1 text-xl border-black rounded focus:border-black focus:ring-black"
						/>{' '}
						см
					</div>
					<div className="text-xl">
						<label className="inline-block px-4 text-lg text-gray-500 select-none font-extralight">
							Вага:
						</label>
						<input
							type="number"
							min={0}
							max={300}
							{...register('weight', { required: 'Вкажіть свою вагу' })}
							className="px-2 py-1 text-xl border-black rounded focus:border-black focus:ring-black"
						/>{' '}
						кг
					</div>
				</div>
				<div className="p-6 space-y-2 text-left border-2 border-black max-lg:p-4 max-lg:order-2 rounded-2xl">
					<div className="w-full px-4 pt-4 pb-2 overflow-y-auto border-b border-black">
						<span className="block text-lg text-gray-500 select-none font-extralight">Пошта</span>
						<p className="text-xl font-medium w-fit">{user.user_profile.email}</p>
					</div>
					<div className="w-full px-4 pt-4 pb-2 border-b border-black">
						<span className="block text-lg text-gray-500 select-none font-extralight">Телефон</span>
						<p className="text-xl font-medium">{user.user_profile.phone}</p>
					</div>
				</div>
			</div>
			<div className="flex justify-end space-x-10">
				<button
					type="submit"
					className="inline-block select-none text-center min-w-[10rem] hover:bg-neutral-700 px-6 py-3 rounded-full text-xl leading-none font-normal bg-black text-white">
					{updating ? 'Збереження...' : 'Зберегти зміни'}
				</button>
			</div>
		</form>
	);
};

export default UserInfo;
