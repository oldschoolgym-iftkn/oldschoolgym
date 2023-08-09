import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Filter from '../components/Filter';
import CoachCard from '../components/CoachCard';
import Pagination from '../components/Pagination';
import axios from '../api/axios';
import Loading from '../components/Loading';

const Coaches = () => {
	const [coachesList, setCoachesList] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(12);
	const [searchTerm, setSearchTerm] = useState({
		category: '',
		type_training: '',
		experience: [1, 30],
		city: '',
	});

	const filteredData = coachesList?.filter(
		(coach) =>
			coach.is_confirmed === true &&
			(searchTerm.category !== '' ? coach.category === Number(searchTerm.category) : true) &&
			(searchTerm.type_training !== ''
				? coach.type_training === Number(searchTerm.type_training)
				: true) &&
			coach.experience >= searchTerm.experience[0] &&
			coach.experience <= searchTerm.experience[1] &&
			(searchTerm.city !== '' ? coach.city === searchTerm.city : true),
	);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentCoaches = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

	const getCoaches = () => {
		axios
			.get('/coach/api/get_confirmed_coaches')
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
					setFilterOptions={setSearchTerm}
					className="max-sm:rounded-2xl rounded-r-2xl max-sm:mx-3 max-sm:mb-8"
				/>
				<div className="flex-1 px-3 space-y-8 sm:px-8">
					{isLoading ? (
						<Loading />
					) : (
						<>
							{currentCoaches.length > 0 ? (
								<div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] justify-items-stretch gap-8">
									{currentCoaches.map((obj, index) => (
										<CoachCard key={obj.id} coach={obj} />
									))}
								</div>
							) : (
								<div className="py-6">
									<p className="text-lg text-center sm:text-2xl">Тренерів не знайдено.😥</p>
								</div>
							)}
							<div className="mx-auto w-fit">
								<Pagination
									currentPage={currentPage}
									onChangePage={setCurrentPage}
									pageCount={Math.ceil(filteredData.length / itemsPerPage)}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Coaches;
