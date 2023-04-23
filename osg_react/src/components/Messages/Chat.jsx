import { ArrowLeftIcon, PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import validator from 'validator';

import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import dayjs from 'dayjs';
import useChat from '../../hooks/useChat';
import MissingPage from '../MissingPage';
import Loading from '../Loading';

const Chat = () => {
	const [isLoading, setLoading] = useState(true);
	const navigate = useNavigate();
	const axios = useAxios();
	const { id } = useParams();
	const indexChat = Number(id) - 1;
	const { user, auth } = useAuth();
	const { userChats } = useChat();
	const textAreaRef = useRef(null);
	const containerRef = useRef(null);
	const [userMessage, setUserMessage] = useState('');
	const [socketUrl, setSocketUrl] = useState(
		process.env.REACT_APP_API_WEBSOCKETS_URL + `/ws/chat/${userChats[indexChat].id}/`,
	);
	const [messageHistory, setMessageHistory] = useState([]);
	const lastMessageRef = useRef(null);

	useEffect(() => {
		containerRef.current?.scroll({ top: containerRef.current?.scrollHeight, behavior: 'smooth' });
	}, [messageHistory]);
	// useEffect(() => {
	// 	lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth' });
	// }, [lastMessageRef]);

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
			.get('/chat/api/message/', { params: { chat_id: userChats[indexChat].id } })
			.then((res) => {
				setMessageHistory(res.data);
				setLoading(false);
			});
	};

	const createNewMessage = (message) => {
		setMessageHistory((prev) => prev.concat(message));
	};

	const { sendJsonMessage } = useWebSocket(socketUrl, {
		onOpen: () => {
			console.log('WebSocket connection established.');
		},
		onClose: () => console.log('WebSocket close connection.'),
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
		if (userChats[indexChat]) {
			getMessageHistory();
		}
	}, []);
	if (!userChats[indexChat]) {
		return <MissingPage />;
	}

	if (isLoading) {
		return <Loading />;
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
						draggable={false}
						className="inline-block w-12 h-12 mr-6 border border-black rounded-full"
					/>
					<p className="inline-block">{member.first_name + ' ' + member.last_name}</p>
				</div>
			</div>
			<div className="flex flex-col flex-1 px-6 pb-5 space-y-px overflow-y-auto">
				<div ref={containerRef} className="flex-1 px-16 overflow-y-auto text-base">
					{messageHistory.map((message, index) => {
						const sender = userChats[indexChat].users.find((obj) => obj.id === message.sender);
						return (
							<div
								key={message.id}
								// ref={index === messageHistory.length - 1 ? lastMessageRef : null}
								className="flex p-2 rounded-3xl first:mt-2 last:mb-2">
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
				<div className="flex space-x-3 ">
					<button className="py-2 mt-auto">
						<PaperClipIcon className="w-10 h-10" />
					</button>
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
						className="flex-grow p-4 px-6 text-base resize-none max-h-48 rounded-xl focus:border-black focus:ring-black"></textarea>
					<button onClick={handleSendMessage} className="py-2 mt-auto">
						<PaperAirplaneIcon className="w-10 h-10" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
