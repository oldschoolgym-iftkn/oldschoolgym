import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import MissingPage from '../MissingPage';

const Plan = ({ name, cost, lessons_count, description }) => {
	return (
		<div className="p-4 border space-y-2 text-center border-black rounded-3xl min-w-[220px] max-w-[300px]">
			<p className="text-xl font-semibold sm:text-2xl">{name}</p>
			<p>Ціна: {cost}₴</p>
			<p>Кількість занять: {lessons_count}</p>
			<p className="text-lg sm:text-xl id line-clamp-6">{description}</p>
		</div>
	);
};

const FullRequest = () => {
	const [myApplications, setMyApplications] = useState({ data: null, loading: true, error: false });
	const [request, setRequest] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();
	const api = useAxios();

	const getMyApplication = async () => {
		try {
			const res = await api.get('/coach/api/get_application_as_user');
			const my_application = res.data;
			const user = (
				await api.get('/user/api/get_user_by_id/', {
					params: { user_id: my_application.user },
				})
			)?.data;
			setRequest({ ...my_application, user: user });
			setMyApplications({
				data: [{ ...my_application, user: user }],
				loading: false,
				error: false,
			});
			// setMyApplications({ data: tunedApplications, loading: false, error: false });
		} catch (err) {
			setMyApplications({ data: null, loading: false, error: true });
			throw err;
		}
	};
	useEffect(() => {
		getMyApplication();
	}, []);
	console.log(request);
	return (
		<>
			{myApplications.loading ? (
				<Loading />
			) : request ? (
				<div className="flex flex-col h-full border border-black rounded-3xl">
					<div className="flex-1 p-8 overflow-y-auto text-lg sm:text-xl max-md:p-4">
						<div className="flex flex-col h-full overflow-y-auto border-2 border-black rounded-3xl">
							<div className="flex p-4">
								<button onClick={() => navigate('/cabinet/requests')}>
									<ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
								</button>
							</div>
							<div className="flex gap-6 px-4 pb-4 lg:flex-1 max-lg:items-center lg:gap-8 md:px-8 xl:px-12 max-lg:flex-col">
								<div className="flex flex-col flex-1 gap-2 lg:gap-6">
									<div className="flex items-center gap-4">
										<img
											src={process.env.REACT_APP_API_URL + request.user.avatar}
											alt="User avatar"
											className="object-scale-down w-16 rounded-full lg:w-24"
										/>
										<p className="text-xl sm:text-2xl">
											{request.user.last_name + ' ' + request.user.first_name}
										</p>
									</div>
									<p className="font-medium">{request?.subject}</p>
									<p>{request?.message}</p>
									<div className="flex max-w-md gap-4 max-sm:flex-col">
										<button
											disabled
											className="inline-block disabled:bg-neutral-400 select-none text-center w-full min-w-[8rem] hover:bg-neutral-600 px-8 py-2 rounded-full text-lg leading-none font-normal bg-black text-white border border-black">
											Відхилити
										</button>
									</div>
								</div>
								<div className="max-lg:flex-1">
									<Plan
										name={'Одне заняття'}
										cost={250}
										lessons_count={1}
										description={'Спробуй себе на один раз з моїми вміннями та порадами'}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<MissingPage />
			)}
		</>
	);
};

export default FullRequest;
