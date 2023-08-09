import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Header from '../components/Header';
import axios from '../api/axios';
import Loading from '../components/Loading';
import MissingPage from '../components/MissingPage';
import Plan from '../components/FullCoach/Plan';
import useAuth from '../hooks/useAuth';
import OrderModal from '../components/FullCoach/OrderModal';
import { selectYearDeclension, specs, type_training } from '../components/FullCoach/utils.js';
import useAxios from '../hooks/useAxios';

const FullCoach = () => {
	const [showModal, setShowModal] = useState({ show: false, activeSubType: 0 });
	const [coach, setCoach] = useState({});
	const [rates, setRates] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);
	const { user } = useAuth();
	const { id } = useParams();
	const navigate = useNavigate();
	const [myApplication, setMyApplication] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const api = useAxios();

	const getMyApplication = async () => {
		try {
			const res = await api.get('/coach/api/get_application_as_user');
			const my_application = res.data;
			setMyApplication({ data: my_application, loading: false, error: false });
			setDisabled(true);
			// setMyApplications({ data: tunedApplications, loading: false, error: false });
		} catch (err) {
			console.error(err);
		}
	};
	const getCoach = () => {
		axios
			.get('/coach/api/get_coach_by_id', { params: { coach_id: id } })
			.then((res) => {
				setCoach(res.data);
				setRates(JSON.parse(res.data.rates));
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
		console.log(user);
		if (user) {
			getMyApplication();
		}
	}, []);

	const openModal = (type) => {
		if (user?.user_profile) {
			setShowModal({
				show: true,
				activeSubType: type,
				rates,
				subs: rates.map((rate, index) => rate.name),
				coach_id: Number(id),
			});
		} else {
			navigate('/sign-in', { state: { from: { pathname: `/coaches/${id}` } } });
		}
	};

	const closeModal = () => {
		setShowModal({ show: false, activeSubType: 0 });
	};
	if (notFound) {
		return <MissingPage header />;
	}
	console.log({ disabled });
	return (
		<div className="flex flex-col min-h-screen App">
			<Header main />
			<div className="flex-grow min-h-full">
				{isLoading ? (
					<Loading />
				) : (
					<div className="p-6 m-6 space-y-12 border border-black lg:p-12 rounded-3xl">
						<div className="container grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 xl:gap-12">
							<div className="row-span-2 border-2 border-black rounded-2xl">
								<img
									src={process.env.REACT_APP_API_URL + coach.user_profile.avatar}
									alt="Coach"
									className="mx-auto rounded-t-[0.9rem] w-full aspect-square"
								/>
								<div className="px-2 py-6 space-y-6 border-t-2 border-black sm:px-10">
									<p className="text-2xl font-medium text-center sm:text-3xl">
										{coach.user_profile.last_name + ' ' + coach.user_profile.first_name}
									</p>
									<Link
										to={
											user?.user_id !== coach.user_profile.id
												? '/cabinet/messages/' + id
												: '/cabinet'
										}
										className="inline-block disabled:bg-neutral-300 select-none text-center w-full min-w-[12rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-lg sm:text-xl leading-none font-normal bg-black text-white">
										Написати тренеру
									</Link>
									<button
										disabled={
											user?.user_id === coach.user_profile.id || user?.role === 1 || disabled
										}
										onClick={
											user?.user_id !== coach.user_profile.id || user?.role === 0 || disabled
												? () => openModal(0)
												: null
										}
										className="inline-block disabled:bg-neutral-300 select-none text-center w-full min-w-[12rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-lg sm:text-xl leading-none font-normal bg-black text-white">
										Відправити заявку
									</button>
								</div>
							</div>
							<div className="p-4 space-y-4 text-left border-2 border-black sm:p-6 rounded-2xl">
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
								{Number(coach.type_training) !== 0 && (
									<div className="w-full px-4 pt-0 pb-2 border-b border-black">
										<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
											Місто
										</span>
										<p className="text-lg font-medium sm:text-2xl">{coach.city}</p>
									</div>
								)}
							</div>
							<div className="p-4 space-y-4 text-left border-2 border-black sm:p-6 rounded-2xl">
								<div className="w-full px-4 pt-0 pb-2 border-b border-black">
									<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
										Спеціалізація
									</span>
									<p className="text-lg font-medium sm:text-2xl">{specs[Number(coach.category)]}</p>
								</div>
								<div className="w-full px-4 pt-0 pb-2 border-b border-black">
									<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
										Досвід
									</span>
									<p className="text-lg font-medium sm:text-2xl">
										{selectYearDeclension(coach.experience)}
									</p>
								</div>
								<div className="w-full px-4 pt-0 pb-2 border-b border-black">
									<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
										Тип тренувань
									</span>
									<p className="text-lg font-medium sm:text-2xl">
										{type_training[Number(coach.type_training)]}
									</p>
								</div>
							</div>
							<div className="p-3 space-y-4 min-h-[10rem] text-lg text-left border-2 border-black sm:text-2xl lg:p-6 md:col-span-2 rounded-2xl">
								{coach.info_block}
							</div>
						</div>
						<div className="space-y-4 text-center sm:space-y-8">
							<h2 className="text-2xl sm:text-3xl">Абонементи на вибір</h2>
							<div className="flex flex-wrap justify-center gap-4 md:gap-8">
								{rates?.map((rate, index) => (
									<Plan
										key={index}
										{...rate}
										onClick={
											user?.user_id === coach.user_profile.id || user?.role === 1 || disabled
												? null
												: () => openModal(index)
										}
									/>
								))}
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
