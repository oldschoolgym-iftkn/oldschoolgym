import { Link } from 'react-router-dom';

const Button = ({ linkTo, children }) => {
	return (
		<Link
			to={linkTo}
			className="inline-block text-center min-w-[16rem] hover:bg-neutral-700 px-8 py-2 rounded-full text-base leading-none font-normal bg-black text-white">
			{children}
		</Link>
	);
};

export default Button;
