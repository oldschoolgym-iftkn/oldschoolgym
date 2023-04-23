import React from 'react';
import { Link } from 'react-router-dom';

const HeaderAuth = ({ fixed }) => {
	return (
		<header className={fixed ? 'py-4 fixed w-full' : 'py-4'}>
			<div className="container p-2 mx-auto bg-white">
				<Link to="/" className="flex items-center font-normal w-fit title-font md:mb-0">
					<span
						className="mr-1 -mb-1 text-6xl leading-none max-xl:text-5xl max-md:text-4xl"
						style={{ fontFamily: "'Stick No Bills', sans-serif" }}>
						OLDSCHOOLGYM
					</span>
					<svg
						width="74"
						height="40"
						viewBox="0 0 74 40"
						fill="black"
						xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0_153_334)">
							<path d="M2.84653 14.2858H0V25.7142H2.84653V14.2858Z" />
							<path d="M8.53876 5.71417H5.69223V34.285H8.53876V5.71417Z" />
							<path d="M17.0776 0H11.3845V40H17.0776V0Z" />
							<path d="M54.0767 17.1433H19.9225V22.8575H54.0767V17.1433Z" />
							<path d="M74 14.2858H71.1535V25.7142H74V14.2858Z" />
							<path d="M68.3077 5.71417H65.4612V34.285H68.3077V5.71417Z" />
							<path d="M62.6155 0H56.9225V40H62.6155V0Z" />
						</g>
					</svg>
				</Link>
			</div>
		</header>
	);
};

export default HeaderAuth;
