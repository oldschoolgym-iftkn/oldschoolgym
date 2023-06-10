import { Link } from 'react-router-dom';

const ButtonCTA = ({ linkTo, children }) => {
	return (
		<Link to={linkTo}>
			<button className="sm:min-w-[20rem] hover:bg-neutral-700 px-6 sm:px-20 py-3 max-sm:w-4/5 rounded-3xl text-2xl lg:text-4xl leading-[3rem] bg-black text-white">
				{children}
			</button>
		</Link>
	);
};

export default ButtonCTA;
