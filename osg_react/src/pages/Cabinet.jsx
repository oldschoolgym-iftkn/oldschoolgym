import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from '../components/Header';
import SideBar from '../components/SideBar';

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
import MissingPage from '../components/MissingPage';
import Profile from '../components/Profile/Profile';
import HomeCoach from '../components/Home/HomeCoach';
import HomeUser from '../components/Home/HomeUser';
import Coaches from '../components/UserList/Coaches';
import Clients from '../components/UserList/Clients';
import CalendarCoach from '../components/Calendar/CalendarCoach';
import MobileCabinetNav from '../components/MobileCabinetNav';
import RequestsUser from '../components/Requests/RequestsUser';
import RequestsCoach from '../components/Requests/RequestsCoach';
import FullRequest from '../components/Requests/FullRequest';
import FullRequestUser from '../components/Requests/FullRequestUser';
import UserProfile from '../components/UserProfile';

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
	const [mobileNavShow, setMobileNavShow] = useState({ show: false });

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentNav = user.role === 0 ? navUser : navCoach;
	return (
		<>
			<div className="flex flex-col min-h-screen ">
				<Header openBurger={() => setMobileNavShow({ show: true })} />
				<div className="flex flex-row flex-1 overflow-y-auto">
					<SideBar navigation={currentNav} avatar={user.user_profile.avatar} />
					<main className="flex-1 p-4 text-5xl md:p-8 ">
						<Routes>
							<Route path="/" element={user.role === 0 ? <HomeUser /> : <HomeCoach />} />
							<Route path="/profile" element={<Profile />} />
							<Route
								path="/requests"
								element={user.role === 0 ? <RequestsUser /> : <RequestsCoach />}
							/>
							<Route
								path="/requests/:id"
								element={user.role === 0 ? <FullRequestUser /> : <FullRequest />}
							/>

							<Route element={<ChatProvider />}>
								<Route path="/messages" element={<Messages />} />
								<Route path="/messages/:id" element={<Chat />} />
							</Route>

							{user.role === 0 ? (
								<Route path="/coaches" element={<Coaches />} />
							) : (
								<Route path="/clients" element={<Clients />} />
							)}
							<Route path="/calendar" element={<CalendarCoach />} />
							<Route path="/user/:id" element={<UserProfile />} />
							<Route path="*" element={<MissingPage />} />
						</Routes>
					</main>
				</div>
			</div>
			<MobileCabinetNav
				modalIsOpen={mobileNavShow}
				closeModal={() => setMobileNavShow({ show: false })}
				navigation={currentNav}
				avatar={user.user_profile.avatar}
			/>
		</>
	);
};

export default Cabinet;
