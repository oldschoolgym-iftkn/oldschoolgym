import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Home from '../components/Home/Home';

import {
	UsersIcon,
	HomeIcon,
	ClipboardDocumentCheckIcon,
	ChatBubbleBottomCenterTextIcon,
	CalendarIcon,
} from '@heroicons/react/24/outline';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';

const navUser = [
	{ name: 'Головна', icon: <HomeIcon />, href: '/cabinet' },
	{
		name: 'Заявки',
		icon: <ClipboardDocumentCheckIcon />,
		href: '/cabinet/requests',
	},
	{
		name: 'Повідомлення',
		icon: <ChatBubbleBottomCenterTextIcon />,
		href: '/cabinet/messages',
	},
	{ name: 'Тренери', icon: <UsersIcon />, href: '/cabinet/coaches' },
	{ name: 'План занять', icon: <CalendarIcon />, href: '/cabinet/calendar' },
];
const navCoach = [
	{ name: 'Головна', icon: <HomeIcon />, href: '/cabinet' },
	{
		name: 'Заявки',
		icon: <ClipboardDocumentCheckIcon />,
		href: '/cabinet/requests',
	},
	{
		name: 'Повідомлення',
		icon: <ChatBubbleBottomCenterTextIcon />,
		href: '/cabinet/messages',
	},
	{ name: 'Клієнти', icon: <UsersIcon />, href: '/cabinet/clients' },
	{ name: 'План занять', icon: <CalendarIcon />, href: '/cabinet/calendar' },
];

const Cabinet = () => {
	const { user } = useAuth();
	const api = useAxios();

	useEffect(() => {
		window.scrollTo(0, 0);
		// getSome();
	});
	// const getSome = async () => {
	// 	const response = await api
	// 		.get('/chat/api/message/', { params: { id: 1 } })
	// 		.then((res) => {
	// 			console.log(res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	const currentNav = user.role === 0 ? navUser : navCoach;
	return (
		<div className="flex flex-col h-full ">
			<Header />
			<div className="flex flex-row h-screen pt-[60px]">
				<SideBar navigation={currentNav} />
				<main className="flex-1 h-full overflow-y-auto text-5xl p-7 ">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/requests" element={<div>Requests</div>} />
						<Route path="/messages" element={<div>Messages</div>} />
						{user.role === 0 ? (
							<Route path="/coaches" element={<div>Coaches</div>} />
						) : (
							<Route path="/clients" element={<div>Clients</div>} />
						)}
						<Route path="/calendar" element={<div>Calendar</div>} />
					</Routes>
				</main>
			</div>
		</div>
	);
};

export default Cabinet;
