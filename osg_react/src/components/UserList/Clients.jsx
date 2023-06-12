import { useEffect, useState } from 'react';
import ClientCard from './ClientCard';
import useAxios from '../../hooks/useAxios';
import Loading from '../Loading';

const Clients = () => {
	const [myApplications, setMyApplications] = useState({ data: null, loading: true, error: false });
	const api = useAxios();

	const getMyApplications = async () => {
		try {
			const res = await api.get('/coach/api/get_my_applications');
			const tunedApplications = await Promise.all(
				res.data
					.filter((app) => app.is_accepted === true)
					.map(async (application) => {
						const res = await api.get('/user/api/get_user_by_id/', {
							params: { user_id: application.user },
						});
						return { ...application, user: res.data };
					}),
			);

			setMyApplications({ data: tunedApplications, loading: false, error: false });
		} catch (err) {
			setMyApplications({ data: null, loading: false, error: true });
			throw err;
		}
	};
	useEffect(() => {
		getMyApplications();
	}, []);
	return (
		<>
			{myApplications.loading ? (
				<Loading />
			) : (
				<div className="flex flex-col h-full border border-black rounded-3xl">
					<div className="flex-1 p-4 overflow-y-auto text-2xl">
						{myApplications.data.length > 0 ? (
							<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-stretch gap-8">
								{myApplications.data.map((app, index) => (
									<ClientCard key={app.id} {...app.user} />
								))}
							</div>
						) : (
							<div className="py-6">
								<p className="text-lg text-center sm:text-2xl">У вас ще немає клієнтів.😥</p>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Clients;
