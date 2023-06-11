import React from 'react';
import ReactModal from 'react-modal';
import { NavLink, useNavigate } from 'react-router-dom';

import { UserCircleIcon, ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

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

const MobileCabinetNav = ({ modalIsOpen, afterOpenModal, closeModal, navigation, avatar }) => {
	const { logOutUser } = useAuth();
	const navigate = useNavigate();

	const onLogout = () => {
		logOutUser();
		navigate('/');
	};
	const closeNavModal = () => {
		closeModal();
	};
	return (
		<ReactModal
			closeTimeoutMS={250}
			isOpen={modalIsOpen.show}
			onAfterOpen={() => (document.body.style.overflow = 'hidden')}
			onAfterClose={() => (document.body.style.overflow = 'unset')}
			onRequestClose={closeNavModal}
			className={'absolute inset-0 overflow-auto'}
			contentLabel="Mobile cabinet navigation">
			<div className="flex flex-col bg-black p-6 border text-xl text-white border-black w-full min-h-full &[ReactModal__Overlay--after-open:translate-y-0]">
				<div className="text-right">
					<button onClick={closeNavModal}>
						<XMarkIcon className="w-10 h-10 text-white" />
					</button>
				</div>
				<div className="w-full mx-auto my-1 space-y-1">
					<img
						className="w-24 mx-auto border-4 border-white rounded-full bg-white/75"
						src={process.env.REACT_APP_API_URL + avatar}
						alt="avatar"
					/>
					<NavLink
						onClick={closeNavModal}
						to={'/cabinet/profile'}
						end
						className={({ isActive, isPending }) => {
							return (
								'flex w-fit mx-auto px-6 py-2 transition items-center ' +
								(isActive
									? ' border-b-2 border-white'
									: ' transition ease-out delay-75 border-b-2 border-transparent hover:border-white')
							);
						}}>
						<div className="flex-1 align-middle">
							<UserCircleIcon className="w-6 h-6 ml-auto mr-2" />
						</div>
						<div className="">Профіль</div>
						<div className="w-8"></div>
					</NavLink>
				</div>
				<nav className="flex-grow w-full space-y-1 text-left">
					{navigation.map((obj, index) => (
						<Button key={index} onClick={closeNavModal} linkTo={obj.href} renderIcon={obj.icon}>
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
			</div>
		</ReactModal>
	);
};

export default MobileCabinetNav;
