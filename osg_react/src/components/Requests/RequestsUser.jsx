import {
	ArrowLeftIcon,
	ArrowRightIcon,
	CheckCircleIcon,
	EllipsisVerticalIcon,
	StopIcon,
} from '@heroicons/react/24/outline';
import useAxios from '../../hooks/useAxios';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';

const tabs = ['Нові', 'В обробці', 'Відхилені', 'Прийняті'];

const RequestsUser = () => {
	const [myApplications, setMyApplications] = useState({ data: null, loading: true, error: false });
	const [selection, setSelection] = useState([]);
	const api = useAxios();
	const navigate = useNavigate();

	const getMyApplication = async () => {
		try {
			const res = await api.get('/coach/api/get_application_as_user');
			const my_application = res.data;
			const coach = (
				await api.get('/coach/api/get_coach_by_id', {
					params: { coach_id: my_application.coach },
				})
			)?.data?.user_profile;
			const newApplications = my_application.is_accepted
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
		<div className="flex flex-col h-full border border-black rounded-3xl">
			{false && (
				<div className="grid grid-flow-col text-sm border-b border-black divide-x md:text-xl justify-stretch">
					{tabs.map((tab, index) => (
						<button
							key={index}
							className="inline-block px-1 py-2 sm:px-2 first:rounded-tl-3xl last:rounded-tr-3xl lg:px-4 lg:py-4 hover:font-bold transition-color hover:bg-neutral-300 group">
							<p className="transition-transform group-hover:-translate-y-1">{tab}</p>
						</button>
					))}
				</div>
			)}
			{myApplications.loading ? (
				<Loading />
			) : (
				<div className="flex-1 p-8 overflow-y-auto text-lg sm:text-xl max-md:p-4">
					<div className="flex flex-col h-full overflow-y-auto border-2 border-black rounded-3xl">
						<div className="flex items-center justify-between px-2 py-1 sm:px-3">
							<div className="flex items-center space-x-4">
								<button onClick={() => setSelection(myApplications.data?.map((app) => app.id))}>
									<CheckCircleIcon className="w-6 h-6 sm:w-8 sm:h-8" />
								</button>
								<button>
									<EllipsisVerticalIcon className="w-6 h-6 sm:w-8 sm:h-8" />
								</button>
							</div>
							<div className="flex items-center space-x-2">
								<span>
									{1}/{1}
								</span>
								<button>
									<ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
								</button>
								<button>
									<ArrowRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
								</button>
							</div>
						</div>
						<div className="flex flex-1">
							<div className="my-4 mx-2 sm:m-3 space-y-[25px] max-sm:space-y-[33px]">
								{myApplications?.data?.map((obj, index) => (
									<button
										onClick={() =>
											selection.find((id) => id === obj.id)
												? setSelection((prev) => prev.filter((id) => id !== obj.id))
												: setSelection((prev) => [...prev, obj.id])
										}
										key={obj.id}
										className="block">
										{selection.find((id) => id === obj.id) ? (
											<CheckCircleIcon className="w-6 h-6 sm:w-8 sm:h-8" />
										) : (
											<StopIcon className="w-6 h-6 sm:w-8 sm:h-8" />
										)}
									</button>
								))}
							</div>
							<div className="flex-1 border-t border-l border-black">
								{myApplications?.data?.map((application, index) => (
									<div key={index} className="border-b border-black">
										<div className="flex items-center transition ease-out duration-200 bg-transparent rounded-3xl hover:bg-neutral-400/90 hover:scale-[101%] hover:rounded-3xl">
											<button
												onClick={() => {
													navigate('/cabinet/requests/' + application.id);
												}}
												className="flex items-center flex-1 flex-grow py-1 text-left sm:py-2 justify-items-center">
												<img
													src={process.env.REACT_APP_API_URL + application.coach.avatar}
													alt="Img"
													className="inline-block w-8 h-8 mx-2 border border-black rounded-full sm:w-10 sm:h-10 sm:mx-3"
												/>
												<div className="flex flex-1 truncate gap-x-2 max-sm:flex-col max-sm:text-base">
													<p className="font-semibold">{application.coach.first_name}</p>
													<p className="text-neutral-700">{application.subject}</p>
												</div>
												<p className="px-2 text-base sm:text-lg">{new Date().getDate()} чер.</p>
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default RequestsUser;
