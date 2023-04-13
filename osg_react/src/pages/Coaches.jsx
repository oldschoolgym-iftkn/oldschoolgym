import { useEffect } from 'react';

import Header from '../components/Header';
import Filter from '../components/Filter';
import CoachCard from '../components/CoachCard';
import Pagination from '../components/Pagination';

const exampleSpecs = [
	'Фітнес',
	'Персональний',
	'Бокс',
	'Плавання ',
	'Йога ',
	'Стрільба з лука ',
	'Кросфіт ',
	'Атлетика ',
];

const exampleCoach = {
	id: 1,
	avatarUrl: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
	name: 'Кіко Андрій',
	spec: 'Кросфіт',
	type: 'онлайн/офлайн',
	exp: '10 років',
};

const Coaches = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	});
	return (
		<div className="flex flex-col min-h-screen App">
			<Header main />
			<div className="flex flex-grow pt-[60px] my-8 min-h-full">
				<Filter specs={exampleSpecs} />
				{/* <div className="flex-grow flex flex-wrap px-32 space-x-20"> */}
				<div className="flex-grow px-32 space-y-12">
					<div className="grid justify-items-stretch gap-20 grid-cols-3 max-2xl:grid-cols-2 max-[1156px]:grid-cols-1 ">
						<CoachCard coach={exampleCoach} />
						<CoachCard coach={exampleCoach} />
						<CoachCard coach={exampleCoach} />
						<CoachCard coach={exampleCoach} />
						<CoachCard coach={exampleCoach} />
						<CoachCard coach={exampleCoach} />
						<CoachCard coach={exampleCoach} />
						<CoachCard coach={exampleCoach} />
						<CoachCard coach={exampleCoach} />
					</div>
					<Pagination currentPage={1} onChangePage={() => {}} />
				</div>
			</div>
		</div>
	);
};

export default Coaches;
