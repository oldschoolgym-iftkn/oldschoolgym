import { ArrowLeftIcon, PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import dayjs from 'dayjs';
import useChat from '../../hooks/useChat';

const Chat = () => {
	const [isLoading, setLoading] = useState(true);
	const navigate = useNavigate();
	const axios = useAxios();
	const { id } = useParams();
	const { user } = useAuth();
	const { userChats } = useChat();
	const textAreaRef = useRef(null);
	const containerRef = useRef(null);
	const [userMessage, setUserMessage] = useState('');
	const [messages, setMessages] = useState([]);
	// const lastMessageRef = useRef(null);

	useEffect(() => {
		containerRef.current?.scroll({ top: containerRef.current?.scrollHeight });
	}, [containerRef]);
	// useEffect(() => {
	// 	if (lastMessageRef) {
	// 		lastMessageRef.current.scrollIntoView();
	// 	}
	// });

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = '0px';
			const scrollHeight = textAreaRef.current.scrollHeight;
			const maxHeight = 192; //
			if (scrollHeight <= maxHeight) {
				textAreaRef.current.style.overflow = 'hidden';
			} else {
				textAreaRef.current.style.overflowY = 'auto';
			}

			textAreaRef.current.style.height = scrollHeight + 'px';
		}
	}, [textAreaRef, userMessage]);

	const handleChange = (evt) => {
		const val = evt.target?.value;
		if (val.length < 255) {
			setUserMessage(val);
		}
	};

	const indexChat = Number(id) - 1;

	const getMessages = () => {
		axios
			.get('/chat/api/message/', { params: { chat_id: userChats[indexChat].id } })
			.then((res) => {
				setMessages(res.data);
				// setMessages(exampleMessages);
				setLoading(false);
			});
	};
	useEffect(() => {
		if (userChats[indexChat]) {
			getMessages();
		}
	}, []);
	if (!userChats[indexChat]) {
		return <p>404 not found</p>;
	}
	if (isLoading) {
		return <p>Loading...</p>;
	}

	const member = userChats[indexChat].users.find((obj) => obj.id !== user.user_id);

	return (
		<div className="flex flex-col h-full border border-black rounded-3xl">
			<div className="flex text-2xl border-b border-black select-none">
				<button
					onClick={() => {
						navigate('/cabinet/messages');
					}}
					className="px-6 py-3">
					<ArrowLeftIcon className="w-10 h-10" />
				</button>
				<div className="my-auto ">
					<img
						src={process.env.REACT_APP_API_URL + member.avatar}
						alt="Img"
						className="inline-block w-12 h-12 mr-6 border border-black rounded-full"
					/>
					<p className="inline-block">{member.first_name + ' ' + member.last_name}</p>
				</div>
			</div>
			<div className="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto">
				<div ref={containerRef} className="flex-1 px-16 space-y-8 overflow-y-auto text-base">
					{messages.map((message, index) => {
						const sender = userChats[indexChat].users.find((obj) => obj.id === message.sender);
						return (
							<div
								key={message.id}
								// ref={index === 19 ? lastMessageRef : null}
								className="flex p-4 bg-neutral-400/50 rounded-3xl">
								<img
									src={process.env.REACT_APP_API_URL + sender.avatar}
									alt="Img"
									className="inline-block w-10 h-10 mr-3 border border-black rounded-full select-none"
								/>
								<div className="flex flex-col">
									<div className="space-x-2">
										<p className="inline-block text-lg">{sender.first_name}</p>
										<span className="inline-block text-base font-light">
											{dayjs(message.send_at).format('MM/DD/YYYY H:mm')}
										</span>
									</div>
									<div>
										<p>{message.message}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="flex space-x-3 ">
					<button className="py-2 mt-auto">
						<PaperClipIcon className="w-10 h-10" />
					</button>
					<textarea
						ref={textAreaRef}
						rows={1}
						onChange={handleChange}
						value={userMessage}
						placeholder="Написати повідомлення..."
						className="flex-grow p-4 px-6 text-base resize-none max-h-48 rounded-xl focus:border-black focus:ring-black"></textarea>
					<button className="py-2 mt-auto">
						<PaperAirplaneIcon className="w-10 h-10" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
