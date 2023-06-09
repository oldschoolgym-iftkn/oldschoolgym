import { useEffect, useState } from 'react';
import CoachCard from './CoachCard';
import useAxios from '../../hooks/useAxios';
import Loading from '../Loading';

// const coaches = [
// 	{ id: 1, avatar: '/media/default_M.png', first_name: 'Олег', last_name: 'Варкрафт' },
// 	{ id: 2, avatar: '/media/default_F.png', first_name: 'Олена', last_name: 'Квітка' },
// 	{ id: 3, avatar: '/media/default_M.png', first_name: 'Володимир', last_name: 'Молочний' },
// 	{ id: 4, avatar: '/media/default_M.png', first_name: 'Billy', last_name: 'Herington' },
// ];

const Coaches = () => {
	const [coachesList, setCoachesList] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const axios = useAxios();
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
		<div className="flex flex-col h-full border border-black rounded-3xl">
			<div className="flex-1 p-4 overflow-y-auto text-2xl">
				<div className="flex flex-wrap [&>*]:m-4 justify-center">
					{isLoading ? <Loading /> : coachesList.map((p, index) => <CoachCard key={p.id} {...p} />)}
				</div>
			</div>
		</div>
	);
};

export default Coaches;
