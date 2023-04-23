import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import Loading from '../components/Loading';
// import useAuth from '../hooks/useAuth';

const ChatContext = createContext({});

export const ChatProvider = () => {
	const axios = useAxios();
	// const { user } = useAuth();
	const [userChats, setUserChats] = useState([]);
	const [initLoading, setInitLoading] = useState(true);

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

	useEffect(() => {
		joinChatUsers();
	}, []);

	const contextData = { userChats };
	return (
		<ChatContext.Provider value={contextData}>
			{initLoading ? <Loading /> : <Outlet />}
		</ChatContext.Provider>
	);
};

export default ChatContext;
