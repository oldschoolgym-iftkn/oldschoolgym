import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';
// import useAuth from '../hooks/useAuth';

const ChatContext = createContext({});

export const ChatProvider = () => {
	const axios = useAxios();
	const { user } = useAuth();
	const [userChats, setUserChats] = useState([]);
	const [initLoading, setInitLoading] = useState(true);
	const [createChatError, setCreateChatError] = useState(false);

	const joinChatUsers = async () => {
		const res = await axios.get('/user/api/get_chats/');
		const userChats = res.data;
		const tunedChats = await Promise.all(
			userChats.map(async (chat) => {
				const tunedChatUsers = await Promise.all(
					chat.users.map(async (user_id) => {
						const res = await axios.get('/user/api/get_user_by_id/', { params: { user_id } });
						return res.data;
					}),
				);
				console.log({ tunedChatUsers, initLoading });
				return { ...chat, users: tunedChatUsers };
			}),
		);
		console.log({ tunedChats, initLoading });
		setUserChats(tunedChats);
		setInitLoading(false);
	};

	const createChat = async (memberId) => {
		setInitLoading(true);
		try {
			const res = await axios.post('/chat/api/chat/', { users: [user.user_id, memberId] });
			const newUserChats = [
				...userChats,
				{
					id: res.data.id,
					users: res.data.users.map((obj) => ({ id: obj })),
				},
			];
			const tunedChats = await Promise.all(
				newUserChats.map(async (chat) => {
					const tunedChatUsers = await Promise.all(
						chat.users.map(async (chatUser) => {
							const res = await axios.get('/user/api/get_user_by_id/', {
								params: { user_id: chatUser.id },
							});
							return res.data;
						}),
					);
					console.log({ tunedChatUsers, initLoading });
					return { ...chat, users: tunedChatUsers };
				}),
			);
			console.log({ tunedChats, initLoading });
			setUserChats(tunedChats);
		} catch (err) {
			setCreateChatError(true);
			throw err;
		} finally {
			setInitLoading(false);
		}
	};

	useEffect(() => {
		joinChatUsers();
	}, []);

	const contextData = { userChats, createChat, createChatError };
	return (
		<ChatContext.Provider value={contextData}>
			{initLoading ? <Loading /> : <Outlet />}
		</ChatContext.Provider>
	);
};

export default ChatContext;
