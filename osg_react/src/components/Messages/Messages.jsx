import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useChat from '../../hooks/useChat';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import Loading from '../Loading';

const Messages = () => {
	const [activeTab, setActiveTab] = useState(0);
	const { userChats } = useChat();
	const { user } = useAuth();
	const navigate = useNavigate();

	const [myApplications, setMyApplications] = useState({ data: null, loading: true, error: false });
	const api = useAxios();

	const getMyApplications = async () => {
		try {
			const res = await api.get('/coach/api/get_my_applications');
			setMyApplications({ data: res.data, loading: false, error: false });
			// setMyApplications({ data: tunedApplications, loading: false, error: false });
		} catch (err) {
			setMyApplications({ data: null, loading: false, error: true });
			throw err;
		}
	};
	const clientChats = userChats?.filter((chat) =>
		myApplications.data?.find(
			(app) =>
				app.is_accepted &&
				app.user === chat.users.find((chatUser) => chatUser.id !== user.user_profile.id).id,
		),
	);
	useEffect(() => {
		if (activeTab === 1) {
			getMyApplications();
		}
	}, [activeTab]);

	return (
		<div className="flex flex-col h-full border border-black rounded-3xl">
			{user.role === 1 && (
				<div className="grid grid-flow-col text-lg border-b border-black divide-x-2 md:text-xl justify-stretch">
					<button
						onClick={() => {
							setActiveTab(0);
						}}
						aria-pressed={activeTab === 0}
						className="inline-block px-2 py-2 aria-pressed:font-bold aria-pressed:bg-neutral-300 first:rounded-tl-3xl last:rounded-tr-3xl lg:px-4 lg:py-4 hover:font-bold transition-color hover:bg-neutral-300 group">
						<p className="transition-transform group-hover:-translate-y-1">{'Всі чати'}</p>
					</button>
					<button
						onClick={() => {
							setActiveTab(1);
						}}
						aria-pressed={activeTab === 1}
						className="inline-block px-2 py-2 aria-pressed:font-bold aria-pressed:bg-neutral-300 first:rounded-tl-3xl last:rounded-tr-3xl lg:px-4 lg:py-4 hover:font-bold transition-color hover:bg-neutral-300 group">
						<p className="transition-transform group-hover:-translate-y-1">
							{user.role === 0 ? 'Чати з тренерами' : 'Чати з клієнтами'}
						</p>
					</button>
				</div>
			)}
			<div className="flex-1 p-4 overflow-y-auto text-xl sm:text-2xl md:p-8 ">
				<div className="h-full overflow-y-auto border-2 border-black rounded-3xl">
					{activeTab === 1 && myApplications.loading ? (
						<Loading />
					) : (
						(activeTab === 0 ? userChats : clientChats).map((chat, index) => (
							<div key={index} className="border-b border-black">
								<div className="flex transition ease-out duration-200 bg-transparent rounded-3xl hover:bg-neutral-400/90 hover:scale-[102%] hover:rounded-3xl">
									<button
										onClick={() => {
											// navigate('/cabinet/messages/' + (index + 1));
											navigate(
												'/cabinet/messages/' + chat.users.find((obj) => obj.id !== user.user_id).id,
											);
										}}
										className="flex items-center flex-grow py-1 text-left sm:py-3 justify-items-start">
										<img
											src={
												process.env.REACT_APP_API_URL +
												chat.users.find((obj) => obj.id !== user.user_id).avatar
											}
											alt="Img"
											className="inline-block w-10 h-10 mx-6 border border-black rounded-full"
										/>
										<div className="flex-1 inline-block">
											{chat.users.find((obj) => obj.id !== user.user_id).first_name}
										</div>
									</button>
									<button
										className="mx-6"
										onClick={() => {
											alert('PopUp!');
										}}>
										<EllipsisVerticalIcon className="w-6 h-6 text-black sm:w-8 sm:h-8" />
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Messages;
