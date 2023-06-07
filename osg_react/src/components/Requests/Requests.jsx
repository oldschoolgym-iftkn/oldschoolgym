import {
	ArrowLeftIcon,
	ArrowRightIcon,
	CheckCircleIcon,
	EllipsisVerticalIcon,
	StopIcon,
} from '@heroicons/react/24/outline';

const tabs = ['Нові заявки', 'В обробці', 'Відхилені', 'Прийняті'];
const people = [
	{ first_name: 'Олександр', gender: true, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Марія', gender: false, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Іван', gender: true, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Олена', gender: false, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Сергій', gender: true, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Анна', gender: false, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Юлія', gender: false, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Катерина', gender: false, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Дмитро', gender: true, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Петро', gender: true, date: Math.round(1 + Math.random() * (30 - 1)) },
];

const Requests = () => {
	const user = {};
	return (
		<div className="flex flex-col h-full border border-black rounded-3xl">
			<div className="text-2xl border-b border-black max-lg:flex max-lg:flex-col">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className="inline-block py-4 border-r border-black hover:font-bold transition-color hover:bg-neutral-300 group px-14 max-lg:border-b max-lg:border-r-0 first:rounded-tl-3xl">
						<p className="transition-transform group-hover:-translate-y-1">{tab}</p>
					</button>
				))}
			</div>
			<div className="flex-1 p-12 overflow-y-auto text-2xl">
				<div className="flex flex-col h-full overflow-y-auto border-2 border-black rounded-3xl">
					<div className="flex items-center justify-between p-4 pb-0">
						<div className="space-x-4">
							<button>
								<CheckCircleIcon className="w-8 h-8" />
							</button>
							<button>
								<EllipsisVerticalIcon className="w-8 h-8" />
							</button>
						</div>
						<div className="flex space-x-2">
							<span>
								{1}/{1}
							</span>
							<button>
								<ArrowLeftIcon className="w-8 h-8" />
							</button>
							<button>
								<ArrowRightIcon className="w-8 h-8" />
							</button>
						</div>
					</div>
					<div className="flex flex-1">
						<div className="m-4 space-y-[25px]">
							{people.map(() => (
								<button className="block">
									<StopIcon className="w-8 h-8" />
								</button>
							))}
						</div>
						<div className="flex-1 border-t border-l border-black">
							{people.map((p, index) => (
								<div key={index} className="border-b border-black">
									<div className="flex items-center transition ease-out duration-200 bg-transparent rounded-3xl hover:bg-neutral-400/90 hover:scale-[102%] hover:rounded-3xl">
										<button
											onClick={() => {
												// navigate('/cabinet/messages/' + (index + 1));
											}}
											className="flex-1 flex-grow py-2 text-left justify-items-start">
											<img
												src={
													process.env.REACT_APP_API_URL +
													(p.gender ? '/media/default_M.png' : '/media/default_F.png')
												}
												alt="Img"
												className="inline-block w-10 h-10 mx-6 border border-black rounded-full"
											/>
											<div className="flex-1 inline-block">{p.first_name}</div>
										</button>
										<p className="px-4 text-xl">{p.date} чер.</p>
									</div>
								</div>
							))}
						</div>
					</div>
					{[].map((chat, index) => (
						<div key={index} className="border-b border-black">
							<div className="flex transition ease-out duration-200 bg-transparent rounded-3xl hover:bg-neutral-400/90 hover:scale-[102%] hover:rounded-3xl">
								<button
									onClick={() => {
										// navigate('/cabinet/messages/' + (index + 1));
									}}
									className="flex flex-grow py-3 text-left justify-items-start">
									<img
										src={
											process.env.REACT_APP_API_URL +
											chat.users.find((obj) => obj.id !== user.user_id).avatar
										}
										alt="Img"
										className="inline-block w-10 h-10 mx-6 border border-black rounded-full"
									/>
									<div className="flex-1 inline-block">
										{chat.users.find((obj) => obj.id !== user.user_id).first_name}
									</div>
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Requests;
