import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Filter from '../components/Filter';
import CoachCard from '../components/CoachCard';
import Pagination from '../components/Pagination';
import axios from '../api/axios';
import Loading from '../components/Loading';

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
	user_profile: {
		avatar: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
		first_name: 'Андрій',
		last_name: 'Кіко',
	},
	category: 'Кросфіт',
	type_training: 'онлайн/офлайн',
	experience: '10 років',
};

const Coaches = () => {
	const [coachesList, setCoachesList] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const getCoaches = () => {
		axios
			.get('/user/api/')
			.then((res) => {
				setCoachesList(res.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		getCoaches();
	}, []);
	return (
		<div className="flex flex-col min-h-screen App">
			<Header main />
			<div className="flex flex-grow pt-[60px] max-xl:pt-[146px] my-8 min-h-full">
				<Filter specs={exampleSpecs} />
				<div className="flex-grow px-32 space-y-12">
					{isLoading ? (
						<Loading />
					) : (
						<>
							<div className="grid justify-items-stretch gap-20 grid-cols-3 max-2xl:grid-cols-2 max-[1156px]:grid-cols-1 ">
								{coachesList.map((obj, index) => (
									<CoachCard
										key={obj.id}
										coach={{ ...exampleCoach, id: obj.id, user_profile: obj }}
									/>
								))}
							</div>
							<div className="mx-auto w-fit">
								<Pagination currentPage={1} onChangePage={() => {}} />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Coaches;
