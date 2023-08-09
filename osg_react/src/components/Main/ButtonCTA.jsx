import { Link } from 'react-router-dom';

const ButtonCTA = ({ linkTo, children, className }) => {
	return (
		<Link to={linkTo}>
			<button
				className={
					'sm:min-w-[16rem] xl:min-w-[24rem] hover:bg-neutral-700 px-6 sm:px-16 py-3 max-sm:w-5/6 rounded-3xl text-2xl lg:text-3xl leading-[3rem] bg-black text-white' +
					' ' +
					className
				}>
				{children}
			</button>
		</Link>
	);
};

export default ButtonCTA;
