import Modal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import Plan from '../FullCoach/Plan';

Modal.setAppElement('#root');

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
	const [showModal, setShowModal] = useState({ show: false });
	const [showEditModal, setShowEditModal] = useState({ show: false });
	const [rates, setRates] = useState([]);
	const { user } = useAuth();
	const api = useAxios();
	const sendCoachApplication = async (data) => {
		try {
			const response = await api.post('/coach/api/send_coach_application', data, {
				params: { user_id: user.user_id },
			});
			if (response.status === 200) {
				console.log('sendCoachApplication');
				return null;
			}
			// setInitLoading(false);
			return response;
		} catch (err) {
			return err;
		}
	};

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
			additional_block: 'add_block',
			rates: JSON.stringify(rates),
		};
		console.log('sendCoach', parseValues);
		sendCoachApplication(parseValues);
	};
	const openCreateRateModal = () => {
		setShowModal({ show: true });
	};

	const closeCreateRateModal = () => {
		setShowModal({ show: false });
	};
	const openEditRateModal = (index) => {
		setShowEditModal({ show: true, rate: rates[index], index });
	};

	const closeEditRateModal = () => {
		setShowEditModal({ show: false });
	};
	return (
		<>
			<form
				className="w-full px-12 py-6 space-y-4 border border-black max-lg:px-8 max-lg:py-4 rounded-3xl"
				onSubmit={handleSubmit(onSubmit)}>
				<h2 className="text-2xl lg:text-4xl">Профіль тренера</h2>
				<div className="space-y-4 text-center xl:space-y-8 xl:px-24">
					<h3 className="text-xl lg:text-3xl">Інформація про вас</h3>
					<div className="p-4 text-2xl text-left border-2 border-black sm:px-10 sm:py-6 rounded-2xl">
						<div className="max-w-3xl mx-auto space-y-2">
							<div>
								<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
									Місто
								</span>
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
					</div>
					<div className="p-4 space-y-2 text-2xl text-left border-2 border-black sm:px-10 sm:py-6 rounded-2xl">
						<label
							htmlFor="description"
							className="block text-lg text-gray-500 select-none font-extralight">
							Опис профілю
						</label>
						<textarea
							placeholder="Розкажіть про себе..."
							rows={6}
							maxLength={250}
							aria-invalid={errors.info_block ? 'true' : 'false'}
							{...register('info_block', { required: 'Вкажіть опис свого профілю' })}
							className="w-full text-2xl rounded aria-[invalid=true]:border-red-500 aria-[invalid=true]:border-2 resize-none placeholder:text-xl  border-black/30 focus:border-black/60 focus:ring-black/60"></textarea>
					</div>
				</div>
				<div className="space-y-4 text-center xl:px-12 xl:space-y-8">
					<h3 className="text-xl lg:text-3xl">Абонементи на вибір</h3>
					<div className="flex flex-wrap justify-center gap-4 md:gap-8">
						{rates.map((rate, index) => (
							<Plan
								{...rate}
								key={index}
								onClick={() => openEditRateModal(index)}
								buttonLabel={'Змінити'}
							/>
						))}
					</div>
				</div>
				<button
					type="button"
					onClick={() => openCreateRateModal()}
					className="block mx-auto select-none text-center min-w-[10rem] hover:bg-neutral-700 px-6 py-4 rounded-2xl text-xl leading-none font-normal bg-black text-white">
					Додати новий тариф
				</button>
				<div className="flex justify-end space-x-10">
					<button
						type="submit"
						className="inline-block select-none text-center min-w-[10rem] hover:bg-neutral-700 px-6 py-3 rounded-full text-xl leading-none font-normal bg-black text-white">
						Запросити верифікацію
					</button>
				</div>
			</form>
			<CreateRateModal
				modalIsOpen={showModal}
				closeModal={closeCreateRateModal}
				createRate={(rate) => setRates((prev) => [...prev, rate])}
			/>
			<EditRateModal
				modalIsOpen={showEditModal}
				closeModal={closeEditRateModal}
				editRate={(rate, index) =>
					setRates((prev) => {
						prev[index] = rate;
						return prev;
					})
				}
				deleteRate={(index) => {
					setRates((prev) => prev.filter((rate, i) => i !== index));
				}}
			/>
		</>
	);
};
const exampleSubsription = {
	name: 'Одне заняття',
	cost: 250,
	lesson_count: 1,
	imageUrl: '/img/plan_img.png',
	description: 'Спробуй себе на один раз з моїми вміннями та порадами',
};
const subs = ['Одне заняття', 'Пакет занять', 'Місячний абонемент']; //

