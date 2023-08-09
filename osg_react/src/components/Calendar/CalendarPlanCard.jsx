import { Link } from 'react-router-dom';

const CalendarPlanCard = ({ id, avatar, first_name, last_name }) => {
	return (
		<div className="flex flex-col px-4 py-4 space-y-4 text-xl text-center transition-transform border border-black max-sm:text-lg rounded-3xl card hover:scale-[102%]">
			<p>07.02.2023</p>
			<div className="flex flex-col justify-center max-sm:space-y-2 sm:space-x-2 sm:flex-row">
				<div className="flex items-center justify-center space-x-1">
					<span className="">Початок:</span>
					<p className="p-1 px-2 border border-black rounded-3xl">11:45</p>
				</div>
				<div className="flex items-center justify-center space-x-1">
					<span className="">Кінець:</span>
					<p className="p-1 px-2 border border-black rounded-3xl">12:45</p>
				</div>
			</div>
			<p className="p-2 overflow-x-auto font-semibold border border-black rounded-3xl">
				Груди + тріцепс
			</p>
			<p className="p-4 py-1.5 text-lg max-sm:text-base text-left border border-black rounded-3xl line-clamp-6 ">
				Жим штанги лежачи вузьким хватом - 3х12-15 повторень. <br /> Французький жим лежачи з кривим
				грифом - 3х12-15 повторень.
			</p>
			<Link
				// to={'/coaches/' + id}
				className="inline-block select-none text-center w-full min-w-[8rem] hover:bg-neutral-600 px-8 py-2 rounded-full text-lg leading-none font-normal bg-black text-white border border-black">
				Докладніше
			</Link>
		</div>
	);
};
export default CalendarPlanCard;
