import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
import useAuth from '../hooks/useAuth';
import Messages from '../components/Messages/Messages';
import Chat from '../components/Messages/Chat';
import { ChatProvider } from '../context/ChatProvider';
import ProfileCoach from '../components/Profile/ProfileCoach';
import MissingPage from '../components/MissingPage';

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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// if (user.user_profile.verifying.is_activate !== true) {
	// 	console.log('"cabinet" redirect to confirm, beacause email not activated');
	// 	return <Navigate to={'/confirm-email'} replace />;
	// }
	const currentNav = user.role === 0 ? navUser : navCoach;
	return (
		<div className="flex flex-col h-full ">
			<Header />
			<div className="flex flex-row h-screen pt-[60px] max-xl:pt-[146px]">
				<SideBar navigation={currentNav} avatar={user.user_profile.avatar} />
				<main className="flex-1 h-full overflow-y-auto text-5xl p-7 ">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/profile" element={<ProfileCoach />} />
						<Route path="/requests" element={<div>Requests</div>} />

						<Route element={<ChatProvider />}>
							<Route path="/messages" element={<Messages />} />
							<Route path="/messages/:id" element={<Chat />} />
						</Route>

						{user.role === 0 ? (
							<Route path="/coaches" element={<div>Coaches</div>} />
						) : (
							<Route path="/clients" element={<div>Clients</div>} />
						)}
						<Route path="/calendar" element={<div>Calendar</div>} />
						<Route path="*" element={<MissingPage />} />
					</Routes>
				</main>
			</div>
		</div>
	);
};

export default Cabinet;
