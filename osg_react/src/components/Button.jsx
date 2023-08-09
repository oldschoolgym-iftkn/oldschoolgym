import { Link } from 'react-router-dom';

const Button = ({ linkTo, children, square }) => {
	if (square) {
		return (
			<Link
				to={linkTo}
				className="inline-block select-none text-center w-full sm:min-w-[16rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-xl leading-none font-normal bg-black text-white">
				{children}
			</Link>
		);
	}

	return (
		<Link
			to={linkTo}
			className="inline-block select-none text-center w-full min-w-[8rem] hover:bg-neutral-600 px-8 py-2 rounded-full text-lg leading-none font-normal bg-black text-white border border-black">
			{children}
		</Link>
	);
};

export default Button;