const Plan1 = ({ rate_name, cost, lessons_count, imageUrl, description, onClick }) => {
	return (
		<div className="inline-block p-8 space-y-16 text-center bg-black rounded-3xl">
			<div className="p-5 space-y-4 text-2xl bg-white rounded-3xl">
				<p className="text-3xl font-bold">{rate_name}</p>
				<p>Ціна: {cost}₴</p>
				<p>Кількість занять: {lessons_count}</p>
			</div>
			<img src="/img/plan_img.png" alt="subImg" className="max-w-full mx-auto" />
			<p className="text-xl text-white">{description}</p>
			<button
				type="button"
				className="p-2 text-xl bg-white rounded-full min-w-[16rem]"
				onClick={onClick}>
				Редагувати
			</button>
		</div>
	);
};

const CreateRateModal = ({ modalIsOpen, afterOpenModal, closeModal, createRate }) => {
	const {
		register,
		handleSubmit,
		reset,
		// setError,
		// eslint-disable-next-line
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
		// shouldUseNativeValidation: true,
	});
	const closeCreateRateModal = () => {
		closeModal();
		reset();
	};

	const onSubmit = async (values) => {
		console.log(values);
		createRate({ ...values, imageUrl: '/img/plan_img.png' });
		closeCreateRateModal();
	};

	return (
		<Modal
			closeTimeoutMS={250}
			isOpen={modalIsOpen.show}
			onAfterOpen={() => (document.body.style.overflow = 'hidden')}
			onAfterClose={() => (document.body.style.overflow = 'unset')}
			onRequestClose={closeCreateRateModal}
			className={'mx-auto my-auto w-fit '} //absolute inset-0
			contentLabel="Fill create rate">
			<div className="p-6 bg-white border border-black w-fit rounded-3xl  &[ReactModal__Overlay--after-open:translate-y-0]">
				<div className="text-right">
					<button onClick={closeCreateRateModal}>
						<XMarkIcon className="w-10 h-10 text-black" />
					</button>
				</div>
				<form className="mb-12 space-y-4 sm:space-y-8 sm:px-24" onSubmit={handleSubmit(onSubmit)}>
					<h2 className="px-6 text-4xl text-center">Введіть дані про тариф</h2>
					<div className="w-full ">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Назва тарифу
						</span>
						<input
							type="text"
							aria-invalid={errors.rate_name ? 'true' : 'false'}
							{...register('name', { required: 'Вкажіть назву' })}
							className="w-full px-4 aria-[invalid=true]:border-red-500 py-2 text-2xl border-0 border-b border-black focus:rounded focus:border-black focus:ring-black"
						/>
					</div>
					<div className="w-full ">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Ціна
						</span>
						<input
							type="number"
							aria-invalid={errors.cost ? 'true' : 'false'}
							min={0}
							defaultValue={0}
							{...register('cost', { required: 'Вкажіть ціну' })}
							className="w-full px-4 aria-[invalid=true]:border-red-500 py-2 text-2xl border-0 border-b border-black focus:rounded focus:border-black focus:ring-black"
						/>
					</div>

					<div className="w-full ">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Кількість занять
						</span>
						<input
							type="number"
							aria-invalid={errors.lessons_count ? 'true' : 'false'}
							min={1}
							defaultValue={1}
							{...register('lessons_count', { required: 'Вкажіть кількість занять' })}
							className="w-full px-4 aria-[invalid=true]:border-red-500 py-2 text-2xl border-0 border-b border-black focus:rounded focus:border-black focus:ring-black"
						/>
					</div>

					<div className="w-full">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Опис
						</span>
						<textarea
							aria-invalid={errors.desc ? 'true' : 'false'}
							{...register('description', { required: 'Вкажіть текст заявки' })}
							className="w-full aria-[invalid=true]:border-red-500 rounded resize-none min-h-[8rem] h-full text-xl focus:border-black focus:ring-black"></textarea>
					</div>
					<button
						type="submit"
						className="inline-block select-none text-center w-full min-w-[16rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-xl leading-none font-normal bg-black text-white">
						Додати
					</button>
				</form>
			</div>
		</Modal>
	);
};
const EditRateModal = ({ modalIsOpen, afterOpenModal, closeModal, editRate, deleteRate }) => {
	const {
		register,
		handleSubmit,
		reset,
		// setError,
		// eslint-disable-next-line
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			rate_name: modalIsOpen.rate?.rate_name,
			cost: modalIsOpen.rate?.cost,
			lessons_count: modalIsOpen.rate?.lessons_count,
			description: modalIsOpen.rate?.desc,
		},
		mode: 'onChange',
		// shouldUseNativeValidation: true,
	});
	useEffect(() => {
		reset();
	}, [modalIsOpen, reset]);

	const closeEditRateModal = () => {
		closeModal();
		reset();
	};

	const onSubmit = async (values) => {
		console.log(values);
		editRate(values, modalIsOpen.index);
		closeEditRateModal();
	};

	const handleDelete = () => {
		deleteRate(modalIsOpen.index);
		closeEditRateModal();
	};

	return (
		<Modal
			closeTimeoutMS={250}
			isOpen={modalIsOpen.show}
			onAfterOpen={() => (document.body.style.overflow = 'hidden')}
			onAfterClose={() => (document.body.style.overflow = 'unset')}
			onRequestClose={closeEditRateModal}
			className={'mx-auto my-auto w-fit '} //absolute inset-0
			contentLabel="Fill edit rate">
			<div className="p-6 bg-white border border-black w-fit rounded-3xl  &[ReactModal__Overlay--after-open:translate-y-0]">
				<div className="text-right">
					<button onClick={closeEditRateModal}>
						<XMarkIcon className="w-10 h-10 text-black" />
					</button>
				</div>
				<form className="mb-12 space-y-4 sm:space-y-8 sm:px-24" onSubmit={handleSubmit(onSubmit)}>
					<h2 className="px-6 text-4xl text-center">Змініть дані про тариф</h2>
					<div className="w-full ">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Назва тарифу
						</span>
						<input
							type="text"
							defaultValue={modalIsOpen.rate?.rate_name}
							aria-invalid={errors.rate_name ? 'true' : 'false'}
							{...register('rate_name', { required: 'Вкажіть назву' })}
							className="w-full px-4 aria-[invalid=true]:border-red-500 py-2 text-2xl border-0 border-b border-black focus:rounded focus:border-black focus:ring-black"
						/>
					</div>
					<div className="w-full ">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Ціна
						</span>
						<input
							type="number"
							aria-invalid={errors.cost ? 'true' : 'false'}
							min={0}
							defaultValue={modalIsOpen.rate?.cost}
							{...register('cost', { required: 'Вкажіть ціну' })}
							className="w-full px-4 aria-[invalid=true]:border-red-500 py-2 text-2xl border-0 border-b border-black focus:rounded focus:border-black focus:ring-black"
						/>
					</div>

					<div className="w-full ">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Кількість занять
						</span>
						<input
							type="number"
							aria-invalid={errors.lessons_count ? 'true' : 'false'}
							min={1}
							defaultValue={modalIsOpen.rate?.lessons_count}
							{...register('lessons_count', { required: 'Вкажіть кількість занять' })}
							className="w-full px-4 aria-[invalid=true]:border-red-500 py-2 text-2xl border-0 border-b border-black focus:rounded focus:border-black focus:ring-black"
						/>
					</div>

					<div className="w-full">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Опис
						</span>
						<textarea
							defaultValue={modalIsOpen.rate?.description}
							aria-invalid={errors.desc ? 'true' : 'false'}
							{...register('description', { required: 'Вкажіть текст заявки' })}
							className="w-full aria-[invalid=true]:border-red-500 rounded resize-none min-h-[8rem] h-full text-xl focus:border-black focus:ring-black"></textarea>
					</div>
					<div className="flex justify-between space-x-4">
						<button
							onClick={handleDelete}
							type="button"
							className="inline-block select-none text-center w-full min-w-[8rem] hover:bg-neutral-300 px-8 py-3 rounded-full text-xl leading-none font-normal bg-red-100 text-red-700 border border-black">
							Видалити
						</button>
						<button
							type="submit"
							className="inline-block select-none text-center w-full min-w-[8rem] hover:bg-neutral-600 px-8 py-3 rounded-full text-xl leading-none font-normal bg-black text-white border border-black">
							Зберегти
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default ProfileCoach;
