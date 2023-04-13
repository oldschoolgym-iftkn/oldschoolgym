import React from 'react';

import {
	UserCircleIcon,
	UsersIcon,
	ArrowRightOnRectangleIcon,
	HomeIcon,
	ClipboardDocumentCheckIcon,
	ChatBubbleBottomCenterTextIcon,
	CalendarIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const navigation = [
	{ name: 'Головна', icon: <HomeIcon />, href: '/profile/', current: true },
	{
		name: 'Заявки',
		icon: <ClipboardDocumentCheckIcon />,
		href: '/profile/requests',
		current: false,
	},
	{
		name: 'Повідомлення',
		icon: <ChatBubbleBottomCenterTextIcon />,
		href: '/profile/messages',
		current: false,
	},
	{ name: 'Клієнти', icon: <UsersIcon />, href: '/profile/clients', current: false },
	{ name: 'План занять', icon: <CalendarIcon />, href: '/profile/calendar', current: false },
];

const Button = ({ linkTo, renderIcon, active, onClick, children }) => {
	return (
		<Link
			onClick={onClick}
			to={linkTo}
			className={
				'block py-2 pl-1 pr-4 space-x-4 ' +
				(active
					? ' border-b-2 border-white'
					: ' transition ease-out delay-75 border-b-2 border-transparent hover:border-white')
			}>
			<div className="inline-block w-6 h-6 align-middle">{renderIcon}</div>
			<div className="inline-block align-middle">{children}</div>
		</Link>
	);
};

const SideBar = () => {
	const [activePage, setActivePage] = React.useState(0);
	const onClickPage = (index) => {
		setActivePage(index);
	};

	return (
		<aside className="flex flex-col py-8 text-white bg-black w-96">
			<div className="mx-auto my-10 space-y-4 w-fit">
				<img
					className="w-48 h-48 border-4 border-white rounded-full"
					src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
					alt="avatar"
				/>
				<button className="flex w-full transition ease-out delay-75 border-b-2 border-transparent hover:border-white">
					{/* hover:bg-gray-700 hover:border-b-2 */}
					<div className="flex-1">
						<UserCircleIcon className="w-6 h-6 ml-auto mr-2" />
					</div>
					<span className="text-base justify-self-center">Профіль</span>
					<div className="flex-1"></div>
				</button>
			</div>
			<nav className="flex-grow mx-12 my-10 space-y-4 text-left">
				{navigation.map((obj, index) => (
					<Button
						key={index}
						linkTo={obj.href}
						renderIcon={obj.icon}
						active={activePage === index}
						onClick={() => onClickPage(index)}>
						{obj.name}
					</Button>
				))}
			</nav>
			<div className="">
				<button className="block px-4 py-2 mx-auto space-x-2 transition ease-out delay-75 border-b-2 border-transparent hover:border-white">
					<div className="inline-block align-middle">Вихід</div>
					<div className="inline-block w-6 h-6 align-middle">
						<ArrowRightOnRectangleIcon />
					</div>
				</button>
			</div>
		</aside>
	);
};
export default SideBar;
