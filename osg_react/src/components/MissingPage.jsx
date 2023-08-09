import HeaderAuth from './HeaderAuth';

const MissingPage = ({ header }) => {
	return (
		<div className="flex flex-col h-full text-center">
			{header ? <HeaderAuth /> : null}
			<div className="flex flex-col justify-center flex-1 my-auto text-center">
				<p className="text-9xl">404</p>
				<p className="text-3xl">сторінка не знайдена</p>
			</div>
		</div>
	);
};

export default MissingPage;
