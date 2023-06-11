import {
	ArrowLeftIcon,
	ArrowRightIcon,
	CheckCircleIcon,
	EllipsisVerticalIcon,
	StopIcon,
} from '@heroicons/react/24/outline';

const tabs = ['Нові', 'В обробці', 'Відхилені', 'Прийняті'];
const people = [
	{ first_name: 'Олександр', gender: true, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Марія', gender: false, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Іван', gender: true, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Олена', gender: false, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Сергій', gender: true, date: Math.round(1 + Math.random() * (30 - 1)) },
	{ first_name: 'Анна', gender: false, date: Math.round(1 + Math.random() * (30 - 1)) },
];

const Requests = () => {
	const user = {};
	return (
		<div className="flex flex-col h-full border border-black rounded-3xl">
			<div className="grid grid-flow-col text-sm border-b border-black divide-x md:text-xl justify-stretch">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className="inline-block px-1 py-2 sm:px-2 first:rounded-tl-3xl last:rounded-tr-3xl lg:px-4 lg:py-4 hover:font-bold transition-color hover:bg-neutral-300 group">
						<p className="transition-transform group-hover:-translate-y-1">{tab}</p>
					</button>
				))}
			</div>
			<div className="flex-1 p-8 overflow-y-auto text-lg sm:text-xl max-md:p-4">
				<div className="flex flex-col h-full overflow-y-auto border-2 border-black rounded-3xl">
					<div className="flex items-center justify-between px-2 py-1 sm:px-3">
						<div className="flex items-center space-x-4">
							<button>
								<CheckCircleIcon className="w-6 h-6 sm:w-8 sm:h-8" />
							</button>
							<button>
								<EllipsisVerticalIcon className="w-6 h-6 sm:w-8 sm:h-8" />
							</button>
						</div>
						<div className="flex items-center space-x-2">
							<span>
								{1}/{1}
							</span>
							<button>
								<ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
							</button>
							<button>
								<ArrowRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
							</button>
						</div>
					</div>
					<div className="flex flex-1">
						<div className="my-3 mx-2 sm:m-3 space-y-[25px]">
							{people.map((obj, index) => (
								<button key={index} className="block">
									<StopIcon className="w-6 h-6 sm:w-8 sm:h-8" />
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
											className="flex items-center flex-1 flex-grow py-2 text-left justify-items-center">
											<img
												src={
													process.env.REACT_APP_API_URL +
													(p.gender ? '/media/default_M.png' : '/media/default_F.png')
												}
												alt="Img"
												className="inline-block w-8 h-8 mx-2 border border-black rounded-full sm:w-10 sm:h-10 sm:mx-3"
											/>
											<div className="flex-1 inline-block truncate">{p.first_name}</div>
											<p className="px-2 text-base sm:text-lg">{p.date} чер.</p>
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Requests;
