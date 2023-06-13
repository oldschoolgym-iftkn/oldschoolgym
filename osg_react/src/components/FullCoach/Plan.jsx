const Plan = ({ name, cost, lessons_count, imageUrl, description, onClick, buttonLabel, edit }) => {
	return (
		<div className="flex flex-col p-4 sm:p-8 space-y-6 sm:space-y-12 text-center bg-black min-w-[240px] max-w-[400px] rounded-3xl">
			<div className="p-2 space-y-2 text-base bg-white sm:p-5 sm:space-y-4 sm:text-2xl rounded-3xl">
				<p className="text-xl font-bold sm:text-3xl">{name}</p>
				<p>Ціна: {cost}₴</p>
				<p>Кількість занять: {lessons_count}</p>
			</div>
			<img src={imageUrl} alt="subImg" className="w-full mx-auto" />
			<p className="flex-1 text-lg text-white sm:text-xl">{description}</p>
			<button
				type="button"
				disabled={edit ? false : onClick ? true : false}
				className="p-2 disabled:bg-neutral-500 hover:bg-neutral-300 text-lg sm:text-xl bg-white rounded-full min-w-[10rem]"
				onClick={onClick}>
				{buttonLabel ? buttonLabel : 'Замовити'}
			</button>
		</div>
	);
};

export default Plan;
