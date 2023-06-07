import CoachCard from './CoachCard';

const coaches = [
	{ id: 1, avatar: '/media/default_M.png', first_name: 'Олег', last_name: 'Варкрафт' },
	{ id: 2, avatar: '/media/default_F.png', first_name: 'Олена', last_name: 'Квітка' },
	{ id: 3, avatar: '/media/default_M.png', first_name: 'Володимир', last_name: 'Молочний' },
	{ id: 4, avatar: '/media/default_M.png', first_name: 'Billy', last_name: 'Herington' },
];

const Coaches = () => {
	return (
		<div className="flex flex-col h-full border border-black rounded-3xl">
			<div className="flex-1 p-12 overflow-y-auto text-2xl">
				<div className="flex flex-wrap [&>*]:m-4 justify-center">
					{coaches.map((p, index) => (
						<CoachCard {...p} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Coaches;
