import { Link } from 'react-router-dom';

const ClientCard = ({ id, avatar, first_name, last_name }) => {
	return (
		<div className="flex flex-col px-2 py-4 space-y-4 text-center transition-transform border border-black sm:px-8 rounded-3xl card hover:scale-105">
			<div className="">
				<img
					src={process.env.REACT_APP_API_URL + avatar}
					alt="avatar"
					className="object-scale-down mx-auto rounded-full select-none w-36"
				/>
				<p className="text-lg">{last_name + ' ' + first_name}</p>
			</div>
			<button className="inline-block select-none text-center w-full min-w-[8rem] hover:bg-neutral-600 px-8 py-2 rounded-full text-lg leading-none font-normal bg-black text-white border border-black">
				Додати заняття
			</button>
			{/* fix */}
			<Link
				to={'/cabinet/messages/' + id}
				className="inline-block select-none text-center w-full min-w-[8rem] hover:bg-neutral-600 px-2 py-2 rounded-full text-lg leading-none font-normal bg-black text-white border border-black">
				Чат
			</Link>
			<Link
				to={'/cabinet/users/' + id}
				className="inline-block select-none text-center w-full min-w-[8rem] hover:bg-neutral-600 px-2 py-2 rounded-full text-lg leading-none font-normal bg-black text-white border border-black">
				Перейти у профіль
			</Link>
		</div>
	);
};
export default ClientCard;
