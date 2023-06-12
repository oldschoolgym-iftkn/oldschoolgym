import { ArrowLeftIcon, PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import validator from 'validator';

import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import dayjs from 'dayjs';
import useChat from '../../hooks/useChat';
import MissingPage from '../MissingPage';
import Loading from '../Loading';

const Chat = () => {
	const navigate = useNavigate();
	const axios = useAxios();
	const { id } = useParams();
	const { user, auth } = useAuth();
	const { userChats, createChat, createChatError } = useChat();
	const [isLoading, setLoading] = useState(true);
	const [isError, setIsError] = useState(() => createChatError);
	const textAreaRef = useRef(null);
	const containerRef = useRef(null);
	const [userMessage, setUserMessage] = useState('');
	const [chat, setChat] = useState(
		userChats.find((chat) => chat.users.find((user) => user.id === Number(id))),
	);
	const [socketUrl, setSocketUrl] = useState(
		process.env.REACT_APP_API_WEBSOCKETS_URL + `/ws/chat/${chat?.id}/`,
	);
	const [messageHistory, setMessageHistory] = useState([]);

	useEffect(() => {
		containerRef.current?.scroll({ top: containerRef.current?.scrollHeight, behavior: 'smooth' });
	}, [messageHistory]);

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

	const getMessageHistory = () => {
		axios
			.get('/chat/api/message/', { params: { chat_id: chat.id } })
			.then((res) => {
				setMessageHistory(res.data);
				setLoading(false);
			})
			.catch((err) => {});
	};

	const createNewMessage = (message) => {
		setMessageHistory((prev) => prev.concat(message));
	};

	const { sendJsonMessage } = useWebSocket(socketUrl, {
		onMessage: (ev) => createNewMessage(JSON.parse(ev.data)),
		queryParams: { authorization: auth.access },
	});

	const handleSendMessage = () => {
		if (!validator.isEmpty(userMessage, { ignore_whitespace: true })) {
			setUserMessage('');
			sendJsonMessage({ message: userMessage });
		}
	};

	useEffect(() => {
		if (chat) {
			getMessageHistory();
		} else if (!isError && !createChatError) {
			createChat(Number(id))
				.then(() => {
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setIsError(true);
				});
		}
	}, [chat, createChat, createChatError, id, isError]);

	if (isError) {
		return <MissingPage />;
	}

	if (isLoading) {
		return <Loading />;
	}

	const member = chat.users.find((obj) => obj.id !== user.user_id);

	return (
		<div className="flex flex-col h-full border border-black rounded-3xl">
			<div className="flex text-lg border-b border-black select-none sm:text-2xl">
				<button
					onClick={() => {
						navigate('/cabinet/messages');
					}}
					className="px-6 py-3">
					<ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
				</button>
				<Link to={'/cabinet/user/' + member.id} className="flex items-center my-auto space-x-2">
					<img
						src={process.env.REACT_APP_API_URL + member.avatar}
						alt="Img"
						draggable={false}
						className="inline-block w-10 h-10 border border-black rounded-full"
					/>
					<p className="inline-block">{member.first_name + ' ' + member.last_name}</p>
				</Link>
			</div>
			<div className="flex flex-col flex-1 pb-5 space-y-px overflow-y-auto sm:px-6">
				<div ref={containerRef} className="flex-1 px-4 overflow-y-auto text-base sm:px-12">
					{messageHistory.map((message, index) => {
						const sender = chat.users.find((obj) => obj.id === message.sender);
						return (
							<div key={message.id} className="flex p-2 rounded-3xl first:mt-2 last:mb-2">
								<img
									src={process.env.REACT_APP_API_URL + sender.avatar}
									alt="Img"
									draggable={false}
									className="inline-block w-10 h-10 mr-3 border border-black rounded-full select-none"
								/>
								<div className="flex flex-col">
									<div className="space-x-2 select-none">
										<p className="inline-block text-lg leading-none">
											{sender.id !== user.user_id ? sender.first_name : 'Ви'}
										</p>
										<span className="inline-block text-sm font-light text-gray-500">
											{dayjs(message.send_at).format('H:mm MM/DD/YYYY')}
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
				<div className="flex px-4 space-x-3">
					{/* <button className="py-2 mt-auto">
						<PaperClipIcon className="w-8 h-8 sm:w-10 sm:h-10" />
					</button> */}
					<textarea
						ref={textAreaRef}
						rows={1}
						maxLength={250}
						onChange={handleChange}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && e.shiftKey === false) {
								e.preventDefault();
								handleSendMessage();
							}
						}}
						value={userMessage}
						placeholder="Написати повідомлення..."
						className="flex-grow p-2 text-base resize-none md:p-4 max-h-48 rounded-xl focus:border-black focus:ring-black"></textarea>
					<button onClick={handleSendMessage} className="mt-auto">
						<PaperAirplaneIcon className="w-8 h-8 sm:w-10 sm:h-10" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
