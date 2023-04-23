import Modal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const cities = [
	'Вінниця',
	'Дніпро',
	'Донецьк',
	'Житомир',
	'Запоріжжя',
	'Івано-Франківськ',
	'Київ',
	'Кропивницький',
	'Луганськ',
	'Луцьк',
	'Львів',
	'Миколаїв',
	'Одеса',
	'Полтава',
	'Рівне',
	'Севастополь',
	'Сімферополь',
	'Суми',
	'Тернопіль',
	'Ужгород',
	'Харків',
	'Херсон',
	'Хмельницький',
	'Черкаси',
	'Чернівці',
	'Чернігів',
];
const specs = [
	'Фітнес',
	'Персональний',
	'Бокс',
	'Плавання ',
	'Йога ',
	'Стрільба з лука ',
	'Кросфіт ',
	'Атлетика ',
];

const ProfileCoach = () => {
	const [showModal, setShowModal] = useState({ show: false, activeSubType: 0 });
	const { user } = useAuth();

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
			city: cities[0],
			category: '0',
			experience: 0,
			type_training: '0',
			info_block: '',
			additional_block: '',
		},
		mode: 'onSubmit',
		// shouldUseNativeValidation: true,
	});

	const validation = {
		type_training: () => [0, 1, 3].includes(Number(getValues('type_training'))),
		gender: () => ['M', 'F'].includes(getValues('gender')),
	};

	const onSubmit = async (values) => {
		const parseValues = {
			...values,
			category: Number(values.category),
			type_training: Number(values.category),
			experience: Number(values.experience),
		};
		console.log('Profile patch', parseValues);
	};
	const openModal = (type) => {
		setShowModal({ show: true, activeSubType: type });
	};

	const closeModal = () => {
		setShowModal({ show: false, activeSubType: 0 });
	};
	return (
		<div className="w-full space-y-6">
			<form
				className="w-full p-16 space-y-12 border border-black rounded-3xl"
				onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-2 grid-rows-3 gap-16">
					<div className="flex flex-col justify-center px-10 py-6 space-y-4 text-left border-2 border-black rounded-2xl">
						<img
							src={process.env.REACT_APP_API_URL + user.user_profile.avatar}
							alt="Avatar"
							className="w-40 h-40 mx-auto rounded-full select-none bg-black/20"
						/>
						<p className="text-3xl font-medium text-center">
							{user.user_profile.first_name + ' ' + user.user_profile.last_name}
						</p>
					</div>
					<div className="row-span-2 px-10 py-8 space-y-6 border-2 border-black rounded-2xl">
						{/* <div className="border-t-2 border-black"></div> */}
						<div className="w-full ">
							<span className="block px-4 -mb-5 text-lg text-gray-500 bg-white select-none w-fit font-extralight">
								Ім'я
							</span>
							<input
								type="text"
								defaultValue={user.user_profile.first_name}
								{...register('first_name', { required: "Вкажіть своє ім'я" })}
								className="w-full px-4 py-2 text-2xl bg-transparent border-0 border-b-2 border-black/40 focus:border- focus:border-black focus:ring-transparent"
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
								className="w-full px-4 py-2 text-2xl bg-transparent border-0 border-b-2 border-black/40 focus:border- focus:border-black focus:ring-transparent"
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
							<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
								Місто
							</span>
							{/* <select
								id=""
								className="block w-full px-4 py-2 text-xl border border-black rounded-lg focus:ring-gray-500 focus:border-gray-500 ">
								{cities.map((obj, index) => (
									<option key={index} value={String(index)} className="text-lg">
										{obj}
									</option>
								))}
							</select> */}
							<Controller
								control={control}
								name="city"
								render={() => (
									<select className="block w-full px-4 py-2 text-xl border rounded focus:ring-gray-500 focus:border-gray-500">
										{cities.map((obj, index) => (
											<option key={index} value={obj} className="text-lg">
												{obj}
											</option>
										))}
									</select>
								)}
							/>
						</div>

						<div>
							<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
								Спеціалізація
							</span>
							{/* <select
								id=""
								className="block w-full px-4 py-2 text-xl border border-black rounded-lg focus:ring-gray-500 focus:border-gray-500 ">
								{specs.map((obj, index) => (
									<option key={index} value={String(index)} className="text-lg">
										{obj}
									</option>
								))}
							</select> */}
							<Controller
								control={control}
								name="category"
								render={() => (
									<select className="block w-full px-4 py-2 text-xl border rounded focus:ring-gray-500 focus:border-gray-500">
										{specs.map((obj, index) => (
											<option key={index} value={String(index)} className="text-lg">
												{obj}
											</option>
										))}
									</select>
								)}
							/>
						</div>
						<div className="text-xl">
							<label className="inline-block px-4 text-lg text-gray-500 select-none font-extralight">
								Досвід:
							</label>
							<input
								type="number"
								defaultValue={0}
								min={0}
								max={30}
								{...register('experience', { required: 'Вкажіть свій досвід' })}
								className="px-2 py-1 text-xl border-black rounded focus:border-black focus:ring-black"
							/>
						</div>
						<div className="">
							<div className="block px-4 text-lg text-gray-500 select-none font-extralight">
								Тип занять
							</div>
							{/* <div className="pl-2 text-xl">
								<div className="space-x-2">
									<input
										type="checkbox"
										// name="lessonsType"
										id="lesson1"
										{...register('type_training', {
											required: 'Вкажіть опис свого профілю',
											validate: validation.atLeastOne,
										})}
										className="rounded checked:bg-black focus:ring-gray-500"
									/>
									<label htmlFor="lesson1">онлайн</label>
								</div>
								<div className="space-x-2">
									<input
										type="checkbox"
										// name="lessonsType"
										id="lesson2"
										{...register('type_training', {
											required: 'Вкажіть опис свого профілю',
											validate: validation.atLeastOne,
										})}
										className="rounded checked:bg-black focus:ring-gray-500"
									/>
									<label htmlFor="lesson2">офлайн</label>
								</div>
							</div> */}
							<ul className="items-center w-full text-lg text-black border border-black rounded-lg 2xl:flex">
								<li className="w-full p-2.5 border-b border-black 2xl:border-b-0 2xl:border-r">
									<input
										id="typeOnline"
										type="radio"
										value="0"
										{...register('type_training', {
											required: 'Вкажіть тип занять',
											validate: validation.type_training,
										})}
										className="m-2 text-black border-white ring-offset-2 checked:bg-none ring-black ring-1 focus:ring-1 focus:ring-offset-4"
									/>
									<label htmlFor="typeOnline" className="text-black align-middle">
										Онлайн
									</label>
								</li>
								<li className="w-full p-2.5 border-b border-black 2xl:border-b-0 2xl:border-r">
									<input
										id="typeOffline"
										type="radio"
										value="1"
										{...register('type_training', {
											required: 'Вкажіть тип занять',
											validate: validation.type_training,
										})}
										className="m-2 text-black border-white ring-offset-2 checked:bg-none ring-black ring-1 focus:ring-1 focus:ring-offset-4"
									/>
									<label htmlFor="typeOffline" className="text-black align-middle">
										Офлайн
									</label>
								</li>
								<li className="w-full p-2.5">
									<input
										id="typeMixed"
										type="radio"
										value="3"
										{...register('type_training', {
											required: 'Вкажіть тип занять',
											validate: validation.type_training,
										})}
										className="m-2 text-black border-white ring-offset-2 checked:bg-none ring-black ring-1 focus:ring-1 focus:ring-offset-4"
									/>
									<label htmlFor="typeMixed" className="text-black align-middle">
										Змішаний
									</label>
								</li>
							</ul>
						</div>
					</div>
					<div className="px-10 py-6 space-y-4 text-left border-2 border-black rounded-2xl">
						<div className="w-full px-4 pt-4 pb-2 border-b border-black">
							<span className="block text-lg text-gray-500 select-none font-extralight">Пошта</span>
							<p className="text-2xl font-medium">{user.user_profile.email}</p>
						</div>
						<div className="w-full px-4 pt-4 pb-2 border-b border-black">
							<span className="block text-lg text-gray-500 select-none font-extralight">
								Телефон
							</span>
							<p className="text-2xl font-medium">{user.user_profile.phone}</p>
						</div>
					</div>

					<div
						// contentEditable
						// role="textbox"
						className="col-span-2 px-10 py-6 space-y-2 text-2xl text-left border-2 border-black rounded-2xl">
						<label
							htmlFor="description"
							className="block text-lg text-gray-500 select-none font-extralight">
							Опис профілю
						</label>
						{/* <textarea id="description"></textarea> */}

						<textarea
							rows={6}
							maxLength={250}
							{...register('info_block', { required: 'Вкажіть опис свого профілю' })}
							className="w-full text-2xl rounded resize-none border-black/30 focus:border-black/60 focus:ring-black/60"></textarea>
					</div>
				</div>
				<div className="flex justify-end space-x-10">
					<button className="inline-block select-none text-center min-w-[20rem] hover:bg-neutral-400/50 px-8 py-3 rounded-full text-xl leading-none font-normal bg-white text-black border border-black">
						Відмінити
					</button>
					<button
						type="submit"
						className="inline-block select-none text-center min-w-[20rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-xl leading-none font-normal bg-black text-white">
						Зберегти зміни
					</button>
				</div>
			</form>
			<div className="w-full p-16 space-y-12 border border-black rounded-3xl">
				<div className="px-24 space-y-8 text-center">
					<h2 className="text-3xl">Абонементи на вибір</h2>
					<div className="grid grid-cols-2 gap-24">
						<Plan {...exampleSubsription} onClick={() => openModal(0)} />
						<Plan {...exampleSubsription} onClick={() => openModal(1)} />
						{/* <Plan {...exampleSubsription} onClick={() => openModal(2)} /> */}
					</div>
				</div>
				<button
					onClick={() => alert('boo')}
					className="block mx-auto select-none text-center min-w-[20rem] hover:bg-neutral-700 px-8 py-4 rounded-2xl text-xl leading-none font-normal bg-black text-white">
					Додати новий тариф
				</button>
				<OrderModal modalIsOpen={showModal} closeModal={closeModal} />
			</div>
		</div>
	);
};
const exampleSubsription = {
	name: 'Одне заняття',
	cost: 250,
	lessonCount: 1,
	imageUrl: '/img/plan_img.png',
	description: 'Спробуй себе на один раз з моїми вміннями та порадами',
};
const subs = ['Одне заняття', 'Пакет занять', 'Місячний абонемент']; //

