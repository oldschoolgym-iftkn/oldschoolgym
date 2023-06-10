import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';

import Header from '../components/Header';
import axios from '../api/axios';
import Loading from '../components/Loading';
import MissingPage from '../components/MissingPage';
import Plan from '../components/FullCoach/Plan';
import useAuth from '../hooks/useAuth';

Modal.setAppElement('#root');

const exampleCoach = {
	id: 1,
	user_profile: {
		avatar: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
		first_name: 'Андрій',
		last_name: 'Кіко',
	},
	category: 'Кросфіт',
	type_training: 'онлайн/офлайн',
	experience: '10 років',
	info_block:
		'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius impedit voluptate porro quas animi non.',
};
const subs = ['Одне заняття', 'Пакет занять', 'Місячний абонемент']; //

const exampleSubsription = {
	name: 'Одне заняття',
	cost: 250,
	lessonCount: 1,
	imageUrl: '/img/plan_img.png',
	description: 'Спробуй себе на один раз з моїми вміннями та порадами',
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
			onAfterOpen={() => (document.body.style.overflow = 'hidden')}
			onAfterClose={() => (document.body.style.overflow = 'unset')}
			onRequestClose={closeOrderModal}
			className={'mt-[84px] mx-auto w-fit '} //absolute inset-0
			contentLabel="Fill order">
			<div className="p-6 bg-white border border-black w-fit rounded-3xl  &[ReactModal__Overlay--after-open:translate-y-0]">
				<div className="text-right">
					<button onClick={closeOrderModal}>
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

const FullCoach = () => {
	const [showModal, setShowModal] = useState({ show: false, activeSubType: 0 });
	const [coach, setCoach] = useState({});
	const [isLoading, setLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);
	const { user } = useAuth();
	const { id } = useParams();

	const getCoach = () => {
		axios
			.get('/user/api/get_user_by_id/', { params: { user_id: id } })
			.then((res) => {
				// setCoach(res.data);
				setCoach({ ...exampleCoach, user_profile: res.data });
				setLoading(false);
			})
			.catch(() => {
				setNotFound(true);
			})
			.finally(() => {});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		getCoach();
	}, []);

	const openModal = (type) => {
		setShowModal({ show: true, activeSubType: type });
	};

	const closeModal = () => {
		setShowModal({ show: false, activeSubType: 0 });
	};
	if (notFound) {
		return <MissingPage header />;
	}
	console.log(user.user_id, Number(id));
	return (
		<div className="flex flex-col min-h-screen App">
			<Header main />
			<div className="flex-grow min-h-full">
				{isLoading ? (
					<Loading />
				) : (
					<div className="p-6 m-6 space-y-12 border border-black lg:p-12 rounded-3xl">
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 xl:gap-12">
							<div className="row-span-2 border-2 border-black rounded-2xl">
								<img
									src={process.env.REACT_APP_API_URL + coach.user_profile.avatar}
									alt="Coach"
									className="mx-auto rounded-t-[0.9rem] w-full"
								/>
								<div className="px-2 py-6 space-y-6 border-t-2 border-black sm:px-10">
									<p className="text-2xl font-medium text-center sm:text-3xl">
										{coach.user_profile.last_name + ' ' + coach.user_profile.first_name}
									</p>
									<Link
										to={user?.user_id !== Number(id) ? '/cabinet/messages/' + id : '/cabinet'}
										className="inline-block select-none text-center w-full min-w-[12rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-lg sm:text-xl leading-none font-normal bg-black text-white">
										Написати тренеру
									</Link>
									<button
										onClick={openModal}
										className="inline-block select-none text-center w-full min-w-[12rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-lg sm:text-xl leading-none font-normal bg-black text-white">
										Відправити заявку
									</button>
								</div>
							</div>
							<div className="p-4 space-y-4 text-left border-2 border-black lg:space-y-6 sm:p-6 lg:p-8 rounded-2xl">
								<div className="w-full px-4 pt-0 pb-2 overflow-x-auto border-b border-black">
									<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
										Пошта
									</span>
									<p className="text-lg font-medium sm:text-2xl">{coach.user_profile.email}</p>
								</div>
								<div className="w-full px-4 pt-0 pb-2 border-b border-black">
									<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
										Телефон
									</span>
									<p className="text-lg font-medium sm:text-2xl">{coach.user_profile.phone}</p>
								</div>
							</div>
							<div className="p-4 space-y-4 text-left border-2 border-black lg:space-y-6 sm:p-6 lg:p-8 rounded-2xl">
								<div className="w-full px-4 pt-0 pb-2 border-b border-black">
									<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
										Спеціалізація
									</span>
									<p className="text-lg font-medium sm:text-2xl">{coach.category}</p>
								</div>
								<div className="w-full px-4 pt-0 pb-2 border-b border-black">
									<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
										Тип тренувань
									</span>
									<p className="text-lg font-medium sm:text-2xl">{coach.type_training}</p>
								</div>
							</div>
							<div className="p-3 space-y-4 text-lg text-left border-2 border-black sm:text-2xl lg:p-6 md:col-span-2 rounded-2xl">
								{coach.info_block}
							</div>
						</div>
						<div className="space-y-4 text-center sm:space-y-8">
							<h2 className="text-2xl sm:text-3xl">Абонементи на вибір</h2>
							<div className="flex flex-wrap justify-center gap-4 md:gap-8">
								{/* <div className="grid grid-cols-3 gap-10"> */}
								{/* <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-stretch gap-8"> */}
								<Plan {...exampleSubsription} onClick={() => openModal(0)} />
								<Plan {...exampleSubsription} onClick={() => openModal(1)} />
								<Plan {...exampleSubsription} onClick={() => openModal(2)} />
							</div>
						</div>
					</div>
				)}
			</div>
			<OrderModal modalIsOpen={showModal} closeModal={closeModal} />
		</div>
	);
};

export default FullCoach;
