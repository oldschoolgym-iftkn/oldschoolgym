import React from 'react';
import { Link } from 'react-router-dom';

import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';

export default function Header({ main, full, noFixed, openBurger }) {
	const navMain =
		'grid items-center justify-center grid-cols-2 sm:grid-cols-3 col-span-2 text-2xl md:ml-auto md:mr-auto shrink max-xl:text-lg';
	const nav =
		'flex flex-wrap items-center justify-center col-span-2 text-2xl md:ml-auto md:mr-auto shrink max-xl:text-lg ';
	const headerContainer =
		'flex flex-wrap items-center p-2 mx-auto' + (!openBurger && ' max-lg:flex-col');
	return (
		<header
			className={
				'top-0 z-20 w-full text-white bg-black border-b-2 border-white body-font' +
				' ' +
				(noFixed
					? ''
					: full
					? 'lg:fixed lg:[&+*]:mt-[74px] lg:[&+*]:max-2xl:mt-[60px] lg:[&+*]:max-lg:mt-[116px] lg:[&+*]:max-xl:mt-[60px]'
					: 'lg:fixed lg:[&+*]:mt-[74px] lg:[&+*]:max-2xl:mt-[52px] lg:[&+*]:max-xl:mt-[42px]')
			}>
			<div className={full ? headerContainer + ' container' : headerContainer}>
				<Link to="/" className="flex items-center font-normal title-font md:mb-0">
					<span
						className="mr-1 -mb-1 text-3xl leading-none 2xl:text-6xl md:text-4xl "
						style={{ fontFamily: "'Stick No Bills', sans-serif" }}>
						OLDSCHOOLGYM
					</span>
					<svg
						className="md:w-[72px] md:h-[36px] w-[40px] h-[20px]"
						viewBox="0 0 80 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0_153_334)">
							<path d="M2.84653 14.2858H0V25.7142H2.84653V14.2858Z" fill="white" />
							<path d="M8.53876 5.71417H5.69223V34.285H8.53876V5.71417Z" fill="white" />
							<path d="M17.0776 0H11.3845V40H17.0776V0Z" fill="white" />
							<path d="M54.0767 17.1433H19.9225V22.8575H54.0767V17.1433Z" fill="white" />
							<path d="M74 14.2858H71.1535V25.7142H74V14.2858Z" fill="white" />
							<path d="M68.3077 5.71417H65.4612V34.285H68.3077V5.71417Z" fill="white" />
							<path d="M62.6155 0H56.9225V40H62.6155V0Z" fill="white" />
						</g>
						<defs>
							<clipPath id="clip0_153_334">
								<rect width="74" height="40" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</Link>
				{full && (
					<>
						<nav className={main ? navMain : nav}>
							{main && (
								<Link
									to="/coaches"
									className="px-2 2xl:px-7 py-1.5 flex align-center justify-center hover:text-gray-200 border-b-2 border-transparent hover:border-white transition ease-out delay-75">
									Тренери
								</Link>
							)}
							<Link
								to="/"
								className="px-2 2xl:px-7 py-1.5 flex align-center justify-center hover:text-gray-200 border-b-2 border-transparent border-black hover:border-white transition ease-out delay-75">
								Головна
							</Link>
							{main && (
								<Link
									to="/register"
									className="px-2 2xl:px-7 py-1.5 max-sm:col-span-2 flex align-center justify-center hover:text-gray-200 border-b-2 border-transparent border-black hover:border-white transition ease-out delay-75">
									Стати тренером
								</Link>
							)}
						</nav>
						<Link to="/cabinet">
							<button className="p-1 align-middle rounded h-11 w-11 max-md:h-8 max-md:w-8 justify-self-end focus:outline-none hover:bg-gray-400">
								<UserIcon className="" />
							</button>
						</Link>
					</>
				)}
				{openBurger && (
					<>
						<div className="flex-1"></div>
						<button
							type="button"
							onClick={openBurger}
							className="align-middle rounded sm:hidden justify-self-end focus:outline-none hover:bg-gray-400">
							<Bars3Icon className="w-6 h-6" />
						</button>
					</>
				)}
			</div>
		</header>
	);
}
