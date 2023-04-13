import { Link } from 'react-router-dom';

const ButtonCTA = ({ linkTo, children }) => {
	return (
		<Link to={linkTo}>
			<button className="min-w-[32rem] hover:bg-neutral-700 px-24 py-3 rounded-3xl text-[2.5rem] leading-[3rem] bg-black text-white">
				{children}
			</button>
		</Link>
	);
};

export default ButtonCTA;
