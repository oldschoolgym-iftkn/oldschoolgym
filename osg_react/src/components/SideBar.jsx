import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

import useAuth from '../hooks/useAuth';

const Button = ({ linkTo, renderIcon, onClick, children }) => {
	return (
		<NavLink
			onClick={onClick}
			to={linkTo}
			end={linkTo === '/cabinet'}
			className={({ isActive, isPending }) => {
				return (
					'block py-2 pl-1 pr-4 space-x-4 ' +
					(isActive
						? ' border-b-2 border-white'
						: ' transition ease-out delay-75 border-b-2 border-transparent hover:border-white')
				);
			}}>
			<div className="inline-block w-6 h-6 align-middle">{renderIcon}</div>
			<div className="inline-block align-middle">{children}</div>
		</NavLink>
	);
};

const SideBar = ({ navigation, avatar }) => {
	const { logOutUser } = useAuth();
	const navigate = useNavigate();

	const onLogout = () => {
		logOutUser();
		navigate('/');
	};

	return (
		<aside className="flex flex-col py-8 text-white bg-black max-xl:py-4 max-xl:w-80 w-96">
			<div className="mx-auto my-10 space-y-4 max-xl:space-y-2 max-xl:my-2 w-fit">
				<img
					className="h-40 border-4 border-white rounded-full max-xl:h-32 bg-white/75"
					src={process.env.REACT_APP_API_URL + avatar}
					alt="avatar"
				/>
				<NavLink
					to={'/cabinet/profile'}
					end
					className={({ isActive, isPending }) => {
						return (
							'flex w-full p-2 transition ' +
							(isActive
								? ' border-b-2 border-white'
								: ' transition ease-out delay-75 border-b-2 border-transparent hover:border-white')
						);
					}}>
					<div className="flex-1">
						<UserCircleIcon className="w-6 h-6 ml-auto mr-2" />
					</div>
					<span className="text-base justify-self-center">Профіль</span>
					<div className="flex-1"></div>
				</NavLink>
			</div>
			<nav className="flex-grow mx-12 my-4 space-y-4 text-left max-xl:space-y-2">
				{navigation.map((obj, index) => (
					<Button key={index} linkTo={obj.href} renderIcon={obj.icon}>
						{obj.name}
					</Button>
				))}
			</nav>
			<div className="">
				<button
					onClick={onLogout}
					className="block px-4 py-2 mx-auto space-x-2 transition ease-out delay-75 border-b-2 border-transparent hover:border-white">
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