const Plan = ({ name, cost, lessonCount, imageUrl, description, onClick }) => {
	return (
		<div className="inline-block p-8 space-y-16 text-center bg-black rounded-3xl">
			<div className="p-5 space-y-4 text-2xl bg-white rounded-3xl">
				<p className="text-3xl font-bold">{name}</p>
				<p>Ціна: {cost}₴</p>
				<p>Кількість занять: {lessonCount}</p>
			</div>
			<img src={imageUrl} alt="subImg" className="max-w-full mx-auto" />
			<p className="text-xl text-white">{description}</p>
			<button className="p-2 text-xl bg-white rounded-full min-w-[16rem]" onClick={onClick}>
				Редагувати
			</button>
		</div>
	);
};

const OrderModal = ({ modalIsOpen, afterOpenModal, closeModal }) => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		// setError,
		// eslint-disable-next-line
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			topic: '',
			// subType: String(modalIsOpen.activeSubType),
			desc: '',
		},
		mode: 'onSubmit',
		// shouldUseNativeValidation: true,
	});
	const closeOrderModal = () => {
		closeModal();
		reset();
	};

	const onSubmit = async (values) => {
		console.log(values);
		closeOrderModal();
	};

	return (
		<Modal
			closeTimeoutMS={250}
			isOpen={modalIsOpen.show}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeOrderModal}
			className={'mt-[84px] mx-auto w-fit '} //absolute inset-0
			contentLabel="Fill order">
			<div className="p-6 bg-white border border-black w-fit rounded-3xl  &[ReactModal__Overlay--after-open:translate-y-0]">
				<div className="text-right">
					<button onClick={closeModal}>
						<XMarkIcon className="w-10 h-10 text-black" />
					</button>
				</div>
				<form className="px-24 mb-12 space-y-12" onSubmit={handleSubmit(onSubmit)}>
					<h2 className="px-6 text-4xl text-center">Заповніть заявку</h2>
					<div className="w-full ">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Тема
						</span>
						<input
							type="text"
							{...register('topic', { required: 'Вкажіть тему' })}
							className="w-full px-4 py-2 text-2xl border-0 border-b border-black focus:rounded focus:border-black focus:ring-black"
						/>
					</div>
					<div>
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Виберіть абонемент
						</span>
						<Controller
							control={control}
							name="subType"
							render={() => (
								<select
									className="block w-full px-4 py-2 text-xl border rounded focus:ring-black focus:border-black "
									defaultValue={String(modalIsOpen.activeSubType)}>
									{subs.map((obj, index) => (
										<option key={index} value={String(index)} className="text-lg">
											{obj}
										</option>
									))}
								</select>
							)}
						/>
					</div>
					<div className="w-full">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Опис
						</span>
						<textarea
							{...register('desc', { required: 'Вкажіть текст заявки' })}
							className="w-full rounded resize-none min-h-[8rem] h-full text-xl focus:border-black focus:ring-black"></textarea>
					</div>
					<button
						type="submit"
						className="inline-block select-none text-center w-full min-w-[16rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-xl leading-none font-normal bg-black text-white">
						Відправити
					</button>
				</form>
			</div>
		</Modal>
	);
};

export default ProfileCoach;
