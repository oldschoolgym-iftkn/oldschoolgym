const Plan = ({ name, cost, lessonCount, imageUrl, description, onClick, buttonLabel }) => {
	return (
		<div className="inline-block p-8 space-y-6 sm:space-y-12 text-center bg-black min-w-[280px] max-w-[400px] rounded-3xl">
			<div className="p-2 space-y-2 text-lg bg-white sm:p-5 sm:space-y-4 sm:text-2xl rounded-3xl">
				<p className="text-2xl font-bold sm:text-3xl">{name}</p>
				<p>Ціна: {cost}₴</p>
				<p>Кількість занять: {lessonCount}</p>
			</div>
			<img src={imageUrl} alt="subImg" className="max-w-full mx-auto" />
			<p className="text-xl text-white">{description}</p>
			<button className="p-2 text-xl bg-white rounded-full min-w-[12rem]" onClick={onClick}>
				{buttonLabel ? buttonLabel : 'Замовити'}
			</button>
		</div>
	);
};

export default Plan;
