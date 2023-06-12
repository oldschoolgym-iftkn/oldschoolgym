import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import MissingPage from './MissingPage';
import useAxios from '../hooks/useAxios';

const UserProfile = ({ className }) => {
	const [user, setUser] = useState({ data: null, loading: true, error: false });
	const api = useAxios();
	const { id } = useParams();

	const getUser = () => {
		api
			.get('/user/api/get_user_by_id/', { params: { user_id: id } })
			.then((res) => {
				setUser({ data: res.data, loading: false, error: false });
			})
			.catch(() => {
				setUser({ data: null, loading: false, error: true });
			})
			.finally(() => {});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		getUser();
	}, []);
	return (
		<>
			{user.loading ? (
				<Loading />
			) : user.error ? (
				<MissingPage />
			) : (
				<div
					className={
						'w-full px-12 py-6 max-lg:px-4 max-lg:py-4 space-y-4 border border-black rounded-3xl' +
						' ' +
						'h-full'
					}>
					<h2 className="text-2xl lg:text-4xl">Дані користувача</h2>
					<div className="grid grid-cols-2 grid-rows-2 gap-8 max-lg:gap-6 max-lg:grid-cols-1 max-lg:grid-rows-4">
						<div className="flex flex-col justify-center p-6 space-y-4 text-left border-2 border-black max-lg:p-4 max-lg:order-2 rounded-2xl">
							<img
								src={process.env.REACT_APP_API_URL + user.data.avatar}
								alt="Avatar"
								className="object-scale-down mx-auto rounded-full select-none aspect-square w-36 sm:w-52 bg-black/20"
							/>
							<p className="text-2xl font-medium text-center">
								{user.data.first_name + ' ' + user.data.last_name}
							</p>
						</div>
						<div className="row-span-2 p-6 space-y-6 border-2 border-black max-lg:p-4 max-lg:order-3 rounded-2xl">
							<div className="w-full px-4 pt-0 pb-2 overflow-x-auto border-b border-black">
								<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
									Ім'я
								</span>
								<p className="text-lg font-medium sm:text-xl">{user.data.first_name}</p>
							</div>
							<div className="w-full px-4 pt-0 pb-2 border-b border-black">
								<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
									Прізвище
								</span>
								<p className="text-lg font-medium sm:text-xl">{user.data.last_name}</p>
							</div>
							<div className="w-full px-4 pt-0 pb-2 overflow-x-auto border-b border-black">
								<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
									Стать
								</span>
								<p className="text-lg font-medium sm:text-lg">
									{user.data.gender === 'M' ? 'Чоловіча' : 'Жіноча'}
								</p>
							</div>
							<div className="w-full px-4 pt-0 pb-2 overflow-x-auto border-b border-black">
								<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
									Ріст
								</span>
								<p className="text-lg font-medium sm:text-xl">{user.data.height} см</p>
							</div>
							<div className="w-full px-4 pt-0 pb-2 overflow-x-auto border-b border-black">
								<span className="block text-base text-gray-500 select-none sm:text-lg font-extralight">
									Вага
								</span>
								<p className="text-lg font-medium sm:text-xl">{user.data.weight} кг</p>
							</div>
						</div>
						<div className="p-6 space-y-2 text-left border-2 border-black max-lg:p-4 max-lg:order-2 rounded-2xl">
							<div className="w-full px-4 pt-4 pb-2 overflow-y-auto border-b border-black">
								<span className="block text-lg text-gray-500 select-none font-extralight">
									Пошта
								</span>
								<p className="text-xl font-medium w-fit">{user.data.email}</p>
							</div>
							<div className="w-full px-4 pt-4 pb-2 border-b border-black">
								<span className="block text-lg text-gray-500 select-none font-extralight">
									Телефон
								</span>
								<p className="text-xl font-medium">{user.data.phone}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UserProfile;
