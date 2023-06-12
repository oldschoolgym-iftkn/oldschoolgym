import { useEffect, useState } from 'react';
import CoachCard from './CoachCard';
import useAxios from '../../hooks/useAxios';
import Loading from '../Loading';

const Coaches = () => {
	const [myApplications, setMyApplications] = useState({ data: null, loading: true, error: false });
	const api = useAxios();

	const getMyApplication = async () => {
		try {
			const res = await api.get('/coach/api/get_application_as_user');
			const my_application = res.data;
			const coach = (
				await api.get('/coach/api/get_coach_by_id', {
					params: { coach_id: my_application.coach },
				})
			)?.data?.user_profile;
			const newApplications = !my_application.is_accepted
				? []
				: [{ ...my_application, coach: coach }];
			setMyApplications({ data: newApplications, loading: false, error: false });
			// setMyApplications({ data: tunedApplications, loading: false, error: false });
		} catch (err) {
			setMyApplications({ data: null, loading: false, error: true });
			throw err;
		}
	};
	useEffect(() => {
		getMyApplication();
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
									<CoachCard key={app.id} {...app.coach} />
								))}
							</div>
						) : (
							<div className="py-6">
								<p className="text-lg text-center sm:text-2xl">Ваш список тренерів пустий.😥</p>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Coaches;
