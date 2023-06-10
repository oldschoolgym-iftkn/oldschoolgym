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
			<Header main full noFixed />
			<div className="flex flex-grow min-h-full py-6 max-sm:flex-col">
				<Filter
					specs={exampleSpecs}
					className="max-sm:rounded-2xl rounded-r-2xl max-sm:mx-3 max-sm:mb-8"
				/>
				<div className="flex-1 px-3 space-y-8 sm:px-8">
					{isLoading ? (
						<Loading />
					) : (
						<>
							{/* <div className="flex flex-wrap gap-8 justify-evenly"> */}
							<div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] justify-items-stretch gap-8">
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
