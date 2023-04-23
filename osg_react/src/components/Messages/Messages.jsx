import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useChat from '../../hooks/useChat';
import useAuth from '../../hooks/useAuth';

const Messages = () => {
	const { userChats } = useChat();
	const { user } = useAuth();
	const navigate = useNavigate();
	return (
		<div className="flex flex-col h-full border border-black rounded-3xl">
			<div className="text-2xl border-b border-black max-lg:flex max-lg:flex-col">
				<button className="inline-block py-4 font-bold border-r border-black px-14 max-lg:border-b max-lg:border-r-0">
					Чати з клієнтами
				</button>
				<button className="inline-block py-4 border-r border-black px-14 max-lg:border-none">
					Всі чати
				</button>
			</div>
			<div className="flex-1 p-12 overflow-y-auto text-2xl">
				<div className="h-full overflow-y-auto border-2 border-black rounded-3xl">
					{userChats.map((chat, index) => (
						<div key={index} className="border-b border-black">
							<div className="flex transition ease-out duration-200 bg-transparent rounded-3xl hover:bg-neutral-400/90 hover:scale-[102%] hover:rounded-3xl">
								<button
									onClick={() => {
										navigate('/cabinet/messages/' + (index + 1));
									}}
									className="flex flex-grow py-3 text-left justify-items-start">
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
									<EllipsisVerticalIcon className="w-10 h-10 text-black" />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Messages;
